import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-6 text-sm text-muted flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white font-semibold">S</div>
          <span className="text-text">Sikura</span>
        </div>
        <div>© {year} Sikura. All rights reserved.</div>
      </div>
    </footer>
  )
}

