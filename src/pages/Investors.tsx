import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, BarChart3, Building2, ChevronRight, Send, Download } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/hero-skyline.jpg";

const investmentTiers = [
  { name: "Silver", min: "$250K", max: "$500K", roi: "12-15%", term: "2-3 years", features: ["1-2 BR Units", "Quarterly Reports", "Priority Booking"] },
  { name: "Gold", min: "$500K", max: "$1.5M", roi: "15-20%", term: "2-4 years", features: ["2-3 BR Premium Units", "Monthly Reports", "Dedicated Manager", "Early Access"] },
  { name: "Platinum", min: "$1.5M+", max: "", roi: "20-28%", term: "3-5 years", features: ["Penthouse / Full Floor", "Weekly Updates", "VIP Events", "Custom Finishes", "Rental Management"] },
];

const whyInvest = [
  { icon: TrendingUp, title: "High ROI", desc: "Average 18% annual return on investment across all projects" },
  { icon: Shield, title: "Secure Investment", desc: "Title-secured properties with full legal documentation" },
  { icon: BarChart3, title: "Capital Appreciation", desc: "22% average property value increase post-completion" },
  { icon: Building2, title: "Quality Construction", desc: "Premium materials and on-time delivery track record" },
];

const Investors = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", tier: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Our investment team will contact you within 24 hours.");
    setForm({ name: "", email: "", phone: "", tier: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <img src={heroImage} alt="Investment opportunity" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Investment Opportunities</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-2">
            Invest in <span className="text-gold-gradient">Premium</span> Real Estate
          </h1>
          <p className="text-primary-foreground/80 mt-4 max-w-xl">Secure high-yield returns with Lagos's fastest-growing luxury property developer.</p>
        </div>
      </section>

      {/* Why Invest */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Why Choose Us</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2">Why Invest <span className="text-gold-gradient">With Us</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyInvest.map((item) => (
              <div key={item.title} className="bg-card p-6 rounded-lg border border-border shadow-sm text-center">
                <item.icon className="w-10 h-10 text-gold mx-auto mb-3" />
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Tiers */}
      <section className="section-padding bg-secondary">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Plans</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2">Investment <span className="text-gold-gradient">Tiers</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {investmentTiers.map((tier, i) => (
              <div key={tier.name} className={`bg-card rounded-lg border p-8 shadow-sm relative ${i === 1 ? "border-gold ring-2 ring-gold/20" : "border-border"}`}>
                {i === 1 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 gold-gradient text-primary text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>}
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">{tier.name}</h3>
                <p className="text-gold font-semibold text-lg mb-1">{tier.min}{tier.max ? ` – ${tier.max}` : ""}</p>
                <p className="text-sm text-muted-foreground mb-6">Projected ROI: {tier.roi} • {tier.term}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-gold" /> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={i === 1 ? "gold" : "outline"} className="w-full" asChild>
                  <a href="#invest-form">Get Started</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prospectus Download + Inquiry Form */}
      <section id="invest-form" className="section-padding">
        <div className="container-wide mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Get Started</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-4">Investor <span className="text-gold-gradient">Inquiry</span></h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name *" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="email" placeholder="Email *" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
                <input type="tel" placeholder="Phone *" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold" />
              </div>
              <select value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value })} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-gold">
                <option value="">Select Investment Tier</option>
                <option>Silver ($250K - $500K)</option>
                <option>Gold ($500K - $1.5M)</option>
                <option>Platinum ($1.5M+)</option>
              </select>
              <textarea placeholder="Additional Details" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold resize-none" />
              <Button variant="gold" size="lg" type="submit">
                Submit Inquiry <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
          <div className="flex flex-col justify-center items-center bg-secondary rounded-lg border border-border p-8 text-center">
            <Download className="w-16 h-16 text-gold mb-4" />
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">Investment Prospectus</h3>
            <p className="text-muted-foreground mb-6">Download our detailed investment guide with project timelines, ROI projections, and market analysis.</p>
            <Button variant="navy" size="lg">
              <Download className="w-4 h-4" /> Download Prospectus (PDF)
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investors;
