export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`flex h-9 w-full rounded-md border border-github-border bg-github-bg px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-github-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-github-blue disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}
