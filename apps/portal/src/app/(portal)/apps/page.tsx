import type { Metadata } from 'next';
import Link from 'next/link';
import { STUB_APPS } from '@/lib/demo';
import styles from './apps.module.css';

export const metadata: Metadata = {
  title: 'Приложения',
};

export default function AppsCatalogPage() {
  return (
    <main className={`${styles.main} wsc-rise`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Приложения</h1>
        <p className={styles.lead}>
          Откройте приложение в защищённом workspace внутри портала — без нового
          окна браузера.
        </p>
      </header>

      <ul className={styles.list}>
        {STUB_APPS.map((app, index) => (
          <li
            key={app.id}
            className={styles.item}
            style={{ animationDelay: `${80 + index * 70}ms` }}
          >
            <div className={styles.itemBody}>
              <h2 className={styles.itemTitle}>{app.name}</h2>
              <p className={styles.itemDesc}>{app.description}</p>
            </div>
            <Link className={styles.open} href={`/workspace/${app.opaqueId}`}>
              Открыть
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
