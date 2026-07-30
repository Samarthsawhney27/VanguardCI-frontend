import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'
import Layout from '../components/Layout'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'

export default function RepoDetail({ repoFullName }) {
  const [stats, setStats] = useState(null)
  const [pullRequests, setPullRequests] = useState(null)
  const [branches, setBranches] = useState(null)
  const [error, setError] = useState(null)
  const [expandedRow, setExpandedRow] = useState(null)
  const [expandedDocs, setExpandedDocs] = useState({})

  const toggleDoc = (id) => {
    setExpandedDocs(prev => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    apiFetch(`/repos/${repoFullName}/stats`).then(setStats).catch((err) => setError(err.message))
    apiFetch(`/repos/${repoFullName}/pull_requests`)
      .then(setPullRequests)
      .catch((err) => setError(err.message))
    apiFetch(`/repos/${repoFullName}/branches`).then(setBranches).catch((err) => setError(err.message))
  }, [repoFullName])

  // Mock data for UI
  const mockHistory = [
    { id: 1, commit: 'a1b2c3d', message: 'Update AuthContext logic', date: '2 hours ago', author: 'jane-doe', status: 'Success', risk: 'Low' },
    { id: 2, commit: 'f4g5h6j', message: 'Bump dependencies', date: '5 hours ago', author: 'dependabot', status: 'Failed', risk: 'High' },
    { id: 3, commit: 'k7l8m9n', message: 'Fix layout overflow', date: '1 day ago', author: 'john-smith', status: 'Success', risk: 'Low' },
  ]

  const mockShap = [
    { feature: 'Bundle Size Increase', impact: 45, type: 'negative' },
    { feature: 'Test Coverage', impact: 20, type: 'positive' },
    { feature: 'Modified Core Files', impact: 35, type: 'negative' },
  ]

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        {/* Repository Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-github-border pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xl font-semibold text-white">
              <svg className="w-5 h-5 text-github-muted" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
              </svg>
              <span className="text-github-blue hover:underline cursor-pointer">{repoFullName}</span>
              <Badge variant="default" className="ml-2">Public</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-github-muted mt-1">
               <span>Default branch: <span className="font-medium text-github-text">main</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Refresh
            </Button>
            <Button variant="primary">Analyze Now</Button>
          </div>
        </div>

        {error && <p className="text-sm text-github-red">{error}</p>}

        {/* Deployment Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-github-muted">Total Deployments</p>
            <p className="text-2xl font-semibold text-white mt-1">142</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-github-muted">Success Rate</p>
            <p className="text-2xl font-semibold text-github-green mt-1">94%</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-github-muted">Avg Risk Score</p>
            <p className="text-2xl font-semibold text-github-orange mt-1">Medium</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-github-muted">Contributors</p>
            <p className="text-2xl font-semibold text-white mt-1">{stats ? stats.contributors.length : '-'}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Deployment History */}
            <Card>
              <div className="border-b border-github-border px-4 py-3 bg-github-secondary rounded-t-md">
                <h2 className="text-sm font-semibold text-white">Deployment History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-github-border text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-github-muted">Commit</th>
                      <th className="px-4 py-3 text-left font-medium text-github-muted">Message</th>
                      <th className="px-4 py-3 text-left font-medium text-github-muted">Status</th>
                      <th className="px-4 py-3 text-left font-medium text-github-muted">Risk</th>
                      <th className="px-4 py-3 text-left font-medium text-github-muted">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-github-border">
                    {mockHistory.map((row) => (
                      <tr key={row.id} className="hover:bg-github-hover transition-colors cursor-pointer group" onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>
                        <td className="px-4 py-3 whitespace-nowrap font-mono text-github-blue group-hover:underline">{row.commit}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-white truncate max-w-xs">{row.message}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant={row.status === 'Success' ? 'healthy' : 'critical'}>{row.status}</Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant={row.risk === 'Low' ? 'healthy' : 'critical'}>{row.risk}</Badge>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-github-muted">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* AI Analysis Panel */}
            <Card>
              <div className="border-b border-github-border px-4 py-3 bg-github-hover flex items-center gap-2 rounded-t-md">
                <svg className="w-5 h-5 text-github-blue" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <h2 className="text-sm font-semibold text-white">Vanguard Analysis for f4g5h6j</h2>
              </div>
              <div className="p-4 text-sm text-github-text">
                <p className="mb-4">
                  This deployment introduces several high-risk changes that have historically caused regressions in similar repositories.
                  The <strong>bundle size</strong> increased unexpectedly, and core modules were modified without accompanying unit tests.
                </p>
                <div className="bg-[#0d1117] border border-github-border rounded-md p-4 mb-4 font-mono text-xs overflow-x-auto">
                  <span className="text-[#ff7b72]">diff</span> <span className="text-[#a5d6ff]">--git</span> a/src/core/AuthContext.js b/src/core/AuthContext.js<br/>
                  <span className="text-[#d2a8ff]">@@ -12,4 +12,6 @@</span><br/>
                  <span className="text-[#ff7b72]">- const API_URL = 'https://api.vanguard.com';</span><br/>
                  <span className="text-[#7ee787]">+ const API_URL = process.env.VITE_API_URL;</span><br/>
                  <span className="text-[#7ee787]">+ // Unhandled fallback could crash app</span>
                </div>
                <h3 className="font-semibold text-white mb-2">Recommendations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-github-orange mt-0.5" viewBox="0 0 16 16" fill="currentColor"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575ZM8 5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 5Zm1 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
                    <span>Verify that <code className="bg-[#1f242c] px-1 py-0.5 rounded border border-github-border">VITE_API_URL</code> is defined in the production environment variables.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-github-green mt-0.5" viewBox="0 0 16 16" fill="currentColor"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>
                    <span>Add fallback error handling for undefined API URLs.</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Knowledge Sources */}
            <Card>
              <div className="border-b border-github-border px-4 py-3 bg-github-secondary rounded-t-md">
                <h2 className="text-sm font-semibold text-white">Knowledge Sources</h2>
              </div>
              <div className="divide-y divide-github-border">
                {['Production Incident #442', 'Auth Module Documentation', 'PR #89: Environment variables setup'].map((doc, i) => (
                  <div key={i} className="flex flex-col">
                    <div 
                      className="px-4 py-3 hover:bg-github-hover cursor-pointer flex items-center gap-2"
                      onClick={() => toggleDoc(i)}
                    >
                      <svg className={`w-4 h-4 text-github-muted transition-transform ${expandedDocs[i] ? 'rotate-90' : ''}`} viewBox="0 0 16 16" fill="currentColor">
                        <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"></path>
                      </svg>
                      <svg className="w-4 h-4 text-github-muted" viewBox="0 0 16 16" fill="currentColor"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V5.5H9.25a.75.75 0 0 1-.75-.75V1.5Zm6.75 0v2.75h2.75l-2.75-2.75Z"></path></svg>
                      <span className="text-sm text-white">{doc}</span>
                    </div>
                    {expandedDocs[i] && (
                      <div className="px-10 py-3 text-xs text-github-muted bg-[#0d1117]">
                        This document was retrieved as context because it relates to previous issues with environment variables in the authentication context.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Risk Prediction Gauge */}
            <Card className="p-4 flex flex-col items-center">
              <h2 className="text-sm font-semibold text-white w-full text-left mb-4">Risk Prediction</h2>
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-github-secondary stroke-current" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-github-red stroke-current" strokeDasharray="78, 100" strokeWidth="3" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">78%</span>
                  <span className="text-xs font-medium text-github-red">High Risk</span>
                </div>
              </div>
            </Card>

            {/* SHAP Explanation */}
            <Card className="p-4">
              <h2 className="text-sm font-semibold text-white mb-4">Risk Factors (SHAP)</h2>
              <div className="flex flex-col gap-3">
                {mockShap.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-github-text">{item.feature}</span>
                      <span className={item.type === 'positive' ? 'text-github-green' : 'text-github-red'}>
                        {item.type === 'positive' ? '-' : '+'}{item.impact}%
                      </span>
                    </div>
                    <div className="w-full bg-github-bg h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.type === 'positive' ? 'bg-github-green' : 'bg-github-red'}`} 
                        style={{ width: `${item.impact}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
