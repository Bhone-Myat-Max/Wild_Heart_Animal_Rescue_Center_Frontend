import { Heart, Shield, Home, Users, Section } from "lucide-react";



export default function ContentSection() {
    const stats = [
        { number: "?+", label: "Animals Rescued", icon: Heart },
        { number: "?%", label: "Survival Rate", icon: Shield },
        { number: "?+", label: "Successful Adoptions", icon: Home },
        { number: "?+", label: "Volunteers", icon: Users },
    ];
    return (
        <section id="about" className="py-20 md:py-32 bg-gradient-nature">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                        Our Mission
                    </span>
                    <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-6">
                        Compassion in Action
                    </h2>
                    <p className=" text-gray-700 text-lg leading-relaxed">
                        WildHeart Rescue is dedicated to providing emergency care, rehabilitation,
                        and loving homes for injured, abandoned, and displaced animals. We believe
                        every creature deserves compassion and a chance to thrive.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card text-center group hover:shadow-elevated transition-shadow">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <stat.icon className="w-7 h-7 text-primary" />
                            </div>
                            <div className="font-display text-3xl md:text-4xl font-bold  text-gray-700 mb-2">
                                {stat.number}
                            </div>
                            <div className=" text-gray-700 font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}