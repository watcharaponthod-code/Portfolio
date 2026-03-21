import mineImg from '@/imge/mine.jpg';
import SectionHeader from './SectionHeader';
import { TbMail, TbPhone, TbBrandGithub, TbAward, TbTrophy } from 'react-icons/tb';

export default function Philosophy() {
  const stats = [
    { value: "4+", label: "Years Coding" },
    { value: "7+", label: "Real Projects" },
    { value: "3", label: "Hackathons" },
    { value: "2.97", label: "GPA" },
  ];

  const awards = [
    { icon: "🥈", title: "2nd Place Runner-Up", event: "KUSE AI Hackathon 2025" },
    { icon: "🏆", title: "Participant", event: "UI Design-athon 2025" },
    { icon: "🔐", title: "Open Level", event: "RERU Cyber Hackathon 2025" },
  ];

  return (
    <div className="section container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', paddingTop: '5rem', paddingBottom: '5rem' }}>
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
            {/* Photo container */}
            <div className="photo-wrapper">
              <div className="photo-bg-accent" />
              <div className="photo-frame">
                <img
                  src={mineImg}
                  alt="Watcharapon"
                  className="story-photo"
                />
              </div>
              <div className="photo-badge mono">
                <span>@Bangkok, Thailand</span>
              </div>
            </div>

            {/* Stats grid */}
            <div className="story-stats">
              {stats.map((s, i) => (
                <div key={i} className="story-stat">
                  <div className="mono story-stat-value">{s.value}</div>
                  <div className="mono story-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Narrative */}
          <div className="story-right">
            {/* Bio */}
            <div className="story-section stagger-item">
              <p className="story-bio">
                I'm a <strong>Full-Stack Developer and AI Engineer</strong> from Thailand,
                completing my B.Sc. in Computer Science (Co-op Program) at Kasetsart University
                Chalermphrakiat. My co-op at <strong>Sycapt Co., Ltd.</strong> gave me real enterprise
                experience — from building On-Premises RAG systems to solving hardware constraints creatively,
                like running <strong>4 LLMs on just 16GB of VRAM</strong>.
              </p>
            </div>

            {/* Philosophy blocks */}
            <div className="story-section stagger-item">
              <h3 className="mono story-section-title">Core Philosophy</h3>
              <div className="philosophy-blocks">
                <div className="philosophy-block">
                  <div className="philosophy-block-num mono">01</div>
                  <div>
                    <strong className="philosophy-block-name">Clarity over Cleverness</strong>
                    <p className="philosophy-block-desc">Readable, maintainable code over obscure abstractions. A system is only as good as its weakest link — and that's often maintainability.</p>
                  </div>
                </div>
                <div className="philosophy-block">
                  <div className="philosophy-block-num mono">02</div>
                  <div>
                    <strong className="philosophy-block-name">Impact-Driven Engineering</strong>
                    <p className="philosophy-block-desc">Every decision — database schema, infrastructure, AI model choice — must serve a clear user need and real business goals.</p>
                  </div>
                </div>
                <div className="philosophy-block">
                  <div className="philosophy-block-num mono">03</div>
                  <div>
                    <strong className="philosophy-block-name">Constraint-Driven Innovation</strong>
                    <p className="philosophy-block-desc">My best solutions came from hard limits. When you only have 16GB VRAM but need 4 LLMs, you don't give up — you design a smarter system.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Awards */}
            <div className="story-section stagger-item">
              <h3 className="mono story-section-title">Recognition</h3>
              <div className="awards-list">
                {awards.map((a, i) => (
                  <div key={i} className="award-item">
                    <span className="award-icon">{a.icon}</span>
                    <div>
                      <div className="mono award-title">{a.title}</div>
                      <div className="mono award-event">{a.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="story-section stagger-item">
              <div className="mono story-availability">
                Open to Full-Time &amp; Freelance opportunities
              </div>
              <div className="contact-links">
                <a href="mailto:watcharapon.thod@gmail.com" className="contact-link-main">
                  watcharapon.thod@gmail.com
                </a>
                <div className="contact-secondary">
                  <a href="tel:0944532072" className="contact-secondary-link mono">
                    <TbPhone size={14} /> 094-453-2072
                  </a>
                  <a href="https://github.com/watcharapon" target="_blank" rel="noopener noreferrer" className="contact-secondary-link mono">
                    <TbBrandGithub size={14} /> github.com/watcharapon
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .story-root {
          display: flex;
          flex-direction: column;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 5rem;
          align-items: start;
          margin-top: 0;
        }

        /* ---- LEFT COLUMN ---- */
        .story-left {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .photo-wrapper {
          position: relative;
        }

        .photo-bg-accent {
          position: absolute;
          top: 20px;
          left: 20px;
          right: -20px;
          bottom: -20px;
          border: 1px solid black;
          opacity: 0.08;
          z-index: 0;
          pointer-events: none;
        }

        .photo-frame {
          position: relative;
          z-index: 1;
          overflow: hidden;
          border: 1px solid var(--border-strong);
        }

        .story-photo {
          width: 100%;
          height: auto;
          display: block;
          filter: grayscale(100%) contrast(1.05);
          transition: filter 0.5s ease, transform 0.5s ease;
        }

        .photo-frame:hover .story-photo {
          filter: grayscale(80%) contrast(1.1);
          transform: scale(1.02);
        }

        .photo-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          z-index: 2;
          background: white;
          border: 1px solid var(--border-strong);
          padding: 0.4rem 0.8rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }

        .story-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid var(--border-strong);
          overflow: hidden;
        }

        .story-stat {
          padding: 1.25rem;
          border-right: 1px solid var(--border-strong);
          border-bottom: 1px solid var(--border-strong);
          text-align: center;
          transition: background 0.2s;
        }

        .story-stat:hover {
          background: var(--bg-secondary);
        }

        .story-stat:nth-child(even) {
          border-right: none;
        }

        .story-stat:nth-child(3),
        .story-stat:nth-child(4) {
          border-bottom: none;
        }

        .story-stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 0.3rem;
        }

        .story-stat-label {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* ---- RIGHT COLUMN ---- */
        .story-right {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .story-section {
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-light);
        }

        .story-section:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .story-bio {
          font-size: 1.1rem;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 600px;
        }

        .story-bio strong {
          color: var(--text-primary);
          font-weight: 700;
        }

        .story-section-title {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-light);
        }

        .philosophy-blocks {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .philosophy-block {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .philosophy-block-num {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-tertiary);
          opacity: 0.5;
          margin-top: 0.2rem;
          flex-shrink: 0;
          width: 24px;
        }

        .philosophy-block-name {
          display: block;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.3rem;
        }

        .philosophy-block-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin: 0;
          max-width: none;
        }

        .awards-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .award-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          background: var(--bg-secondary);
          border-left: 3px solid black;
          transition: transform 0.2s;
        }

        .award-item:hover {
          transform: translateX(4px);
        }

        .award-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
        }

        .award-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.1rem;
        }

        .award-event {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
        }

        .story-availability {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 0.75rem;
        }

        .contact-link-main {
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 800;
          border-bottom: 2px solid black;
          padding-bottom: 3px;
          display: inline-block;
          margin-bottom: 1rem;
          transition: opacity 0.2s;
        }

        .contact-link-main:hover {
          opacity: 0.7;
        }

        .contact-secondary {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .contact-secondary-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
        }

        .contact-secondary-link:hover {
          color: var(--text-primary);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .photo-bg-accent {
            display: none;
          }

          .story-left {
            max-width: 480px;
            margin: 0 auto;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .story-grid {
            gap: 2rem;
          }

          .contact-secondary {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
