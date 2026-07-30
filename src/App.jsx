import { useAuth } from './context/AuthContext'
import { useInstallations } from './hooks/useInstallations'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import RepoDetail from './pages/RepoDetail'

const REPOS_PREFIX = '/repos/'

function App() {
  const { user, loading } = useAuth()
  const { installations, connected, loading: installationsLoading } = useInstallations()

  if (loading || (user && installationsLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  const { pathname } = window.location

  if (pathname.startsWith(REPOS_PREFIX)) {
    const repoFullName = decodeURIComponent(pathname.slice(REPOS_PREFIX.length)).replace(/\/$/, '')
    return <RepoDetail repoFullName={repoFullName} />
  }

  // Dashboard is the default landing page once GitHub is connected -
  // only show Home (with the Connect GitHub button) before that.
  if (pathname === '/dashboard' || connected) {
    return <Dashboard installations={installations} />
  }

  return <Home connected={connected} />
}

export default App
