import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import heroImage from "@/assets/hero-skyline.jpg";

const Projects = () => {
  const active = projects.filter(p => p.status === "active");
  const completed = projects.filter(p => p.status === "completed");

  return (
    <div>
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <img src={heroImage} alt="Skyline" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Portfolio</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-2">Our Projects</h1>
          <p className="text-primary-foreground/80 mt-2 max-w-xl">
            {active.length} active developments and {completed.length} successfully delivered masterpieces.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Under Construction</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2">Active <span className="text-gold-gradient">Projects</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {active.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-wide mx-auto">
          <div className="mb-12">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Delivered</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2">Completed <span className="text-gold-gradient">Projects</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completed.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
