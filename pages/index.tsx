import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'Authorization=; Max-Age=0; path=/;' // Hapus cookie auth
    router.replace('/api/auth') // Redirect ke halaman login
  }

  return (
    <Page>
      <Text variant="h2" className="mb-6">
        Login Berhasil
      </Text>
      <Text className="mb-4">Selamat datang! Anda telah berhasil login.</Text>
      <Button onClick={handleLogout}>Logout</Button>
    </Page>
  )
}

Index.Layout = Layout

