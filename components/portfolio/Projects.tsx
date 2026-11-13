import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { TbArrowRight } from 'react-icons/tb';
import { useUI } from '../../lib/state';
import { useAuto } from '../../lib/i18n/auto';
import { galleryFor } from '../../lib/galleries';
import { useLang } from '../../lib/i18n';
import { PROJECT_TH, GROUP_TH, UI_TH, ACTION_LABEL_TH, TECH_TH, ROLE_TH } from '../../lib/i18n/projects.th';

import picGeo     from '../project/geomap/LINE_20260324_213523.jpg';
import picKafka   from '../project/kafka/kafka1.png';
import picMonitor from '../project/cpu/download.png';

const EMB_DIAGRAM   = 'https://raw.githubusercontent.com/watcharaponthod-code/embedding_rag/main/diagram/diagram.png';
const BITCOIN_ARCH  = 'https://raw.githubusercontent.com/watcharaponthod-code/bitcoin-ml-prediction/main/architecture_diagram.png';
const TRADING_DASH  = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/dashboard.png';
const NINJA_GIF     = 'https://raw.githubusercontent.com/watcharaponthod-code/Ninja_fruit/main/demo/demo-gameplay.gif';
const SUBWAY_GIF    = 'https://raw.githubusercontent.com/watcharaponthod-code/subway-kids/main/demo/demo-gameplay.gif';
const RAG_CHAT_DIAG = 'https://raw.githubusercontent.com/watcharaponthod-code/rag-chat/main/diagram/diagram.png';
const DONLAYA_WORK  = 'https://lh3.googleusercontent.com/d/1LlQNx6MpBvUXJ9VEZEzTk_YvhFnBLEA4=w1600';
const DUST_GIF      = 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/media/dust_real.gif';
const CANEGATE_LIVE = 'https://raw.githubusercontent.com/watcharaponthod-code/canegate-assets/main/screen-live.png';
const DRAGON_GIF    = 'https://raw.githubusercontent.com/watcharaponthod-code/roblox-dragon-combat/main/media/dragon_combat.gif';

// shared motion settings (cheap: opacity + translateY only, runs once)
const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: '-80px' } as const;
const CARD_VIEWPORT = { once: true, margin: '-40px' } as const;

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
    desc: 'Tells a sugar mill which cane fields have been harvested, and when, from satellite images. Staff used to drive out and check thousands of fields by hand. The AI reads Sentinel-2 photos, and when clouds hide the ground it switches to Sentinel-1 radar, which sees through them. On 8,924 fields it never trained on: precision 0.869, recall 0.897.',
    stack: ['Sentinel-2 NDVI', 'Sentinel-1 VH', 'rasterio', 'FastAPI', 'Railway'],
    metrics: 'F1 0.883 · 8,924 FIELDS',
    category: 'AGRI & SATELLITE',
    internalLink: 'project-cropscan',
    image: '/agri/cropscan-fields.png',
    featured: true,
  },
  {
    title: 'Yield Pro: Health, Cause & Yield',
    tech: 'ML/DL · REMOTE SENSING',
    role: 'MACHINE LEARNING · SAR→NDVI GAPFILL',
    desc: 'A health check and yield forecast for every cane field, built from satellite data. It flags fields in trouble, says why (drought, decline or recovery) and gives a tonnes-per-rai range, so the mill knows where to send people and how much cane to expect. When clouds block the camera, a model trained on 449k pixels rebuilds the crop signal from radar, with 95.7% of values within ±0.10.',
    stack: ['LightGBM', 'PyTorch', 'CHIRPS', 'SoilGrids', 'MLflow', 'Kaggle GPU'],
    metrics: 'GAPFILL 95.7% WITHIN ±0.10',
    category: 'AGRI & SATELLITE',
    internalLink: 'project-yieldpro',
    image: '/agri/sar-gapfill.png',
    featured: true,
  },
  {
    title: 'Enterprise RAG Ecosystem',
    tech: 'LLM · RAG',
    role: 'FULL-STACK AI ENGINEER',
    desc: 'A chat assistant that answers staff questions from the company\'s own documents and bug tracker. The network has no internet access, so everything runs on the company\'s own servers, the LLM included, and no data leaves the building. Built with LangGraph agents, BGE-M3 search, pgvector and Ollama.',
    stack: ['LangGraph', 'BGE-M3', 'pgvector', 'Ollama', 'Kubernetes'],
    metrics: '100% ON-PREMISES',
    category: 'AI & RAG',
    internalLink: 'project-rag-ecosystem',
    image: RAG_CHAT_DIAG,
    featured: true,
  },
  {
    title: 'Burnt vs Fresh Cane Grading',
    tech: 'DL · COMPUTER VISION',
    role: 'TRAINED CLASSIFIER · CCTV',
    desc: 'A weighbridge camera that tells burnt cane from fresh cane on every truck. Burnt cane is paid less, and grading it by eye is slow and easy to dispute. The AI is an image classifier trained on 8,612 real CCTV frames. It works well on that camera and needs retraining if the camera moves.',
    stack: ['PyTorch', 'EfficientNet-B0', 'ONNX'],
    metrics: '8,612 REAL CCTV FRAMES',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-1',
    image: '/media/burnt-burnt-98.jpg',
    featured: true,
  },
  {
    title: 'CaneSight: Dust & Dirty-Cane Monitoring',
    tech: 'DL + RULE · COMPUTER VISION · MLOPS',
    role: 'CCTV · K3S · MLFLOW · GITOPS',
    desc: 'Watches the tipping yard through the mill\'s CCTV and turns every truck dump into a result card for the mill\'s app: a dust level from 0 to 3, a leafy-cane check, burnt or fresh, a video clip, and the truck it belongs to from the queue system. Seven top cameras tell which dump is lifting and a side camera measures the dust. Everything runs on a CPU-only k3s server inside the mill. Models are trained on Kaggle, have to pass a gate that is written down before the test, and are stored in an MLflow registry. A person approves each promotion, then a sync job deploys the model with a checksum check and rolls back if the rollout fails. A daily job tracks score drift and alerts go to Telegram. The gate does reject models: the latest leaf-model candidate failed it on 300 new trucks, so the older version stays in production.',
    stack: ['DINOv2', 'EfficientNet-B0', 'OpenVINO', 'k3s', 'MLflow', 'Flux', 'Kaggle'],
    metrics: 'MLOPS LEVEL 2 · LIVE AT THE MILL',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-5',
    image: 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/media/dust_real.gif',
    isGif: true,
  },
  {
    title: 'Contaminant Detection by Sound',
    tech: 'DL · AUDIO',
    role: 'AUDIO CNN · MICROPHONE',
    desc: 'A microphone that hears sand and rocks hit the conveyor, inside the pile where a camera can\'t see. Contaminants wear down the mill\'s machines and cut the sugar yield. A small CNN listens to real recordings from the tipping bay. It catches sand reliably; rocks and metal aren\'t there yet (recall 0.47–0.59).',
    stack: ['log-mel CNN', 'soundfile', 'Stable Audio Open'],
    metrics: 'SAND SOLVED · REAL AUDIO',
    image: '/media/acoustic-overview.jpg',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-6',
  },
  {
    title: 'Conveyor Cane Flow',
    tech: 'DL · COMPUTER VISION',
    role: 'SELF-TRAINING · 70 FPS',
    desc: 'Watches cane on the moving conveyor and measures how much of it is leaf. Leaf carries no sugar, and this gives the mill a steady quality reading instead of one photo per truck. The segmentation model taught itself from a small hand-labelled set on real mill video, and runs at 70 fps.',
    stack: ['YOLO', 'Self-training', 'OpenCV'],
    metrics: '70 FPS ON REAL VIDEO',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-7',
    image: 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/media/caneflow_real.gif',
    isGif: true,
  },
  {
    title: 'Thai Truck Plate OCR',
    tech: 'DL + RULE · OCR',
    role: 'TWO READERS · ZERO WRONG',
    desc: 'Reads Thai license plates at the weighbridge so every load is paid to the right farmer. Two separate readers check each other, and when they aren\'t sure the system asks a person instead of guessing. On 60 hard images it made 0 wrong reads.',
    stack: ['ONNX', 'OpenCV', 'Cross-frame voting'],
    metrics: '0 WRONG OF 60 HARD IMAGES',
    image: '/media/plate-ocr.jpg',
    category: 'COMPUTER VISION',
    internalLink: 'project-scv-8',
  },
  {
    title: 'CaneGate: Truck Inspection',
    tech: 'DL · COMPUTER VISION',
    role: 'PRODUCTION CV · DOCKER',
    desc: 'The full AI inspection station at the weighbridge, packaged so the mill can run it day to day. A side camera grades the cane, a front camera reads the plate, and staff watch each truck live and confirm the result. It ships as Docker images, with shift stats and a test mode that works without trucks.',
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
    desc: 'An AI pipeline that runs a YouTube Shorts channel almost on its own. Each day it reads yesterday\'s analytics, picks the next topic, generates clips with a consistent AI character, checks every frame and uploads on schedule. The channel, BudyStory, reached 3.34M views and 5,510 subscribers in its first weeks.',
    stack: ['Python', 'YouTube Analytics API', 'meta.ai', 'Graph API', 'ffmpeg'],
    metrics: '3.34M VIEWS · 189 CLIPS',
    category: 'DATA & GROWTH',
    internalLink: 'project-shorts',
    image: '/media/shorts-pipeline.jpg',
    featured: true,
  },
  {
    title: 'AlgoTrade: AI Trading Engine',
    tech: 'LLM · AUTOMATION',
    role: 'AI AUTOMATION · FULL-STACK',
    desc: 'A trading bot where a Thai LLM (Pathumma Qwen3-8B) reads market indicators every hour and places real orders on Alpaca Markets. Four strategies run side by side with risk limits and Telegram alerts, so every trade follows a written rule.',
    stack: ['ThaiLLM Qwen3-8B', 'Alpaca Markets', 'Next.js 16', 'Vercel Cron'],
    metrics: 'AI-DRIVEN',
    category: 'AI & RAG',
    internalLink: 'project-trading',
    image: TRADING_DASH,
    featured: true,
  },
  {
    title: 'ELIC: AI English Tutor',
    tech: 'LLM · MOBILE',
    role: 'SENIOR PROJECT · KU CHALERMPHRAKIAT',
    desc: 'A phone app that helps Thai learners practice English by role-playing real situations, like a hotel check-in or a job interview. The AI plays the other person, fixes your grammar as you go and reads its replies aloud. My capstone project, 2025.',
    stack: ['React Native', 'Expo', 'Google Gemini', 'Firebase', 'FastAPI'],
    metrics: 'CAPSTONE 2025',
    category: 'AI & RAG',
    internalLink: 'project-elic',
    image: 'https://raw.githubusercontent.com/watcharaponthod-code/elic/main/docs/images/conversation-roles.jpg',
    featured: true,
  },

];

type Group = Exclude<Category, 'ALL'>;

// Display order of the grouped sections (01 … 06); the filter buttons follow the same order.
const GROUP_ORDER: Group[] = [
  'AGRI & SATELLITE',
  'COMPUTER VISION',
  'AI & RAG',
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
// The four case studies shown before "show all" (also listed in the static fallback in index.html).
const FLAGSHIP = ['CropScan: Harvest Monitoring', 'Yield Pro: Health, Cause & Yield', 'CaneSight: Dust & Dirty-Cane Monitoring', 'CaneGate: Truck Inspection', 'Enterprise RAG Ecosystem', 'YouTube Shorts Automation'];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { lang } = useLang();
  const [hovered, setHovered] = useState(false);
  const [opening, setOpening] = useState(false);
  const gallery = galleryFor(p.internalLink, p.title);
  const preview = gallery.slice(0, 6);
  const th = lang === 'th' ? PROJECT_TH[p.title] : undefined;
  const auto = useAuto(lang === 'th' && !th ? [p.title, p.role, p.desc] : []);
  const T = (s?: string) => (s ? (lang === 'th' ? auto(s) : s) : '');
  const title = th?.title || T(p.title);
  const techLabel = lang === 'th' ? (TECH_TH[p.tech || ''] || p.tech) : p.tech;
  const categoryLabel = lang === 'th' ? (GROUP_TH[p.category]?.label || p.category) : p.category;
  const role = th?.role || (lang === 'th' ? ROLE_TH[p.role] : undefined) || T(p.role);
  const desc = th?.desc || T(p.desc);
  const metrics = th?.metrics || p.metrics;
  const action = lang === 'th'
    ? (p.actionLabel ? (ACTION_LABEL_TH[p.actionLabel] || p.actionLabel) : UI_TH.caseStudy)
    : (p.actionLabel || 'CASE STUDY');
  const { setView } = useUI();
  const reduce = useReducedMotion();
  const handleOpen = () => {
    if (p.externalUrl) {
      window.open(p.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (p.internalLink) {
      try { if (p.scrollTo) sessionStorage.setItem('detail-scroll', p.scrollTo); } catch {}
      if (reduce) { setView(p.internalLink as any); return; }
      setOpening(true);
      window.setTimeout(() => setView(p.internalLink as any), 260);
    }
  };

  return (
    <motion.div
      className="project-card"
      onClick={handleOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={opening ? { scale: 1.03, opacity: 0.35 } : {}}
      whileHover={reduce || opening ? undefined : { y: -4 }}
      viewport={CARD_VIEWPORT}
      transition={{ duration: opening ? 0.26 : 0.55, ease: EASE, delay: opening ? 0 : Math.min(index, 8) * 0.05 }}
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
            <div className="gif-badge mono">{lang === 'th' ? UI_TH.liveDemo : 'LIVE DEMO'}</div>
          )}
          {preview.length > 0 && (
            <motion.div
              className="thumb-grid"
              initial={false}
              animate={{ opacity: hovered && !reduce ? 1 : 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              aria-hidden={!hovered}
            >
              <div className={`thumb-grid-inner n${Math.min(preview.length, 6)}`}>
                {preview.map((src, i) => (
                  <motion.div
                    key={src}
                    className="thumb-cell"
                    initial={false}
                    animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
                    transition={{ duration: 0.3, ease: EASE, delay: hovered ? i * 0.04 : 0 }}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </motion.div>
                ))}
              </div>
              <div className="thumb-grid-label mono">
                {lang === 'th' ? `${gallery.length} ภาพในกรณีศึกษา` : `${gallery.length} image${gallery.length === 1 ? '' : 's'} inside`}
              </div>
            </motion.div>
          )}
        </div>
      )}

      <div className="project-content-wrap">
        <div className="project-header">
          <span className="project-number mono">{String(index + 1).padStart(2, '0')}</span>
          <div className="project-meta">
            <span className="project-role mono">{role}</span>
            <span className="project-badges">
              {techLabel && <span className="tech-badge mono">{techLabel}</span>}
              <span className="category-badge mono">{categoryLabel}</span>
              {p.freelance && <span className="category-badge freelance-badge mono">{lang === 'th' ? UI_TH.freelance : 'FREELANCE'}</span>}
            </span>
          </div>
        </div>

        <h2 className="project-title">{title}</h2>
        <p className="project-desc">{desc}</p>

        <div className="project-stack-section">
          <div className="project-stack-label mono">{lang === 'th' ? UI_TH.stack : 'STACK'}</div>
          <div className="project-stack-tags">
            {p.stack.map(t => <span key={t} className="stack-tag mono">{t}</span>)}
          </div>
        </div>

        <div className="project-footer">
          <div className="project-metrics">
            <div className="project-metric-label mono">{lang === 'th' ? UI_TH.impact : 'IMPACT'}</div>
            <div className="project-metric-value mono">{metrics}</div>
          </div>
          <button type="button" className="project-detail-btn mono">
            {action} <TbArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectGroup({ group, order, projects, wide }: { group: Group; order: number; projects: Project[]; wide: boolean }) {
  const { lang } = useLang();
  const gth = lang === 'th' ? GROUP_TH[group] : undefined;
  const reduce = useReducedMotion();
  return (
    <section className="project-group">
      <motion.div
        className="group-header"
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        {/* growing top rule */}
        <motion.span
          className="group-rule"
          aria-hidden
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
          transition={{ duration: reduce ? 0 : 0.8, ease: EASE }}
        />
        <motion.div
          className="group-title mono"
          variants={{ hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          <span className="group-index">{String(order + 1).padStart(2, '0')}</span>
          <span className="group-sep">·</span>
          <span className="group-label">{gth?.label || group}</span>
        </motion.div>
        <motion.p
          className="group-desc mono"
          variants={{ hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.18 }}
        >
          {gth?.desc || GROUP_DESCRIPTIONS[group]}
        </motion.p>
      </motion.div>
      <div className={`projects-grid${wide ? ' featured-grid' : ''}`}>
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
      </div>
    </section>
  );
}

export default function Projects() {
  const { lang } = useLang();
  const [active, setActive] = useState<Category>('ALL');
  const [showAll, setShowAll] = useState(false);
  const flagshipOnly = true; // big projects only; set false to bring back the full list

  // Fixed group order; within a group, featured cards first, then the rest (array order preserved).
  const groups = GROUP_ORDER
    .map((group, order) => {
      const inGroup = ALL_PROJECTS.filter(p => p.category === group && (!flagshipOnly || FLAGSHIP.includes(p.title)));
      const projects = [...inGroup.filter(p => p.featured), ...inGroup.filter(p => !p.featured)];
      return { group, order, projects };
    })
    .filter(g => g.projects.length > 0 && (active === 'ALL' || g.group === active));

  return (
    <div className="section container projects-section">
      <SectionHeader
        subtitle={lang === 'th' ? UI_TH.sectionSubtitle : "02 / SELECTED WORKS"}
        titleLines={lang === 'th' ? [UI_TH.sectionHeader] : ['Main', 'projects.']}
        description={lang === 'th' ? UI_TH.sectionDesc : 'Six systems I built, each with the result I measured. Click a card for details.'}
      />


      {/* four flagship cards in one grid; the per-discipline groups below left single orphan cards */}
      {flagshipOnly && (
        <div className="projects-grid featured-grid">
          {FLAGSHIP.map((title, i) => <ProjectCard key={title} p={ALL_PROJECTS.find(p => p.title === title)!} index={i} />)}
        </div>
      )}
      {!flagshipOnly && groups.map(g => (
        <ProjectGroup
          key={g.group}
          group={g.group}
          order={g.order}
          projects={g.projects}
          wide={g.order < WIDE_GRID_GROUPS}
        />
      ))}


      <style>{`
        .projects-section { justify-content: flex-start; }

        /* ── Filter row ── */
        .category-filter {
          display: flex; flex-wrap: wrap; gap: var(--space-2);
          margin-bottom: var(--section-gap);
        }
        .filter-btn {
          background: transparent; border: 1px solid var(--border-strong);
          padding: 0.5rem 1.1rem; font-size: var(--text-2xs); font-weight: 700;
          letter-spacing: 0.14em; cursor: pointer; color: var(--text-tertiary);
          border-radius: 999px;
          transition: color var(--dur-fast) ease, border-color var(--dur-fast) ease, background var(--dur-fast) ease;
        }
        .filter-btn:hover { border-color: var(--text-primary); color: var(--text-primary); }
        .filter-btn.active { background: var(--text-primary); color: #fff; border-color: var(--text-primary); }

        /* ── Group sections ── */
        .project-group + .project-group { margin-top: var(--section-gap); }
        .group-header {
          position: relative;
          display: flex; justify-content: space-between; align-items: baseline;
          gap: var(--space-6); padding-top: var(--space-4); margin-bottom: var(--space-6);
        }
        .group-rule {
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: var(--text-primary); transform-origin: left center;
        }
        .group-title {
          display: flex; align-items: baseline; gap: 0.6rem;
          font-size: var(--text-xs); font-weight: 700; letter-spacing: 0.28em;
          color: var(--text-primary); white-space: nowrap; text-transform: uppercase;
        }
        .group-index { color: var(--text-tertiary); }
        .group-sep { color: var(--border-accent); }
        .group-desc {
          margin: 0; font-size: var(--text-xs); font-weight: 400; letter-spacing: 0.02em;
          color: var(--text-tertiary); text-align: right; max-width: 36rem; line-height: 1.6;
        }

        /* ── Grid ── */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: var(--space-5);
          align-items: stretch;
        }
        .featured-grid {
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          gap: var(--space-6);
        }

        /* ── Card ── */
        .project-card {
          position: relative;
          height: 100%;
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: 4px;
          display: flex; flex-direction: column; overflow: hidden;
          cursor: pointer;
          transition: box-shadow var(--dur-base) ease, border-color var(--dur-fast) ease;
        }
        .project-card:hover {
          box-shadow: var(--shadow-card);
          border-color: var(--border-accent);
        }

        /* Thumbnail: fixed 220px, cover, no greyscale */
        .project-thumb-box {
          height: 220px; flex: 0 0 220px; overflow: hidden;
          background: var(--bg-tertiary); position: relative;
          border-bottom: 1px solid var(--border-light);
        }
        .project-thumb-img {
          width: 100%; height: 100%; object-fit: contain; object-position: center; display: block;
          background: #fff;
          transition: transform 0.7s var(--ease-out);
        }
        .project-card:hover .project-thumb-img { transform: scale(1.03); }
        .thumb-grid {
          position: absolute; inset: 0; background: #fff;
          display: flex; flex-direction: column; pointer-events: none;
        }
        .thumb-grid-inner {
          flex: 1; display: grid; gap: 3px; padding: 3px; min-height: 0;
          grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr);
        }
        .thumb-grid-inner.n1 { grid-template-columns: 1fr; grid-template-rows: 1fr; }
        .thumb-grid-inner.n2 { grid-template-columns: repeat(2, 1fr); grid-template-rows: 1fr; }
        .thumb-grid-inner.n3 { grid-template-columns: repeat(3, 1fr); grid-template-rows: 1fr; }
        .thumb-grid-inner.n4 { grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 1fr); }
        .thumb-cell { overflow: hidden; background: #f4f4f2; }
        .thumb-cell img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .thumb-grid-inner.n1 .thumb-cell img { object-fit: contain; background: #fff; }
        .thumb-grid-label {
          padding: 0.3rem 0.5rem; font-size: 0.52rem; letter-spacing: 0.16em;
          color: #fff; background: #000; text-align: center;
        }
        @media (hover: none) { .thumb-grid { display: none; } }
        .thumb-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(to bottom, transparent 60%, rgba(16,16,20,0.06));
        }

        .gif-badge {
          position: absolute; top: var(--space-3); right: var(--space-3);
          background: rgba(255,255,255,0.9); color: var(--text-primary);
          padding: 0.25rem 0.6rem; font-size: 0.52rem; font-weight: 700;
          letter-spacing: 0.14em; border: 1px solid var(--border-strong);
          backdrop-filter: blur(4px);
        }

        .project-content-wrap {
          padding: var(--space-5) var(--space-5) var(--space-5);
          flex: 1 1 auto; display: flex; flex-direction: column; min-width: 0;
        }
        .project-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: var(--space-3); margin-bottom: var(--space-4);
        }
        .project-meta {
          display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem; min-width: 0;
        }
        .project-number {
          font-size: 1.75rem; font-weight: 700; line-height: 1;
          color: var(--text-primary); opacity: 0.08; flex: 0 0 auto;
          transition: opacity var(--dur-fast) ease;
        }
        .project-card:hover .project-number { opacity: 0.18; }
        .project-role {
          font-size: 0.57rem; font-weight: 700; letter-spacing: 0.08em;
          border: 1px solid var(--border-strong); color: var(--text-tertiary);
          padding: 0.22rem 0.6rem; text-align: right;
          transition: color var(--dur-fast) ease, border-color var(--dur-fast) ease;
        }
        .project-card:hover .project-role { border-color: var(--text-primary); color: var(--text-primary); }
        .project-badges {
          display: inline-flex; gap: 0.3rem; align-items: center; justify-content: flex-end;
          flex-wrap: wrap;
        }
        .tech-badge {
          background: var(--text-primary); color: #fff; font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.14em; padding: 0.22rem 0.5rem; white-space: nowrap;
        }
        .category-badge {
          font-size: 0.51rem; font-weight: 700; letter-spacing: 0.1em;
          background: var(--bg-tertiary); color: var(--text-tertiary); padding: 0.2rem 0.5rem;
          white-space: nowrap;
        }
        .freelance-badge { background: transparent; border: 1px solid var(--border-strong); }

        .project-title {
          font-size: 1.15rem; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
          margin-bottom: var(--space-3); text-transform: uppercase; color: var(--text-primary);
          text-wrap: balance;
        }
        .project-desc {
          font-size: var(--text-sm); line-height: 1.68; color: var(--text-secondary);
          font-weight: 400; margin-bottom: var(--space-5); flex: 1 1 auto;
        }

        .project-stack-label {
          font-size: 0.57rem; font-weight: 700; letter-spacing: 0.18em;
          color: var(--text-tertiary); margin-bottom: var(--space-2);
        }
        .project-stack-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: var(--space-5); min-width: 0; }
        .stack-tag {
          background: var(--bg-tertiary); padding: 0.18rem 0.5rem;
          font-size: 0.57rem; font-weight: 700; color: var(--text-secondary);
          white-space: nowrap; max-width: 100%; overflow: hidden; text-overflow: ellipsis;
        }

        /* footer pinned to the bottom of every card in a row */
        .project-footer {
          margin-top: auto;
          border-top: 1px solid var(--border-light); padding-top: var(--space-4);
          display: flex; justify-content: space-between; align-items: flex-end; gap: var(--space-3);
        }
        .project-metrics { min-width: 0; }
        .project-metric-label { font-size: 0.52rem; font-weight: 700; letter-spacing: 0.18em; color: var(--text-tertiary); margin-bottom: 0.2rem; }
        .project-metric-value { font-size: 0.85rem; font-weight: 700; color: var(--text-primary); line-height: 1.3; }

        .project-detail-btn {
          flex: 0 0 auto;
          background: transparent; color: var(--text-primary); border: 1px solid var(--text-primary);
          padding: 0.5rem 0.9rem; font-family: var(--font-mono); font-size: 0.6rem;
          font-weight: 700; display: inline-flex; align-items: center; gap: 0.4rem;
          letter-spacing: 0.1em; cursor: pointer; white-space: nowrap;
          transition: background var(--dur-fast) ease, color var(--dur-fast) ease;
        }
        .project-detail-btn svg { transition: transform var(--dur-fast) var(--ease-out); }
        .project-card:hover .project-detail-btn { background: var(--text-primary); color: #fff; }
        .project-card:hover .project-detail-btn svg { transform: translateX(3px); }

        @media (max-width: 900px) {
          .projects-grid, .featured-grid {
            grid-template-columns: 1fr; gap: var(--space-4);
          }
          .project-thumb-box { height: 200px; flex-basis: 200px; }
          .project-group + .project-group { margin-top: var(--space-8); }
          .group-header {
            flex-direction: column; align-items: flex-start; gap: var(--space-3);
            margin-bottom: var(--space-5);
          }
          .group-desc { text-align: left; max-width: none; }
        }
        @media (max-width: 640px) {
          .category-filter { margin-bottom: var(--space-7); }
          .filter-btn { padding: 0.4rem 0.8rem; font-size: 0.56rem; }
          .project-content-wrap { padding: var(--space-4); }
          .project-header { flex-direction: column; gap: var(--space-2); }
          .project-meta { align-items: flex-start; }
          .project-badges { justify-content: flex-start; }
          .project-role { text-align: left; }
          .project-number { display: none; }
          .project-title { font-size: 1.05rem; }
          .project-footer { flex-wrap: wrap; align-items: center; }
          .project-detail-btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
