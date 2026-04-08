import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";
import project7 from "@/assets/project-7.jpg";
import project8 from "@/assets/project-8.jpg";

export interface NearbyAmenity {
  name: string;
  category: string;
  distance: string;
  icon: string;
}

export interface LiveUpdate {
  image: string;
  date: string;
  caption: string;
  progressPercentage?: number;
}

export interface ProjectGallery {
  interior: string[];
  exterior: string[];
  floorPlans: string[];
  liveUpdates: LiveUpdate[];
}

export interface ProjectDetail {
  id: string;
  slug: string;
  tagline: string;
  propertyType: string;
  bedrooms: string;
  builtArea: string;
  locationCoordinates: { lat: number; lng: number };
  videoUrl?: string;
  videoThumbnail?: string;
  overviewWriteup: string;
  experienceWriteup: string;
  unitFeatures: string[];
  onSiteAmenities: { category: string; items: string[] }[];
  nearbyAmenities: NearbyAmenity[];
  gallery: ProjectGallery;
  brochureUrl?: string;
}

const defaultFeatures = [
  "High-end finishes",
  "Smart home automation",
  "Central AC",
  "Floor-to-ceiling windows",
  "Private balcony/terrace",
  "Walk-in closets",
  "Modern kitchen with island",
  "Premium appliances",
  "Spacious bathrooms with soaking tub",
  "24/7 security system",
  "High-speed fiber internet",
  "Backup power generator",
];

const defaultOnSiteAmenities = [
  { category: "Wellness", items: ["Swimming pool", "Gym/Spa", "Yoga deck", "Jogging track"] },
  { category: "Lifestyle", items: ["Rooftop lounge", "Clubhouse", "Cinema room", "BBQ area"] },
  { category: "Family", items: ["Children's play area", "Daycare center"] },
  { category: "Convenience", items: ["Concierge service", "Package room", "Car wash bay"] },
  { category: "Business", items: ["Co-working space", "Meeting rooms"] },
  { category: "Green", items: ["Landscaped gardens", "Water features"] },
];

export const projectDetails: Record<string, ProjectDetail> = {
  M6M: {
    id: "M6M",
    slug: "maison-6-mosely-ikoyi",
    tagline: "Where Luxury Meets Legacy in the Heart of Ikoyi",
    propertyType: "Luxury Terrace Duplex",
    bedrooms: "4 Bedrooms",
    builtArea: "3,200 - 4,500 sq ft",
    locationCoordinates: { lat: 6.4541, lng: 3.4382 },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    overviewWriteup: `MAISON 6 is a stunning 4-floor terrace development located on the prestigious 6 Mosely Road in Ikoyi, Lagos. Designed with an unwavering commitment to architectural excellence, each terrace duplex offers panoramic views of the Ikoyi skyline and the Lagos Lagoon.\n\nThe development features a contemporary design philosophy that blends clean geometric lines with warm natural materials. Every unit is meticulously crafted with imported Italian marble, floor-to-ceiling glazing, and bespoke joinery that reflects the highest standards of luxury living.`,
    experienceWriteup: `Living at MAISON 6 means embracing a lifestyle of unparalleled sophistication. Residents enjoy exclusive access to a rooftop infinity pool, a state-of-the-art fitness center, and a private concierge service.\n\nIdeal for discerning families and executives who demand the very best, MAISON 6 offers exceptional investment potential with projected annual returns of 18-22%. The Ikoyi location ensures proximity to premium schools, hospitals, shopping destinations, and the city's finest dining establishments.`,
    unitFeatures: defaultFeatures,
    onSiteAmenities: defaultOnSiteAmenities,
    nearbyAmenities: [
      { name: "British International School", category: "Schools", distance: "0.8 km", icon: "school" },
      { name: "Ikoyi Club", category: "Recreation", distance: "1.2 km", icon: "trees" },
      { name: "Lagoon Hospital", category: "Healthcare", distance: "1.5 km", icon: "hospital" },
      { name: "Falomo Shopping Center", category: "Shopping", distance: "0.5 km", icon: "shopping-bag" },
      { name: "Jabi Lake Mall", category: "Shopping", distance: "2.0 km", icon: "shopping-bag" },
      { name: "Ikoyi Baptist Church", category: "Worship", distance: "0.3 km", icon: "church" },
    ],
    gallery: {
      interior: [project2, project1, project4],
      exterior: [project2, project3, project6],
      floorPlans: [project2],
      liveUpdates: [
        { image: project2, date: "2025-01-15", caption: "Foundation work completed", progressPercentage: 30 },
        { image: project3, date: "2025-03-10", caption: "Structural framework at 60%", progressPercentage: 60 },
        { image: project1, date: "2025-06-01", caption: "Interior finishing in progress", progressPercentage: 90 },
      ],
    },
  },
  MOM: {
    id: "MOM",
    slug: "rock-apartment-muri-okunola",
    tagline: "Redefining Waterfront Living on Victoria Island",
    propertyType: "Luxury Apartments & Maisonettes",
    bedrooms: "2, 3, 5 Bedrooms",
    builtArea: "1,200 - 4,500 sq ft",
    locationCoordinates: { lat: 6.4281, lng: 3.4219 },
    overviewWriteup: `THE ROCK APARTMENT on Muri Okunola Extension stands as a beacon of modern architecture on Victoria Island. This 6-floor masterpiece offers a curated selection of apartments and maisonettes designed for those who appreciate the finer things in life.\n\nEvery detail has been carefully considered — from the imported stone cladding on the façade to the smart home systems integrated into each unit. The development maximizes natural light and ventilation while maintaining complete privacy for residents.`,
    experienceWriteup: `Victoria Island's most coveted address offers residents a lifestyle that seamlessly blends work and leisure. With panoramic ocean views, a world-class swimming pool, and dedicated concierge services, THE ROCK APARTMENT redefines urban luxury.\n\nStrategically located near major business districts, premium restaurants, and cultural landmarks, this development offers exceptional returns for investors, with property values in the area appreciating at 15-20% annually.`,
    unitFeatures: defaultFeatures,
    onSiteAmenities: defaultOnSiteAmenities,
    nearbyAmenities: [
      { name: "Victoria Island Business District", category: "Business", distance: "0.3 km", icon: "briefcase" },
      { name: "Eko Hotels & Suites", category: "Dining", distance: "1.0 km", icon: "utensils" },
      { name: "Reddington Hospital", category: "Healthcare", distance: "0.8 km", icon: "hospital" },
      { name: "The Palms Shopping Mall", category: "Shopping", distance: "2.5 km", icon: "shopping-bag" },
    ],
    gallery: {
      interior: [project4, project1, project2],
      exterior: [project4, project6, project3],
      floorPlans: [project4],
      liveUpdates: [
        { image: project4, date: "2024-12-01", caption: "Site preparation completed", progressPercentage: 20 },
        { image: project3, date: "2025-03-15", caption: "Second floor slab poured", progressPercentage: 50 },
        { image: project1, date: "2025-06-01", caption: "MEP installations ongoing", progressPercentage: 75 },
      ],
    },
  },
  RAG: {
    id: "RAG",
    slug: "rock-apartment-glover-road",
    tagline: "Eco-Luxury Living on Ikoyi's Most Prestigious Street",
    propertyType: "Luxury Apartments",
    bedrooms: "1, 3 Bedrooms",
    builtArea: "650 - 1,950 sq ft",
    locationCoordinates: { lat: 6.4498, lng: 3.4345 },
    overviewWriteup: `THE ROCK APARTMENT on 17 Glover Road embraces sustainable design without compromising on luxury. This 7-floor eco-friendly complex features vertical gardens, energy-efficient systems, and biophilic design principles that bring nature into every living space.\n\nThe architectural vision integrates green terraces at every level, creating a living, breathing building that stands apart from conventional developments.`,
    experienceWriteup: `Residents enjoy the perfect balance of city convenience and natural tranquility. The vertical gardens reduce urban heat, improve air quality, and create a serene environment unique to this development.\n\nWith Glover Road's established prestige and the growing demand for sustainable luxury, property values here are projected to appreciate significantly.`,
    unitFeatures: [...defaultFeatures, "Vertical garden access", "Rainwater harvesting", "Solar panels"],
    onSiteAmenities: defaultOnSiteAmenities,
    nearbyAmenities: [
      { name: "Ikoyi Senatorial Park", category: "Recreation", distance: "0.5 km", icon: "trees" },
      { name: "Lagoon Hospital", category: "Healthcare", distance: "1.0 km", icon: "hospital" },
      { name: "Shoprite Ikoyi", category: "Shopping", distance: "1.8 km", icon: "shopping-bag" },
    ],
    gallery: {
      interior: [project3, project2, project1],
      exterior: [project3, project6, project5],
      floorPlans: [project3],
      liveUpdates: [
        { image: project3, date: "2025-01-01", caption: "Foundation excavation", progressPercentage: 15 },
        { image: project6, date: "2025-04-01", caption: "Vertical garden framework installed", progressPercentage: 45 },
        { image: project1, date: "2025-07-01", caption: "Facade cladding at 70%", progressPercentage: 70 },
      ],
    },
  },
  GPI: {
    id: "GPI",
    slug: "the-good-place-ilasan",
    tagline: "Smart Living for the Modern Professional",
    propertyType: "Smart Luxury Apartments",
    bedrooms: "2, 4 Bedrooms",
    builtArea: "1,400 - 5,000 sq ft",
    locationCoordinates: { lat: 6.4355, lng: 3.4783 },
    overviewWriteup: `THE GOOD PLACE in Ilasan represents the future of residential living. This 5-floor ultra-luxury development integrates cutting-edge smart home technology, AI-powered concierge services, and sustainable energy systems.\n\nEvery apartment comes equipped with voice-controlled lighting, automated climate systems, and a dedicated home automation hub.`,
    experienceWriteup: `Designed for tech-savvy professionals and forward-thinking families, THE GOOD PLACE offers a living experience that adapts to your lifestyle. The smart home AI learns your preferences and optimizes energy usage, comfort, and security automatically.\n\nWith Lekki's rapid development trajectory, early investors stand to benefit from substantial capital appreciation and strong rental yields.`,
    unitFeatures: [...defaultFeatures, "AI-powered home automation", "Voice-controlled lighting", "Automated climate control"],
    onSiteAmenities: defaultOnSiteAmenities,
    nearbyAmenities: [
      { name: "Lekki Conservation Centre", category: "Recreation", distance: "3.0 km", icon: "trees" },
      { name: "Ikate Primary School", category: "Schools", distance: "0.5 km", icon: "school" },
      { name: "Circle Mall Lekki", category: "Shopping", distance: "2.0 km", icon: "shopping-bag" },
    ],
    gallery: {
      interior: [project1, project4, project2],
      exterior: [project1, project8, project6],
      floorPlans: [project1],
      liveUpdates: [
        { image: project1, date: "2025-02-01", caption: "Site clearing and foundation", progressPercentage: 10 },
        { image: project8, date: "2025-05-01", caption: "Ground floor slab completed", progressPercentage: 30 },
      ],
    },
  },
  GPL: {
    id: "GPL",
    slug: "the-good-place-iyamu",
    tagline: "Compact Luxury in Lagos' Fastest Growing Corridor",
    propertyType: "Smart Apartments",
    bedrooms: "2, 3 Bedrooms",
    builtArea: "1,100 - 2,200 sq ft",
    locationCoordinates: { lat: 6.4312, lng: 3.4801 },
    overviewWriteup: `THE GOOD PLACE in Iyamu, Lekki is a boutique 3-floor smart tower designed for the modern professional. With only 8 exclusive units, this intimate development prioritizes privacy, smart living, and architectural distinction.\n\nThe building features cutting-edge 5G infrastructure, AI-powered building management, and sustainable design elements.`,
    experienceWriteup: `This boutique development offers an exclusive community of like-minded professionals. With drone delivery capabilities and pod parking, THE GOOD PLACE anticipates the future of urban living.\n\nLimited availability makes this an exceptional investment opportunity in one of Lagos' fastest-appreciating corridors.`,
    unitFeatures: defaultFeatures,
    onSiteAmenities: [
      { category: "Tech", items: ["5G infrastructure", "Drone landing pad", "AI concierge", "Pod parking"] },
      { category: "Wellness", items: ["Fitness center", "Rooftop terrace"] },
      { category: "Convenience", items: ["Smart lockers", "EV charging"] },
    ],
    nearbyAmenities: [
      { name: "Lekki Phase 1 Market", category: "Shopping", distance: "1.5 km", icon: "shopping-bag" },
      { name: "Lekki General Hospital", category: "Healthcare", distance: "2.0 km", icon: "hospital" },
    ],
    gallery: {
      interior: [project8, project1, project4],
      exterior: [project8, project6, project3],
      floorPlans: [project8],
      liveUpdates: [
        { image: project8, date: "2025-03-01", caption: "Project launched, site preparation", progressPercentage: 5 },
        { image: project6, date: "2025-06-01", caption: "Foundation work starting", progressPercentage: 10 },
      ],
    },
  },
  SPA: {
    id: "SPA",
    slug: "the-stainless-point-luggard",
    tagline: "Timeless Elegance on Ikoyi's Premier Avenue",
    propertyType: "Premium Apartments",
    bedrooms: "2, 3, 4 Bedrooms",
    builtArea: "1,500 - 3,500 sq ft",
    locationCoordinates: { lat: 6.4523, lng: 3.4298 },
    overviewWriteup: `THE STAINLESS POINT on Luggard Avenue, Ikoyi, is an 8-floor premium development that embodies timeless elegance. With 16 meticulously designed units, this project combines classical architectural elements with modern luxury.\n\nThe development features premium stainless steel accents, imported stone finishes, and expansive living spaces that maximize the stunning Ikoyi views.`,
    experienceWriteup: `Luggard Avenue is one of Ikoyi's most prestigious addresses, home to embassies, corporate headquarters, and ultra-high-net-worth individuals. THE STAINLESS POINT offers residents an address that commands respect and delivers exceptional lifestyle quality.\n\nWith all 16 units available, early buyers enjoy the best unit selection and pre-launch pricing advantages.`,
    unitFeatures: defaultFeatures,
    onSiteAmenities: defaultOnSiteAmenities,
    nearbyAmenities: [
      { name: "German Embassy", category: "Landmarks", distance: "0.3 km", icon: "landmark" },
      { name: "Ikoyi Club 1938", category: "Recreation", distance: "0.8 km", icon: "trees" },
      { name: "St. Nicholas Hospital", category: "Healthcare", distance: "1.5 km", icon: "hospital" },
    ],
    gallery: {
      interior: [project6, project2, project1],
      exterior: [project6, project3, project5],
      floorPlans: [project6],
      liveUpdates: [
        { image: project6, date: "2025-04-01", caption: "Project announced, site acquired", progressPercentage: 5 },
      ],
    },
  },
  RBM: {
    id: "RBM",
    slug: "rock-apartment-lekki-1",
    tagline: "Neo-Classical Masterpiece, Delivered with Excellence",
    propertyType: "Luxury Apartments",
    bedrooms: "2, 3, 4 Bedrooms",
    builtArea: "1,200 - 3,800 sq ft",
    locationCoordinates: { lat: 6.4378, lng: 3.4694 },
    overviewWriteup: `THE ROCK APARTMENT on Olu Babajide Close is our proudly completed neo-classical masterpiece. This 8-floor development features 16 exquisitely finished apartments that blend timeless design with contemporary living standards.\n\nDelivered in 2024, this project showcases our commitment to quality, on-time delivery, and architectural distinction.`,
    experienceWriteup: `Residents of this completed development enjoy the full range of premium amenities including a private library, ballroom, butler service, and art gallery. The Freedom Way location provides easy access to Lekki's vibrant commercial and entertainment corridor.\n\nAs a completed project, buyers benefit from immediate occupancy and proven quality — no construction risk, just move-in-ready luxury.`,
    unitFeatures: defaultFeatures,
    onSiteAmenities: [
      { category: "Culture", items: ["Private library", "Art gallery", "Ballroom"] },
      { category: "Service", items: ["Butler service", "Valet parking", "24/7 security"] },
      { category: "Wellness", items: ["Infinity pool", "Full-service spa", "Sauna"] },
    ],
    nearbyAmenities: [
      { name: "Freedom Park", category: "Recreation", distance: "0.5 km", icon: "trees" },
      { name: "The Palms Shopping Mall", category: "Shopping", distance: "1.0 km", icon: "shopping-bag" },
      { name: "EKO Atlantic", category: "Landmarks", distance: "3.0 km", icon: "landmark" },
    ],
    gallery: {
      interior: [project5, project2, project4],
      exterior: [project5, project7, project3],
      floorPlans: [project5],
      liveUpdates: [],
    },
  },
  OVL: {
    id: "OVL",
    slug: "the-one-villa-lugard",
    tagline: "Exclusive Boutique Living on Lugard Avenue",
    propertyType: "Exclusive Villas & Apartments",
    bedrooms: "3, 4 Bedrooms",
    builtArea: "2,000 - 4,200 sq ft",
    locationCoordinates: { lat: 6.4531, lng: 3.4275 },
    overviewWriteup: `THE ONE VILLA on 5 Lugard Avenue is an exclusive boutique development completed in 2025. With only 12 units across 4 floors, this development offers an unmatched level of privacy and exclusivity in one of Ikoyi's most sought-after locations.\n\nEach unit features a private pool, sky lounge access, and bespoke interior design by internationally acclaimed designers.`,
    experienceWriteup: `THE ONE VILLA is designed for those who seek absolute exclusivity. With only 3 units per floor, residents enjoy unparalleled privacy, dedicated valet parking, and a pet-friendly environment complete with a luxury pet spa.\n\nWith only 1 unit remaining, this is a rare opportunity to own a piece of Ikoyi's most exclusive address.`,
    unitFeatures: [...defaultFeatures, "Private pool per unit", "Bespoke interior design", "Pet-friendly with pet spa"],
    onSiteAmenities: [
      { category: "Exclusive", items: ["Private pool per unit", "Sky lounge", "Valet parking", "Pet spa"] },
      { category: "Wellness", items: ["Gym", "Spa", "Meditation garden"] },
      { category: "Lifestyle", items: ["Wine cellar", "Private cinema", "Rooftop terrace"] },
    ],
    nearbyAmenities: [
      { name: "Banana Island", category: "Landmarks", distance: "2.0 km", icon: "landmark" },
      { name: "Ikoyi Golf Club", category: "Recreation", distance: "1.5 km", icon: "trees" },
      { name: "Evercare Hospital", category: "Healthcare", distance: "2.0 km", icon: "hospital" },
    ],
    gallery: {
      interior: [project7, project1, project2],
      exterior: [project7, project5, project6],
      floorPlans: [project7],
      liveUpdates: [],
    },
  },
};
