import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'Authorization=; Max-Age=0; path=/;' // Hapus cookie auth
    router.replace('/') // Redirect ke halaman login
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h2>Login Berhasil</h2>
      <p>Selamat datang! Anda telah berhasil login.</p>
      <button onClick={handleLogout} style={{ marginTop: '10px', padding: '10px 20px' }}>
        Logout
      </button>
    </div>
  )
}
