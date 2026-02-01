
"use server"

import DonationAPI from '@/api/donations'
import { revalidateByPath } from '@/utils/action'


export const getAllDonations = async (query: string) => {
    try {
        const res = await DonationAPI.all(query)
        console.log("SERVICE Pending res.data:", res.data);
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}
export const showDetail = async (id: number) => {
    try {
        const res = await DonationAPI.detail(id)
        console.log("SERVICE Pending res.data:", res.data);
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}

export const createDonation = async (data: FormData) => {
    try {
       await DonationAPI.create(data)
       revalidateByPath("/donations")
    } catch (error) {
        console.log(error, "error...")
    }
}