import {
  SiReact, SiTypescript, SiNextdotjs, SiNodedotjs, SiPython, SiDocker, SiPostgresql,
  SiApachekafka, SiSpringboot, SiFigma, SiGitlab, SiMongodb, SiLinux,
  SiPhp, SiCplusplus, SiTailwindcss, SiJavascript, SiGo, SiRust, SiExpress, SiFlask,
  SiDjango, SiFastapi, SiRedux, SiRedis, SiMysql, SiFirebase, SiKubernetes, SiNginx,
  SiTerraform, SiAmazonwebservices, SiPrometheus, SiGrafana, SiTableau, SiPostman,
  SiPytorch, SiTensorflow, SiPandas, SiGithubactions, SiVite, SiAntdesign, SiSqlite,
  SiInsomnia, SiIntellijidea, SiCanva, SiNestjs,
} from 'react-icons/si';
import {
  TbBrandReactNative, TbBrain, TbShieldLock, TbChartBar, TbDatabase,
  TbSettingsAutomation, TbBrandFramerMotion, TbBinary, TbCloudDataConnection,
  TbTerminal2, TbBrandVscode,
} from 'react-icons/tb';
import { BsTerminalSplit } from 'react-icons/bs';
import SectionHeader from './SectionHeader';
import { motion } from 'framer-motion';

export default function SkillArchitecture() {
  const categories = [
    {
      title: "LANGUAGES & SYSTEMS",
      id: "01",
      skills: [
        { name: "Java", icon: <SiSpringboot /> },
        { name: "Python", icon: <SiPython /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "JavaScript", icon: <SiJavascript /> },
        { name: "C++", icon: <SiCplusplus /> },
        { name: "PHP", icon: <SiPhp /> },
        { name: "Golang", icon: <SiGo /> },
        { name: "Rust", icon: <SiRust /> },
        { name: "SQL", icon: <TbDatabase /> },
        { name: "Bash", icon: <BsTerminalSplit /> }
      ]
    },
    {
      title: "FRAMEWORKS & APPS",
      id: "02",
      skills: [
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "React", icon: <SiReact /> },
        { name: "NestJS", icon: <SiNestjs /> },
        { name: "Spring Boot", icon: <SiSpringboot /> },
        { name: "FastAPI", icon: <SiFastapi /> },
        { name: "React Native", icon: <TbBrandReactNative /> },
        { name: "Flask", icon: <SiFlask /> },
        { name: "Django", icon: <SiDjango /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "Ant Design", icon: <SiAntdesign /> },
        { name: "Vite", icon: <SiVite /> }
      ]
    },
    {
      title: "AI & DATA ARCHITECTURE",
      id: "03",
      skills: [
        { name: "LangChain", icon: <TbBrain /> },
        { name: "LangGraph", icon: <TbBrain /> },
        { name: "LlamaIndex", icon: <TbCloudDataConnection /> },
        { name: "PyTorch", icon: <SiPytorch /> },
        { name: "TensorFlow", icon: <SiTensorflow /> },
        { name: "pgvector", icon: <SiPostgresql /> },
        { name: "Pandas", icon: <SiPandas /> },
        { name: "Power BI", icon: <TbChartBar /> },
        { name: "Tableau", icon: <SiTableau /> }
      ]
    },
    {
      title: "INFRA & PROD OPS",
      id: "04",
      skills: [
        { name: "Docker", icon: <SiDocker /> },
        { name: "Kubernetes", icon: <SiKubernetes /> },
        { name: "Kafka", icon: <SiApachekafka /> },
        { name: "GitLab CI", icon: <SiGitlab /> },
        { name: "GH Actions", icon: <SiGithubactions /> },
        { name: "Terraform", icon: <SiTerraform /> },
        { name: "AWS", icon: <SiAmazonwebservices /> },
        { name: "Nginx", icon: <SiNginx /> },
        { name: "Prometheus", icon: <SiPrometheus /> },
        { name: "Grafana", icon: <SiGrafana /> },
        { name: "n8n", icon: <TbSettingsAutomation /> },
        { name: "Linux", icon: <SiLinux /> }
      ]
    }
  ];

  return (
    <div className="section container" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', padding: '5rem 0' }}>
      <div className="animate-enter">
        <SectionHeader
          subtitle="03 / REPOSITORY ECOSYSTEM"
          titleLines={["Technical Stack", "Overview."]}
          description="A dense mapping of my specialized skills across four core domains. Designed for efficient architectural scanning."
        />

        <div className="skills-compact-quadrants">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.id} 
              className="quadrant-min"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: "circOut" }}
            >
              {/* Animated Border Reveal Effect */}
              <motion.div 
                className="animated-border-accent"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: (idx * 0.1) + 0.5, duration: 1 }}
              />

              <div className="quadrant-min-header">
                <span className="mono quadrant-id">[{cat.id}]</span>
                <h3 className="mono quadrant-title">{cat.title}</h3>
              </div>

              <div className="skills-dense-grid">
                {cat.skills.map((skill, j) => (
                  <motion.div 
                    key={j} 
                    className="skill-mini-card"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="mini-icon">{skill.icon}</span>
                    <span className="mini-label mono">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-compact-quadrants {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-top: 3.5rem;
        }
        
        .quadrant-min {
          background: #fff;
          border: 1px solid #111;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.4s;
        }

        .quadrant-min:hover {
          border-color: #000;
          box-shadow: 0 40px 100px rgba(0,0,0,0.05);
        }

        .animated-border-accent {
          position: absolute;
          top: 0; left: 0;
          height: 4px;
          background: #000;
        }

        .quadrant-min-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 3px solid #000;
          padding-bottom: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .quadrant-id {
          font-size: 0.9rem;
          font-weight: 950;
          color: #000;
          opacity: 0.1;
        }

        .quadrant-title {
          font-size: 1.1rem;
          font-weight: 950;
          letter-spacing: 0.15rem;
          text-transform: uppercase;
          color: #000; /* Set to Black */
        }

        .skills-dense-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
          gap: 0.8rem;
        }

        .skill-mini-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fff;
          border: 1.5px solid #eee;
          padding: 1rem 0.4rem;
          gap: 0.8rem;
          text-align: center;
          transition: all 0.3s;
          aspect-ratio: 1/1;
          position: relative;
          cursor: default;
        }

        .skill-mini-card:hover {
          border-color: #000;
          background: #000;
          color: #fff;
          z-index: 10;
        }

        .mini-icon {
          font-size: 1.8rem;
          color: #000;
          transition: all 0.3s;
        }

        .skill-mini-card:hover .mini-icon {
          color: #fff;
          transform: scale(1.1);
        }

        .mini-label {
          font-size: 0.65rem;
          font-weight: 950;
          color: #000;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .skill-mini-card:hover .mini-label {
          color: #fff;
        }

        @media (max-width: 1200px) {
          .skills-compact-quadrants {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .quadrant-min { padding: 2rem; }
          .skills-dense-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 600px) {
          .quadrant-min { padding: 1.5rem; }
          .skills-dense-grid { grid-template-columns: repeat(3, 1fr); }
          .quadrant-title { font-size: 0.9rem; }
        }

        @media (max-width: 400px) {
           .skills-dense-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
