import type { Metadata } from 'next';
import styles from '../apps/apps.module.css';

export const metadata: Metadata = {
  title: 'Активные сессии',
};

export default function SessionsPage() {
  return (
    <main className={`${styles.main} wsc-rise`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Активные сессии</h1>
        <p className={styles.lead}>
          Сейчас нет активных app-сессий. После открытия приложения здесь появятся
          stub-сессии (полный idle — в следующих фазах).
        </p>
      </header>
    </main>
  );
}
