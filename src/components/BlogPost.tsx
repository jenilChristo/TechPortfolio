import {
  makeStyles,
  shorthands,
  tokens,
  Text,
  Badge,
} from '@fluentui/react-components';
import { CalendarRegular, TagRegular } from '@fluentui/react-icons';
import { useParams } from 'react-router-dom';
import { blogs } from '../data/blogs';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';

const useStyles = makeStyles({
  article: {
    maxWidth: '900px',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...shorthands.padding('40px', '20px'),
  },
  header: {
    marginBottom: '32px',
  },
  postMeta: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    marginBottom: '16px',
    fontSize: '14px',
    color: tokens.colorNeutralForeground3,
  },
  postTitle: {
    fontSize: '42px',
    fontWeight: 700,
    marginBottom: '16px',
    color: tokens.colorNeutralForeground1,
    lineHeight: '1.2',
  },
  tagBadges: {
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('8px'),
  },
  content: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: tokens.colorNeutralForeground1,
    '& h2': {
      fontSize: '32px',
      fontWeight: 600,
      marginTop: '32px',
      marginBottom: '16px',
      color: tokens.colorNeutralForeground1,
    },
    '& h3': {
      fontSize: '24px',
      fontWeight: 600,
      marginTop: '24px',
      marginBottom: '12px',
      color: tokens.colorNeutralForeground1,
    },
    '& p': {
      marginBottom: '16px',
    },
    '& ul, & ol': {
      marginBottom: '16px',
      paddingLeft: '24px',
    },
    '& li': {
      marginBottom: '8px',
    },
    '& code': {
      backgroundColor: tokens.colorNeutralBackground3,
      ...shorthands.padding('2px', '6px'),
      ...shorthands.borderRadius(tokens.borderRadiusSmall),
      fontSize: '16px',
      fontFamily: 'monospace',
    },
    '& pre': {
      backgroundColor: tokens.colorNeutralBackground3,
      ...shorthands.padding('16px'),
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      ...shorthands.overflow('auto'),
      marginBottom: '16px',
    },
  },
  notFound: {
    textAlign: 'center',
    ...shorthands.padding('60px', '20px'),
    fontSize: '24px',
    color: tokens.colorNeutralForeground3,
  },
});

const BlogPost = () => {
  const styles = useStyles();
  const { id } = useParams();
  const post = blogs.find(p => p.id === id);

  if (!post) {
    return <div className={styles.notFound}>Post not found</div>;
  }

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.postMeta}>
          <CalendarRegular fontSize={16} />
          <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
        </div>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <div className={styles.tagBadges}>
          {post.tags.map((tag) => (
            <Badge key={tag} appearance="filled" color="brand" icon={<TagRegular />}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;