'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './portal.module.css';

const NAV = [
  { href: '/apps', label: 'Приложения' },
  { href: '/sessions', label: 'Активные сессии' },
  { href: '/profile', label: 'Профиль' },
] as const;

export function PortalNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Портал">
      {NAV.map((item) => {
        const active =
          pathname === item.href ||
          (item.href === '/apps' && pathname.startsWith('/workspace'));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
