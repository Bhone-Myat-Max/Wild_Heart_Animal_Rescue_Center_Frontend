'use server'
import volunteerAPI from '@/api/Volunteers'
import { revalidateByPath } from '@/utils/action'
import axios from 'axios';
import { revalidatePath } from 'next/cache';

//CRUD Function      : Promise<VolunteerListResponse>
export const getAll_PendingVolunteer = async (query: string): Promise<VolunteerListResponse> => {
    try {
        const res = await volunteerAPI.all_Pending(query)
        console.log("SERVICE Pending res.data:", res.data);
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return {

            code: 500,
            success: false,
            total: 0,
            data: [],
            message: "error"
        }
    }
}

export const getAll_AcceptedVolunteer = async (query: string): Promise<VolunteerListResponse> => {
    try {
        const res = await volunteerAPI.all_accepted(query)
        console.log("SERVICE accepted res.data:", res.data);
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return {

            code: 500,
            success: false,
            total: 0,
            data: [],
            message: "error"
        }
    }
}

export const updateVolunteer = async (id: number, data: FormData) => {
    try {
       await volunteerAPI.update(id , data)
       revalidateByPath("/volunteers")
    } catch (error) {
        console.log(error, "error...")
    }
}

// export async function updateVolunteer(id: number, formData: FormData) {
//     const status = formData.get("status"); // ✅ Correct

//     await axios.post(`http://localhost:8000/api/volunteers/${id}/status-update`, {
//         status: status
//     });

//     revalidatePath('/volunteers')
// }