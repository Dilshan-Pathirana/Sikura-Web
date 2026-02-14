"use client"
import React, { useEffect } from 'react'
import { toast } from 'sonner'

export default function FormValidator({ formId, required = [] }: { formId: string; required?: string[] }) {
  useEffect(() => {
    const form = document.getElementById(formId) as HTMLFormElement | null
    if (!form) return
    const handler = (e: Event) => {
      const errors: string[] = []
      for (const name of required) {
        const el = form.elements.namedItem(name) as HTMLInputElement | null
        if (!el) continue
        if (!String(el.value || '').trim()) errors.push(name)
      }
      if (errors.length > 0) {
        e.preventDefault()
        toast.error('Please fill: ' + errors.join(', '))
        return false
      }
      return true
    }
    form.addEventListener('submit', handler)
    return () => form.removeEventListener('submit', handler)
  }, [formId, required])

  return null
}
