import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-skyline.jpg";
import OfficeMap from "@/components/OfficeMap";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/info@encoreconstruction.org";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `New contact message from ${form.name}`,
          _template: "table",
          _captcha: "false",
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Message sent! We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Could not send your message. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="relative h-[40vh] min-h-[280px] flex items-center">
        <img src={heroImage} alt="Skyline" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <span className="text-gold text-xs sm:text-sm font-semibold tracking-widest uppercase">Reach Out</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mt-2">Contact Us</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Name *" required maxLength={100} value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                  <input type="email" placeholder="Email *" required maxLength={255} value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                </div>
                <input type="tel" placeholder="Phone" maxLength={30} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                <textarea placeholder="Your Message *" required rows={5} maxLength={2000} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold resize-none" />
                <Button variant="gold" size="lg" type="submit" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Send Message <Send className="w-4 h-4" /></>}
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Phone", value: "+234 901 - 495 - 4263", href: "tel:+2349014954263" },
                { icon: Mail, label: "Email", value: "info@encoreconstruction.org", href: "mailto:info@encoreconstruction.org" },
                { icon: MapPin, label: "Office", value: "24A Taiye Olowu, Lekki Phase 1, Lagos" },
                { icon: Clock, label: "Hours", value: "Mon - Fri: 9:00 AM - 6:00 PM" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-secondary rounded-lg border border-border">
                  <item.icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-muted-foreground hover:text-gold transition-colors break-words">{item.value}</a>
                    ) : (
                      <p className="text-sm text-muted-foreground break-words">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <OfficeMap />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
