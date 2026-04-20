// "use client"
// import {
//   Controller,
//   useForm
// } from "react-hook-form"
// import {
//   zodResolver
// } from "@hookform/resolvers/zod"
// import {
//   z
// } from "zod"
// // import {
// //   toast,
// //   Toaster
// // } from "sonner"

// import toast, { Toaster } from 'react-hot-toast';

// import {
//   Field,
//   FieldLabel,
//   FieldDescription,
//   FieldError
// } from "@/components/ui/field"
// import {
//   Button
// } from "@/components/ui/button"
// import {
//   Input
// } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from "@/components/ui/select"
// import { useEffect, useState } from "react"
// import { Form } from "@/components/ui/form"
// import ImageUpolad from "@/components/image-upload"
// import SelectBox from "@/components/ui/selectbox";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Spinner } from "@/components/ui/spinner";
// import { redirect } from "next/dist/server/api-utils";
// import { createDonation } from "./action";



// import { useDonationDialogStore } from "./store"

// const formSchema = z.object({
//   // name: z.string().min(1),
//   // email: z.string().min(1),
//   // phone: z.string().min(1)
//   name: z.string().min(1, "Name is required"),
//   email: z.string().min(1, "Email is required"),
//   phone: z.string().min(1, "Phone is required"),
// });


// export default function EditDonationDialog() {
//   const { donation, isOpen, setOpen } = useDonationDialogStore()
//   if (!donation) return null

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),

//   })
  

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       console.log(values);
//       toast(
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(values, null, 2)}</code>
//         </pre>
//       );
//     } catch (error) {
//       console.error("Form submission error", error);
//       toast.error("Failed to submit the form. Please try again.");
//     }
//   }



//   return (
//     <Dialog open={isOpen} onOpenChange={setOpen}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Donation</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
//             <Field>
//               <FieldLabel htmlFor="name">Name*</FieldLabel>
//               <Input
//                 id="name"
//                 placeholder="Name"

//                 {...form.register("name")}
//               />
//               <FieldDescription>Please fill donor name here</FieldDescription>
//               <FieldError>{form.formState.errors.name?.message}</FieldError>
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="email">Email *</FieldLabel>
//               <Input
//                 id="email"
//                 placeholder="Email"

//                 {...form.register("email")}
//               />
//               <FieldDescription>Please Fill email here</FieldDescription>
//               <FieldError>{form.formState.errors.email?.message}</FieldError>
//             </Field>
//             <Field>
//               <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
//               <Input
//                 id="phone"
//                 placeholder="09-XXX XXX XXX"

//                 {...form.register("phone")}
//               />
//               <FieldDescription>Please fill phone here</FieldDescription>
//               <FieldError>{form.formState.errors.phone?.message}</FieldError>
//             </Field>
//             <Button type="submit">Submit</Button>
//           </form>
//         </Form>

//         {/* <div className="space-y-4">
//           <input
//             type="text"
//             defaultValue={donation.name}
//             className="border p-2 w-full"
//           />

//           <input
//             type="email"
//             defaultValue={donation.email}
//             className="border p-2 w-full"
//           />

//           <input
//             type="number"
//             defaultValue={donation.amount}
//             className="border p-2 w-full"
//           />
//         </div> */}
//       </DialogContent>
//     </Dialog>
//   )
// }

// // const formSchema = z.object({

// //     // name: z.string().min(1, "Name is required"),
// //     // email: z.string().min(1, "Email is required"),
// //     // phone: z.string().min(1, "Phone is required"),
// //     
// // });
// // let notify;
// // export type DonationProp = {
// //     // donation: Donation[]
// // }

// // export default function DonationDialog() {

// //     // console.log("DN", donation);

// //     const [files, setFiles] = useState<File[] | null>(null);
// //     const [loading, setLoading] = useState<boolean>(false)
// //     const [preview, setPreview] = useState<string | null>(null)

// //     // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     //     const file = e.target.files?.[0]
// //     //     if (!file) return

// //     //     form.setValue("file", file)

// //     //     const reader = new FileReader()
// //     //     reader.onload = () => setPreview(reader.result as string)
// //     //     reader.readAsDataURL(file)
// //     // }

// //     const dropZoneConfig = {
// //         maxFiles: 5,
// //         maxSize: 1024 * 1024 * 4,
// //         multiple: true,
// //     };
// //     const form = useForm<z.infer<typeof formSchema>>({
// //         resolver: zodResolver(formSchema),
// //         defaultValues: {

// //         },

// //     })



// //             // data.append("tagcode", values.tagcode)
// //             // data.append("species", values.species)
// //             // data.append("gender", values.gender)
// //             // data.append("estimated_age", values.estimated_age)
// //             // data.append("health_status", values.health_status)
// //             // data.append("rescue_id", values.rescue_id.toString())
// //             // data.append("current_status", values.current_status.toString())

// //             // setLoading(true)
// //             // console.log(values.file, 'file....')
// //             // if (values.file) {
// //             //     data.append("image", values.file)
// //             // }

// //             // console.log("data,.....", data)
// //             // await createDonation(data)
// //             // toast.success("Successfully saved")
// //             //  redirect('/donation')

// //             // form.reset()


// //     // useEffect(() => {
// //     //     if (donation){
// //     //         form.reset({
// //     //           tagcode: donation?.tagcode ?? "",
// //     //           species: donation?.species ?? "",
// //     //           rescue_id: donation?.rescue_id ?? 0,
// //     //           estimated_age: donation?.estimated_age?? "",
// //     //           health_status: donation?.health_status?? "",

// //     //     })
// //     //     }
// //     // }, [donation])

// //     return (
// //             <Dialog >
// //                 <DialogContent>
// //                     <DialogHeader>
// //                         {/* <DialogTitle>{donation?.id ? "Update Product" : "Create new product"}</DialogTitle> */}
// //                     </DialogHeader>

// //                     <Form {...form} >
// //                         <form onSubmit={form.handleSubmit(
// //                              (error) => console.log(error))} className="space-y-8 max-w-2xl mx-auto  py-10 bg-white p-5 shadow-2xl">

// //                             <div className="grid grid-cols-12 gap-4">

// //                                 {/* <div className="col-span-6">
// //                                     <Field>
// //                                         <FieldLabel htmlFor="tagcode">Tagcode *</FieldLabel>
// //                                         <Input
// //                                             id="tagcode"
// //                                             placeholder="Fill tagcode..."

// //                                             {...form.register("tagcode")}
// //                                         />
// //                                         <FieldDescription>This is your public display name.</FieldDescription>
// //                                         <FieldError>{form.formState.errors.tagcode?.message}</FieldError>
// //                                     </Field>
// //                                 </div>

// //                                 <div className="col-span-6">
// //                                     <Field>
// //                                         <FieldLabel htmlFor="species">Species *</FieldLabel>
// //                                         <Input
// //                                             id="species"
// //                                             placeholder="Fill donation species..."

// //                                             {...form.register("species")}
// //                                         />
// //                                         <FieldDescription>This is your public display name.</FieldDescription>
// //                                         <FieldError>{form.formState.errors.species?.message}</FieldError>
// //                                     </Field>
// //                                 </div> */}

// //                             </div>
// //                             <Button type="submit" disabled={loading}> {loading && <Spinner />}Submit</Button>
// //                             <Toaster
// //                                 position="top-center"
// //                                 reverseOrder={false}
// //                             />
// //                         </form>
// //                     </Form>
// //         //     </DialogContent>
// //         // </Dialog>

// //         )
// //     }