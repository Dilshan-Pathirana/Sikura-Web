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

      <Card className="w-full max-w-md relative z-10 border-white/5 bg-navy-900/60 backdrop-blur-2xl shadow-2xl p-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 mb-8 border border-primary/20 shadow-inner">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight uppercase">Authorized Site Access</h1>
          <p className="text-navy-400 font-bold text-xs uppercase tracking-widest">
            Skill Matrix Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">
                Admin Username
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-navy-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-navy-600 focus:outline-none focus:border-primary transition-all duration-300"
                  placeholder="admin_id"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">
                Security Passcode
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-navy-950 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-navy-600 focus:outline-none focus:border-primary transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-4 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/20"
            isLoading={isLoading}
            icon={!isLoading && <ArrowRight className="w-4 h-4" />}
          >
            {isLoading ? 'Verifying...' : 'Authenticate Access'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[10px] text-navy-500 font-bold uppercase tracking-widest leading-loose">
            Unauthorized access is strictly prohibited.
            <br />
            Asset ID: MAS-SITE-SKM-01
          </p>
        </div>
      </Card>
    </div>
  )
}
