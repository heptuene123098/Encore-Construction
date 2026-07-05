import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";
import project8 from "@/assets/project-8.jpg";
import interiorImage from "@/assets/interior-luxury.jpg";
import heroImage from "@/assets/hero-skyline.jpg";
import teamImage from "@/assets/team.jpg";
import teamImage1 from "@/assets/team1.jpg";
import teamImage2 from "@/assets/team2.jpg";
import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  // Completed Projects
  { src: project5, caption: "The Rock Apartment — Completed", category: "Completed" },
  { src: project7, caption: "The One Villa — Completed", category: "Completed" },
  // Exterior
  { src: heroImage, caption: "Lagos Skyline Panorama", category: "Exterior" },
  { src: project1, caption: "The Good Place — Exterior View", category: "Exterior" },
  { src: project3, caption: "The Rock Apartment — Glover Road", category: "Exterior" },
  { src: project6, caption: "The Stainless Point — Ikoyi", category: "Exterior" },
  { src: project8, caption: "The Good Place — Lekki", category: "Exterior" },
  // Construction Progress
  { src: project2, caption: "Maison 6 — 90% Complete", category: "Construction" },
  { src: project4, caption: "The Rock Apartment — Foundation Phase", category: "Construction" },
  // Interior
  { src: interiorImage, caption: "Luxury Penthouse Interior — Living Room", category: "Interior" },
  // Team
  { src: teamImage, caption: "Encore Leadership Team", category: "Team" },
  { src: teamImage1, caption: "On-Site Team", category: "Team" },
  { src: teamImage2, caption: "Project Coordination", category: "Team" },
  // Aerial
  { src: project1, caption: "Aerial View — The Good Place Site", category: "Aerial" },
  { src: project3, caption: "Drone Shot — Rock Apartment Complex", category: "Aerial" },
];

const categories = ["All", "Completed", "Exterior", "Construction", "Interior", "Team", "Aerial"];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = active === "All" ? images : images.filter(i => i.category === active);

  const navigate = useCallback((dir: 1 | -1) => {
    if (selected === null) return;
    setSelected((selected + dir + filtered.length) % filtered.length);
  }, [selected, filtered.length]);

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center mb-8">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Visual Showcase</span>
            <h1 className="font-display text-4xl font-bold text-foreground mt-2">Project <span className="text-gold-gradient">Gallery</span></h1>
            <p className="text-muted-foreground mt-2">Explore our completed projects, construction progress, luxury interiors, and more</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setSelected(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === cat ? "gold-gradient text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelected(i)}
              >
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-end">
                  <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-primary-foreground text-sm font-medium">{img.caption}</span>
                    <span className="block text-gold text-xs mt-1">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox */}
          {selected !== null && (
            <div
              className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <button
                className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground z-10"
                onClick={() => setSelected(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/80 hover:text-primary-foreground z-10 bg-primary/50 rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/80 hover:text-primary-foreground z-10 bg-primary/50 rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="text-center" onClick={e => e.stopPropagation()}>
                <img src={filtered[selected].src} alt={filtered[selected].caption} className="max-w-full max-h-[80vh] object-contain rounded-lg" />
                <p className="text-primary-foreground font-display text-lg mt-4">{filtered[selected].caption}</p>
                <p className="text-gold text-sm">{selected + 1} / {filtered.length}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
