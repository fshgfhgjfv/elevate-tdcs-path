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
  longDescription?: string;
  features: string[];
  specifications: { label: string; value: string }[];
  videoUrl?: string;
  packageContents?: string[];
  legal?: string;
  disclaimer?: string;
  delivery?: string;
  support?: string;
  reviews: {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
    title?: string;
    verified?: boolean;
    reviewPhotos?: string[]; // Added for customer image grid
  }[];
}

export const hardwareProducts: HardwareProduct[] = [
  {
    id: "Raspberry pi pico",
    name: "Raspberry Pi Pico (TDCS Edition)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjbayeundx_TQVe4KxDo141n0wlmgwN009qVBXw8J2HnduSQQyuFc5tKMVwqtHALQl8Q7Dx3-llm2hgOEBzd-F1laXUoUReyZEsAy0N610PLxGjoxuMWc6HX6UKffANdNWo65-vSJP3W0Mq1XECsabs5EU-Oq6uIL7JdNURS-E12QKZutxFTUSoqHzjnbVF",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjx9_GSMO5DyQC2NSe6KUAjf7kFX0PJwoFUeao1B7YDeSQL3nD3YTAItfuDAALZb2qsPyxIhmOSxzugMoINNmFFrTwZGqNFU1tI7BFEDjbdTsOuhVmFbUF8XL_T81ffiTv6b-xRPaxFFWWCYjNyshcgWM8CZqPse32Um0_ao7RTouOP1DmqhilCeAqA-n6T",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjFStVASvoGyiNo04tlPnpm-hH8wBkGh4QKF2nPHLYvn-IawRnnXfCRsKbiNhoI867nml6FDOlyjKYHL_D8ppfYlKBc9VdX4qdA-HlD2RyEqN1_zsB6bC91Q3RsvDhz19ZSaOJXrJ6DxmhlrlwZAgT9uQ8OWlneyGeiUgpwleSVxHfocqvEwNlWU0ZSFoVk"
    ],
    category: "Hardware / HID",
    rating: 4.9,
    reviewCount: 42,
    originalPrice: 1499,
    salePrice: 999,
    isOutOfStock: false,
    description: "The Raspberry Pi Pico is a radical change from the previous Pis, because it’s not a Linux computer—it’s a microcontroller.",
    features: ["Dual-core ARM® Cortex®-M0+ @ 133MHz", "Ideal for HID Attacks"],
    specifications: [{ label: "Microcontroller", value: "RP2040" }],
    reviews: [
      { 
        id: "101", 
        author: "Rohan K.", 
        rating: 5, 
        date: "2024-02-14", 
        comment: "Incredible value. Drag-and-drop works perfectly.", 
        title: "Best Budget HID Device", 
        verified: true 
      }
    ]
  },
  {
    id: "tdcs-proxmark3",
    name: "TDCS Proxmark3 Easy (RFID Cloner)",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCl8g23rs-j0jkZNN-ycKiFsjsAGZmR2IOqg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLFrhyjIE8Lv8j-cj7hyPXT17Q5fIRXxeO0A&s"
    ],
    category: "RFID / Access Control",
    rating: 4.3,
    reviewCount: 10036,
    originalPrice: 6500,
    salePrice: 4999,
    isOutOfStock: false,
    description: "The industry-standard Swiss Army Knife for RFID analysis.",
    features: ["Dual Antenna (HF/LF)", "Full Iceman Firmware support"],
    specifications: [{ label: "HF Support", value: "13.56 MHz" }],
    reviews: [
      {
        id: "pm3-rev-01",
        author: "Verified Buyer",
        rating: 5,
        date: "2026-02-10",
        title: "Perfect for cloning",
        comment: "Package arrived in great condition. Successfully cloned my office badge.",
        verified: true,
        reviewPhotos: [
          "https://blogger.googleusercontent.com/img/a/AVvXsEhJOeEO47bUCZoKZEpnL3KZqxh6Y_CVpC3MwMbQVAV432R8AZZjHvD8kTgOs19zeTnKtNG7Zg26xz4Rvf0K4VzjiKQcaG1xaoQBwcO_JQs2x0XUAfKug7MxEvtu67wUhr-getw-oeIZAk9CTWKpsyBY8BCQ0b_z4hlwUYeFVhmjLes5pedaiASi36xKkEfL",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLFrhyjIE8Lv8j-cj7hyPXT17Q5fIRXxeO0A&s"
        ]
      }
    ]
  },
  {
    id: "flipper-zero-tdcs",
    name: "Flipper Zero Multi-tool",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXhEgFQxKSUMLMNnLKbDvUFH0aOEyAOi3xg&s",
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Flipper_Zero_back_view.jpg"
    ],
    category: "Hacking / Multi-tool",
    rating: 4.8,
    reviewCount: 1540,
    originalPrice: 40000,
    salePrice: 29999,
    isOutOfStock: false,
    description: "The ultimate portable multi-tool for security professionals.",
    features: ["Sub-GHz Transceiver", "125kHz/NFC RFID", "Infrared learning"],
    specifications: [{ label: "CPU", value: "STM32WB55" }],
    reviews: [
      {
        id: "fz-rev-01",
        author: "Verified Buyer",
        rating: 5,
        date: "2026-02-11",
        title: "Unboxing experience was great",
        comment: "Build quality is top tier. Already leveled up my cyber-dolphin.",
        verified: true,
        reviewPhotos: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCzYa7L4FUxTtk7-lM795TheDO9YAOySooA&s",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXhEgFQxKSUMLMNnLKbDvUFH0aOEyAOi3xg&s"
        ]
      }
    ]
  },
  {
    id: "tdcs-keylogger-usb",
    name: "TDCS Cyber-T",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEhpg85kcbLYyB0P3udNVYsShqBclfoItuKOHIJdv0e24E4k-0vpvNvZJPE_wZyzLBIF5A0D2zvNwgKMaEcpRbvDYnhXJHzPBBknmC-6dTxtjfzx5lZFzlSJx_JeED7zUYkGSe8R4V9r1j2q6CfN6T-9y4B2Nw19WpasOhVPnue_9ElCVBltZ34PVOIPZP3x"
    ],
    category: "Surveillance",
    rating: 4.7,
    reviewCount: 18,
    originalPrice: 8500,
    salePrice: 2580,
    isOutOfStock: false,
    description: "Compact cybersecurity training platform for hardware security experiments.",
    features: ["WiFi exfiltration", "Hidden MicroSD slot"],
    specifications: [{ label: "Wireless", value: "WiFi 2.4GHz" }],
    reviews: [
      {
        id: "ct-rev-01",
        author: "Verified Buyer",
        rating: 5,
        date: "2026-02-09",
        title: "Very small and stealthy",
        comment: "Perfect for testing WiFi exfiltration in a controlled environment.",
        verified: true,
        reviewPhotos: [
          "https://blogger.googleusercontent.com/img/a/AVvXsEhpg85kcbLYyB0P3udNVYsShqBclfoItuKOHIJdv0e24E4k-0vpvNvZJPE_wZyzLBIF5A0D2zvNwgKMaEcpRbvDYnhXJHzPBBknmC-6dTxtjfzx5lZFzlSJx_JeED7zUYkGSe8R4V9r1j2q6CfN6T-9y4B2Nw19WpasOhVPnue_9ElCVBltZ34PVOIPZP3x"
        ]
      }
    ]
  },
  {
    id: "tdcs-faraday-bag",
    name: "TDCS RF Shielding Faraday Bag",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEh71-8k07O9NEkuUcD81uYTMINuGfcfNdSko3MLY9c0ntp0tY1wdcjGc01_g3TSJsxdVnm97V5kFh9oQT3MhAhcR1f68G8eO9UTtf-jLSsfenyN2LQnWOxS6Gs5aygApO-_geI-36XtcSfd-7BX25eeNWW79lOUFv5ySb4_yRuRrcmhUR7Kt8Wz6cHpg3gA"
    ],
    category: "Forensics",
    rating: 4.6,
    reviewCount: 92,
    originalPrice: 1200,
    salePrice: 899,
    isOutOfStock: false,
    description: "Blocks all incoming and outgoing electromagnetic signals.",
    features: ["Blocks WiFi/Cell/GPS", "Attenuation >85 dB"],
    specifications: [{ label: "Efficiency", value: "99.99%" }],
    reviews: [
      {
        id: "fb-rev-01",
        author: "Verified Buyer",
        rating: 5,
        date: "2026-01-20",
        comment: "Tested with my phone inside, zero signal. Essential for privacy.",
        verified: true,
        reviewPhotos: ["https://blogger.googleusercontent.com/img/a/AVvXsEh71-8k07O9NEkuUcD81uYTMINuGfcfNdSko3MLY9c0ntp0tY1wdcjGc01_g3TSJsxdVnm97V5kFh9oQT3MhAhcR1f68G8eO9UTtf-jLSsfenyN2LQnWOxS6Gs5aygApO-_geI-36XtcSfd-7BX25eeNWW79lOUFv5ySb4_yRuRrcmhUR7Kt8Wz6cHpg3gA"]
      }
    ]
  }
];