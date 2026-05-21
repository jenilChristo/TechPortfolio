import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  Text,
  Badge,
} from '@fluentui/react-components';
import { CalendarRegular, TagRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { format } from 'date-fns';

const useStyles = makeStyles({
  container: {
    maxWidth: '900px',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...shorthands.padding('40px', '20px'),
  },
  title: {
    fontSize: '42px',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '48px',
    color: tokens.colorBrandForeground1,
  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('24px'),
  },
  blogCard: {
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'translateX(4px)',
      boxShadow: tokens.shadow16,
    },
  },
  cardContent: {
    ...shorthands.padding('24px'),
  },
  postMeta: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    marginBottom: '12px',
    fontSize: '14px',
    color: tokens.colorNeutralForeground3,
  },
  postTitle: {
    fontSize: '26px',
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    marginBottom: '12px',
  },
  postExcerpt: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: tokens.colorNeutralForeground2,
    marginBottom: '16px',
  },
  tagBadges: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('8px'),
  },
});

const Blog = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Technical Blog</h1>
      <div className={styles.postsContainer}>
        {blogs.map((post) => (
          <Card 
            key={post.id}
            className={styles.blogCard}
            as={Link}
            to={`/blog/${post.id}`}
          >
            <div className={styles.cardContent}>
              <div className={styles.postMeta}>
                <CalendarRegular fontSize={16} />
                <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <Text className={styles.postExcerpt}>{post.excerpt}</Text>
              <div className={styles.tagBadges}>
                {post.tags.map((tag) => (
                  <Badge key={tag} appearance="outline" color="informative" icon={<TagRegular />}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;