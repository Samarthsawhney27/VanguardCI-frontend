export default function Navbar({ user }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-github-border bg-github-secondary px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between items-center">
        <div className="flex items-center gap-2">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="font-semibold text-white text-lg">Vanguard</span>
        </div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="hidden sm:block relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-4 w-4 text-github-muted" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input type="text" placeholder="Type / to search" className="block w-full rounded-md border border-github-border bg-github-bg py-1.5 pl-10 pr-3 text-sm text-github-text placeholder:text-github-muted focus:border-github-blue focus:outline-none focus:ring-1 focus:ring-github-blue sm:w-64" />
          </div>
          <button type="button" className="-m-2.5 p-2.5 text-github-muted hover:text-white">
            <span className="sr-only">View notifications</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
          {user && (
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <span className="text-sm text-github-text font-medium">{user.displayName || user.email}</span>
              {user.photoURL ? (
                <img className="h-8 w-8 rounded-full bg-github-bg border border-github-border" src={user.photoURL} alt="" />
              ) : (
                <div className="h-8 w-8 rounded-full bg-github-border"></div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
