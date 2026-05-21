import {
  makeStyles,
  shorthands,
  tokens,
  Text,
  Link as FluentLink,
  Divider,
} from '@fluentui/react-components';
import {
  MailRegular,
  PhoneRegular,
  LocationRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  footer: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.padding('48px', '20px', '32px'),
    marginTop: '60px',
  },
  footerContent: {
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('28px'),
  },
  contactSection: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    ...shorthands.gap('32px'),
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
      ...shorthands.gap('16px'),
    },
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('8px'),
    color: tokens.colorNeutralForeground1,
    fontSize: '16px',
    transition: 'color 0.2s',
    '&:hover': {
      color: tokens.colorBrandForeground1,
    },
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    ...shorthands.gap('24px'),
  },
  socialLink: {
    fontSize: '16px',
    fontWeight: 500,
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      color: tokens.colorBrandForeground1,
    },
  },
  copyright: {
    textAlign: 'center',
    color: tokens.colorNeutralForeground3,
    fontSize: '14px',
  },
  name: {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 600,
    color: tokens.colorBrandForeground1,
    marginBottom: '8px',
  },
});

const Footer = () => {
  const styles = useStyles();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Text className={styles.name}>L. Jenil Christo</Text>
        
        <div className={styles.contactSection}>
          <div className={styles.contactItem}>
            <PhoneRegular fontSize={20} />
            <span>+91-8870196771</span>
          </div>
          <div className={styles.contactItem}>
            <MailRegular fontSize={20} />
            <FluentLink href="mailto:jenilchristo@outlook.com">jenilchristo@outlook.com</FluentLink>
          </div>
          <div className={styles.contactItem}>
            <LocationRegular fontSize={20} />
            <span>Hyderabad, India</span>
          </div>
        </div>

        <div className={styles.socialLinks}>
          <FluentLink 
            href="https://www.linkedin.com/in/jenil-christo-746458126/" 
            target="_blank"
            className={styles.socialLink}
          >
            LinkedIn
          </FluentLink>
          <FluentLink 
            href="https://github.com/jenilchristo" 
            target="_blank"
            className={styles.socialLink}
          >
            GitHub
          </FluentLink>
          <FluentLink 
            href="https://www.jenilchristo.com" 
            target="_blank"
            className={styles.socialLink}
          >
            Portfolio
          </FluentLink>
        </div>

        <Divider />

        <Text className={styles.copyright}>
          © {new Date().getFullYear()} L. Jenil Christo. All rights reserved.
        </Text>
      </div>
    </footer>
  );
};

export default Footer;