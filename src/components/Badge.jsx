export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: "border-github-border text-github-muted",
    healthy: "border-github-green/30 text-github-green bg-github-green/10",
    warning: "border-github-orange/30 text-github-orange bg-github-orange/10",
    critical: "border-github-red/30 text-github-red bg-github-red/10",
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
