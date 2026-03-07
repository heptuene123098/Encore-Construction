import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/projects";

const Testimonials = () => (
  <div className="pt-20">
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Reviews</span>
          <h1 className="font-display text-4xl font-bold text-foreground mt-2">Client <span className="text-gold-gradient">Testimonials</span></h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Real stories from homeowners and investors who chose Elevate Developments.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-card p-6 rounded-lg border border-border shadow-sm relative">
              <Quote className="w-8 h-8 text-gold/20 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm italic mb-6 leading-relaxed">"{t.text}"</p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-xs text-gold">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Testimonials;
