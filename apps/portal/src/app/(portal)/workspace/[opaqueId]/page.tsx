import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findAppByOpaqueId } from '@/lib/demo';
import styles from './workspace.module.css';

type Props = {
  params: Promise<{ opaqueId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { opaqueId } = await params;
  const app = findAppByOpaqueId(opaqueId);
  return { title: app ? app.name : 'Workspace' };
}

export default async function WorkspacePage({ params }: Props) {
  const { opaqueId } = await params;
  const app = findAppByOpaqueId(opaqueId);
  if (!app) notFound();

  return (
    <main className={`${styles.main} wsc-rise`}>
      <header className={styles.bar}>
        <Link href="/apps" className={styles.back}>
          ← Назад к каталогу
        </Link>
        <div className={styles.meta}>
          <h1 className={styles.title}>{app.name}</h1>
          <p className={styles.path}>/workspace/{opaqueId}</p>
        </div>
      </header>

      <section className={styles.viewer} aria-label="Изолированный workspace">
        <div className={styles.placeholder}>
          <p className={styles.kicker}>Browser Isolation · stub</p>
          <p className={styles.copy}>
            Здесь будет стрим удалённого Chromium. Целевой URL скрыт (URL masking).
            Трафик пойдёт через WAF — без обхода.
          </p>
          <div className={styles.frame} aria-hidden>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
            <div className={styles.stream}>
              <span className={styles.streamLabel}>Remote session ready</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
