import { instanceWithAuth as axios } from "@/api"
import route from '@/api/Volunteers/route'
export default {
    all_Pending: (query : string) => axios.get<HTTPResponse<Volunteers[]>>('/volunteers/pending' + query),
    all_accepted: (query : string) => axios.get<HTTPResponse<Volunteers[]>>('/volunteers/accepted' + query),
    create: ( data : FormData ) => axios.post<HTTPResponse<Volunteers[]>>(route.resource, data ),
    update: ( id :number, data: FormData) => axios.post<HTTPResponse<Volunteers[]>>(route.resource + "/" + id + "/status-update", data ),
    delete: (id : number) => axios.delete<HTTPResponse<Volunteers[]>>(route.resource + "/" + id )
    
    // delete: (id : number) => axios.delete<HTTPResponse<Product>>(routes.resource + "/" + id )
}