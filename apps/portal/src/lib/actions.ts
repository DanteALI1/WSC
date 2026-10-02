'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE } from './demo';

export async function loginAction(_formData: FormData) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, '1', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  redirect('/apps');
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect('/login');
}
