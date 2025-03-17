import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/:path*', // Mengunci semua halaman
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Jika path dimulai dengan /api/cloud/library/, lakukan pengecekan status
  if (url.pathname.startsWith('/api/cloud/library/')) {
    const res = await fetch(url.href);

    // Jika status bukan 200, maka perlu login
    if (res.status !== 200) {
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

      // Jika status bukan 200 dan tidak ada autentikasi, redirect ke halaman login
      url.pathname = '/api/auth';
      return NextResponse.rewrite(url);
    }

    // Jika status 200, lanjutkan ke request berikutnya
    return NextResponse.next();
  }

  // Lakukan autentikasi untuk path lainnya jika diperlukan
  const basicAuth = req.headers.get('authorization');
  const ADMIN_USER = process.env.ADMIN_USER || 'admin'; // Default jika tidak di-set
  const ADMIN_PASS = process.env.ADMIN_PASS || 'admin'; // Default jika tidak di-set

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === ADMIN_USER && pwd === ADMIN_PASS) {
      return NextResponse.next();
    }
  }

  url.pathname = '/api/auth'; // Redirect ke halaman login jika belum login
  return NextResponse.rewrite(url);
}
