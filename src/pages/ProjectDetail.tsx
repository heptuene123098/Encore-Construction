import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  MapPin, Building2, BedDouble, Maximize, Home, ChevronRight, Play,
  CheckCircle2, Waves, Dumbbell, TreePine, Baby, Briefcase, Leaf,
  School, Hospital, ShoppingBag, Utensils, Bus, Church, Landmark,
  Download, Phone, Calculator, CalendarCheck, Share2, X, ChevronLeft,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { projects } from "@/data/projects";
import { projectDetails } from "@/data/projectDetails";
import type { Project } from "@/data/projects";
import type { ProjectDetail as ProjectDetailType } from "@/data/projectDetails";

const amenityCategoryIcons: Record<string, React.ReactNode> = {
  Wellness: <Waves className="w-5 h-5" />,
  Lifestyle: <Dumbbell className="w-5 h-5" />,
  Family: <Baby className="w-5 h-5" />,
  Convenience: <Briefcase className="w-5 h-5" />,
  Business: <Briefcase className="w-5 h-5" />,
  Green: <Leaf className="w-5 h-5" />,
  Tech: <Building2 className="w-5 h-5" />,
  Culture: <Landmark className="w-5 h-5" />,
  Service: <CheckCircle2 className="w-5 h-5" />,
  Exclusive: <Home className="w-5 h-5" />,
};

const nearbyIcons: Record<string, React.ReactNode> = {
  school: <School className="w-4 h-4" />,
  hospital: <Hospital className="w-4 h-4" />,
  "shopping-bag": <ShoppingBag className="w-4 h-4" />,
  trees: <TreePine className="w-4 h-4" />,
  utensils: <Utensils className="w-4 h-4" />,
  bus: <Bus className="w-4 h-4" />,
  church: <Church className="w-4 h-4" />,
  landmark: <Landmark className="w-4 h-4" />,
  briefcase: <Briefcase className="w-4 h-4" />,
};

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);
  const detail = id ? projectDetails[id] : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return projects
      .filter((p) => p.id !== project.id && p.status === project.status)
      .slice(0, 3);
  }, [project]);

  if (!project || !detail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Button asChild variant="gold">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div>
      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-background hover:text-accent" onClick={() => setLightboxOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-4 text-background hover:text-accent"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i > 0 ? i - 1 : lightboxImages.length - 1)); }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={lightboxImages[lightboxIndex]}
            alt=""
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 text-background hover:text-accent"
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i < lightboxImages.length - 1 ? i + 1 : 0)); }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 text-background text-sm">
            {lightboxIndex + 1} / {lightboxImages.length}
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-20">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-4">
            <Link to="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/projects" className="hover:text-accent">Projects</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary-foreground">{project.name}</span>
          </nav>
          <Badge className={project.status === "active" ? "gold-gradient text-primary border-0 mb-3" : "bg-accent/20 text-accent border-0 mb-3"}>
            {project.status === "active" ? `${project.progress}% Complete` : `Completed ${project.completionYear}`}
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground">{project.name}</h1>
          <p className="text-accent text-lg mt-2 font-medium">{detail.tagline}</p>
          <div className="flex items-center gap-2 text-primary-foreground/80 mt-3">
            <MapPin className="w-4 h-4 text-accent" /> {project.location}
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="sticky top-16 z-30 bg-card border-b border-border shadow-sm">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-display font-semibold text-foreground truncate">{project.name}</span>
            <span className="text-accent font-semibold text-sm hidden sm:inline">{project.priceRange}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/enquiry?project=${project.id}`}><Phone className="w-3.5 h-3.5" /> Enquire</Link>
            </Button>
            {detail.brochureUrl && (
              <Button variant="outline" size="sm"><Download className="w-3.5 h-3.5" /> Brochure</Button>
            )}
            <Button variant="gold" size="sm" asChild>
              <Link to={`/reserve/${project.id}`}>Reserve Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { icon: <Home className="w-5 h-5 text-accent" />, label: "Type", value: detail.propertyType },
              { icon: <BedDouble className="w-5 h-5 text-accent" />, label: "Bedrooms", value: detail.bedrooms },
              { icon: <Maximize className="w-5 h-5 text-accent" />, label: "Built Area", value: detail.builtArea },
              { icon: <Building2 className="w-5 h-5 text-accent" />, label: "Floors", value: `${project.floors} Floors` },
              { icon: <Home className="w-5 h-5 text-accent" />, label: "Units", value: project.availableUnits !== undefined ? `${project.availableUnits} of ${project.units} available` : `${project.units} total` },
              { icon: <MapPin className="w-5 h-5 text-accent" />, label: "Price Range", value: project.priceRange },
            ].map((item, i) => (
              <div key={i} className="bg-secondary rounded-lg p-4 text-center">
                <div className="flex justify-center mb-2">{item.icon}</div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          {project.status === "active" && project.progress !== undefined && (
            <div className="mt-8 bg-secondary rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-display font-semibold text-foreground">Construction Progress</span>
                <span className="text-accent font-bold text-lg">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-3" />
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      {detail.videoUrl && (
        <section className="section-padding bg-secondary">
          <div className="container-wide mx-auto">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Video Tour</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-8">Experience <span className="text-gold-gradient">{project.name}</span></h2>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              {showVideo ? (
                <iframe
                  src={detail.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Project video"
                />
              ) : (
                <div className="relative cursor-pointer group" onClick={() => setShowVideo(true)}>
                  <img src={detail.videoThumbnail || project.image} alt="Video thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center group-hover:bg-foreground/40 transition-colors">
                    <div className="w-20 h-20 rounded-full gold-gradient flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-primary fill-current ml-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* First Writeup - The Vision */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">The Vision</span>
              <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-6">About <span className="text-gold-gradient">{project.name}</span></h2>
              {detail.overviewWriteup.split("\n\n").map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {detail.gallery.exterior.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.name} exterior ${i + 1}`}
                  className="rounded-lg object-cover w-full aspect-square cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openLightbox(detail.gallery.exterior, i)}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-secondary">
        <div className="container-wide mx-auto">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Gallery</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-8">Project <span className="text-gold-gradient">Gallery</span></h2>
          <Tabs defaultValue="interior">
            <TabsList className="mb-6 flex-wrap">
              <TabsTrigger value="interior">Interior</TabsTrigger>
              <TabsTrigger value="exterior">Exterior</TabsTrigger>
              <TabsTrigger value="floorplans">Floor Plans</TabsTrigger>
              {detail.gallery.liveUpdates.length > 0 && <TabsTrigger value="updates">Live Updates</TabsTrigger>}
            </TabsList>
            {(["interior", "exterior", "floorplans"] as const).map((tab) => {
              const images = tab === "floorplans" ? detail.gallery.floorPlans : detail.gallery[tab];
              return (
                <TabsContent key={tab} value={tab === "floorplans" ? "floorplans" : tab}>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`${tab} ${i + 1}`}
                        className="rounded-lg object-cover w-full aspect-[4/3] cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openLightbox(images, i)}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </TabsContent>
              );
            })}
            {detail.gallery.liveUpdates.length > 0 && (
              <TabsContent value="updates">
                <div className="space-y-6">
                  {detail.gallery.liveUpdates.map((update, i) => (
                    <div key={i} className="flex flex-col sm:flex-row gap-4 bg-card rounded-lg p-4 border border-border">
                      <img
                        src={update.image}
                        alt={update.caption}
                        className="w-full sm:w-48 h-36 object-cover rounded-lg cursor-pointer"
                        onClick={() => openLightbox(detail.gallery.liveUpdates.map((u) => u.image), i)}
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{new Date(update.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                        <p className="font-semibold text-foreground mt-1">{update.caption}</p>
                        {update.progressPercentage !== undefined && (
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-accent font-semibold">{update.progressPercentage}%</span>
                            </div>
                            <Progress value={update.progressPercentage} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>

      {/* Unit Features */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Features</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-8">Unit <span className="text-gold-gradient">Features</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {detail.unitFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-secondary rounded-lg p-4">
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                <span className="text-foreground text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On-Site Amenities */}
      <section className="section-padding bg-secondary">
        <div className="container-wide mx-auto">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Amenities</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-8">On-Site <span className="text-gold-gradient">Amenities</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {detail.onSiteAmenities.map((cat, i) => (
              <div key={i} className="bg-card rounded-lg p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-primary">
                    {amenityCategoryIcons[cat.category] || <CheckCircle2 className="w-5 h-5" />}
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-lg">{cat.category}</h3>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-muted-foreground text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Amenities */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Neighborhood</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-8">Nearby <span className="text-gold-gradient">Amenities</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {detail.nearbyAmenities.map((amenity, i) => (
              <div key={i} className="flex items-center gap-4 bg-secondary rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  {nearbyIcons[amenity.icon] || <MapPin className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{amenity.name}</p>
                  <p className="text-xs text-muted-foreground">{amenity.category} · {amenity.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Writeup - The Experience */}
      <section className="section-padding bg-secondary">
        <div className="container-wide mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={detail.gallery.interior[0]}
                alt={`${project.name} interior`}
                className="rounded-lg object-cover w-full aspect-[4/3] cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(detail.gallery.interior, 0)}
                loading="lazy"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">The Experience</span>
              <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-6">Living at <span className="text-gold-gradient">{project.name}</span></h2>
              {detail.experienceWriteup.split("\n\n").map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brochure Download */}
      <section className="section-padding">
        <div className="container-wide mx-auto">
          <div className="bg-primary rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Download Project Brochure</h3>
              <p className="text-primary-foreground/70">Get the complete project details, floor plans, and pricing in a beautifully designed PDF.</p>
            </div>
            <Button variant="gold" size="lg" className="shrink-0">
              <Download className="w-5 h-5" /> Download PDF
            </Button>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-wide mx-auto">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Explore More</span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-2 mb-8">Related <span className="text-gold-gradient">Projects</span></h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((rp) => (
                <Link key={rp.id} to={`/projects/${rp.id}`} className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-border">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-foreground">{rp.name}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                      <MapPin className="w-3.5 h-3.5 text-accent" /> {rp.location}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-semibold text-accent">{rp.priceRange}</span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-wide mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Interested in <span className="text-gold-gradient">{project.name}</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Take the next step towards owning your dream home. Contact our team for a personalized consultation or schedule a private viewing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="gold" size="lg" asChild>
              <Link to={`/enquiry?project=${project.id}`}><Phone className="w-5 h-5" /> Contact Us</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to={`/mortgage-calculator`}><Calculator className="w-5 h-5" /> Mortgage Calculator</Link>
            </Button>
            {project.status === "active" && (
              <Button variant="navy" size="lg" asChild>
                <Link to={`/reserve/${project.id}`}><CalendarCheck className="w-5 h-5" /> Reserve a Unit</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
