import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { BrandMark, Button, WSC_BRAND } from '@wsc/ui';
import { loginAction } from '@/lib/actions';
import { isAuthenticated } from '@/lib/session';
import styles from './login.module.css';

export const metadata: Metadata = {
  title: 'Вход',
};

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect('/apps');
  }

  return (
    <main className={styles.stage}>
      <div className={styles.orbA} aria-hidden />
      <div className={styles.orbB} aria-hidden />

      <section className={`${styles.hero} wsc-rise`}>
        <BrandMark size="hero" />
        <p className={styles.tagline}>
          Безопасный доступ к внутренним веб-приложениям — один вход, изоляция
          браузера, без раскрытия URL.
        </p>

        <form action={loginAction} className={`${styles.form} wsc-rise-delay`}>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              name="email"
              type="email"
              defaultValue="demo@wsc.local"
              autoComplete="username"
              required
            />
          </label>
          <label className={styles.label}>
            Пароль
            <input
              className={styles.input}
              name="password"
              type="password"
              defaultValue="demo"
              autoComplete="current-password"
              required
            />
          </label>
          <Button type="submit" variant="ink" style={{ width: '100%', marginTop: '0.35rem' }}>
            Войти в {WSC_BRAND}
          </Button>
          <p className={styles.hint}>M1 demo: любой пароль открывает портал.</p>
        </form>
      </section>
    </main>
  );
}
