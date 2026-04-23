import HeroSection from "@/components/hero-section";
import VolunteersTemplate from "@/templates/Volunteers";
import { getAll_PendingVolunteer } from "@/templates/Volunteers/actions";
import { getAll_AcceptedVolunteer } from "@/templates/Volunteers/actions";

export default async function ProductsPage( ) {
    const pending_volunteers = await getAll_PendingVolunteer("");
    const accepted_volunteers = await getAll_AcceptedVolunteer("");
    return <div className="">
        <VolunteersTemplate Pending_volunteer={pending_volunteers} Accepted_volunteers={accepted_volunteers} />
        
    </div>
}

