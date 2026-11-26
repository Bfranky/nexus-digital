export interface WorkProject {
  id: string;
  title: string;
  type: string;
  liveUrl: string;
  githubUrl: string;
  desc: string;
}

// ── The exact client works from Blessed's Vercel projects ───────────────────
export const WORKS: WorkProject[] = [
  {
    id: "new-c",
    title: "New-C",
    type: "Beauty & Makeup App",
    liveUrl: "https://new-c-eight.vercel.app",
    githubUrl: "https://github.com/Bfranky/new-c",
    desc: "Cosmetics, beauty studio makeover booking, and skincare products showcase.",
  },
  {
    id: "merit-auto",
    title: "Merit Auto",
    type: "Car Dealership & Auto Sales",
    liveUrl: "https://merit-auto.vercel.app",
    githubUrl: "https://github.com/Bfranky/merit-auto",
    desc: "Vehicle catalog, dealership inventory, specifications, and buyer inquiry flow.",
  },
  {
    id: "fishvile",
    title: "Fishvile",
    type: "Food & E-Commerce Store",
    liveUrl: "https://fishvile.vercel.app",
    githubUrl: "https://github.com/Bfranky/fishvile",
    desc: "Online fresh food and seafood ordering with mobile cart and bag checkout.",
  },
  {
    id: "jtho",
    title: "JTHO Portal",
    type: "Healthcare & Patient Portal",
    liveUrl: "https://jtho.vercel.app",
    githubUrl: "https://github.com/Bfranky/jtho",
    desc: "Medical services, doctor directory, and streamlined patient appointment booking.",
  },
  {
    id: "deoffice-app",
    title: "DeOffice",
    type: "Workspace & Office Management",
    liveUrl: "https://deoffice-app.vercel.app",
    githubUrl: "https://github.com/Bfranky/deoffice-app",
    desc: "Modern office suite and business operations management platform.",
  },
  {
    id: "johnpop-client",
    title: "JohnPop Client",
    type: "Brand & Business Platform",
    liveUrl: "https://johnpop-client.vercel.app",
    githubUrl: "https://github.com/Bfranky/johnpop-client",
    desc: "Interactive brand presence, client showcase, and digital services portal.",
  },
  {
    id: "jks-blaze",
    title: "JKS Blaze",
    type: "Creative Digital Platform",
    liveUrl: "https://jks-blaze.vercel.app",
    githubUrl: "https://github.com/Bfranky/jks-blaze",
    desc: "Fast, dynamic media and product showcase platform.",
  },
  {
    id: "manga",
    title: "Manga Reader",
    type: "Web Reader & Media App",
    liveUrl: "https://manga-olive-six.vercel.app",
    githubUrl: "https://github.com/Bfranky/manga",
    desc: "Responsive reader experience with chapter navigation and dark reading UI.",
  },
  {
    id: "fairies",
    title: "Fairies",
    type: "Creative Showcase",
    liveUrl: "https://fairies.vercel.app",
    githubUrl: "https://github.com/Bfranky/fairies",
    desc: "Clean creative brand experience with interactive layouts and visuals.",
  },
];

export const SIMPLE_PACKAGES = [
  {
    name: "Starter Site",
    price: "₦80,000",
    time: "3 – 5 Days",
    desc: "1-page fast business site with menu/services, location, photos, and direct WhatsApp button.",
  },
  {
    name: "Business & Booking",
    price: "₦120,000 – ₦150,000",
    time: "5 – 7 Days",
    desc: "Multi-page website with gallery, packages, inquiry form, and printable table QR code.",
  },
  {
    name: "Custom Web Platform",
    price: "From ₦300,000",
    time: "10 – 20 Days",
    desc: "Custom database, dashboards, customer accounts, and online payment integrations.",
  },
];

// ── Backwards-compatible exports for other helper components ────────────────
export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  categorySlug: string;
  description: string;
  deliverables: string[];
  priceRange: string;
  priceAmount: number;
  turnaroundDays: number;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  badge?: string;
  impactMetric: string;
  tags: string[];
  highlights: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = WORKS.map(w => ({
  id: w.id,
  title: w.title,
  client: w.type,
  category: w.type,
  categorySlug: "all",
  description: w.desc,
  deliverables: ["Custom design & build", "Mobile responsive layout", "WhatsApp fast inquiry flow"],
  priceRange: "Custom",
  priceAmount: 80000,
  turnaroundDays: 5,
  liveUrl: w.liveUrl,
  githubUrl: w.githubUrl,
  featured: true,
  tags: [w.type],
  highlights: [],
  impactMetric: "Live in production",
}));

export interface PackageTier {
  id: string;
  name: string;
  price: string;
  priceNumeric: number;
  timeline: string;
  targetAudience: string;
  description: string;
  features: string[];
  recommended?: boolean;
  ctaText?: string;
  depositTerm?: string;
  badge?: string;
}

export const PRICING_PACKAGES: PackageTier[] = [
  {
    id: "starter",
    name: "Starter Site",
    price: "₦80,000",
    priceNumeric: 80000,
    timeline: "3 – 5 Days",
    targetAudience: "Bukas, Salons, Barbershops, Small Shops",
    description: "1-page fast business site with menu/services, location, photos, and direct WhatsApp button.",
    features: [
      "Fast 1-page website (zero monthly hosting)",
      "Services, price list, or menu with photos",
      "Floating WhatsApp order button",
      "Opening hours & Google Maps location",
      "100% mobile-optimized",
    ],
  },
  {
    id: "booking",
    name: "Business & Booking",
    price: "₦120,000 – ₦150,000",
    priceNumeric: 135000,
    timeline: "5 – 7 Days",
    targetAudience: "Event Centres, Lounges, Clinics, Boutiques",
    description: "Multi-page website with gallery, packages, inquiry form, and printable table QR code.",
    features: [
      "Multi-page architecture (Home, Services, Gallery, Contact)",
      "Package & pricing breakdown tables",
      "Inquiry & booking form to WhatsApp & Email",
      "Printable QR Code for tables and flyers",
      "30 days of free revisions",
    ],
  },
  {
    id: "platform",
    name: "Custom Web Platform",
    price: "From ₦300,000",
    priceNumeric: 350000,
    timeline: "10 – 20 Days",
    targetAudience: "Hotels, Portals, Dealerships, Custom Systems",
    description: "Custom database, dashboards, customer accounts, and online payment integrations.",
    features: [
      "Custom SQL / Supabase database",
      "Private admin dashboard to manage content & bookings",
      "Direct bank transfer & MiniPay scan checkout",
      "User accounts, roles, or portal access",
      "Priority SLA maintenance",
    ],
  },
];

export interface RealTestimonial {
  id: string;
  name: string;
  role: string;
  business: string;
  location: string;
  avatarText: string;
  stars: number;
  review: string;
  result: string;
  serviceTier: string;
  verified: boolean;
}

export const REAL_TESTIMONIALS: RealTestimonial[] = [];
