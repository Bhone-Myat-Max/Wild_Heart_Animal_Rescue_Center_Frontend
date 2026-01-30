import { instanceWithAuth as axios } from "@/api"
import route from '@/api/Volunteers/route'
export default {
    all_Pending: (query : string) => axios.get<HTTPResponse<VolunteerListResponse>>('/volunteers/pending' + query),
    all_accepted: (query : string) => axios.get<HTTPResponse<VolunteerListResponse>>('/volunteers/accepted' + query),
    // create: ( product : FormData ) => axios.post<HTTPResponse<Product>>(routes.resource, product ),
    update: ( id :number, volunteer: FormData) => axios.post<HTTPResponse<VolunteerListResponse>>(route.resource + "/" + id + "/status-update", volunteer ),
    // delete: (id : number) => axios.delete<HTTPResponse<Product>>(routes.resource + "/" + id )
}