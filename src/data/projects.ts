import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";
import project8 from "@/assets/project-8.jpg";

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
    id: "M6M",
    name: "MAISON 6",
    location: "6 MOSELY, IKOYI, LAGOS",
    status: "active",
    progress: 90,
    image: project2,
    units: 25,
    availableUnits: 2,
    priceRange: "$900,000 - $1,200,000",
    description: "A stunning 4-floor Terrace development featuring panoramic city views and world-class amenities.",
    floors: 4,
    amenities: ["Pool", "Gym", "Concierge", "Parking", "Rooftop"],
  },
  {
    id: "MOM",
    name: "THE ROCK APARTMENT",
    location: "3, Muri Okunola Extension, Victoria Island, Lagos",
    status: "active",
    progress: 75,
    image: project4,
    units: 18,
    availableUnits: 12,
    priceRange: "$420,000 - $1,800,000",
    description: "A prestigious maisonette residence with unparalleled  views and luxury finishes.",
    floors: 6,
    amenities: ["Swimming Pool", "Gym", "Concierge", "Private Parking", "Rooftop Lounge"],
  },
  {
    id: "RAG",
    name: "THE ROCK APARTMENT",
    location: "17 Glover Road, Ikoyi, Lagos.",
    status: "active",
    progress: 70,
    image: project3,
    units: 6,
    availableUnits: 2,
    priceRange: "$280,000 - $950,000",
    description: "An eco-friendly residential complex with vertical gardens and sustainable design across 38 floors.",
    floors: 7,
    amenities: ["Garden Terraces", "Co-working Space", "EV Charging", "Gym"],
  },
  {
    id: "GPI",
    name: "THE GOOD PLACE",
    location: "Ilasan, Lekki, Lagos",
    status: "active",
    progress: 30,
    image: project1,
    units: 20,
    availableUnits: 20,
    priceRange: "$250,000 - $500,000",
    description: "An ultra-luxury 60-floor tower with smart home technology and Michelin-star restaurant.",
    floors: 5,
    amenities: ["Smart Home", "Fine Dining", "Wine Cellar", "Private Cinema"],
  },
  {
    id: "GPL",
    name: "THE GOOD PLACE",
    location: "Iyamu, Lekki, Lagos",
    status: "active",
    progress: 10,
    image: project8,
    units: 8,
    availableUnits: 1,
    priceRange: "$310,000 - $400,000",
    description: "A cutting-edge 3-floor smart tower designed for the modern professional.",
    floors: 3,
    amenities: ["5G Infrastructure", "Drone Landing", "AI Concierge", "Pod Parking"],
  },
    {
    id: "SPA",
    name: "THE STAINLESS POINT",
    location: "Luggard, Ikoyi, Lagos",
    status: "active",
    progress: 5,
    image: project6,
    units: 16,
    availableUnits: 16,
    priceRange: "$310,000 - $400,000",
    description: "A cutting-edge 3-floor smart tower designed for the modern professional.",
    floors: 8,
    amenities: ["5G Infrastructure", "Drone Landing", "AI Concierge", "Pod Parking"],
  },
  {
    id: "RBM",
    name: "THE ROCK APARTMENT",
    location: "3, Olu Babajide Close, Off Freedom Way, Lekki 1, Lagos",
    status: "completed",
    completionYear: 2024,
    image: project5,
    units: 16,
    priceRange: "$400,000 - $1,500,000",
    description: "A masterpiece of neo-classical design with 8 floors of timeless luxury.",
    floors: 8,
    amenities: ["Library", "Ballroom", "Butler Service", "Art Gallery"],
  },
  {
    id: "OVL",
    name: "THE ONE VILLA",
    location: "5, Lugard Avenue, Ikoyi, Lagos",
    status: "completed",
    completionYear: 2025,
    image: project7,
    units: 12,
    availableUnits: 1,
    priceRange: "$500,000 - $2,000,000",
    description: "Exclusive 28-floor boutique tower with only 3 units per floor.",
    floors: 4,
    amenities: ["Private Pool", "Sky Lounge", "Valet Parking", "Pet Spa"],
  },
  //
  //{
   // id: "summit-place",
   // name: "Summit Place",
   // location: "Mountain View District",
   // status: "completed",
   // completionYear: 2023,
   // image: project3,
   // units: 160,
   // priceRange: "$320,000 - $980,000",
   // description: "A landmark 40-floor development offering breathtaking mountain and city panoramas.",
   // floors: 40,
   // amenities: ["Observation Deck", "Infinity Pool", "Climbing Wall", "Meditation Room"],
 // },//
];

export const apartments: Apartment[] = [
  { id: "apt-1", projectId: "M6M", projectName: "MAISON 6", name: "Unit F2 - Sky Suite", bedrooms: 4, bathrooms: 4, area: 1850, floor: 4, price: 1200000, image: project2, available: true, amenities: ["Balcony", "City View", "Walk-in Closet"] },
  { id: "apt-2", projectId: "M6M", projectName: "MAISON 6", name: "Unit 30B - Penthouse", bedrooms: 4, bathrooms: 3, area: 3200, floor: 30, price: 1150000, image: project2, available: true, amenities: ["Terrace", "Private Pool", "Double Height Ceiling"] },
  { id: "apt-3", projectId: "MOM", projectName: "THE ROCK APARTMENT", name: "Unit 8C - Marina View", bedrooms: 2, bathrooms: 2, area: 1200, floor: 8, price: 480000, image: project4, available: true, amenities: ["Ocean View", "Smart Home", "Parking"] },
  { id: "apt-4", projectId: "MOM", projectName: "THE ROCK APARTMENT", name: "Unit 45A - Royal Suite", bedrooms: 5, bathrooms: 4, area: 4500, floor: 45, price: 1750000, image: project4, available: true, amenities: ["Full Floor", "Butler Service", "Helipad Access"] },
  { id: "apt-5", projectId: "RAG", projectName: "THE ROCK APARTMENT", name: "Unit 5D - Garden Studio", bedrooms: 1, bathrooms: 1, area: 650, floor: 5, price: 285000, image: project3, available: true, amenities: ["Garden Terrace", "EV Charging", "Yoga Access"] },
  { id: "apt-6", projectId: "RAG", projectName: "THE ROCK APARTMENT", name: "Unit 22A - Family Suite", bedrooms: 3, bathrooms: 2, area: 1950, floor: 22, price: 680000, image: project3, available: true, amenities: ["Vertical Garden", "Co-working Access", "Kids Area"] },
  { id: "apt-7", projectId: "GPI", projectName: "THE GOOD PLACE", name: "Unit 55A - Ultra Lux", bedrooms: 4, bathrooms: 4, area: 5000, floor: 55, price: 2400000, image: project1, available: true, amenities: ["Smart Home AI", "Wine Cellar", "Private Cinema"] },
  { id: "apt-8", projectId: "GPI", projectName: "THE GOOD PLACE", name: "Unit 20B - Executive", bedrooms: 2, bathrooms: 2, area: 1400, floor: 20, price: 680000, image: project1, available: true, amenities: ["City View", "Home Office", "Concierge"] },
  { id: "apt-9", projectId: "GPL", projectName: "THE GOOD PLACE", name: "Unit 15C - Smart Suite", bedrooms: 2, bathrooms: 1, area: 1100, floor: 15, price: 390000, image: project8, available: true, amenities: ["5G Enabled", "Smart Locks", "Pod Parking"] },
  { id: "apt-10", projectId: "GPL", projectName: "THE GOOD PLACE", name: "Unit 38A - Sky Loft", bedrooms: 3, bathrooms: 2, area: 2200, floor: 38, price: 920000, image: project8, available: true, amenities: ["Duplex", "Drone Delivery", "AI Concierge"] },
];

export const testimonials = [
  { name: "James Richardson", role: "Homeowner, The Rock Apartment", text: "The quality of construction and attention to detail exceeded all my expectations. Moving into Crown Residences was the best decision for my family.", rating: 5 },
  { name: "Sarah Chen", role: "Investor, The One Villa", text: "As an investor, the ROI has been exceptional. The property value has increased 22% since completion. Truly a premium development.", rating: 5 },
  { name: "Michael Okonkwo", role: "Homeowner, The One Villa", text: "The panoramic mountain views from the 35th floor are breathtaking. The amenities and management are world-class.", rating: 5 },
  { name: "Emma Thompson", role: "Homeowner, Dej Deluxe", text: "Perfect for our growing family. The playground, pool, and community spaces have created a wonderful neighborhood.", rating: 4 },
  { name: "David Al-Rashid", role: "Investor, Triangle Apartments", text: "The diplomatic quarter location and ultra-luxury finishes make this one of the most prestigious addresses in the city.", rating: 5 },
];
