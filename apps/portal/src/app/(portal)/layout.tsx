import { redirect } from 'next/navigation';
import { BrandMark } from '@wsc/ui';
import { logoutAction } from '@/lib/actions';
import { DEMO_USER } from '@/lib/demo';
import { isAuthenticated } from '@/lib/session';
import { PortalNav } from './portal-nav';
import styles from './portal.module.css';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) {
    redirect('/login');
  }

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} wsc-fade`}>
        <div className={styles.brandRow}>
          <BrandMark size="sm" />
          <span className={styles.contour}>Portal</span>
        </div>

        <PortalNav />

        <div className={styles.footer}>
          <div className={styles.user}>
            <span className={styles.userName}>{DEMO_USER.name}</span>
            <span className={styles.userEmail}>{DEMO_USER.email}</span>
          </div>
          <form action={logoutAction}>
            <button type="submit" className={styles.logout}>
              Выйти
            </button>
          </form>
        </div>
      </aside>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
