// Every image a case study shows, keyed by the route its card opens. The card
// uses this to preview the whole project on hover, before anyone clicks in.
// Local assets are imported so they carry the same hashed URL as the page.
import ragPic1 from '../components/project/ai_RAG/Picture1.png';
import ragPic3 from '../components/project/ai_RAG/Picture3.png';
import ragPic4 from '../components/project/ai_RAG/Picture4.png';
import ragPic5 from '../components/project/ai_RAG/Picture5.png';
import ragPic8 from '../components/project/ai_RAG/Picture8.png';
import geoImg from '../components/project/geomap/LINE_20260324_213523.jpg';
import kafkaImg from '../components/project/kafka/kafka1.png';
import monitorImg from '../components/project/cpu/download.png';

const SCV = 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main';
const ELIC = 'https://raw.githubusercontent.com/watcharaponthod-code/elic/main';
const NINJA = 'https://raw.githubusercontent.com/watcharaponthod-code/Ninja_fruit/main';
const SUBWAY = 'https://raw.githubusercontent.com/watcharaponthod-code/subway-kids/main';
const CANEGATE = 'https://raw.githubusercontent.com/watcharaponthod-code/canegate-assets/main';
const DRAGON = 'https://raw.githubusercontent.com/watcharaponthod-code/roblox-dragon-combat/main';
const EMB_DIAGRAM = 'https://raw.githubusercontent.com/watcharaponthod-code/embedding_rag/main/diagram/diagram.png';
const CHAT_DIAGRAM = 'https://raw.githubusercontent.com/watcharaponthod-code/rag-chat/main/diagram/diagram.png';
const BITCOIN_ARCH = 'https://raw.githubusercontent.com/watcharaponthod-code/bitcoin-ml-prediction/main/architecture_diagram.png';
const TRADING_DASH = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/dashboard.png';

export const PROJECT_GALLERY: Record<string, string[]> = {
  // Agri
  'project-cropscan': ['/agri/cropscan-sheet.jpg', '/agri/cut-demo-fields.png', '/agri/harvest-sar-map.png', '/agri/sar-map-region.png', '/agri/cropscan-confusion.png'],
  'project-yieldpro': ['/agri/yieldpro-sheet.jpg', '/agri/patch-fields.png', '/agri/sar-gapfill.png', '/agri/yieldpro-backtest.png'],
  'project-agri-ai': ['/agri/agri-architecture.jpg', '/agri/cropscan-fields.png', '/agri/harvest-sar-map.png', '/agri/cropscan-confusion.png', '/agri/sar-gapfill.png', '/agri/yieldpro-backtest.png'],

  // Sugarcane detectors
  'project-scv-1': ['/media/burnt-burnt-98.jpg', '/media/burnt-fresh-99.jpg', '/media/burnt-machinecut-100.jpg', '/media/burnt-abstain-82.jpg', `${SCV}/figures/dirty_area_labels.jpg`],
  'project-scv-2': [`${SCV}/figures/burn_mix_30pct_scattered.jpg`, `${SCV}/figures/burn_mix_50pct_layer.jpg`],
  'project-scv-4': [`${SCV}/figures/canegate_live.png`, `${SCV}/figures/canegate_pipeline_view.png`],
  'project-scv-5': [`${SCV}/media/dust_real.gif`, `${SCV}/media/dust_multibay.gif`, `${SCV}/media/dust_overlay.gif`, `${SCV}/media/dust_base_vs_veto.gif`, `${SCV}/figures/dust_model_compare.jpg`, `${SCV}/figures/opacity_sim_summary.png`],
  'project-scv-6': ['/media/acoustic-overview.jpg', '/media/acoustic-pipeline.jpg'],
  'project-scv-7': [`${SCV}/media/caneflow_real.gif`, `${SCV}/figures/cane_flow_grid.jpg`],
  'project-scv-8': ['/media/plate-ocr.jpg'],
  'project-scv-9': [`${SCV}/figures/stalk_seg_dino.jpg`],
  'project-sugarcane-cv': [`${SCV}/figures/site_map.svg`, `${SCV}/figures/method_map.svg`, `${SCV}/media/dust_real.gif`, `${SCV}/figures/cane_flow_grid.jpg`, `${SCV}/media/caneflow_real.gif`, `${SCV}/figures/canegate_live.png`],

  // AI and RAG
  'project-rag-ecosystem': [EMB_DIAGRAM, CHAT_DIAGRAM, ragPic1, ragPic3, ragPic5, ragPic8],
  'project-embedding-rag': [EMB_DIAGRAM, ragPic3, ragPic4, ragPic8],
  'project-bitcoin': [BITCOIN_ARCH],
  'project-trading': [TRADING_DASH],
  'project-elic': [`${ELIC}/docs/images/usecase-diagram.jpg`, `${ELIC}/docs/images/conversation-roles.jpg`, `${ELIC}/docs/images/architecture-overview.jpg`, `${ELIC}/docs/images/llm-workflow.jpg`, `${ELIC}/docs/images/latency-streaming.jpg`],

  // Vision games
  'project-ninja': [`${NINJA}/demo/demo-gameplay.gif`, `${NINJA}/demo/demo-gameplay-2.gif`, `${NINJA}/demo/demo-gameplay-3.gif`],
  'project-subway': [`${SUBWAY}/demo/demo-gameplay.gif`, `${SUBWAY}/demo/demo-gameplay-2.gif`, `${SUBWAY}/docs/ml-dataflow.svg`],

  // Systems and full-stack
  'project-kafka': ['/media/kafka-connector.jpg', kafkaImg],
  'project-geomap': [geoImg],
  'project-monitoring': [monitorImg],
  'project-shorts': ['/media/shorts-pipeline.jpg'],
};

// Cards that open an external link instead of a page, keyed by card title.
export const EXTERNAL_GALLERY: Record<string, string[]> = {
  'CaneGate: Truck Inspection': [
    `${CANEGATE}/screen-live.png`,
    `${CANEGATE}/screen-modal.png`,
    `${CANEGATE}/screen-stats.png`,
    `${CANEGATE}/screen-records.png`,
    `${CANEGATE}/screen-sim.png`,
    `${CANEGATE}/banner.png`,
  ],
  'Dragon Combat: Bots That Pass for Players': [`${DRAGON}/media/dragon_combat.gif`, `${DRAGON}/media/dragon_combat2.gif`],
  'Google Ads Strategy & Audience Modeling': ['/media/google-ads.jpg'],
};

export function galleryFor(view?: string, title?: string): string[] {
  if (view && PROJECT_GALLERY[view]) return PROJECT_GALLERY[view];
  if (title && EXTERNAL_GALLERY[title]) return EXTERNAL_GALLERY[title];
  return [];
}
