import VolunteersTemplate from "@/templates/Volunteers";
import { getAll_PendingVolunteer } from "@/templates/Volunteers/actions";
import { getAll_AcceptedVolunteer } from "@/templates/Volunteers/actions";

export default async function ProductsPage( ) {
    const pending_volunteers = await getAll_PendingVolunteer("");

    console.log("PAGE pendingvolunteers:", pending_volunteers);

    const accepted_volunteers = await getAll_AcceptedVolunteer("");

    console.log("PAGE acceptvolunteers:", accepted_volunteers);

    return <div className="">
        <VolunteersTemplate Pending_volunteer={pending_volunteers} Accepted_volunteers={accepted_volunteers} />
        
    </div>
}

