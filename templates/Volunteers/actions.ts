'use server'
import volunteerAPI from '@/api/Volunteers'
import { revalidateByPath } from '@/utils/action'
import axios from 'axios';
import { revalidatePath } from 'next/cache';

//CRUD Function      : Promise<VolunteerListResponse>
export const getAll_PendingVolunteer = async (query: string) =>{
    try {
        const res = await volunteerAPI.all_Pending(query)
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}

export const getAll_AcceptedVolunteer = async (query: string)=>{
    try {
        const res = await volunteerAPI.all_accepted(query)
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
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

export const createVolunteer = async (data: FormData) => {
    try {
       await volunteerAPI.create(data)   
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