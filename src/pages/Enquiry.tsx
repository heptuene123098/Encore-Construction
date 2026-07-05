import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import OfficeMap from "@/components/OfficeMap";

const FORM_ENDPOINT = import.meta.env.PROD ? "/api/enquiries.php" : "/api/enquiries";

const Enquiry = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to send enquiry");
      }
      toast.success("Thank you for your enquiry! Our team will contact you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not send your enquiry. Please try again or email us directly.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-gold text-xs sm:text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">Make an <span className="text-gold-gradient">Enquiry</span></h1>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name *" required maxLength={100} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                  <input type="email" placeholder="Email Address *" required maxLength={255} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input type="tel" placeholder="Phone Number" maxLength={30} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                  <select value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-gold">
                    <option value="">Select Subject</option>
                    <option>Property Purchase</option>
                    <option>Investment Enquiry</option>
                    <option>Schedule a Visit</option>
                    <option>General Information</option>
                  </select>
                </div>
                <textarea placeholder="Your Message *" required rows={5} maxLength={2000} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold resize-none" />
                <Button variant="gold" size="lg" type="submit" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Send Enquiry <Send className="w-4 h-4" /></>}
                </Button>
              </form>
            </div>
            <div className="space-y-6">
              <div className="bg-secondary p-6 rounded-lg border border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <a href="tel:+2349014954263" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors break-words">
                    <Phone className="w-5 h-5 text-gold flex-shrink-0" /> +234 901 - 495 - 4263
                  </a>
                  <a href="mailto:info@encoreconstruction.org" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-gold transition-colors break-words">
                    <Mail className="w-5 h-5 text-gold flex-shrink-0" /> info@encoreconstruction.org
                  </a>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" /> 24A Taiye Olowu, Lekki Phase 1, Lagos
                  </div>
                </div>
              </div>
              <OfficeMap />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Enquiry;
