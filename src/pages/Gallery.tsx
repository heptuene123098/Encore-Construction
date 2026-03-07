import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import interiorImage from "@/assets/interior-luxury.jpg";
import heroImage from "@/assets/hero-skyline.jpg";
import teamImage from "@/assets/team.jpg";
import { useState } from "react";

const images = [
  { src: heroImage, caption: "Skyline Panorama", category: "Exterior" },
  { src: project1, caption: "Platinum Plaza", category: "Exterior" },
  { src: project2, caption: "Azure Towers Construction", category: "Construction" },
  { src: project3, caption: "Sky Gardens Towers", category: "Exterior" },
  { src: project4, caption: "Horizon Heights Progress", category: "Construction" },
  { src: project5, caption: "Crown Residences", category: "Completed" },
  { src: interiorImage, caption: "Luxury Penthouse Interior", category: "Interior" },
  { src: teamImage, caption: "Our Leadership Team", category: "Team" },
];

const categories = ["All", "Exterior", "Interior", "Construction", "Completed", "Team"];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = active === "All" ? images : images.filter(i => i.category === active);

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="text-center mb-8">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">Visual Showcase</span>
            <h1 className="font-display text-4xl font-bold text-foreground mt-2">Project <span className="text-gold-gradient">Gallery</span></h1>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
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
                key={i}
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelected(i)}
              >
                <img src={img.src} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-end">
                  <span className="text-primary-foreground text-sm font-medium p-4 opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>

          {selected !== null && (
            <div className="fixed inset-0 z-50 bg-primary/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
              <img src={filtered[selected].src} alt={filtered[selected].caption} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
              <p className="absolute bottom-8 text-primary-foreground font-display text-lg">{filtered[selected].caption}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
