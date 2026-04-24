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
import {
  Form
} from '@/components/ui/form'
import {
  Field,
  FieldLabel,
  FieldError
} from "@/components/ui/field"
import {
  Button
} from "@/components/ui/button"
import {
  Input
} from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import toast from "react-hot-toast"

const formSchema = z.object({
  email: z.email().min(1, "Please enter email."),
  password: z.string().min(1, "please enter password.")
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: 'bob@mail.com',
      password: 'password'
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      })

      // ❌ ERROR (401 / wrong credentials)
      if (res?.error) {
        toast.error("Invalid email or password ❌")
        return
      }

      if (res?.ok) {
        toast.success("Login successful 🎉")
        router.replace("/dashboard")
      }

    } catch (error) {
      console.error(error)
      toast.error("Something went wrong 😢")
    } finally {
      setLoading(false)
    }
  }

  // return (
  //     <Form {...form}>
  //         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
  //             <Field>
  //                 <FieldLabel htmlFor="username">Email</FieldLabel>
  //                 <Input
  //                     id="email"
  //                     placeholder="Enter email"

  //                     {...form.register("email")}
  //                 />

  //                 <FieldError>{form.formState.errors.email?.message}</FieldError>
  //             </Field>
  //             <Field>
  //                 <FieldLabel htmlFor="password">Password</FieldLabel>
  //                 <Input
  //                     id="password"
  //                     placeholder="Enter password"
  //                     type="password"
  //                     {...form.register("password")}
  //                 />

  //                 <FieldError>{form.formState.errors.password?.message}</FieldError>
  //             </Field>
  //             <Button type="submit">Submit</Button>
  //         </form>
  //     </Form>
  // )
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-sm text-slate-500">Login to WildHeart 🐾</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* EMAIL */}
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                placeholder="Enter email"
                {...form.register("email")}
                className="rounded-xl focus:ring-2 focus:ring-orange-500"
              />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>

            {/* PASSWORD */}
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
                placeholder="Enter password"
                {...form.register("password")}
                className="rounded-xl focus:ring-2 focus:ring-orange-500"
              />
              <FieldError>{form.formState.errors.password?.message}</FieldError>
            </Field>

            {/* BUTTON */}
            <Button
              type="submit"


              className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl"
              disabled={loading}> {loading && <Spinner />}
              Sign In
            </Button>

          </form>
        </Form>

      </div>
    </div>
  )

}