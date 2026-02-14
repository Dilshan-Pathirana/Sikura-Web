'use client'
import React, { useRef } from 'react'
import { toast } from 'sonner'
import Input from './ui/Input'
import Button from './ui/Button'
import FormValidator from './FormValidator'

interface Category {
    _id: string
    name: string
}

export default function AddOperationForm({
    categories,
    action
}: {
    categories: Category[];
    action: (formData: FormData) => Promise<void>
}) {
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = async (formData: FormData) => {
        try {
            await action(formData)
            toast.success('Operation added successfully')
            formRef.current?.reset()
        } catch (error) {
            toast.error('Failed to add operation: ' + (error instanceof Error ? error.message : String(error)))
        }
    }

    return (
        <form ref={formRef} id="create-operation-form" action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">Operation Title</label>
                    <Input name="title" placeholder="e.g., Pocket Sewing" className="bg-navy-950/50 border-white/10 focus:border-primary" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">URL Slug</label>
                    <Input name="slug" placeholder="e.g., pocket-sewing" className="bg-navy-950/50 border-white/10 focus:border-primary font-mono" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">Machine Type</label>
                    <select
                        name="categoryId"
                        className="w-full p-2.5 border border-white/10 bg-navy-950/50 text-white rounded-xl focus:border-primary focus:outline-none transition-all duration-200"
                    >
                        <option value="">Select category</option>
                        {categories.map(c => (
                            <option key={c._id} value={c._id.toString()}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">YouTube / Drive URL</label>
                    <Input name="videoUrl" placeholder="https://..." className="bg-navy-950/50 border-white/10 focus:border-primary" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">Thumbnail Preview URL (Optional)</label>
                    <Input name="thumbnail" placeholder="https://..." className="bg-navy-950/50 border-white/10 focus:border-primary" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-navy-400 uppercase tracking-widest pl-1">Operational Briefing</label>
                    <textarea
                        name="description"
                        placeholder="Detailed instructions..."
                        className="w-full p-2.5 border border-white/10 bg-navy-950/50 text-white rounded-xl focus:border-primary focus:outline-none min-h-[100px] transition-all duration-200"
                    />
                </div>
            </div>
            <div className="md:col-span-2 flex justify-end pt-4 border-t border-white/5">
                <Button type="submit" className="px-10 h-12 text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20">Create Protocol</Button>
            </div>
            <FormValidator formId="create-operation-form" required={["title", "slug", "categoryId", "videoUrl"]} />
        </form>
    )
}
