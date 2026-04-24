"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import toast from "react-hot-toast"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

import { UpdateProfile } from "./action"

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  current_password: z.string().optional(),
  new_password: z.string().min(6).optional(),
  new_password_confirmation: z.string().optional(),
}).refine(
  (data) =>
    !data.new_password ||
    data.new_password === data.new_password_confirmation,
  {
    message: "Passwords do not match",
    path: ["new_password_confirmation"],
  }
);
type FormValues = {
  name?: string
  email?: string
  current_password?: string
  new_password?: string
  new_password_confirmation?: string
}

export default function SettingPage() {
  const [loading, setLoading] = useState(false)

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true)

      const data = new FormData()

      if (values.name) data.append("name", values.name)
      if (values.email) data.append("email", values.email)
      if (values.current_password) data.append("current_password", values.current_password)
      if (values.new_password) data.append("new_password", values.new_password)
      if (values.new_password_confirmation)
        data.append("new_password_confirmation", values.new_password_confirmation)

      await UpdateProfile(data)

      toast.success("Profile updated successfully")

      form.reset({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      })
    } catch (error: any) {
      toast.error(error?.message || "Update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow p-6 space-y-6">

        <h2 className="text-xl font-bold">Account Settings</h2>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input placeholder="Enter your name" {...form.register("name")} />
            <FieldError>{form.formState.errors.name?.message}</FieldError>
          </Field>

          {/* Email */}
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="Enter your email" {...form.register("email")} />
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </Field>

          <div className="border-t pt-4">
            {/* <h3 className="font-semibold text-lg mb-2">Change Password</h3> */}

            {/* Current Password */}
            <Field>
              <FieldLabel>Current Password</FieldLabel>
              <Input
                type="password"
                {...form.register("current_password")}
              />
            </Field>

            {/* New Password */}
            <Field>
              <FieldLabel>New Password</FieldLabel>
              <Input
                type="password"
                {...form.register("new_password")}
              />
            </Field>

            {/* Confirm Password */}
            <Field>
              <FieldLabel>Confirm Password</FieldLabel>
              <Input
                type="password"
                {...form.register("new_password_confirmation")}
              />
            </Field>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading && <Spinner />}
              Save Changes
            </Button>
          </div>

        </form>
      </div>
    </div>
    
  )
}