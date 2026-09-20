import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';

const PROD_ORIGIN = 'https://portfolio-watcharapon.vercel.app';

// On Vercel the files in api/ run as serverless functions. `vite dev` does not
// know about them, so without this the browser gets a 404 from /api/gemini-token
// and the AI assistant never connects on localhost. With GEMINI_API_KEY in
// .env.local this plugin runs the same handlers inside the dev server; without
// a key, /api/* is proxied to the deployed site instead (see `server.proxy`).
function vercelApiDev(): Plugin {
  return {
    name: 'vercel-api-dev',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) return next();
        const name = req.url.slice(5).split('?')[0].replace(/[^a-zA-Z0-9_-]/g, '');
        const file = path.resolve(__dirname, 'api', `${name}.ts`);
        if (!fs.existsSync(file)) {
          res.statusCode = 404;
          return res.end('not found');
        }
        let raw = '';
        for await (const chunk of req) raw += chunk;
        const q: any = req;
        q.body = raw ? (() => { try { return JSON.parse(raw); } catch { return raw; } })() : {};
        const r: any = res;
        r.status = (code: number) => { res.statusCode = code; return r; };
        r.json = (obj: unknown) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); return r; };
        try {
          const mod = await server.ssrLoadModule(file);
          await mod.default(q, r);
        } catch (e) {
          console.error(`[api/${name}]`, e);
          if (!res.headersSent) { res.statusCode = 500; res.end('api error'); }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Make .env.local visible to the api/ handlers in dev (same variable Vercel injects).
    if (env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY) process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
    const hasKey = Boolean(process.env.GEMINI_API_KEY);
    // API_PROXY_TARGET in .env.local points the proxy at a preview deployment instead of production.
    const proxyTarget = env.API_PROXY_TARGET || PROD_ORIGIN;
    if (!hasKey) console.log(`[vite] no GEMINI_API_KEY in .env.local: /api/* will be proxied to ${proxyTarget}`);
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: hasKey ? undefined : {
          '/api': { target: proxyTarget, changeOrigin: true, secure: true },
        },
      },
      plugins: [react(), ...(hasKey ? [vercelApiDev()] : [])],
      // GEMINI_API_KEY is deliberately NOT defined here. It is read at runtime
      // by the serverless functions in api/, so it never enters the client bundle.
      define: {
        'process.env.API_KEY': 'undefined',
        'process.env.GEMINI_API_KEY': 'undefined'
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
