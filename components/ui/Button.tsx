import React from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: React.ReactNode
}

export default function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-navy-950 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg overflow-hidden group'

  const variants = {
    primary:
      'bg-brand-600 hover:bg-brand-500 text-white focus:ring-brand-500 shadow-lg shadow-brand-600/20 hover:shadow-brand-500/40 border border-transparent',
    glow:
      'bg-brand-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:bg-brand-500 border border-brand-400/20',
    secondary:
      'bg-navy-800 hover:bg-navy-700 text-white border border-navy-700 hover:border-navy-600 focus:ring-navy-600',
    ghost:
      'bg-transparent hover:bg-navy-800/50 text-navy-300 hover:text-white',
    danger:
      'bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-900/50 hover:border-red-500/50 focus:ring-red-900',
    outline:
      'border border-navy-700 bg-transparent hover:bg-navy-900 text-navy-300 hover:text-white focus:ring-navy-600',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shine effect for primary buttons */}
      {(variant === 'primary' || variant === 'glow') && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
        {!isLoading && icon && <span className="shrink-0">{icon}</span>}
        {children}
      </span>
    </button>
  )
}
