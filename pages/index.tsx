import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Index() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Cek apakah user sudah login dengan melihat Authorization di cookie
    const authCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('Authorization='))

    if (authCookie) {
      setIsLoggedIn(true)
    } else {
      router.replace('/api/auth') // Redirect ke halaman login jika tidak ada auth
    }
  }, [router])

  const handleLogout = () => {
    document.cookie = 'Authorization=; Max-Age=0; path=/;' // Hapus cookie auth
    router.replace('/api/auth') // Redirect ke halaman login
  }

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <>
          <h1 style={styles.heading}>Login Berhasil</h1>
          <p style={styles.text}>Selamat datang! Anda telah berhasil login.</p>
          <button style={styles.button} onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p style={styles.text}>Memeriksa sesi login...</p>
      )}
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
