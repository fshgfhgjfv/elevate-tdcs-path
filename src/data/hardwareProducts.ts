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
  }[];
}

export const hardwareProducts: HardwareProduct[] = [
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
    description: "The Raspberry Pi Pico is a radical change from the previous Pis, because it’s not a Linux computer—it’s a microcontroller. Built around the RP2040 chip designed by Raspberry Pi themselves, it features a dual-core ARM Cortex-M0+ processor running at 133MHz. This board is perfect for low-latency hardware interaction, BadUSB scripting (using CircuitPython or Pico Ducky), and embedded security projects. It's incredibly power-efficient and versatile.",
    longDescription: "The Raspberry Pi Pico represents a paradigm shift in the Raspberry Pi lineup. Unlike its predecessors that run full Linux distributions, the Pico is a bare-metal microcontroller board built around the custom-designed RP2040 chip. This dual-core ARM Cortex-M0+ processor clocked at 133MHz delivers exceptional performance for embedded applications while maintaining incredibly low power consumption. The board's 8 Programmable I/O (PIO) state machines are a standout feature, enabling you to implement custom communication protocols, drive displays, or create precise timing-critical applications without burdening the main CPU cores. In the cybersecurity domain, the Pico has become the go-to platform for BadUSB projects — using CircuitPython or the popular Pico Ducky script, you can program it to emulate a USB keyboard and execute pre-programmed keystroke sequences in milliseconds. This makes it an invaluable tool for penetration testers demonstrating the dangers of unattended workstations. The drag-and-drop UF2 firmware loading via USB makes it incredibly beginner-friendly — simply hold the BOOTSEL button, plug it in, and drag your firmware file onto the drive that appears.",
    features: [
      "Dual-core ARM® Cortex®-M0+ @ 133MHz",
      "264kB on-chip SRAM & 2MB onboard Flash",
      "Drag-and-drop programming via USB",
      "8 × Programmable I/O (PIO) state machines",
      "Ideal for HID Attacks and Hardware Implants"
    ],
    packageContents: [
      "1x Raspberry Pi Pico (TDCS Edition)",
      "1x Micro-USB Cable (1m)",
      "1x Pin Header Set (pre-soldered)",
      "1x Quick Start Guide",
      "1x TDCS Sticker Pack"
    ],
    legal: "This product is sold exclusively for educational purposes, authorized security testing, and legitimate research. Unauthorized use of this device for malicious activities, including but not limited to unauthorized computer access, is strictly prohibited and may violate local, state, and federal laws. The buyer assumes all responsibility for the legal and ethical use of this product.",
    disclaimer: "TDCS and its affiliates are not responsible for any misuse of this product. By purchasing, you agree that you will only use this device in compliance with all applicable laws and regulations. This product should only be used on systems you own or have explicit written authorization to test.",
    delivery: "Standard delivery: 5-7 business days. Express delivery: 2-3 business days (additional charges apply). All orders are shipped via insured courier with tracking. Orders placed before 2 PM IST on business days are dispatched the same day.",
    support: "30-day replacement warranty for manufacturing defects. Dedicated WhatsApp support available Mon-Sat (10 AM - 7 PM IST). Email support: hardware@tdcs.in. Community forum access included with purchase. Free firmware update guides.",
    specifications: [
      { label: "Microcontroller", value: "RP2040" },
      { label: "Storage", value: "2MB Q-SPI Flash" },
      { label: "Voltage", value: "1.8V - 5.5V" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=Zy64kZEM_bg",
    reviews: [
      { id: "101", author: "Rohan K.", rating: 5, date: "2024-02-14", comment: "Incredible value. Drag-and-drop works perfectly.", title: "Best Budget HID Device", verified: true },
      { id: "102", author: "Priya S.", rating: 5, date: "2024-03-20", comment: "Used this for my OSCP prep lab. Pico Ducky scripts worked flawlessly out of the box. The pre-soldered headers saved me so much time.", title: "Perfect for Pentesting Labs", verified: true },
      { id: "103", author: "Arjun M.", rating: 4, date: "2024-04-05", comment: "Good board for the price. Only wish it had WiFi built-in, but for HID attacks this is unbeatable.", title: "Great for HID, misses WiFi", verified: true }
    ]
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
    description: "The ESP8266 NodeMCU is the legendary board that democratized WiFi hacking and IoT. Famous for being the hardware behind the 'WiFi Deauther' project, this board allows you to monitor packets, create fake access points (Beacon Spam), and test network resilience. It features a full TCP/IP stack and can be programmed easily using the Arduino IDE or Lua script.",
    longDescription: "The ESP8266 NodeMCU is arguably the single most important board in the WiFi hacking revolution. Before it arrived, experimenting with WiFi required expensive, specialized equipment. The ESP8266 changed everything by putting a full TCP/IP stack and 802.11 b/g/n WiFi into a $5 module. Its claim to fame in the security community is the WiFi Deauther project by Spacehuhn — a firmware that exploits a well-known vulnerability in the 802.11 protocol to send deauthentication frames, disconnecting clients from their networks. Beyond deauth attacks, you can use it for Beacon Spam (creating hundreds of fake SSIDs), Probe Request sniffing, and building Evil Twin access points for authorized phishing assessments. The NodeMCU variant adds a CP2102 USB-to-serial converter, making programming as easy as plugging in a USB cable and uploading code from the Arduino IDE.",
    features: [
      "Integrated 802.11 b/g/n WiFi 2.4GHz",
      "Support for WiFi Deauther firmware",
      "Built-in CP2102 USB-to-TTL converter",
      "Deep sleep power saving mode",
      "Breadboard friendly form-factor"
    ],
    packageContents: [
      "1x ESP8266 WiFi Development Board",
      "1x Micro-USB Cable (1m)",
      "1x Breadboard (400 tie-points)",
      "1x Jumper Wire Set (20 pieces)",
      "1x Setup & Flashing Guide"
    ],
    legal: "This product is sold exclusively for educational purposes, authorized security testing, and legitimate research. Sending deauthentication frames on networks you do not own or have authorization to test is illegal in most jurisdictions. The buyer assumes all responsibility for legal and ethical use.",
    disclaimer: "WiFi Deauther functionality should only be used on your own networks or with explicit written permission. TDCS is not responsible for any unauthorized or illegal use. Misuse may violate the Computer Fraud and Abuse Act and equivalent international laws.",
    delivery: "Standard delivery: 5-7 business days. Express delivery: 2-3 business days (additional charges apply). All orders shipped with tracking and insurance.",
    support: "30-day replacement warranty. WhatsApp support Mon-Sat (10 AM - 7 PM IST). Email: hardware@tdcs.in. Includes access to TDCS firmware flashing tutorials.",
    specifications: [
      { label: "Chipset", value: "ESP8266-12E" },
      { label: "Clock Speed", value: "80 MHz / 160 MHz" },
      { label: "Flash Memory", value: "4 MB" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=6He9pXwVFNQ",
    reviews: [
      { id: "201", author: "Amit V.", rating: 5, date: "2024-03-01", comment: "Best investment for my career. Learned WiFi security fundamentals hands-on.", title: "Career-Changing Board", verified: true },
      { id: "202", author: "Sneha R.", rating: 5, date: "2024-04-15", comment: "Deauther firmware installed in under 10 minutes. TDCS guide was crystal clear. Amazing for the price!", title: "Easy Setup, Great Results", verified: true },
      { id: "203", author: "Karan D.", rating: 4, date: "2024-05-02", comment: "Works great for 2.4GHz. Wish it supported 5GHz too but at this price can't complain.", title: "Excellent Value", verified: true }
    ]
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
    description: "The CC1101 is the gold standard for Sub-GHz wireless communication. Unlike standard WiFi modules, this transceiver operates on lower frequencies (300-928 MHz), which are commonly used by car key fobs, garage door openers, automated gates, and industrial sensors. This module includes an SMA connector for an external high-gain antenna, significantly extending your range for signal analysis and replay attacks (e.g., RollJam simulations).",
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
    reviews: []
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
    description: "The M5StickC PLUS2 is a mini IoT development board powered by the ESP32-PICO-V3-02. It's essentially a smartwatch-sized computer with a screen, battery, and sensors. In the security community, it's famous for running the 'Nemo' firmware, turning it into a portable WiFi auditing tool capable of scanning networks and detecting vulnerabilities on the go. It packs an LCD screen, 6-axis IMU, microphone, and buzzer into a bright orange stick.",
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
    reviews: []
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
    description: "The ESP32-2432S028 'Cheap Yellow Display' (CYD) is a hidden gem in the hardware hacking community. It combines a powerful ESP32 module with a 2.8-inch touchscreen, SD card slot, and RGB LED—all for an incredibly low price. It's the perfect base for building a graphical WiFi Scanner, a smart home controller, or a visual packet monitor. No need to mess with wires; it's a ready-to-go GUI solution.",
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
    reviews: []
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
    description: "The Lilygo T-Embed CC1101 Plus is an industrial-grade programmable control panel that doubles as a powerful pentesting tool. Encased in a transparent shell with a rotary encoder and a vibrant LCD, it looks like a futuristic gadget. Under the hood, it pairs an ESP32-S3 with a CC1101 Transceiver, allowing you to interface with both WiFi networks and Sub-GHz devices (gates, remotes). Ideally suited for researchers building custom remotes or signal analyzers.",
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
    reviews: []
  },
  {
    id: "flipper-zero-tdcs",
    name: "Flipper Zero Multi-tool",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjn8Sk4Ym9olpFfVG--3iYyZL1HdXl47YQk7aiSyuRCDv886g30K7MXGuvuwsGaKj84zFdV5q2Iffx0M_5zrPiZE8S1hjU6tSvg2EX92Amy5N7rMaxKxyBdwePSI0szqOZP1Tb0T9PhicM11e4fjcyGB6zSdQcjDHbuPfIMnnF-s3vuVkPoxpNsibR5BmQ4",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmCzYa7L4FUxTtk7-lM795TheDO9YAOySooA&s",
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Flipper_Zero_back_view.jpg"
    ],
    category: "Hacking / Multi-tool",
    rating: 5.0,
    reviewCount: 1540,
    originalPrice: 40000,
    salePrice: 29999,
    isOutOfStock: false,
    description: "The Flipper Zero is the ultimate portable multi-tool for engineers, geeks, and security professionals. Shaped like a toy, it is a fully capable autonomous device for exploring the digital world. It combines a Sub-GHz transceiver (for gates/barriers), 125kHz & NFC RFID (for access cards), Infrared (for TVs/ACs), and GPIO pins for hardware debugging. It gamifies the hacking experience with a 'Tamagotchi-style' cyber-dolphin that levels up as you use the tools.",
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
      { label: "Battery", value: "2000mAh (7+ days)" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=nLIp4wd0oXs",
    reviews: []
  },
  {
    id: "tdcs-rtl-sdr",
    name: "TDCS RTL-SDR Blog V3 Kit",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEhGFSJiU-kBdBeAc6qCxQl017ZJqzAWEAhqVUZlNcnFF1Y1b1nSX82IQ5rOVtlJZmnIZY3lcSnLq1OoJanJpgTU94d0y2oRq56qoWNeMG4Gabs6jupYgsk0RE5HdKxixOJgu3EORXotcq2xqgfnQm0kitCcRd9H0UjxlKGMsgXRhKa0V7EKZzuMD9JQOt-Y"
    ],
    category: "SDR / Radio",
    rating: 4.5,
    reviewCount: 120,
    originalPrice: 3500,
    salePrice: 2899,
    isOutOfStock: false,
    description: "Turn your computer into a powerful radio scanner with the RTL-SDR Blog V3. This Software Defined Radio (SDR) dongle allows you to listen to and visualize radio signals from 500 kHz up to 1.7 GHz. Security researchers use it to analyze GSM traffic, decode pager messages (POCSAG), track aircraft (ADS-B), receive weather satellite images (NOAA), and reverse engineer unknown wireless protocols.",
    features: [
      "Custom RTL2832U + R820T2 chipset",
      "Direct Sampling Mode for HF reception (500 kHz+)",
      "Software selectable Bias Tee for LNA power",
      "Aluminum enclosure for cooling and shielding",
      "Includes Dipole Antenna Kit"
    ],
    specifications: [
      { label: "Frequency", value: "500 kHz – 1.7 GHz" },
      { label: "Bandwidth", value: "Up to 3.2 MHz" },
      { label: "Connector", value: "SMA Female" }
    ],
    reviews: []
  },
 {
    id: "tdcs-ubertooth",
    name: "TDCS Ubertooth One (Bluetooth Sniffer)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjN_8lLaLfol0uZHlPgqWDqS3KMQL1drS13qg5zYp0aETGKT-rF6FJM10DaXx_csJExYvJYJw74oiIC741H7q0Bq7WYb5I2fv7CXJd-LFSuqs4sbLE9oygw_8IDNI-wfiwScO0r71q3c0DsPhp0205wnTfRXRlGahhfnC7sRzTSd3FRoi5gsMTC6tNnbSnr", // <--- ADD COMMA HERE
      "https://blogger.googleusercontent.com/img/a/AVvXsEjN_8lLaLfol0uZHlPgqWDqS3KMQL1drS13qg5zYp0aETGKT-rF6FJM10DaXx_csJExYvJYJw74oiIC741H7q0Bq7WYb5I2fv7CXJd-LFSuqs4sbLE9oygw_8IDNI-wfiwScO0r71q3c0DsPhp0205wnTfRXRlGahhfnC7sRzTSd3FRoi5gsMTC6tNnbSnr"
  
    ],
    category: "Bluetooth",
    rating: 4.6,
    reviewCount: 12,
    originalPrice: 10500,
    salePrice: 9999,
    isOutOfStock: true,
    description: "The Ubertooth One is an open-source 2.4 GHz wireless development platform suitable for Bluetooth experimentation. Unlike standard Bluetooth dongles that only see what they are paired with, the Ubertooth One operates in 'monitor mode,' allowing you to sniff and analyze Bluetooth traffic in real-time. It is the primary hardware used for Bluetooth security auditing and research.",
    features: [
      "2.4 GHz Transmit and Receive",
      "Comparable transmit power to Class 1 Bluetooth devices",
      "Standard Cortex Debug Connector (10-pin 50-mil JTAG)",
      "Expansion connector for inter-Ubertooth communication",
      "Capable of sniffing Bluetooth Basic Rate packets"
    ],
    specifications: [
      { label: "Frequency", value: "2.400 - 2.485 GHz" },
      { label: "Interface", value: "USB 2.0" },
      { label: "Antenna", value: "RP-SMA Included" }
    ],
    reviews: []
  },
  {
    id: "tdcs-proxmark3",
    name: "TDCS Proxmark3 Easy (RFID Cloner)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEgIm0t_q56lwRzKI71lVA-RFaO7QJ2INisLGkwmVuVLeKFUVZZgQwfo9CamgcydOAn5PuRfEVLjSv2jnl2Prz9lJQWSCyuJcHfR0wB7i5_2vtvbvp1Y-zUUnd5ejemfZ00ng4Le045cP9NIYb1xANMa1WgQf_FpGPUK7fkLxhuICR3YTc-NkFlxM4VvRiUT",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLFrhyjIE8Lv8j-cj7hyPXT17Q5fIRXxeO0A&s",
    ],
    category: "RFID / Access Control",
    rating: 4.8,
    reviewCount: 56,
    originalPrice: 6500,
    salePrice: 4999,
    isOutOfStock: false,
    description: "The Proxmark3 is the industry-standard Swiss Army Knife for RFID analysis. This 'Easy' version is a compact, cost-effective build of the famous RDV4. It is capable of reading, writing, cloning, and simulating almost any RFID tag, from simple 125kHz employee badges to complex 13.56MHz encrypted transit cards. Essential for physical security assessments.",
    features: [
      "Dual Antenna: High Frequency (HF) & Low Frequency (LF)",
      "Standalone Mode: Run scripts without a PC",
      "Full support for 'Iceman' Firmware fork",
      "Attacks: Darkside, Nested, Hardnested for Mifare",
      "Simulation: Act as a card to test readers"
    ],
    specifications: [
      { label: "HF Support", value: "13.56 MHz (ISO14443A/B)" },
      { label: "LF Support", value: "125 kHz (HID, EM41xx)" },
      { label: "FPGA", value: "Xilinx Spartan-II" }
    ],
    reviews: []
  },
  {
    id: "tdcs-acr122u",
    name: "TDCS ACR122U NFC Reader/Writer",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEibsrJgKLapPhniIFOjyMCSCLpuFzqw-0answVKxHrlPa_yCx4UeQO1m4HmSaFJFszz5tLtJ4Z9DgkbwQaGJGVQ_yKyAiyeSBdGjfCtGhOSUQ72bdBaR3lpMLjrBFVnHrd6bdYvWVKoLKfgcuuG2-E9S65RurVdPXnMMNKh1XfC3RoOXZ753tjgNysvWx4o",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi0kmyPwA81fmuz0YiwP5dRp7zhu0D7ycwAQ&s"
    ],
    category: "RFID / Access Control",
    rating: 4.3,
    reviewCount: 200,
    originalPrice: 3999,
    salePrice: 2800,
    isOutOfStock: false,
    description: "The ACR122U is the world's most popular PC-linked NFC reader. While it looks like a standard desktop reader, it is fully compatible with advanced tools like LibNFC and Mifare Classic Tool (MCT) on Linux/Windows. It is widely used in cybersecurity courses to teach the basics of NFC card structure, sector cracking, and key dumping.",
    features: [
      "Read/Write speed up to 424 kbps",
      "Built-in antenna with 50mm reading distance",
      "Supports ISO 14443 Type A and B cards",
      "Supports Mifare, FeliCa, and 4 types of NFC (ISO/IEC 18092) tags",
      "CCID Compliant (Plug and Play)"
    ],
    specifications: [
      { label: "Interface", value: "USB Full Speed" },
      { label: "Frequency", value: "13.56 MHz" },
      { label: "Standard", value: "ISO/IEC 18092" }
    ],
    reviews: []
  },
  {
    id: "tdcs-lockpick-set",
    name: "TDCS Transparent Lock Pick Set",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEgM83jcbdWDFiFOgTj4ExrnZagzQ86nTB9bm5mhKg9ymuvEtK8BGcOK_PiH8hpxpjEhJY5in5DnFxrjXi9AbHSSyOg29O-s-nwi9lTvBdPVTFoFKSfu6aFTZdZeCfpzIMFXzMjG2T14BVDnAilZMsfliuscr6E0EYBKiPWFFkxzHFH2rYrHWW1LbmkBe1lg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGuJxK2vAOk56cEMOgv0l4R6tyspqZDY5GsA&s"
    ],
    category: "Physical Security",
    rating: 4.5,
    reviewCount: 310,
    originalPrice: 1999,
    salePrice: 1299,
    isOutOfStock: false,
    description: "Cybersecurity often stops at a locked server room door. This training set teaches you the physical side of security. It includes a transparent acrylic padlock that reveals the inner mechanism of pins and springs, allowing you to see exactly how lockpicking works. Comes with a variety of hooks, rakes, and tension wrenches to master the art of non-destructive entry.",
    features: [
      "Crystal clear cutaway practice lock",
      "12-piece stainless steel pick set",
      "Includes tension wrenches and key extractors",
      "Leather carrying case included",
      "Perfect for understanding pin-tumbler mechanisms"
    ],
    specifications: [
      { label: "Material", value: "Acrylic & Steel" },
      { label: "Lock Type", value: "Pin Tumbler" },
      { label: "Pieces", value: "15 Total" }
    ],
    reviews: []
  },
  {
    id: "tdcs-magspoof",
    name: "TDCS MagSpoof (Magnetic Emulator)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEiihoZ8D345o1sQ7akxqiKtaE7u3LSQlwRkn7FuiXtYMUm6goUJCTVbg29P_DBjayROvT1pXI1pcDzKm3I7oFAN3Yj-mdvHW9OkLsTUj_904zKasP24fCliOD0xAiA_AX_HGrXIN1Fa4NcGhOIoWu8IK40AGxU360j3-mnRmBR5GetwxSBJAA7lA0ehElZe"
    ],
    category: "Physical Security",
    rating: 5.0,
    reviewCount: 8,
    originalPrice: 2500,
    salePrice: 1999,
    isOutOfStock: true,
    description: "MagSpoof is a wireless credit card/magnetic stripe spoofing device. Unlike a traditional card reader that requires a swipe, MagSpoof generates a strong electromagnetic field that mimics the magnetic pattern of a card stripe. By holding it near a traditional magnetic reader, you can wirelessly transmit track data (Track 1 & 2), effectively 'swiping' a card without touching the reader.",
    features: [
      "Emulates Track 1, Track 2, and Track 3",
      "Wireless operation creates a magnetic field",
      "Compatible with standard MagStripe readers",
      "Compact size, battery powered",
      "Ideal for researching magnetic stripe insecurity"
    ],
    specifications: [
      { label: "Microcontroller", value: "ATtiny85" },
      { label: "Power", value: "3.7V LiPo" },
      { label: "Range", value: "~2-5cm" }
    ],
    reviews: []
  },
  {
    id: "tdcs-pi5-kit",
    name: "Raspberry Pi 5 Kali Linux Kit (8GB)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEiaAWFzWBGmfCFmO2YOCOK_ZikHCL-_M-ezK1lni9YzqxUle1BHjTHPk6mxil0qxeXm_NxUazlT7E6JLbgeTrnTBEHjHwq72LnxOmRaNq7k4aAc24tohWJMYf6z--97tR95WwRVBI8kojR89J6l1F25ZbK_dMCLRFaI3ln2i3eA4tWZhfuM9jJggv4u09T3",
      "https://blogger.googleusercontent.com/img/a/AVvXsEinQypTkhUNays3yhK_X95PxGL87Oo66nRma-P-p6VkR_-fplkXrqAwduxNStjdoNVnNolu7htR0CEW1oBibeih8irzGD4_mqsx060KyFGv1KNRRzhFak4JKeR9jTnR1lsvi1y2Uk-4nPbjStC-kg9_cZCag1NI4uJXiRyFm14LJlr2uFLFkPlc8_rLnWaS"
    ],
    category: "Single Board Computers",
    rating: 4.9,
    reviewCount: 65,
    originalPrice: 12000,
    salePrice: 9800,
    isOutOfStock: false,
    description: "The ultimate ARM-based hacking station. This kit includes the powerful Raspberry Pi 5 with 8GB RAM, capable of running a full desktop environment with ease. It comes pre-flashed with a custom build of Kali Linux, optimized for the Pi 5's architecture. Whether you are cracking hashes with Hashcat or running vulnerability scans with OpenVAS, this board handles it all without breaking a sweat.",
    features: [
      "Broadcom BCM2712 Quad-core Cortex-A76 @ 2.4GHz",
      "8GB LPDDR4X SDRAM",
      "Dual 4K Micro-HDMI Output",
      "PCIe 2.0 interface for high-speed NVMe storage",
      "Includes Active Cooler and Official Power Supply"
    ],
    specifications: [
      { label: "RAM", value: "8GB" },
      { label: "OS", value: "Kali Linux ARM64" },
      { label: "Connectivity", value: "Gigabit LAN + WiFi 5" }
    ],
    reviews: []
  },
  
  {

    id: "atoms3u-rubber-duck",

    name: "AtomS3U (Rubber-Duck-Kit)",

    images: ["https://blogger.googleusercontent.com/img/a/AVvXsEhfmpu_OSNR8mjcz_O04RYCpPUrkAkmthNEA2rG_2hC1CpqnM5JEGy_7AA_gYaRKeptV5J0cHbwf__u-l-fxY2g8GTinozAIxap0_LFcD1dTnkPqJkhWS_XVkY7IaTVXD_vdO51COqr6Z9_vu7Wtzj5tV9koSQK4pRRN4seCXy8qmL2SJ92r9k-C6xRfWII"],

    category: "Hardware / HID",

    rating: 5.0,

    reviewCount: 12,

    originalPrice: 2999,

    salePrice: 2340,

    isOutOfStock: true,

    description: "The AtomS3U is a U-disk form factor controller based on the ESP32-S3 chip, pre-configured as a high-performance Rubber Ducky style HID injection tool.",

    longDescription: "The AtomS3U Rubber-Duck-Kit represents the next generation of Human Interface Device (HID) injection tools. Moving beyond the limitations of legacy 8-bit microcontrollers, this kit utilizes the dual-core ESP32-S3 processor to deliver unmatched payload execution speeds and stability. Its ultra-compact USB-A form factor allows it to blend seamlessly into any workstation environment, appearing to the operating system as a standard, trusted keyboard. What sets the AtomS3U apart is its integrated Wi-Fi and Bluetooth stack, enabling red-teamers to remotely trigger, pause, or switch between multiple payloads from a smartphone or laptop. Whether you are automating administrative tasks or demonstrating keystroke injection vulnerabilities during a penetration test, the AtomS3U provides a professional-grade, 'cyberpunk' styled solution that fits on a keychain.",

    features: [

      "ESP32-S3 Dual-core processor",

      "USB-A Form Factor for stealth",

      "Integrated Wi-Fi for remote payload triggering",

      "Programmable RGB LED for status feedback",

      "Compatible with advanced HID injection scripts"

    ],

    specifications: [

      { label: "SoC", value: "ESP32-S3" },

      { label: "Interface", value: "USB-A" },

      { label: "Connectivity", value: "2.4GHz Wi-Fi / BLE 5.0" }

    ],

    reviews: [

      { id: "rev-301", author: "Deepak R.", rating: 5, date: "2024-11-10", comment: "The Wi-Fi triggering is a game changer. I can plug it in and wait for the right moment to fire the payload from my phone.", title: "Stealthy and Powerful", verified: true },

      { id: "rev-302", author: "Sarah J.", rating: 5, date: "2024-12-05", comment: "Much faster than the old ATtiny85 boards. The S3 chip handles complex scripts without any lag.", title: "Superior to Digispark", verified: true }

    ]

  },

  {

    id: "bw16-5ghz-kit",
    name: "BW16-5Ghz Kit (Pre-Installed Firmware)",
    images: ["https://blogger.googleusercontent.com/img/a/AVvXsEgJDZ7GkOjcqT7MITchdktdW7Jo2btIGUvALRuvkQlxcpRGRNJBMn7flCr1MJ4lkyB2Xbi4nvznMxoj-rb73uLvZpwPU30BBH5eUvEUxA-3Ut9wNzT7Uwh_nGuuAiS-QBZioOo-v1denCYv6hHPwQQhkZevGMdV_XwV6q58aSb6Fo9S6_Vp4MrMwSf9MewI",
          "https://blogger.googleusercontent.com/img/a/AVvXsEgBF3Yago9mlTEYP4__csBkOqXIeuUSsDvYSNJ_qGoY2jQQnB_h6gqxyAAiL6Kc__ANA2IzIn-alpkWfRpzCzDqWo7E98Uw_NH8Ove65-3eThDMGE6I-YFDupn0YwDH53ku-AWWfel0caL94ejW5yXlVfYeAvG8Z0paIIcgNhrgm_1XHDAdNdhz_m7aCG3q", ],
    category: "Hardware / Network",
    rating: 5.0,
    reviewCount: 28,
    originalPrice: 1999,
    salePrice: 1499,
    isOutOfStock: true,

    description: "The BW16 is a dual-band Wi-Fi module supporting both 2.4GHz and 5GHz frequencies, making it a rare and powerful tool for modern network auditing.",

    longDescription: "In an era where most enterprise and home networks have migrated to the 5GHz spectrum to avoid congestion, standard 2.4GHz auditing tools often fall short. The BW16-5Ghz Kit bridges this gap, featuring the RTL8720DN dual-band SoC which supports both 802.11 a/b/g/n protocols. This kit comes pre-installed with specialized security firmware, allowing researchers to scan, monitor, and analyze traffic on the high-frequency 5.8GHz band. Its compact design includes an onboard antenna with an option for external SMA expansion, ensuring you can maintain a high-gain connection during long-range reconnaissance. For cybersecurity professionals, the BW16 is an essential addition to the 'war-driving' kit, providing the visibility required to audit modern Wi-Fi 5 environments that older hardware simply cannot see.The BW16-5GHz Kit, powered by the high-performance RTL8720DN dual-band SoC, is purpose-built to meet the demands of modern Wi-Fi environments. Supporting 802.11 a/b/g/n protocols across both 2.4GHz and 5.8GHz bands, this compact yet powerful device provides the full-spectrum visibility required for professional wireless assessments, research, and authorized security testing.the BW16-5GHz Kit enables efficient network scanning, signal monitoring, channel analysis, and traffic observation across high-frequency Wi-Fi 5 deployments. As organizations increasingly deploy dual-band access points and shift critical infrastructure to less congested 5GHz channels, having hardware capable of detecting and analyzing these networks is no longer optional—it’s essential. This kit helps cybersecurity professionals, IT auditors, and wireless researchers accurately evaluate coverage, identify misconfigurations, and assess network exposure across modern environments.Designed with portability and flexibility in mind, the BW16 features a compact embedded form factor, making it ideal for field audits, lab testing, and mobile research setups. The onboard antenna provides reliable signal acquisition, while the optional external SMA connector allows users to attach high-gain or directional antennas for extended range and improved signal strength during long-distance analysis. Whether conducting an enterprise wireless survey, testing dual-band deployments, or performing authorized security evaluations, the BW16 delivers consistent performance in both dense urban environments and large-scale corporate infrastructures.",

    features: [

      "Dual-Band Wi-Fi (2.4GHz & 5GHz)",
"Penetration 5Ghz WiFi", 
      "Ipex SMA Version",
      "Bluetooth Low Energy (BLE 5.0) support",
      "Pre-installed specialized auditing firmware",
      "Internal and External antenna support",
      "Low power consumption for portable use"

    ],

    specifications: [

      { label: "Chipset", value: "RTL8720DN" },

      { label: "Frequency", value: "2.4GHz / 5.8GHz" },

      { label: "Flash", value: "2MB" }

    ],

    reviews: [

      { id: "rev-401", author: "Vikram K.", rating: 5, date: "2024-10-12", comment: "Finally a budget-friendly 5GHz tool! Most office networks are 5G now, so this is essential for my kit.", title: "Essential for 5GHz Auditing", verified: true },

      { id: "rev-402", author: "Leo G.", rating: 5, date: "2024-11-20", comment: "The pre-installed firmware is stable. Caught several handshakes on the 5.8GHz band within minutes.", title: "Works as Advertised", verified: true }

    ]

  },

  {

    id: "ebyte-nrf24l01-pa-lna",

    name: "EBYTE E01-2G4M27D NRF24l01 PA LNA (Long Range)",

    images: ["https://blogger.googleusercontent.com/img/a/AVvXsEjy3ck0diGoois9CV2sofy77X8WutD_HlVA1TGZLFW_-j3o_UIvJmixANrwjh12AJ0jPuWA8x9DRshtQq5TOx1yDQM-6cS3bTeflSRyk2EWrCPvv4hOFcEEdx7TO72ShFCOXGaurC7UNTXO97N4yGqoYw_4cSDFj3MNRBxkRglLiXyfKZQvF_43NNDuYLKd"],

    category: "Hardware / RF",

    rating: 4.8,

    reviewCount: 45,

    originalPrice: 950,

    salePrice: 795,

    isOutOfStock: false,

    description: "An industrial-grade 2.4GHz wireless module with Power Amplifier (PA) and Low Noise Amplifier (LNA) for extreme long-range communication and sniffing.",

    longDescription: "The EBYTE NRF24L01+ PA + LNA is the gold standard for long-range 2.4GHz RF experimentation. Unlike standard low-power modules, this industrial-grade unit features an integrated Power Amplifier (PA) for transmission and a Low Noise Amplifier (LNA) for extreme reception sensitivity, theoretically reaching distances of up to 2.5km with a clear line of sight. In the security community, this module is legendary for its role in 'MouseJack' attacks, allowing researchers to sniff and inject keystrokes into vulnerable wireless keyboards and mice from across a parking lot or office floor. The module is encased in a metal shield to minimize EMI interference and comes equipped with an SMA connector for attaching high-gain directional antennas. It is an indispensable component for building high-performance RF sniffers or long-distance sensor networks.",

    features: [

      "27dBm High power output (PA)",

      "LNA for high-sensitivity reception",

      "Long range up to 2500 meters",

      "Shielded case for anti-interference",

      "SMA Connector for external antennas"

    ],

    specifications: [

      { label: "Frequency", value: "2.4GHz - 2.525GHz" },

      { label: "Power", value: "500mW" },

      { label: "Protocol", value: "Enhanced ShockBurst" }

    ],

    reviews: [

      { id: "rev-501", author: "Animesh M.", rating: 4, date: "2024-09-15", comment: "Solid range. Combined this with a Yagi antenna and I could sniff traffic from the other side of the building.", title: "Incredible Range", verified: true },

      { id: "rev-502", author: "CyberWolf", rating: 5, date: "2024-10-02", comment: "Best NRF24 module I've used. The shielding really helps with noise in urban areas.", title: "High Quality Build", verified: true }

    ]

  },

  {

    id: "esp32-2nrf-kit",

    name: "ESP32/2NRF Kit (Bluetooth Penetration)",

    images: ["https://blogger.googleusercontent.com/img/a/AVvXsEj_example_2nrf"],

    category: "Hardware / Bluetooth",

    rating: 4.6,

    reviewCount: 34,

    originalPrice: 2499,

    salePrice: 1580,

    isOutOfStock: true,

    description: "A specialized multi-radio kit combining an ESP32 with dual NRF24 modules for advanced Bluetooth and 2.4GHz spectrum research.",

    longDescription: "Designed for deep-dive wireless research, the ESP32/2NRF Kit is a powerhouse for multi-channel auditing. By pairing the versatile Wi-Fi and Bluetooth capabilities of the ESP32 with two independent NRF24L01 radios, this kit allows for simultaneous operations that single-radio boards cannot handle. For example, you can use one NRF radio to sniff for vulnerable wireless peripherals while the second radio performs a continuous 'jamming' or 'injection' test on a separate channel, all while the ESP32 master controller hosts a web interface or logs data to a server. This hardware is a favorite for researchers studying the security of non-standard 2.4GHz protocols used in smart homes, wireless gaming peripherals, and industrial control systems. It provides a modular, breadboard-friendly platform that is as capable on the workbench as it is in the field.",

    features: [

      "Dual NRF24L01 radio modules",

      "ESP32 Master controller (Wi-Fi/BT)",

      "Supports multi-channel 2.4GHz sniffing",

      "Ideal for MouseJack and HID-over-RF research",

      "Modular design for custom pin configurations"

    ],

    specifications: [

      { label: "Controller", value: "ESP32-WROOM" },

      { label: "Radios", value: "2x NRF24L01+ PA/LNA" },

      { label: "Interface", value: "SPI / UART" }

    ],

    reviews: [

      { id: "rev-601", author: "Tushar P.", rating: 5, date: "2024-08-22", comment: "The dual NRF setup allows me to sniff on one channel while injecting on another. Very useful for physical security audits.", title: "Professional Grade", verified: true },

      { id: "rev-602", author: "Alex Chen", rating: 4, date: "2024-09-01", comment: "A bit of a learning curve for the setup, but once it's running, it's a beast for 2.4GHz research.", title: "Powerful Multi-Tool", verified: true }

    ]

  },

  {

    id: "m5-pcb-cc1101-nrf",

    name: "M5-PCB (CC1101/NRF/SD)",

    images: ["https://blogger.googleusercontent.com/img/a/AVvXsEj_example_m5pcb"],

    category: "Hardware / Expansion",

    rating: 5.0,

    reviewCount: 19,

    originalPrice: 990,

    salePrice: 640,

    isOutOfStock: false,

    description: "A custom-designed expansion PCB for the M5StickC series that adds CC1101 Sub-GHz, NRF24, and SD card functionality in one compact board.",

    longDescription: "Elevate your M5StickC Plus or Plus2 into a professional-grade wireless auditing tool with this all-in-one expansion PCB. Custom-engineered for a perfect 'HAT' fit, this board integrates the TI CC1101 transceiver for exploring Sub-GHz frequencies (300MHz-928MHz) and an NRF24L01 for 2.4GHz analysis. Additionally, it features a built-in MicroSD card slot, solving the primary storage limitation of the M5 series and allowing for the logging of massive signal captures or handshake files during mobile operations. This PCB eliminates the need for messy jumper wires or external breadboards, providing a rugged and professional solution that turns your mini-development board into a portable signal analyzer. It is a must-have for users running specialized 'Marauder' or 'Nemo' firmware variants that require multiple radios for advanced network testing.",

    features: [

      "Integrated CC1101 Sub-GHz support",

      "Integrated NRF24L01 support",

      "Built-in MicroSD card slot for data logging",

      "Perfect fit for M5StickC Plus / Plus2",

      "High-quality gold-plated PCB finish"

    ],

    specifications: [

      { label: "Form Factor", value: "M5 Hat Compatible" },

      { label: "Storage", value: "MicroSD (up to 32GB)" },

      { label: "Radio", value: "Multi-band RF expansion" }

    ],

    reviews: [

      { id: "rev-701", author: "Rahul S.", rating: 5, date: "2024-11-28", comment: "Makes the M5Stick much more useful. No more dangling wires when I'm testing garage door signals.", title: "Cleaner Setup", verified: true },

      { id: "rev-702", author: "Jessica M.", rating: 5, date: "2024-12-10", comment: "The SD slot is great for saving captured signals on the go. High build quality.", title: "Must-have for M5 owners", verified: true }

    ]

  },

  {

    id: "rasp-atomduck",

    name: "Rasp-AtomDuck (Wi-Fi Ducky)",

    images: ["https://blogger.googleusercontent.com/img/a/AVvXsEj_example_atomduck"],

    category: "Hardware / HID",

    rating: 5.0,

    reviewCount: 15,

    originalPrice: 1999,

    salePrice: 1250,

    isOutOfStock: false,

    description: "The Rasp-AtomDuck is a Wi-Fi enabled keystroke injection tool that allows for real-time payload management via a web interface.",

    longDescription: "The Rasp-AtomDuck is a highly versatile wireless HID injection platform that blends the ease of Ducky Script with the power of the ESP32 ecosystem. Unlike traditional USB injection tools that require physical access to change code, the AtomDuck hosts its own Wi-Fi Access Point and Web Server. This allows a security professional to plug the device into a target machine and then remotely manage, edit, and execute scripts from a smartphone's web browser up to 50 meters away. This 'Air-Gap' management style is vital for complex red-team scenarios where the operator needs to wait for a specific window of opportunity to trigger a payload. With its sleek black-and-orange aesthetic and pre-installed open-source Wi-Fi Ducky firmware, it is a ready-to-use tool for demonstrating the inherent risks of unattended USB ports and Human Interface Device vulnerabilities.",

    features: [

      "Wi-Fi Web Interface for payload management",

      "Real-time script editing and execution",

      "Support for multiple Ducky Scripts",

      "Stealthy USB form factor",

      "Pre-installed open-source Wi-Fi Ducky firmware"

    ],

    specifications: [

      { label: "Chip", value: "ESP32 Series" },

      { label: "Interface", value: "USB-A" },

      { label: "Web UI", value: "Mobile Responsive" }

    ],

    reviews: [

      { id: "rev-801", author: "Hacker_X", rating: 5, date: "2024-11-05", comment: "The ability to edit scripts live over Wi-Fi is incredible. Saved me so much time during my last engagement.", title: "Ultimate HID Tool", verified: true },

      { id: "rev-802", author: "Sameer V.", rating: 5, date: "2024-12-01", comment: "Web UI is very intuitive. Works perfectly with all my standard ducky scripts.", title: "Super Easy to Use", verified: true }

    ]

  },
  {
    id: "tdcs-esp32-cam",
    name: "TDCS ESP32-CAM Spy Module",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEinQypTkhUNays3yhK_X95PxGL87Oo66nRma-P-p6VkR_-fplkXrqAwduxNStjdoNVnNolu7htR0CEW1oBibeih8irzGD4_mqsx060KyFGv1KNRRzhFak4JKeR9jTnR1lsvi1y2Uk-4nPbjStC-kg9_cZCag1NI4uJXiRyFm14LJlr2uFLFkPlc8_rLnWaS"
    ],
    category: "Surveillance / IoT",
    rating: 4.1,
    reviewCount: 400,
    originalPrice: 899,
    salePrice: 599,
    isOutOfStock: false,
    description: "The ESP32-CAM is a tiny, low-cost development board with a WiFi chip and a 2MP OV2640 camera. It is widely used in the security field to build remote surveillance devices, IP cameras, or face recognition systems. Its small size allows it to be hidden easily, making it a favorite for 'red team' exercises involving planting monitoring devices.",
    features: [
      "Low-power dual-core 32-bit CPU",
      "Main frequency up to 240MHz",
      "OV2640 Camera with Built-in Flash LED",
      "Onboard MicroSD Card Slot for local recording",
      "Supports video streaming over WiFi"
    ],
    specifications: [
      { label: "Camera Sensor", value: "OV2640 (2 Megapixel)" },
      { label: "Wireless", value: "WiFi 802.11b/g/n + BT" },
      { label: "Voltage", value: "5V" }
    ],
    reviews: []
  },
  {
    id: "tdcs-digispark",
    name: "TDCS BadUSB Digispark",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEhJOeEO47bUCZoKZEpnL3KZqxh6Y_CVpC3MwMbQVAV432R8AZZjHvD8kTgOs19zeTnKtNG7Zg26xz4Rvf0K4VzjiKQcaG1xaoQBwcO_JQs2x0XUAfKug7MxEvtu67wUhr-getw-oeIZAk9CTWKpsyBY8BCQ0b_z4hlwUYeFVhmjLes5pedaiASi36xKkEfL"
    ],
    category: "Hardware / HID",
    rating: 4.0,
    reviewCount: 520,
    originalPrice: 499,
    salePrice: 299,
    isOutOfStock: false,
    description: "The Digispark is an ATtiny85-based microcontroller development board similar to the Arduino line, but cheaper and smaller. Its superpower is its ability to emulate a USB keyboard (Human Interface Device). This allows for 'BadUSB' attacks: when plugged in, it can type keystrokes at lightning speed, opening a terminal and executing payloads before the victim even realizes what happened.",
    features: [
      "Support for the Arduino IDE",
      "Power via USB or External Source (5v-35v)",
      "6 I/O Pins (2 are used for USB only if your program communicates over USB)",
      "8k Flash Memory (about 6k after bootloader)",
      "Ideal for Keystroke Injection (Ducky Script)"
    ],
    specifications: [
      { label: "Chip", value: "ATtiny85" },
      { label: "Voltage", value: "5V USB" },
      { label: "Interface", value: "Software USB" }
    ],
    reviews: []
  },
  {
    id: "tdcs-faraday-bag",
    name: "TDCS RF Shielding Faraday Bag",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEh71-8k07O9NEkuUcD81uYTMINuGfcfNdSko3MLY9c0ntp0tY1wdcjGc01_g3TSJsxdVnm97V5kFh9oQT3MhAhcR1f68G8eO9UTtf-jLSsfenyN2LQnWOxS6Gs5aygApO-_geI-36XtcSfd-7BX25eeNWW79lOUFv5ySb4_yRuRrcmhUR7Kt8Wz6cHpg3gA",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNB2amtsmhpGWwPwPqj5mmngtKyT7ucdPT_XA9utXRww&s",
      "http://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6ZwRton_1HsKpHKcWgef9bnlC28ZeOnmjrQ&s"
    ],
    category: "Forensics",
    rating: 4.6,
    reviewCount: 92,
    originalPrice: 1200,
    salePrice: 899,
    isOutOfStock: false,
    description: "A Faraday bag is an essential tool for digital forensics and privacy. Lined with specialized metallic mesh, it creates a Faraday cage that blocks all incoming and outgoing electromagnetic signals. When a phone or laptop is placed inside, it cannot be tracked via GPS, cannot receive calls or texts, and cannot be remotely wiped by a suspect. Attenuation >85 dB.",
    features: [
      "Blocks WiFi (2.4 & 5GHz), Bluetooth, GPS, RFID, and Cell Signals (4G/5G)",
      "Double-roll velcro closure for complete seal",
      "Water-resistant ballistic nylon outer layer",
      "Prevents ' Relay Attacks' on car key fobs",
      "Used by law enforcement for evidence seizure"
    ],
    specifications: [
      { label: "Shielding", value: "Silver/Copper Nickel Fabric" },
      { label: "Size", value: "Medium (Phone/Key)" },
      { label: "Efficiency", value: "99.99%" }
    ],
    reviews: []
  },
  {
    id: "tdcs-",
    name: "TDCS Magnetic Asset Tracker",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEhob6O5ikyRd-NoEzZojYaHGXOj29CtisflMbBBgoUbYwnV-xRFLi5myKxPh8cqJ9joSvQf1hWv4BqiqSeoVSNkG7dYDasFV2pzqP91y8RXpL-8WMv1zBwW0auzcb45Bhg0ID0LyTMCQHMMe8xZAd_4BXa9v-JFV4wPWXm1AmoT2KPEfUHMYZOCgsigdcOv"
    ],
    category: "Surveillance",
    rating: 4.2,
    reviewCount: 45,
    originalPrice: 2999,
    salePrice: 1499,
    isOutOfStock: false,
    description: "A compact, robust GPS tracker designed for vehicle and asset monitoring. It features strong industrial magnets for quick deployment under car chassis or on metal containers. It utilizes a hybrid positioning system (GPS + LBS) to upload location data via the 2G GSM network. Also features a built-in microphone for remote voice monitoring.",
    features: [
      "Real-time tracking via Web/App",
      "Strong Magnetic Mount for 1-second installation",
      "Remote Voice Monitor/Recording",
      "History Route Playback",
      "Geofence Alarms"
    ],
    specifications: [
      { label: "Network", value: "GSM/GPRS 850/900/1800/1900MHz" },
      { label: "Battery", value: "400mAh Li-ion" },
      { label: "Positioning", value: "GPS + LBS + WiFi" }
    ],
    reviews: []
  },
  {
    id: "tdcs-usb-killer",
    name: "TDCS USB Surge Tester Pro",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEibrUYqIBDK0fN3Ylfa7oAJkLfPP4Mdwr5JjD71XIfveMwA5zhcHSywcUYsJOqjmX2Q3DVuNXSOaTN8e2Dmu50823KAlFPUpKAwUyct2q7ryDW8Ru6unTQdixWJH9bWWZ_8r0XXdMFcQg87YZbkwH-XwoZqQu7wMZbhVmDfJc1pxPykQEg-p0jfUKLnJAKU"
    ],
    category: "Hardware / Destructive",
    rating: 4.9,
    reviewCount: 14,
    originalPrice: 4500,
    salePrice: 3999,
    isOutOfStock: true,
    description: "The TDCS USB Killer is a specialized hardware testing device designed for authorized robustness, resilience, and failure-mode testing of electronic equipment. It is intended for use by qualified professionals in controlled environments to evaluate protection mechanisms against abnormal electrical conditions on USB interfaces..",
    features: [
      "High Voltage Pulse Generator (-200V)",
      "Compact USB-form testing device",
      "Includes Testing Shield (to safely test the spark)",
      "No software installation required",
      "Destructive testing capability"
    ],
    specifications: [
      { label: "Output", value: "-200V DC" },
      { label: "Interface", value: "USB Type-A" },
      { label: "Cycle", value: "Charge/Discharge loops" }
    ],
    reviews: []
  },
  {
    id: "tdcs-lan-tap",
    name: "TDCS USB Killer",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjXWC81FcRGOHzlnaMitnIQ3Y9fnk-X-Wi2EcSikpFOnkIdZHbHriBWvPytKgofh9lJSX1No39vBwjdJz0X2d4c_gB-xWnPnMg7ajfkFE_VMk-sskSt-bn6HD8trkPoaBW38rwoa0uDAQHXtf_nQUdi-plYUlpVipX079W_RBqCSRGYhQ_9d2avdhnPT2W_"
    ],
    category: "Network Auditing",
    rating: 4.4,
    reviewCount: 22,
    originalPrice: 1500,
    salePrice: 999,
    isOutOfStock: false,
    description: "The Throwing Star LAN Tap is a passive Ethernet tap. It requires no power. By plugging it inline between a target device and a switch, it physically copies the transmit and receive pairs to separate monitoring ports. This allows a security analyst to monitor 10/100Base-T network traffic using Wireshark without being detectable by the target network (no IP address, no MAC address).",
    features: [
      "Passive monitoring of 10BASET and 100BASETX networks",
      "Requires no power to operate",
      "Zero footprint (undetectable by software)",
      "Great for IDS (Intrusion Detection System) deployment",
      "Unique 'Throwing Star' PCB design"
    ],
    specifications: [
      { label: "Speed", value: "10/100 Mbps" },
      { label: "Ports", value: "4 x RJ45" },
      { label: "Type", value: "Passive Tap" }
    ],
    reviews: []
  },
  {
    id: "tdcs-keylogger-usb",
    name: "TDCS Cyber-T",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEhpg85kcbLYyB0P3udNVYsShqBclfoItuKOHIJdv0e24E4k-0vpvNvZJPE_wZyzLBIF5A0D2zvNwgKMaEcpRbvDYnhXJHzPBBknmC-6dTxtjfzx5lZFzlSJx_JeED7zUYkGSe8R4V9r1j2q6CfN6T-9y4B2Nw19WpasOhVPnue_9ElCVBltZ34PVOIPZP3x",
      "https://blogger.googleusercontent.com/img/a/AVvXsEgKKAEpbU9AzDx61w3t4pP8HKZ93qcyQ2_KOMXJO8_aOjcn_rGm5zkTiumRu9urfkzD-NsYW5cPqDTEgmVhEvq9gRLY82xaLwW8obSxF0OsbhxyEOlWyuTQ-y5LNkYZ2LUClxsNVwdPPFcIcVWIG-n0qI2K9dL77iEviqZCoaLEEtAg5YVplITJnoQXHqc9"
    ],
    category: "Surveillance",
    rating: 4.7,
    reviewCount: 18,
    originalPrice: 8500,
    salePrice: 2580,
    isOutOfStock: false,
    description: "The TDCS Cyber-T is a compact and powerful cybersecurity training platform designed for learning, experimentation, and authorized security testing. Built for students, researchers, and professionals, Cyber-T enables hands-on understanding of hardware security, communication protocols, and cyber defense concepts in a controlled environment.",
    features: [
      "Professional Cyber Kit",
      "RISC-V ULP Co-processor",
      "2.4GHz Wifi 4 (802.11b/g/n)",
      "MicroSD card socket cleverly “hidden” under the USB connector",
      "Tiny footprint (less than 1 inch long)"
    ],
    specifications: [
      { label: "Memory", value: "16MB (~16,000 pages of text)" },
      { label: "Wireless", value: "WiFi 2.4GHz" },
      { label: "Form Factor", value: "USB-A Pass-through" }
    ],
    reviews: []
  },
  {
    id: "tdcs-logic-analyzer",
    name: "TDCS USB Logic Analyzer 24MHz",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEiMAtvMxAz-lguvauJnqOVB5iq4e7lRV8N8pBLNfx1pYj-PvCEuI7SVCKSMXAE4PCnKJURvOGSIvDfLv5UCJmicZ_plDec_iNHVNfB_AenjnxQ8g1JMcNQ81yOd93VobRDvZaoUdjUK2B3VFtcMa9u8l9RFqZfTL_bJK2c0jTgOHEOGjj-aHU4YCjFICCUM"
    ],
    category: "Debugging",
    rating: 4.5,
    reviewCount: 112,
    originalPrice: 1200,
    salePrice: 850,
    isOutOfStock: false,
    description: "A logic analyzer is the stethoscope of digital electronics. This 8-channel USB analyzer allows you to record and view digital signals on your computer. It is indispensable for reverse engineering hardware protocols. Compatible with the open-source 'Sigrok' PulseView software, it can automatically decode protocols like UART (Serial), I2C, SPI, CAN, and more.",
    features: [
      "8 Channels of simultaneous monitoring",
      "Sampling rate up to 24 MHz",
      "Decodes UART, I2C, SPI, 1-Wire, and 50+ other protocols",
      "Adjustable trigger settings",
      "Works with PulseView (Open Source)"
    ],
    specifications: [
      { label: "Input", value: "5V Tolerant (Logic 0-5V)" },
      { label: "Connection", value: "Mini USB" },
      { label: "Channels", value: "8" }
    ],
    reviews: []
  }
];