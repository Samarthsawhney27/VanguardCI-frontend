import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiFetch } from '../lib/api'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import Input from '../components/Input'

export default function Home({ connected = false }) {
  const { user, signOut } = useAuth()
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState(null)

  const handleConnectGithub = async () => {
    setConnecting(true)
    setError(null)
    try {
      const { install_url } = await apiFetch('/auth/github/connect')
      window.location.href = install_url
    } catch (err) {
      setError(err.message)
      setConnecting(false)
    }
  }

  // Mock data to satisfy the UI requirement for repository cards
  const mockRepos = [
    { name: 'vanguard-frontend', owner: 'vanguard-ai', private: false, lang: 'JavaScript', langColor: 'bg-yellow-400', updated: '2 hours ago', branch: 'main' },
    { name: 'deployment-engine', owner: 'vanguard-ai', private: true, lang: 'Python', langColor: 'bg-blue-500', updated: '5 hours ago', branch: 'develop' },
    { name: 'infrastructure', owner: 'vanguard-ai', private: true, lang: 'HCL', langColor: 'bg-purple-500', updated: '1 day ago', branch: 'main' },
  ]

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-github-border pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-white">GitHub Integration</h1>
            <p className="text-sm text-github-muted mt-1">Connect your repositories to Vanguard for AI deployment analysis.</p>
          </div>
          <Button variant="secondary" onClick={signOut}>Sign out</Button>
        </div>

        {error && (
          <div className="rounded-md border border-github-red/30 bg-github-red/10 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-github-red">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="h-12 w-12 rounded-full border border-github-border" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-github-bg border border-github-border"></div>
              )}
              <div>
                <h3 className="font-medium text-white">{user?.displayName || 'Connected Account'}</h3>
                <p className="text-sm text-github-muted">{user?.email}</p>
              </div>
            </div>
            <Button onClick={handleConnectGithub} disabled={connecting || connected}>
              <svg className="h-4 w-4 mr-2 fill-current" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              {connected ? 'GitHub connected' : connecting ? 'Redirecting…' : 'Connect GitHub'}
            </Button>
          </div>
        </Card>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">Repositories</h2>
            <div className="w-72">
              <Input placeholder="Find a repository..." />
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            {mockRepos.map((repo) => (
              <Card key={repo.name} className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <a href="#" className="text-github-blue text-lg font-semibold hover:underline">
                      {repo.owner}/{repo.name}
                    </a>
                    <Badge variant="default">{repo.private ? 'Private' : 'Public'}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-github-muted">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${repo.langColor}`}></span> {repo.lang}
                    </span>
                    <span>Updated {repo.updated}</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.492 2.492 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM3.5 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z"></path>
                      </svg>
                      {repo.branch}
                    </span>
                  </div>
                </div>
                <Button variant="secondary" className="h-8 py-1">Connect</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
