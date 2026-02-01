import { instanceWithAuth as axios } from "@/api"
import route from '@/api/Assaignees/route'
export default {
    all: (query : string) => axios.get<HTTPResponse<assignees[]>>(route.resource + query),
    detail: ( id :number) => axios.post<HTTPResponse<assignees[]>>(route.resource + "/" + id),
    create: (rescueID: number, assignees :number[] ) => axios.post<HTTPResponse<assignees[]>>( `${route.resource}/${rescueID}`,
    {
      assignees: assignees,
    }),
    // update: ( id :number, volunteer: FormData) => axios.post<HTTPResponse<RescueCase[]>>(route.resource + "/" + id + "/status-update", volunteer ),
    // delete: (id : number) => axios.delete<HTTPResponse<Product>>(routes.resource + "/" + id )
}