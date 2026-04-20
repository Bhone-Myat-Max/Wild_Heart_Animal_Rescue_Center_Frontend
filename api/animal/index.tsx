import { instanceWithAuth as axios } from "@/api"
import route from '@/api/animal/route'
export default {
    all: (query : string) => axios.get<HTTPResponse<Animal[]>>(route.resource + query),
    detail: ( id :number) => axios.post<HTTPResponse<Animal[]>>(route.resource + "/" + id),

    create: ( data : FormData ) => axios.post<HTTPResponse<Animal[]>>(route.resource, data ),
    update: ( id :number, data: FormData) => axios.post<HTTPResponse<Animal[]>>(route.resource + "/" + id , data ),
    delete: (id : number) => axios.delete<HTTPResponse<Animal[]>>(route.resource + "/" + id )
}