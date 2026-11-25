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

  // Official Active Payment Channels
  payment: {
    // 1. MiniPay App (Scan-to-Pay QR Code & Phone Number)
    miniPay: {
      title: "MiniPay (Scan to Pay)",
      number: "+234 812 141 4107",
      rawNumber: "08121414107",
      qrCodeImage: "/minipay-qr.png",
      settlementBank: "OPay (6110509465)",
      instructions: "Scan the official MiniPay QR code with Opera Mini or any smartphone camera, or send to MiniPay number: +234 812 141 4107. Zero card decline issues, instant settlement."
    },

    // 2. Official Direct Bank Transfer (OPay Business)
    opayBusiness: {
      bankName: "OPay (Paycom)",
      accountNumber: "6110509465",
      accountName: "Blessed Ogobor / Nexora Digital",
      currency: "NGN (₦)",
      instructions: "Transfer to OPay account 6110509465, then share payment proof to 09069321502 on WhatsApp for instant confirmation."
    },

    // 3. Monnify API Integration (COMMENTED OUT FOR NOW - Pending CAC Business Registration)
    /*
    monnify: {
      enabled: false,
      status: "pending_cac_registration",
      title: "Monnify Virtual Accounts",
      settlementAccount: "6110509465 (OPay)",
      apiKey: process.env.NEXT_PUBLIC_MONNIFY_API_KEY || "",
      contractCode: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE || "",
      instructions: "Monnify automated virtual accounts will be reactivated once CAC business registration is completed."
    }
    */
  }
};
