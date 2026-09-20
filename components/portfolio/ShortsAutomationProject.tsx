import ProjectDetail from './ProjectDetail';

export default function ShortsAutomationProject() {
  return (
    <ProjectDetail data={{
      id: 'shorts-automation',
      title: 'YouTube Shorts Automation',
      role: 'AI CONTENT PIPELINE · GROWTH ANALYTICS',
      year: '2026',
      tagline: 'A closed loop that reads yesterday\'s YouTube Analytics, decides the next theme, generates 9:16 clips with a locked AI character, QCs every frame, uploads on schedule, and measures the result 48 hours later. Two channels, one of them at 3.3M views in its first weeks.',
      overview: 'The point was never "make videos with AI". It was to find out, with numbers, what makes a Thai-audience Short get watched. Every day starts by pulling views, retention curves and traffic sources through a REST proxy, and only then does the pipeline ask meta.ai for new clips. Rules that survived the data are written down as rules (silent food does not work on the ASMR channel, the character must wear the same outfit in every clip, 18 uploads in one day collapses reach 100×). Rules that failed are logged as failed.',
      keyFeatures: [
        'Analyse → decide → ideate → generate → QC → upload → measure, with a daily strategy loop back to step one. Each step has its own script and its own file drop.',
        'Two channels with separate API quota: BudyStory (comedy, 5,510 subscribers, 3.34M views, 189 clips as of 19 Sep 2026) and AlexASMR (food ASMR, template "cut it, then eat it").',
        'Findings that changed the rules: retention leaks in seconds 1–2; retention stopped predicting views once volume rose (Spearman +0.003); big-object destruction is the top format; hit rate above 100k views is 7 of 129 clips.',
        'QC before publish: frame check for character consistency, no subtitles, correct aspect, title set. Nothing publishes or schedules without a human confirmation.',
        'Upload to YouTube (two channels, three tag profiles) and Facebook Reels through the Graph API, then delete raw files after posting so the pipeline never drifts on stale footage.',
        'Earlier version: Thai narration with Gemini TTS, synthetic SFX with numpy/scipy, ffmpeg effects and ASS subtitles, uploaded through the same proxy.',
      ],
      sections: [
        {
          title: 'Pipeline',
          body: 'Seven steps, each backed by a file the next step reads. The analysis writes analysis-YYYY-MM-DD.md; the idea log records which themes passed and failed; prompt templates and a locked character spec drive generation; QC folders hold the checked frames; upload and schedule scripts read from the raw folders and clean up after themselves.',
          image: '/media/shorts-pipeline.jpg',
          imageCaption: 'PIPELINE // ANALYSE → GENERATE → QC → UPLOAD → MEASURE → LOOP',
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
      stack: ['Python', 'Bash', 'YouTube Analytics API', 'Maton REST proxy', 'meta.ai', 'Facebook Graph API', 'Gemini TTS', 'ffmpeg'],
      metrics: [
        { label: 'VIEWS (BUDYSTORY)', value: '3.34M' },
        { label: 'SUBSCRIBERS', value: '5,510' },
        { label: 'CLIPS PUBLISHED', value: '189' },
        { label: 'DAILY VIEWS', value: '~211K' },
      ],
    }} />
  );
}
