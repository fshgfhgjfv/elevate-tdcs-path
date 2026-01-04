export interface HardwareProduct {
  id: string;
  name: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  salePrice: number;
  isOutOfStock: boolean;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  reviews: {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

export const hardwareProducts: HardwareProduct[] = [
  {
    id: "pro-ducky-pi",
    name: "TDCS Pro Ducky Pi (RP2040 HID Injector)",
    images: [
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=600", // Microcontroller close up
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600", // Matrix/Hacker code background
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600", // USB connector/Computer port
    ],
    category: "Hardware / Penetration Testing",
    rating: 4.9,
    reviewCount: 42,
    originalPrice: 3499, // Standard pricing for custom hardware tools
    salePrice: 2499,     // Competitive entry point for students/enthusiasts
    isOutOfStock: false,
    description: "The TDCS Pro Ducky Pi is a stealthy, RP2040-powered Keystroke Injection tool designed for Red Team engagements and physical security assessments. Fully compatible with DuckyScript™ payloads, it allows for rapid automated task execution upon insertion. Features a discreet form factor with a custom 3D-printed protective casing.",
    features: [
      "Instant DuckyScript™ Payload Execution",
      "Stealth Mode & Boot Selector Switch",
      "Supports CircuitPython & MicroPython",
      "Unbrickable Bootloader (Drag & Drop Flashing)",
      "Cross-platform: Windows, Linux, macOS, Android (OTG)"
    ],
    specifications: [
      { label: "Microcontroller", value: "RP2040 (Dual ARM Cortex-M0+ @ 133MHz)" },
      { label: "Storage", value: "16MB SPI Flash (Stores ~500 payloads)" },
      { label: "Interface", value: "USB 1.1 Device & Host" },
      { label: "Form Factor", value: "Standard USB Stick (Type-A)" },
      { label: "Input Voltage", value: "5V DC (USB Bus Powered)" }
    ],
    reviews: [
      { id: "101", author: "Rohan K.", rating: 5, date: "2024-02-14", comment: "Incredible value compared to the original Rubber Ducky. The drag-and-drop payload flashing is a lifesaver." },
      { id: "102", author: "Sarah Jenkins", rating: 4, date: "2024-01-22", comment: "Great build quality. Documentation on the TDCS portal was very helpful for getting started with CircuitPython." },
      { id: "103", author: "EthicalHacker_07", rating: 5, date: "2023-12-10", comment: "Must-have for physical pentests. Small, discreet, and fast." }
    ]
  },
  {
    id: "all-tdcs-courses",
    name: "TDCS Cyber Mastery Bundle (Lifetime Access)",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600", // Cybersecurity lock/digital
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600", // Coding screen
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=600", // Classroom/Learning vibe
    ],
    category: "Education / Bundle",
    rating: 4.8,
    reviewCount: 315,
    originalPrice: 15999, // Higher anchor price to show value of "All Courses"
    salePrice: 4999,      // Realistic heavy discount price for course bundles
    isOutOfStock: false,
    description: "Unlock your career in cybersecurity with the complete TDCS course library. This bundle grants you lifetime access to every current and future course we publish. From Python for Hackers to Advanced Web Penetration Testing and Bug Bounty Hunting, you get it all. Includes access to our private Discord community and monthly live Q&A sessions.",
    features: [
      "Access to 15+ Premium Courses (100+ Hours)",
      "Zero-to-Hero: Network, Web, & Mobile Security",
      "Private Discord Community Access",
      "Monthly Live Mentorship Calls",
      "ISO Certified Completion Certificates"
    ],
    specifications: [
      { label: "Duration", value: "Self-Paced (Lifetime Access)" },
      { label: "Language", value: "English & Hindi Support" },
      { label: "Level", value: "Beginner to Advanced" },
      { label: "Prerequisites", value: "Basic IT Knowledge (No Coding Required)" },
      { label: "Certification", value: "TDCS Certified Security Associate (TCSA)" }
    ],
    reviews: [
      { id: "201", author: "Amit Verma", rating: 5, date: "2024-03-01", comment: "The Bug Bounty module alone is worth the price. I found my first P4 vulnerability 2 weeks after finishing it!" },
      { id: "202", author: "Priya S.", rating: 5, date: "2024-02-15", comment: "Best investment for my career. The live sessions with the instructors really help clear up doubts." },
      { id: "203", author: "Rahul Das", rating: 4, date: "2024-01-05", comment: "Great content. Waiting for the new Cloud Security update, but otherwise excellent value." }
    ]
  },
];      { label: "Total Hours", value: "200+ hours" },
      { label: "Skill Level", value: "Beginner to Advanced" },
      { label: "Access", value: "Lifetime" },
      { label: "Support", value: "24/7" }
    ],
    reviews: [
      { id: "1", author: "LearnHack", rating: 5, date: "2024-01-20", comment: "Best investment for my cybersecurity career!" },
      { id: "2", author: "BugHunter", rating: 5, date: "2024-01-18", comment: "Comprehensive content, excellent instructors." }
    ]
  },
  {
    id: "atoms3u-rubber-duck",
    name: "AtomS3U (Rubber-Duck-Kit)",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600",
    ],
    category: "Hardware",
    rating: 4.7,
    reviewCount: 42,
    originalPrice: 2999,
    salePrice: 2499,
    isOutOfStock: false,
    description: "Compact USB attack tool with OLED display. Features AtomS3U with pre-installed rubber ducky firmware for keystroke injection attacks.",
    features: [
      "Built-in OLED display",
      "AtomS3U microcontroller",
      "USB-C connectivity",
      "Pre-configured payloads",
      "Expandable storage"
    ],
    specifications: [
      { label: "Display", value: "0.85 inch IPS LCD" },
      { label: "Processor", value: "ESP32-S3" },
      { label: "Memory", value: "8MB Flash" },
      { label: "Battery", value: "N/A - USB Powered" },
      { label: "Weight", value: "15g" }
    ],
    reviews: [
      { id: "1", author: "TechNinja", rating: 5, date: "2024-01-12", comment: "Love the display feature!" }
    ]
  },
  {
    id: "bw16-5ghz-kit",
    name: "BW16-5Ghz Kit (Pre-Installed Firmware)",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600",
      "https://images.unsplash.com/photo-1625225233840-695456021cde?w=600",
    ],
    category: "Hardware",
    rating: 5.00,
    reviewCount: 18,
    originalPrice: 1999,
    salePrice: 1499,
    isOutOfStock: false,
    description: "Dual-band WiFi pentesting kit supporting 2.4GHz and 5GHz networks. Perfect for WiFi security audits and network penetration testing.",
    features: [
      "Dual-band 2.4GHz & 5GHz support",
      "Pre-installed deauth firmware",
      "Monitor mode enabled",
      "Packet injection ready",
      "Compact design"
    ],
    specifications: [
      { label: "Frequency", value: "2.4GHz & 5GHz" },
      { label: "Chipset", value: "RTL8720DN" },
      { label: "Protocol", value: "802.11 a/b/g/n/ac" },
      { label: "Interface", value: "USB 2.0" },
      { label: "Antenna", value: "Internal" }
    ],
    reviews: [
      { id: "1", author: "WiFiHacker", rating: 5, date: "2024-01-08", comment: "Finally a 5GHz tool that works!" }
    ]
  },
  {
    id: "cyber-t-usb-army-knife",
    name: "CYBER-T USB-ARMY-KNIFE (Pre-Installed Firmware)",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
      "https://images.unsplash.com/photo-1625225233840-695456021cde?w=600",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600",
    ],
    category: "Hardware",
    rating: 5.00,
    reviewCount: 32,
    originalPrice: 3499,
    salePrice: 2860,
    isOutOfStock: false,
    description: "All-in-one USB hacking toolkit. Combines rubber ducky, WiFi deauth, BadUSB, and more in one compact device.",
    features: [
      "Multi-tool functionality",
      "Rubber Ducky mode",
      "WiFi deauth capability",
      "BadUSB attacks",
      "OLED status display"
    ],
    specifications: [
      { label: "Processor", value: "ESP32-S3" },
      { label: "WiFi", value: "2.4GHz 802.11b/g/n" },
      { label: "Storage", value: "16MB Flash" },
      { label: "Display", value: "0.96 inch OLED" },
      { label: "Battery", value: "300mAh LiPo" }
    ],
    reviews: [
      { id: "1", author: "RedTeamer", rating: 5, date: "2024-01-22", comment: "Swiss army knife of hacking tools!" }
    ]
  },
  {
    id: "cyd-esp32-marauder",
    name: "CYD-ESP32 (Marauder) Cyber Edition",
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600",
    ],
    category: "Hardware",
    rating: 5.00,
    reviewCount: 45,
    originalPrice: 3999,
    salePrice: 2999,
    isOutOfStock: false,
    description: "ESP32 Marauder with touchscreen display. Advanced WiFi/Bluetooth security testing tool with intuitive touch interface.",
    features: [
      "2.8 inch touchscreen",
      "WiFi scanning and deauth",
      "Bluetooth sniffing",
      "Built-in SD card slot",
      "Rechargeable battery"
    ],
    specifications: [
      { label: "Display", value: "2.8 inch TFT Touch" },
      { label: "Processor", value: "ESP32-WROOM-32" },
      { label: "Storage", value: "MicroSD support" },
      { label: "Battery", value: "1000mAh" },
      { label: "Charging", value: "USB-C" }
    ],
    reviews: [
      { id: "1", author: "CyberAce", rating: 5, date: "2024-01-25", comment: "The touchscreen makes it so easy to use!" }
    ]
  },
  {
    id: "esp32-2nrf-kit",
    name: "ESP32/2NRF Kit (Bluetooth Penetration)",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600",
      "https://images.unsplash.com/photo-1625225233840-695456021cde?w=600",
    ],
    category: "Hardware",
    rating: 4.50,
    reviewCount: 28,
    originalPrice: 2499,
    salePrice: 1799,
    isOutOfStock: true,
    description: "Dual NRF24 + ESP32 combo for Bluetooth and 2.4GHz spectrum analysis. Perfect for wireless security research.",
    features: [
      "Dual NRF24L01+ modules",
      "ESP32 controller",
      "2.4GHz spectrum analysis",
      "Bluetooth LE support",
      "Modular design"
    ],
    specifications: [
      { label: "Modules", value: "2x NRF24L01+ PA+LNA" },
      { label: "Controller", value: "ESP32-DevKit" },
      { label: "Range", value: "Up to 1000m (open air)" },
      { label: "Power", value: "USB 5V" },
      { label: "Interface", value: "SPI" }
    ],
    reviews: [
      { id: "1", author: "BlueHacker", rating: 5, date: "2024-01-05", comment: "Amazing range with the PA+LNA modules!" }
    ]
  },
  {
    id: "esp8266-wifi-kit",
    name: "ESP8266-Kit (Pre-Installed WiFi Firmware)",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600",
    ],
    category: "Hardware",
    rating: 4.3,
    reviewCount: 89,
    originalPrice: 999,
    salePrice: 599,
    isOutOfStock: false,
    description: "Budget-friendly WiFi deauth tool. Perfect for beginners learning about WiFi security testing.",
    features: [
      "Pre-installed deauth firmware",
      "Web-based interface",
      "Compact NodeMCU form factor",
      "Easy to flash custom firmware",
      "Great for learning"
    ],
    specifications: [
      { label: "Chip", value: "ESP8266" },
      { label: "WiFi", value: "2.4GHz 802.11b/g/n" },
      { label: "Flash", value: "4MB" },
      { label: "GPIO", value: "11 pins" },
      { label: "Power", value: "Micro USB" }
    ],
    reviews: [
      { id: "1", author: "NewbieHacker", rating: 4, date: "2024-01-02", comment: "Great starter kit for learning WiFi security!" }
    ]
  },
  {
    id: "evil-team-redteamer",
    name: "EvilTeam (RedTeamer Choice)",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
    ],
    category: "Courses",
    rating: 4.50,
    reviewCount: 67,
    originalPrice: 2000,
    salePrice: 1099,
    isOutOfStock: false,
    description: "Comprehensive red team course covering advanced attack techniques, persistence, and evasion methods.",
    features: [
      "Active Directory attacks",
      "Phishing campaigns",
      "Persistence techniques",
      "Evasion methods",
      "Real-world scenarios"
    ],
    specifications: [
      { label: "Duration", value: "40+ hours" },
      { label: "Level", value: "Intermediate to Advanced" },
      { label: "Labs", value: "50+ hands-on labs" },
      { label: "Certificate", value: "Yes" },
      { label: "Access", value: "Lifetime" }
    ],
    reviews: [
      { id: "1", author: "PentestPro", rating: 5, date: "2024-01-28", comment: "Best red team course I've taken!" }
    ]
  }
];

export const getProductById = (id: string): HardwareProduct | undefined => {
  return hardwareProducts.find(p => p.id === id);
};

export const getRelatedProducts = (id: string, limit: number = 4): HardwareProduct[] => {
  const product = getProductById(id);
  if (!product) return [];
  
  return hardwareProducts
    .filter(p => p.id !== id && p.category === product.category)
    .slice(0, limit);
};
