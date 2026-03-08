import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Enquiry = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your enquiry! Our team will contact you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
            <h1 className="font-display text-4xl font-bold text-foreground mt-2">Make an <span className="text-gold-gradient">Enquiry</span></h1>
          </div>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                  <input type="email" placeholder="Email Address *" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                  <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-gold">
                    <option value="">Select Subject</option>
                    <option>Property Purchase</option>
                    <option>Investment Enquiry</option>
                    <option>Schedule a Visit</option>
                    <option>General Information</option>
                  </select>
                </div>
                <textarea placeholder="Your Message *" required rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold resize-none" />
                <Button variant="gold" size="lg" type="submit">
                  Send Enquiry <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <a href="tel:+1234567890" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors">
                    <Phone className="w-5 h-5 text-gold" /> +2347031071919
                  </a>
                  <a href="mailto:info@elevate-dev.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors">
                    <Mail className="w-5 h-5 text-gold" /> info@encoreconstruction.com
                  </a>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" /> 24A Taiye Olowu, Lekki Phase 1, Lagos
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-lg border border-border overflow-hidden h-64">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1689880000000!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enquiry;
