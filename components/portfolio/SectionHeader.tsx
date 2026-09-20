import { motion, useReducedMotion } from 'framer-motion';
import ScrambleText from '../visuals/ScrambleText';

interface SectionHeaderProps {
    subtitle: string;
    titleLines: string[];
    description?: string;
    isDark?: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: '-80px' } as const;

export default function SectionHeader({ subtitle, titleLines, description }: SectionHeaderProps) {
    const reduce = useReducedMotion();
    const rise = (delay = 0) => ({
        initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: VIEWPORT,
        transition: { duration: 0.6, ease: EASE, delay },
    });

    return (
        <motion.header
            className="section-header"
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
        >
            {/* thin rule that draws in from the left */}
            <motion.div
                className="section-header-rule"
                aria-hidden
                variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
                transition={{ duration: reduce ? 0 : 0.9, ease: EASE }}
            />

            <motion.div className="section-header-sub mono" {...rise(0.05)}>
                {subtitle}
            </motion.div>

            <motion.h1 className="section-header-title" {...rise(0.12)}>
                {titleLines.map((line, i) => (
                    <span key={i} className="section-header-line">
                        <ScrambleText text={line} delay={200 + (i * 200)} duration={1000} />
                    </span>
                ))}
            </motion.h1>

            {description && (
                <motion.p className="section-header-desc mono" {...rise(0.22)}>
                    {description}
                </motion.p>
            )}

            <style>{`
        .section-header {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-top: var(--space-6);
          margin-bottom: var(--header-gap);
        }
        .section-header-rule {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 1px;
          background: var(--text-primary);
          transform-origin: left center;
        }
        .section-header-sub {
          color: var(--text-tertiary);
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          margin-bottom: var(--space-5);
        }
        .section-header-title {
          font-size: var(--text-h1);
          font-weight: 900;
          line-height: 0.96;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin: 0;
        }
        .section-header-line { display: block; }
        .section-header-desc {
          margin-top: var(--space-5);
          max-width: var(--measure-short);
          color: var(--text-secondary);
          font-size: var(--text-sm);
          line-height: 1.7;
          font-weight: 400;
        }
        @media (max-width: 640px) {
          .section-header { padding-top: var(--space-5); }
          .section-header-sub { margin-bottom: var(--space-4); }
          .section-header-desc { margin-top: var(--space-4); }
        }
      `}</style>
        </motion.header>
    );
}
