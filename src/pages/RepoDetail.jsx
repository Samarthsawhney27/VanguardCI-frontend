import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

const PR_STATE_STYLE = {
  open: 'bg-green-100 text-green-700',
  closed: 'bg-red-100 text-red-700',
  merged: 'bg-purple-100 text-purple-700',
}

export default function RepoDetail({ repoFullName }) {
  const [stats, setStats] = useState(null)
  const [pullRequests, setPullRequests] = useState(null)
  const [branches, setBranches] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiFetch(`/repos/${repoFullName}/stats`).then(setStats).catch((err) => setError(err.message))
    apiFetch(`/repos/${repoFullName}/pull_requests`)
      .then(setPullRequests)
      .catch((err) => setError(err.message))
    apiFetch(`/repos/${repoFullName}/branches`).then(setBranches).catch((err) => setError(err.message))
  }, [repoFullName])

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 bg-gray-50 px-4 py-10">
      <div>
        <a href="/dashboard" className="text-sm text-blue-600 hover:underline">
          ← Back to dashboard
        </a>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{repoFullName}</h1>
        <a
          href={`https://github.com/${repoFullName}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-gray-500 hover:underline"
        >
          View on GitHub ↗
        </a>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-gray-900">
          Contributors {stats && <span className="font-normal text-gray-400">({stats.totalCommits} commits total)</span>}
        </h2>
        {!stats && !error && <p className="mt-2 text-sm text-gray-400">Loading…</p>}
        {stats && stats.contributors.length === 0 && (
          <p className="mt-2 text-sm text-gray-500">No commits recorded yet.</p>
        )}
        {stats && stats.contributors.length > 0 && (
          <ul className="mt-2 divide-y divide-gray-100">
            {stats.contributors.map((contributor) => (
              <li key={contributor.author} className="flex items-center justify-between py-2 text-sm">
                <span className="text-gray-700">{contributor.author}</span>
                <span className="text-gray-500">
                  {contributor.totalCommits} total · {contributor.commitsLast7Days} in last 7 days
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-gray-900">Pull Requests</h2>
        {!pullRequests && !error && <p className="mt-2 text-sm text-gray-400">Loading…</p>}
        {pullRequests && pullRequests.length === 0 && (
          <p className="mt-2 text-sm text-gray-500">No pull requests recorded yet.</p>
        )}
        {pullRequests && pullRequests.length > 0 && (
          <ul className="mt-2 divide-y divide-gray-100">
            {pullRequests.map((pr) => (
              <li key={pr.prNumber} className="flex items-center justify-between gap-3 py-2 text-sm">
                <div className="min-w-0">
                  <a
                    href={pr.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate text-gray-700 hover:underline"
                  >
                    #{pr.prNumber} {pr.title}
                  </a>
                  <p className="text-xs text-gray-400">by {pr.author}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    PR_STATE_STYLE[pr.state] || 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {pr.state}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-gray-900">Branches</h2>
        {!branches && !error && <p className="mt-2 text-sm text-gray-400">Loading…</p>}
        {branches && branches.length === 0 && <p className="mt-2 text-sm text-gray-500">No branches found.</p>}
        {branches && branches.length > 0 && (
          <ul className="mt-2 divide-y divide-gray-100">
            {branches.map((branch) => (
              <li key={branch.name} className="py-2 text-sm">
                <a href={branch.htmlUrl} target="_blank" rel="noreferrer" className="text-gray-700 hover:underline">
                  {branch.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
