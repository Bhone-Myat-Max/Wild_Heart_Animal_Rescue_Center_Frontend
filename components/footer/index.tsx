import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";


export default function Footer () {
   return (
     <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-warm flex items-center justify-center">
                <Heart className="w-5 h-5 text-secondary-foreground" />
              </div>
              <span className="font-display text-xl font-bold">
                WildHeart Rescue
              </span>
            </a>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Dedicated to rescuing, rehabilitating, and rehoming animals in need. 
              Every life matters.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#donate" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Donate
                </a>
              </li>
              <li>
                <a href="#report" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Report Injured Animal
                </a>
              </li>
              <li>
                <a href="#stories" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Volunteer
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Animal Care Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Adoption Process
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Wildlife Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  123 Wildlife Way<br />
                  Forest Heights, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink" />
                <a href="tel:1-800-WILDLIFE" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  1-800-WILDLIFE
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary shrink" />
                <a href="mailto:help@wildheart.org" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm">
                  help@wildheart.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            © 2024 WildHeart Rescue. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
   )
}