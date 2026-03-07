import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";

export interface Project {
  id: string;
  name: string;
  location: string;
  status: "active" | "completed";
  progress?: number;
  completionYear?: number;
  image: string;
  units: number;
  availableUnits?: number;
  priceRange: string;
  description: string;
  floors: number;
  amenities: string[];
}

export interface Apartment {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  floor: number;
  price: number;
  image: string;
  available: boolean;
  amenities: string[];
}

export const projects: Project[] = [
  {
    id: "azure-towers",
    name: "Azure Towers",
    location: "Downtown Business District",
    status: "active",
    progress: 72,
    image: project2,
    units: 240,
    availableUnits: 85,
    priceRange: "$350,000 - $1,200,000",
    description: "A stunning 45-floor twin tower development featuring panoramic city views and world-class amenities.",
    floors: 45,
    amenities: ["Pool", "Gym", "Concierge", "Parking", "Rooftop Garden"],
  },
  {
    id: "horizon-heights",
    name: "Horizon Heights",
    location: "Waterfront Promenade",
    status: "active",
    progress: 55,
    image: project4,
    units: 180,
    availableUnits: 120,
    priceRange: "$420,000 - $1,800,000",
    description: "A prestigious 52-floor waterfront residence with unparalleled ocean views and luxury finishes.",
    floors: 52,
    amenities: ["Marina", "Spa", "Tennis Court", "Private Beach", "Helipad"],
  },
  {
    id: "sky-gardens",
    name: "Sky Gardens Residences",
    location: "Central Park Area",
    status: "active",
    progress: 38,
    image: project3,
    units: 310,
    availableUnits: 280,
    priceRange: "$280,000 - $950,000",
    description: "An eco-friendly residential complex with vertical gardens and sustainable design across 38 floors.",
    floors: 38,
    amenities: ["Garden Terraces", "Co-working Space", "EV Charging", "Yoga Studio"],
  },
  {
    id: "platinum-plaza",
    name: "Platinum Plaza",
    location: "Financial Quarter",
    status: "active",
    progress: 85,
    image: project1,
    units: 150,
    availableUnits: 22,
    priceRange: "$550,000 - $2,500,000",
    description: "An ultra-luxury 60-floor tower with smart home technology and Michelin-star restaurant.",
    floors: 60,
    amenities: ["Smart Home", "Fine Dining", "Wine Cellar", "Private Cinema"],
  },
  {
    id: "meridian-tower",
    name: "Meridian Tower",
    location: "Tech Hub District",
    status: "active",
    progress: 20,
    image: project2,
    units: 200,
    availableUnits: 200,
    priceRange: "$310,000 - $1,100,000",
    description: "A cutting-edge 42-floor smart tower designed for the modern professional.",
    floors: 42,
    amenities: ["5G Infrastructure", "Drone Landing", "AI Concierge", "Pod Parking"],
  },
  {
    id: "crown-residences",
    name: "Crown Residences",
    location: "Heritage Square",
    status: "completed",
    completionYear: 2024,
    image: project5,
    units: 120,
    priceRange: "$400,000 - $1,500,000",
    description: "A masterpiece of neo-classical design with 35 floors of timeless luxury.",
    floors: 35,
    amenities: ["Library", "Ballroom", "Butler Service", "Art Gallery"],
  },
  {
    id: "vista-one",
    name: "Vista One",
    location: "Sunset Boulevard",
    status: "completed",
    completionYear: 2024,
    image: project1,
    units: 95,
    priceRange: "$500,000 - $2,000,000",
    description: "Exclusive 28-floor boutique tower with only 3 units per floor.",
    floors: 28,
    amenities: ["Private Pool", "Sky Lounge", "Valet Parking", "Pet Spa"],
  },
  {
    id: "summit-place",
    name: "Summit Place",
    location: "Mountain View District",
    status: "completed",
    completionYear: 2023,
    image: project3,
    units: 160,
    priceRange: "$320,000 - $980,000",
    description: "A landmark 40-floor development offering breathtaking mountain and city panoramas.",
    floors: 40,
    amenities: ["Observation Deck", "Infinity Pool", "Climbing Wall", "Meditation Room"],
  },
  {
    id: "golden-gate",
    name: "Golden Gate Towers",
    location: "Riverside Park",
    status: "completed",
    completionYear: 2023,
    image: project5,
    units: 280,
    priceRange: "$250,000 - $850,000",
    description: "A family-friendly 32-floor complex with extensive recreational facilities.",
    floors: 32,
    amenities: ["Playground", "Indoor Pool", "Basketball Court", "Community Center"],
  },
  {
    id: "sapphire-heights",
    name: "Sapphire Heights",
    location: "Embassy Row",
    status: "completed",
    completionYear: 2022,
    image: project1,
    units: 100,
    priceRange: "$600,000 - $3,000,000",
    description: "The pinnacle of luxury living — a 55-floor masterpiece in the diplomatic quarter.",
    floors: 55,
    amenities: ["Private Elevator", "Cigar Lounge", "Wine Cellar", "Diplomatic Entrance"],
  },
];

export const apartments: Apartment[] = [
  { id: "apt-1", projectId: "azure-towers", projectName: "Azure Towers", name: "Unit 12A - Sky Suite", bedrooms: 3, bathrooms: 2, area: 1850, floor: 12, price: 520000, image: project2, available: true, amenities: ["Balcony", "City View", "Walk-in Closet"] },
  { id: "apt-2", projectId: "azure-towers", projectName: "Azure Towers", name: "Unit 30B - Penthouse", bedrooms: 4, bathrooms: 3, area: 3200, floor: 30, price: 1150000, image: project2, available: true, amenities: ["Terrace", "Private Pool", "Double Height Ceiling"] },
  { id: "apt-3", projectId: "horizon-heights", projectName: "Horizon Heights", name: "Unit 8C - Marina View", bedrooms: 2, bathrooms: 2, area: 1200, floor: 8, price: 480000, image: project4, available: true, amenities: ["Ocean View", "Smart Home", "Parking"] },
  { id: "apt-4", projectId: "horizon-heights", projectName: "Horizon Heights", name: "Unit 45A - Royal Suite", bedrooms: 5, bathrooms: 4, area: 4500, floor: 45, price: 1750000, image: project4, available: true, amenities: ["Full Floor", "Butler Service", "Helipad Access"] },
  { id: "apt-5", projectId: "sky-gardens", projectName: "Sky Gardens", name: "Unit 5D - Garden Studio", bedrooms: 1, bathrooms: 1, area: 650, floor: 5, price: 285000, image: project3, available: true, amenities: ["Garden Terrace", "EV Charging", "Yoga Access"] },
  { id: "apt-6", projectId: "sky-gardens", projectName: "Sky Gardens", name: "Unit 22A - Family Suite", bedrooms: 3, bathrooms: 2, area: 1950, floor: 22, price: 680000, image: project3, available: true, amenities: ["Vertical Garden", "Co-working Access", "Kids Area"] },
  { id: "apt-7", projectId: "platinum-plaza", projectName: "Platinum Plaza", name: "Unit 55A - Ultra Lux", bedrooms: 4, bathrooms: 4, area: 5000, floor: 55, price: 2400000, image: project1, available: true, amenities: ["Smart Home AI", "Wine Cellar", "Private Cinema"] },
  { id: "apt-8", projectId: "platinum-plaza", projectName: "Platinum Plaza", name: "Unit 20B - Executive", bedrooms: 2, bathrooms: 2, area: 1400, floor: 20, price: 680000, image: project1, available: true, amenities: ["City View", "Home Office", "Concierge"] },
  { id: "apt-9", projectId: "meridian-tower", projectName: "Meridian Tower", name: "Unit 15C - Smart Suite", bedrooms: 2, bathrooms: 1, area: 1100, floor: 15, price: 390000, image: project2, available: true, amenities: ["5G Enabled", "Smart Locks", "Pod Parking"] },
  { id: "apt-10", projectId: "meridian-tower", projectName: "Meridian Tower", name: "Unit 38A - Sky Loft", bedrooms: 3, bathrooms: 2, area: 2200, floor: 38, price: 920000, image: project2, available: true, amenities: ["Duplex", "Drone Delivery", "AI Concierge"] },
];

export const testimonials = [
  { name: "James Richardson", role: "Homeowner, Crown Residences", text: "The quality of construction and attention to detail exceeded all my expectations. Moving into Crown Residences was the best decision for my family.", rating: 5 },
  { name: "Sarah Chen", role: "Investor, Vista One", text: "As an investor, the ROI has been exceptional. The property value has increased 22% since completion. Truly a premium development.", rating: 5 },
  { name: "Michael Okonkwo", role: "Homeowner, Summit Place", text: "The panoramic mountain views from the 35th floor are breathtaking. The amenities and management are world-class.", rating: 5 },
  { name: "Emma Thompson", role: "Homeowner, Golden Gate Towers", text: "Perfect for our growing family. The playground, pool, and community spaces have created a wonderful neighborhood.", rating: 4 },
  { name: "David Al-Rashid", role: "Investor, Sapphire Heights", text: "The diplomatic quarter location and ultra-luxury finishes make this one of the most prestigious addresses in the city.", rating: 5 },
];
