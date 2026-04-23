
import HeroSection from "@/components/hero-section";
import DonationForm from "@/templates/DonatePg"

import RescueMissionAPI from '@/api/rescueMission'
import DonationAPI from '@/api/donations'
import DonationTemplate from "@/templates/DonatePg";


export default async function page() {

  const rescueMission = await RescueMissionAPI.all()
  const donation =  await DonationAPI.all()
  
  console.log(donation);
  // console.log(rescueMission);
  // const donationSectionRef = useRef<HTMLDivElement>(null);
  // const scrollToDonation = () => {
  //   donationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };
  // const router = useRouter();
  //   const navigation = () => {
  // router.push('/volunteer-request')
  // };
  // const { setOpen, setAnimal } = useAnimalDialogStore()

  return <div>
    <HeroSection/>
          <DonationTemplate rescueMissions={rescueMission.data.data}/>
  </div>
  
}