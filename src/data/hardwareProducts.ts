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
  // Expanded Description
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  videoUrl?: string;
  reviews: {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];

  // --- NEW FIELDS ADDED ---
  packageIncluded: string[];
  legalCompliance: string;
  disclaimer: string;
  
  // Delivery & Badge Information
  deliveryTimeline: string;      // e.g., "1–3 days Delivered"
  dispatchTimeline: string;      // e.g., "Same Day Dispatch"
  isPrepaidOnly: boolean;        // true
  isFreeShipping: boolean;       // true
  isQualityTested: boolean;      // true
  supportInfo: string;           // e.g., "24×7 Support WhatsApp & Call"
  
  // Animation Text
  scrollingMessage: string;      // The left-to-right animation text
}

export const hardwareProducts: HardwareProduct[] = [
  // ... [Previous items: Raspberry Pi Pico, ESP8266, etc. would stay here] ...
  // Since you asked for "A to Z with update code", I am including the full list below 
  // with the NEW product added at the end.

  {
    id: "Raspberry pi pico",
    name: "Raspberry Pi Pico (TDCS Edition)",
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
    originalPrice: 1499,
    salePrice: 999,
    isOutOfStock: false,
    description: "The Raspberry Pi Pico is a radical change from the previous Pis, because it’s not a Linux computer—it’s a microcontroller. Built around the RP2040 chip designed by Raspberry Pi themselves, it features a dual-core ARM Cortex-M0+ processor running at 133MHz. This board is perfect for low-latency hardware interaction, BadUSB scripting (using CircuitPython or Pico Ducky), and embedded security projects. It's incredibly power-efficient and versatile, making it the go-to choice for creating custom HID attack tools, macro keypads, or hardware implants that require minimal power draw.",
    features: [
      "Dual-core ARM® Cortex®-M0+ @ 133MHz",
      "264kB on-chip SRAM & 2MB onboard Flash",
      "Drag-and-drop programming via USB",
      "8 × Programmable I/O (PIO) state machines",
      "Ideal for HID Attacks and Hardware Implants"
    ],
    specifications: [
      { label: "Microcontroller", value: "RP2040" },
      { label: "Storage", value: "2MB Q-SPI Flash" },
      { label: "Voltage", value: "1.8V - 5.5V" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=Zy64kZEM_bg",
    reviews: [
      { id: "101", author: "Rohan K.", rating: 5, date: "2024-02-14", comment: "Incredible value. Drag-and-drop works perfectly." }
    ],
    packageIncluded: [
      "1x Raspberry Pi Pico (TDCS Edition)",
      "2x 20-pin Header Strips",
      "1x Micro-USB Data Cable",
      "1x TDCS Sticker"
    ],
    legalCompliance: "This device is a development board intended for educational and prototyping purposes only.",
    disclaimer: "TDCS is not responsible for any misuse of this device for malicious HID attacks.",
    deliveryTimeline: "1–3 days Delivered",
    dispatchTimeline: "Same Day Dispatch",
    isPrepaidOnly: true,
    isFreeShipping: true,
    isQualityTested: true,
    supportInfo: "24×7 Support WhatsApp & Call",
    scrollingMessage: "⚡ Free Shipping All Over India | Quality Tested Before Shipping | Prepaid Only ⚡"
  },
  {
    id: "all-tdcs-courses",
    name: "ESP8266 WiFi Development Kit",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEi19affCJsFqGgVFUFzlYkdaP0AcsjA-n_bbE8FYNewIK_7kHEeY25UvGTsqZKpiMfzqPFPtd8dvPXdpSGW3WLK2NpTglfiMYImq_JvHK1xcT1u5ENaxPsWe6CGRhUh3gsysUy33FqYkJPmrAE_rk94OJAhtJQd9FhMX_qBboPIIjyybK7T8tZeyG8OJrcn",
      "https://blogger.googleusercontent.com/img/a/AVvXsEgm2rP7ziezJgjJkwMidPVi6eCPXbnTV0ApJQFgX0B-H3H2dSYEebM8nt23Y99FCbfi5a6aUU9auyTum2fdPfvV_vdKZcqGDlS7ld672MLC_XzXiWAuO07jDtF5UI84foQfVoMrSo5TUskp7Jh5irhkc8Xc7Txqqz9gNBzSTeDRhy7R2lOau9Mht3AeXoXs",
      "https://blogger.googleusercontent.com/img/a/AVvXsEhSc57v-lais9H2HkY7LbEIAVffLLj-RaQ-APgWVjv06RGigXjIsqr2RQU-Ylnq-Mmxcacy6ceLRTPm2Jqfhhnk2m5Sp53KH8-lbbgAeM0QvOP1pKHwWOJD10WW5KVmxb9jh9XI9iJh70nVjNU8xgGw1bc8aqHUaYTE9txTh4qnnFnx_or_YItIWI97NEW3",
    ],
    category: "Network Auditing",
    rating: 4.8,
    reviewCount: 315,
    originalPrice: 999,
    salePrice: 499,
    isOutOfStock: false,
    description: "The ESP8266 NodeMCU is the legendary board that democratized WiFi hacking and IoT. Famous for being the hardware behind the 'WiFi Deauther' project, this board allows you to monitor packets, create fake access points (Beacon Spam), and test network resilience against de-authentication attacks. It features a full TCP/IP stack and can be programmed easily using the Arduino IDE or Lua script, making it the perfect starting point for anyone interested in wireless security.",
    features: [
      "Integrated 802.11 b/g/n WiFi 2.4GHz",
      "Support for WiFi Deauther firmware",
      "Built-in CP2102 USB-to-TTL converter",
      "Deep sleep power saving mode",
      "Breadboard friendly form-factor"
    ],
    specifications: [
      { label: "Chipset", value: "ESP8266-12E" },
      { label: "Clock Speed", value: "80 MHz / 160 MHz" },
      { label: "Flash Memory", value: "4 MB" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=6He9pXwVFNQ",
    reviews: [
      { id: "201", author: "Amit V.", rating: 5, date: "2024-03-01", comment: "Best investment for my career." }
    ],
    packageIncluded: [
      "1x NodeMCU ESP8266 Development Board",
      "1x Micro USB Cable",
      "1x Pin Header Set"
    ],
    legalCompliance: "Use strictly for educational purposes on networks you own or have permission to test.",
    disclaimer: "Jamming WiFi networks without permission is illegal. Use responsibly.",
    deliveryTimeline: "1–3 days Delivered",
    dispatchTimeline: "Same Day Dispatch",
    isPrepaidOnly: true,
    isFreeShipping: true,
    isQualityTested: true,
    supportInfo: "24×7 Support WhatsApp & Call",
    scrollingMessage: "⚡ Fast Shipping | 100% Quality Checked | Prepaid Orders Only ⚡"
  },
  { 
    id: "CC1101+SMA (300Mz-938Mz) RF Module",
    name: "TDCS CC1101 Sub-GHz Transceiver (High Gain)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjUM60rdjnZLBIvc0mr-ZeUxBrF0MDxBFfRbqFRnO4C4FIariuai7Cx_wl5wzfG7v-qE1H-6BoxBm_AhvgMgkPKxQhY4FvgHf-XCYDIeEDyu5LkyGa0VSU0ZqaXnO0i2y-6lyXUwbXwCWjtVoUqCEupXukmeQkrqeoOxb12wiFdzwwWQ3h1SCJqIeoMSvDG",
      "https://blogger.googleusercontent.com/img/a/AVvXsEi8aWW8Mhr_t69BDjT0bRm_VPmEEBJviVdK_J4q-MvhUndZ6VTJ6Y4i4WnFL8NdWI4guhsur7j3sBm8VzUcslFHiIqV9FJ5W2w7grdk5TdjmuLiXlyUF5nTU9Ghnt2bkO6FEc4Akio7UPgBHUkklwtOINVs0OQJMcsb0j4SALe6aT_1FBSRWO0G9JzhJF0p",
      "https://blogger.googleusercontent.com/img/a/AVvXsEi3QytH2pOb56WXh8oY4_tllgVyjGy_XXrJb9qEw2LyJREo26hgRHk0hhAp6MtZIvN4xszGHtTW992rx17ZiVF7KgQnBM4xezFM7WvDYDF48XYEF3ZHbBjLn5RdpImY-alFiO2L-CEHUvfAVO-p1GxyxefmdUUfbp5ATwgAfLxHhbYORv-Ekvylq_wJ0JYM"
    ],
    category: "WiFi Auditing",
    rating: 4.7,
    reviewCount: 89,
    originalPrice: 2999,
    salePrice: 999,
    isOutOfStock: false,
    description: "The CC1101 is the gold standard for Sub-GHz wireless communication. Unlike standard WiFi modules, this transceiver operates on lower frequencies (300-928 MHz), which are commonly used by car key fobs, garage door openers, automated gates, and industrial sensors. This module includes an SMA connector for an external high-gain antenna, significantly extending your range for signal analysis and replay attacks (e.g., RollJam simulations). It is fully compatible with Flipper Zero GPIO and Arduino/ESP32 projects.",
    features: [
      "Wide Frequency Range: 300-928 MHz",
      "High Sensitivity: -116 dBm at 0.6 kBaud",
      "Hardware support for Packet Handling & Wake-On-Radio",
      "Compatible with Flipper Zero (GPIO) & Arduino",
      "Perfect for signal replay and jamming research"
    ],
    specifications: [
      { label: "Chip", value: "Texas Instruments CC1101" },
      { label: "Modulation", value: "2-FSK, 4-FSK, GFSK, MSK, OOK" },
      { label: "Voltage", value: "1.8V - 3.6V" }
    ],
    reviews: [],
    packageIncluded: [
      "1x CC1101 Module (Green/Blue PCB)",
      "1x High Gain SMA Antenna",
      "1x Set of Jumper Wires"
    ],
    legalCompliance: "Transmission on certain frequencies may require a HAM Radio license in India.",
    disclaimer: "User is responsible for adhering to local WPC (Wireless Planning & Coordination) regulations.",
    deliveryTimeline: "1–3 days Delivered",
    dispatchTimeline: "Same Day Dispatch",
    isPrepaidOnly: true,
    isFreeShipping: true,
    isQualityTested: true,
    supportInfo: "24×7 Support WhatsApp & Call",
    scrollingMessage: "⚡ Best Seller for Sub-GHz Research | Free Shipping | Quality Tested ⚡"
  },
  {
    id: "tdcs-m5stickc-plus2",
    name: "TDCS M5StickC PLUS2",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEgiEvVwPPSxB_jUcqIhWwrnbMvRQz8fUEMWV50pYU5Xi_txwbSoMIlNCF0VS8ksMY5zwMX5sy2Z0XUYj1ZzlpUjxdK0hYw4DPkS8Y_xgBRxmcuiJwVblJCu6jFEqwsIrbvALlN7biC8Napi2IevX2EZbvMiyUwBoSWIMML9sjgbyHVHa5LQ1boJo8M7FjiF",
      "https://blogger.googleusercontent.com/img/a/AVvXsEiqZWyADzedT_L_MJP27icDZeVPnOfecyLXAI9Ly_zNMR8yfr33qJbchkQFq1Lv-e0j32716bpUCzQ_7bcCtTYGQHFwkJMnYSys-B4YlHeOsiG0HObgGsEIBctXWC4ZNr2-TEgYyiKVDDKUQynTt66BLjrB64-WQKELK9RKw1bvUJuU8RvD_UJis88H_cNL",
      "https://blogger.googleusercontent.com/img/a/AVvXsEgAxnBiwyUY-7pvDFgM6kxexP4OpDLUWsPfvZQF77kQIFdHDoDjHNj-iJHnc3EGaoMOyOYMndDoeL25FElpRvPV1e4bDXkS7Z84sBDUU6c9BYJsolBrMGKeqmsoKSljCoI7zzgYVTB0W844E8Hr3CJbqhZiDFaxMpr8stqYzIk4sD8x9cJJ5GDObnmDEKmV",
      "https://blogger.googleusercontent.com/img/a/AVvXsEhFrydXYFhR_LN9aPLPAjQZ4O24IwE5Mdgc-z7cTK55l49hbmKipNRP1dZbaeIHqS2tGLH1f9FbZ1rAzuiFpfleGeDZMCwvsQh8kwUNx0wN1SsATt75fV3cz_R-dAC81lksAhFo4hGtF_TCFe0sTW7I8d8CQqVV2i9ol85XD-XCnZUjCkY3lX7fbkR1k2mY"
    ],
    category: "Development / IoT",
    rating: 5.0,
    reviewCount: 15,
    originalPrice: 5999,
    salePrice: 3999,
    isOutOfStock: false,
    description: "The M5StickC PLUS2 is a mini IoT development board powered by the ESP32-PICO-V3-02. It's essentially a smartwatch-sized computer with a screen, battery, and sensors. In the security community, it's famous for running the 'Nemo' firmware or 'Marauder', turning it into a portable WiFi auditing tool capable of scanning networks and detecting vulnerabilities on the go. It packs an LCD screen, 6-axis IMU, microphone, and buzzer into a bright orange stick that fits in your pocket.",
    features: [
      "ESP32-PICO-V3-02 (240MHz Dual Core, WiFi/BLE)",
      "1.14 inch TFT Color Screen (135x240)",
      "Built-in 200mAh Battery & Infrared Transmitter",
      "Grove Port for easy sensor expansion",
      "Portable platform for Marauder/Nemo firmware"
    ],
    specifications: [
      { label: "SoC", value: "ESP32-PICO-V3-02" },
      { label: "Display", value: "ST7789v2" },
      { label: "Battery", value: "200mAh LiPo" }
    ],
    reviews: [],
    packageIncluded: [
      "1x M5StickC PLUS2 Device",
      "1x USB Type-C Cable",
      "1x Wall/Monitor Mount Accessories",
      "1x Watch Strap Adapter"
    ],
    legalCompliance: "Hardware is general purpose. Firmware installation is user responsibility.",
    disclaimer: "We do not pre-install offensive security firmware. Device sold with stock factory firmware.",
    deliveryTimeline: "1–3 days Delivered",
    dispatchTimeline: "Same Day Dispatch",
    isPrepaidOnly: true,
    isFreeShipping: true,
    isQualityTested: true,
    supportInfo: "24×7 Support WhatsApp & Call",
    scrollingMessage: "⚡ Portable Hacking Powerhouse | Free Shipping | Prepaid Only ⚡"
  },
  {
    id: "esp32-cyd-display",
    name: "ESP32 CYD (Cheap Yellow Display)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjqcwQ8tlpM_VZABagrFHNl9-TlkTqRBc9pCOnTN8MdNvdwisP4o01w9m_74zIGI25zNIYamW8xTCL8iHhWqfuvapylSwQ3vg4Y2EObm2ocTwTmXTf0fMpGz6YjxanD7hflt4yOTVH81fKzjbHG2trxkQQrygMca5NhAIslIxl1w3EnTCGmVX1gK3JgDBwa",
      "https://blogger.googleusercontent.com/img/a/AVvXsEhVSMk0TdIm1rZpy1urOvEjaQevbBAkJoo2gTpKSzVrh0skf9FMvjCNGK7KPfHUPl72KmpKzsmleTWEg59txoLejf1JvivH_ditc1W73V3Xe7PSojjFYr1zT73Y57irJF6H61v76dm8j78oIZaPFeZ9dhCkPv6YH-c16fHCNbOsQpyf5wHXCCk9pWIsa4EN",
      "https://blogger.googleusercontent.com/img/a/AVvXsEirPBeAfGm5bJY_4EjgFYtAWmwZaEwoFGNZ2AV6o0AdBfpwpYEzzeKuYR_3J3xcIitkkDJJW6-p3rheGd-a9NhfGO4iqiX_ZYGNQbHtpYEx1SZgNRhocBil2cTOQi8dUMEd_GvCyfdJjjGUOXNnLorz6smF-779in7h8-HKin7iNB0lM-ynCq7uzifZbAVr",
      "https://blogger.googleusercontent.com/img/a/AVvXsEhM3NJqsbqd6CWKIZI1qtM2JlnseIsyP2PRas6lG7JCt9xhHQ9zKIkaUwVctPN3MeVu9Snq0zkHs2ARJf8xlyIHBJk3K6TFzdLeaZc-ue9rpJqgiiwvIgpgHbwIe3CHCx4ZmjY6pNId1OSr7eASQ8mg5651w9Lb90Y9x_GN2uKM6c_Uu0BrHQ_g5NYvp_n_"
    ],
    category: "Development / IoT",
    rating: 4.8,
    reviewCount: 210,
    originalPrice: 4500,
    salePrice: 3499,
    isOutOfStock: false,
    description: "The ESP32-2432S028 'Cheap Yellow Display' (CYD) is a hidden gem in the hardware hacking community. It combines a powerful ESP32 module with a 2.8-inch touchscreen, SD card slot, and RGB LED—all for an incredibly low price. It's the perfect base for building a graphical WiFi Scanner, a smart home controller, or a visual packet monitor. No need to mess with wires; it's a ready-to-go GUI solution for running tools like ESP32 Marauder with full touch support.",
    features: [
      "Integrated 2.8-inch TFT Touch Screen (320x240)",
      "Powered by ESP32-WROOM-32 (Dual Core)",
      "Onboard MicroSD Card Slot for data logging",
      "Programmable RGB LED and Light Sensor",
      "Compatible with ESP32 Marauder (Visual)"
    ],
    specifications: [
      { label: "Display", value: "2.8\" ILI9341 w/ XPT2046 Touch" },
      { label: "Processor", value: "ESP32-WROOM-32" },
      { label: "Resolution", value: "320 x 240 px" }
    ],
    reviews: [],
    packageIncluded: [
      "1x ESP32-2432S028 (CYD) Board",
      "1x Micro USB Data Cable",
      "1x Touch Stylus Pen",
      "1x 4-pin Connector Cable"
    ],
    legalCompliance: "RoHS Compliant. Educational Development Board.",
    disclaimer: "Advanced user required. Drivers and libraries must be configured manually.",
    deliveryTimeline: "1–3 days Delivered",
    dispatchTimeline: "Same Day Dispatch",
    isPrepaidOnly: true,
    isFreeShipping: true,
    isQualityTested: true,
    supportInfo: "24×7 Support WhatsApp & Call",
    scrollingMessage: "⚡ Best Value Display Board | Fast Shipping | Prepaid Only ⚡"
  },
  {
    id: "lilygo-tembed-cc1101",
    name: "Lilygo T-Embed CC1101 Plus",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEi5m8SotFBwLZpNH-oVd3XlN9Oknn4fiE3EUDDIhKDk2SyFt_nPglhlI74l4Wjz04b-Z3JhFtK2xXOtRGPsFbUENYKRctKzqrJnBk4sLgf4Inl5rArmtqqE_I5m2LN88GtVsCOYQ19ngWPiJ9AI-_4sB1UQUwb38XmxqS57qTFEp3g7Qz37DAjbmlCvGCVs",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjUNbmcWWO88vdp1q8BW0xM5IIl0FgieKD6voCiQ0CsxsKB-VwLNok7eVdtuhrzlIhN3vOVYshJx0L4lqLjWY23Di_w84MH3u85Bn_M2k_Jd4hbopMzSLazXtzJLUQ3QHzkI0kifRd1yVk_ZmEKxd5OEKSxqBOzF9ONugjOduoGiQl1q64V794E7pdDcvBU",
      "https://blogger.googleusercontent.com/img/a/AVvXsEgUjIUVnidp3QKuC94DcpeDeHyqSv9iFY6ds1YDoTXRcanpWWYkhOL-H9Igu5iplrh8Qwieq4dQDJ2pWrh9Hnqi5Mt12xOL2UI9PZyodAEDb-czgtai0wMjRclS-fXyqezF621XZOluSjNwhkOd_jlBepdVMQs5DNt877Dfye8tZdX26SuDym3kjMYUB15v"
    ],
    category: "Hardware / HID",
    rating: 4.9,
    reviewCount: 45,
    originalPrice: 10500,
    salePrice: 9999,
    isOutOfStock: false,
    description: "The Lilygo T-Embed CC1101 Plus is an industrial-grade programmable control panel that doubles as a powerful pentesting tool. Encased in a transparent shell with a rotary encoder and a vibrant LCD, it looks like a futuristic gadget. Under the hood, it pairs an ESP32-S3 with a CC1101 Transceiver, allowing you to interface with both WiFi networks and Sub-GHz devices (gates, remotes). Ideally suited for researchers building custom remotes or signal analyzers, offering a sleek, all-in-one form factor.",
    features: [
      "ESP32-S3 (Dual Core) + CC1101 Sub-GHz Module",
      "1.9-inch LCD (170x320) & Rotary Encoder",
      "Dual Microphones & Speaker",
      "Built-in Battery & Grove Interface",
      "Transparent 'Cyberpunk' Aesthetic"
    ],
    specifications: [
      { label: "Main Chip", value: "ESP32-S3" },
      { label: "Radio", value: "TI CC1101" },
      { label: "Display", value: "ST7789V IPS" }
    ],
    reviews: [],
    packageIncluded: [
      "1x T-Embed CC1101 Device",
      "1x Grove Cable",
      "1x USB-C Cable",
      "1x Storage Box"
    ],
    legalCompliance: "Users must adhere to local radio frequency regulations.",
    disclaimer: "Sold as a development tool. TDCS is not liable for unlicensed transmission.",
    deliveryTimeline: "1–3 days Delivered",
    dispatchTimeline: "Same Day Dispatch",
    isPrepaidOnly: true,
    isFreeShipping: true,
    isQualityTested: true,
    supportInfo: "24×7 Support WhatsApp & Call",
    scrollingMessage: "⚡ Premium Cyberpunk Tool | Free Shipping | Prepaid Only ⚡"
  },
  {
    id: "flipper-zero-tdcs",
    name: "Flipper Zero Multi-tool",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrXhEgFQxKSUMLMNnLKbDvUFH0aOEyAOi3xg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCzYa7L4FUxTtk7-lM795TheDO9YAOySooA&s",
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Flipper_Zero_back_view.jpg"
    ],
    category: "Hacking / Multi-tool",
    rating: 5.0,
    reviewCount: 1540,
    originalPrice: 40000,
    salePrice: 29999,
    isOutOfStock: false,
    description: "The Flipper Zero is the ultimate portable multi-tool for engineers, geeks, and security professionals. Shaped like a toy, it is a fully capable autonomous device for exploring the digital world. It combines a Sub-GHz transceiver (for gates/barriers), 125kHz & NFC RFID (for access cards), Infrared (for TVs/ACs), and GPIO pins for hardware debugging. It gamifies the hacking experience with a 'Tamagotchi-style' cyber-dolphin that levels up as you use the tools. Whether you are analyzing radio protocols, cloning keycards, or debugging hardware, Flipper Zero fits all these capabilities into your pocket.",
    features: [
      "Sub-GHz Transceiver (300-928 MHz)",
      "125kHz LF RFID & 13.56MHz NFC Reader/Emulator",
      "Infrared Transceiver (Learning & Universal Remote)",
      "iButton 1-Wire Key Reading",
      "BadUSB / U2F Security Token capabilities",
      "Open Source Firmware (Unleashed/Xtreme supported)"
    ],
    specifications: [
      { label: "CPU", value: "STM32WB55" },
      { label: "Screen", value: "1.4\" Monochrome LCD" },
      { label: "Battery", value: "2000mAh (7+ days)" },
      { label: "Connectivity", value: "USB Type-C, Bluetooth LE" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=nLIp4wd0oXs",
    reviews: [],
    packageIncluded: [
      "1x Flipper Zero Device (White)",
      "1x USB-A to USB-C Charging Cable",
      "1x Quick Start Guide",
      "1x Official TDCS Sticker"
    ],
    legalCompliance: "This device is legal to own. Transmission on restricted frequencies requires a license.",
    disclaimer: "By purchasing, you agree to use this device only for legal educational and testing purposes. TDCS is not responsible for illegal use.",
    deliveryTimeline: "1–3 days Delivered",
    dispatchTimeline: "Same Day Dispatch",
    isPrepaidOnly: true,
    isFreeShipping: true,
    isQualityTested: true,
    supportInfo: "24×7 Support WhatsApp & Call",
    scrollingMessage: "⚡ HIGH DEMAND ITEM | Same Day Dispatch | Prepaid Only | 100% Original ⚡"
  },
  {
    id: "tdcs-rtl-sdr",
    name: "TDCS RTL-SDR Blog V3 Kit",
    images: [
      "data:image/jpeg;base64,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