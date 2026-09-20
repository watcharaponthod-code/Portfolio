// What the visitor can DO with an answer. The chat does not just reply: it
// hands back buttons that open the matching case study on the site, the
// repository, or a way to get in touch. Derived on the server from the chunks
// retrieval actually used, so the buttons always match what was answered.

export interface ChatAction {
  kind: 'view' | 'link' | 'copy';
  label: { en: string; th: string };
  /** for kind 'view': the internal route the site opens */
  view?: string;
  /** for kind 'link': an external URL */
  url?: string;
  /** for kind 'copy': the text to copy */
  value?: string;
}

interface Entry { view?: string; url?: string; en: string; th: string }

// knowledge-base section id -> the page on this site that covers it
const BY_SECTION: Record<string, Entry[]> = {
  'projects-agri-ai': [
    { view: 'project-cropscan', en: 'Open CropScan case study', th: 'เปิดกรณีศึกษา CropScan' },
    { view: 'project-yieldpro', en: 'Open Yield Pro case study', th: 'เปิดกรณีศึกษา Yield Pro' },
  ],
  'projects-sugarcane-cv': [
    { view: 'project-sugarcane-cv', en: 'Open the nine detectors', th: 'เปิดหน้ารวมเก้าตัวตรวจจับ' },
    { url: 'https://github.com/watcharaponthod-code/sugarcane-cv', en: 'sugarcane-cv on GitHub', th: 'sugarcane-cv บน GitHub' },
  ],
  'projects-ekyc': [{ url: 'https://github.com/watcharaponthod-code/ekyc', en: 'eKYC on GitHub', th: 'eKYC บน GitHub' }],
  'projects-shorts-automation': [{ view: 'project-shorts', en: 'Open the automation case study', th: 'เปิดกรณีศึกษาระบบอัตโนมัติ' }],
  'projects-dragon-combat': [{ url: 'https://github.com/watcharaponthod-code/roblox-dragon-combat', en: 'Dragon Combat on GitHub', th: 'Dragon Combat บน GitHub' }],
  'projects-rag-chat': [{ view: 'project-rag-ecosystem', en: 'Open the RAG case study', th: 'เปิดกรณีศึกษา RAG' }],
  'projects-embedding-rag': [{ view: 'project-embedding-rag', en: 'Open Vector Docs', th: 'เปิด Vector Docs' }],
  'projects-bitcoin-ml': [{ view: 'project-bitcoin', en: 'Open the Bitcoin ML case study', th: 'เปิดกรณีศึกษา Bitcoin ML' }],
  'projects-ninja-fruit': [{ view: 'project-ninja', en: 'Open Ninja Fruit', th: 'เปิด Ninja Fruit' }],
  'projects-subway-kids': [{ view: 'project-subway', en: 'Open Subway Kids', th: 'เปิด Subway Kids' }],
  'projects-trading': [{ view: 'project-trading', en: 'Open AlgoTrade', th: 'เปิด AlgoTrade' }],
  'projects-elic': [{ view: 'project-elic', en: 'Open ELIC', th: 'เปิด ELIC' }],
  'projects-edc-map': [{ view: 'project-geomap', en: 'Open the EDC map', th: 'เปิดแผนที่ EDC' }],
  'projects-kafka-connector': [{ view: 'project-kafka', en: 'Open the Kafka connector', th: 'เปิด Kafka connector' }],
  'about': [
    { url: 'mailto:watcharapon.thod@gmail.com', en: 'Email Watcharapon', th: 'ส่งอีเมล' },
    { url: 'https://github.com/watcharaponthod-code', en: 'GitHub profile', th: 'โปรไฟล์ GitHub' },
  ],
  'experience-sycapt': [{ view: 'project-rag-ecosystem', en: 'See the work from that role', th: 'ดูผลงานจากงานนั้น' }],
};

const CONTACT_RE = /contact|email|reach|hire|available|phone|call|ติดต่อ|อีเมล|เบอร์|โทร|จ้าง|ว่าง/i;
const CODE_RE = /github|repo|source|code|โค้ด|ซอร์ส|repository/i;
const RESUME_RE = /resume|cv|เรซูเม|ประวัติ/i;

export function actionsFor(question: string, sectionIds: string[]): ChatAction[] {
  const out: ChatAction[] = [];
  const seen = new Set<string>();
  const push = (a: ChatAction) => {
    const key = a.view || a.url || a.value || '';
    if (key && !seen.has(key)) { seen.add(key); out.push(a); }
  };

  for (const id of sectionIds) {
    const base = id.split('#')[0];
    for (const e of BY_SECTION[base] || []) {
      push({ kind: e.view ? 'view' : 'link', label: { en: e.en, th: e.th }, view: e.view, url: e.url });
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

  return out.slice(0, 4);
}

/** Marker that separates the streamed answer from its actions. */
export const ACTION_MARKER = '\u0000ACTIONS\u0000';
