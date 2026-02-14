"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
  noPadding?: boolean
}

export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
  noPadding = false,
}: CardProps) {
  const baseClasses = `
    relative bg-navy-900/40 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden transition-all duration-300
    ${noPadding ? '' : 'p-6'}
    ${hover || onClick ? 'hover:border-brand-500/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)] group' : ''}
    ${className}
  `

  if (hover || onClick) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={baseClasses}
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        {children}
      </motion.div>
    )
  }
  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  )
}
