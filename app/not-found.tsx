'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Home, Search, Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden py-20">
      {/* Abstract Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "circOut" }}
        >
          <Card className="bg-navy-900/60 backdrop-blur-xl border-red-500/20 text-center">
            <div className="flex flex-col items-center">
              {/* Alert Badge */}
              <Badge className="mb-8 border-red-500/30 bg-red-500/10 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.3)] backdrop-blur-md px-4 py-2 text-sm">
                <AlertTriangle className="w-4 h-4 mr-2 inline-block" />
                ACCESS DENIED - ERROR 404
              </Badge>

              {/* 404 Display */}
              <div className="mb-8 relative">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-primary to-primary-hover animate-gradient-x tracking-tighter"
                >
                  404
                </motion.div>

                {/* Glowing shield icon overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <Shield className="w-32 h-32 text-red-500/20" strokeWidth={1} />
                </motion.div>
              </div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-8"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Page Not Found
                </h1>
                <p className="text-lg text-navy-300 mb-2 max-w-2xl">
                  The requested resource could not be located in our secure database.
                </p>
                <p className="text-sm text-navy-400 font-mono border-l-2 border-red-500/30 pl-4 inline-block">
                  This may be a restricted area or the content has been moved.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <Link href="/">
                  <Button
                    size="lg"
                    variant="glow"
                    icon={<Home className="w-5 h-5" />}
                    className="w-full sm:w-auto"
                  >
                    Return to Home
                  </Button>
                </Link>

                <Link href="/#categories">
                  <Button
                    size="lg"
                    variant="secondary"
                    icon={<Search className="w-5 h-5" />}
                    className="w-full sm:w-auto"
                  >
                    Browse Categories
                  </Button>
                </Link>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-12 pt-8 border-t border-white/5 w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20 mb-3">
                      <Home className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1">Homepage</h3>
                    <p className="text-[10px] text-navy-500 font-bold uppercase">Latest Skills</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20 mb-3">
                      <Search className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1">Directory</h3>
                    <p className="text-[10px] text-navy-500 font-bold uppercase">Machine Types</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="p-3 bg-accent-green/10 rounded-xl text-accent-green border border-accent-green/20 mb-3">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h3 className="text-xs font-black text-white uppercase tracking-widest mb-1">Admin Access</h3>
                    <p className="text-[10px] text-navy-500 font-bold uppercase">Restricted Area</p>
                  </div>
                </div>
              </motion.div>

              {/* Error Code */}
              <div className="mt-8 text-xs text-navy-500 font-mono">
                ERROR_CODE: HTTP_404_NOT_FOUND | TIMESTAMP: {new Date().toISOString()}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
