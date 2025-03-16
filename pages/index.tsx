import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()

  // Cek apakah pengguna sudah login dengan membaca cookie Authorization
  const isLoggedIn = typeof window !== 'undefined' && document.cookie.includes('Authorization=')

  const handleLogout = () => {
    document.cookie = 'Authorization=; Max-Age=0; path=/;' // Hapus cookie auth
    router.replace('/api/auth') // Redirect ke halaman login
  }

  // Jika belum login, langsung redirect ke halaman login
  if (!isLoggedIn) {
    if (typeof window !== 'undefined') {
      router.replace('/api/auth')
    }
    return null // Jangan tampilkan apapun sebelum redirect
  }

  return (
    <>
      <h1>Login Berhasil</h1>
      <p>Selamat datang! Anda telah berhasil login.</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
