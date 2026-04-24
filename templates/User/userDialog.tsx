"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"

import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog"

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { createUser } from "./action"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().optional(),
})

interface Props {
  open: boolean
  onClose: () => void
}

export default function CreateUserDialog({ open, onClose }: Props) {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
    },
  })

  useEffect(() => {
    if (open) {
      form.reset({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
      })
    }
  }, [open])

  const onSubmit = async (values: any) => {
    setLoading(true)

    const formData = new FormData()
    Object.entries(values).forEach(([k, v]) => {
      formData.append(k, String(v))
    })

    try {
      await createUser(formData)

      toast.success("User created successfully ")

      onClose() // 🔥 close dialog after success

    } catch (error: any) {
      toast.error(error.message || "Create failed ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-6">

        <DialogTitle className="text-xl font-bold mb-4">
          Create User
        </DialogTitle>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* NAME */}
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* EMAIL */}
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="john@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* PHONE */}
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="09-123-456-789" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* PASSWORD */}
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* ADDRESS */}
            <FormField control={form.control} name="address" render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Yangon..." />
                </FormControl>
              </FormItem>
            )} />

            {/* BUTTONS */}
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>

          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}