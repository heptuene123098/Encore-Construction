import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Target, Eye, Award, Shield, Building2, ChevronRight } from "lucide-react";

import teamImage from "@/assets/team.jpg";
import teamImage1 from "@/assets/team1.jpg";
import teamImage2 from "@/assets/team2.jpg";
import heroImage from "@/assets/hero-skyline.jpg";

import toba from "../assets/images/toba.png";
import funmbi from "../assets/images/funmbi.png";
import seyi from "../assets/images/seyi.png";
import hebz from "../assets/images/hebz.jpg";
import dorcas from "../assets/images/dorcas.jpg";
import pemu from "../assets/images/pemu.jpg";
import pelu from "../assets/images/pelu.jpg";
import floyd from "../assets/images/floyd.jpg";
import akeem from "../assets/images/akeem.png";
import gabriel from "../assets/images/gabriel.jpg";
import korede from "../assets/images/korede.jpg";
import ife from "../assets/images/ife.jpg";
import ruth from "../assets/images/ruth.jpg";
import titi from "../assets/images/titi.jpg";
import mary from "../assets/images/mary.jpg";
import douglas from "../assets/images/douglas.jpg";
import moses from "../assets/images/moses.jpg";
import aba from "../assets/images/aba.png";
import wale from "../assets/images/wale.png";

const teamImages = [teamImage, teamImage1, teamImage2];

const leadership = [
  { name: "Toba Ooye", role: "CEO & Founder",   image: toba },
  { name: "Oluwafunmbi Ajayi", role: "QA/QC Manager",image: funmbi },
  { name: "Oluseyi Olure", role: "QA/QC Manager", image: seyi },
  { name: "Gabriel Oluwadurotimi", role: "MEP Manager",  image: gabriel },
  { name: "Akorede Akinpelu", role: "Survey Manager",image: korede },
  { name: "Joseph Ogunleye", role: "QA/QC Asst. Manager",  image: seyi },
  { name: "Hephzibah Otuene", role: "Project Manager",image: hebz },
  { name: "Dorcas Akpan", role: "QS Assistant",image: dorcas },
  { name: "Pemunu Esheyigba", role: "QS Assistant", image: pemu },
  { name: "Akeem Aremu", role: "QS Assistant",  image: akeem },
  { name: "Pelumi Arinloye", role: "Project Support", image: pelu },
  { name: "Ifeoluwa Bolaji", role: "QA/QC Assistant", image: ife },
  { name: "Ruth Odunayo", role: "QA/QC Assistant", image: ruth },
  { name: "Foyeke Oyedokun", role: "QA/QC Assistant", image: titi },
  { name: "Floyd Adada", role: "QA/QC Assistant",image: floyd },
  { name: "Ridwan Atanda", role: "Construction Manager, GPI",image: floyd },
  { name: "Afolakemi Talabi", role: "Construction Manager, GPL", image: floyd },
  { name: "Sodiq Adebanji", role: "Construction Manager, M6M", image: wale },
  { name: "Mary Obafemi", role: "Construction Manager, MOM", image: mary },
  { name: "Moses Ogunfowora", role: "Construction Manager, RAG", image: moses },
  { name: "Olalekan Abanikanda", role: "Construction Manager, SPA", image: aba },
  { name: "Douglas Igbinedion", role: "Construction Manager, TAC", image: douglas },
];

const About = () => {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % teamImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <img src={heroImage} alt="Skyline" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />

        <div className="relative z-10 container-wide mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Our Story</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mt-2">
            About <span className="text-gold-gradient">Encore</span>
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-wide mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Crafting <span className="text-gold-gradient">Iconic</span> Skylines Since 202
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded with a bold vision to redefine urban living, Elevate Developments has rapidly established 
              itself as a premier high-rise construction and real estate development company.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Our team of world-class architects, engineers, and designers work together to create residences 
              that are more than buildings—they are communities, statements, and legacies.
            </p>
          </div>

          {/* Auto-changing Image */}
          <img
            src={teamImages[index]}
            alt="Leadership team"
            className="rounded-lg shadow-xl w-full h-80 object-cover transition-opacity duration-700"
            loading="lazy"
          />

        </div>
      </section>

    {/* Mission & Vision */}
    <section className="section-padding bg-secondary">
      <div className="container-wide mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
          <Target className="w-10 h-10 text-gold mb-4" />
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">Our Mission</h3>
          <p className="text-muted-foreground leading-relaxed">
            To deliver exceptional high-rise residences that combine architectural brilliance, 
            sustainable practices, and unmatched quality—creating spaces where families thrive 
            and investments flourish.
          </p>
        </div>
        <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
          <Eye className="w-10 h-10 text-gold mb-4" />
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">Our Vision</h3>
          <p className="text-muted-foreground leading-relaxed">
            To be the most trusted and innovative real estate developer, known for transforming 
            city skylines and setting global standards in luxury construction and sustainable urban development.
          </p>
        </div>
      </div>
    </section>

    {/* Leadership */}
    <section className="section-padding">
      <div className="container-wide mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Leadership</span>
          <h2 className="font-display text-3xl font-bold text-foreground mt-2">Meet Our <span className="text-gold-gradient">Team</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {leadership.map((member) => (
            <div key={member.name} className="text-center p-6 bg-card rounded-lg border border-border shadow-sm">
              <div className="w-20 h-20 gold-gradient rounded-full mx-auto mb-4 flex items-center justify-center">
                <img src={member.image} alt={member.name} className="w-full rounded-full object-cover" />
              </div>
              <h4 className="font-display text-lg font-semibold text-foreground">{member.name}</h4>
              <div className="text-gold text-sm font-medium">{member.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Certifications */}
    <section className="section-padding navy-gradient">
      <div className="container-wide mx-auto text-center">
        <h2 className="font-display text-3xl font-bold text-primary-foreground mb-8">
          Certifications & <span className="text-gold-gradient">Partnerships</span>
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Award, label: "ISO 9001:2015 Certified" },
            { icon: Shield, label: "LEED Gold Standard" },
            { icon: Building2, label: "National Builders Association" },
          ].map((cert) => (
            <div key={cert.label} className="bg-primary-foreground/5 border border-gold/10 rounded-lg p-6">
              <cert.icon className="w-10 h-10 text-gold mx-auto mb-3" />
              <p className="text-primary-foreground text-sm font-medium">{cert.label}</p>
            </div>
          ))}
        </div>
        <Button variant="gold" size="lg" className="mt-10" asChild>
          <Link to="/contact">Get in Touch <ChevronRight className="w-4 h-4" /></Link>
        </Button>
      </div>
    </section>
  </div>
);
}

export default About;
