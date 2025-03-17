import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/:path*', // Mengunci semua halaman
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Lewati autentikasi untuk path yang dimulai dengan /page/api/cloud/
  if (url.pathname.startsWith('/api/cloud/library/')) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  // Mengambil username dan password dari environment variables
  const ADMIN_USER = process.env.ADMIN_USER || 'admin'; // Default jika tidak di-set
  const ADMIN_PASS = process.env.ADMIN_PASS || 'admin'; // Default jika tidak di-set

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Membandingkan dengan environment variables
    if (user === ADMIN_USER && pwd === ADMIN_PASS) {
      return NextResponse.next();
    }
  }

  url.pathname = '/api/auth'; // Redirect ke halaman login jika belum login
  return NextResponse.rewrite(url);
}
