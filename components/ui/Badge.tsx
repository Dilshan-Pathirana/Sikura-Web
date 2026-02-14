import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'neutral'
  className?: string
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]',
    success: 'bg-accent-green/10 text-accent-green border-accent-green/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]',
    neutral: 'bg-white/5 text-navy-400 border-white/10',
  }

  return (
    <span
      className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm
      ${variants[variant]}
      ${className}
    `}
    >
      {children}
    </span>
  )
}