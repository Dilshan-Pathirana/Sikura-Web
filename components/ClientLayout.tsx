'use client'
import '../styles/globals.css'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, Menu, X, LogIn, Search, Github, Twitter, Linkedin } from 'lucide-react'
import Button from './ui/Button'
import { Toaster } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-navy-100 selection:bg-brand-500/30">
      <Toaster position="top-right" theme="dark" richColors />

      {/* Navigation */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy-950/80 backdrop-blur-md border-b border-navy-800/50' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-500/20 blur-lg rounded-full group-hover:bg-brand-500/40 transition-all" />
                  <div className="relative bg-gradient-to-br from-brand-600 to-brand-700 p-2 rounded-xl border border-brand-500/20 shadow-lg shadow-brand-500/20">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  Sikura<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-200">Web</span>
                </span>
              </Link>

              {!isAdmin && (
                <div className="hidden md:flex ml-12 space-x-1">
                  {[
                    { name: 'Home', path: '/' },
                    { name: 'Categories', path: '/categories' }
                  ].map(item => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${pathname === item.path
                        ? 'text-white bg-white/5'
                        : 'text-navy-300 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {!isAdmin ? (
                <>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-500 to-accent-cyan rounded-lg blur opacity-20 group-focus-within:opacity-50 transition duration-200" />
                    <div className="relative flex items-center">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400 group-focus-within:text-brand-400 transition-colors" />
                      <input
                        type="text"
                        placeholder="Search protocols..."
                        className="pl-10 pr-4 py-2 bg-navy-900/90 border border-navy-700/50 rounded-lg text-sm text-white placeholder-navy-500 focus:outline-none focus:ring-0 focus:border-navy-600 block w-64 transition-all"
                      />
                    </div>
                  </div>
                  <div className="h-6 w-px bg-navy-800" />
                  <Link href="/admin/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<LogIn className="h-4 w-4" />}
                      className="text-navy-300 hover:text-white"
                    >
                      Admin Access
                    </Button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-navy-400 font-medium px-3 py-1 rounded-full bg-navy-900 border border-navy-800">
                    Administrator Mode
                  </span>
                  <Button variant="secondary" size="sm">
                    Logout
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-navy-400 hover:text-white hover:bg-navy-800/50 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-navy-950/95 backdrop-blur-xl border-b border-navy-800 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <Link
                  href="/"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-white bg-navy-900/50 border border-navy-800/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/categories"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-navy-300 hover:text-white hover:bg-navy-900/50 hover:border-navy-800/50 border border-transparent transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <div className="h-px bg-navy-800 my-4" />
                <Link
                  href="/admin/login"
                  className="block px-4 py-3 rounded-lg text-base font-medium text-navy-300 hover:text-white hover:bg-navy-900/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="grow pt-24 relative z-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative bg-navy-950 border-t border-navy-900 pt-16 pb-8 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-900/20 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6 group">
                <div className="bg-gradient-to-br from-brand-600 to-brand-700 p-1.5 rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">
                  Sikura<span className="text-brand-400">Web</span>
                </span>
              </Link>
              <p className="text-navy-400 max-w-sm mb-6 leading-relaxed">
                Advanced security operations platform for authorized personnel.
                Secure protocol management, video operational guides, and
                classified documentation access.
              </p>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="p-2 rounded-lg bg-navy-900 border border-navy-800 text-navy-400 hover:text-white hover:border-brand-500/50 hover:bg-navy-800 transition-all">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h3>
              <ul className="space-y-3">
                {['Operations', 'Categories', 'Live Feed', 'Archives'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-navy-400 hover:text-brand-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                {['Privacy Protocol', 'Terms of Service', 'Security Clearance', 'Cookie Policy'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-navy-400 hover:text-brand-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-navy-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-navy-500">
              © 2024 Sikura Security Systems. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-medium text-emerald-500">System Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}