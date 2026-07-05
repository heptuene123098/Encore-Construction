import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, Award, Users, TrendingUp, ChevronRight, Shield, Clock, Gem, BarChart3, Star } from "lucide-react";
import interiorImage from "@/assets/interior-luxury.jpg";
import { projects, testimonials } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import PartnersMarquee from "@/components/PartnersMarquee";
import partner1 from "@/assets/partners/RM.png";
import partner2 from "@/assets/partners/cemex.png";
import partner3 from "@/assets/partners/HSA.png";
import partner4 from "@/assets/partners/fg.webp";
import partner5 from "@/assets/partners/LG.png";

const partnerLogos = [
  { src: partner1, name: "RM" },
  { src: partner2, name: "Cemex" },
  { src: partner3, name: "HSA" },
  { src: partner4, name: "FG" },
  { src: partner5, name: "LG" },
];

const stats = [
  { icon: Clock, value: "3+", label: "Years of Excellence" },
  { icon: Building2, value: "10", label: "Landmark Projects" },
  { icon: Users, value: "100+", label: "Happy Homeowners" },
  { icon: TrendingUp, value: "₦2B+", label: "In Development" },
];



const Index = () => {
  const featuredProjects = projects.filter(p => p.status === "active").slice(0, 3);
  const heroSlides = projects.slice(0, 6);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((s) => (s + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [heroSlides.length]);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {heroSlides.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={`${slide.name} — ${slide.location}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
              i === activeSlide ? "opacity-100" : "opacity-0"
            }`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
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
              As the construction arm of Rockmould Limited, Encore Construction crafts iconic high-rise residences that redefine luxury living. 
              With 10 landmark projects, we are shaping the cities of tomorrow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="gold" size="lg" asChild>
                <Link to="/projects">View Projects <ChevronRight className="w-4 h-4" /></Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/enquiry">Make an Enquiry</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === activeSlide ? "w-8 bg-gold" : "w-4 bg-primary-foreground/40 hover:bg-primary-foreground/70"
              }`}
            />
          ))}
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
            As the construction arm of Rockmould Limited, Encore Construction stands at the forefront of luxury high-rise development.  
            Our commitment to quality, innovation, and timely delivery has positioned us as a trusted force in shaping modern urban landscapes.  

            With 10 landmark projects spanning both active developments and completed masterpieces we continue to push the boundaries of architectural excellence.
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

        <PartnersMarquee logos={partnerLogos} />

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
            Ready to Build Your <span className="text-gold-gradient">Next Landmark</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Explore our portfolio of high-rise developments or speak with our team about your next project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link to="/projects">View Projects</Link>
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
