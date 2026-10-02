import type { Metadata } from 'next';
import { DEMO_USER } from '@/lib/demo';
import styles from '../apps/apps.module.css';

export const metadata: Metadata = {
  title: 'Профиль',
};

export default function ProfilePage() {
  return (
    <main className={`${styles.main} wsc-rise`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Профиль</h1>
        <p className={styles.lead}>
          {DEMO_USER.name} · {DEMO_USER.email} · роль end_user (stub auth M1)
        </p>
      </header>
    </main>
  );
}
