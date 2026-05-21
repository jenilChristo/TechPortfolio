import {
  makeStyles,
  shorthands,
  tokens,
  Text,
  Button,
} from '@fluentui/react-components';
import {
  HomeRegular,
  PersonRegular,
  BriefcaseRegular,
  BookRegular,
  MailRegular,
} from '@fluentui/react-icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  nav: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    position: 'sticky',
    top: '0',
    zIndex: 1000,
    backdropFilter: 'blur(10px)',
  },
  navContent: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding('16px', '20px'),
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      ...shorthands.gap('16px'),
    },
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('12px'),
    textDecoration: 'none',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  brandText: {
    fontSize: '24px',
    fontWeight: 700,
    color: tokens.colorBrandForeground1,
  },
  navLinks: {
    display: 'flex',
    ...shorthands.gap('8px'),
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  navLink: {
    textDecoration: 'none',
    color: tokens.colorNeutralForeground1,
    ...shorthands.padding('10px', '16px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('6px'),
    fontSize: '16px',
    fontWeight: 500,
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
      color: tokens.colorBrandForeground1,
      transform: 'translateY(-2px)',
    },
  },
});

const Navbar = () => {
  const styles = useStyles();

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <Link to="/" className={styles.brand}>
          <PersonRegular fontSize={32} color={tokens.colorBrandForeground1} />
          <Text className={styles.brandText}>L. Jenil Christo</Text>
        </Link>
        
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            <HomeRegular fontSize={20} />
            <span>Home</span>
          </Link>
          <Link to="/projects" className={styles.navLink}>
            <BriefcaseRegular fontSize={20} />
            <span>Projects</span>
          </Link>
          <Link to="/blog" className={styles.navLink}>
            <BookRegular fontSize={20} />
            <span>Blog</span>
          </Link>
          <Button appearance="primary" as="a" href="mailto:jenilchristo@outlook.com" icon={<MailRegular />}>
            Contact
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;