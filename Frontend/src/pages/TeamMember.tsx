import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTeamMemberBySlug } from "@/data/team";
import HeroSplit from "@/components/team/HeroSplit";
import CareerTimeline from "@/components/team/CareerTimeline";
import QABubbles from "@/components/team/QABubbles";
import MediaFeed from "@/components/team/MediaFeed";

const TeamMember = () => {
  const { slug } = useParams<{ slug: string }>();
  const member = slug ? getTeamMemberBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (member) document.title = `${member.name} — ${member.role} | Encore`;
  }, [member]);

  if (!member) return <Navigate to="/about" replace />;

  return (
    <div>
      {/* Back link */}
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24">
        <Link
          to="/about"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors min-h-[44px]"
        >
          <ChevronLeft className="w-4 h-4" /> Back to the team
        </Link>
      </div>

      <HeroSplit member={member} />

      {/* Bio */}
      <section className="section-padding">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            About
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-4">
            Who is <span className="text-gold-gradient">{member.name.split(" ")[0]}</span>?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">{member.bio}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {member.strengths.map((s) => (
              <span
                key={s}
                className="px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-wide"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CareerTimeline timeline={member.timeline} certifications={member.certifications} />

      <QABubbles qa={member.qa} name={member.name} />

      <MediaFeed mediaFeed={member.mediaFeed} mediaTag={member.mediaTag} name={member.name} />

      {/* CTA */}
      <section className="section-padding navy-gradient">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground">
            Work with <span className="text-gold-gradient">{member.name.split(" ")[0]}</span> on your next project
          </h2>
          <p className="text-primary-foreground/80 mt-3 max-w-xl mx-auto">
            Start a conversation — we'll loop {member.name.split(" ")[0]} in directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button variant="gold" size="lg" className="min-h-[48px]" asChild>
              <Link to={`/enquiry?team=${member.slug}`}>
                Start an enquiry <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="min-h-[48px]" asChild>
              <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" /> View LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <Button variant="gold" size="lg" className="w-full min-h-[48px] shadow-2xl" asChild>
          <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-4 h-4" /> Message {member.name.split(" ")[0]} on LinkedIn
          </a>
        </Button>
      </div>
    </div>
  );
};

export default TeamMember;
