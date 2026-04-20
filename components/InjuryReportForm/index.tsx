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
import Image from "next/image";
import CaringAnimalImg from "@/assets/image/Img2.jpg"
// import { createDonation } from "./action";

const formSchema = z.object({

  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  // phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Phone is required"),
  file: z.any(),
  email: z.string().email("Invalid email format"),
  amount: z.number().min(1, "Amount is required"), // ✅ ADD
  purpose: z.string()// ✅ ADD
});
let notify;

export default function InjuryReportForm() {


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

      //   await createDonation(data)
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

  return (<div className="mt-14  p-10">
      {/* <div className="w-full">
          <Image alt="Image" src={CaringAnimalImg} className="w-full bg-cover h-screen"/>
      </div> */}
      <div className="text-center mb-10 "><h1 className="text-4xl ">Report Injuried Animal</h1></div>
      {/* <div className="grid grid-cols-3 mb-10 ">
        <div className="text-center">
          <h1 className="text-2xl text-center mb-4 ">International Animal Rescue UK</h1>
          <div>
            <p>Lime House, Regency Close, Uckfield, East Sussex, TN22 1DS, UK</p>
            <p>+44 1825 840252</p>
            <p>info@internationalanimalrescue.org</p>
            
          </div>
        </div> 
         <div className="text-center">
          <h1 className="text-2xl text-center mb-4">International Animal Rescue (Netherlands)</h1>
          <div>
            <p>Lime House, Regency Close, Uckfield, East Sussex, TN22 1DS, UK</p>
            <p>+44 1825 840252</p>
            <p>info@internationalanimalrescue.org</p>
          </div>
        </div> 
         <div className="text-center">
          <h1 className="text-2xl text-center mb-4">International Animal Rescue US</h1>
          <div>
            <p>Lime House, Regency Close, Uckfield, East Sussex, TN22 1DS, UK</p>
            <p>+44 1825 840252</p>
            <p>info@internationalanimalrescue.org</p>
          </div>
        </div> 
      </div> */}

      <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10 w-full">

          <div className="grid grid-cols-12 gap-4">


            <div className="col-span-6">
              <Field>
                <FieldLabel htmlFor="name">Your name</FieldLabel>
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

           <div className="grid grid-cols-12 gap-4">


            <div className="col-span-6">
              <Field>
                <FieldLabel htmlFor="name">Phone Number</FieldLabel>
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
                <FieldLabel htmlFor="email">Location</FieldLabel>
                <Input
                  id="location"
                  placeholder="location..."

                  {...form.register("location")}
                />
                <FieldDescription>This is your public display name.</FieldDescription>
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </Field>
            </div>

          </div>
          <Field>
            <FieldLabel htmlFor="phone">Description</FieldLabel>
            <Input
              id="phone"
              placeholder="Description"

              {...form.register("phone")}
            />
            <FieldDescription>This is your public display name.</FieldDescription>
            <FieldError>{form.formState.errors.phone?.message}</FieldError>
          </Field>



          <Button type="submit" onClick={notify} className="w-25 h-10 hover:bg-white hover:border-2 border-black hover:text-black text-lg">Submit</Button>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
        </form>
      </Form>
    </div>
  )
}