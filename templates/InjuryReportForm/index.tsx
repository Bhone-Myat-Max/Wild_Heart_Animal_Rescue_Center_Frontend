"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast from "react-hot-toast"

import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription
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
import { Form } from "@/components/ui/form"
import { CreateCase } from "@/templates/RescueCase/action"

const formSchema = z.object({
  case_title: z.string().min(1, "Title is required"),
  reported_by: z.string().min(1, "Name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  priority_level: z.enum(["Low", "Medium", "High", "Emergency"]),

})

export default function InjuryReportForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority_level: "Medium",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      // await CreateCase(values)
      const res = await CreateCase({
        case_title: values.case_title,
        reported_by: values.reported_by,
        location: values.location,
        description: values.description,
        priority_level: values.priority_level,
      })
      toast.success("Rescue case created")
      form.reset()

    } catch (error) {
      toast.dismiss()
      toast.error("Failed to create case")
    }
  }

  return (
    <div className="mt-14 ">




      <Form  {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10 w-full">

          <div className="grid grid-cols-12 gap-4">


            <div className="col-span-6">
              <Field>
                <FieldLabel htmlFor="reported_by">Your name</FieldLabel>
                <Input
                  id="reported_by"
                  placeholder="Your Name"

                  {...form.register("reported_by")}
                />
                <FieldDescription>This is your public display name.</FieldDescription>
                <FieldError>{form.formState.errors.reported_by?.message}</FieldError>
              </Field>
            </div>

            <div className="col-span-6">
              <Field>
                <FieldLabel htmlFor="case_title">Case</FieldLabel>
                <Input
                  id="case_title"
                  placeholder="Case Title..."

                  {...form.register("case_title")}
                />
                <FieldDescription>This is your public display email.</FieldDescription>
                <FieldError>{form.formState.errors.case_title?.message}</FieldError>
              </Field>
            </div>

          </div>

          <div className="grid grid-cols-12 gap-4">


            {/* <div className="col-span-6">
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
            </div> */}

            <div className="col-span-6">
              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Input
                  id="location"
                  placeholder="location..."

                  {...form.register("location")}
                />
                <FieldDescription>Please fill location Case happen.</FieldDescription>
                <FieldError>{form.formState.errors.location?.message}</FieldError>
              </Field>
            </div>

          </div>

          <div className="col-span-6">
            <Field>
              <FieldLabel>Priority Level</FieldLabel>

              <Controller
                control={form.control}
                name="priority_level"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              <FieldError>{form.formState.errors.priority_level?.message}</FieldError>
            </Field>
          </div>


          <div className="col-span-6">
            <Field>
              <FieldLabel htmlFor="phone">Description</FieldLabel>
              <textarea
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Describe the situation..."
                {...form.register("description")}
              />
              <FieldDescription>If there description. Let us know</FieldDescription>
              <FieldError>{form.formState.errors.description?.message}</FieldError>
            </Field>
          </div>


          <Button type="submit" className="w-25 h-10 hover:bg-white hover:border-2 border-black hover:text-black text-lg">Submit</Button>

        </form>
      </Form>
    </div>
  )
}