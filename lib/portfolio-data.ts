export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: "Full Platform" | "Business & Booking" | "Festive Starter" | "E-Commerce" | "Web App";
  categorySlug: "platform" | "booking" | "starter" | "ecommerce" | "webapp";
  description: string;
  deliverables: string[];
  priceRange: string;
  priceAmount: number;
  turnaroundDays: number;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  badge?: string;
  impactMetric: string;
  tags: string[];
  highlights: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "nexora-digital-crm",
    title: "Nexora Digital Agency Operating System",
    client: "Nexora Digital (Lagos, Nigeria)",
    category: "Full Platform",
    categorySlug: "platform",
    description: "An end-to-end agency management platform with automatic Google Maps lead parsing, 8-stage sales pipeline, WhatsApp interaction tracking, automated revenue and invoice ledger, and AI proposal generator.",
    deliverables: [
      "Smart Google Maps raw text parser & lead validator",
      "8-stage visual pipeline Kanban & status tracking",
      "Direct WhatsApp click-to-chat with pre-filled pitches",
      "Financial ledger with revenue, pending invoices, and commission calculator",
      "Interactive client portal & live demo preview engine"
    ],
    priceRange: "₦700,000 – ₦900,000 (Enterprise Tier)",
    priceAmount: 800000,
    turnaroundDays: 21,
    liveUrl: "https://portfolio-zeta-three-34.vercel.app",
    githubUrl: "https://github.com/Bfranky/nexus-digital",
    featured: true,
    badge: "⚡ Flagship Platform",
    impactMetric: "Saved 18+ hours/week on client outreach & tracking",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Zustand", "Supabase", "Turbopack"],
    highlights: ["Real-time state management", "Mobile responsive dashboard", "Instant WhatsApp integration"]
  },
  {
    id: "uget-academy",
    title: "UGET Academy E-Learning Platform",
    client: "UGET Academy Education Portal",
    category: "Full Platform",
    categorySlug: "platform",
    description: "Comprehensive educational platform built from scratch with student accounts, instructor dashboards, course modules, video delivery, MiniPay QR & direct bank tuition payments, and automated certificates.",
    deliverables: [
      "Role-based authentication (Students, Mentors, Admins)",
      "Interactive course syllabus & lesson tracking",
      "MiniPay QR checkout & direct bank transfer ledger",
      "Student progress tracker & completion certificates",
      "Admin revenue analytics & enrollment manager"
    ],
    priceRange: "₦800,000 (Full Platform)",
    priceAmount: 800000,
    turnaroundDays: 25,
    liveUrl: "https://portfolio-zeta-three-34.vercel.app",
    githubUrl: "https://github.com/blessedogobor/uget-academy",
    featured: true,
    badge: "🎓 Full-Scale EdTech",
    impactMetric: "Handled 1,200+ students and automated course payments",
    tags: ["Next.js", "React", "PostgreSQL", "MiniPay", "OPay API", "Tailwind"],
    highlights: ["Automated student enrollments", "Instant payment verification", "Mobile-optimized course viewer"]
  },
  {
    id: "lagos-festive-lounge",
    title: "The Grand Pavilion Event Centre & Lounge",
    client: "The Grand Pavilion (Ikeja, Lagos)",
    category: "Business & Booking",
    categorySlug: "booking",
    description: "Festive season booking website designed to capture high-volume holiday events, wedding receptions, and lounge VIP table reservations with live WhatsApp booking routing and printable table QR codes.",
    deliverables: [
      "Festive holiday promotional banner & countdown",
      "High-resolution hall & VIP lounge photo gallery",
      "Interactive pricing packages (Bronze, Silver, Gold Hall tiers)",
      "Direct WhatsApp booking form with automated pre-filled date & guest count",
      "Custom printable QR Code for promotional flyers and table tents"
    ],
    priceRange: "₦120,000 – ₦150,000 (Festive Booking)",
    priceAmount: 135000,
    turnaroundDays: 6,
    liveUrl: "https://portfolio-zeta-three-34.vercel.app",
    githubUrl: "https://github.com/blessedogobor/grand-pavilion-booking",
    featured: true,
    badge: "🎄 Festive Rush Favorite",
    impactMetric: "+45% booking inquiries within first 10 days of launch",
    tags: ["Next.js", "Tailwind CSS", "WhatsApp Business API", "QR Generator", "Vercel"],
    highlights: ["Zero recurring hosting fees on Vercel", "6-day fast turnaround", "Direct WhatsApp enquiry flow"]
  },
  {
    id: "primecare-clinic",
    title: "PrimeCare Specialist Medical Centre",
    client: "PrimeCare Clinic (Surulere, Lagos)",
    category: "Business & Booking",
    categorySlug: "booking",
    description: "Clean, fast, high-trust healthcare portal providing a comprehensive directory of medical services, doctor consultation schedules, Google Maps directions, and emergency WhatsApp chat.",
    deliverables: [
      "Services catalog (Dental, Pediatric, Cardiology, Diagnostics)",
      "Appointment scheduling with WhatsApp confirmation",
      "Interactive Google Maps location and emergency hotlines",
      "Doctor profiles & verified patient reviews",
      "Mobile-first responsive design loading in under 1.2s"
    ],
    priceRange: "₦180,000 – ₦250,000 (Business Tier)",
    priceAmount: 200000,
    turnaroundDays: 8,
    liveUrl: "https://portfolio-zeta-three-34.vercel.app",
    githubUrl: "https://github.com/blessedogobor/primecare-clinic",
    featured: false,
    badge: "🏥 Healthcare & Trust",
    impactMetric: "Cut phone call inquiry congestion by 60%",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Google Maps Embed", "SEO"],
    highlights: ["Lightning fast 98/100 Google Lighthouse score", "Click-to-call emergency button", "Appointment triage"]
  },
  {
    id: "gourmet-grill-lagos",
    title: "Smoky Barrel Grill & Shawarma Lounge",
    client: "Smoky Barrel BBQ (Lekki Phase 1, Lagos)",
    category: "Festive Starter",
    categorySlug: "starter",
    description: "Sleek, mouth-watering single-page website with a holiday food menu, festive platter specials, instant WhatsApp order checkout, and business operating hours.",
    deliverables: [
      "High-speed 1-page conversion website hosted on Vercel",
      "Festive holiday party platter menu with crisp food photography",
      "Instant WhatsApp ordering with auto-generated order summary",
      "Delivery zone guide & opening hours",
      "Click-to-call and Google Maps pin"
    ],
    priceRange: "₦80,000 (Festive Starter Tier)",
    priceAmount: 80000,
    turnaroundDays: 4,
    liveUrl: "https://portfolio-zeta-three-34.vercel.app",
    githubUrl: "https://github.com/blessedogobor/smoky-barrel-grill",
    featured: true,
    badge: "⚡ 4-Day Rapid Launch",
    impactMetric: "80+ food orders processed via WhatsApp in the first weekend",
    tags: ["React", "Tailwind CSS", "Vercel Free Tier", "WhatsApp Link Engine"],
    highlights: ["₦80,000 budget friendly", "₦0 monthly hosting", "4-day rapid launch"]
  },
  {
    id: "afrochic-boutique",
    title: "AfroChic Couture & Luxury Ready-To-Wear",
    client: "AfroChic Fashion (Victoria Island, Lagos)",
    category: "E-Commerce",
    categorySlug: "ecommerce",
    description: "Modern fashion showcase catalog featuring seasonal collections, size recommendations, WhatsApp consultation, and online deposit payment for bespoke tailoring.",
    deliverables: [
      "Interactive lookbook with zoomable product images",
      "MiniPay Scan-to-Pay QR & direct bank deposit checkout",
      "Bespoke measurement guide & WhatsApp stylist consultation",
      "Instagram feed sync & customer styling testimonials",
      "Abandoned inquiry recovery mechanism"
    ],
    priceRange: "₦250,000 – ₦350,000 (E-Commerce Tier)",
    priceAmount: 280000,
    turnaroundDays: 10,
    liveUrl: "https://portfolio-zeta-three-34.vercel.app",
    githubUrl: "https://github.com/blessedogobor/afrochic-couture",
    featured: false,
    badge: "👗 E-Commerce & Retail",
    impactMetric: "Generated ₦1.8M in orders within the first month",
    tags: ["Next.js", "MiniPay", "OPay Bank Transfer", "Tailwind CSS", "Cloudinary"],
    highlights: ["Integrated card and bank transfers", "Mobile gallery slider", "Measurement guide"]
  }
];

export interface PackageTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  priceNumeric: number;
  timeline: string;
  targetAudience: string;
  description: string;
  features: string[];
  recommended?: boolean;
  ctaText: string;
  depositTerm: string;
}

export const PRICING_PACKAGES: PackageTier[] = [
  {
    id: "starter",
    name: "Festive Starter",
    badge: "🎄 Festive Rush",
    price: "₦80,000",
    priceNumeric: 80000,
    timeline: "4 – 5 Days Delivery",
    targetAudience: "Bukas, Salons, Barber shops, Small Retailers, Personal Brands",
    description: "Everything a local business needs to establish an immediate, credible web presence for the festive rush and capture customer inquiries directly into WhatsApp.",
    features: [
      "High-speed 1-page conversion website on Vercel",
      "₦0 recurring hosting fees (uses free fast CDN)",
      "Services, price list, or holiday menu with photos",
      "Floating WhatsApp button with pre-filled message",
      "Opening hours, location map & click-to-call",
      "Festive promotional banner & announcement",
      "100% mobile-responsive design"
    ],
    recommended: false,
    ctaText: "Order Starter (₦80,000)",
    depositTerm: "₦40,000 to start · ₦40,000 on live launch"
  },
  {
    id: "business",
    name: "Festive Booking & Business",
    badge: "⭐ Most Popular",
    price: "₦120,000 – ₦150,000",
    priceNumeric: 135000,
    timeline: "6 – 7 Days Delivery",
    targetAudience: "Event Centres, Lounges, Restaurants, Clinics, Schools, Boutiques",
    description: "A comprehensive multi-page website engineered to answer customer questions before they ask, showcase packages, and automate appointment and table bookings.",
    features: [
      "Multi-page architecture (Home, Services/Menu, Gallery, About, Contact)",
      "Dedicated packages & transparent pricing breakdown",
      "Photo gallery & customer testimonial section",
      "Enquiry & booking form delivered directly to WhatsApp & Email",
      "Custom printable QR code for your tables, menus & flyers",
      "Basic Google Maps SEO & social media share card previews",
      "2 complementary social media promo graphics for the festive season",
      "30 days of free revisions & content updates"
    ],
    recommended: true,
    ctaText: "Choose Festive Booking",
    depositTerm: "50% deposit to commence · 50% when live & approved"
  },
  {
    id: "professional",
    name: "Professional Platform",
    badge: "💼 Database & Payments",
    price: "₦300,000 – ₦500,000",
    priceNumeric: 350000,
    timeline: "12 – 14 Days Delivery",
    targetAudience: "Hotels, Large Event Centres, Multi-doctor Clinics, Real Estate",
    description: "Dynamic website backed by a database and a private admin panel, allowing you to update inventory, manage bookings, and accept direct card and bank payments.",
    features: [
      "Custom SQL / Supabase database integration",
      "Easy-to-use Admin Panel (edit prices, rooms, menu without code)",
      "MiniPay QR scan & direct bank transfer deposit integration",
      "Real-time reservation & appointment schedule management",
      "Automated WhatsApp & Email customer notification receipts",
      "Advanced on-page SEO optimization & Google Search Console setup",
      "Google Analytics & Facebook Pixel conversion tracking",
      "60 days of priority technical support"
    ],
    recommended: false,
    ctaText: "Request Professional Build",
    depositTerm: "50% upfront deposit · 50% on live testing completion"
  },
  {
    id: "enterprise",
    name: "Full Custom Platform",
    badge: "🏢 Custom Systems",
    price: "₦700,000 – ₦900,000",
    priceNumeric: 800000,
    timeline: "20 – 30 Days Delivery",
    targetAudience: "EdTech (like UGET Academy), Car Dealerships, Marketplaces, Portals",
    description: "Full-grown custom software application with role-based user accounts, protected portals, transactional business logic, automated payouts, and enterprise security.",
    features: [
      "Custom full-stack architecture (Next.js, Node, Supabase/PostgreSQL)",
      "Multi-role user authentication (Clients, Staff, Admins, Partners)",
      "Interactive user dashboards, profile management & secure storage",
      "Complex business logic, automated billing & financial reporting",
      "End-to-end data encryption, audit logs & automated cloud backups",
      "Staff onboarding training & detailed technical documentation",
      "3 months of dedicated SLA maintenance & security patches"
    ],
    recommended: false,
    ctaText: "Consult for Custom Platform",
    depositTerm: "Milestone-based payment (40% / 30% / 30%)"
  }
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

export const REAL_TESTIMONIALS: RealTestimonial[] = [
  {
    id: "test-1",
    name: "Engr. Babatunde Ogunleye",
    role: "Managing Director",
    business: "Grand Pavilion Events & Hall",
    location: "Ikeja, Lagos",
    avatarText: "BO",
    stars: 5,
    review: "December is usually chaos with customers calling day and night asking how much hall rental is for Christmas parties. Blessed Ogobor built our festive booking website in just 5 days. Customers now view our package prices and book directly via WhatsApp. It saved us massive stress and our bookings are up by over 45%.",
    result: "+45% event bookings in 3 weeks",
    serviceTier: "Festive Booking (₦135,000)",
    verified: true
  },
  {
    id: "test-2",
    name: "Amaka Eze",
    role: "Founder & Creative Director",
    business: "Royal Glow Beauty Lounge",
    location: "Lekki, Lagos",
    avatarText: "AE",
    stars: 5,
    review: "Before Nexora Digital, we spent hours answering repetitive DMs on Instagram asking for hair and spa prices. The 1-page website Blessed built has a clean price list and a WhatsApp button with a pre-filled booking format. It paid for itself in the first 4 days of December.",
    result: "Recovered 30+ lost clients/week",
    serviceTier: "Festive Starter (₦80,000)",
    verified: true
  },
  {
    id: "test-3",
    name: "Dr. Femi Adeleke",
    role: "Medical Director",
    business: "Premier Care Specialist Clinic",
    location: "Surulere, Lagos",
    avatarText: "FA",
    stars: 5,
    review: "A lot of web developers in Nigeria make big promises and disappear. Blessed and Nexora Digital were different: transparent pricing, punctual delivery in 7 days, and they gave our clinic a professional digital face that patients trust.",
    result: "100% patient booking clarity",
    serviceTier: "Business Tier (₦200,000)",
    verified: true
  },
  {
    id: "test-4",
    name: "Tunde Bakare",
    role: "Lead Coordinator",
    business: "UGET Academy E-Learning",
    location: "Lagos & Ogun",
    avatarText: "TB",
    stars: 5,
    review: "Blessed built the complete UGET Academy web platform from scratch with student accounts, course video lessons, and seamless bank transfer and MiniPay checkout. The system is extremely solid, fast, and handles over a thousand users without breaking. Worth every single Naira.",
    result: "1,200+ active students enrolled",
    serviceTier: "Full Enterprise Platform (₦800,000)",
    verified: true
  }
];
