import { useParams, Link, useNavigate } from 'react-router-dom';
import { makeStyles, shorthands, tokens, Text, Badge, Button, Card, Divider } from '@fluentui/react-components';
import { ArrowLeftRegular, LinkRegular, CodeRegular, CheckmarkCircleRegular, ChartMultipleRegular, LightbulbRegular } from '@fluentui/react-icons';
import { projects } from '../data/projects';

const useStyles = makeStyles({
  container: {
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...shorthands.padding('40px', '20px'),
  },
  backButton: {
    marginBottom: '32px',
  },
  heroImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    marginBottom: '32px',
  },
  header: {
    marginBottom: '32px',
  },
  category: {
    marginBottom: '12px',
    color: tokens.colorBrandForeground1,
    fontSize: '14px',
    fontWeight: tokens.fontWeightSemibold,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  title: {
    fontSize: '42px',
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralForeground1,
    marginBottom: '16px',
    lineHeight: '1.2',
  },
  description: {
    fontSize: '18px',
    color: tokens.colorNeutralForeground2,
    lineHeight: '1.6',
    marginBottom: '24px',
  },
  techBadges: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('8px'),
    marginBottom: '24px',
  },
  actions: {
    display: 'flex',
    ...shorthands.gap('12px'),
    marginBottom: '48px',
  },
  section: {
    marginBottom: '48px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
  },
  sectionIcon: {
    fontSize: '24px',
    color: tokens.colorBrandForeground1,
  },
  fullDescription: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: tokens.colorNeutralForeground2,
    marginBottom: '24px',
  },
  listCard: {
    marginBottom: '16px',
    ...shorthands.padding('24px'),
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    ...shorthands.gap('12px'),
    marginBottom: '16px',
    '&:last-child': {
      marginBottom: '0',
    },
  },
  listIcon: {
    fontSize: '20px',
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
    marginTop: '2px',
  },
  listText: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: tokens.colorNeutralForeground1,
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    ...shorthands.gap('16px'),
    marginTop: '20px',
  },
  metricCard: {
    ...shorthands.padding('20px'),
    textAlign: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  metricValue: {
    fontSize: '15px',
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    marginBottom: '4px',
  },
  notFound: {
    textAlign: 'center',
    ...shorthands.padding('80px', '20px'),
    color: tokens.colorNeutralForeground3,
  },
});

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const styles = useStyles();
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <Text size={500}>Project not found</Text>
        <br />
        <Button appearance="primary" onClick={() => navigate('/projects')} style={{ marginTop: '20px' }}>
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Button 
        appearance="subtle" 
        icon={<ArrowLeftRegular />}
        className={styles.backButton}
        as={Link}
        to="/projects"
      >
        Back to Projects
      </Button>

      <img src={project.image} alt={project.title} className={styles.heroImage} />

      <div className={styles.header}>
        {project.category && (
          <div className={styles.category}>{project.category}</div>
        )}
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.description}>{project.description}</p>
        
        <div className={styles.techBadges}>
          {project.technologies.map((tech, index) => (
            <Badge key={index} appearance="filled" color="brand">
              {tech}
            </Badge>
          ))}
        </div>

        <div className={styles.actions}>
          {project.link && (
            <Button 
              appearance="primary" 
              icon={<LinkRegular />}
              as="a"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </Button>
          )}
          {project.github && (
            <Button 
              appearance="secondary" 
              icon={<CodeRegular />}
              as="a"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          )}
        </div>
      </div>

      <Divider />

      {project.fullDescription && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📋</span>
            Overview
          </h2>
          <p className={styles.fullDescription}>{project.fullDescription}</p>
        </div>
      )}

      {project.impact && project.impact.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <CheckmarkCircleRegular className={styles.sectionIcon} />
            Business Impact
          </h2>
          <Card className={styles.listCard}>
            {project.impact.map((item, index) => (
              <div key={index} className={styles.listItem}>
                <CheckmarkCircleRegular className={styles.listIcon} />
                <Text className={styles.listText}>{item}</Text>
              </div>
            ))}
          </Card>
        </div>
      )}

      {project.metrics && project.metrics.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <ChartMultipleRegular className={styles.sectionIcon} />
            Key Metrics
          </h2>
          <div className={styles.metricsGrid}>
            {project.metrics.map((metric, index) => (
              <Card key={index} className={styles.metricCard}>
                <div className={styles.metricValue}>{metric}</div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <LightbulbRegular className={styles.sectionIcon} />
            Key Highlights
          </h2>
          <Card className={styles.listCard}>
            {project.highlights.map((item, index) => (
              <div key={index} className={styles.listItem}>
                <LightbulbRegular className={styles.listIcon} />
                <Text className={styles.listText}>{item}</Text>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}