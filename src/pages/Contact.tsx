import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-skyline.jpg";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px] flex items-center">
        <img src={heroImage} alt="Skyline" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Reach Out</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-2">Contact Us</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Name *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                  <input type="email" placeholder="Email *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                </div>
                <input type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                <textarea placeholder="Your Message *" required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold resize-none" />
                <Button variant="gold" size="lg" type="submit">
                  Send Message <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Phone", value: "+2347031071919", href: "tel:+2347031071919" },
                { icon: Mail, label: "Email", value: "info@encore-construction.com", href: "mailto:info@encore-construction.com" },
                { icon: MapPin, label: "Office", value: "24A Taiye Olowu, Lekki Phase 1, Lagos" },
                { icon: Clock, label: "Hours", value: "Mon - Fri: 9:00 AM - 6:00 PM" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-secondary rounded-lg border border-border">
                  <item.icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="rounded-lg overflow-hidden h-64 border border-border">
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

export default Contact;
