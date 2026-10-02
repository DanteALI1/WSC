import { cookies } from 'next/headers';
import { SESSION_COOKIE } from './demo';

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value === '1';
}
