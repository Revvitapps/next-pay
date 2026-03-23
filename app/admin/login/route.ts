import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, validateAdminToken } from '@/lib/admin/auth';

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = String(formData.get('token') || '');

  if (!validateAdminToken(token)) {
    redirect('/admin');
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, token.trim(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: 60 * 60 * 8
  });

  redirect('/admin');
}
