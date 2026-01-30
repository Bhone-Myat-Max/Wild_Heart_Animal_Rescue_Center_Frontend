import { instanceWithAuth as axios } from "@/api"
import route from '@/api/user/route'
export default {
    all: (query : string) => axios.get<HTTPResponse<User[]>>(route.resource + query),
    create: ( user : FormData ) => axios.post<HTTPResponse<User[]>>(route.resource, user ),
    update: ( id :number, user: FormData) => axios.post<HTTPResponse<User[]>>(route.resource + "/" + id + "/status-update", user ),
    delete: (id : number) => axios.delete<HTTPResponse<User[]>>(route.resource + "/" + id )
}