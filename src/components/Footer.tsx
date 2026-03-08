import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-15 h-10 rounded-sm flex items-center justify-center">
                <img src="/logoT.png" alt="Encore Construction" className="w-full h-full object-contain" />
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Building iconic skylines and luxury living spaces. With 10 landmark projects, we are shaping the future of urban living.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Quick Links</h4>
            <div className="space-y-2">
              {["About Us", "Projects", "Properties", "Gallery", "Blog", "Contact"].map((item) => (
                <Link key={item} to={`/${item.toLowerCase().replace(" ", "-")}`} className="block text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+2347031071919" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" /> +234 703 - 107 - 1919
              </a>
              <a href="mailto:info@encoreconstruction.com" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" /> info@encoreconstruction.com
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> 24A Taiye Olowu, Lekki Phase 1, Lagos
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-gold">Newsletter</h4>
            <p className="text-sm text-primary-foreground/70 mb-3">Stay updated with our latest projects and exclusive offers.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-navy-light/50 border border-gold/20 rounded text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-gold" />
              <button type="submit" className="gold-gradient px-4 py-2 rounded text-sm font-semibold text-primary">Join</button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">© 2026 GANL. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
