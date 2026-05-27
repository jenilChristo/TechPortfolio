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
  ChevronLeftRegular,
  StarRegular,
  CheckmarkCircleRegular,
  BrainCircuitRegular,
  DatabaseRegular,
  CloudRegular,
  CodeRegular,
  DataTrendingRegular,
  RocketRegular,
  PeopleTeamRegular,
} from '@fluentui/react-icons';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { skillsData } from '../data/skills';
import { projects } from '../data/projects';

const useStyles = makeStyles({
  container: {
    width: '100%',
  },
  hero: {
    backgroundImage: 'linear-gradient(135deg, #5b4ef5 0%, #8b2fc9 100%)',
    ...shorthands.padding('100px', '20px', '80px'),
    color: tokens.colorNeutralForegroundInverted,
    textAlign: 'center',
    position: 'relative',
    ...shorthands.overflow('hidden'),
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
      pointerEvents: 'none',
    },
  },
  heroContent: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap('32px'),
    position: 'relative',
    zIndex: 1,
  },
  profileImage: {
    width: '180px',
    height: '180px',
    ...shorthands.borderRadius('50%'),
    ...shorthands.border('5px', 'solid', tokens.colorNeutralForegroundInverted),
    objectFit: 'cover',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
    transition: 'transform 0.3s ease',
    position: 'relative',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  profileImageContainer: {
    position: 'relative',
    display: 'inline-block',
    ':hover .onlineStatusTooltip': {
      display: 'block',
    },
  },
  onlineStatusBadge: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    width: '24px',
    height: '24px',
    ...shorthands.borderRadius('50%'),
    ...shorthands.border('4px', 'solid', tokens.colorNeutralForegroundInverted),
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 2,
    cursor: 'pointer',
    animationName: {
      '0%, 100%': {
        opacity: '1',
      },
      '50%': {
        opacity: '0.7',
      },
    },
    animationDuration: '2s',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.6, 1)',
    animationIterationCount: 'infinite',
    ':hover': {
      transform: 'scale(1.1)',
    },
  },
  onlineStatusTooltip: {
    position: 'absolute',
    bottom: '-35px',
    right: '0px',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding('6px', '12px'),
    ...shorthands.borderRadius('6px'),
    fontSize: '12px',
    fontWeight: 600,
    boxShadow: tokens.shadow8,
    whiteSpace: 'nowrap',
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    display: 'none',
  },
  heroTitle: {
    fontSize: '52px',
    fontWeight: 700,
    marginTop: '16px',
    marginBottom: '16px',
    color: tokens.colorNeutralForegroundInverted,
    lineHeight: 1.2,
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
    '@media (max-width: 768px)': {
      fontSize: '36px',
    },
  },
  heroSubtitle: {
    fontSize: '22px',
    fontWeight: 400,
    marginTop: '8px',
    marginBottom: '24px',
    color: tokens.colorNeutralForegroundInverted,
    opacity: 0.95,
    lineHeight: 1.5,
    maxWidth: '800px',
    textShadow: '0 1px 5px rgba(0,0,0,0.2)',
    '@media (max-width: 768px)': {
      fontSize: '18px',
    },
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
    fontSize: '38px',
    fontWeight: 700,
    marginBottom: '16px',
    textAlign: 'center',
    color: tokens.colorBrandForeground1,
    position: 'relative',
    paddingBottom: '16px',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '4px',
      backgroundColor: tokens.colorBrandBackground,
      ...shorthands.borderRadius('2px'),
    },
  },
  sectionSubtitle: {
    fontSize: '18px',
    textAlign: 'center',
    color: tokens.colorNeutralForeground2,
    marginBottom: '32px',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6,
  },
  aboutText: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: tokens.colorNeutralForeground1,
    marginBottom: '16px',
  },
  githubSection: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding('70px', '20px'),
    position: 'relative',
  },
  githubContainer: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  githubStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    ...shorthands.gap('24px'),
    marginTop: '40px',
  },
  githubCard: {
    ...shorthands.padding('0px'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.overflow('hidden'),
    transition: 'all 0.3s ease',
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: tokens.shadow16,
    },
  },
  githubImage: {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'opacity 0.3s ease',
  },
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    ...shorthands.gap('24px'),
    marginTop: '32px',
  },
  skillCard: {
    height: '100%',
    position: 'relative',
    ...shorthands.overflow('hidden'),
    transition: 'all 0.3s ease',
    ...shorthands.border('2px', 'solid', 'transparent'),
    backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #5b4ef5 0%, #8b2fc9 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 12px 35px rgba(91, 78, 245, 0.15)',
      ...shorthands.borderColor(tokens.colorBrandStroke1),
    },
  },
  skillCategory: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '16px',
    color: tokens.colorBrandForeground1,
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
    backgroundImage: 'linear-gradient(135deg, #5b4ef5 0%, #8b2fc9 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  skillBadges: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('10px'),
  },
  skillBadge: {
    ...shorthands.padding('6px', '14px'),
    ...shorthands.borderRadius('16px'),
    fontSize: '13px',
    fontWeight: 500,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
    transition: 'all 0.2s ease',
    cursor: 'default',
    '&:hover': {
      backgroundColor: tokens.colorBrandBackground,
      color: tokens.colorNeutralForegroundInverted,
      transform: 'scale(1.05)',
    },
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
  carouselContainer: {
    position: 'relative',
    marginTop: '32px',
    ...shorthands.padding('20px', '60px'),
    '@media (max-width: 768px)': {
      ...shorthands.padding('20px', '40px'),
    },
  },
  carouselWrapper: {
    ...shorthands.overflow('hidden'),
  },
  carouselTrack: {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
  },
  carouselSlide: {
    minWidth: '100%',
    ...shorthands.padding('0px', '10px'),
  },
  projectsPreview: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    ...shorthands.gap('28px'),
    marginTop: '32px',
  },
  carouselButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '48px',
    height: '48px',
    ...shorthands.borderRadius('50%'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border('2px', 'solid', tokens.colorBrandStroke1),
    boxShadow: tokens.shadow8,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: tokens.colorBrandBackground,
      transform: 'translateY(-50%) scale(1.1)',
      boxShadow: tokens.shadow16,
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed',
      '&:hover': {
        transform: 'translateY(-50%)',
      },
    },
  },
  carouselButtonLeft: {
    left: '0px',
  },
  carouselButtonRight: {
    right: '0px',
  },
  carouselDots: {
    display: 'flex',
    justifyContent: 'center',
    ...shorthands.gap('10px'),
    marginTop: '24px',
  },
  carouselDot: {
    width: '12px',
    height: '12px',
    ...shorthands.borderRadius('50%'),
    backgroundColor: tokens.colorNeutralStroke1,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ...shorthands.border('none'),
    '&:hover': {
      backgroundColor: tokens.colorBrandStroke1,
    },
  },
  carouselDotActive: {
    backgroundColor: tokens.colorBrandBackground,
    width: '32px',
    ...shorthands.borderRadius('6px'),
  },
  projectCard: {
    height: '100%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.overflow('hidden'),
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
      ...shorthands.borderColor(tokens.colorBrandStroke1),
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
  educationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    ...shorthands.gap('32px'),
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  educationCard: {
    position: 'relative',
    ...shorthands.overflow('hidden'),
    transition: 'all 0.3s ease',
    ...shorthands.border('2px', 'solid', 'transparent'),
    backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #5b4ef5 0%, #8b2fc9 100%)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
    '&:hover': {
      transform: 'translateY(-6px)',
      boxShadow: '0 12px 35px rgba(91, 78, 245, 0.15)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '4px',
      backgroundImage: 'linear-gradient(90deg, #5b4ef5 0%, #8b2fc9 100%)',
    },
  },
  educationContent: {
    ...shorthands.padding('32px'),
  },
  degree: {
    fontSize: '22px',
    fontWeight: 700,
    marginBottom: '8px',
    color: tokens.colorNeutralForeground1,
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
  },
  degreeIcon: {
    fontSize: '28px',
    color: tokens.colorBrandForeground1,
  },
  institution: {
    fontSize: '18px',
    color: tokens.colorBrandForeground1,
    fontWeight: 600,
    marginBottom: '12px',
    marginLeft: '40px',
  },
  educationMeta: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
    color: tokens.colorNeutralForeground3,
    fontSize: '14px',
    marginLeft: '40px',
  },
  ctaSection: {
    textAlign: 'center',
    ...shorthands.padding('80px', '20px'),
    backgroundImage: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: 700,
    marginBottom: '16px',
    color: tokens.colorBrandForeground1,
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presenceStatus, setPresenceStatus] = useState<{ color: string; status: string }>({
    color: '#6b7280',
    status: 'Offline',
  });
  const featuredProjects = projects.slice(0, 6);

  // Fetch availability status from backend API
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/availability/status`);
        
        if (response.ok) {
          const data = await response.json();
          setPresenceStatus({
            color: data.color,
            status: data.status,
          });
        } else {
          console.error('Failed to fetch availability status');
          // Fallback to offline status
          setPresenceStatus({
            color: '#6b7280',
            status: 'Offline',
          });
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
        // Fallback to offline status
        setPresenceStatus({
          color: '#6b7280',
          status: 'Offline',
        });
      }
    };

    // Fetch immediately
    fetchAvailability();

    // Update every minute to keep status current
    const interval = setInterval(fetchAvailability, 60000);

    return () => clearInterval(interval);
  }, []);

  // Skill category icon mapping
  const skillCategoryIcons: { [key: string]: JSX.Element } = {
    'Generative AI & Agentic AI': <BrainCircuitRegular fontSize={24} />,
    'Distributed Data Systems': <DatabaseRegular fontSize={24} />,
    'Backend & Cloud Engineering': <CloudRegular fontSize={24} />,
    'Frontend & Full Stack': <CodeRegular fontSize={24} />,
    'Machine Learning & Data Science': <DataTrendingRegular fontSize={24} />,
    'Developer Productivity & Tooling': <RocketRegular fontSize={24} />,
    'Leadership & Collaboration': <PeopleTeamRegular fontSize={24} />,
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Handle status badge click to trigger login
  const handleStatusClick = async () => {
    if (presenceStatus.status === 'Offline') {
      const success = await login();
      if (success) {
        // Fetch presence immediately after login
        const presence = await getUserPresence();
        if (presence) {
          const status = mapPresenceToStatus(presence.availability, presence.activity);
          setPresenceStatus(status);
        }
      }
    }
  };

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
          <div className={styles.profileImageContainer}>
            <img
              src="/images/profile.jpg"
              alt="L. Jenil Christo"
              className={styles.profileImage}
            />
            <div 
              className={styles.onlineStatusBadge}
              style={{ backgroundColor: presenceStatus.color }}
              onClick={handleStatusClick}
              role="button"
              aria-label={`Status: ${presenceStatus.status}. Click to ${presenceStatus.status === 'Offline' ? 'sign in with Microsoft' : 'view status'}`}
              tabIndex={0}
            />
            <div 
              className={`${styles.onlineStatusTooltip} onlineStatusTooltip`}
              style={{ color: presenceStatus.color }}
            >
              ● {presenceStatus.status}{presenceStatus.status === 'Offline' ? ' (Click to sign in)' : ''}
            </div>
          </div>
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
        <Text className={styles.sectionSubtitle}>
          Engineering leader with deep expertise in distributed systems, AI, and full-stack development
        </Text>
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
          <Text className={styles.sectionSubtitle}>
            Open source contributions and continuous learning
          </Text>
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
        <Text className={styles.sectionSubtitle}>
          Comprehensive expertise across modern technology stack
        </Text>
        <div className={styles.skillsGrid}>
          {skillsData.map((category, index) => (
            <Card key={index} className={styles.skillCard}>
              <CardHeader 
                header={
                  <Text className={styles.skillCategory}>
                    {skillCategoryIcons[category.category] || <StarRegular fontSize={24} />}
                    {category.category}
                  </Text>
                } 
              />
              <div className={styles.skillBadges}>
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className={styles.skillBadge}>
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Work Experience */}
      <section className={styles.section} style={{ backgroundColor: tokens.colorNeutralBackground2, paddingTop: '70px', paddingBottom: '70px' }}>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
        <Text className={styles.sectionSubtitle}>
          10+ years building enterprise-scale platforms and AI-powered systems
        </Text>
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
        <Text className={styles.sectionSubtitle}>
          Showcasing impactful projects across data platforms, AI systems, and enterprise applications
        </Text>
        <div className={styles.carouselContainer}>
          <button 
            className={`${styles.carouselButton} ${styles.carouselButtonLeft}`}
            onClick={prevSlide}
            aria-label="Previous project"
          >
            <ChevronLeftRegular fontSize={24} style={{ color: tokens.colorBrandForeground1 }} />
          </button>
          <div className={styles.carouselWrapper}>
            <div 
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProjects.map((project) => (
                <div key={project.id} className={styles.carouselSlide}>
                  <Card className={styles.projectCard} as={Link} to={`/projects/${project.id}`}>
                    <img src={project.image} alt={project.title} className={styles.projectImage} />
                    <div className={styles.projectContent}>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                      <p className={styles.projectDescription}>{project.description}</p>
                      <div className={styles.techBadges}>
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <Badge key={techIndex} appearance="outline" color="informative">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge appearance="outline" color="subtle">
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          <button 
            className={`${styles.carouselButton} ${styles.carouselButtonRight}`}
            onClick={nextSlide}
            aria-label="Next project"
          >
            <ChevronRightRegular fontSize={24} style={{ color: tokens.colorBrandForeground1 }} />
          </button>
        </div>
        <div className={styles.carouselDots}>
          {featuredProjects.map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselDot} ${index === currentSlide ? styles.carouselDotActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button appearance="primary" size="large" as={Link} to="/projects" icon={<ChevronRightRegular />} iconPosition="after">
            View All Projects
          </Button>
        </div>
      </section>

      {/* Education */}
      <section className={`${styles.section} ${styles.educationSection}`} style={{ paddingTop: '70px', paddingBottom: '70px' }}>
        <h2 className={styles.sectionTitle}>Education</h2>
        <Text className={styles.sectionSubtitle}>
          Academic foundation in Computer Science and Machine Learning
        </Text>
        <div className={styles.educationGrid}>
          <Card className={styles.educationCard}>
            <div className={styles.educationContent}>
              <div className={styles.degree}>
                <DocumentRegular className={styles.degreeIcon} />
                <span>Executive Post Graduate Program in Machine Learning & Artificial Intelligence</span>
              </div>
              <div className={styles.institution}>IIIT Bangalore</div>
              <div className={styles.educationMeta}>
                <CheckmarkCircleRegular fontSize={16} />
                <span>Specialized in Machine Learning and Artificial Intelligence</span>
              </div>
            </div>
          </Card>
          <Card className={styles.educationCard}>
            <div className={styles.educationContent}>
              <div className={styles.degree}>
                <DocumentRegular className={styles.degreeIcon} />
                <span>B.E. Computer Science and Engineering</span>
              </div>
              <div className={styles.institution}>Anna University</div>
              <div className={styles.educationMeta}>
                <CheckmarkCircleRegular fontSize={16} />
                <span>Foundation in Computer Science and Engineering</span>
              </div>
            </div>
          </Card>
        </div>
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