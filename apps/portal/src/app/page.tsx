import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/session';

export default async function HomePage() {
  if (await isAuthenticated()) {
    redirect('/apps');
  }
  redirect('/login');
}
