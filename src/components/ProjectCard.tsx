import { Link } from "react-router-dom";
import { MapPin, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border">
    <div className="relative overflow-hidden aspect-[4/3]">
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {project.status === "active" && project.progress !== undefined && (
        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 backdrop-blur-sm px-4 py-2">
          <div className="flex items-center justify-between text-sm text-primary-foreground mb-1">
            <span>Progress</span>
            <span className="text-gold font-semibold">{project.progress}%</span>
          </div>
          <div className="w-full bg-primary-foreground/20 rounded-full h-1.5">
            <div className="gold-gradient h-1.5 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
      )}
      {project.status === "completed" && (
        <div className="absolute top-4 right-4 gold-gradient text-primary text-xs font-bold px-3 py-1 rounded-full">
          Completed {project.completionYear}
        </div>
      )}
    </div>
    <div className="p-5">
      <h3 className="font-display text-xl font-semibold text-foreground mb-1">{project.name}</h3>
      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
        <MapPin className="w-3.5 h-3.5 text-gold" /> {project.location}
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Building2 className="w-3.5 h-3.5" /> {project.floors} Floors · {project.units} Units
        </div>
        <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80 p-0" asChild>
          <Link to={`/projects/${project.id}`}>
            Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  </div>
);

export default ProjectCard;
