import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/context/auth-context'

interface UserData {
  _id: string
  firebaseUid: string
  firstname: string
  lastname: string
  email: string
  college: string
  createdAt: string
}

export function useUserData() {
  const { user } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      if (!user) {
        setUserData(null)
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/users/${user.uid}`)
        if (response.ok) {
          const data = await response.json()
          setUserData(data)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [user])

  return { userData, loading }
} 