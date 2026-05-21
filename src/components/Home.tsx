import {
  makeStyles,
  shorthands,
  tokens,
  Text,
  Button,
  Card,
  CardHeader,
  Badge,
  Body2,
} from '@fluentui/react-components';
import {
  MailRegular,
  PhoneRegular,
  LocationRegular,
  DocumentRegular,
  CalendarRegular,
  ChevronRightRegular,
} from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import { skillsData } from '../data/skills';
import { projects } from '../data/projects';

const useStyles = makeStyles({
  container: {
    width: '100%',
  },
  hero: {
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    ...shorthands.padding('80px', '20px'),
    color: tokens.colorNeutralForegroundInverted,
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap('24px'),
  },
  profileImage: {
    width: '180px',
    height: '180px',
    ...shorthands.borderRadius('50%'),
    ...shorthands.border('4px', 'solid', tokens.colorNeutralForegroundInverted),
    objectFit: 'cover',
    boxShadow: tokens.shadow16,
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 700,
    marginBottom: '8px',
    color: tokens.colorNeutralForegroundInverted,
  },
  heroSubtitle: {
    fontSize: '24px',
    fontWeight: 400,
    marginBottom: '16px',
    color: tokens.colorNeutralForegroundInverted,
    opacity: 0.95,
  },
  heroContact: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    ...shorthands.gap('20px'),
    ...shorthands.margin('20px', '0px'),
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
    color: tokens.colorNeutralForegroundInverted,
    fontSize: '16px',
  },
  section: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...shorthands.padding('60px', '20px'),
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: 700,
    marginBottom: '32px',
    textAlign: 'center',
    color: tokens.colorBrandForeground1,
  },
  aboutText: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: tokens.colorNeutralForeground1,
    marginBottom: '16px',
  },
  githubSection: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding('60px', '20px'),
  },
  githubContainer: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  githubStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    ...shorthands.gap('20px'),
    marginTop: '32px',
  },
  githubCard: {
    ...shorthands.padding('0px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.overflow('hidden'),
  },
  githubImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    ...shorthands.gap('24px'),
    marginTop: '32px',
  },
  skillCard: {
    height: '100%',
  },
  skillCategory: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '16px',
    color: tokens.colorBrandForeground1,
  },
  skillBadges: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('8px'),
  },
  timeline: {
    position: 'relative',
    ...shorthands.padding('0px', '20px'),
  },
  timelineItem: {
    position: 'relative',
    ...shorthands.padding('0px', '0px', '40px', '40px'),
    ...shorthands.borderLeft('3px', 'solid', tokens.colorBrandBackground),
    marginLeft: '20px',
  },
  timelineDot: {
    position: 'absolute',
    left: '-12px',
    top: '0px',
    width: '20px',
    height: '20px',
    ...shorthands.borderRadius('50%'),
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.border('3px', 'solid', tokens.colorNeutralBackground1),
  },
  companyName: {
    fontSize: '24px',
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    marginBottom: '4px',
  },
  role: {
    fontSize: '18px',
    fontWeight: 500,
    color: tokens.colorBrandForeground1,
    marginBottom: '8px',
  },
  dateLocation: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground3,
    marginBottom: '16px',
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('16px'),
  },
  achievementsList: {
    listStyleType: 'none',
    ...shorthands.padding('0px'),
    ...shorthands.margin('12px', '0px'),
  },
  achievement: {
    ...shorthands.padding('8px', '0px'),
    display: 'flex',
    ...shorthands.gap('8px'),
    '&:before': {
      content: '"▹"',
      color: tokens.colorBrandForeground1,
      fontWeight: 'bold',
      marginRight: '8px',
    },
  },
  projectsPreview: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    ...shorthands.gap('24px'),
    marginTop: '32px',
  },
  projectCard: {
    height: '100%',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: tokens.shadow16,
    },
  },
  projectImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  projectContent: {
    ...shorthands.padding('20px'),
  },
  projectTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '12px',
    color: tokens.colorNeutralForeground1,
  },
  projectDescription: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    marginBottom: '16px',
    lineHeight: '1.6',
  },
  techBadges: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('6px'),
  },
  educationSection: {
    backgroundColor: tokens.colorNeutralBackground2,
  },
  educationCard: {
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  degree: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '8px',
    color: tokens.colorNeutralForeground1,
  },
  institution: {
    fontSize: '16px',
    color: tokens.colorBrandForeground1,
    marginBottom: '4px',
  },
  ctaSection: {
    textAlign: 'center',
    ...shorthands.padding('60px', '20px'),
    backgroundColor: tokens.colorBrandBackground2Hover,
  },
  ctaTitle: {
    fontSize: '32px',
    fontWeight: 600,
    marginBottom: '16px',
    color: tokens.colorNeutralForeground1,
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    ...shorthands.gap('16px'),
    marginTop: '24px',
  },
});

const Home = () => {
  const styles = useStyles();

  const experiences = [
    {
      company: 'Microsoft Corporation',
      role: 'Senior Software Engineer – Big Data, AI, Full Stack Web',
      location: 'Hyderabad, India',
      period: 'July 2019 – Present',
      highlights: [
        'Building AI-First version of Microsoft Launch Center, owning integration and delivery of Trade compliance systems, empowering compliant launch of products attributing to over $80 Billion in revenue',
        'Owns the Commercial critical data platform, enabling high availability near real-time reporting for quarter end close critical revenue realization',
        'Designed and built standardized AI Agent Skills for Microsoft Fabric, enabling AI coding agents to author, query, operate, and govern Fabric workloads via MCP',
        'Built autonomous agents for Incident Management & RCA to analyze telemetry, logs, and metadata, reducing manual debugging effort',
        'Improved Spark workload performance and cost efficiency by 45% through advanced optimization techniques',
      ],
    },
    {
      company: 'PayPal Inc',
      role: 'Software Engineer – Big Data & Distributed Systems',
      location: 'Chennai, India',
      period: 'May 2018 – June 2019',
      highlights: [
        'Designed high-performance backend services using Node.js for PayPal Resolution Center serving millions of users',
        'Built Apache Spark pipelines for batch processing and reporting of dispute data',
        'Led development of billing dispute workflow scaling to 1.5M+ active users',
        'Contributed to modernization from monolithic C++ to microservices architecture',
        'Developed comprehensive test suite reducing production incidents by 15%',
      ],
    },
    {
      company: 'Develop Scripts LLC',
      role: 'Full Stack Engineer – Distributed Systems & Cloud',
      location: 'Chennai, India',
      period: 'May 2016 – May 2018',
      highlights: [
        'Designed concurrent backend microservices for real-time auction systems handling millions of queries per second',
        'Built event-driven architectures using Azure Cosmos DB and WebSockets',
        'Delivered cloud-native distributed systems optimized for performance',
      ],
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img
            src="/images/profile.jpg"
            alt="L. Jenil Christo"
            className={styles.profileImage}
          />
          <div>
            <h1 className={styles.heroTitle}>L. Jenil Christo</h1>
            <h2 className={styles.heroSubtitle}>
              Senior Software Engineer | Data & AI | Full Stack Web | Agentic AI
            </h2>
          </div>
          <div className={styles.heroContact}>
            <div className={styles.contactItem}>
              <PhoneRegular />
              <span>+91-8870196771</span>
            </div>
            <div className={styles.contactItem}>
              <MailRegular />
              <span>jenilchristo@outlook.com</span>
            </div>
            <div className={styles.contactItem}>
              <LocationRegular />
              <span>Hyderabad, India</span>
            </div>
          </div>
          <div className={styles.ctaButtons}>
            <Button appearance="primary" size="large" as="a" href="https://www.linkedin.com/in/jenil-christo-746458126/" target="_blank">
              LinkedIn Profile
            </Button>
            <Button appearance="secondary" size="large" as="a" href="https://www.jenilchristo.com" target="_blank">
              Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <Text className={styles.aboutText}>
          Engineering leader and Senior Software Engineer with <strong>10+ years of experience</strong> building and operating large-scale distributed data platforms, Backend Services and AI-powered systems.
        </Text>
        <Text className={styles.aboutText}>
          Over the last <strong>3+ years</strong>, I have designed and shipped production-grade GenAI and agentic AI solutions, including autonomous data engineering workflows, incident/root-cause analysis agents, and AI-first developer tooling - driving measurable improvements in developer productivity, system reliability, and operational efficiency.
        </Text>
        <Text className={styles.aboutText}>
          I specialize in <strong>end-to-end ownership</strong> of systems from problem framing and architecture through implementation, deployment, and live-site operations - building reliable, secure, and scalable data platforms, backend services and enterprise scale applications that power business-critical workflows.
        </Text>
      </section>

      {/* GitHub Contributions */}
      <section className={styles.githubSection}>
        <div className={styles.githubContainer}>
          <h2 className={styles.sectionTitle}>GitHub Contributions</h2>
          <div className={styles.githubStatsGrid}>
            <Card className={styles.githubCard}>
              <img 
                src="https://github-readme-streak-stats.herokuapp.com/?user=jenilChristo&theme=default&hide_border=true&background=FFFFFF" 
                alt="GitHub Streak Stats" 
                className={styles.githubImage}
              />
            </Card>
            <Card className={styles.githubCard}>
              <img 
                src="https://github-readme-stats.vercel.app/api?username=jenilChristo&show_icons=true&theme=default&hide_border=true&bg_color=FFFFFF" 
                alt="GitHub Stats" 
                className={styles.githubImage}
              />
            </Card>
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Button appearance="primary" size="large" as="a" href="https://github.com/jenilChristo" target="_blank" rel="noopener noreferrer">
              View GitHub Profile
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Core Skills</h2>
        <div className={styles.skillsGrid}>
          {skillsData.map((category, index) => (
            <Card key={index} className={styles.skillCard}>
              <CardHeader header={<Text className={styles.skillCategory}>{category.category}</Text>} />
              <div className={styles.skillBadges}>
                {category.skills.map((skill, skillIndex) => (
                  <Badge key={skillIndex} appearance="filled" color="brand">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className={styles.section} style={{ backgroundColor: tokens.colorNeutralBackground2 }}>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <h3 className={styles.companyName}>{exp.company}</h3>
              <div className={styles.role}>{exp.role}</div>
              <div className={styles.dateLocation}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CalendarRegular fontSize={16} />
                  {exp.period}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <LocationRegular fontSize={16} />
                  {exp.location}
                </span>
              </div>
              <ul className={styles.achievementsList}>
                {exp.highlights.map((highlight, hIndex) => (
                  <li key={hIndex} className={styles.achievement}>
                    <Body2>{highlight}</Body2>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Projects</h2>
        <div className={styles.projectsPreview}>
          {projects.slice(0, 3).map((project) => (
            <Card key={project.id} className={styles.projectCard} as={Link} to={`/projects/${project.id}`}>
              <img src={project.image} alt={project.title} className={styles.projectImage} />
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.techBadges}>
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <Badge key={techIndex} appearance="outline" color="informative">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge appearance="outline" color="subtle">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button appearance="primary" size="large" as={Link} to="/projects" icon={<ChevronRightRegular />} iconPosition="after">
            View All Projects
          </Button>
        </div>
      </section>

      {/* Education */}
      <section className={`${styles.section} ${styles.educationSection}`}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <Card className={styles.educationCard}>
          <div style={{ padding: '24px' }}>
            <div className={styles.degree}>
              <DocumentRegular style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Executive PGP in Machine Learning and AI
            </div>
            <div className={styles.institution}>IIIT Bangalore</div>
            <div style={{ margin: '16px 0', height: '1px', backgroundColor: tokens.colorNeutralStroke1 }} />
            <div className={styles.degree}>
              <DocumentRegular style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Bachelor of Science in Computer Science
            </div>
            <div className={styles.institution}>Anna University</div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Let's Build Something Amazing Together</h2>
        <Text style={{ fontSize: '18px' }}>
          Interested in collaborating or want to discuss opportunities? Feel free to reach out!
        </Text>
        <div className={styles.ctaButtons}>
          <Button appearance="primary" size="large" as="a" href="mailto:jenilchristo@outlook.com">
            Get in Touch
          </Button>
          <Button appearance="secondary" size="large" as={Link} to="/blog">
            Read My Blog
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;