"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import { createDonation } from "./action";
import { useDonationDialogStore } from "./store";
import { Spinner } from "@/components/ui/spinner";
// Assuming this is where your store is defined
// import { useDonationDialogStore } from "@/hooks/use-donation-store" 

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  file: z.instanceof(File).optional(),
  email: z.string().email("Invalid email format"),
  amount: z.number().min(1, "Amount is required"),
  purpose: z.string(),
  rescue_mission_id: z.number().optional(),
});

export default function DonationDialog() {
  const { isOpen, setOpen, rescueMissionId } = useDonationDialogStore()
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false) // State for UI feedback

    const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: "General Fund",
      amount: 20,
      rescue_mission_id: undefined,
    },
  })

  // Helper to handle the file logic for both drop and click
  const processFile = (file: File) => {
    if (!file) return

    // 1. Manually set value and trigger validation
    form.setValue("file", file, { shouldValidate: true })

    // 2. Generate Preview
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  // Handle standard click/select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset()
      setPreview(null)
    }
    setOpen(open)
  }
   if (rescueMissionId) {
      form.setValue("rescue_mission_id", rescueMissionId)
    }

  // useEffect(() => {
  //   if (rescueMissionId) {
  //     form.setValue("rescue_mission_id", rescueMissionId)
  //   }
  // }, [rescueMissionId, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = new FormData()
      data.append("name", values.name)
      data.append("email", values.email)
      data.append("phone", values.phone)
      data.append("purpose", values.purpose)
      data.append("amount", values.amount.toString())

      // Log this to your browser console to check if the file exists here
      console.log("File to upload:", values.file);

      if (values.file) {
        data.append("image", values.file) // This matches your backend expectation
      }
      if (values.rescue_mission_id) {
        data.append("rescue_mission_id", values.rescue_mission_id.toString())
      }
       setLoading(true)
      await createDonation(data)
      toast.success("Donation submitted successfully!");
      handleOpenChange(false)
    } catch (error) {
      toast.error("Failed to submit the form")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Make a Donation</DialogTitle>
          <DialogDescription>
            Fill out the form below to support our cause.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md rounded-2xl p-6 max-h-[70vh] overflow-y-auto py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" placeholder="Donor name" {...form.register("name")} />
                <FieldError>{form.formState.errors.name?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" placeholder="Your Email" {...form.register("email")} />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
              <Input id="phone" placeholder="09 - " {...form.register("phone")} />
              <FieldError>{form.formState.errors.phone?.message}</FieldError>
            </Field>

            <Field>
              {/* <FieldLabel>Purpose</FieldLabel> */}
              {/* <Select
                defaultValue={form.getValues("purpose")}
                onValueChange={(value) => form.setValue("purpose", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Food & Nutrition">Food & Nutrition</SelectItem>
                  <SelectItem value="Medical Care">Medical Care</SelectItem>
                  <SelectItem value="Habitat Construction">Habitat Construction</SelectItem>
                  <SelectItem value="General Fund">General Fund</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select> */}
              <input type="hidden" {...form.register("purpose")} />
              <input type="hidden" {...form.register("rescue_mission_id")} />

            </Field>

            {/* <Field>
              <FieldLabel>Select File</FieldLabel>
              <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-primary transition cursor-pointer">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-3">
                  {preview ? (
                    <img src={preview} className="h-40 rounded-lg shadow object-cover" />
                  ) : (
                    <>
                      <div className="text-gray-500 text-sm">Click to upload or drag and drop</div>
                      <div className="text-xs text-muted-foreground">PNG, JPG, GIF (max 4MB)</div>
                    </>
                  )}
                </label>
              </div>
              <FieldError>{form.formState.errors.file && String(form.formState.errors.file.message)}</FieldError>
            </Field> */}
            <Field>
              <FieldLabel>Select File</FieldLabel>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center transition cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary"
                  }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  accept="image/*" // Restrict to images
                  onChange={handleFileChange}
                />

                <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-3">
                  {preview ? (
                    <div className="relative group">
                      <img src={preview} className="h-40 w-full object-contain rounded-lg shadow" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded-lg">
                        <span className="text-white text-xs">Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-gray-500 text-sm font-medium">Click to upload or drag and drop</div>
                      <div className="text-xs text-muted-foreground text-emerald-600">PNG, JPG, GIF (max 4MB)</div>
                    </>
                  )}
                </label>
              </div>
              <FieldError>{form.formState.errors.file?.message as string}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Donation Amount</FieldLabel>
              <div className="grid grid-cols-4 gap-3 mb-3">
                {[20, 30, 50, 100].map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant={form.watch("amount") === amt ? "default" : "outline"}
                    onClick={() => form.setValue("amount", amt)}
                  >
                    ${amt}
                  </Button>
                ))}
              </div>
              <Input
                type="number"
                placeholder="Custom amount"
                value={form.watch("amount") ?? ""}
                onChange={(e) => form.setValue("amount", Number(e.target.value))}
              />
              <FieldError>{form.formState.errors.amount?.message}</FieldError>
            </Field>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}> {loading && <Spinner />}Donation</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
      
    </Dialog>
  )
}