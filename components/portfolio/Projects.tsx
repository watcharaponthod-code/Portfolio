import { useState, useRef, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { TbArrowRight } from 'react-icons/tb';
import { useUI } from '../../lib/state';

import picGeo     from '../project/geomap/LINE_20260324_213523.jpg';
import picKafka   from '../project/kafka/kafka1.png';
import picMonitor from '../project/cpu/download.png';

const EMB_DIAGRAM   = 'https://raw.githubusercontent.com/watcharaponthod-code/embedding_rag/main/diagram/diagram.png';
const BITCOIN_ARCH  = 'https://raw.githubusercontent.com/watcharaponthod-code/bitcoin-ml-prediction/main/architecture_diagram.png';
const TRADING_DASH  = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/dashboard.png';
const NINJA_GIF     = 'https://raw.githubusercontent.com/watcharaponthod-code/Ninja_fruit/main/demo/demo-gameplay.gif';
const SUBWAY_GIF    = 'https://raw.githubusercontent.com/watcharaponthod-code/subway-kids/main/demo/demo-gameplay.gif';
const RAG_CHAT_DIAG = 'https://raw.githubusercontent.com/watcharaponthod-code/rag-chat/main/diagram/diagram.png';
const ELIC_ARCH     = 'https://raw.githubusercontent.com/watcharaponthod-code/elic/main/architecture-diagram.svg';
const DONLAYA_WORK  = 'https://lh3.googleusercontent.com/d/1LlQNx6MpBvUXJ9VEZEzTk_YvhFnBLEA4=w1600';
const DUST_GIF      = 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/media/dust_real.gif';
const CANEGATE_LIVE = 'https://raw.githubusercontent.com/watcharaponthod-code/canegate-assets/main/screen-live.png';
const DRAGON_GIF    = 'https://raw.githubusercontent.com/watcharaponthod-code/roblox-dragon-combat/main/media/dragon_combat.gif';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type Category = 'ALL' | 'AGRI & SATELLITE' | 'COMPUTER VISION' | 'AI & RAG' | 'FULL-STACK' | 'SYSTEMS' | 'DATA & GROWTH';

interface Project {
  title: string;
  role: string;
  desc: string;
  stack: string[];
  metrics: string;
  category: Category;
  image?: string;
  isGif?: boolean;
  scrollTo?: string;
  tech?: string;       // what kind of AI it is: ML/DL, LLM, rule-based, plain software   // section title inside the case study to open at
  internalLink?: string;
  externalUrl?: string;
  actionLabel?: string;
  featured?: boolean;
  freelance?: boolean;
}

// Cards are rendered grouped by `category` (see GROUP_DESCRIPTIONS / CATEGORIES);
// within a group, `featured` cards come first, then the rest, in array order.
const ALL_PROJECTS: Project[] = [
  // ── AGRI & SATELLITE ──────────────────────────────────────────────────────
  {
    title: 'CropScan: Harvest Monitoring',
    tech: 'ML · REMOTE SENSING',
    role: 'REMOTE SENSING · SENTINEL-1 / SENTINEL-2',
    desc: 'Which fields are cut, when, and how much. Optical NDVI counts cut pixels inside each polygon. When the rainy season hides the ground for weeks, Sentinel-1 radar takes over: a VH backscatter drop against each field\'s own baseline, checked against the mill\'s harvest tickets (89–91% agreement by March). Out-of-block on 8,924 fields: precision 0.869, recall 0.897.',
    stack: ['Sentinel-2 NDVI', 'Sentinel-1 VH', 'rasterio', 'FastAPI', 'Railway'],
    metrics: 'F1 0.883 · 8,924 FIELDS',
    category: 'AGRI & SATELLITE',
    internalLink: 'project-agri-ai',
    image: '/agri/cropscan-fields.png',
    featured: true,
  },
  {
    title: 'Yield Pro: Health, Cause & Yield',
    tech: 'ML/DL · REMOTE SENSING',
    role: 'MACHINE LEARNING · SAR→NDVI GAPFILL',
    desc: 'Per-field health state, a cause label (drought, decline, recovery) and P10/P50/P90 tonnes per rai. The hard part is cloud: a radar-to-NDVI model trained on 449k out-of-block pixels fills the optical gaps through the wet season (95.7% within ±0.10, conformal bands, abstains when unsure). Yield ships as deciles because the honest out-of-zone correlation is 0.25–0.31, not the in-sample 0.72.',
    stack: ['LightGBM', 'PyTorch', 'CHIRPS', 'SoilGrids', 'MLflow', 'Kaggle GPU'],
    metrics: 'GAPFILL 95.7% WITHIN ±0.10',
    category: 'AGRI & SATELLITE',
    internalLink: 'project-agri-ai',
    image: '/agri/sar-gapfill.png',
    featured: true,
  },
  {
    title: 'Enterprise RAG Ecosystem',
    tech: 'LLM · RAG',
    role: 'FULL-STACK AI ENGINEER',
    desc: 'Two RAG systems built for networks with no outbound internet. Vector Docs manages document ingestion with hybrid RRF retrieval, while WebClient AI integrates LangGraph for agentic orchestration and live SQL querying of the Mantis bug tracker.',
    stack: ['LangGraph', 'BGE-M3', 'pgvector', 'Ollama', 'Kubernetes'],
    metrics: '100% ON-PREMISES',
    category: 'AI & RAG',
    internalLink: 'project-rag-ecosystem',
    image: RAG_CHAT_DIAG,
    featured: true,
  },
  {
    title: 'Vector Docs (embedding_rag)',
    tech: 'LLM · RAG',
    role: 'ENTERPRISE RAG SYSTEM',
    desc: 'On-premises document knowledge base: three ingestion pipelines (manual, email, external), BGE-M3 1024D embeddings, vision-enhanced image indexing, and hybrid RRF retrieval with BGE cross-encoder re-ranking.',
    stack: ['Python', 'BGE-M3', 'pgvector', 'RRF', 'Ollama'],
    metrics: 'HYBRID + RRF',
    category: 'AI & RAG',
    internalLink: 'project-embedding-rag',
    image: EMB_DIAGRAM,
    featured: true,
  },
  // ── Sugarcane CV: one card per detector (all open the same case study at their section)
  {
    title: 'Sugarcane CV 1/9: Burnt vs Fresh Cane',
    tech: 'DL · COMPUTER VISION',
    role: 'TRAINED CLASSIFIER · CCTV',
    desc: 'Is the load on the truck burnt or fresh? Burnt cane is paid less, so every truck is graded. A trained image classifier on 8,612 real CCTV frames from the weighbridge camera. Works, but it is bound to that camera: move the lens and it needs retraining.',
    stack: ['PyTorch', 'EfficientNet-B0', 'ONNX'],
    metrics: '8,612 REAL CCTV FRAMES',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-1',
    image: 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/figures/real_burnt_cane.jpg',
    featured: true,
  },
  {
    title: 'Sugarcane CV 2/9: Burnt Cane Mixed into a Load',
    tech: 'RULE-BASED · COMPUTER VISION',
    role: 'COLOUR RULE · NO MODEL',
    desc: 'How much of a mixed load is burnt? No model: the detector counts dark burnt pixels against fresh green on the visible top surface. Tested on simulated mixes (30% scattered, 50% layered). The rule is found; the cut-off that flips the grade is not set yet.',
    stack: ['OpenCV', 'NumPy'],
    metrics: 'RULE FOUND · THRESHOLD OPEN',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-2',
    image: 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/figures/burn_mix_30pct_scattered.jpg',
    featured: true,
  },
  {
    title: 'Sugarcane CV 3/9: Dirt, Tops and Leaf Trash',
    tech: 'DL · COMPUTER VISION',
    role: 'TRAINED SEGMENTATION',
    desc: 'What share of the load is soil, cane tops and leaf trash instead of millable cane. A trained segmentation model on 65 real labelled images. Too little data to conclude anything: reported as inconclusive rather than dressed up.',
    stack: ['PyTorch', 'Segmentation'],
    metrics: '65 IMAGES · INCONCLUSIVE',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-3',
    image: 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/figures/dirty_area_labels.jpg',
  },
  {
    title: 'Sugarcane CV 4/9: Is There Cane on the Truck',
    tech: 'RULE-BASED · COMPUTER VISION',
    role: 'EDGE RULE · DEPLOYED',
    desc: 'Before anything else, the side camera decides whether the incoming truck is loaded or empty and triggers the front camera. No model for the decision: classical edge and texture cues, 3.9 ms per frame, running on site at the mill.',
    stack: ['OpenCV', 'YOLO11n', 'Raspberry Pi'],
    metrics: '3.9 MS / FRAME · ON SITE',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-4',
    image: 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/figures/canegate_live.png',
  },
  {
    title: 'Sugarcane CV 5/9: Dust Opacity While Tipping',
    tech: 'DL + RULE · COMPUTER VISION',
    role: 'SEGMENTATION + RULE',
    desc: 'How thick is the dust cloud as a truck tips, per bay, to trigger water spray and feed environmental reporting. LR-ASPP segmentation plus a hand-written veto rule. Recall is measured on a synthetic test set only; real dust has not been scored yet.',
    stack: ['LR-ASPP', 'PyTorch', 'OpenCV'],
    metrics: 'SYNTHETIC TEST ONLY',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-5',
    image: 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/media/dust_base_vs_veto.gif',
    isGif: true,
  },
  {
    title: 'Sugarcane CV 6/9: Sand, Rock and Metal by Sound',
    tech: 'DL · AUDIO',
    role: 'AUDIO CNN · MICROPHONE',
    desc: 'A camera cannot see inside the pile, but a microphone hears sand or a rock hit the conveyor. Sound goes to log-mel spectrograms and a small CNN, trained on real recordings from the tipping bay. Sand is solved; rock and metal impacts are not claimed yet (recall 0.47–0.59).',
    stack: ['log-mel CNN', 'soundfile', 'Stable Audio Open'],
    metrics: 'SAND SOLVED · REAL AUDIO',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-6',
  },
  {
    title: 'Sugarcane CV 7/9: Cane Flow on the Conveyor',
    tech: 'DL · COMPUTER VISION',
    role: 'SELF-TRAINING · 70 FPS',
    desc: 'Share of leaf on the moving sheet of cane, a continuous quality signal instead of one still per truck. A self-training segmentation model: labels start from a small hand-made set and the model grows them on real mill video. Runs at 70 fps.',
    stack: ['YOLO', 'Self-training', 'OpenCV'],
    metrics: '70 FPS ON REAL VIDEO',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-7',
    image: 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/media/caneflow_real.gif',
    isGif: true,
  },
  {
    title: 'Sugarcane CV 8/9: Thai Licence Plate OCR',
    tech: 'DL + RULE · OCR',
    role: 'TWO READERS · ZERO WRONG',
    desc: 'Bind every load to the right farmer by reading the plate at the weighbridge. Two independent readers: ONNX + cross-frame voting for accuracy, and a pure-CV reader with no model at all. Strict mode on a 60-image hard set: it abstains rather than guess, 0 wrong reads.',
    stack: ['ONNX', 'OpenCV', 'Cross-frame voting'],
    metrics: '0 WRONG OF 60 HARD IMAGES',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-8',
  },
  {
    title: 'Sugarcane CV 9/9: Stalk Segmentation',
    tech: 'DL · COMPUTER VISION',
    role: 'SUPPORTING · DINOv2',
    desc: 'Outlines each individual cane stalk. No business value on its own; it exists so leaf share, stalk length and stacking orientation can be measured on real stalks. 31 hand-labelled images, DINOv2 features.',
    stack: ['DINOv2', 'PyTorch'],
    metrics: '31 HAND LABELS',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-9',
    image: 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/figures/stalk_seg_dino.jpg',
  },
  {
    title: 'CaneGate: Truck Inspection',
    tech: 'DL · COMPUTER VISION',
    role: 'PRODUCTION CV · DOCKER',
    desc: 'All-in-one inspection at the weighbridge: a side camera grades the cane on the truck, a front camera reads the Thai plate in strict mode. Ships as Docker images (canegate, canegate-web, canegate-lpr) with live view, per-truck confirmation, shift stats and a simulation mode for testing without trucks.',
    stack: ['Docker', 'FastAPI', 'YOLOv8', 'OCR', 'React'],
    metrics: 'DEPLOYED AT THE MILL',
    category: 'COMPUTER VISION',
    image: CANEGATE_LIVE,
    externalUrl: 'https://hub.docker.com/r/khawoat07/canegate',
    actionLabel: 'DOCKER HUB',
    featured: true,
  },
  {
    title: 'YouTube Shorts Automation',
    tech: 'GENAI · ANALYTICS',
    role: 'AI CONTENT PIPELINE · GROWTH',
    desc: 'Reads yesterday\'s Analytics, decides the next theme, generates 9:16 clips with a locked AI character, QCs every frame, uploads on schedule and measures 48 hours later. BudyStory reached 3.34M views and 5,510 subscribers in its first weeks; the rules that survived the data are written down, the ones that failed are logged.',
    stack: ['Python', 'YouTube Analytics API', 'meta.ai', 'Graph API', 'ffmpeg'],
    metrics: '3.34M VIEWS · 189 CLIPS',
    category: 'DATA & GROWTH',
    internalLink: 'project-shorts',
    image: '/media/shorts-pipeline.jpg',
    featured: true,
  },
  {
    title: 'Dragon Combat: Bots That Pass for Players',
    tech: 'RULE-BASED · GAME AI',
    role: 'GAME AI · ROBLOX LUAU',
    desc: 'Aerial dragon PvP where the bot brain is a three-state steering FSM, not a network: patrol through boost rings, gun-run with a quarter-second lead and a 240-stud break-off, evade with a sinusoidal jink. Tuned to one goal: players cannot tell which dragons are bots, and can still beat them.',
    stack: ['Roblox Studio', 'Luau', 'Steering behaviours', 'FSM'],
    metrics: 'µs PER BOT PER FRAME',
    category: 'SYSTEMS',
    image: DRAGON_GIF,
    isGif: true,
    externalUrl: 'https://github.com/watcharaponthod-code/roblox-dragon-combat',
    actionLabel: 'VIEW REPO',
    featured: true,
  },
  {
    title: 'Bitcoin ML Prediction',
    tech: 'ML/DL · TIME SERIES',
    role: 'MACHINE LEARNING ENGINEER',
    desc: 'Sequence and tree models over 12 years of BTC-USD OHLCV with 18 engineered indicators (RSI, MACD, Bollinger Bands, EMA). The LSTM reaches 12.19% MAPE on price regression. The directional classifiers land near chance, which the repo reports rather than hides.',
    stack: ['Python', 'TensorFlow', 'XGBoost', 'scikit-learn'],
    metrics: '12.19% MAPE',
    category: 'AI & RAG',
    internalLink: 'project-bitcoin',
    image: BITCOIN_ARCH,
    featured: true,
  },
  {
    title: 'AlgoTrade: AI Trading Engine',
    tech: 'LLM · AUTOMATION',
    role: 'AI AUTOMATION · FULL-STACK',
    desc: 'Thai LLM (Pathumma Qwen3-8B) analyzes RSI/EMA/VWAP every hour and executes real bracket orders on Alpaca Markets automatically. Four rule-based strategies (Momentum, Mean Reversion, Stat-Arb, Pairs) run in parallel with risk management and Telegram alerts.',
    stack: ['ThaiLLM Qwen3-8B', 'Alpaca Markets', 'Next.js 16', 'Vercel Cron'],
    metrics: 'AI-DRIVEN',
    category: 'AI & RAG',
    internalLink: 'project-trading',
    image: TRADING_DASH,
    featured: true,
  },
  {
    title: 'Ninja Fruit: Pose Game',
    tech: 'DL · POSE ESTIMATION',
    role: 'COMPUTER VISION',
    desc: 'Fruit Ninja-style game controlled by real-time body movement via webcam only. YOLOv8 Pose Detection tracks 17 wrist keypoints per frame to detect slash trajectories at 30+ FPS. Supports up to 3 simultaneous players.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Pygame'],
    metrics: '30+ FPS',
    category: 'COMPUTER VISION',
    internalLink: 'project-ninja',
    image: NINJA_GIF,
    isGif: true,
    featured: true,
  },
  {
    title: 'Subway Kids Runner',
    tech: 'DL · POSE ESTIMATION',
    role: 'COMPUTER VISION',
    desc: 'Subway Surfers-style endless runner controlled by full-body pose. MediaPipe BlazePose tracks 33 landmarks for lane-switch and jump gestures. Deployable as Pygame (local) or browser + FastAPI WebSocket (web mode).',
    stack: ['Python', 'MediaPipe', 'Pygame', 'FastAPI', 'WebSocket'],
    metrics: '60 FPS · WEBCAM',
    category: 'COMPUTER VISION',
    internalLink: 'project-subway',
    image: SUBWAY_GIF,
    isGif: true,
    featured: true,
  },
  // ── NON-FEATURED ──────────────────────────────────────────────────────────
  {
    title: "Bank's EDC Visualizer",
    tech: 'SOFTWARE · WEB',
    role: 'DATA VISUALIZATION ENGINEER',
    desc: 'Interactive map of all EDC terminals across Thailand. Real-time filtering by province, region, type, and status. Built for internal bank operations teams.',
    stack: ['FastAPI', 'Leaflet.js', 'Chart.js', 'PostgreSQL'],
    metrics: 'REAL-TIME MAP',
    category: 'FULL-STACK',
    internalLink: 'project-geomap',
    image: picGeo,
  },
  {
    title: 'Kafka-to-API Connector',
    tech: 'SOFTWARE · BACKEND',
    role: 'MICROSERVICE ENGINEER',
    desc: 'Production microservice managing Kafka → REST API data synchronization with at-least-once delivery, DLQ, and full audit trail. Java 21 + Spring Boot.',
    stack: ['Java 21', 'Spring Boot', 'Apache Kafka', 'PostgreSQL'],
    metrics: 'EVENT-DRIVEN',
    category: 'SYSTEMS',
    internalLink: 'project-kafka',
    image: picKafka,
  },
  {
    title: 'VM Auto-Scaling & Monitoring',
    tech: 'SOFTWARE · INFRA',
    role: 'INFRASTRUCTURE ENGINEER',
    desc: 'Proactive VM auto-scaling system that provisions new nodes before CPU/RAM saturation. Prometheus + Grafana + automated provisioning scripts with < 3 min provision time.',
    stack: ['Prometheus', 'Grafana', 'Python', 'Cloud VM API'],
    metrics: '< 3 MIN PROVISION',
    category: 'SYSTEMS',
    internalLink: 'project-monitoring',
    image: picMonitor,
  },
  {
    title: 'ELIC: AI English Tutor',
    tech: 'LLM · MOBILE',
    role: 'SENIOR PROJECT · KU CHALERMPHRAKIAT',
    desc: 'AI-powered mobile English learning app for Thai learners. Scenario-based conversation (hotel, interview, medical), real-time grammar correction, structured vocabulary tables, 3 gamified exercises, TTS playback via Gemini Voice API. Capstone 2025.',
    stack: ['React Native', 'Expo', 'Google Gemini', 'Firebase', 'FastAPI'],
    metrics: 'CAPSTONE 2025',
    category: 'AI & RAG',
    internalLink: 'project-elic',
    image: ELIC_ARCH,
    featured: true,
  },
  {
    title: 'Donlaya Makeup',
    tech: 'SOFTWARE · WEB',
    role: 'FREELANCE · WEB DESIGN & DEPLOYMENT',
    desc: 'Marketing site for a Singapore makeup artist. Next.js, responsive, live.',
    stack: ['Web Design', 'Responsive UI', 'Deployment', 'SEO', 'Production Launch'],
    metrics: 'LIVE IN PRODUCTION',
    category: 'FULL-STACK',
    image: DONLAYA_WORK,
    externalUrl: 'https://donlayamakeup.sg',
    actionLabel: 'VISIT SITE',
    freelance: true,
  },
  {
    title: 'Google Ads Strategy & Audience Modeling',
    tech: 'DATA · ANALYTICS',
    role: 'FREELANCE · DATA & GROWTH',
    desc: 'Built campaign planning around Google Ads with data visualization, audience analysis, and model-driven targeting. The work covered segment discovery, ad planning, performance reporting, and execution support for ad operations.',
    stack: ['Google Ads', 'Data Visualization', 'Data Science', 'Audience Modeling', 'Campaign Planning'],
    metrics: 'TARGETING STRATEGY',
    category: 'DATA & GROWTH',
    externalUrl: 'https://docs.google.com/document/d/1pLVNmHrFgDCAimQ1L4ZG4IQxuQO4cYX7c-A0bYTeQIg/edit?usp=sharing',
    actionLabel: 'VIEW PLAN',
    freelance: true,
  },
];

type Group = Exclude<Category, 'ALL'>;

// Display order of the grouped sections (01 … 06); the filter buttons follow the same order.
const GROUP_ORDER: Group[] = [
  'AGRI & SATELLITE',
  'COMPUTER VISION',
  'AI & RAG',
  'SYSTEMS',
  'FULL-STACK',
  'DATA & GROWTH',
];

const CATEGORIES: Category[] = ['ALL', ...GROUP_ORDER];

const GROUP_DESCRIPTIONS: Record<Group, string> = {
  'AGRI & SATELLITE': 'Satellite monitoring for a Thai sugar mill: harvest state, field health, yield.',
  'COMPUTER VISION':  'Cameras and microphones that have to work on real hardware.',
  'AI & RAG':         'Retrieval systems and LLM apps, most of them on-premises.',
  'SYSTEMS':          'Backend, infrastructure and game AI.',
  'FULL-STACK':       'Web products shipped end to end, from data layer to live site.',
  'DATA & GROWTH':    'Pipelines and campaigns judged by the numbers they moved.',
};

// The first two groups (flagship work) use the wider two-column grid.
const WIDE_GRID_GROUPS = 2;

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { setView } = useUI();
  const { ref, inView } = useInView(0.06);
  const handleOpen = () => {
    if (p.externalUrl) {
      window.open(p.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (p.internalLink) {
      try { if (p.scrollTo) sessionStorage.setItem('detail-scroll', p.scrollTo); } catch {}
      setView(p.internalLink as any);
    }
  };

  return (
    <div
      ref={ref}
      className="project-card"
      onClick={handleOpen}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.06}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.06}s`,
        cursor: 'pointer',
      }}
    >
      {p.image && (
        <div className="project-thumb-box">
          <img
            src={p.image}
            alt={p.title}
            className="project-thumb-img"
            loading="lazy"
            style={{ imageRendering: p.isGif ? 'auto' : undefined }}
          />
          <div className="thumb-overlay" />
          {p.isGif && (
            <div className="gif-badge mono">LIVE DEMO</div>
          )}
        </div>
      )}

      <div className="project-content-wrap">
        <div className="project-header">
          <span className="project-number mono">{String(index + 1).padStart(2, '0')}</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
            <span className="project-role mono">{p.role}</span>
            <span className="project-badges">
              {p.tech && <span className="tech-badge mono">{p.tech}</span>}
              <span className="category-badge mono">{p.category}</span>
              {p.freelance && <span className="category-badge freelance-badge mono">FREELANCE</span>}
            </span>
          </div>
        </div>

        <h2 className="project-title">{p.title}</h2>
        <p className="project-desc">{p.desc}</p>

        <div className="project-stack-section">
          <div className="project-stack-label mono">STACK</div>
          <div className="project-stack-tags">
            {p.stack.map(t => <span key={t} className="stack-tag mono">{t}</span>)}
          </div>
        </div>

        <div className="project-footer">
          <div className="project-metrics">
            <div className="project-metric-label mono">IMPACT</div>
            <div className="project-metric-value mono">{p.metrics}</div>
          </div>
          <button type="button" className="project-detail-btn mono">
            {p.actionLabel || 'CASE STUDY'} <TbArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectGroup({ group, order, projects, wide }: { group: Group; order: number; projects: Project[]; wide: boolean }) {
  const { ref, inView } = useInView(0.1);
  return (
    <section className="project-group">
      <div
        ref={ref}
        className="group-header"
        style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="group-title mono">
          <span className="group-index">{String(order + 1).padStart(2, '0')}</span>
          <span className="group-sep">·</span>
          <span className="group-label">{group}</span>
        </div>
        <p className="group-desc mono">{GROUP_DESCRIPTIONS[group]}</p>
      </div>
      <div className={`projects-grid${wide ? ' featured-grid' : ''}`}>
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
      </div>
    </section>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category>('ALL');
  const { ref: hRef, inView: hInView } = useInView(0.12);

  // Fixed group order; within a group, featured cards first, then the rest (array order preserved).
  const groups = GROUP_ORDER
    .map((group, order) => {
      const inGroup = ALL_PROJECTS.filter(p => p.category === group);
      const projects = [...inGroup.filter(p => p.featured), ...inGroup.filter(p => !p.featured)];
      return { group, order, projects };
    })
    .filter(g => g.projects.length > 0 && (active === 'ALL' || g.group === active));

  return (
    <div className="section container" style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '8rem' }}>
      <div ref={hRef} style={{ opacity: hInView ? 1 : 0, transform: hInView ? 'none' : 'translateY(28px)', transition: 'all 0.7s ease' }}>
        <SectionHeader
          subtitle="02 / SELECTED WORKS"
          titleLines={['Deep Dives &', 'Case Studies.']}
          description="Production systems, research projects, and freelance delivery work. Filter by discipline: click any card to open the case study, live site, or planning document."
        />
      </div>

      <div className="category-filter">
        {CATEGORIES.map(cat => (
          <button key={cat} className={`filter-btn mono ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>{cat}</button>
        ))}
      </div>

      {groups.map(g => (
        <ProjectGroup
          key={g.group}
          group={g.group}
          order={g.order}
          projects={g.projects}
          wide={g.order < WIDE_GRID_GROUPS}
        />
      ))}

      <style>{`
        .category-filter {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
          margin-bottom: 3rem; margin-top: 0.5rem;
        }
        .filter-btn {
          background: transparent; border: 1px solid #d0d0d0;
          padding: 0.45rem 1.1rem; font-size: 0.62rem; font-weight: 900;
          letter-spacing: 0.1em; cursor: pointer; color: #999;
          transition: all 0.25s ease;
        }
        .filter-btn:hover { border-color: #fff; color: #fff; }
        .filter-btn.active { background: #fff; color: #000; border-color: #fff; }

        /* Group sections */
        .project-group + .project-group { margin-top: 5rem; }
        .group-header {
          display: flex; justify-content: space-between; align-items: baseline;
          gap: 2rem; padding-top: 1.2rem; margin-bottom: 1.8rem;
          border-top: 1px solid #333;
        }
        .group-title {
          display: flex; align-items: baseline; gap: 0.6rem;
          font-size: 0.62rem; font-weight: 900; letter-spacing: 0.28em;
          color: #fff; white-space: nowrap;
        }
        .group-index { color: #666; }
        .group-sep { color: #444; }
        .group-desc {
          margin: 0; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.04em;
          color: #888; text-align: right; max-width: 34rem; line-height: 1.6;
        }

        .project-badges {
          display: inline-flex; gap: 0.3rem; align-items: center; justify-content: flex-end;
          flex-wrap: wrap;
        }
        .freelance-badge {
          background: transparent; color: #999;
          border: 1px solid #555;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 1.8rem;
        }
        .featured-grid {
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          gap: 2rem;
        }

        /* Card */
        .project-card {
          background: #000; border: 1px solid #e8e8e8;
          display: flex; flex-direction: column; overflow: hidden;
          transition:
            box-shadow 0.4s ease,
            transform 0.4s cubic-bezier(0.16,1,0.3,1),
            border-color 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 72px rgba(255,255,255,0.13);
          border-color: #bbb;
        }

        /* Thumbnail, NO greyscale, full colour */
        .project-thumb-box {
          height: 220px; overflow: hidden;
          background: #fff; position: relative;
          border-bottom: 1px solid #e8e8e8;
        }
        .project-thumb-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .project-card:hover .project-thumb-img { transform: scale(1.05); }
        .thumb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.3));
        }

        /* GIF badge */
        .gif-badge {
          position: absolute; top: 0.8rem; right: 0.8rem;
          background: rgba(255,255,255,0.75); color: #000;
          padding: 0.25rem 0.65rem; font-size: 0.52rem; font-weight: 900;
          letter-spacing: 0.14em;
          border: 1px solid rgba(0,0,0,0.2);
        }

        .project-content-wrap {
          padding: 1.8rem; flex: 1; display: flex; flex-direction: column;
        }
        .project-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 1rem;
        }
        .project-number {
          font-size: 1.9rem; font-weight: 900; opacity: 0.07; color: #fff; line-height: 1;
        }
        .project-role {
          font-size: 0.57rem; font-weight: 900;
          border: 1.5px solid #ffffff; padding: 0.2rem 0.6rem; letter-spacing: 0.08em;
        }
        .tech-badge { background: #000; color: #fff; font-size: 0.55rem; font-weight: 900; letter-spacing: 0.14em; padding: 0.22rem 0.5rem; white-space: nowrap; }
        .category-badge {
          font-size: 0.51rem; font-weight: 900;
          background: #f2f2f2; padding: 0.16rem 0.5rem;
          color: #888; letter-spacing: 0.1em;
        }
        .project-title {
          font-size: 1.18rem; font-weight: 950; letter-spacing: -0.04em;
          margin-bottom: 0.7rem; text-transform: uppercase;
        }
        .project-desc {
          font-size: 0.87rem; line-height: 1.68; color: #444;
          margin-bottom: 1.4rem; flex: 1;
        }

        .project-stack-label {
          font-size: 0.57rem; font-weight: 900; color: #bbb; margin-bottom: 0.5rem;
        }
        .project-stack-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.4rem; }
        .stack-tag {
          background: #f5f5f5; padding: 0.14rem 0.5rem;
          font-size: 0.57rem; font-weight: 800; color: #888;
        }

        .project-footer {
          border-top: 1px solid #ebebeb; padding-top: 1.2rem;
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .project-metric-label { font-size: 0.52rem; font-weight: 900; color: #bbb; margin-bottom: 0.18rem; }
        .project-metric-value { font-size: 0.9rem; font-weight: 950; }

        .project-detail-btn {
          background: #000; color: #fff; border: 1.5px solid #ffffff;
          padding: 0.5rem 1rem; font-family: var(--font-mono); font-size: 0.61rem;
          font-weight: 900; display: flex; align-items: center; gap: 0.4rem;
          letter-spacing: 0.08em; cursor: pointer;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
        }
        .project-card:hover .project-detail-btn {
          background: #fff; color: #000; border-color: #fff;
        }

        @media (max-width: 900px) {
          .projects-grid, .featured-grid {
            grid-template-columns: 1fr; gap: 1.2rem;
          }
          .project-thumb-box { height: 200px; }
          .project-group + .project-group { margin-top: 3.5rem; }
          .group-header {
            flex-direction: column; align-items: flex-start; gap: 0.6rem;
          }
          .group-desc { text-align: left; max-width: none; }
        }
        @media (max-width: 640px) {
          .project-content-wrap { padding: 1.3rem; }
          .project-title { font-size: 1.05rem; }
          .filter-btn { padding: 0.3rem 0.7rem; font-size: 0.58rem; }
        }
      `}</style>
    </div>
  );
}
