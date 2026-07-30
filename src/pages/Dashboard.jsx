import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'

const STATUS_COPY = {
  pending: { label: 'Queued to sync…', tone: 'text-github-muted' },
  syncing: { label: 'Syncing…', tone: 'text-github-blue' },
  completed: { label: 'Synced', tone: 'text-github-green' },
  failed: { label: 'Failed', tone: 'text-github-red' },
}

function statusFor(installation) {
  return STATUS_COPY[installation.syncStatus] || STATUS_COPY.pending
}

export default function Dashboard({ installations: initialInstallations }) {
  const [installations, setInstallations] = useState(initialInstallations ?? null)
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState(null)
  const [refreshToken, setRefreshToken] = useState(0)

  useEffect(() => {
    apiFetch('/github/installations')
      .then(setInstallations)
      .catch((err) => setError(err.message))
  }, [refreshToken])

  useEffect(() => {
    const isSyncing = installations?.some((i) => i.syncStatus === 'pending' || i.syncStatus === 'syncing')
    if (!isSyncing) return undefined

    const interval = setInterval(() => setRefreshToken((token) => token + 1), 4000)
    return () => clearInterval(interval)
  }, [installations])

  useEffect(() => {
    apiFetch('/repos')
      .then(setRepos)
      .catch((err) => setError(err.message))
  }, [])

  // Mock KPIs for visual representation
  const kpis = [
    { name: 'Total Repositories', value: repos ? repos.length : '-', change: '+2', changeType: 'positive' },
    { name: 'Active Deployments', value: '12', change: '+3', changeType: 'positive' },
    { name: 'Risk Alerts', value: '2', change: '-1', changeType: 'negative' },
    { name: 'Healthy Deployments', value: '98%', change: '+1%', changeType: 'positive' },
  ]

  // Add mock extra fields to repos if missing
  const displayRepos = repos?.map((repo, i) => ({
    ...repo,
    status: i === 0 ? 'Building' : 'Success',
    risk: i === 1 ? 'High' : 'Low',
    lastDeploy: '10m ago',
    prediction: i === 1 ? '78% Failure Risk' : '99% Success Confidence'
  })) || []

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Overview</h1>
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

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.name} className="p-4 flex flex-col justify-between">
              <p className="text-sm font-medium text-github-muted">{kpi.name}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-2xl font-semibold text-white">{kpi.value}</p>
                <p className={`text-sm font-medium ${kpi.changeType === 'positive' ? 'text-github-green' : 'text-github-red'}`}>
                  {kpi.change}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Repository Table */}
            <Card>
              <div className="border-b border-github-border px-4 py-3">
                <h2 className="text-sm font-semibold text-white">Recent Repositories</h2>
              </div>
              
              {!repos ? (
                <div className="p-4 flex flex-col gap-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : repos.length === 0 ? (
                <div className="p-8 text-center">
                  <svg className="mx-auto h-12 w-12 text-github-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="mt-2 text-sm font-semibold text-white">No repositories connected</h3>
                  <p className="mt-1 text-sm text-github-muted">Get started by connecting a repository.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-github-border text-sm">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-github-muted">Repository</th>
                        <th className="px-4 py-3 text-left font-medium text-github-muted">Branch</th>
                        <th className="px-4 py-3 text-left font-medium text-github-muted">Status</th>
                        <th className="px-4 py-3 text-left font-medium text-github-muted">Risk</th>
                        <th className="px-4 py-3 text-left font-medium text-github-muted hidden sm:table-cell">Last Deploy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-github-border">
                      {displayRepos.map((repo) => (
                        <tr key={repo.fullName} className="hover:bg-github-hover transition-colors group cursor-pointer" onClick={() => window.location.href = `/repos/${repo.fullName}`}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="text-github-blue font-semibold group-hover:underline">{repo.fullName}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="flex items-center gap-1 text-github-muted">
                              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor"><path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.492 2.492 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM3.5 3.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z"></path></svg>
                              {repo.defaultBranch}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge variant={repo.status === 'Success' ? 'healthy' : 'default'}>{repo.status}</Badge>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <Badge variant={repo.risk === 'Low' ? 'healthy' : 'critical'}>{repo.risk}</Badge>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell text-github-muted">
                            {repo.lastDeploy}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>

            {/* AI Summary Panel */}
            <Card className="border border-github-border">
               <div className="border-b border-github-border px-4 py-3 flex gap-2 items-center bg-github-hover rounded-t-md">
                 <svg className="w-4 h-4 text-github-blue" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                 </svg>
                 <h2 className="text-sm font-semibold text-white">Vanguard AI Summary</h2>
               </div>
               <div className="p-4 text-sm text-github-text space-y-4">
                 <p><strong>Deployment Summary:</strong> Across 3 active repositories, 12 deployments were processed in the last 24 hours. The overall system health is stable with a 98% success rate.</p>
                 <p><strong>Risk Explanation:</strong> One high-risk alert was flagged in <code>vanguard-ai/deployment-engine</code> due to a 45% increase in bundle size and untested changes in the core auth module.</p>
                 <p><strong>Recommendations:</strong></p>
                 <ul className="list-disc pl-5 space-y-1 text-github-muted">
                   <li>Review PR #102 in deployment-engine before merging to production.</li>
                   <li>Increase unit test coverage on <code>AuthContext.js</code>.</li>
                 </ul>
               </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            {/* Recent Activity Timeline */}
            <Card className="h-full">
              <div className="border-b border-github-border px-4 py-3">
                <h2 className="text-sm font-semibold text-white">Activity</h2>
              </div>
              <div className="p-4">
                <div className="relative border-l border-github-border ml-2 space-y-6">
                  {/* Timeline Item */}
                  <div className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full border-2 border-github-secondary bg-github-green"></span>
                    <p className="text-xs text-github-muted mb-0.5">10 minutes ago</p>
                    <p className="text-sm text-white">Deployment successful</p>
                    <p className="text-xs text-github-muted">vanguard-frontend (main)</p>
                  </div>
                  {/* Timeline Item */}
                  <div className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full border-2 border-github-secondary bg-github-blue"></span>
                    <p className="text-xs text-github-muted mb-0.5">2 hours ago</p>
                    <p className="text-sm text-white">Repository connected</p>
                    <p className="text-xs text-github-muted">deployment-engine</p>
                  </div>
                  {/* Timeline Item */}
                  <div className="relative pl-6">
                    <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full border-2 border-github-secondary bg-github-red"></span>
                    <p className="text-xs text-github-muted mb-0.5">5 hours ago</p>
                    <p className="text-sm text-white">Build failed</p>
                    <p className="text-xs text-github-muted">infrastructure (main)</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
