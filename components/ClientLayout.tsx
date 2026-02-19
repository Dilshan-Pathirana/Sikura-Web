'use client'
import '../styles/globals.css'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Menu, X, LogIn, Search, Github, Twitter, Linkedin, Shield } from 'lucide-react'
import Button from './ui/Button'
import { Toaster } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categorySuggestions, setCategorySuggestions] = useState<Array<{ _id: string; name: string }>>([])
  const pathname = usePathname()
  const router = useRouter()
  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isAdmin) return
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategorySuggestions(data.map((cat) => ({ _id: String(cat._id), name: String(cat.name || '') })))
        }
      })
      .catch(() => setCategorySuggestions([]))
  }, [isAdmin])

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) {
      router.push('/categories')
      return
    }
    router.push(`/categories?q=${encodeURIComponent(q)}`)
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-navy-100 selection:bg-primary/30">
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
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg shadow-primary/20">
                  <Image src="/logo.jpg" alt="MAS Kreeda Logo" width={44} height={44} className="h-11 w-11 object-cover" priority />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white leading-none tracking-tight">
                    MAS <span className="text-primary">KREEDA</span>
                  </span>
                  <span className="text-[10px] font-bold text-navy-500 uppercase tracking-[0.2em] mt-1">Skill Matrix Portal</span>
                </div>
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
                  <form onSubmit={handleGlobalSearch} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent-green rounded-lg blur opacity-10 group-focus-within:opacity-30 transition duration-200" />
                    <div className="relative flex items-center">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-500 group-focus-within:text-primary transition-colors" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search categories or operations..."
                        list="category-search-suggestions"
                        className="pl-10 pr-4 py-2 bg-navy-900/90 border border-white/5 rounded-lg text-sm text-white placeholder-navy-500 focus:outline-none focus:border-primary/50 block w-72 transition-all"
                      />
                      <datalist id="category-search-suggestions">
                        {categorySuggestions.map((cat) => (
                          <option key={cat._id} value={cat.name} />
                        ))}
                      </datalist>
                    </div>
                  </form>
                  <div className="h-6 w-px bg-navy-800" />
                  <Link href="/admin/login">
                    <Button
                      variant="glow"
                      size="md"
                      icon={<Shield className="h-4 w-4" />}
                      className="px-7 py-2.5 text-white font-black uppercase tracking-wide"
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
                  className="block px-4 py-3 rounded-lg text-base font-black uppercase tracking-wide text-white bg-primary/20 border border-primary/40 hover:bg-primary/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Access
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
      <footer className="relative bg-navy-950 border-t border-white/5 pt-16 pb-8 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-green/5 rounded-full blur-[100px] translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <Image src="/logo.jpg" alt="MAS Kreeda Logo" width={36} height={36} className="h-9 w-9 object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black text-white leading-none tracking-tight">
                    MAS <span className="text-primary">KREEDA</span>
                  </span>
                  <span className="text-[10px] font-bold text-navy-500 uppercase tracking-widest mt-0.5">Skill Matrix Portal</span>
                </div>
              </Link>
              <p className="text-navy-400 max-w-sm mb-6 leading-relaxed font-medium">
                The official training resource portal for MAS Kreeda apparel manufacturing sites.
                Standardizing operational excellence through structured video learning.
              </p>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="p-2.5 rounded-xl bg-navy-900 border border-white/5 text-navy-400 hover:text-white hover:border-primary/50 hover:bg-navy-800 transition-all shadow-lg">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">Platform</h3>
              <ul className="space-y-4">
                {['Operations', 'Machine Types', 'Skill Matrix', 'Archives'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-navy-500 hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">Support</h3>
              <ul className="space-y-4">
                {['Privacy Policy', 'Safety Protocols', 'User Guide', 'Technical Support'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-navy-500 hover:text-primary transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-bold text-navy-600 uppercase tracking-widest">
              © 2024 MAS Kreeda Apparel Manufacturing.
            </p>
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20">
              <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-black text-accent-green uppercase tracking-widest">Portal Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}