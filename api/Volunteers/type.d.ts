

type Volunteers ={
    id: number,
    name: string,
    skill: string,
    availability: string,
    phone: string,
    status: CaseStatus,
    image?: string | null;
}

type CaseStatus = 'Pending'| 'Accepted';


// type VolunteerListResponse ={
//     code: number
//     success: boolean
//     total: number
//     data: Volunteers[]
//      message: string
// }