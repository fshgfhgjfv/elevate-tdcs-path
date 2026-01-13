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
      "data:image/jpeg;base64,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"
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9AxtfLkNi1bygrNVDE2AFx8wJ4gEnDOT8Sw&s", // <--- ADD COMMA HERE
      "data:image/jpeg;base64,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"
  
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCl8g23rs-j0jkZNN-ycKiFsjsAGZmR2IOqg&s",
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyGBRnxYEON3kNGXoDQwqNwFWcAzcgYXhtyA&s",
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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTosfajuGVJMavdbGk0vH1hyEw2z__-2QzQVw&s",
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
      "data:image/jpeg;base64,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"
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
    id: "tdcs-esp32-cam",
    name: "TDCS ESP32-CAM Spy Module",
    images: [
      "https://lh3.googleusercontent.com/rd-gg-dl/ABS2GSnu0zzH0bVf7TbJoTCn15b3HIVm9XL_gUF6PU5ctE4ak2A2xGZrIG0dxthCkire1NN4poM8xR_1tngyUfQwsRpVjBXGSyRPyRacv3hB9P08qfBKQnYbbYKdUicxd36kMCAZXlI6XlusX-ke8U4nxBfHjkDhNzzdwCeJ8qpRAvTdTKUZKMKKvpuQGLWHuJ3-Gq5qkckeiOJPTTgDC0Rl0QdL3k9IDfInOYrvOoHQ0ZM-Mab7oi2T0HCp31Zw842FE6qYYtyO0pEyg0Ua4sqVm0hWpptkUoHUfOcFgW01MOPJJISPg7HrF2HQh-vO27X_7OJqG5e__GIlINLZoTel2eUylCejBanBG6vZuMYyDQH9IOHJFtfkXVx0QgoXnq7MHXLByUToNojHeEPy6M51qL4qmNQewrN01j0w5B43JI81j9ffv6KjQeWtOkdFqodGpRYHiKUONwwcJIyc9l-F0ONTu8zoqa066pjvmUx2haz9POQ2Y5gX-rbx_jspuiNAJ2wnEClLjU7ST8GwhUPeNgUh0QI_fSJKmzKS0GRZCkpn-jim5OQZlZ9Qc0uTZ4xihWLgZ3ANXK5dna1g5VLYfPp-esEpTquXfi09q97iOibNEFK8GeBL8edcJsPVWpSAc9wCj8YTnBiC9QLoJKKaY3SVh-uCZF7mM4_75lCuXb3anPozjr3exLPnq1x8IQU3XRBiq0wMIfhWcV_YdU_pch7jfyRJNEV90AZ0oJBdLoHKUdxHRuoGrTPuuWDiY8G-i5ibIttgg8Sa0UPGgKALOvS0MrtRB1jQ5PI8ddHK4ahObmWOjjoNCAt93USSQjWcn9ZmQGOPm6N0wY1Bx86Kekb5w6rz-X9FYoUhLvjVs0yFX4OSa5or2qGcGQUu0gZDrwASKmrkKMlIv361fs8rYZmCz_sGOH1mEb0KBRW2RTEOl4TcmYywAXKDAhxvtyXNOVMc4e6BVI4oQnM4NosFXKyIsqd3JWId96mzzZ_B1ZZzIUZYM4hnKzKA2N410lsL56KZ9TQmauwJvECTtXYNk79f0_qQkjkR9GwfXcHXzXTKI6q_T9TICrn5c5aQ28flDVgZnXpe7PBh-L-SGvzA1iC6bEQnjMKbJca9Eswtz1e-2LYuc6x0zN7BkxcEvw6zcYGSWyyyyBROvbzzu6FzStbxlDTvc0N57it4Yo4y7nOkI4QOWFFA=s1024-rj"
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
      "https://images.unsplash.com/photo-1608538260461-105c98d6c075?auto=format&fit=crop&q=80&w=600"
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
      "https://m.media-amazon.com/images/I/71pY5+z3CgL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/71N-C+x0eKL._AC_SX679_.jpg",
      "https://m.media-amazon.com/images/I/81hP-D+iK5L._AC_SX679_.jpg"
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