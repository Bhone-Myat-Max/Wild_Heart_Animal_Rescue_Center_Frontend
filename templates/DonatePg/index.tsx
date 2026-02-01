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

const formSchema = z.object({
  // name_2000103917: z.string().min(1),
  // name_0392522672: z.string().min(1),
  // name_2585653882: z.string().min(1),
  // name_1027238936: z.string(),
  // name_9060257964: z.string(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  file: z.any(),
  email: z.string().email("Invalid email format"),
  amount: z.number().min(1, "Amount is required"), // ✅ ADD
  purpose: z.string()// ✅ ADD
});
let notify;

export default function MyForm() {
  

  const [files, setFiles] = useState<File[] | null>(null);
  // const [image, setImage ] = useState<string>()
  const [preview, setPreview] = useState<string | null>(null)

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
      const data = new FormData()

      data.append("name", values.name)
      data.append("email", values.email)
      data.append("phone", values.phone)
      data.append("purpose", values.purpose)
      data.append("amount", values.amount.toString())

      if (values.file) {
        data.append("file", values.file)
      }

      await createDonation(data)
      toast.success("Form submitted successfully!");

      form.reset()

    } catch (error) {
      console.error(error)
      toast.error("Failed to submit the form")
    }
  }

  //  useEffect(() => {
  //       form.reset({
  //           name: product?.name ?? "",
  //           description: product?.description ?? "",
  //           price: product?.price ?? 0,
  //           category: product?.category_id ?? 0,
  //           status: product?.status === "Active" ? true : false,
  //       })
  //   }, [product])

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

        <div className="grid grid-cols-12 gap-4">


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


        <Button type="submit" onClick={notify}>Submit</Button>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </form>
    </Form>
  )
}