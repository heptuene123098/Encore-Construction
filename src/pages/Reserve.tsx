import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { apartments } from "@/data/projects";
import { ChevronLeft, Shield, CreditCard } from "lucide-react";
import { toast } from "sonner";

const Reserve = () => {
  const { id } = useParams();
  const apt = apartments.find(a => a.id === id);
  const [form, setForm] = useState({ name: "", email: "", phone: "", idNumber: "" });

  if (!apt) {
    return (
      <div className="pt-20 section-padding text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">Property Not Found</h1>
        <Button variant="gold" className="mt-4" asChild><Link to="/properties">Back to Properties</Link></Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Reservation submitted! Our team will contact you to finalize the booking.");
    setForm({ name: "", email: "", phone: "", idNumber: "" });
  };

  return (
    <div className="pt-20 section-padding">
      <div className="container-wide mx-auto max-w-3xl">
        <Button variant="ghost" className="mb-6 text-muted-foreground" asChild>
          <Link to="/properties"><ChevronLeft className="w-4 h-4" /> Back to Properties</Link>
        </Button>

        <div className="bg-card rounded-lg border border-border shadow-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h1 className="font-display text-2xl font-bold text-foreground">Reserve Unit</h1>
            <p className="text-muted-foreground text-sm mt-1">{apt.name} — {apt.projectName}</p>
          </div>

          <div className="p-6 bg-secondary/50 border-b border-border">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Unit Price</span>
              <span className="font-display text-2xl font-bold text-foreground">${apt.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-muted-foreground text-sm">Reservation Deposit (5%)</span>
              <span className="font-semibold text-gold">${(apt.price * 0.05).toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <input type="text" placeholder="Full Legal Name *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="email" placeholder="Email *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
              <input type="tel" placeholder="Phone *" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
            </div>
            <input type="text" placeholder="ID/Passport Number *" required value={form.idNumber} onChange={e => setForm({...form, idNumber: e.target.value})} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />

            <div className="flex items-start gap-2 text-xs text-muted-foreground p-4 bg-secondary rounded-lg">
              <Shield className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              Your information is secured and encrypted. A reservation deposit of 5% is required to hold the unit. Our team will contact you within 24 hours to finalize payment details.
            </div>

            <Button variant="gold" size="lg" type="submit" className="w-full">
              <CreditCard className="w-4 h-4" /> Submit Reservation
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
