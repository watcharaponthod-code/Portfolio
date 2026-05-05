import ProjectDetail from './ProjectDetail';

const B = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public';

export default function TradingProject() {
  return (
    <ProjectDetail data={{
      id: 'trading',
      title: 'AlgoTrade',
      role: 'AI AUTOMATION · FULL-STACK ENGINEER',
      year: '2025',
      tagline: 'An AI-powered automated trading system where a Thai LLM (Pathumma Qwen3-8B) analyzes technical indicators every hour and executes real bracket orders on Alpaca Markets — with a full-stack Next.js dashboard for monitoring.',
      overview: 'AlgoTrade is not just a dashboard — it is a live AI trading engine. Every hour, a Vercel Cron Job triggers the AI trade route: market data (100 hourly candles) is fetched from Alpaca, RSI/EMA/VWAP indicators are calculated, and the full context is sent to a Thai LLM (Pathumma-ThaiLLM-Qwen3-8B running on thaillm.or.th). The LLM returns a JSON decision — BUY or SELL — with take_profit_pct and stop_loss_pct, which the system executes as a bracket order on Alpaca Markets. All trades and signals are logged to the database. Alongside the AI engine, four rule-based strategies run in parallel: Momentum, Mean Reversion, Statistical Arbitrage, and Pairs Trading. A real-time Next.js dashboard visualizes portfolio equity, open positions, P&L history, and live strategy status.',
      mediaGallery: [
        { src: `${B}/dashboard.png`, caption: 'ALGOTRADE_DASHBOARD // PORTFOLIO EQUITY · OPEN POSITIONS · P&L HISTORY · STRATEGY STATUS' },
        { src: `${B}/architecture.svg`, caption: 'ALGOTRADE_ARCHITECTURE // VERCEL CRON → THAILLM ANALYSIS → ALPACA BRACKET ORDER EXECUTION' },
        { src: `${B}/strategy-flow.svg`, caption: 'ALGOTRADE_STRATEGY_FLOW // MARKET DATA → RSI/EMA/VWAP INDICATORS → LLM DECISION → BUY/SELL' },
        { src: `${B}/database-schema.svg`, caption: 'ALGOTRADE_DATABASE // TRADE SIGNALS · EXECUTED TRADES · STRATEGIES · POSITION SNAPSHOTS' },
      ],
      keyFeatures: [
        'AI Trade Engine: Thai LLM (Pathumma-ThaiLLM-Qwen3-8B) analyzes RSI, EMA9/EMA21, VWAP, and recent candles every hour — returns structured JSON (action, qty, take_profit_pct, stop_loss_pct, reason).',
        'Bracket order execution via Alpaca Markets API: BUY triggers a bracket order with auto take-profit and stop-loss levels set by the LLM.',
        'Four rule-based strategies: Momentum, Mean Reversion, Statistical Arbitrage (cointegration Z-score), Pairs Trading — with market regime detection and adaptive parameters.',
        'Risk management layer: portfolio heat limit, daily P&L cutoff, stale order cleanup on every cron cycle.',
        'Telegram Bot alerts on every signal and trade execution — real-time notification for buy/sell events.',
        'Full trade audit trail: every AI signal and executed trade logged to PostgreSQL (Neon) with LLM reasoning captured.',
        'Real-time dashboard: portfolio equity chart, P&L history, open positions, order book — built on Next.js 16 + TypeScript.',
      ],
      sections: [
        {
          title: 'AI Decision Loop',
          body: 'Each hourly cycle: (1) cancel all stale open orders, (2) fetch 100 hourly OHLCV bars per symbol from Alpaca, (3) compute RSI(14), EMA9, EMA21, VWAP(5h), (4) build a structured prompt with full market context + current position + account equity, (5) POST to ThaiLLM API, (6) parse JSON response — strip any <think> tags and markdown, extract action/qty/tp/sl/reason, (7) execute bracket order or close position on Alpaca, (8) log signal and trade to database.',
          image: `${B}/architecture.svg`,
          imageCaption: 'ARCHITECTURE // FULL CYCLE: CRON → DATA → LLM → EXECUTION → DB',
          fullWidth: true,
        },
        {
          title: 'Strategy Layer',
          body: 'Four parallel rule-based strategies complement the AI engine: Momentum (EMA crossover with RSI confirmation), Mean Reversion (Bollinger Band Z-score), Stat-Arb (cointegration-based spread trading using Engle-Granger test), Pairs Trading (correlation matrix + spread normalization). All strategies include regime detection — trending vs mean-reverting market — and adaptive position sizing based on ATR volatility.',
          image: `${B}/strategy-flow.svg`,
          imageCaption: 'STRATEGY_FLOW // INDICATOR CALCULATION → REGIME DETECTION → SIGNAL GENERATION → RISK CHECK → ORDER',
          fullWidth: true,
        },
        {
          title: 'Why ThaiLLM?',
          body: 'The project deliberately uses Pathumma-ThaiLLM (a Thai-developed Qwen3-8B fine-tune) rather than GPT/Claude for trading decisions. The reasoning: (1) latency — the model runs domestically on thaillm.or.th, (2) cost — no per-token billing for frequent hourly calls, (3) the model\'s chain-of-thought (<think> tags, stripped before JSON extraction) produces interpretable reasoning that gets logged with each trade for post-analysis.',
        },
        {
          title: 'Dashboard Architecture',
          body: 'Next.js 16 App Router with TypeScript throughout. API routes serve as a thin proxy to the database and Alpaca API. Chart components use Recharts with canvas rendering for smooth updates on live price ticks. Vercel Cron Jobs at 1-minute intervals drive the non-AI strategies; an external cron (cron-job.org) calls the AI trade endpoint hourly, bypassing Vercel Hobby plan daily-cron limits.',
        },
      ],
      stack: ['Next.js 16', 'TypeScript', 'ThaiLLM (Pathumma Qwen3-8B)', 'Alpaca Markets API', 'Vercel Cron Jobs', 'Neon PostgreSQL', 'Telegram Bot API', 'Tailwind CSS v4', 'Recharts', 'Docker'],
      metrics: [
        { label: 'AI ENGINE', value: 'THAILLM QWEN3-8B' },
        { label: 'BROKER', value: 'ALPACA MARKETS' },
        { label: 'STRATEGIES', value: '4 + AI HOURLY' },
        { label: 'ALERTS', value: 'TELEGRAM BOT' },
      ],
      githubLink: 'https://github.com/watcharaponthod-code/trading',
    }} />
  );
}
