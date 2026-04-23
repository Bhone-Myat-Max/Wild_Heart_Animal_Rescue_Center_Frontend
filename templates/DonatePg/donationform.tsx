"use client"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"
// import {
//   toast,
//   Toaster
// } from "sonner"

import toast, { Toaster } from 'react-hot-toast';

import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError
} from "@/components/ui/field"
import {
  Button
} from "@/components/ui/button"
import {
  Input
} from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useState } from "react"
import { Form } from "@/components/ui/form"
import ImageUpolad from "@/components/image-upload"
import { createDonation } from "./action";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
 
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  file: z.any(),
  email: z.string().email("Invalid email format"),
  amount: z.number().min(1, "Amount is required"),
  purpose: z.string()
});
let notify;

export default function DonationForm() {


  const [files, setFiles] = useState<File[] | null>(null);
  // const [image, setImage ] = useState<string>()
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    form.setValue("file", file)

    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purpose: "Food & Nutrition",
      amount: 20, // ✅ default $20
    },

  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const data = new FormData()

      data.append("name", values.name)
      data.append("email", values.email)
      data.append("phone", values.phone)
      data.append("purpose", values.purpose)
      data.append("amount", values.amount.toString())

      if (values.file) {
        data.append("image", values.file)
      }

      await createDonation(data)
      setLoading(false)
      toast.success("Form submitted successfully!");

      form.reset()

    } catch (error) {
      setLoading(false)
      console.error(error)
      toast.error("Failed to submit the form")
    }
  }


  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto my-5 p-10 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

        <div className="grid grid-cols-12 gap-4 ">


          <div className="col-span-6">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                placeholder="Donor name"

                {...form.register("name")}
              />
              <FieldDescription>This is your public display name.</FieldDescription>
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>
          </div>

          <div className="col-span-6">
            <Field>
              <FieldLabel htmlFor="enail">Email</FieldLabel>
              <Input
                id="enail"
                placeholder="Your Email"

                {...form.register("email")}
              />
              <FieldDescription>This is your public display name.</FieldDescription>
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
          </div>

        </div>
        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input
            id="phone"
            placeholder="09 - "

            {...form.register("phone")}
          />
          <FieldDescription>This is your public display name.</FieldDescription>
          <FieldError>{form.formState.errors.phone?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="name_1027238936">Purpose</FieldLabel>
          <Select
            defaultValue={form.getValues("purpose")}
            onValueChange={(value) => form.setValue("purpose", value)}
          >
            <SelectTrigger id="name_1027238936">
              <SelectValue placeholder="Select a purpose" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Food & Nutrition">Food & Nutrition</SelectItem>
              <SelectItem value="Medical Care">Medical Care</SelectItem>
              <SelectItem value="Habitat Construction">Habitat Construction</SelectItem>
              <SelectItem value="General Fund">General Fund</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <FieldDescription>You can manage email addresses in your email settings.</FieldDescription>
          {/* <FieldError>{form.formState.errors.name_1027238936?.message}</FieldError> */}
        </Field>
        <Field>
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
                <img src={preview} className="h-40 rounded-lg shadow" />
              ) : (
                <>
                  <div className="text-gray-500 text-sm">Click to upload or drag and drop</div>
                  <div className="text-xs text-muted-foreground">PNG, JPG, GIF (max 4MB)</div>
                </>
              )}
            </label>
          </div>

          <FieldError>{form.formState.errors.file && String(form.formState.errors.file.message)}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Donation Amount</FieldLabel>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
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
            min={1}
            placeholder="Custom amount"
            value={form.watch("amount") ?? ""}
            onChange={(e) =>
              form.setValue("amount", Number(e.target.value))
            }
          />

          <FieldDescription>
            Choose a preset amount or enter your own.
          </FieldDescription>

          <FieldError>{form.formState.errors.amount?.message}</FieldError>
        </Field>


        <Button type="submit" disabled={loading}> {loading && <Spinner />}Submit</Button>

      </form>
    </Form>
  )
}