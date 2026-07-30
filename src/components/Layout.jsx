import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useAuth } from '../context/AuthContext'

export default function Layout({ children }) {
  const { user } = useAuth()
  const { pathname } = window.location

  return (
    <div className="min-h-screen bg-github-bg text-github-text font-sans flex flex-col">
      <Navbar user={user} />
      <div className="flex-1 flex">
        <Sidebar currentPath={pathname} />
        <main className="flex-1 lg:pl-64 flex flex-col">
          <div className="px-4 py-8 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
