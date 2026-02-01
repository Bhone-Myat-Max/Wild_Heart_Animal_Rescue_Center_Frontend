// donation-schema.ts
import z from "zod"

export const donationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(5, "Phone required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  purpose: z.enum([
    "Food & Nutrition",
    "Medical Care",
    "Habitat Construction",
    "General Fund",
    "Other",
  ]),
})

export type DonationFormType = z.infer<typeof donationSchema>
