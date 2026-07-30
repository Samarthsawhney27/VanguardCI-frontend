import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'

export default function Login() {
  const { signInWithGoogle, error } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // This is mock UI, it doesn't do anything because useAuth only supports signInWithGoogle
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-github-bg px-4 py-12">
      <div className="w-full max-w-sm text-center">
        <div className="mb-6 flex flex-col items-center justify-center gap-2">
          <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <h1 className="text-2xl font-light tracking-tight text-white">Welcome to Vanguard</h1>
          <p className="text-sm text-github-muted">AI-powered Deployment Intelligence</p>
        </div>

        <Card className="p-6 text-left shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <div>
                <label className="mb-1 block text-sm font-medium text-github-text">Name</label>
                <Input type="text" placeholder="Jane Doe" />
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm font-medium text-github-text">Email address</label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-github-text">Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            {isSignUp && (
              <div>
                <label className="mb-1 block text-sm font-medium text-github-text">Confirm Password</label>
                <Input type="password" placeholder="••••••••" />
              </div>
            )}

            <Button type="submit" variant="primary" className="mt-2 w-full">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-github-border"></div>
            <span className="px-2 text-xs text-github-muted">or</span>
            <div className="flex-1 border-t border-github-border"></div>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={signInWithGoogle}
            className="flex w-full items-center justify-center gap-2"
          >
            <svg className="h-4 w-4 fill-current text-github-text" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Continue with GitHub
          </Button>

          {error && <p className="mt-4 text-sm text-github-red">{error}</p>}
        </Card>

        <p className="mt-6 text-sm text-github-muted">
          {isSignUp ? 'Already have an account?' : 'New to Vanguard?'}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-1 text-github-blue hover:underline focus:outline-none"
          >
            {isSignUp ? 'Sign in' : 'Create an account'}
          </button>
        </p>
      </div>
    </div>
  )
}
