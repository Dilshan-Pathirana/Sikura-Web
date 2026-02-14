"use client"
import React, { useMemo, useState } from 'react'
import OperationCard from './OperationCard'
import Input from './ui/Input'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

export default function OperationGrid({ ops }: { ops: any[] }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ops
    return ops.filter(o => (o.title || '').toLowerCase().includes(q) || (o.slug || '').toLowerCase().includes(q))
  }, [ops, query])

  return (
    <div className="space-y-8">
      <div className="max-w-md">
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search operations..."
          icon={<Search className="w-4 h-4" />}
          className="bg-navy-900 border-navy-700 text-white placeholder-navy-500 focus:border-brand-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((op, i) => (
            <motion.div
              key={op._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <OperationCard op={op} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-navy-400">
            No operations found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
}
