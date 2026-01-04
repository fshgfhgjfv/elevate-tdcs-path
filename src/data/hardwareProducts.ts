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
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=600",
    ],
    category: "Hardware / Penetration Testing",
    rating: 4.9,
    reviewCount: 42,
    originalPrice: 3499,
    salePrice: 2499,
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
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b955?auto=format&fit=crop&q=80&w=600",
    ],
    category: "Education / Bundle",
    rating: 4.8,
    reviewCount: 315,
    originalPrice: 15999,
    salePrice: 4999,
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
  }
];