import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  Text,
  Badge,
  Button,
} from '@fluentui/react-components';
import { LinkRegular, CodeRegular, ArrowRightRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const useStyles = makeStyles({
  container: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...shorthands.padding('40px', '20px'),
  },
  title: {
    fontSize: '42px',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '16px',
    color: tokens.colorBrandForeground1,
  },
  subtitle: {
    fontSize: '18px',
    textAlign: 'center',
    marginBottom: '48px',
    color: tokens.colorNeutralForeground2,
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    ...shorthands.gap('32px'),
  },
  projectCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: tokens.shadow28,
    },
  },
  projectImage: {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
  },
  projectContent: {
    ...shorthands.padding('24px'),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('16px'),
    flexGrow: 1,
  },
  projectTitle: {
    fontSize: '22px',
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    lineHeight: '1.3',
  },
  projectDescription: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: tokens.colorNeutralForeground2,
    flexGrow: 1,
  },
  techBadges: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('8px'),
  },
  projectActions: {
    display: 'flex',
    ...shorthands.gap('12px'),
    marginTop: 'auto',
  },
});

const Projects = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Projects</h1>
      <Text className={styles.subtitle}>
        Explore my portfolio of impactful projects spanning data platforms, AI systems, and enterprise-scale applications.
      </Text>
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <Card key={project.id} className={styles.projectCard}>
            <img 
              src={project.image} 
              alt={project.title}
              className={styles.projectImage}
            />
            <div className={styles.projectContent}>
              <Text className={styles.projectTitle}>{project.title}</Text>
              <Text className={styles.projectDescription}>{project.description}</Text>
              <div className={styles.techBadges}>
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge key={tech} appearance="filled" color="brand">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge appearance="outline" color="informative">
                    +{project.technologies.length - 4} more
                  </Badge>
                )}
              </div>
              <div className={styles.projectActions}>
                <Button 
                  appearance="primary" 
                  size="small"
                  as={Link}
                  to={`/projects/${project.id}`}
                  icon={<ArrowRightRegular />}
                  iconPosition="after"
                >
                  Learn More
                </Button>
                {project.github && (
                  <Button 
                    appearance="secondary" 
                    size="small"
                    as="a" 
                    href={project.github}
                    target="_blank"
                    icon={<CodeRegular />}
                  >
                    GitHub
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;