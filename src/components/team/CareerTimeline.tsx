import { Award, TrendingUp } from "lucide-react";
import type { Certification, TimelineEntry } from "@/data/team";

type Props = {
  timeline: TimelineEntry[];
  certifications: Certification[];
};

const CareerTimeline = ({ timeline, certifications }: Props) => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            From the Ground Up
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
            Career <span className="text-gold-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            We grow from within. Here's how this career has unfolded at Encore.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <ol className="relative border-l-2 border-gold/30 pl-6 space-y-8">
              {timeline.map((step, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[34px] flex items-center justify-center w-10 h-10 rounded-full bg-gold text-primary font-bold text-sm shadow-md">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                  <div className="bg-card border border-border rounded-lg p-5 shadow-sm">
                    <div className="text-gold text-xs font-semibold tracking-widest uppercase">
                      {step.year}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mt-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Certifications */}
          <aside className="bg-card border border-border rounded-lg p-6 shadow-sm h-fit lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="font-display text-lg font-semibold text-foreground">
                Earned with Encore
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Certifications and licenses obtained while on our team.
            </p>
            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <li key={i} className="border-l-2 border-gold/40 pl-3">
                  <div className="text-sm font-medium text-foreground">{cert.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {cert.issuer} • {cert.year}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
