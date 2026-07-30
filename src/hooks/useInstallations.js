import { useEffect, useState, useCallback } from 'react'
import { apiFetch } from '../lib/api'
import { useAuth } from '../context/AuthContext'

export function useInstallations() {
  const { user } = useAuth()
  const [installations, setInstallations] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshToken, setRefreshToken] = useState(0)

  useEffect(() => {
    if (!user) return undefined

    let cancelled = false
    apiFetch('/github/installations')
      .then((data) => {
        if (cancelled) return
        setInstallations(data)
        setError(null)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [user, refreshToken])

  const refetch = useCallback(() => setRefreshToken((token) => token + 1), [])

  const connected = Boolean(installations?.length)

  return { installations, connected, loading: user ? loading : false, error, refetch }
}
