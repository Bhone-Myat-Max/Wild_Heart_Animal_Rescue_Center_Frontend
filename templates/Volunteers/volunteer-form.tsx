"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast, { Toaster } from 'react-hot-toast';

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useState } from "react"
import { Form } from "@/components/ui/form"
import { createVolunteer } from "./actions";
// Assuming you have a volunteer action now
// import { createVolunteer } from "./action"; 

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  skill: z.string().min(1, "Please specify your skill"),
  availability: z.string().min(1, "Availability is required"),
  status: z.string(),
  file: z.any().optional(),
});

export default function VolunteerForm() {
  const [preview, setPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "pending",
      availability: "Full-time",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    form.setValue("file", file)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = new FormData()
      data.append("name", values.name)
      data.append("phone", values.phone)
      data.append("skill", values.skill)
      data.append("availability", values.availability)
      data.append("status", values.status)

      if (values.file) {
        data.append("image", values.file)
      }

      await createVolunteer(data) // Call your volunteer action here
    //    console.log([...data.entries()])
      toast.success("Volunteer application submitted!");
      form.reset()
      setPreview(null)
    } catch (error) {
      console.error(error)
      toast.error("Failed to submit application")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10 mt-25">
        
        <div className="grid grid-cols-12 gap-4">
          {/* NAME */}
          <div className="col-span-6">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" placeholder="John Doe" {...form.register("name")} />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>
          </div>

          {/* PHONE */}
          <div className="col-span-6">
            <Field>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
              <Input id="phone" placeholder="09..." {...form.register("phone")} />
              <FieldError>{form.formState.errors.phone?.message}</FieldError>
            </Field>
          </div>
        </div>

        {/* SKILL */}
        <Field>
          <FieldLabel htmlFor="skill">Special Skills</FieldLabel>
          <Input 
            id="skill" 
            placeholder="e.g. Veterinary, Animal Handling, Photography" 
            {...form.register("skill")} 
          />
          <FieldDescription>Let us know how you can help.</FieldDescription>
          <FieldError>{form.formState.errors.skill?.message}</FieldError>
        </Field>

        {/* AVAILABILITY */}
        <Field>
          <FieldLabel htmlFor="availability">Availability</FieldLabel>
          <Select
            defaultValue={form.getValues("availability")}
            onValueChange={(value) => form.setValue("availability", value)}
          >
            <SelectTrigger id="availability">
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Weekends Only">Weekends Only</SelectItem>
              <SelectItem value="On-call">On-call</SelectItem>
            </SelectContent>
          </Select>
          <FieldError>{form.formState.errors.availability?.message}</FieldError>
        </Field>

        {/* PHOTO UPLOAD */}
        <Field>
          <FieldLabel>Profile / ID Photo</FieldLabel>
          <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-primary transition cursor-pointer">
            <input type="file" id="fileUpload" className="hidden" onChange={handleFileChange} />
            <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-3">
              {preview ? (
                <img src={preview} className="h-40 rounded-lg shadow object-cover" alt="Preview" />
              ) : (
                <div className="text-gray-500 text-sm">Click to upload profile picture</div>
              )}
            </label>
          </div>
        </Field>

        <Button type="submit" className="w-full">Apply to Volunteer</Button>
        <Toaster position="top-center" />
      </form>
    </Form>
  )
}