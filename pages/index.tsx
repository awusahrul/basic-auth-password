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
    <div style={styles.container}>
      <h1 style={styles.heading}>Login Berhasil</h1>
      <p style={styles.text}>Selamat datang! Anda telah berhasil login.</p>
      <button style={styles.button} onClick={handleLogout}>Logout</button>
    </div>
  )
}

// CSS inline agar lebih simpel
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '10px',
  },
  text: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}
