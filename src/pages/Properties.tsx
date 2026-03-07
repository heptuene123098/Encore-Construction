import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, Building2, ChevronRight } from "lucide-react";
import { apartments } from "@/data/projects";
import heroImage from "@/assets/interior-luxury.jpg";

const Properties = () => {
  const [bedFilter, setBedFilter] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "area">("price-asc");

  const filtered = useMemo(() => {
    let result = apartments.filter(a => a.available);
    if (bedFilter) result = result.filter(a => a.bedrooms === bedFilter);
    if (priceMax) result = result.filter(a => a.price <= priceMax);
    result.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return b.area - a.area;
    });
    return result;
  }, [bedFilter, priceMax, sortBy]);

  return (
    <div>
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <img src={heroImage} alt="Luxury interior" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Listings</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-2">Property Listings</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 p-4 bg-secondary rounded-lg border border-border">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Bedrooms</label>
              <select
                value={bedFilter ?? ""}
                onChange={(e) => setBedFilter(e.target.value ? Number(e.target.value) : null)}
                className="px-3 py-2 bg-card border border-border rounded text-sm text-foreground"
              >
                <option value="">All</option>
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} BR</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Max Price</label>
              <select
                value={priceMax ?? ""}
                onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : null)}
                className="px-3 py-2 bg-card border border-border rounded text-sm text-foreground"
              >
                <option value="">Any</option>
                <option value="500000">$500K</option>
                <option value="1000000">$1M</option>
                <option value="2000000">$2M</option>
                <option value="3000000">$3M</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 bg-card border border-border rounded text-sm text-foreground"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area">Largest Area</option>
              </select>
            </div>
            <div className="flex items-end">
              <span className="text-sm text-muted-foreground">{filtered.length} properties found</span>
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
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">{apt.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <Building2 className="w-3.5 h-3.5 text-gold" /> {apt.projectName}
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {apt.bedrooms} BR</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {apt.bathrooms} BA</span>
                    <span className="flex items-center gap-1"><Maximize className="w-3.5 h-3.5" /> {apt.area} sqft</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="gold" size="sm" className="flex-1" asChild>
                      <Link to={`/reserve/${apt.id}`}>Reserve Unit</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/enquiry?property=${apt.id}`}>Enquire</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;
