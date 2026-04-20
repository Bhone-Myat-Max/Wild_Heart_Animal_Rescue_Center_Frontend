"use client"
import {
    Controller,
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
import { useEffect, useState } from "react"
import { Form } from "@/components/ui/form"
import ImageUpolad from "@/components/image-upload"
import { AddAnimal, updateAnimal } from "./action";
import SelectBox from "@/components/ui/selectbox";
// import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import { useAnimalDialogStore } from "./store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { redirect } from "next/dist/server/api-utils";
// import { createDonation } from "./action";

const formSchema = z.object({

    tagcode: z.string().min(1, "Name is required"),
    species: z.string().min(1, "Species name is required"),
    gender: z.string(),
    estimated_age: z.string().min(1, "Animal Estimated age is required"),
    health_status: z.string().min(1),
    rescue_id: z.number(),
    current_status: z.string(),
    file: z.any()
});
let notify;
export type RescueCaseProp = {
    rescueCasesdata: RescueCase[]
    animal?: Animal
}

export default function AnimalForm({ rescueCasesdata, animal }: RescueCaseProp) {

    console.log("RC",rescueCasesdata);

    const { isOpen, setOpen } = useAnimalDialogStore()
    const [files, setFiles] = useState<File[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
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
            current_status: "under_treatment",
            gender: "male",
        },

    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const data = new FormData()

            data.append("tagcode", values.tagcode)
            data.append("species", values.species)
            data.append("gender", values.gender)
            data.append("estimated_age", values.estimated_age)
            data.append("health_status", values.health_status)
            data.append("rescue_id", values.rescue_id.toString())
            data.append("current_status", values.current_status.toString())

            setLoading(true)
            console.log(values.file, 'file....')
            if (values.file) {
                data.append("image", values.file)
            }

            if (animal?.id) {
                await updateAnimal(animal?.id!, data)
            } else {
                console.log("data,.....", data)
                await AddAnimal(data)
                 toast.success("Successfully saved")
                //  redirect('/animal')
            }
            setLoading(false);
            setOpen(false)
            form.reset()
            form.reset()

        } catch (error) {
            console.error(error)
            toast.error("Failed to submit the form")
        }
    }

    useEffect(() => {
        if (animal){
            form.reset({
              tagcode: animal?.tagcode ?? "",
              species: animal?.species ?? "",
              rescue_id: animal?.rescue_id ?? 0,
              estimated_age: animal?.estimated_age?? "",
              health_status: animal?.health_status?? "",

        })
        }
    }, [animal])

    return (
        // <Dialog >
        //     <DialogContent>
        //         <DialogHeader>
        //             <DialogTitle>{animal?.id ? "Update Product" : "Create new product"}</DialogTitle>
        //         </DialogHeader>

                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit, (error) => console.log(error))} className="space-y-8 max-w-2xl mx-auto  py-10 bg-white p-5 shadow-2xl">

                        <div className="grid grid-cols-12 gap-4">

                            <div className="col-span-6">
                                <Field>
                                    <FieldLabel htmlFor="tagcode">Tagcode *</FieldLabel>
                                    <Input
                                        id="tagcode"
                                        placeholder="Fill tagcode/Name..."

                                        {...form.register("tagcode")}
                                    />
                                    <FieldDescription>Fill tagcode or name of animal</FieldDescription>
                                    <FieldError>{form.formState.errors.tagcode?.message}</FieldError>
                                </Field>
                            </div>

                            <div className="col-span-6">
                                <Field>
                                    <FieldLabel htmlFor="species">Species *</FieldLabel>
                                    <Input
                                        id="species"
                                        placeholder="Fill animal species..."

                                        {...form.register("species")}
                                    />
                                    <FieldDescription>Please fill species</FieldDescription>
                                    <FieldError>{form.formState.errors.species?.message}</FieldError>
                                </Field>
                            </div>

                        </div>
                        <Field>
                            <FieldLabel htmlFor="estimated_age">Age *</FieldLabel>
                            <Input
                                id="estimated_age"
                                placeholder="Fill Age..."

                                {...form.register("estimated_age")}
                            />
                            <FieldDescription>This is your Animal Estimated Age.</FieldDescription>
                            <FieldError>{form.formState.errors.estimated_age?.message}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="health_status">Health Condition *</FieldLabel>
                            <Input
                                id="health_status"
                                placeholder="Fill Health Status..."

                                {...form.register("health_status")}
                            />
                            <FieldDescription>This is your Animal Estimated Age.</FieldDescription>
                            <FieldError>{form.formState.errors.health_status?.message}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="current_status">Current Status *</FieldLabel>
                            <Select
                                defaultValue={form.getValues("current_status")}
                                onValueChange={(value) => form.setValue("current_status", value)}
                            >
                                <SelectTrigger id="current_status">
                                    <SelectValue placeholder="Current Status" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="rescued">rescued</SelectItem>
                                    <SelectItem value="under_treatment">under_treatment</SelectItem>
                                    <SelectItem value="adopted">adopted</SelectItem>

                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>

                            <FieldDescription>You can manage email addresses in your email settings.</FieldDescription>
                            <FieldError>{form.formState.errors.current_status?.message}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="gender">Gender</FieldLabel>
                            <Select
                                defaultValue={form.getValues("gender")}
                                onValueChange={(value) => form.setValue("gender", value)}
                            >
                                <SelectTrigger id="female">
                                    <SelectValue placeholder="gender..." />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="male">male</SelectItem>
                                    <SelectItem value="female">female</SelectItem>
                                </SelectContent>
                            </Select>

                            <FieldDescription>You can manage email addresses in your email settings.</FieldDescription>
                            <FieldError>{form.formState.errors.gender?.message}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="rescueCase">Rescue Case</FieldLabel>
                            <Controller
                                control={form.control}
                                name="rescue_id"
                                render={({ field }) => (
                                    <SelectBox
                                        value={field.value ? String(field.value) : ""}  
                                        onValueChange={(value: string) => field.onChange(Number(value))} 
                                        items={rescueCasesdata}
                                    />
                                )}
                            />
                            <FieldError>{form.formState.errors.rescue_id?.message}</FieldError>
                        </Field>
                        <Field>
                            <FieldLabel>Select Image *</FieldLabel>

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



                        <Button type="submit" disabled={loading}> {loading && <Spinner />}Submit</Button>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                    </form>
                </Form>
        //     </DialogContent>
        // </Dialog>

    )
}