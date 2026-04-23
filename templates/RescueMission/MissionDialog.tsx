"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import {
    Dialog, DialogContent, DialogTitle
} from "@/components/ui/dialog"

import {
    Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from "@/components/ui/form"

import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { CreateMission, UpdateMission } from "./action"

const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(["emergency", "medicine", "facilities"]),
    target_amount: z.coerce.number().min(1),
    status: z.enum(["active", "completed"]),
    image: z.any().optional(),
})

interface Props {
    open: boolean
    onClose: () => void
    rescueMission: any | null
}

export default function MissionDialog({ open, onClose, rescueMission }: Props) {
    const [loading, setLoading] = useState(false)
    const isEdit = !!rescueMission

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "emergency",
            target_amount: 1000,
            status: "active",
        },
    })

    // ✅ FIXED SYNC
    useEffect(() => {
        if (open) {
            form.reset(rescueMission ? {
                title: rescueMission.title,
                description: rescueMission.description,
                category: rescueMission.category,
                target_amount: rescueMission.target_amount,
                status: rescueMission.status,
            } : {
                title: "",
                description: "",
                category: "emergency",
                target_amount: 1000,
                status: "active",
            })
        }
    }, [rescueMission, open])

    const onSubmit = async (values: any) => {
        setLoading(true)

        const formData = new FormData()
        Object.entries(values).forEach(([k, v]) => {
            if (k === "image" && v instanceof File) {
                formData.append("image_url", v) // 👈 match backend field
            } else {
                formData.append(k, String(v))
            }
        })

        try {
            if (isEdit && rescueMission?.id) {
                await UpdateMission(rescueMission.id, formData)
                toast.success("Updated successfully")
            } else {
                await CreateMission(formData)
                toast.success("Created successfully")
            }
            onClose()
        } catch (err) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md rounded-2xl p-6">

                <DialogTitle className="text-xl font-bold mb-4">
                    {isEdit ? "Edit Mission" : "Create Mission"}
                </DialogTitle>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md rounded-2xl p-6 max-h-[70vh] overflow-y-auto">

                        {/* TITLE */}
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Winter Nesting Boxes" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* CATEGORY */}
                        <FormField control={form.control} name="category" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="emergency">Emergency</SelectItem>
                                        <SelectItem value="medicine">Medicine</SelectItem>
                                        <SelectItem value="facilities">Facilities</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />

                        {/* TARGET */}
                        <FormField control={form.control} name="target_amount" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Amount ($)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...form.register("target_amount", { valueAsNumber: true })}
                                    />
                                </FormControl>
                            </FormItem>
                        )} />

                        {/* STATUS */}
                        <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <div className="h-10 flex items-center px-3 rounded-md border bg-gray-100 text-sm font-medium text-gray-600">
                                    {rescueMission?.status || "active"}
                                </div>
                            </FormItem>
                        )} />

                        {/* DESCRIPTION */}
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Describe mission..." />
                                </FormControl>
                            </FormItem>
                        )} />

                        {/* IMAGE PREVIEW (EDIT MODE ONLY) */}
                        {rescueMission?.image_url && (
                            <div className="space-y-2">
                                <FormLabel>Current Image</FormLabel>
                                <img
                                    src={rescueMission.image_url}
                                    className="w-full h-32 object-cover rounded-lg border"
                                />
                            </div>
                        )}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => field.onChange(e.target.files?.[0])}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* BUTTONS */}
                        <div className="flex gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={onClose} >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={loading} >
                                {loading ? "Saving..." : isEdit ? "Update" : "Create"}
                            </Button>
                        </div>

                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}