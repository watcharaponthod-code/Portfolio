import ProjectDetail from './ProjectDetail';

export default function ShortsAutomationProject() {
  return (
    <ProjectDetail data={{
      id: 'shorts-automation',
      title: 'YouTube Shorts Automation',
      role: 'AI CONTENT PIPELINE · GROWTH ANALYTICS',
      year: '2026',
      tagline: 'A closed loop that reads yesterday\'s YouTube Analytics, decides the next theme, generates 9:16 clips with a locked AI character, edits them with voice, music and subtitles, QCs every frame, uploads on schedule, and measures the result 48 hours later. It now runs entirely on GitHub Actions, Cloudflare and Playwright at zero cost. Two channels, one of them at 3.3M views in its first weeks.',
      overview: 'The point was never "make videos with AI". It was to find out, with numbers, what makes a Thai-audience Short get watched. Every day starts by pulling views, retention curves and traffic sources, and only then does the pipeline ask meta.ai for new clips. Rules that survived the data are written down as rules (silent food does not work on the ASMR channel, the character must wear the same outfit in every clip, 18 uploads in one day collapses reach 100×). Rules that failed are logged as failed.',
      keyFeatures: [
        'Analyse → decide → ideate → generate → edit → QC → upload → measure, with a daily strategy loop back to step one. Each step has its own script and its own file drop.',
        'Two channels with separate API quota: BudyStory (comedy, 5,510 subscribers, 3.34M views, 189 clips as of 19 Sep 2026) and AlexASMR (food ASMR, template "cut it, then eat it").',
        'Findings that changed the rules: retention leaks in seconds 1–2; retention stopped predicting views once volume rose (Spearman +0.003); big-object destruction is the top format; hit rate above 100k views is 7 of 129 clips.',
        'QC before publish: frame check for character consistency, correct aspect and title set.',
        'Upload to YouTube (two channels, three tag profiles) and Facebook Reels through the Graph API, then delete raw files after posting so the pipeline never drifts on stale footage.',
        'Runs for free: Cloudflare sends the order to meta.ai, Playwright drives the meta.ai browser session, and the generated clips go into a GitHub Actions workflow that edits the video and adds the voice track, music and subtitles. No paid service and no server of its own.',
      ],
      sections: [
        {
          title: 'Pipeline',
          body: 'Each step is backed by a file the next step reads. The analysis writes a dated report; the idea log records which themes passed and failed; prompt templates and a locked character spec drive generation. Cloudflare sends the order to meta.ai and Playwright controls the meta.ai page. The clips then run through GitHub Actions: editing, voice, music, subtitles, QC and upload, with raw files cleaned up after posting.',
          image: '/media/shorts-pipeline-v2.jpg',
          imageCaption: 'PIPELINE // CLOUDFLARE → PLAYWRIGHT → META.AI → GITHUB ACTIONS → UPLOAD → MEASURE → LOOP',
          fullWidth: true,
        },
        {
          title: 'What the numbers say',
          body: 'Traffic is 97% Shorts feed, 84% Thailand and 15% Laos, 95% mobile, 56% women, 25–44 years. Average 211k views a day across the last 8 days measured. Revenue estimates are labelled as market reference RPM, not account data, because the analytics API does not expose revenue before monetisation. The realistic income for a channel like this is brand deals and affiliate, not ad revenue, and the doc says so.',
        },
        {
          title: 'Outcome',
          body: "What it changed: a two-channel content operation runs on one person's time, with every publishing decision driven by the previous day's numbers. In its first weeks the main channel reached 3.34M views and 5,510 subscribers.",
        },
      ],
      stack: ['Python', 'GitHub Actions', 'Cloudflare', 'Playwright', 'meta.ai', 'YouTube Analytics API', 'Facebook Graph API', 'ffmpeg'],
      metrics: [
        { label: 'VIEWS (BUDYSTORY)', value: '3.34M' },
        { label: 'SUBSCRIBERS', value: '5,510' },
        { label: 'CLIPS PUBLISHED', value: '189' },
        { label: 'DAILY VIEWS', value: '~211K' },
        { label: 'RUN COST', value: '$0' },
      ],
    }} />
  );
}
