'use client'
import React, { useState } from 'react'
import { toast } from 'sonner'
import Button from '../../../../components/ui/Button'
import { Save, Lock, User } from 'lucide-react'

export default function AdminProfilePage() {
    const [formData, setFormData] = useState({
        username: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/admin/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username || undefined,
                    password: formData.newPassword || undefined
                })
            })

            if (!res.ok) throw new Error('Failed to update profile')

            toast.success('Profile updated successfully')
            setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }))
        } catch (error) {
            toast.error('Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-navy-400 mb-8">Update your administrative credentials.</p>

            <div className="bg-navy-900 border border-navy-800 rounded-xl p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-navy-300">New Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                            <input
                                type="text"
                                placeholder="Leave blank to keep current"
                                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-navy-500 focus:outline-none focus:border-brand-500 transition-colors"
                                value={formData.username}
                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-navy-300">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                            <input
                                type="password"
                                placeholder="Leave blank to keep current"
                                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-navy-500 focus:outline-none focus:border-brand-500 transition-colors"
                                value={formData.newPassword}
                                onChange={e => setFormData({ ...formData, newPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-navy-300">Confirm New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400" />
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                className="w-full bg-navy-950 border border-navy-800 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-navy-500 focus:outline-none focus:border-brand-500 transition-colors"
                                value={formData.confirmPassword}
                                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={loading}
                            icon={loading ? undefined : <Save className="w-4 h-4" />}
                            className="w-full sm:w-auto"
                        >
                            {loading ? 'Saving Changes...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
