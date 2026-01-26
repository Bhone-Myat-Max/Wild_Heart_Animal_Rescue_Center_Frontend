type Volunteer = {
    id?: number,
    name: string,
    skill: string,
    availability: number,
    phone: string,
    status: string,
}

type VolunteerListResonse = {
    total: number,
    data: Volunteer[]
}