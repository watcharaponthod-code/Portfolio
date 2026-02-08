
import GlitchText from '../visuals/GlitchText';

interface SectionHeaderProps {
    subtitle: string;
    titleLines: string[];
    description?: string;
    isDark?: boolean;
}

export default function SectionHeader({ subtitle, titleLines, description, isDark = false }: SectionHeaderProps) {
    const textColor = isDark ? 'white' : 'var(--text-primary)';
    const secondaryColor = isDark ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)';
    const tertiaryColor = isDark ? 'rgba(255,255,255,0.4)' : 'var(--text-tertiary)';
    const borderColor = isDark ? 'white' : 'black';

    return (
        <header className="section-header" style={{
            marginBottom: '5rem',
            borderLeft: `5px solid ${borderColor}`,
            paddingLeft: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <div className="mono" style={{
                color: tertiaryColor,
                marginBottom: '1rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontSize: '0.8rem'
            }}>
                {subtitle}
            </div>
            <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1,
                color: textColor,
                marginBottom: description ? '1.5rem' : '0'
            }}>
                {titleLines.map((line, i) => (
                    <span key={i} style={{ display: 'block' }}>
                        <GlitchText text={line} />
                    </span>
                ))}
            </h1>
            {description && (
                <p className="mono" style={{
                    marginTop: '0',
                    color: secondaryColor,
                    maxWidth: '600px',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                }}>
                    {description}
                </p>
            )}

            <style>{`
        @media (max-width: 768px) {
          .section-header {
            padding-left: 1.5rem !important;
            border-left-width: 4px !important;
            margin-bottom: 3rem !important;
          }
        }
      `}</style>
        </header>
    );
}
