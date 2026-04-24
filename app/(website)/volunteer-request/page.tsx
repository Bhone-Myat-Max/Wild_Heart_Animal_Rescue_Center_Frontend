import HeroSection from "@/components/hero-section";
import VolunteerFooter from "@/templates/footer-volunteer";
import VolunteerForm from "@/templates/Volunteers/volunteer-form";

export default function VolunteerPage() {
    return (
        <div>
            <HeroSection />
            <section className="py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                            Become a First Responder
                        </h2>
                        <p className="text-slate-600 max-w-xl mx-auto text-lg font-medium">
                            Our mission depends on dedicated individuals ready to protect wildlife.
                            Join the front lines of conservation today.
                        </p>
                    </div>

                    <div className="">
                        <VolunteerForm />
                    </div>
                </div>
            </section>
            <VolunteerFooter/>
        </div>

    );
}