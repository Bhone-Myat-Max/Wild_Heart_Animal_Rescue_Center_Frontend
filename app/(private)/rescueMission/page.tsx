import RescueMissionTemplate from "@/templates/RescueMission";
import RescueMissionAPI from '@/api/rescueMission'


export default async function RescueMissionPage() {

    const rescueMission = await RescueMissionAPI.all()
    
    return (
        <>
            <RescueMissionTemplate mission={rescueMission.data.data} />
        </>
    )
}