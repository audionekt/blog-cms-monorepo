'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './navigation.css';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          ALEXDEV
        </Link>

        <div className={styles.navLinks}>
          <Link 
            href="/" 
            className={pathname === '/' ? styles.navLinkActive : styles.navLink}
          >
            About
          </Link>
          <Link 
            href="/articles" 
            className={pathname.startsWith('/articles') || pathname.startsWith('/posts') ? styles.navLinkActive : styles.navLink}
          >
            Journal
          </Link>
          <button className={styles.ctaButton}>
            Let's Talk
          </button>
        </div>
      </div>
    </nav>
  );
}

