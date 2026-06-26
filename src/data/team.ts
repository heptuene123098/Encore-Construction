import teamImage from "@/assets/team.jpg";
import teamImage1 from "@/assets/team1.jpg";
import teamImage2 from "@/assets/team2.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

import toba from "@/assets/images/toba.png";
import funmbi from "@/assets/images/funmbi.png";
import hebz from "@/assets/images/hebz.jpg";
import dorcas from "@/assets/images/dorcas.jpg";
import pemu from "@/assets/images/pemu.jpg";
import pelu from "@/assets/images/pelu.jpg";
import akeem from "@/assets/images/akeem.png";
import gabriel from "@/assets/images/gabriel.jpg";
import korede from "@/assets/images/korede.jpg";
import ife from "@/assets/images/ife.jpg";
import ruth from "@/assets/images/ruth.jpg";
import titi from "@/assets/images/titi.jpg";
import mary from "@/assets/images/mary.jpg";
import moses from "@/assets/images/moses.jpg";
import aba from "@/assets/images/aba.png";
import wale from "@/assets/images/wale.png";
import dummy from "@/assets/images/dummy.jpg";

export type TimelineEntry = { year: string; title: string; description: string };
export type Certification = { name: string; issuer: string; year: string };
export type QAItem = { question: string; answer: string };
export type MediaItem = {
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  caption?: string;
  project?: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  department: string;
  location: string;
  joinedYear: string;
  headshot: string;
  candidShot: string;
  introVideo?: string;
  linkedinUrl: string;
  bio: string;
  strengths: string[];
  timeline: TimelineEntry[];
  certifications: Certification[];
  qa: QAItem[];
  mediaTag: string;
  mediaFeed: MediaItem[];
};

const candids = [teamImage, teamImage1, teamImage2];
const sampleMedia: MediaItem[] = [
  { type: "image", src: project1, caption: "Site walk-through", project: "The Good Place Ilasan" },
  { type: "image", src: project2, caption: "Concrete pour milestone", project: "Maison 6 Mosely" },
  { type: "image", src: project3, caption: "Reviewing structural drawings", project: "The Rock VI" },
  { type: "image", src: project4, caption: "Handover inspection", project: "Stainless Point" },
  { type: "image", src: project5, caption: "Team briefing", project: "The Good Place Iyamu" },
  { type: "image", src: project6, caption: "Quality check", project: "Rock Apartment Glover" },
];

const defaultQA = (name: string): QAItem[] => [
  { question: "Favorite project so far?", answer: "Every site has a story — but the first slab pour always feels special." },
  { question: "Tool you can't work without?", answer: "A laser distance meter and a notebook. Old school meets new school." },
  { question: "Best on-site lesson?", answer: "Measure twice, communicate three times. Coordination wins jobs." },
  { question: "What clients say about working with you?", answer: "They tell me I over-communicate. I take that as a compliment." },
  { question: "Morning routine before site?", answer: "Coffee, daily plan review, then boots on by 7am." },
  { question: "Why Encore?", answer: `Encore promoted me, trained me, and trusted me. I'm building a career here, not just buildings.` },
];

const defaultTimeline = (joined: string): TimelineEntry[] => [
  { year: joined, title: "Joined Encore", description: "Onboarded into the team and assigned to active project delivery." },
  { year: `${parseInt(joined) + 1}`, title: "Promoted within team", description: "Took on expanded scope after delivering ahead of schedule." },
  { year: "2025", title: "Current role", description: "Leading site teams and mentoring incoming staff." },
];

const defaultCerts = (): Certification[] => [
  { name: "HSE Level 2", issuer: "NEBOSH", year: "2023" },
  { name: "Project Management Essentials", issuer: "Encore Academy", year: "2024" },
];

const make = (
  i: number,
  name: string,
  role: string,
  department: string,
  image: string,
  bio: string,
  joinedYear = "2022",
  overrides: Partial<TeamMember> = {}
): TeamMember => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    slug,
    name,
    role,
    department,
    location: "Lagos, Nigeria",
    joinedYear,
    headshot: image,
    candidShot: candids[i % candids.length],
    introVideo: undefined,
    linkedinUrl: "https://www.linkedin.com/",
    bio,
    strengths: ["Site delivery", "Team leadership", "Quality assurance"],
    timeline: defaultTimeline(joinedYear),
    certifications: defaultCerts(),
    qa: defaultQA(name),
    mediaTag: `#${slug}`,
    mediaFeed: sampleMedia,
    ...overrides,
  };
};

export const teamMembers: TeamMember[] = [
  make(0, "Toba Ooye", "CEO & Founder", "Executive", toba,
    "Visionary leader with 10+ years in construction and real estate development. Toba founded Encore to deliver world-class high-rise residences across Africa.",
    "2021",
    {
      strengths: ["Vision & strategy", "Real estate development", "Stakeholder management"],
      timeline: [
        { year: "2021", title: "Founded Encore Construction", description: "Launched the company under the Rockmould brand." },
        { year: "2022", title: "First high-rise delivered", description: "Completed flagship project and grew the team to 20+." },
        { year: "2024", title: "Multi-site operations", description: "Scaled to 6 concurrent active developments across Lagos." },
      ],
      certifications: [
        { name: "MBA, Real Estate", issuer: "Lagos Business School", year: "2019" },
        { name: "PMP", issuer: "PMI", year: "2020" },
      ],
    }
  ),
  make(1, "Oluwafunmbi Ajayi", "QA/QC Manager", "Quality", funmbi,
    "Ensures world-class quality standards across all projects through rigorous inspection and process discipline.", "2022"),
  make(2, "Gabriel Oluwadurotimi", "MEP Manager", "Engineering", gabriel,
    "Specialist in mechanical, electrical, and plumbing systems for high-rise developments.", "2022"),
  make(3, "Akorede Akinpelu", "Survey Manager", "Survey", korede,
    "Precision surveying for all project developments — from setting out to as-built verification.", "2022"),
  make(4, "Joseph Ogunleye", "QA/QC Asst. Manager", "Quality", dummy,
    "Supports quality control operations across active sites with a sharp eye for detail.", "2023"),
  make(5, "Hephzibah Otuene", "Project Manager", "Delivery", hebz,
    "Drives project delivery within budget and timeline across multiple concurrent sites.", "2022"),
  make(6, "Dorcas Akpan", "Quantity Surveyor", "Commercial", dorcas,
    "Cost management and quantity surveying support across active developments.", "2023"),
  make(7, "Pemunu Esheyigba", "Quantity Surveyor Assistant", "Commercial", pemu,
    "Material estimation and procurement coordination for live sites.", "2023"),
  make(8, "Akeem Aremu", "Quantity Surveyor", "Commercial", akeem,
    "Cost tracking and financial reporting for Encore's project portfolio.", "2022"),
  make(9, "Pelumi Arinloye", "Project Support", "Operations", pelu,
    "Administrative and logistics coordination keeping site teams running smoothly.", "2023"),
  make(10, "Ifeoluwa Bolaji", "QA/QC Assistant", "Quality", ife,
    "Site inspection and quality documentation across active developments.", "2024"),
  make(11, "Ruth Odunayo", "QA/QC Assistant", "Quality", ruth,
    "Quality assurance testing and reporting with a methodical approach.", "2024"),
  make(12, "Foyeke Oyedokun", "QA/QC Assistant", "Quality", titi,
    "Construction compliance and standards enforcement on-site.", "2024"),
  make(13, "Ridwan Atanda", "Construction Manager, GPI", "Site Leadership", dummy,
    "Oversees The Good Place Ilasan construction from foundation to handover.", "2022"),
  make(14, "Afolakemi Talabi", "Construction Manager, GPL", "Site Leadership", dummy,
    "Manages The Good Place Iyamu development with a focus on quality and timeline.", "2022"),
  make(15, "Sodiq Adebanji", "Construction Manager, M6M", "Site Leadership", wale,
    "Leads Maison 6 Mosely project delivery and on-site coordination.", "2022"),
  make(16, "Mary Obafemi", "Construction Manager, MOM", "Site Leadership", mary,
    "Oversees The Rock Apartment Victoria Island with hands-on site leadership.", "2022"),
  make(17, "Moses Ogunfowora", "Construction Manager, RAG", "Site Leadership", moses,
    "Manages The Rock Apartment Glover Road project delivery.", "2022"),
  make(18, "Olalekan Abanikanda", "Construction Manager, SPA", "Site Leadership", aba,
    "Leads The Stainless Point development with deep field experience.", "2022"),
];

export const getTeamMemberBySlug = (slug: string) =>
  teamMembers.find((m) => m.slug === slug);
