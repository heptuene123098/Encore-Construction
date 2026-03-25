import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Bed, Bath, Maximize, Building2, ChevronRight, Layers, Download, Eye } from "lucide-react";
import { apartments, projects } from "@/data/projects";
import heroImage from "@/assets/interior-luxury.jpg";

const Properties = () => {
  const [bedFilter, setBedFilter] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [floorFilter, setFloorFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "area">("price-asc");

  const locations = useMemo(() => [...new Set(apartments.map(a => a.projectName))], []);

  const filtered = useMemo(() => {
    let result = apartments.filter(a => a.available);
    if (bedFilter) result = result.filter(a => a.bedrooms === bedFilter);
    result = result.filter(a => a.price >= priceRange[0] && a.price <= priceRange[1]);
    if (locationFilter) result = result.filter(a => a.projectName === locationFilter);
    if (floorFilter) {
      const [min, max] = floorFilter.split("-").map(Number);
      result = result.filter(a => a.floor >= min && a.floor <= max);
    }
    result.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return b.area - a.area;
    });
    return result;
  }, [bedFilter, priceRange, locationFilter, floorFilter, sortBy]);

  return (
    <div>
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <img src={heroImage} alt="Luxury interior" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Listings</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-2">Property Listings</h1>
          <p className="text-primary-foreground/70 mt-2">Find your perfect luxury apartment</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          {/* Enhanced Filters */}
          <div className="bg-secondary rounded-lg border border-border p-6 mb-8 space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Project / Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm text-foreground"
                >
                  <option value="">All Projects</option>
                  {locations.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Bedrooms</label>
                <select
                  value={bedFilter ?? ""}
                  onChange={(e) => setBedFilter(e.target.value ? Number(e.target.value) : null)}
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm text-foreground"
                >
                  <option value="">All</option>
                  {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} BR</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Floor Range</label>
                <select
                  value={floorFilter}
                  onChange={(e) => setFloorFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm text-foreground"
                >
                  <option value="">Any Floor</option>
                  <option value="1-5">1–5</option>
                  <option value="6-15">6–15</option>
                  <option value="16-30">16–30</option>
                  <option value="31-60">31–60</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full px-3 py-2 bg-card border border-border rounded text-sm text-foreground"
                >
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="area">Largest Area</option>
                </select>
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-muted-foreground">Price Range</label>
                <span className="text-sm font-medium text-foreground">
                  ${priceRange[0].toLocaleString()} – ${priceRange[1].toLocaleString()}
                </span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={(v) => setPriceRange(v as [number, number])}
                min={0}
                max={3000000}
                step={50000}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{filtered.length} properties found</span>
              <button
                onClick={() => { setBedFilter(null); setPriceRange([0, 3000000]); setLocationFilter(""); setFloorFilter(""); }}
                className="text-xs text-gold hover:underline"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map(apt => (
              <div key={apt.id} className="bg-card rounded-lg overflow-hidden shadow-md border border-border group hover:shadow-xl transition-shadow">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={apt.image} alt={apt.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute top-4 left-4 gold-gradient text-primary text-xs font-bold px-3 py-1 rounded-full">
                    ${apt.price.toLocaleString()}
                  </div>
                  <div className="absolute top-4 right-4 bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded">
                    Floor {apt.floor}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">{apt.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <Building2 className="w-3.5 h-3.5 text-gold" /> {apt.projectName}
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {apt.bedrooms} BR</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {apt.bathrooms} BA</span>
                    <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {apt.area} sqft</span>
                  </div>
                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {apt.amenities.slice(0, 3).map(a => (
                      <span key={a} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded">{a}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="gold" size="sm" className="flex-1" asChild>
                      <Link to={`/reserve/${apt.id}`}>Reserve Unit</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/enquiry?property=${apt.id}`}>Enquire</Link>
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button variant="ghost" size="sm" className="flex-1 text-xs text-muted-foreground">
                      <Download className="w-3 h-3" /> Brochure
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" /> Virtual Tour
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No properties match your filters.</p>
              <button onClick={() => { setBedFilter(null); setPriceRange([0, 3000000]); setLocationFilter(""); setFloorFilter(""); }} className="text-gold hover:underline mt-2 text-sm">Reset all filters</button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
