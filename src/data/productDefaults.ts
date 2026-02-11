// Default extended product info for products that don't have custom values
export const getDefaultPackageContents = (name: string): string[] => [
  `1x ${name}`,
  "1x USB Cable",
  "1x Quick Start Guide",
  "1x TDCS Sticker Pack"
];

export const defaultLegal = "This product is sold exclusively for educational purposes, authorized security testing, and legitimate research. Unauthorized use of this device for malicious activities is strictly prohibited and may violate local, state, and federal laws. The buyer assumes all responsibility for legal and ethical use.";

export const defaultDisclaimer = "⚠️ WARNING: This device is intended for authorized security research and educational use only. TDCS and its affiliates are not responsible for any misuse. By purchasing, you agree to use this device in compliance with all applicable laws. Only use on systems you own or have explicit written authorization to test.";

export const defaultDelivery = "🚚 Standard Delivery: 5-7 business days | ⚡ Express Delivery: 2-3 business days (additional charges apply). All orders are shipped via insured courier with real-time tracking. Orders placed before 2 PM IST on business days are dispatched the same day. Free shipping on orders above ₹5,000.";

export const defaultSupport = "🛡️ 30-day replacement warranty for manufacturing defects. 📱 WhatsApp support: Mon-Sat (10 AM - 7 PM IST). 📧 Email: hardware@tdcs.in. 🌐 Community forum access included. 📚 Free setup guides and firmware tutorials.";
