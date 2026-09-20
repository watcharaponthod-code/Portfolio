// What the visitor can DO with an answer. The chat does not just reply: it
// hands back buttons that open the matching case study on the site, the
// repository, or a way to get in touch. Derived on the server from the chunks
// retrieval actually used, so the buttons always match what was answered.

export interface ChatAction {
  kind: 'view' | 'link' | 'copy';
  /** a picture of what the button opens, so the answer shows rather than tells */
  image?: string;
  label: { en: string; th: string };
  /** for kind 'view': the internal route the site opens */
  view?: string;
  /** for kind 'link': an external URL */
  url?: string;
  /** for kind 'copy': the text to copy */
  value?: string;
}

interface Entry { view?: string; url?: string; en: string; th: string; image?: string; match: RegExp }

// knowledge-base section id -> the page on this site that covers it
const BY_SECTION: Record<string, Entry[]> = {
  'projects-agri-ai': [
    { view: 'project-cropscan', en: 'Open CropScan case study', th: 'เปิดกรณีศึกษา CropScan', match: /cropscan|harvest|cut|ตัด|เก็บเกี่ยว/i },
    { view: 'project-yieldpro', en: 'Open Yield Pro case study', th: 'เปิดกรณีศึกษา Yield Pro', match: /yield ?pro|yield|gapfill|ndvi|ผลผลิต|สุขภาพ/i },
  ],
  'projects-sugarcane-cv': [
    { view: 'project-sugarcane-cv', en: 'Open the nine detectors', th: 'เปิดหน้ารวมเก้าตัวตรวจจับ', match: /sugarcane-cv|nine|dust|burnt|plate|conveyor|acoustic|ฝุ่น|ไฟไหม้|ทะเบียน|สายพาน|เสียง|เก้า/i },
    { url: 'https://github.com/watcharaponthod-code/sugarcane-cv', en: 'sugarcane-cv on GitHub', th: 'sugarcane-cv บน GitHub', match: /sugarcane-cv|github|repo|โค้ด/i },
  ],
  'projects-ekyc': [{ url: 'https://github.com/watcharaponthod-code/ekyc', en: 'eKYC on GitHub', th: 'eKYC บน GitHub', match: /ekyc|liveness|face/i }],
  'projects-shorts-automation': [{ view: 'project-shorts', en: 'Open the automation case study', th: 'เปิดกรณีศึกษาระบบอัตโนมัติ', match: /shorts|youtube|budystory|asmr|คลิป|ยูทูบ/i }],
  'projects-dragon-combat': [{ url: 'https://github.com/watcharaponthod-code/roblox-dragon-combat', en: 'Dragon Combat on GitHub', th: 'Dragon Combat บน GitHub', match: /dragon|roblox|bot/i }],
  'projects-rag-chat': [{ view: 'project-rag-ecosystem', en: 'Open the RAG case study', th: 'เปิดกรณีศึกษา RAG', match: /rag|langgraph|on-prem|ollama|mantis|ค้นเอกสาร/i }],
  'projects-embedding-rag': [{ view: 'project-embedding-rag', en: 'Open Vector Docs', th: 'เปิด Vector Docs', match: /vector docs|embedding|bge|pgvector|rrf/i }],
  'projects-bitcoin-ml': [{ view: 'project-bitcoin', en: 'Open the Bitcoin ML case study', th: 'เปิดกรณีศึกษา Bitcoin ML', match: /bitcoin|btc|lstm|บิตคอยน์/i }],
  'projects-ninja-fruit': [{ view: 'project-ninja', en: 'Open Ninja Fruit', th: 'เปิด Ninja Fruit', match: /ninja|fruit|yolov8 pose/i }],
  'projects-subway-kids': [{ view: 'project-subway', en: 'Open Subway Kids', th: 'เปิด Subway Kids', match: /subway|mediapipe|runner/i }],
  'projects-trading': [{ view: 'project-trading', en: 'Open AlgoTrade', th: 'เปิด AlgoTrade', match: /algotrade|trading|alpaca|เทรด/i }],
  'projects-elic': [{ view: 'project-elic', en: 'Open ELIC', th: 'เปิด ELIC', match: /elic|english|ภาษาอังกฤษ/i }],
  'projects-edc-map': [{ view: 'project-geomap', en: 'Open the EDC map', th: 'เปิดแผนที่ EDC', match: /edc|leaflet|แผนที่/i }],
  'projects-kafka-connector': [{ view: 'project-kafka', en: 'Open the Kafka connector', th: 'เปิด Kafka connector', match: /kafka|spring boot|vhq/i }],
  'about': [
    { url: 'mailto:watcharapon.thod@gmail.com', en: 'Email Watcharapon', th: 'ส่งอีเมล', match: /email|อีเมล|contact|ติดต่อ/i },
    { url: 'https://github.com/watcharaponthod-code', en: 'GitHub profile', th: 'โปรไฟล์ GitHub', match: /github/i },
  ],
  'experience-sycapt': [{ view: 'project-rag-ecosystem', en: 'See the work from that role', th: 'ดูผลงานจากงานนั้น', match: /sycapt|internship|co-op|ฝึกงาน|rag/i }],
};

// One representative picture per case study, so an answer can show the thing
// it is talking about instead of only naming it.
const COVERS: Record<string, string> = {
  'project-cropscan': '/agri/cropscan-sheet.jpg',
  'project-yieldpro': '/agri/yieldpro-sheet.jpg',
  'project-agri-ai': '/agri/agri-architecture.jpg',
  'project-sugarcane-cv': 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/figures/site_map.svg',
  'project-scv-1': '/media/burnt-burnt-98.jpg',
  'project-scv-5': 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/media/dust_real.gif',
  'project-scv-6': '/media/acoustic-overview.jpg',
  'project-scv-8': '/media/plate-ocr.jpg',
  'project-rag-ecosystem': 'https://raw.githubusercontent.com/watcharaponthod-code/rag-chat/main/diagram/diagram.png',
  'project-embedding-rag': 'https://raw.githubusercontent.com/watcharaponthod-code/embedding_rag/main/diagram/diagram.png',
  'project-bitcoin': 'https://raw.githubusercontent.com/watcharaponthod-code/bitcoin-ml-prediction/main/architecture_diagram.png',
  'project-trading': 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/dashboard.png',
  'project-elic': 'https://raw.githubusercontent.com/watcharaponthod-code/elic/main/docs/images/conversation-roles.jpg',
  'project-shorts': '/media/shorts-pipeline.jpg',
  'project-ninja': 'https://raw.githubusercontent.com/watcharaponthod-code/Ninja_fruit/main/demo/demo-gameplay.gif',
  'project-subway': 'https://raw.githubusercontent.com/watcharaponthod-code/subway-kids/main/demo/demo-gameplay.gif',
  'project-kafka': '/media/kafka-connector.jpg',
};

function coverFor(view?: string) {
  return view ? COVERS[view] : undefined;
}

const CONTACT_RE = /\bcontact\b|\bemail\b|\bhire\b|\bphone\b|ติดต่อ|อีเมล|เบอร์|โทรหา|จ้าง/i;
const CODE_RE = /github|repo|source|code|โค้ด|ซอร์ส|repository/i;
const RESUME_RE = /resume|cv|เรซูเม|ประวัติ/i;

export function actionsFor(question: string, sectionIds: string[], answer = ''): ChatAction[] {
  const probe = `${answer} ${question}`;
  const out: ChatAction[] = [];
  const seen = new Set<string>();
  const push = (a: ChatAction) => {
    const key = a.view || a.url || a.value || '';
    if (key && !seen.has(key)) { seen.add(key); out.push(a); }
  };

  const ALIAS: Record<string, string> = {
    'gh-sugarcane-cv': 'projects-sugarcane-cv', 'gh-ekyc': 'projects-ekyc', 'gh-elic': 'projects-elic',
    'gh-roblox-dragon-combat': 'projects-dragon-combat', 'gh-bitcoin-ml-prediction': 'projects-bitcoin-ml',
    'gh-rag-chat': 'projects-rag-chat', 'gh-embedding-rag': 'projects-embedding-rag', 'gh-ninja-fruit': 'projects-ninja-fruit',
    'gh-subway-kids': 'projects-subway-kids', 'gh-trading': 'projects-trading', 'gh-profile': 'about',
  };
  for (const id of sectionIds) {
    const raw = id.split('#')[0];
    const base = ALIAS[raw] || raw;
    for (const e of BY_SECTION[base] || []) {
      // A card is offered only when the answer itself mentions the thing it
      // opens; retrieval is not enough, because a neighbouring chunk is often
      // pulled in without being used.
      if (!e.match.test(probe)) continue;
      push({ kind: e.view ? 'view' : 'link', label: { en: e.en, th: e.th }, view: e.view, url: e.url, image: e.image || coverFor(e.view) });
    }
  }

  if (CONTACT_RE.test(question)) {
    push({ kind: 'link', label: { en: 'Email Watcharapon', th: 'ส่งอีเมล' }, url: 'mailto:watcharapon.thod@gmail.com' });
    push({ kind: 'copy', label: { en: 'Copy phone number', th: 'คัดลอกเบอร์โทร' }, value: '094-453-2072' });
  }
  if (CODE_RE.test(question)) {
    push({ kind: 'link', label: { en: 'GitHub profile', th: 'โปรไฟล์ GitHub' }, url: 'https://github.com/watcharaponthod-code' });
  }
  if (RESUME_RE.test(question)) {
    push({ kind: 'link', label: { en: 'Download resume', th: 'ดาวน์โหลดเรซูเม่' }, url: '/components/project/Resume.pdf' });
  }

  return out.slice(0, 3);
}

/** Marker that separates the streamed answer from its actions. */
export const ACTION_MARKER = '\u0000ACTIONS\u0000';
