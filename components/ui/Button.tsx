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
      'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 border border-primary/10',
    glow:
      'bg-primary text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:bg-primary-hover border border-white/20',
    secondary:
      'bg-navy-800 hover:bg-navy-700 text-white border border-white/5 focus:ring-navy-600',
    ghost:
      'bg-transparent hover:bg-white/5 text-navy-400 hover:text-white',
    danger:
      'bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 focus:ring-red-500',
    outline:
      'border border-white/10 bg-transparent hover:bg-white/5 text-navy-300 hover:text-white focus:ring-white/10',
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
