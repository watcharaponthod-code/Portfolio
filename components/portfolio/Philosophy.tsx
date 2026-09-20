import mineImg from '@/imge/mine.jpg';
import SectionHeader from './SectionHeader';
import { TbMail, TbPhone, TbBrandGithub } from 'react-icons/tb';
import { Medal } from 'lucide-react';

export default function Philosophy() {
  const stats = [
    { value: "4+", label: "Years Coding" },
    { value: "7+", label: "Real Projects" },
    { value: "3", label: "Hackathons" },
    { value: "100%", label: "Delivery Rate" },
  ];

  const awards = [
    { icon: <Medal size={20} strokeWidth={1.5} />, title: "Winner", event: "UI Design-athon 2025" },
    { icon: <Medal size={20} strokeWidth={1.5} />, title: "1st Runner-up", event: "KUSE AI Hackathon 2025" },
    { icon: <Medal size={20} strokeWidth={1.5} />, title: "Participant", event: "RERU Cyber Hackathon 2025" },
  ];

  return (
    <div id="introduction" className="section container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '7rem', paddingBottom: '7rem', background: '#fff', color: '#000', scrollMarginTop: '2rem' }}>
      <div className="animate-enter story-root" style={{ width: '100%' }}>

        {/* Section Header */}
        <SectionHeader
          subtitle="01 / INTRODUCTION"
          titleLines={["Models that run", "on real cameras."]}
        />

        {/* Main Grid */}
        <div className="story-grid stagger-item">

          {/* Left: Photo + Stats */}
          <div className="story-left">
            <div className="photo-wrapper">
              <div className="photo-bg-accent" />
              <div className="photo-frame">
                <img
                  src={mineImg}
                  alt="Watcharapon"
                  className="story-photo"
                  style={{ filter: 'grayscale(1) brightness(0.9) contrast(1.1)' }}
                />
              </div>
              <div className="photo-badge mono" style={{ background: '#fff', border: '1px solid #000', color: '#000' }}>
                <span>@Bangkok, Thailand</span>
              </div>
            </div>

            <div className="story-stats" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
              {stats.map((s, i) => (
                <div key={i} className="story-stat" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
                  <div className="mono story-stat-value" style={{ color: '#000' }}>{s.value}</div>
                  <div className="mono story-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="story-right">
            {/* Education Profile */}
            <div className="story-section stagger-item" style={{ marginBottom: '3rem', padding: '2rem', background: 'rgba(0,0,0,0.03)', borderLeft: '4px solid #000' }}>
              <h3 className="mono" style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.4)', marginBottom: '0.5rem', letterSpacing: '0.2rem' }}>EDUCATION</h3>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#000' }}>Kasetsart University</p>
              <p style={{ margin: '0.25rem 0', color: 'rgba(0,0,0,0.5)', fontSize: '1rem' }}>B.Sc. in Computer Science (Co-op Program)</p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                <span className="mono" style={{ fontSize: '0.8rem', fontWeight: 600 }}>GRADUATION: 2025</span>
              </div>
            </div>

            <div className="story-section stagger-item" style={{ marginBottom: '3rem' }}>
              <p className="story-bio" style={{ fontSize: '1.1rem', color: 'rgba(0,0,0,0.7)', lineHeight: 1.9, fontWeight: 400 }}>
                I build computer vision and LLM systems and take them to production. Recent work: dust and material detection on live mill CCTV, face liveness for eKYC, and agentic retrieval running fully on local inference. I also build what goes around the model, the inference server, the mobile app, the dashboard and the deploy. What I care about most is evaluation you can trust. I measure out of sample, I report accuracy next to coverage, and I would rather a model abstain than guess.
              </p>
            </div>

            {/* Philosophy blocks */}
            <div className="story-section stagger-item">
              <h3 className="mono story-section-title" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>Core Philosophy</h3>
              <div className="philosophy-blocks">
                {[
                  { id: '01', name: 'Clarity over cleverness', desc: 'The next person to read this is me in six months.' },
                  { id: '02', name: 'Ship it or it does not count', desc: 'A model in a notebook has not solved anything yet.' },
                  { id: '03', name: 'Constraints first', desc: 'The camera the site already owns is the target, not the compromise.' }
                ].map(item => (
                  <div key={item.id} className="philosophy-block">
                    <div className="philosophy-block-num mono" style={{ color: '#000' }}>{item.id}</div>
                    <div>
                      <strong className="philosophy-block-name" style={{ color: '#000' }}>{item.name}</strong>
                      <p className="philosophy-block-desc" style={{ color: 'rgba(0,0,0,0.5)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards list (New) */}
            <div className="story-section stagger-item" style={{ marginTop: '2rem' }}>
              <h3 className="mono story-section-title" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>Awards & Hackathons</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {awards.map((a, i) => (
                  <div key={i} style={{ background: 'rgba(0,0,0,0.03)', padding: '1.5rem', borderLeft: '1px solid #000' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                      {a.icon} <span className="mono" style={{ fontWeight: 900, fontSize: '0.85rem' }}>{a.title}</span>
                    </div>
                    <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{a.event}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Box (Merged) */}
            <div id="contact" className="story-section stagger-item contact-box" style={{ marginTop: '2rem', padding: '2.5rem', background: '#000', color: '#fff' }}>
              <div className="mono" style={{ fontSize: '0.7rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '0.2rem' }}>AVAILABLE_FOR_HIRE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <a href="mailto:watcharapon.thod@gmail.com" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 950, color: '#fff', textDecoration: 'none', borderBottom: '3px solid #fff' }}>
                  watcharapon.thod@gmail.com
                </a>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }} className="mono">
                  <a href="tel:0944532072" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
                    <TbPhone size={18} /> 094-453-2072
                  </a>
                  <a href="https://github.com/watcharaponthod-code" target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
                    <TbBrandGithub size={18} /> GITHUB_REPOSITORY
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .story-root { width: 100%; }
        .story-grid { display: grid; grid-template-columns: minmax(0, 380px) minmax(0, 1fr); gap: var(--space-9); align-items: start; }
        .photo-wrapper { position: relative; }
        .photo-frame { border: 1px solid rgba(0,0,0,0.1); overflow: hidden; background: #ffffff; }
        .story-photo { width: 100%; display: block; transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .photo-frame:hover .story-photo { transform: scale(1.03); }
        .photo-badge { position: absolute; bottom: 20px; left: 20px; padding: 0.5rem 1rem; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.06em; }
        .story-stats { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid rgba(0,0,0,0.1); margin-top: var(--space-5); }
        .story-stat { padding: var(--space-5); border-right: 1px solid rgba(0,0,0,0.1); border-bottom: 1px solid rgba(0,0,0,0.1); text-align: center; transition: background 0.25s ease; }
        .story-stat:nth-child(even) { border-right: none; }
        .story-stat:nth-child(3), .story-stat:nth-child(4) { border-bottom: none; }
        .story-stat-value { font-size: 2rem; font-weight: 900; letter-spacing: -0.03em; line-height: 1; margin-bottom: var(--space-2); }
        .story-stat-label { font-size: 0.6rem; opacity: 0.4; letter-spacing: 0.14em; text-transform: uppercase; }
        .story-right { display: flex; flex-direction: column; gap: var(--space-7); min-width: 0; }
        .story-right > .story-section { margin: 0 !important; }
        .story-section-title { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: var(--space-5); padding-bottom: var(--space-3); border-bottom: 1px solid rgba(0,0,0,0.1); }
        .story-bio { max-width: 62ch; }
        .philosophy-blocks { display: flex; flex-direction: column; gap: var(--space-5); }
        .philosophy-block { display: flex; gap: var(--space-5); align-items: baseline; }
        .philosophy-block-num { font-size: 0.72rem; font-weight: 700; opacity: 0.3; flex: 0 0 2ch; }
        .philosophy-block-name { font-size: 1.05rem; font-weight: 700; display: block; margin-bottom: var(--space-1); letter-spacing: -0.01em; }
        .philosophy-block-desc { font-size: var(--text-sm); line-height: 1.6; max-width: 52ch; }

        @media (max-width: 1200px) {
          .story-grid { gap: var(--space-8); }
        }

        @media (max-width: 1100px) {
          .story-grid { grid-template-columns: 1fr; gap: var(--space-7); }
          .story-left { max-width: 500px; margin: 0 auto; width: 100%; }
          .story-right { gap: var(--space-6); }
        }

        @media (max-width: 640px) {
          .philosophy-block { gap: var(--space-4); }
          .story-stat { padding: var(--space-4); }
          .story-stat-value { font-size: 1.5rem; }
          .story-section-title { margin-bottom: var(--space-4); }
          .contact-box { padding: var(--space-5) !important; }
        }
      `}</style>
    </div>
  );
}
