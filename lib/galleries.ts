// Every image a case study shows, keyed by the route its card opens. The card
// uses this to preview the whole project on hover, before anyone clicks in.
const SCV = 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main';
const ELIC = 'https://raw.githubusercontent.com/watcharaponthod-code/elic/main';

export const PROJECT_GALLERY: Record<string, string[]> = {
  'project-cropscan': [
    '/agri/cropscan-sheet.jpg',
    '/agri/cut-demo-fields.png',
    '/agri/harvest-sar-map.png',
    '/agri/sar-map-region.png',
    '/agri/cropscan-confusion.png',
  ],
  'project-yieldpro': [
    '/agri/yieldpro-sheet.jpg',
    '/agri/patch-fields.png',
    '/agri/sar-gapfill.png',
    '/agri/yieldpro-backtest.png',
  ],
  'project-agri-ai': [
    '/agri/agri-architecture.jpg',
    '/agri/cropscan-fields.png',
    '/agri/harvest-sar-map.png',
    '/agri/cropscan-confusion.png',
    '/agri/sar-gapfill.png',
    '/agri/yieldpro-backtest.png',
  ],
  'project-scv-1': [
    '/media/burnt-burnt-98.jpg',
    '/media/burnt-fresh-99.jpg',
    '/media/burnt-machinecut-100.jpg',
    '/media/burnt-abstain-82.jpg',
    `${SCV}/figures/dirty_area_labels.jpg`,
  ],
  'project-scv-2': [`${SCV}/figures/burn_mix_30pct_scattered.jpg`, `${SCV}/figures/burn_mix_50pct_layer.jpg`],
  'project-scv-4': [`${SCV}/figures/canegate_live.png`, `${SCV}/figures/canegate_pipeline_view.png`],
  'project-scv-5': [
    `${SCV}/media/dust_real.gif`,
    `${SCV}/media/dust_multibay.gif`,
    `${SCV}/media/dust_overlay.gif`,
    `${SCV}/media/dust_base_vs_veto.gif`,
    `${SCV}/figures/dust_model_compare.jpg`,
    `${SCV}/figures/opacity_sim_summary.png`,
  ],
  'project-scv-6': ['/media/acoustic-overview.jpg', '/media/acoustic-pipeline.jpg'],
  'project-scv-7': [`${SCV}/media/caneflow_real.gif`, `${SCV}/figures/cane_flow_grid.jpg`],
  'project-scv-8': ['/media/plate-ocr.jpg'],
  'project-scv-9': [`${SCV}/figures/stalk_seg_dino.jpg`],
  'project-sugarcane-cv': [
    `${SCV}/figures/site_map.svg`,
    `${SCV}/figures/method_map.svg`,
    `${SCV}/media/dust_real.gif`,
    `${SCV}/figures/cane_flow_grid.jpg`,
  ],
  'project-elic': [
    `${ELIC}/docs/images/usecase-diagram.jpg`,
    `${ELIC}/docs/images/conversation-roles.jpg`,
    `${ELIC}/docs/images/architecture-overview.jpg`,
    `${ELIC}/docs/images/llm-workflow.jpg`,
    `${ELIC}/docs/images/latency-streaming.jpg`,
  ],
  'project-shorts': ['/media/shorts-pipeline.jpg'],
  'project-kafka': ['/media/kafka-connector.jpg'],
};

export function galleryFor(view?: string): string[] {
  return (view && PROJECT_GALLERY[view]) || [];
}
