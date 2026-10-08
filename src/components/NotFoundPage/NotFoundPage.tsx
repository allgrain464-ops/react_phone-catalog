import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <main className={styles.page}>
      <h1>Page not found</h1>

      <Link to="/" className={styles.link}>
        Go to homepage
      </Link>
    </main>
  );
};
