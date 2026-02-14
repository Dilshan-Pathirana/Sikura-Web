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
        <form ref={formRef} id="create-operation-form" action={handleSubmit} className="space-y-3">
            <div>
                <Input name="title" placeholder="Title" />
            </div>
            <div>
                <Input name="slug" placeholder="Slug" />
            </div>
            <div>
                <select
                    name="categoryId"
                    className="w-full p-2 border border-navy-700 bg-navy-900 text-white rounded focus:border-brand-500 focus:outline-none"
                >
                    <option value="">Select category</option>
                    {categories.map(c => (
                        <option key={c._id} value={c._id.toString()}>{c.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <Input name="videoUrl" placeholder="Video URL" />
            </div>
            <div>
                <Input name="thumbnail" placeholder="Thumbnail URL" />
            </div>
            <div>
                <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full p-2 border border-navy-700 bg-navy-900 text-white rounded focus:border-brand-500 focus:outline-none"
                />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Add Operation</Button>
            </div>
            <FormValidator formId="create-operation-form" required={["title", "slug", "categoryId", "videoUrl"]} />
        </form>
    )
}
