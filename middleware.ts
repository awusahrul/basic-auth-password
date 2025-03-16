import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/'], // Semua halaman harus login
}

export default function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    // Ubah username dan password menjadi 'admin'
    if (user === 'admin' && pwd === 'admin') {
      return NextResponse.next()
    }
  }

  url.pathname = '/api/auth' // Redirect ke halaman login jika tidak terautentikasi
  return NextResponse.rewrite(url)
}
