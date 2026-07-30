export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-github-secondary border border-github-border rounded-md ${className}`} {...props}>
      {children}
    </div>
  )
}
