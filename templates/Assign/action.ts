

import AssigneesAPI from '@/api/Assaignees'
import { revalidateByPath } from '@/utils/action'


export const Assign = async (rescueID: number ,assignees: number[]) => {
    try {
       await AssigneesAPI.create(rescueID, assignees)
       revalidateByPath("/rescue_assign")
    } catch (error) {
        console.log(error, "error...")
    }
}