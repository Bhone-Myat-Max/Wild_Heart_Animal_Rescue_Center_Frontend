

import UserAPI from '@/api/user'




export const getAll_User = async (query: string) => {
    try {
        const res = await UserAPI.all(query)
        console.log("SERVICE user res.data:", res.data);
        return res.data.data
    } catch (error) {
        console.log(error, 'errr')
        return []
    }
}