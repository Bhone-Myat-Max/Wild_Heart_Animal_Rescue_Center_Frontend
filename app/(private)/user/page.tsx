// import VolunteersTemplate from "@/templates/Volunteers";
// import { getAll_PendingVolunteer } from "@/templates/Volunteers/actions";
// import { getAll_AcceptedVolunteer } from "@/templates/Volunteers/actions";

import UserTemplate from "@/templates/User";
import UserAPI from '@/api/user'

export default async function UserPage( ) {
    const User = await UserAPI.all();
    // const accepted_volunteers = await getAll_AcceptedVolunteer("");
    return <div className="">
        <UserTemplate User={User.data.data}/>
        {/* <VolunteersTemplate Pending_volunteer={pending_volunteers} Accepted_volunteers={accepted_volunteers} /> */}
        
    </div>
}

