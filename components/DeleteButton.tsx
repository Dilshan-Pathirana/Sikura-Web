"use client"
import React from 'react'
import { toast } from 'sonner'

import Button from './ui/Button'

export default function DeleteButton({ url, onSuccess, reloadOnSuccess }: { url: string; onSuccess?: () => void; reloadOnSuccess?: boolean }) {
  const [loading, setLoading] = React.useState(false)

  const handle = async () => {
    if (!confirm('Are you sure you want to delete this operation?')) return
    setLoading(true)
    try {
      const res = await fetch(url, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      toast.success('Deleted successfully')
      if (onSuccess) onSuccess()
      if (reloadOnSuccess) location.reload()
    } catch (e) {
      toast.error(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handle}
      variant="danger"
      size="sm"
      isLoading={loading}
    >
      Delete
    </Button>
  )
}
