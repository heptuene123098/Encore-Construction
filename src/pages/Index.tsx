import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Award, Users, TrendingUp, ChevronRight, Shield, Clock, Gem, BarChart3, Star } from "lucide-react";
import heroImage from "@/assets/hero-skyline.jpg";
import interiorImage from "@/assets/interior-luxury.jpg";
import { projects, testimonials } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import partner1 from "@/assets/partners/RM.png";
import partner2 from "@/assets/partners/cemex.png";
import partner3 from "@/assets/partners/HSA.png";
import partner4 from "@/assets/partners/fg.webp";
import partner5 from "@/assets/partners/LG.png";

const stats = [
  { icon: Clock, value: "3+", label: "Years of Excellence" },
  { icon: Building2, value: "10", label: "Landmark Projects" },
  { icon: Users, value: "100+", label: "Happy Homeowners" },
  { icon: TrendingUp, value: "$2M+", label: "In Development" },
];

const partners = [partner1, partner2, partner3, partner4, partner5];

const Index = () => {
  const featuredProjects = projects.filter(p => p.status === "active").slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <img src={heroImage} alt="Modern skyline at golden hour" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 gold-gradient text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Award className="w-4 h-4" /> Premium Construction Company
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Building Tomorrow's <span className="text-gold-gradient">Encore</span> Today
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl font-body">
              Encore Construction crafts iconic high-rise residences that redefine luxury living. 
              With 10 landmark projects, we're shaping cities of the future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/projects">View Projects <ChevronRight className="w-4 h-4" /></Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/properties">Buy an Apartment</Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/enquiry">Make an Enquiry</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-16 z-20 container-wide mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-lg p-6 text-center shadow-lg border border-border">
              <stat.icon className="w-8 h-8 text-gold mx-auto mb-2" />
              <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding">
        <div className="container-wide mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Who We Are</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
              Redefining Urban <span className="text-gold-gradient">Excellence</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For over 3 years, Elevate Developments has been at the forefront of luxury high-rise construction. 
              Our commitment to quality, innovation, and timely delivery has made us one of the most trusted names 
              in real estate development. With 5 active projects and 5 completed masterpieces, we continue to push 
              boundaries in architectural excellence.
            </p>
            <Button variant="navy" asChild>
              <Link to="/about">Learn More About Us <ChevronRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img src={interiorImage} alt="Luxury apartment interior" className="w-full h-80 lg:h-96 object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-secondary">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Portfolio</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
              Featured <span className="text-gold-gradient">Projects</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="gold" size="lg" asChild>
              <Link to="/projects">View All Projects <ChevronRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

     {/* Partners */}
    <section className="section-padding navy-gradient overflow-hidden">
      <div className="container-wide mx-auto">

        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Partners
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mt-2">
            Our Trusted <span className="text-gold-gradient">Partners</span>
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex gap-16 animate-partners whitespace-nowrap">

            {[...partners, ...partners].map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt="Partner"
                className="h-16 opacity-80 hover:opacity-100 transition"
              />
            ))}

          </div>
        </div>

      </div>
    </section>

      {/* Testimonials Preview */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Testimonials</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2">
              What Our <span className="text-gold-gradient">Clients Say</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.name} className="bg-card p-6 rounded-lg border border-border shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm italic mb-4">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-foreground text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Find Your <span className="text-gold-gradient">Dream Home</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore our available apartments or speak with our team to find the perfect luxury residence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link to="/properties">Browse Properties</Link>
            </Button>
            <Button variant="navy" size="lg" asChild>
              <Link to="/enquiry">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
