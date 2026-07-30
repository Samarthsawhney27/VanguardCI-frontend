export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    primary: "bg-github-blue text-white hover:bg-[#1f6feb] px-4 py-2",
    secondary: "bg-github-secondary text-github-text border border-github-border hover:bg-github-hover px-4 py-2 shadow-sm",
    danger: "text-github-redHover bg-github-secondary border border-github-border hover:border-github-redHover hover:bg-github-redHover/10 px-4 py-2",
    icon: "text-github-muted hover:text-github-text p-2 hover:bg-github-hover rounded-md",
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
