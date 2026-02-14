"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'
import Button from '../../../../components/ui/Button'
import Input from '../../../../components/ui/Input'
import Card from '../../../../components/ui/Card'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (!res.ok) {
        setIsLoading(false)
        return
      }
      router.push('/admin')
    } catch (err) {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-linear-to-b from-navy-900/50 to-navy-950" />

      <Card className="w-full max-w-md relative z-10 border-navy-800 bg-navy-900/90 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/10 mb-6 border border-brand-500/20">
            <Shield className="w-8 h-8 text-brand-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-navy-300 text-sm">
            Enter your credentials to access the command center.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-navy-200">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-navy-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                  placeholder="admin"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-navy-200">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-navy-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-base"
            isLoading={isLoading}
            icon={!isLoading && <ArrowRight className="w-4 h-4" />}
          >
            {isLoading ? 'Authenticating...' : 'Access Dashboard'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-navy-800 text-center">
          <p className="text-xs text-navy-500">
            Unauthorized access is strictly prohibited and monitored.
            <br />
            System ID: SIKURA-SEC-01
          </p>
        </div>
      </Card>
    </div>
  )
}
