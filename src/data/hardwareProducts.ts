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
    reviews: [
      { id: "101", author: "Rohan K.", rating: 5, date: "2024-02-14", comment: "Incredible value. Drag-and-drop works perfectly." }
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
    reviews: [
      { id: "201", author: "Amit V.", rating: 5, date: "2024-03-01", comment: "Best investment for my career." }
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
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc0d5?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Hacking / Multi-tool",
    rating: 5.0,
    reviewCount: 1540,
    originalPrice: 15000,
    salePrice: 9999,
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
    reviews: []
  },
  {
    id: "tdcs-rtl-sdr",
    name: "TDCS RTL-SDR Blog V3 Kit",
    images: [
      "https://images.unsplash.com/photo-1515461971439-684260d8a57e?auto=format&fit=crop&q=80&w=600"
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
      "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=600"
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
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=600"
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
      "https://images.unsplash.com/photo-1563206767-5b1d972d9323?auto=format&fit=crop&q=80&w=600"
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
      "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
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
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=600"
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
      "https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=600"
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
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDg0NDRAPDg0ODQ8PDQ8NDw8PDw4OFREWFhURFRYYHSkhGBolHRUVIjEhJSkrLi4uFx8zODMsNygtLiwBCgoKDg0OGhAQGjclHyU3LjM3LSs3Mzc3NTc3Ly01Nys3NzArNy03KzU3MS8vLTguKzIrNyssLTA1Nzc3Ky83N//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAQIEAwUGB//EAEIQAAEDAgMGAgcFBQYHAAAAAAEAAgMEEQUSIQYTMUFRYSJxBxQygZGhsSNCUrLBYnJz0fAVFiQzU7RkdIKiwuHx/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAIBBAUD/8QAJBEBAQABAgUEAwAAAAAAAAAAAAECAxEEIUFRYTFxwfASIqH/2gAMAwEAAhEDEQA/APDUIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEIQgEJoQJCaEAhCEAr1Bg9RUNL4Y87Q7KTmYPFYG2p7hUV32wrT/Z9W8aObJKQehELSCg5g7MVv8AoH3PjJ+q1Iab2tre1ud+i9C2BxCeqdUCd5kyCMtuGi1y6/AdguYw2l3uKsi/4xxP7rXlx+TSgo4hg9RTta6eMsa45QczHXNr20JSw/CZ6gOMEecMIDvExtib24kdCvQdu6UPoJXjU08zCex9k/nCoejGLNHWdnxfR6Dlpdmq1rS4wOsBc5XMcfgDcrUru9hsZqampfDPJvGblzxdrAQ4ObqCAOpXNbUxBlfVtaLDfONu51PzKDVxxlzmtaLucQ1o6kmwCtYjhc9MWidm7L75fE117WvwJ6pYYP8AEU/8eL84XW+k+PK+k7tm+rUHKVOEzxRMqJI8sMmTI7Mw3zNzN0BvwViLZqtc1rmwOs4Ai7o2mx7E3C6naqO2C0DuopP9u5XttKiempqeWnc5l3ASOa0OABZpe401QcFX4NU07Q+aIsYTbNdrhfpoTZZ2bNVpAcISQQCDnj1B1H3l0eOYlFLhMYM8b6lzYTIwPZvM1/Fdo4K9tZVS01DSSQPLHOMTSQAbt3RNtR2CDh63BamBm8liLWXALrtcATwvYmyoLv6+R8uBGeR2d7w3M6wF7VNuXkuAQCEIQJCaECQmhAkIQgaEJoEmhNArJoTQRsvS/Rs1v9nVbnjMxs0peBxLBCwkfBear1D0Zwl+F1zWi7nTTNaNBdxgYANfNBa2cqqWqgqY8IaKOYZbmWBpIJ9l2jiDwIFzp068v6OMPc7E5TJ4nU8cuZ17/aFwZx97l03o02cq6N9UauLdCRsQZ4435iC6/suNuIS9H8IiONVjvZbUyt90Wd7vzBBiwp/rlNj0Is53rNSWeRZaP5xqp6JGXjrv34fyvW+2N2opq2eSCClFM4Rb1xG7s8BwbY5QPx/VVPRlRbmXGILf5NU2MX6NMgH0Qcp6LG3xB/8Aysn52LJiOzM9fieJCndE3cysz71zm3zDS1mn8JW99HWyNbSVb56qNsTPV3RtG8Y9znOc08Gk9CuQ2oxSRmJYg6lmlja6oLXGGR7A/JprlOut0Fis2SqaCWjlndC5slXExu6c9xvmB1u0dFtvS6y0lF+5N+Zi5WixGeappGzTTStFTCQJZXvAOcagOK9G9JezdXWvpTSRbwRtlDyXxssSW29oi/AoNVtiy2A4cf2aL/bOVLY/a1hYKDEcroXN3ccsmrQ3gI5P2ejuXPTUbn0gUrosCoIpBlkjdRxyNuDZ7aZ4cLjQ6g8Fc2+2enqqWkZRwte9rw54aYo7NMdr3cRfVBxO2uyLqF2/hu+ke6wJ1dC46hjuo6H49+22gqKOCipH10Lp4iImsaxrXEP3V76uHIFV9rKR8Oz0UUwyyxspWPaSHWcHAWuNCs+2mC1FXh1FHSx717TC9wzMZZu4IvdxHMhBq9sPt8JZUUT2soW5M8QiyFzRKGADplfytyvcrzWy9TxHDpabZl8FQ3JNG1uduZrrZq4OGrSRwIXlqBWRZNCBJKSVkCQmkgEIQgaaEIBNCaBJoTQRWywzaCrpWOjpp3xMc/O5rQ2xdYC+o6ALX2RlCDdO20xMgj1uXXTTID8QNFSpseq44JKaOZ7YJc+9YMtn5xZ1yRfULDh7Rv4P40f5wvVsTYap9U2YRSbjF66KHfwtkayFtBI/IACOYBGuhAOtkHlOGYlPSyb2mkdFJlLczbXym1xr5BXKbaiuifNLHUPZJO4OmcAy8jgLAnTuV1tNsbFA8ObKJ3tMsMrKmma6IPOGPqczQJLm3hAJtY8jbWrLsPTNY2QVcz4/VZ6gyR0zHxyMig3jjE4Pykg5mlji11xyGpDQz7YYlI0sfVzZXCxykMJHS7QCtKAF3c2wMTRWkTzH1cSGM7mMNcG0UdT4yX3uc+Wzb2tc8VtcB2SgiqK6jgqjJUSUNRTSRyxNYYxIyBzZRZxu37S3LUH3h5hw1GhHCy3o21xMAD1yXQW1yE+8karNgmz8NXV1UDZJtzA17mPbEzeyNErWDMHua1ntX1PK3FdLT7I4dHNQU029llfV4nDKQ0tZO2BpLc1pLsy+EjKNSXX4C4cNiuP1dWGtqp5JmMOZrXEBoda17DS/furUG2OJRsbGyrlDGNDWg5XWaOAuRddIzZKnqG0rzKYYzT4cyMwUrA+Q1VVURtdKDJbN4G3cDw5G2uTA9lGU1RRVbZDMPWqRkTC1jBLUGomjmjuTpkEJd7wg43FNoayqYI6moklY12YNdYNzdbAalW2bZ4k1rWtqpA1oDWizNABYDgu/rcUEIhnMtRUg0GIMbXU1KHPYfXI7udG4jK1mUNudDcLgNsqV8eIVUc0pqJAYy6ZzGxl4MTHC7RoLAge5BXxHaStqY91UVEkkdwSwkBpI4XsNfetYFLKEWQJJSSQJJNCCKE0IIoTQgaaEIGhCaATQhAJoTQEcha5r2+01wcL66g3C39TtxWvcH/YM8Uz3CKnjjEkssZjfI+3tOyuIuVoLIyBB2mMbdMdTxMpWyiobIHSSTw04zNNG6neCY/bdZxs4gEAAclWoNvp7v9abFI31adrWsgitJUOpxCx8wPttsACOnIrlN2EZAg3j9tq1wnDjC7fukLyYI7tzwNgcGG3gG7a0adPNYG7U1YqZ61rmtqKiHcyODBYNswAtHI/Zt1WryBPKEGxp9pKiOoqapgh3lWHCdroWPidd7Xkhh0HiaCrX99a3OyU7kvjqpqljjAwlr5Wlsjb8chzat7DoFpMoSyhBuRtjWDLbctDDTFjWxNa1vq80k0QAHAB0jtOlhyWaTa2VtPQMhLhPTVtRWSOe1pjMr33YGC/AAvvccXLQZQlkCDff32q8zTkpAxsMsO5FLCIDHI9r33jtY3cxp/8Aq1OKYjLVTyVM5BllILsrQ1ujQ0AAcNAFXyhFkCSUkkEUJpFAklJJAkk0IEhCaATQmgEwhCATQmgE0IQCaEIBNdRgexU84Ek53EZ4NI+1cPI+z77nsuppth6FgGdr5SObpHgnzAIHyQeXIXq0mxmHkaRFvlJJ/NafEPR82xNNM4HiGy2c3yB4jzJKDgUK7ieFT0zss7C3WzXDVjvI/obHsqaBJJoQJJSSQRQmkgSSaEEUJpFAkk0IEhNCBoCE0AmhNAJoTQCyQQuke2ONpe95yta0XLj0CgvRNgsJEUPrbx9tOPBf7kN9Ld3cfKyDBg2wbAGvrXlzuO5idZg7OfxPut5ldJT4JRxZRFTQNLbEOMbXvbbgQ91zfvdW5ZcoJVfDqjeRNk/GXkeWcgfIIKO0ctdeOKhcyIFpc+VzQ43vYMaCCB38wqOz2NVjakUWIBr3SNcYJmtAzFoLi11gBwB1sOHO+nSkg8VAQszCTKM4BAceIB42QWbpZljzIzII1lNHMwxytD2OFiHAFecbS7Kvpi6WG8lPqTzdEO/Ud+I53sSvSMyRIIsdQg8UQu32l2TBzT0gAOpfFoGnu3ofl5cTxTmkEgggg2IIIIPQjkUEUlJJBFJSSQRSUkkCSTQgikpJIEhNCBpoTCATQmgE0JoEQToOJ0HnyXssEYjZHG3RsbGsA6BoAH0Xk+DQ56qmZ1njv5BwcfkCvVC9BXxea0bvJa/Ymt3lKYyfFBNJG6/QuLmny1t7laxQZmOHZcJheKGhrXOdfcy+GYDpycO4OvvKD1DMnmVWOZrmtewhzXAFrmm4IPAhTzoM+ZLMsOZGZBlzJFyxFyRcgy51oNoNn46kZ2WjnA0cBo7s7qPp8jty9RL0HllVTPieY5Wlrx8COoPMLCvScVw+KpZlkGv3XDRzT1B/r3rhMUwySndlfq0nwvA0PY9CgoJKSSCKSkkgikpJFAkk0IIoTQgkmhSsgSadkWQCaE7INxshHmrYz/pskf8A9uX/AMl35cuM2JZ9pO/8MbWg/vOJP5QuszoHNqCuI2nw03L2jzXaOcqdXCHggoOM2c2jfSHdvvJTk3LPvMPMsv8AT6L0Olq2SsbLE4PY4XBH0PQ9l55jWDFpL4xpzCpYPi8tI/NGbtJ+0jd7Lx+h7oPVs6M61eF4rFUszxHUWzsPtMPQj9VczoM+dIvWDOkXoMpeoF6xF6gXoMheuZxraGPeinbGJ2Zss3MknTKzuD9Pet+Xqi6ji3onyN3oFs36+fdBzmK4Q6LxsBMR1sfaj7Hr/XHitUu8e++h4Ln8UwkayQ6cyzl7un9e8NGkpEcjoRxB0SQRSUkkESElKyVkEUJoQTsnZOydkCsnZOydkCsnZOydkHU7IstDK78Utvc1o/UlbzMtTgTctNEOuZ3xcSPlZX86DNmUXFY86WZBjniDhquXxnBuL4xY8x1XVErDK26Dz+lqZKeQPjJY9unmOYI5hd1gmOsqW2NmTAeJl9D3b1Hbl81psXwkPu5ujlzZY+N4tdrwfCQSCD1BQeo50i9c3g20Ge0NR4ZeAcdA89D0PyK3hegq43iopo81sz3HKwWOW/Unp9VHC8XjqG3b4ZAPHGTqO46jus87WvaWPAc06EFc/FgGSoa9jy2JviFiQ8H8N+ndB0jnrE56i56xOegk56p11aIm34uPsN6nr5IrKpsTC93kBzceQCnLslWOpxWzAgvGYxi5dAz7uZvS3Hpz5qM9TDCyZXbf0VMbd7J6OYkeXEucbkm5KjZZZoXMcWvFj9R1HUKFlaULJWU7JWQQsokLJZKyCFkKVk0EwE8qzCNMRoMICdlm3aYjQYbIIWfdqccN3NHVwHxKDp6cZI42fhY1vwAWTMsLnpZ0GfMjMsGZPMgy5kiVizJFyByC61GJ0LXAutq3xX8ltS5V6v8Ay3/ukIObqKcPHR3I/wA1dwvGnREQ1Ny3g1/EtHfqEhGozUweLOHkeYQdJvAQCDcEXBGoIUS9ctS1ctKcj7vhJ07d29D2W/iqGvaHsIc08CEGZzlhnnaxpe42aBqUnyAAkmwAuSeACybP4C/FHSSF26portiuLl8ttCR0t9dOa+erq4aWP553aKwwyzu2PqWzeFsrKhrq5z4GSRu9SaW2Dze1w46X+psPPuaLE58Pe2mxC74DpBVC506O5n6juNVUpqloaMMxeNrLACCYWDCBo0gjQdA4aciBztzSvpR6riI9ZoX2bFUkEuZ0bJzBHJ3Hz5eRral1Mts5vv08d8b37z7OzTkxm+N28/GU+VbajZKOoYZ6QNu4Z8jCMrr65ozwBPTge3PzGro3ROLXA6Ei5BGo4gjkey9MO/w054ianDnnNYEF0QPMHh7+B52OqeP0tHWUzqwPa3K3WS3tHlG9vHNwA58E0ONy0rjjn+2F5TKdPF8/33ZqaMy3uPLKes+Y8rslZW54QHEN1HfkeixmNe24leyVln3aRjQYMqFm3aEF4RKQiVoRqQjQVBEpCJWxGmI0FTdLJBHZ7T3v+qsbtD4A4WcA4dHAEIM5clmVcUbeWZv7r3NHwvZG4eOEh/62tcB8LH5oLOZGZV8sw5Rv66uZ8rH6pbx44xvHcZXD5G/yQWcyWZVTVsHtHJ/EBj/NZZA++oNx21QZcyxzatI62+qRcnFq63ZBX3SN0ru7Ru0FCSnDgWuFweIK1UkMtK7eR3dEfaB5dj/NdJu0t2g17mb1gztIa4DwHj71kwjEpqCRr2u8GjQ8i7SOTJRzHf6K5u1F0QIIIBB0IOoIU5YzKbZTkS2XeO/p62lxSDdyNtIBmLLjPGfxxu5jv8QtWKmXD/8ADVg9YoH+FkmXNkafukdP2fh0XENbLSuEkBeWNOYBp+0hPVnUdR/7XdYFtJDWsEFRkL5BYX/y5+w6O7fDoPC4rhs+HluM/LT6zrPM++/d3aWrNS7W7Z9+l8X77NPi1aKfeU1FPnppmBxb7W6zaljH9xxHfrqufe82LQTYkEi5tcXsbddT8SthjNJFHUyRU7y9jfavru3c2X+9br7uRVXdL1eFwxmnMpz3572c75rj1LbnZenRR3SW6V7dpGNdSVExKJjV4xqJjQUt0hXN2hBdDEwxZwxSDEGAMTyLPkTyIMGRPIs2VFkGLIjKslkkEcqMqZKRcgLLC+kiJuWMv1DQHfEarJnRmQVzQM+66Rnk8u/PdSp6csJJfmFratAPncfyWXMlmQZELHmSzFBlQsWZLOUGVFlhzlLeHogz2WvqcOIdvKezXEgvYdGP7/su7qxvj0KXrHYoMscIaLcep6lSLFhE5PIrK1xPJAixIsWYNKeRBWLFEsVvIoliCrkQrORCC2GKQjVqnOV7H2Dsj2uyuF2usb2I6Gyvf2hqHCCnDxmuRGLEltrlvDjc/wBahqN2jdLeNxCOxvSw5rixGjQL6jLb535njpYdiDDf/C04HKzTca/P39ByuCGjEDiQACSSAABcknkFF8Dha4IuLi4tcXtcddQfgt+3EgMhEEIkZMJGvaLHSYyZdOWob2A+E4cZfHkEUUYYwg5HFzw4hznDNrrYuv7gg5gwuSNJJa9ja9r8r9LrpjjEoZkiYyKwaGOa55kYGxiPRxPQX8y48ypOx2awDY42gPDsoMmQC8fha29mA7sXtbUuPNBy/qEhtx1BcO7Re5HYWOvYqBozze0e8LppcWkcx7N2wZ4HQlwdJnc1zZG5pDf7R1pCbu+8L81pPUB0QUjTN5yN+KiYWf6nwBK2AoR0UhRjog1oZH+J58mqbQz9v3gLYikHRP1TsgoDJ3T8PRXhR9lMUfZBrDbkEsp5NW3bSDosgpQg0m7d+EfBSEDz0+C3gpgptgCDRtonnn8gszMKvxJ+K3bYgsgYotVI0RwsDr8VH1Bo5LePaq72LZSxqvVgOSN0rzmLGWKkqZjUSxWyxQLEFbIkrORCCwFIIQgkpBCEDCkEIQSCEIQCSaECTQhAwhNCAUghCCSaEIGpNQhZWpBNCFCoxvWF6ELYVhesbkIVJQKg5JC1hIQhB//Z"
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
      "https://images.unsplash.com/photo-1617058866380-60b763dc369c?auto=format&fit=crop&q=80&w=600"
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
    id: "tdcs-gps-tracker",
    name: "TDCS Magnetic Asset Tracker",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600"
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
      "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Hardware / Destructive",
    rating: 4.9,
    reviewCount: 14,
    originalPrice: 4500,
    salePrice: 3999,
    isOutOfStock: true,
    description: "The USB Surge Tester (often called a USB Killer) is an industrial testing tool designed to verify the surge protection of USB ports. When plugged in, it rapidly charges its capacitors from the USB power lines and then discharges -200V DC instantly onto the data lines. This cycle repeats continuously. Unprotected equipment will suffer permanent hardware failure. USE WITH EXTREME CAUTION.",
    features: [
      "High Voltage Pulse Generator (-200V)",
      "Compact Flash Drive form factor",
      "Includes Testing Shield (to safely test the spark)",
      "Tests effectiveness of ESD protection diodes",
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
    name: "TDCS AirDrive WiFi Keylogger",
    images: [
      "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?auto=format&fit=crop&q=80&w=600"
    ],
    category: "Surveillance",
    rating: 4.7,
    reviewCount: 18,
    originalPrice: 8500,
    salePrice: 6999,
    isOutOfStock: false,
    description: "The AirDrive Keylogger is an advanced USB hardware keylogger with a built-in WiFi module. It sits between the keyboard and the computer, recording every keystroke to its internal memory. Unlike traditional keyloggers that require physical retrieval, the AirDrive creates its own WiFi hotspot. You can connect to it wirelessly from your phone or laptop to view the logs or configure it to email you reports automatically.",
    features: [
      "Records all keystrokes to internal flash memory",
      "Undetectable by antivirus software (hardware-based)",
      "WiFi Hotspot for remote data retrieval",
      "Supports 40+ national keyboard layouts",
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
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=600"
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