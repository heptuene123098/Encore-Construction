import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, MapPin } from "lucide-react";
import { projects } from "@/data/projects";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Project coordinates (Lagos area)
const projectCoords: Record<string, [number, number]> = {
  M6M: [6.4541, 3.4346],   // Ikoyi
  MOM: [6.4281, 3.4219],   // Victoria Island
  RAG: [6.4510, 3.4380],   // Ikoyi Glover Rd
  GPI: [6.4344, 3.4743],   // Lekki
  GPL: [6.4380, 3.4800],   // Lekki
  SPA: [6.4530, 3.4320],   // Ikoyi Luggard
  RBM: [6.4320, 3.4700],   // Lekki Phase 1
  OVL: [6.4550, 3.4310],   // Ikoyi Lugard Ave
};

const goldIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconRetinaUrl: markerIcon2x,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const ProjectMap = () => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter(p => p.status === filter);
  }, [filter]);

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center mb-8">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Locations</span>
            <h1 className="font-display text-4xl font-bold text-foreground mt-2">
              Project <span className="text-gold-gradient">Map</span>
            </h1>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {(["all", "active", "completed"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                  filter === f ? "gold-gradient text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All Projects" : f}
              </button>
            ))}
          </div>

          <div className="rounded-lg overflow-hidden border border-border shadow-lg" style={{ height: "500px" }}>
            <MapContainer center={[6.445, 3.45]} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filtered.map(project => {
                const coords = projectCoords[project.id];
                if (!coords) return null;
                return (
                  <Marker key={project.id} position={coords} icon={goldIcon}>
                    <Popup>
                      <div className="text-center min-w-[180px]">
                        <img src={project.image} alt={project.name} className="w-full h-24 object-cover rounded mb-2" />
                        <h3 className="font-bold text-sm">{project.name}</h3>
                        <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                          <MapPin className="w-3 h-3" /> {project.location}
                        </p>
                        <p className="text-xs mt-1">
                          {project.status === "active" ? (
                            <span className="text-green-600 font-medium">{project.progress}% Complete</span>
                          ) : (
                            <span className="text-blue-600 font-medium">Completed {project.completionYear}</span>
                          )}
                        </p>
                        <Link to="/projects" className="text-xs text-blue-500 underline mt-1 inline-block">View Details</Link>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-gold" /> {projects.filter(p => p.status === "active").length} Active</span>
            <span className="flex items-center gap-2"><Building2 className="w-4 h-4 text-navy" /> {projects.filter(p => p.status === "completed").length} Completed</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectMap;
