import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export default function Input({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name || Math.random().toString(36).substr(2, 9)

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-navy-300"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-500 group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          className={`
            block w-full rounded-xl border bg-navy-950/50 px-4 py-3 text-white placeholder-navy-600
            transition-all duration-300
            focus:outline-none focus:border-primary/50 focus:bg-navy-950
            disabled:bg-navy-900/20 disabled:text-navy-600
            ${icon ? 'pl-11' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-navy-700 hover:border-navy-600'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500 animate-slide-up">{error}</p>
      )}
    </div>
  )
}
