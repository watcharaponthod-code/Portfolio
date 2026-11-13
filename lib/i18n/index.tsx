import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'th';

const STORAGE_KEY = 'site-lang';

// ── Dictionary ────────────────────────────────────────────────────────────────
// Flat keys, one entry per visible UI string. English is the default and the
// fallback; Thai is plain, polite, no slang. Proper nouns / tech names stay English.
const DICT = {
  en: {
    // NavBar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',
    'nav.lang.label': 'Language',

    // Hero
    'hero.role': 'AI Engineer',
    'hero.blurb': 'I build computer vision and satellite models for a sugar mill in Thailand, and LLM systems that run on a company\'s own servers. I do the whole job myself. I start from how the team already works, build the system, deploy it, then check the results on data the model has never seen.',
    'hero.resume': 'Resume',
    'hero.about': 'About_Me',

    // About / Philosophy
    'about.subtitle': '01 / INTRODUCTION',
    'about.title1': 'A bit',
    'about.title2': 'about me.',
    'about.badge': '@Bangkok, Thailand',
    'about.stat.years': 'Years Coding',
    'about.stat.projects': 'Real Projects',
    'about.stat.hackathons': 'Hackathons',
    'about.stat.delivery': 'Delivery Rate',
    'about.education': 'EDUCATION',
    'about.university': 'Kasetsart University',
    'about.degree': 'B.Sc. in Computer Science (Co-op Program)',
    'about.graduation': 'GRADUATION: 2025',
    'about.bio':
      'Recent work includes dust and material detection on live CCTV at the mill, and an agentic retrieval system that runs entirely on local inference. I also build the parts around the model: the inference server, the mobile app, the dashboard and the deployment. I test every model on data it was not trained on and report accuracy together with coverage. When a model is unsure, I let it say so.',
    'about.philosophy': 'How I work',
    'about.p1.name': 'Readable code',
    'about.p1.desc': 'I write it so I can still follow it six months later.',
    'about.p2.name': 'Used for real',
    'about.p2.desc': 'A model counts as done when someone is actually using it.',
    'about.p3.name': 'Existing hardware',
    'about.p3.desc': 'I build for the cameras and machines the site already has.',
    'about.awards': 'Awards & Hackathons',
    'about.award.winner': 'Winner',
    'about.award.runnerup': '1st Runner-up',
    'about.award.participant': 'Participant',
    'about.hire': 'AVAILABLE_FOR_HIRE',
    'about.github': 'GITHUB_REPOSITORY',

    // Skills
    'skills.subtitle': '03 / REPOSITORY ECOSYSTEM',
    'skills.title1': 'Technical Stack',
    'skills.title2': 'Overview.',
    'skills.desc': 'A dense mapping of my specialized skills across four core domains. Designed for efficient architectural scanning.',
    'skills.cat1': 'LANGUAGES & SYSTEMS',
    'skills.cat2': 'FRAMEWORKS & APPS',
    'skills.cat3': 'AI & DATA ARCHITECTURE',
    'skills.cat4': 'INFRA & PROD OPS',

    // Projects section header (wired by the owner into Projects.tsx)
    'projects.subtitle': '02 / SELECTED WORKS',
    'projects.header': 'Deep Dives & Case Studies.',
    'projects.desc': 'Production systems, research projects, and freelance delivery work. Filter by discipline: click any card to open the case study, live site, or planning document.',

    // AI widget (wired by the owner into App.tsx)
    'ai.hint.title': 'SYSTEM_BROADCAST',
    'ai.hint.body': 'Chat with my AI about the projects, the numbers behind them, or my background. Switch to voice any time.',
    'ai.hint.action': 'CLICK TO INITIALIZE',
    'ai.window.title': 'ASK_WATCHARAPON_AI',
    'ai.toggle.aria': 'Toggle AI Assistant',
  },
  th: {
    // NavBar
    'nav.home': 'หน้าแรก',
    'nav.about': 'เกี่ยวกับ',
    'nav.projects': 'ผลงาน',
    'nav.skills': 'ทักษะ',
    'nav.contact': 'ติดต่อ',
    'nav.resume': 'เรซูเม่',
    'nav.lang.label': 'ภาษา',

    // Hero
    'hero.role': 'วิศวกร AI',
    'hero.blurb': 'ผมทำโมเดล computer vision และโมเดลจากภาพดาวเทียมให้โรงงานน้ำตาลในไทย กับระบบ LLM ที่รันบนเซิร์ฟเวอร์ของบริษัทเอง งานหนึ่งผมทำเองทั้งหมด เริ่มจากดูว่าทีมทำงานกันอย่างไรอยู่แล้ว จากนั้นสร้างระบบ deploy แล้วกลับมาวัดผลกับข้อมูลที่โมเดลไม่เคยเห็นครับ',
    'hero.resume': 'เรซูเม่',
    'hero.about': 'เกี่ยวกับผม',

    // About / Philosophy
    'about.subtitle': '01 / แนะนำตัว',
    'about.title1': 'เกี่ยวกับ',
    'about.title2': 'ตัวผม',
    'about.badge': '@กรุงเทพฯ ประเทศไทย',
    'about.stat.years': 'ปีที่เขียนโค้ด',
    'about.stat.projects': 'โปรเจกต์ใช้งานจริง',
    'about.stat.hackathons': 'แฮกกาธอน',
    'about.stat.delivery': 'ส่งมอบงานตรงเวลา',
    'about.education': 'การศึกษา',
    'about.university': 'มหาวิทยาลัยเกษตรศาสตร์',
    'about.degree': 'วท.บ. วิทยาการคอมพิวเตอร์ (หลักสูตรสหกิจศึกษา)',
    'about.graduation': 'จบการศึกษา: 2025',
    'about.bio':
      'งานล่าสุดคือระบบตรวจจับฝุ่นและวัสดุจากกล้องวงจรปิดในโรงงานแบบเรียลไทม์ กับระบบค้นคืนข้อมูลแบบ agentic ที่รันบนเครื่องภายในทั้งหมด ส่วนที่อยู่รอบโมเดลผมก็ทำเอง ทั้งเซิร์ฟเวอร์ inference แอปมือถือ แดชบอร์ด และการ deploy ผมทดสอบทุกโมเดลกับข้อมูลที่มันไม่ได้ใช้เทรน และรายงานความแม่นคู่กับ coverage ถ้าโมเดลไม่แน่ใจ ผมให้มันบอกว่าไม่แน่ใจ',
    'about.philosophy': 'วิธีทำงาน',
    'about.p1.name': 'โค้ดอ่านง่าย',
    'about.p1.desc': 'เขียนให้ตัวเองกลับมาอ่านรู้เรื่องในอีกหกเดือน',
    'about.p2.name': 'ต้องมีคนใช้จริง',
    'about.p2.desc': 'โมเดลจะนับว่าเสร็จเมื่อมีคนใช้งานมันจริง ๆ',
    'about.p3.name': 'ใช้อุปกรณ์ที่มีอยู่',
    'about.p3.desc': 'ทำระบบให้เข้ากับกล้องและเครื่องที่หน้างานมีอยู่แล้ว',
    'about.awards': 'รางวัลและแฮกกาธอน',
    'about.award.winner': 'ชนะเลิศ',
    'about.award.runnerup': 'รองชนะเลิศอันดับ 1',
    'about.award.participant': 'เข้าร่วมแข่งขัน',
    'about.hire': 'พร้อมรับงาน',
    'about.github': 'GITHUB_REPOSITORY',

    // Skills
    'skills.subtitle': '03 / เครื่องมือและเทคโนโลยี',
    'skills.title1': 'ภาพรวม',
    'skills.title2': 'เทคโนโลยีที่ใช้',
    'skills.desc': 'สรุปทักษะที่ผมใช้งานจริง แบ่งเป็น 4 กลุ่มหลัก จัดวางให้เห็นภาพรวมได้ในครั้งเดียว',
    'skills.cat1': 'ภาษาและระบบ',
    'skills.cat2': 'เฟรมเวิร์กและแอป',
    'skills.cat3': 'AI และสถาปัตยกรรมข้อมูล',
    'skills.cat4': 'โครงสร้างพื้นฐานและการดูแลระบบ',

    // Projects section header
    'projects.subtitle': '02 / ผลงานคัดสรร',
    'projects.header': 'เจาะลึกผลงาน',
    'projects.desc': 'ระบบที่ใช้งานจริง โปรเจกต์วิจัย และงานฟรีแลนซ์ เลือกดูตามสาขาได้ คลิกที่การ์ดเพื่อเปิดกรณีศึกษา เว็บไซต์จริง หรือเอกสารแผนงาน',

    // AI widget
    'ai.hint.title': 'ประกาศจากระบบ',
    'ai.hint.body': 'คุยกับ AI ของผมได้เลยครับ ถามเรื่องผลงาน ตัวเลขเบื้องหลัง หรือประวัติของผม จะสลับไปคุยด้วยเสียงเมื่อไรก็ได้',
    'ai.hint.action': 'คลิกเพื่อเริ่มใช้งาน',
    'ai.window.title': 'ถาม AI ของวัชรพล',
    'ai.toggle.aria': 'เปิด/ปิดผู้ช่วย AI',
  },
} as const;

export type I18nKey = keyof typeof DICT.en;

// ── Context ───────────────────────────────────────────────────────────────────
interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: I18nKey) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

function readStored(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'th' || v === 'en') return v;
  } catch {}
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStored);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  useEffect(() => {
    try { document.documentElement.lang = lang; } catch {}
  }, [lang]);

  const t = useCallback((key: I18nKey): string => {
    const table = DICT[lang] as Record<string, string>;
    return table[key] ?? DICT.en[key] ?? key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (ctx) return ctx;
  // Safe fallback when a component renders outside the provider (tests, storybook).
  return { lang: 'en', setLang: () => {}, t: (key) => DICT.en[key] ?? key };
}
