export const BRAND = {
  name: "Nexora Digital",
  shortName: "Nexora",
  domain: "nexora.digital",
  tagline: "High-Performance Websites & Web Platforms That Turn Visitors Into Paying Clients",
  developerName: "Blessed Ogobor",
  phone: "09069321502",
  whatsappNumber: "2349069321502",
  whatsappUrl: "https://wa.me/2349069321502",
  email: "blessedogobor@gmail.com",
  location: "Lagos & Ogun, Nigeria",
  githubUrl: "https://github.com/Bfranky",
  portfolioDemoUrl: "https://portfolio-zeta-three-34.vercel.app",

  // Official Payment Details for Clients & Agents
  payment: {
    // 1. Official Direct Bank Transfer (OPay Business)
    opayBusiness: {
      bankName: "OPay (Paycom)",
      accountNumber: "6110509465",
      accountName: "Blessed Ogobor / Nexora Digital",
      currency: "NGN (₦)",
      instructions: "Transfer to OPay account 6110509465, then share proof of payment to 09069321502 on WhatsApp for instant confirmation."
    },

    // 2. MiniPay App (Scan-to-Pay QR)
    miniPay: {
      title: "MiniPay (Scan to Pay)",
      settlementBank: "OPay (6110509465)",
      instructions: "Client scans the MiniPay QR code with Opera Mini or MiniPay app, pays in Naira (NGN), and funds automatically convert and settle directly into your OPay account."
    },

    // 3. Monnify API Integration
    monnify: {
      title: "Monnify Virtual Accounts",
      settlementAccount: "6110509465 (OPay)",
      apiKey: process.env.NEXT_PUBLIC_MONNIFY_API_KEY || "",
      contractCode: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE || "",
      instructions: "Monnify creates an instant automated virtual account (Wema / Moniepoint) for each customer checkout, and auto-settles deposits directly to your OPay account."
    }
  }
};
