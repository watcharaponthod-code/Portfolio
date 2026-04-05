import ScrambleText from '../visuals/ScrambleText';

interface SectionHeaderProps {
    subtitle: string;
    titleLines: string[];
    description?: string;
    isDark?: boolean;
}

export default function SectionHeader({ subtitle, titleLines, description, isDark = true }: SectionHeaderProps) {
    return (
        <header className="section-header" style={{
            marginBottom: '5rem',
            borderLeft: '4px solid #ffffff',
            paddingLeft: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: '-4px 0 20px rgba(255,255,255,0.05)',
        }}>
            <div className="mono" style={{
                color: '#ffffff',
                marginBottom: '1rem',
                letterSpacing: '0.2rem',
                textTransform: 'uppercase',
                fontSize: '0.72rem',
                opacity: 0.5
            }}>
                {subtitle}
            </div>
            <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                color: '#ffffff',
                marginBottom: description ? '1.5rem' : '0',
                textTransform: 'uppercase',
                letterSpacing: '-0.04em',
            }}>
                {titleLines.map((line, i) => (
                    <span key={i} style={{ display: 'block' }}>
                        <ScrambleText text={line} delay={200 + (i * 200)} duration={1000} />
                    </span>
                ))}
            </h1>
            {description && (
                <p className="mono" style={{
                    marginTop: '0',
                    color: 'rgba(255,255,255,0.6)',
                    maxWidth: '600px',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                }}>
                    {description}
                </p>
            )}

            <style>{`
        @media (max-width: 768px) {
          .section-header {
            padding-left: 1.5rem !important;
            margin-bottom: 3rem !important;
          }
        }
      `}</style>
        </header>
    );
}
