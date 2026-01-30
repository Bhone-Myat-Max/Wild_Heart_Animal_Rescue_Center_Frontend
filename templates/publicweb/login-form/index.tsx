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

const formSchema = z.object({
    email: z.email().min(1, "Please enter email."),
    password: z.string().min(1, "please enter password.")
});

export default function LoginForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: 'bob@mail.com',
            password: 'password'
        },
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password
        }).then((response) => {
            if (response?.ok) {
                router.replace("/dashboard")
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <Field>
                    <FieldLabel htmlFor="username">Email</FieldLabel>
                    <Input
                        id="email"
                        placeholder="Enter email"

                        {...form.register("email")}
                    />

                    <FieldError>{form.formState.errors.email?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                        id="password"
                        placeholder="Enter password"
                        type="password"
                        {...form.register("password")}
                    />

                    <FieldError>{form.formState.errors.password?.message}</FieldError>
                </Field>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}