import styles from './Footer.module.scss';

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>PRODUCT CATALOG</div>

        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className={styles.github}
        >
          GitHub
        </a>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleBackToTop}
        >
          Back to top
          <span>↑</span>
        </button>
      </div>
    </footer>
  );
};
