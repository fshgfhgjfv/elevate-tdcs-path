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
    id: "Raspberry pi pico",
    name: "Raspberry pi pico(TDCS)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjbayeundx_TQVe4KxDo141n0wlmgwN009qVBXw8J2HnduSQQyuFc5tKMVwqtHALQl8Q7Dx3-llm2hgOEBzd-F1laXUoUReyZEsAy0N610PLxGjoxuMWc6HX6UKffANdNWo65-vSJP3W0Mq1XECsabs5EU-Oq6uIL7JdNURS-E12QKZutxFTUSoqHzjnbVF",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjx9_GSMO5DyQC2NSe6KUAjf7kFX0PJwoFUeao1B7YDeSQL3nD3YTAItfuDAALZb2qsPyxIhmOSxzugMoINNmFFrTwZGqNFU1tI7BFEDjbdTsOuhVmFbUF8XL_T81ffiTv6b-xRPaxFFWWCYjNyshcgWM8CZqPse32Um0_ao7RTouOP1DmqhilCeAqA-n6T",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjFStVASvoGyiNo04tlPnpm-hH8wBkGh4QKF2nPHLYvn-IawRnnXfCRsKbiNhoI867nml6FDOlyjKYHL_D8ppfYlKBc9VdX4qdA-HlD2RyEqN1_zsB6bC91Q3RsvDhz19ZSaOJXrJ6DxmhlrlwZAgT9uQ8OWlneyGeiUgpwleSVxHfocqvEwNlWU0ZSFoVk",
       "https://blogger.googleusercontent.com/img/a/AVvXsEioEP4gDS1L_sX-9iASJ0TZcdsAv7fGszsHO-pJNVnEqAdAra2_QVetbdpKNpOUFfU_SqgwCuJ2iyKtjqfQI8LcP_QqVLOhHXG-diOyUa07biUicsds79gqPgy0g1tkq6L-d2IfteuFTcqHCXN5PfCqP0_371xIu4anrSDlq6_Vjt83nYd9ZS8eqsRZ7YGW",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjFFdojP8ESk0OWyp_LbI0Zqaa2FZzlJMGVIjshjaL-XwzgGxW8-J16q4_6HiLJHGRuWPBDjzxGSAhG_fsKhRJWPx6zw9rC8IjMXPoantaZN66cVQCkcB_FUDANqw_drNf9r-7lPZcXvHw9uFF3K5yjdC2MoxCVHZHVBWPtXuNDANqO7oZa8t4l7rmoP1Yi",
    ],
    category: "Hardware / HID",
    rating: 4.9,
    reviewCount: 42,
    originalPrice: 3499,
    salePrice: 999,
    isOutOfStock: false,
    description: "The Raspberry Pi Pico is a high-performance, low-cost microcontroller development board built around the powerful RP2040 microcontroller. Designed for embedded systems, IoT projects, and educational applications, the Pico offers exceptional processing power, flexible I/O options, and ease of programming, making it ideal for both beginners and professionals.",
    features: [
      "Dual-core ARM® Cortex®-M0+ processor",
      "Clock speed up to 133 MHz",
      "High performance with low power consumption",
      "Programmable using MicroPython and C/C++ SDK"
    ],
    specifications: [
      { label: "Microcontroller", value: "RP2040" },
      { label: "Storage", value: "16MB SPI Flash" },
      { label: "Interface", value: "USB Type-A" }
    ],
    reviews: [
      { id: "101", author: "Rohan K.", rating: 5, date: "2024-02-14", comment: "Incredible value. Drag-and-drop works perfectly." }
    ]
  },
  {
    id: "all-tdcs-courses",
    name: "ESP8266 - Kit",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEi19affCJsFqGgVFUFzlYkdaP0AcsjA-n_bbE8FYNewIK_7kHEeY25UvGTsqZKpiMfzqPFPtd8dvPXdpSGW3WLK2NpTglfiMYImq_JvHK1xcT1u5ENaxPsWe6CGRhUh3gsysUy33FqYkJPmrAE_rk94OJAhtJQd9FhMX_qBboPIIjyybK7T8tZeyG8OJrcn",
      "https://blogger.googleusercontent.com/img/a/AVvXsEgm2rP7ziezJgjJkwMidPVi6eCPXbnTV0ApJQFgX0B-H3H2dSYEebM8nt23Y99FCbfi5a6aUU9auyTum2fdPfvV_vdKZcqGDlS7ld672MLC_XzXiWAuO07jDtF5UI84foQfVoMrSo5TUskp7Jh5irhkc8Xc7Txqqz9gNBzSTeDRhy7R2lOau9Mht3AeXoXs",
      "https://blogger.googleusercontent.com/img/a/AVvXsEhSc57v-lais9H2HkY7LbEIAVffLLj-RaQ-APgWVjv06RGigXjIsqr2RQU-Ylnq-Mmxcacy6ceLRTPm2Jqfhhnk2m5Sp53KH8-lbbgAeM0QvOP1pKHwWOJD10WW5KVmxb9jh9XI9iJh70nVjNU8xgGw1bc8aqHUaYTE9txTh4qnnFnx_or_YItIWI97NEW3",
    ],
    category: "Network Auditing",
    rating: 4.8,
    reviewCount: 315,
    originalPrice: 1999,
    salePrice: 499,
    isOutOfStock: false,
    description: "The ESP8266 Wi-Fi Development Kit is a compact, cost-effective solution designed to empower makers, students, and professional engineers with wireless connectivity. Built around the powerful ESP8266 microcontroller, this kit enables rapid development of Internet of Things (IoT) applications with seamless Wi-Fi connectivity, low power consumption, and easy programmability.",
    features: ["Powered by ESP8266 SoC", "Lightweight and space-efficient PCB", "Integrated Wi-Fi", "Supports Arduino IDE, MicroPython, Lua, and AT Command Firmware"],
    specifications: [
      { label: "Microcontroller", value: "ESP8266 SoC" },
      { label: "Wi-Fi Standard", value: "802.11 b/g/n" }
    ],
    reviews: [
      { id: "201", author: "Amit V.", rating: 5, date: "2024-03-01", comment: "Best investment for my career." }
    ]
  },
  {
    id: "tdcs-wifi-deauther",
    name: "TDCS WiFi Deauther Watch V3 (ESP8266)",
    images: [
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1551808525-51a943718d53?auto=format&fit=crop&q=80&w=600"
    ],
    category: "WiFi Auditing",
    rating: 4.7,
    reviewCount: 89,
    originalPrice: 4999,
    salePrice: 3499,
    isOutOfStock: false,
    description: "Wearable ESP8266 development board pre-flashed with Deauther firmware. Allows you to test 2.4GHz networks for deauthentication vulnerabilities.",
    features: ["WiFi Deauth Attack", "Packet Monitor", "Clock & Laser Integration", "Completely Open Source"],
    specifications: [
      { label: "Chipset", value: "ESP8266" },
      { label: "Display", value: "1.3 inch OLED" },
      { label: "Battery", value: "800mAh Li-ion" }
    ],
    reviews: []
  },
  {
    id: "tdcs-hackrf-one",
    name: "TDCS HackRF One + Portapack H2 (SDR)",
    images: [
      "https://images.unsplash.com/photo-1580835239846-5bb2ce856a7d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=600"
    ],
    category: "SDR / Radio",
    rating: 5.0,
    reviewCount: 15,
    originalPrice: 24999,
    salePrice: 18999,
    isOutOfStock: false,
    description: "The ultimate Software Defined Radio station. Comes with Portapack H2 (Mayhem Firmware) for standalone analysis of radio signals from 1MHz to 6GHz.",
    features: ["1MHz to 6GHz Operating Frequency", "Half-duplex transceiver", "Standalone Mode", "Custom Aluminum Case"],
    specifications: [
      { label: "Frequency", value: "1MHz - 6GHz" },
      { label: "Bandwidth", value: "20MHz" },
      { label: "ADC/DAC", value: "8-bit" }
    ],
    reviews: []
  },
  {
    id: "tdcs-rtl-sdr",
    name: "TDCS RTL-SDR Blog V3 (Dipole Antenna Kit)",
    images: [
      "https://images.unsplash.com/photo-1515461971439-684260d8a57e?auto=format&fit=crop&q=80&w=600"
    ],
    category: "SDR / Radio",
    rating: 4.5,
    reviewCount: 120,
    originalPrice: 3500,
    salePrice: 2899,
    isOutOfStock: false,
    description: "The best entry-level SDR for beginners. Listen to aircraft (ADS-B), police radio, satellites (NOAA), and analyze GSM signals.",
    features: ["Low Noise floor", "Direct Sampling Mode (HF)", "Bias Tee Powered", "Aluminum enclosure"],
    specifications: [
      { label: "Chipset", value: "RTL2832U + R820T2" },
      { label: "Frequency", value: "500 kHz – 1.7 GHz" },
      { label: "Connector", value: "SMA Female" }
    ],
    reviews: []
  },
  {
    id: "tdcs-cc1101",
    name: "TDCS CC1101 Sub-GHz Transceiver Module",
    images: [
      "https://images.unsplash.com/photo-1555664424-778a69022365?auto=format&fit=crop&q=80&w=600"
    ],
    category: "SDR / Radio",
    rating: 4.2,
    reviewCount: 34,
    originalPrice: 899,
    salePrice: 499,
    isOutOfStock: false,
    description: "High-power Sub-GHz module perfect for interacting with gates, cars, and remotes. Compatible with Flipper Zero, Arduino, and Raspberry Pi.",
    features: ["Supports 315/433/868/915 MHz", "External Antenna for High Gain", "SPI Interface"],
    specifications: [
      { label: "Chip", value: "TI CC1101" },
      { label: "Interface", value: "SPI" },
      { label: "Range", value: "Up to 500m (LoS)" }
    ],
    reviews: []
  },
  {
    id: "tdcs-ubertooth",
    name: "TDCS Ubertooth One (Bluetooth Sniffer)",
    images: [
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Bluetooth",
    rating: 4.6,
    reviewCount: 12,
    originalPrice: 12000,
    salePrice: 9999,
    isOutOfStock: true,
    description: "Open source 2.4 GHz wireless development platform suitable for Bluetooth experimentation. The world's first affordable Bluetooth monitoring platform.",
    features: ["Bluetooth Basic Rate Sniffing", "Spectrum Analysis", "2.4 GHz Transmit/Receive"],
    specifications: [
      { label: "Power", value: "USB" },
      { label: "Range", value: "Comparable to Class 1 BT" }
    ],
    reviews: []
  },
  {
    id: "tdcs-proxmark3",
    name: "TDCS Proxmark3 Easy (RFID/NFC Cloner)",
    images: [
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=600"
    ],
    category: "RFID / Access Control",
    rating: 4.8,
    reviewCount: 56,
    originalPrice: 6500,
    salePrice: 4999,
    isOutOfStock: false,
    description: "The industry standard for RFID analysis. Clone, simulate, and analyze both High Frequency (13.56MHz) and Low Frequency (125kHz) cards and tags.",
    features: ["Dual Frequency Support", "Standalone Mode", "Full Mifare Crack Support"],
    specifications: [
      { label: "HF Support", value: "13.56 MHz (Mifare, iClass)" },
      { label: "LF Support", value: "125 kHz (HID, EM4100)" },
      { label: "Firmware", value: "Iceman Repo Compatible" }
    ],
    reviews: []
  },
  {
    id: "tdcs-acr122u",
    name: "TDCS ACR122U NFC Reader/Writer",
    images: [
      "https://images.unsplash.com/photo-1563206767-5b1d972d9323?auto=format&fit=crop&q=80&w=600"
    ],
    category: "RFID / Access Control",
    rating: 4.3,
    reviewCount: 200,
    originalPrice: 3999,
    salePrice: 2800,
    isOutOfStock: false,
    description: "Reliable USB NFC reader used in many security courses. Great for reading and writing Mifare Classic cards and basic NFC experimentation.",
    features: ["Read/Write Speed up to 424 kbps", "Built-in Antenna", "Libnfc Compatible"],
    specifications: [
      { label: "Protocol", value: "ISO 14443 A/B" },
      { label: "Frequency", value: "13.56 MHz" }
    ],
    reviews: []
  },
  {
    id: "tdcs-lockpick-set",
    name: "TDCS Transparent Lock Pick Training Set",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Physical Security",
    rating: 4.5,
    reviewCount: 310,
    originalPrice: 1999,
    salePrice: 1299,
    isOutOfStock: false,
    description: "Learn the art of lockpicking with this clear acrylic practice lock. See exactly how the pins move when you insert the key or pick.",
    features: ["Transparent Casing", "12 Hardened Steel Picks", "Tension Wrenches Included"],
    specifications: [
      { label: "Material", value: "Acrylic & Stainless Steel" },
      { label: "Pieces", value: "15 Total" }
    ],
    reviews: []
  },
  {
    id: "tdcs-magspoof",
    name: "TDCS MagSpoof (Magnetic Stripe Emulator)",
    images: [
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Physical Security",
    rating: 5.0,
    reviewCount: 8,
    originalPrice: 2500,
    salePrice: 1999,
    isOutOfStock: true,
    description: "A device that can emulate magnetic stripes wirelessly. It works by generating a strong electromagnetic field that mimics a traditional card swipe.",
    features: ["Emulates Track 1, 2 & 3", "Wireless usage", "Tiny form factor"],
    specifications: [
      { label: "Controller", value: "ATtiny85" },
      { label: "Power", value: "3.7V LiPo" }
    ],
    reviews: []
  },
  {
    id: "tdcs-pi5-kit",
    name: "TDCS Raspberry Pi 5 Kali Linux Kit (8GB)",
    images: [
      "https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Single Board Computers",
    rating: 4.9,
    reviewCount: 65,
    originalPrice: 12000,
    salePrice: 9800,
    isOutOfStock: false,
    description: "The beast is here. Raspberry Pi 5 with 8GB RAM, pre-loaded with a customized TDCS Kali Linux build. Includes active cooling case.",
    features: ["2.4GHz Quad-core CPU", "Dual 4K Support", "PCIe 2.0 Interface", "Active Cooler Included"],
    specifications: [
      { label: "RAM", value: "8GB LPDDR4X" },
      { label: "Processor", value: "Broadcom BCM2712" },
      { label: "OS", value: "Kali Linux (TDCS Mod)" }
    ],
    reviews: []
  },
  {
    id: "tdcs-esp32-cam",
    name: "TDCS ESP32-CAM Spy Module",
    images: [
      "https://images.unsplash.com/photo-1622616239851-4091f09c7331?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Surveillance / IoT",
    rating: 4.1,
    reviewCount: 400,
    originalPrice: 899,
    salePrice: 599,
    isOutOfStock: false,
    description: "Tiny WiFi + Bluetooth development board with an OV2640 camera. Perfect for building remote surveillance cameras.",
    features: ["Built-in Flash LED", "MicroSD Card Slot", "WiFi & BT 4.2"],
    specifications: [
      { label: "Camera", value: "OV2640 (2MP)" },
      { label: "Clock", value: "160MHz" },
      { label: "Voltage", value: "5V" }
    ],
    reviews: []
  },
  {
    id: "tdcs-digispark",
    name: "TDCS BadUSB Digispark (Attiny85)",
    images: [
      "https://images.unsplash.com/photo-1608538260461-105c98d6c075?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Hardware / HID",
    rating: 4.0,
    reviewCount: 520,
    originalPrice: 499,
    salePrice: 299,
    isOutOfStock: false,
    description: "The cheapest way to get into HID attacks. This tiny development board plugs directly into USB and can be programmed with Arduino IDE.",
    features: ["Tiny Form Factor", "Arduino Compatible", "USB 2.0 Software Implementation"],
    specifications: [
      { label: "Flash Memory", value: "8KB" },
      { label: "I/O Pins", value: "6" },
      { label: "Voltage", value: "5V USB" }
    ],
    reviews: []
  },
  {
    id: "tdcs-faraday-bag",
    name: "TDCS Signal Blocking Faraday Bag",
    images: [
      "https://images.unsplash.com/photo-1617058866380-60b763dc369c?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Forensics",
    rating: 4.6,
    reviewCount: 92,
    originalPrice: 1200,
    salePrice: 899,
    isOutOfStock: false,
    description: "Military-grade signal blocking bag for phones, key fobs, and drives. Blocks WiFi, Bluetooth, GPS, RFID, and Cell signals.",
    features: ["Double Layer Shielding", "Water Resistant", "Anti-tracking"],
    specifications: [
      { label: "Material", value: "Shielded Oxford Fabric" },
      { label: "Size", value: "20cm x 10cm" },
      { label: "Attenuation", value: ">85 dB" }
    ],
    reviews: []
  },
  {
    id: "tdcs-gps-tracker",
    name: "TDCS Mini GPS/GSM Asset Tracker",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Surveillance",
    rating: 4.2,
    reviewCount: 45,
    originalPrice: 2999,
    salePrice: 1499,
    isOutOfStock: false,
    description: "Real-time magnetic GPS tracker with voice recording capabilities. Uses 2G GSM network for location uploads.",
    features: ["Real-time Tracking", "Voice Monitor", "Magnetic Mount"],
    specifications: [
      { label: "Battery", value: "400mAh (4 Days)" },
      { label: "Network", value: "GSM/GPRS" },
      { label: "Accuracy", value: "10m" }
    ],
    reviews: []
  },
  {
    id: "tdcs-nodemcu",
    name: "TDCS NodeMCU V3 LUA (WiFi Jammer Capable)",
    images: [
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Development",
    rating: 4.8,
    reviewCount: 880,
    originalPrice: 550,
    salePrice: 349,
    isOutOfStock: false,
    description: "The classic ESP8266 development board. Can be used for IoT projects or flashed with Deauther to test WiFi networks.",
    features: ["Open Source", "Interactive", "Low Cost", "WiFi Enabled"],
    specifications: [
      { label: "Chip", value: "ESP8266-12E" },
      { label: "Flash", value: "4MB" },
      { label: "Clock", value: "80MHz" }
    ],
    reviews: []
  },
  {
    id: "tdcs-usb-killer",
    name: "TDCS USB Surge Tester (Pro)",
    images: [
      "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Hardware / Destructive",
    rating: 4.9,
    reviewCount: 14,
    originalPrice: 4500,
    salePrice: 3999,
    isOutOfStock: true,
    description: "Designed to test the surge protection of USB ports. Safely (or unsafely) discharges high voltage into the data lines.",
    features: ["Rapid Pulse Discharge", "-200V Output", "Pulse Shield Included"],
    specifications: [
      { label: "Output Voltage", value: "-220V" },
      { label: "Interface", value: "USB-A" }
    ],
    reviews: []
  },
  {
    id: "tdcs-lan-tap",
    name: "TDCS Passive LAN Tap Star",
    images: [
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Network Auditing",
    rating: 4.4,
    reviewCount: 22,
    originalPrice: 1500,
    salePrice: 999,
    isOutOfStock: false,
    description: "A hardware device that allows you to monitor Ethernet traffic. It requires no power and is undetectable by the network.",
    features: ["Passive Monitoring", "No Power Required", "Portable"],
    specifications: [
      { label: "Speed", value: "10/100 Base-T" },
      { label: "Ports", value: "4 x RJ45" }
    ],
    reviews: []
  },
  {
    id: "tdcs-keylogger-usb",
    name: "TDCS AirDrive Keylogger (WiFi)",
    images: [
      "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Surveillance",
    rating: 4.7,
    reviewCount: 18,
    originalPrice: 8500,
    salePrice: 6999,
    isOutOfStock: false,
    description: "Advanced USB keylogger with WiFi access. Record keystrokes and access them remotely via a web browser.",
    features: ["WiFi Access Point", "16MB Internal Memory", "Email Reports"],
    specifications: [
      { label: "Memory", value: "16MB (~16000 pages)" },
      { label: "Dimensions", value: "10mm long" }
    ],
    reviews: []
  },
  {
    id: "tdcs-flipper-case",
    name: "TDCS Silicone Case for Flipper Zero",
    images: [
      "https://images.unsplash.com/photo-1603539270381-b20f924151dc?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Accessories",
    rating: 4.6,
    reviewCount: 150,
    originalPrice: 1200,
    salePrice: 799,
    isOutOfStock: false,
    description: "Protective silicone bumper case for your Flipper Zero. Provides better grip and drop protection for your favorite multi-tool.",
    features: ["Shock Absorption", "Access to GPIO", "Orange/White options"],
    specifications: [
      { label: "Material", value: "Food Grade Silicone" },
      { label: "Compatibility", value: "Flipper Zero" }
    ],
    reviews: []
  },
  {
    id: "tdcs-hak5-field-kit",
    name: "TDCS Red Team Field Kit (Bag Only)",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Accessories",
    rating: 4.8,
    reviewCount: 35,
    originalPrice: 3500,
    salePrice: 2499,
    isOutOfStock: false,
    description: "Tactical organizer bag designed to hold all your pentesting gear. Specific compartments for Pineapple, Rubber Ducky, cables, and antennas.",
    features: ["Water Resistant", "Cable Management Loops", "MOLLE System"],
    specifications: [
      { label: "Material", value: "1000D Nylon" },
      { label: "Zippers", value: "YKK" }
    ],
    reviews: []
  },
  {
    id: "tdcs-sim800l",
    name: "TDCS SIM800L GPRS Module",
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Development",
    rating: 4.1,
    reviewCount: 67,
    originalPrice: 450,
    salePrice: 299,
    isOutOfStock: false,
    description: "Add cellular capability to your projects. Send SMS, make calls, or use GPRS data with this tiny module. Needs a stable power supply.",
    features: ["Quad-band 850/900/1800/1900MHz", "Micro SIM Card", "TTL Serial"],
    specifications: [
      { label: "Voltage", value: "3.7V - 4.2V" },
      { label: "Current", value: "2A Peak" }
    ],
    reviews: []
  },
  {
    id: "tdcs-logic-analyzer",
    name: "TDCS USB Logic Analyzer 24MHz 8Ch",
    images: [
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Debugging",
    rating: 4.5,
    reviewCount: 112,
    originalPrice: 1200,
    salePrice: 850,
    isOutOfStock: false,
    description: "Debug digital circuits easily. Compatible with Saleae Logic software (via open source drivers). Perfect for decoding UART, SPI, I2C protocols.",
    features: ["24MHz Sampling Rate", "8 Channels", "Protocol Decoding"],
    specifications: [
      { label: "Input", value: "5V Tolerant" },
      { label: "Connection", value: "Mini USB" }
    ],
    reviews: []
  }
];