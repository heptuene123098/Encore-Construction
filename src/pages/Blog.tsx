import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project3 from "@/assets/project-3.jpg";
import project5 from "@/assets/project-5.jpg";

const posts = [
  {
    slug: "azure-towers-milestone",
    title: "Azure Towers Reaches 72% Completion",
    excerpt: "Our flagship development in the Downtown Business District has hit a major milestone...",
    date: "Feb 28, 2026",
    image: project1,
    category: "Project Update",
  },
  {
    slug: "sustainable-building",
    title: "The Future of Sustainable High-Rise Living",
    excerpt: "How Elevate Developments is leading the charge in eco-friendly luxury construction...",
    date: "Feb 15, 2026",
    image: project3,
    category: "Industry Insights",
  },
  {
    slug: "crown-residences-handover",
    title: "Crown Residences: Full Handover Complete",
    excerpt: "All 120 units have been successfully handed over to delighted homeowners...",
    date: "Jan 30, 2026",
    image: project5,
    category: "Milestone",
  },
];

const Blog = () => (
  <div className="pt-20">
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">News & Updates</span>
          <h1 className="font-display text-4xl font-bold text-foreground mt-2">Our <span className="text-gold-gradient">Blog</span></h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.slug} className="bg-card rounded-lg overflow-hidden shadow-md border border-border group hover:shadow-xl transition-shadow">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded">{post.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80 p-0">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
