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
    <div className="section container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '7rem', paddingBottom: '7rem', background: '#000', color: '#fff' }}>
      <div className="animate-enter story-root" style={{ width: '100%' }}>

        {/* Section Header */}
        <SectionHeader
          subtitle="01 / INTRODUCTION"
          titleLines={["Building the Future,", "One system at a time."]}
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
              <div className="photo-badge mono" style={{ background: '#000', border: '1px solid #fff', color: '#fff' }}>
                <span>@Bangkok, Thailand</span>
              </div>
            </div>

            <div className="story-stats" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              {stats.map((s, i) => (
                <div key={i} className="story-stat" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="mono story-stat-value" style={{ color: '#fff' }}>{s.value}</div>
                  <div className="mono story-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="story-right">
            {/* Education Profile */}
            <div className="story-section stagger-item" style={{ marginBottom: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.03)', borderLeft: '4px solid #fff' }}>
              <h3 className="mono" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', letterSpacing: '0.2rem' }}>EDUCATION</h3>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Kasetsart University</p>
              <p style={{ margin: '0.25rem 0', color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>B.Sc. in Computer Science (Co-op Program)</p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
                <span className="mono" style={{ fontSize: '0.8rem', fontWeight: 600 }}>GRADUATION: 2025</span>
              </div>
            </div>

            <div className="story-section stagger-item" style={{ marginBottom: '3rem' }}>
              <p className="story-bio" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.9, fontWeight: 400 }}>
                I am a systems engineer with technical knowledge spanning across DevOps, AI Engineering, Full-Stack Development, Mobile Applications, and Data Science. My professional journey is focused on the practical implementation of these domains—from orchestrating scalable infrastructure to building autonomous AI systems—to solve complex production challenges with precision and reliability.
              </p>
            </div>

            {/* Philosophy blocks */}
            <div className="story-section stagger-item">
              <h3 className="mono story-section-title" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>Core Philosophy</h3>
              <div className="philosophy-blocks">
                {[
                  { id: '01', name: 'Clarity over Cleverness', desc: 'Maintainability is the highest engineering virtue.' },
                  { id: '02', name: 'Impact-Driven Engineering', desc: 'Every line of code serves a user need and a business goal.' },
                  { id: '03', name: 'Constraint-Driven Innovation', desc: 'Hard limits foster the smartest, most creative solutions.' }
                ].map(item => (
                  <div key={item.id} className="philosophy-block">
                    <div className="philosophy-block-num mono" style={{ color: '#fff' }}>{item.id}</div>
                    <div>
                      <strong className="philosophy-block-name" style={{ color: '#fff' }}>{item.name}</strong>
                      <p className="philosophy-block-desc" style={{ color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards list (New) */}
            <div className="story-section stagger-item" style={{ marginTop: '2rem' }}>
              <h3 className="mono story-section-title" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>Awards & Hackathons</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {awards.map((a, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderLeft: '1px solid #fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                      {a.icon} <span className="mono" style={{ fontWeight: 900, fontSize: '0.85rem' }}>{a.title}</span>
                    </div>
                    <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{a.event}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Box (Merged) */}
            <div id="contact" className="story-section stagger-item" style={{ marginTop: '2rem', padding: '2.5rem', background: '#fff', color: '#000' }}>
              <div className="mono" style={{ fontSize: '0.7rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '0.2rem' }}>AVAILABLE_FOR_HIRE</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <a href="mailto:watcharapon.thod@gmail.com" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 950, color: '#000', textDecoration: 'none', borderBottom: '3px solid #000' }}>
                  watcharapon.thod@gmail.com
                </a>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }} className="mono">
                  <a href="tel:0944532072" style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
                    <TbPhone size={18} /> 094-453-2072
                  </a>
                  <a href="https://github.com/watcharaponthod-code" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
                    <TbBrandGithub size={18} /> GITHUB_REPOSITORY
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .story-grid { display: grid; grid-template-columns: 400px 1fr; gap: 6rem; align-items: start; }
        .photo-wrapper { position: relative; }
        .photo-frame { border: 1px solid rgba(255,255,255,0.1); overflow: hidden; background: #111; }
        .story-photo { width: 100%; transition: transform 0.5s; }
        .photo-frame:hover .story-photo { transform: scale(1.05); }
        .photo-badge { position: absolute; bottom: 20px; left: 20px; padding: 0.5rem 1rem; font-size: 0.7rem; font-weight: 800; }
        .story-stats { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid rgba(255,255,255,0.1); margin-top: 2rem; }
        .story-stat { padding: 1.5rem; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); text-align: center; }
        .story-stat:nth-child(even) { border-right: none; }
        .story-stat:nth-child(3), .story-stat:nth-child(4) { border-bottom: none; }
        .story-stat-value { font-size: 2rem; font-weight: 900; }
        .story-stat-label { font-size: 0.6rem; opacity: 0.4; letter-spacing: 0.1em; }
        .story-right { display: flex; flex-direction: column; gap: 4rem; }
        .story-section-title { font-size: 0.8rem; font-weight: 900; letter-spacing: 0.2rem; text-transform: uppercase; margin-bottom: 2rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .philosophy-blocks { display: flex; flexDirection: column; gap: 2rem; }
        .philosophy-block { display: flex; gap: 2rem; }
        .philosophy-block-num { font-size: 0.8rem; font-weight: 900; opacity: 0.3; }
        .philosophy-block-name { font-size: 1.1rem; font-weight: 800; display: block; margin-bottom: 0.5rem; }
        @media (max-width: 1100px) { .story-grid { grid-template-columns: 1fr; gap: 4rem; } .story-left { max-width: 500px; margin: 0 auto; } }
      `}</style>
    </div>
  );
}
