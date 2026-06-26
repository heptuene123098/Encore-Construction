import { Linkedin, MapPin, Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import IntroVideoDialog from "./IntroVideoDialog";
import type { TeamMember } from "@/data/team";

const HeroSplit = ({ member }: { member: TeamMember }) => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative bg-secondary">
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* Headshot + info */}
          <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-xl">
            <div className="aspect-[4/5] lg:aspect-auto lg:h-full relative">
              <img
                src={member.headshot}
                alt={`${member.name} — ${member.role}`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                  {member.department}
                </span>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mt-2">
                  {member.name}
                </h1>
                <div className="text-gold text-lg font-medium mt-1">{member.role}</div>
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-primary-foreground/80">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {member.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> Joined {member.joinedYear}
                  </span>
                </div>
                <Button
                  variant="gold"
                  size="lg"
                  className="mt-5 min-h-[44px]"
                  asChild
                >
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" /> Connect on LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Candid + intro video */}
          <div
            className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-xl group cursor-pointer min-h-[420px] lg:min-h-0"
            onClick={() => setVideoOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setVideoOpen(true)}
            aria-label={`Play 15-second intro from ${member.name}`}
          >
            <img
              src={member.candidShot}
              alt={`${member.name} on site`}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gold/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-primary fill-primary ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary/90 to-transparent">
              <div className="text-gold text-xs font-semibold tracking-widest uppercase">
                15-second intro
              </div>
              <p className="text-primary-foreground text-sm mt-1">
                Meet {member.name.split(" ")[0]} before they meet you on-site.
              </p>
            </div>
          </div>
        </div>
      </div>

      <IntroVideoDialog
        open={videoOpen}
        onOpenChange={setVideoOpen}
        member={member}
      />
    </section>
  );
};

export default HeroSplit;
