'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function SignUpPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: displayName,
                },
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else if (data.session === null) {
            setSuccess("Account created! Please check your email inbox to verify your account before signing in.")
            setLoading(false)
        } else {
            router.push('/')
            router.refresh()
        }
    }

    const handleGoogleSignUp = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.04) 0%, transparent 60%)`,
                }}
            />

            <div
                className="relative w-full max-w-sm animate-in fade-in slide-in-from-bottom-2 duration-300"
                style={{ animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center text-background font-bold text-lg mb-4 shadow-sm">
                        C
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-foreground">
                        Creative Suite
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Create your workspace account
                    </p>
                </div>

                {/* Card */}
                <div className="bg-card border border-border rounded-2xl shadow-sm p-6 space-y-5">
                    {/* Google OAuth */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-10 font-medium transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-px hover:shadow-sm active:scale-[0.99] active:transition-none"
                        onClick={handleGoogleSignUp}
                        disabled={loading}
                    >
                        <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign up with Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-card px-3 text-xs text-muted-foreground">or create an account</span>
                        </div>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="displayName" className="text-sm font-medium">Display Name</Label>
                            <Input
                                id="displayName"
                                type="text"
                                placeholder="Jane Doe"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                                disabled={loading}
                                className="h-10 transition-shadow duration-150 focus:shadow-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="h-10 transition-shadow duration-150 focus:shadow-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                minLength={6}
                                className="h-10 transition-shadow duration-150 focus:shadow-sm"
                            />
                            <p className="text-xs text-muted-foreground">
                                Must be at least 6 characters
                            </p>
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-top-1 duration-200">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-3 text-sm text-emerald-800 bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-400 rounded-lg border border-emerald-500/20 animate-in fade-in slide-in-from-top-1 duration-200">
                                {success}
                            </div>
                        )}

                        <Button type="submit" className="w-full h-10 font-medium transition-[transform,box-shadow,opacity] duration-150 ease-out hover:-translate-y-px hover:shadow-sm active:scale-[0.99] active:transition-none" disabled={loading}>
                            {loading && !success ? 'Creating account...' : 'Create Account'}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{' '}
                    <Link href="/auth/sign-in" className="text-foreground font-medium hover:underline underline-offset-4 transition-colors duration-150">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
