import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <span>PRODUCT</span>
          <span>CATALOG</span>
        </NavLink>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            HOME
          </NavLink>

          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            PHONES
          </NavLink>

          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            TABLETS
          </NavLink>

          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            ACCESSORIES
          </NavLink>
        </nav>

        <div className={styles.actions}>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.iconLink} ${styles.activeIcon}`
                : styles.iconLink
            }
            aria-label="Favorites"
          >
            ♡
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.iconLink} ${styles.activeIcon}`
                : styles.iconLink
            }
            aria-label="Cart"
          >
            🛒
          </NavLink>
        </div>
      </div>
    </header>
  );
};
