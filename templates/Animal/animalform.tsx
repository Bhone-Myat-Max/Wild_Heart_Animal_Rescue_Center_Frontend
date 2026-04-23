"use client"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react"
import { Form } from "@/components/ui/form"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddAnimal, updateAnimal } from "./action";
import SelectBox from "@/components/ui/selectbox";
import { useAnimalDialogStore } from "./store";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
    species: z.string().min(1, "Species name is required"),
    gender: z.string(),
    estimated_age: z.string().min(1, "Age is required"),
    health_status: z.string().min(1, "Health status is required"),
    rescue_id: z.number().min(1, "Rescue case is required"),
    current_status: z.string(),
    file: z.any().optional()
});

export type RescueCaseProp = {
    rescueCasesdata: RescueCase[]
    animal?: any
}

export default function AnimalForm({ rescueCasesdata, animal }: RescueCaseProp) {
    console.log(rescueCasesdata);
    const { setOpen } = useAnimalDialogStore()
    const [loading, setLoading] = useState(false)
    
    const [preview, setPreview] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            current_status: "under_treatment",
            gender: "male",
            rescue_id: 0,
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
    const handleReset = () => {
        form.reset()
        setPreview(null)
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const data = new FormData()
            Object.entries(values).forEach(([key, value]) => {
                if (key !== 'file') data.append(key, String(value))
            })
            if (values.file) data.append("image", values.file)

            if (animal?.id) {
                await updateAnimal(animal.id, data)
                toast.success("Updated successfully")
            } else {
                await AddAnimal(data)
                toast.success("Created successfully")
            }
            setOpen(false)
            form.reset()
        } catch (error) {
            toast.error("Failed to save animal")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 p-5 mb-2 shadow-sm border-gray-400 ">
                {/* Row 1: Tagcode, Age, Species, Status */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                    <Field>
                        <FieldLabel className="text-xs">Species *</FieldLabel>
                        <Input className="h-9 text-sm" placeholder="Dog/Cat" {...form.register("species")} />
                        <FieldError>{form.formState.errors.species?.message}</FieldError>
                    </Field>

                    <Field>
                        <FieldLabel className="text-xs">Age *</FieldLabel>
                        <Input className="h-9 text-sm" placeholder="e.g. 2 years" {...form.register("estimated_age")} />
                        <FieldError>{form.formState.errors.estimated_age?.message}</FieldError>
                    </Field>



                    <Field>
                        <FieldLabel className="text-xs">Status</FieldLabel>
                        <Select
                            value={form.watch("current_status")}
                            onValueChange={(v) => form.setValue("current_status", v)}
                        >
                            <SelectTrigger className="h-9 text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="rescued">Rescued</SelectItem>
                                <SelectItem value="under_treatment">Under Treatment</SelectItem>
                                <SelectItem value="adopted">Adopted</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </div>

                {/* Row 2: Gender, Rescue Case, Health */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Field>
                        <FieldLabel className="text-xs">Gender</FieldLabel>
                        <Select
                            value={form.watch("gender")}
                            onValueChange={(v) => form.setValue("gender", v)}
                        >
                            <SelectTrigger className="h-9 text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>

                    {/* <Field>
                        <FieldLabel htmlFor="rescueCase" className="text-xs">Rescue Case</FieldLabel>
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
                    </Field> */}

                    <Field>
                        <FieldLabel className="text-xs">Rescue Case *</FieldLabel>

                        <Select
                            value={String(form.watch("rescue_id") || "")}
                            onValueChange={(value) => form.setValue("rescue_id", Number(value))}
                        >
                            <SelectTrigger className="h-9 text-sm">
                                <SelectValue placeholder="Select rescue case" />
                            </SelectTrigger>

                            <SelectContent>
                                {rescueCasesdata.map((rescue) => (
                                    <SelectItem key={rescue.id} value={String(rescue.id)}>
                                        {rescue.case_number || `Case #${rescue.id}`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FieldError>
                            {form.formState.errors.rescue_id?.message}
                        </FieldError>
                    </Field>

                    <Field>
                        <FieldLabel className="text-xs">Health Condition *</FieldLabel>
                        <Input className="h-9 text-sm" placeholder="Stable/Critical" {...form.register("health_status")} />
                        {/* <FieldError className="text-[10px]" /> */}
                        <FieldError>{form.formState.errors.health_status?.message}</FieldError>

                    </Field>
                </div>

                {/* Image Upload Area */}
                <div className="border-2 border-dashed rounded-lg p-4 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <input type="file" id="fileUpload" className="hidden" accept="image/*" onChange={handleFileChange} />
                    <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
                        {preview ? (
                            <img src={preview} className="h-32 w-auto object-cover rounded-md border" />
                        ) : (
                            <div className="py-2">
                                <p className="text-sm font-medium text-gray-600">Click to upload photo</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG (Max 4MB)</p>
                            </div>
                        )}
                    </label>
                    {/* <FieldError>{form.formState.errors.file?.message}</FieldError> */}


                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="ghost" onClick={handleReset}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        // onClick={handleReset}
                        className="w-full md:w-32 h-10" disabled={loading}>
                        {loading ? <Spinner className="mr-2 h-4 w-4" /> : null}
                        {animal?.id ? "Update Animal" : "Save Animal"}
                    </Button>
                </div>
                
            </form>
        </Form>
    )
}