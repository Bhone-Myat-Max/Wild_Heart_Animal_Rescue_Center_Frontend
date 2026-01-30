

type Volunteers ={
    id: number,
    name: string,
    skill: string,
    availability: string,
    phone: string,
    status: string,
}

type VolunteerListResponse ={
    code: number
    success: boolean
    total: number
    data: Volunteers[]
     message: string
}