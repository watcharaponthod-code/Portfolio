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
    'hero.blurb':
      'I build computer vision that has to work on real cameras, in real weather, on hardware someone already owns. Most of it runs at a sugar mill in Thailand: grading cane on the weighbridge, reading truck plates, listening for rocks in the load. I report what the numbers do not cover as carefully as what they do.',
    'hero.resume': 'Resume',
    'hero.about': 'About_Me',

    // About / Philosophy
    'about.subtitle': '01 / INTRODUCTION',
    'about.title1': 'Models that run',
    'about.title2': 'on real cameras.',
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
      'I build computer vision and LLM systems and take them to production. Recent work: dust and material detection on live mill CCTV, face liveness for eKYC, and agentic retrieval running fully on local inference. I also build what goes around the model, the inference server, the mobile app, the dashboard and the deploy. What I care about most is evaluation you can trust. I measure out of sample, I report accuracy next to coverage, and I would rather a model abstain than guess.',
    'about.philosophy': 'Core Philosophy',
    'about.p1.name': 'Clarity over cleverness',
    'about.p1.desc': 'The next person to read this is me in six months.',
    'about.p2.name': 'Ship it or it does not count',
    'about.p2.desc': 'A model in a notebook has not solved anything yet.',
    'about.p3.name': 'Constraints first',
    'about.p3.desc': 'The camera the site already owns is the target, not the compromise.',
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
    'hero.blurb':
      'ผมสร้างระบบ computer vision ที่ต้องทำงานได้จริงบนกล้องจริง ในสภาพอากาศจริง บนเครื่องที่ลูกค้ามีอยู่แล้ว งานส่วนใหญ่อยู่ที่โรงงานน้ำตาลในไทย ทั้งการคัดเกรดอ้อยที่ตาชั่ง อ่านป้ายทะเบียนรถบรรทุก และฟังเสียงหินที่ปนมากับอ้อย ผมรายงานสิ่งที่ตัวเลขยังไม่ครอบคลุมอย่างระมัดระวังเท่ากับสิ่งที่ครอบคลุม',
    'hero.resume': 'เรซูเม่',
    'hero.about': 'เกี่ยวกับผม',

    // About / Philosophy
    'about.subtitle': '01 / แนะนำตัว',
    'about.title1': 'โมเดลที่ทำงานได้',
    'about.title2': 'บนกล้องจริง',
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
      'ผมสร้างระบบ computer vision และระบบที่ใช้ LLM แล้วนำไปใช้งานจริง งานล่าสุด ได้แก่ การตรวจจับฝุ่นและวัสดุจากกล้องวงจรปิดในโรงงานแบบเรียลไทม์ การตรวจสอบใบหน้าจริง (face liveness) สำหรับ eKYC และระบบค้นคืนข้อมูลแบบ agentic ที่ประมวลผลบนเครื่องภายในทั้งหมด ผมสร้างส่วนที่อยู่รอบตัวโมเดลด้วย ทั้งเซิร์ฟเวอร์สำหรับ inference แอปมือถือ แดชบอร์ด และการ deploy สิ่งที่ผมให้ความสำคัญที่สุดคือการประเมินผลที่เชื่อถือได้ ผมวัดผลบนข้อมูลที่โมเดลไม่เคยเห็น รายงานความแม่นควบคู่กับ coverage และยอมให้โมเดลตอบว่าไม่แน่ใจ ดีกว่าให้โมเดลเดา',
    'about.philosophy': 'หลักการทำงาน',
    'about.p1.name': 'ชัดเจนสำคัญกว่าฉลาด',
    'about.p1.desc': 'คนต่อไปที่จะอ่านโค้ดนี้คือตัวผมเองในอีกหกเดือนข้างหน้า',
    'about.p2.name': 'ถ้ายังไม่ได้ใช้งานจริง ก็ยังไม่นับ',
    'about.p2.desc': 'โมเดลที่ยังอยู่ใน notebook ยังไม่ได้แก้ปัญหาอะไรเลย',
    'about.p3.name': 'เริ่มจากข้อจำกัด',
    'about.p3.desc': 'กล้องที่หน้างานมีอยู่แล้วคือเป้าหมาย ไม่ใช่ทางเลือกที่ต้องยอมรับ',
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
