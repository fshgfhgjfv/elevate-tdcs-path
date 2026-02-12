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
    images?: string[];
  }[];
}

export const hardwareProducts: HardwareProduct[] = [
  // ═══════════════════════════════════════════════════
  // 1. AtomS3U (Rubber-Duck-Kit)
  // ═══════════════════════════════════════════════════
  {
    id: "tdcs-atoms3u-rubber-duck",
    name: "AtomS3U (Rubber-Duck-Kit)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjbayeundx_TQVe4KxDo141n0wlmgwN009qVBXw8J2HnduSQQyuFc5tKMVwqtHALQl8Q7Dx3-llm2hgOEBzd-F1laXUoUReyZEsAy0N610PLxGjoxuMWc6HX6UKffANdNWo65-vSJP3W0Mq1XECsabs5EU-Oq6uIL7JdNURS-E12QKZutxFTUSoqHzjnbVF",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjx9_GSMO5DyQC2NSe6KUAjf7kFX0PJwoFUeao1B7YDeSQL3nD3YTAItfuDAALZb2qsPyxIhmOSxzugMoINNmFFrTwZGqNFU1tI7BFEDjbdTsOuhVmFbUF8XL_T81ffiTv6b-xRPaxFFWWCYjNyshcgWM8CZqPse32Um0_ao7RTouOP1DmqhilCeAqA-n6T"
    ],
    category: "Hardware / HID",
    rating: 4.8,
    reviewCount: 28,
    originalPrice: 2999,
    salePrice: 2340,
    isOutOfStock: true,
    description: "The AtomS3U Rubber Duck Kit is a compact USB-C HID attack device based on the M5Stack AtomS3U module. It emulates a keyboard instantly upon plug-in, capable of executing pre-programmed keystroke injection scripts at lightning speed. Ideal for penetration testers and red team operators who need a stealthy, pocketable payload delivery system.",
    longDescription: "The AtomS3U Rubber Duck Kit takes the classic 'Rubber Ducky' concept and supercharges it with modern hardware. Built on the M5Stack AtomS3U — featuring an ESP32-S3 with USB-C connectivity — this kit is one of the smallest and most powerful HID attack platforms available today. Unlike traditional BadUSB devices that rely on outdated ATtiny85 chips, the AtomS3U leverages the ESP32-S3's native USB OTG capability to present itself as a legitimate Human Interface Device (keyboard/mouse) to any computer it connects to. The moment it's plugged in, it begins typing pre-programmed payloads at speeds no human can match. The built-in 0.85-inch IPS display provides real-time feedback on script execution status. The device supports CircuitPython and Arduino IDE, making script development accessible to both beginners and experts. Whether you're demonstrating USB attack vectors in a corporate security awareness session or conducting authorized penetration testing, this device is your go-to tool.",
    features: [
      "ESP32-S3 with native USB-C OTG support",
      "0.85-inch IPS LCD display for status feedback",
      "Supports CircuitPython & Arduino IDE",
      "Ultra-compact form factor (24mm × 24mm)",
      "Pre-loaded with Rubber Ducky scripts",
      "Instant HID emulation on plug-in"
    ],
    packageContents: [
      "1x AtomS3U Module (Pre-Programmed)",
      "1x USB-C to USB-A Adapter",
      "1x Quick Start Script Guide",
      "1x TDCS Sticker Pack",
      "1x Anti-static Storage Pouch"
    ],
    legal: "This product is sold exclusively for educational purposes, authorized security testing, and legitimate research. Unauthorized use of this device for malicious activities is strictly prohibited and may violate local, state, and federal laws. The buyer assumes all responsibility for legal and ethical use.",
    disclaimer: "TDCS and its affiliates are not responsible for any misuse of this product. By purchasing, you agree that you will only use this device on systems you own or have explicit written authorization to test.",
    delivery: "Standard delivery: 5-7 business days. Express delivery: 2-3 business days (additional charges apply). All orders shipped via insured courier with tracking.",
    support: "30-day replacement warranty. WhatsApp support Mon-Sat (10 AM - 7 PM IST). Email: hardware@tdcs.in.",
    specifications: [
      { label: "Chipset", value: "ESP32-S3 (Dual Core 240MHz)" },
      { label: "Display", value: "0.85\" IPS LCD (128×128)" },
      { label: "USB", value: "USB-C (OTG capable)" },
      { label: "Flash", value: "8MB" },
      { label: "PSRAM", value: "2MB" },
      { label: "Dimensions", value: "24 × 24 × 13mm" },
      { label: "Weight", value: "6.5g" }
    ],
    reviews: [
      { id: "a1", author: "Vikram S.", rating: 5, date: "2024-06-12", comment: "Smallest BadUSB I've ever used. Plugs in via USB-C and executes scripts instantly. The tiny screen is a nice touch for debugging.", title: "Incredibly Tiny & Powerful", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEjbayeundx_TQVe4KxDo141n0wlmgwN009qVBXw8J2HnduSQQyuFc5tKMVwqtHALQl8Q7Dx3-llm2hgOEBzd-F1laXUoUReyZEsAy0N610PLxGjoxuMWc6HX6UKffANdNWo65-vSJP3W0Mq1XECsabs5EU-Oq6uIL7JdNURS-E12QKZutxFTUSoqHzjnbVF"] },
      { id: "a2", author: "Neha R.", rating: 5, date: "2024-07-01", comment: "Used this for a client demo on USB security. Blew their minds when it opened PowerShell in 2 seconds flat.", title: "Perfect for Security Demos", verified: true },
      { id: "a3", author: "Ankit P.", rating: 4, date: "2024-08-15", comment: "Great device, wish it came with more example scripts. But the CircuitPython support makes it easy to write your own.", title: "Good but needs more scripts", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 2. BadUSB (DigiSpark Pre-Installed)
  // ═══════════════════════════════════════════════════
  {
    id: "tdcs-digispark",
    name: "BadUSB (DigiSpark Pre-Installed)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEhJOeEO47bUCZoKZEpnL3KZqxh6Y_CVpC3MwMbQVAV432R8AZZjHvD8kTgOs19zeTnKtNG7Zg26xz4Rvf0K4VzjiKQcaG1xaoQBwcO_JQs2x0XUAfKug7MxEvtu67wUhr-getw-oeIZAk9CTWKpsyBY8BCQ0b_z4hlwUYeFVhmjLes5pedaiASi36xKkEfL"
    ],
    category: "Hardware / HID",
    rating: 4.5,
    reviewCount: 520,
    originalPrice: 999,
    salePrice: 780,
    isOutOfStock: true,
    description: "The DigiSpark ATtiny85-based BadUSB is the original pocket-sized keystroke injector. Pre-installed with TDCS firmware, it emulates a USB keyboard and executes pre-programmed payloads instantly. Its tiny size makes it virtually undetectable when plugged into a target machine. A must-have for beginners learning about HID attack vectors.",
    longDescription: "The DigiSpark is the entry point into the world of BadUSB attacks. Based on the ATtiny85 microcontroller, this thumb-sized board has become legendary in the security community for its ability to emulate a USB Human Interface Device (HID). When plugged into any computer, the operating system recognizes it as a keyboard and it begins 'typing' pre-programmed keystroke sequences at superhuman speed. This TDCS edition comes pre-flashed with a collection of educational payloads — from opening a reverse shell to extracting saved WiFi passwords — all designed for authorized testing environments. The board uses a software USB implementation, meaning it needs no external USB controller chip, keeping costs incredibly low. Programming is done through the Arduino IDE with the DigiSpark board package installed. Despite its simplicity, the DigiSpark remains one of the most effective tools for demonstrating why USB ports should be physically secured and why USB device whitelisting policies are critical in enterprise environments.",
    features: [
      "ATtiny85 microcontroller with software USB",
      "Pre-installed TDCS BadUSB firmware",
      "6 I/O Pins for expansion",
      "8KB Flash (6KB usable after bootloader)",
      "Arduino IDE compatible",
      "Ducky Script payload support"
    ],
    packageContents: [
      "1x DigiSpark ATtiny85 (Pre-Programmed)",
      "1x Pin Header Set",
      "1x Payload Script Collection (Digital)",
      "1x Quick Setup Guide",
      "1x TDCS Sticker"
    ],
    legal: "This product is sold exclusively for educational purposes and authorized security testing. Unauthorized use against systems you do not own is illegal.",
    disclaimer: "TDCS is not responsible for any misuse. By purchasing, you agree to use this device only on systems you own or have explicit written authorization to test.",
    delivery: "Standard delivery: 5-7 business days. Express: 2-3 business days. Shipped with tracking.",
    support: "30-day replacement warranty. WhatsApp support Mon-Sat (10 AM - 7 PM IST). Email: hardware@tdcs.in.",
    specifications: [
      { label: "Chip", value: "ATtiny85" },
      { label: "Clock", value: "16.5 MHz" },
      { label: "Flash", value: "8KB (6KB usable)" },
      { label: "RAM", value: "512 bytes" },
      { label: "Voltage", value: "5V USB" },
      { label: "Interface", value: "Software USB 1.1" },
      { label: "Dimensions", value: "19 × 23mm" }
    ],
    reviews: [
      { id: "b1", author: "Rahul T.", rating: 5, date: "2024-03-10", comment: "Best ₹780 I ever spent. Pre-loaded payloads worked perfectly on my lab machine. Great for learning BadUSB concepts.", title: "Amazing Value for Money", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEhJOeEO47bUCZoKZEpnL3KZqxh6Y_CVpC3MwMbQVAV432R8AZZjHvD8kTgOs19zeTnKtNG7Zg26xz4Rvf0K4VzjiKQcaG1xaoQBwcO_JQs2x0XUAfKug7MxEvtu67wUhr-getw-oeIZAk9CTWKpsyBY8BCQ0b_z4hlwUYeFVhmjLes5pedaiASi36xKkEfL"] },
      { id: "b2", author: "Pooja M.", rating: 4, date: "2024-04-22", comment: "Tiny board, big impact. Only 8KB flash is limiting but enough for most payloads. Would love a USB-C version.", title: "Compact & Effective", verified: true },
      { id: "b3", author: "Arjun K.", rating: 5, date: "2024-05-18", comment: "Used this in my college cybersecurity presentation. Everyone was shocked how fast it types. TDCS firmware is well-curated.", title: "College Demo Hit", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 3. BW16-5Ghz Kit (Pre-Installed Firmware)
  // ═══════════════════════════════════════════════════
  {
    id: "tdcs-bw16-5ghz",
    name: "BW16-5Ghz Kit (Pre-Installed Firmware)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEi19affCJsFqGgVFUFzlYkdaP0AcsjA-n_bbE8FYNewIK_7kHEeY25UvGTsqZKpiMfzqPFPtd8dvPXdpSGW3WLK2NpTglfiMYImq_JvHK1xcT1u5ENaxPsWe6CGRhUh3gsysUy33FqYkJPmrAE_rk94OJAhtJQd9FhMX_qBboPIIjyybK7T8tZeyG8OJrcn",
      "https://blogger.googleusercontent.com/img/a/AVvXsEgm2rP7ziezJgjJkwMidPVi6eCPXbnTV0ApJQFgX0B-H3H2dSYEebM8nt23Y99FCbfi5a6aUU9auyTum2fdPfvV_vdKZcqGDlS7ld672MLC_XzXiWAuO07jDtF5UI84foQfVoMrSo5TUskp7Jh5irhkc8Xc7Txqqz9gNBzSTeDRhy7R2lOau9Mht3AeXoXs"
    ],
    category: "WiFi Auditing",
    rating: 5.0,
    reviewCount: 18,
    originalPrice: 1999,
    salePrice: 1499,
    isOutOfStock: true,
    description: "The BW16 is the game-changer for WiFi security testing — it's one of the few affordable boards that supports both 2.4GHz AND 5GHz WiFi bands. Based on the Realtek RTL8720DN dual-band module, it can perform deauthentication attacks, beacon spam, and network scanning on 5GHz networks that ESP8266/ESP32 boards simply cannot reach.",
    longDescription: "While the ESP8266 and ESP32 have dominated the WiFi hacking scene for years, they share one critical limitation: they only support 2.4GHz networks. As more and more networks migrate to 5GHz bands for better performance, security tools need to follow. Enter the BW16 — powered by the Realtek RTL8720DN, this dual-band WiFi module operates on both 2.4GHz and 5GHz frequencies. This TDCS edition comes pre-installed with custom firmware that enables network scanning, deauthentication attacks, and beacon spam across both bands. The RTL8720DN features an Arm Cortex-M33 secure core and an Arm Cortex-M23 real-time core, providing serious processing power in a compact form factor. The board includes built-in Bluetooth Low Energy (BLE) 5.0 support, opening up additional attack vectors. Pre-soldered headers and a USB-C connector make setup effortless — just plug in, open a serial terminal, and you're ready to audit.",
    features: [
      "Realtek RTL8720DN Dual-Band WiFi (2.4GHz + 5GHz)",
      "Bluetooth Low Energy 5.0",
      "Pre-installed TDCS WiFi auditing firmware",
      "Arm Cortex-M33 + Cortex-M23 dual-core",
      "USB-C connectivity",
      "5GHz deauthentication capability"
    ],
    packageContents: [
      "1x BW16 Module (Pre-Programmed)",
      "1x USB-C Cable (1m)",
      "1x External Antenna (2.4GHz/5GHz dual-band)",
      "1x Firmware Flashing Guide",
      "1x TDCS Sticker"
    ],
    legal: "This product is sold for educational and authorized testing purposes only. Deauthentication attacks on networks you do not own is illegal.",
    disclaimer: "TDCS is not responsible for misuse. Use only on your own networks or with explicit written authorization.",
    delivery: "Standard delivery: 5-7 business days. Express: 2-3 business days. Insured with tracking.",
    support: "30-day replacement warranty. WhatsApp support Mon-Sat. Email: hardware@tdcs.in.",
    specifications: [
      { label: "Chipset", value: "Realtek RTL8720DN" },
      { label: "WiFi", value: "802.11 a/b/g/n (2.4GHz + 5GHz)" },
      { label: "BLE", value: "Bluetooth 5.0 LE" },
      { label: "CPU", value: "Arm Cortex-M33 + M23" },
      { label: "Flash", value: "2MB" },
      { label: "RAM", value: "512KB" },
      { label: "Interface", value: "USB-C" }
    ],
    reviews: [
      { id: "c1", author: "Deepak V.", rating: 5, date: "2024-05-20", comment: "Finally a board that does 5GHz! Tested deauth on my home 5GHz network and it worked flawlessly. ESP32 could never.", title: "5GHz Deauth — Game Changer!", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEi19affCJsFqGgVFUFzlYkdaP0AcsjA-n_bbE8FYNewIK_7kHEeY25UvGTsqZKpiMfzqPFPtd8dvPXdpSGW3WLK2NpTglfiMYImq_JvHK1xcT1u5ENaxPsWe6CGRhUh3gsysUy33FqYkJPmrAE_rk94OJAhtJQd9FhMX_qBboPIIjyybK7T8tZeyG8OJrcn"] },
      { id: "c2", author: "Priya L.", rating: 5, date: "2024-06-08", comment: "Pre-installed firmware saved me hours. Plug and play via USB-C. Scans both bands simultaneously.", title: "Plug & Play Perfection", verified: true },
      { id: "c3", author: "Karthik N.", rating: 5, date: "2024-07-14", comment: "Worth every rupee. The dual-band scanning capability puts this leagues ahead of ESP8266. Build quality is solid.", title: "Best WiFi Audit Board", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 4. CYBER-T USB-ARMY-KNIFE (Pre-Installed Firmware)
  // ═══════════════════════════════════════════════════
  {
    id: "tdcs-keylogger-usb",
    name: "CYBER-T USB-ARMY-KNIFE (Pre-Installed Firmware)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEhpg85kcbLYyB0P3udNVYsShqBclfoItuKOHIJdv0e24E4k-0vpvNvZJPE_wZyzLBIF5A0D2zvNwgKMaEcpRbvDYnhXJHzPBBknmC-6dTxtjfzx5lZFzlSJx_JeED7zUYkGSe8R4V9r1j2q6CfN6T-9y4B2Nw19WpasOhVPnue_9ElCVBltZ34PVOIPZP3x",
      "https://blogger.googleusercontent.com/img/a/AVvXsEgKKAEpbU9AzDx61w3t4pP8HKZ93qcyQ2_KOMXJO8_aOjcn_rGm5zkTiumRu9urfkzD-NsYW5cPqDTEgmVhEvq9gRLY82xaLwW8obSxF0OsbhxyEOlWyuTQ-y5LNkYZ2LUClxsNVwdPPFcIcVWIG-n0qI2K9dL77iEviqZCoaLEEtAg5YVplITJnoQXHqc9"
    ],
    category: "Hardware / Multi-tool",
    rating: 5.0,
    reviewCount: 32,
    originalPrice: 3499,
    salePrice: 2580,
    isOutOfStock: false,
    description: "The TDCS Cyber-T USB Army Knife is a compact and powerful all-in-one cybersecurity training platform. Built on ESP32-S2 with WiFi, BadUSB, MicroSD logging, and a hidden form factor, it's the Swiss Army Knife of USB security tools. Pre-installed with TDCS custom firmware for instant deployment.",
    longDescription: "The TDCS Cyber-T is not just another USB gadget — it's a full cybersecurity training platform compressed into a device smaller than your thumb. Built around the ESP32-S2 chipset with native USB support, it combines multiple attack vectors into a single device: BadUSB keystroke injection via HID emulation, WiFi network scanning and deauthentication over 802.11b/g/n, and covert data exfiltration via a cleverly hidden MicroSD card slot tucked under the USB connector. The RISC-V Ultra-Low-Power co-processor enables the device to operate in deep sleep modes while monitoring, making it nearly impossible to detect through power analysis. With 16MB of flash storage, it can hold thousands of pages of logged data. The pre-installed TDCS firmware provides a web-based control interface accessible over WiFi — simply connect to the device's AP, open a browser, and you have full control over all modules. This is the tool that bridges the gap between a simple BadUSB and a full penetration testing toolkit.",
    features: [
      "ESP32-S2 with native USB HID support",
      "WiFi 2.4GHz (802.11b/g/n) for network auditing",
      "RISC-V ULP Co-processor for stealth operation",
      "Hidden MicroSD slot for covert data logging",
      "16MB Flash storage",
      "Web-based control interface via WiFi AP",
      "Pre-installed TDCS multi-tool firmware"
    ],
    packageContents: [
      "1x Cyber-T USB Army Knife (Pre-Programmed)",
      "1x MicroSD Card (8GB, pre-formatted)",
      "1x USB Extension Cable",
      "1x Quick Start Guide with QR Code",
      "1x TDCS Branded Case"
    ],
    legal: "Sold for educational and authorized security testing only. Using this device on systems without authorization is strictly illegal.",
    disclaimer: "TDCS is not responsible for misuse. Only use on systems you own or have written authorization to test. Misuse may result in criminal prosecution.",
    delivery: "Standard delivery: 5-7 business days. Express: 2-3 business days. Insured courier with tracking.",
    support: "30-day replacement warranty. WhatsApp support Mon-Sat (10 AM - 7 PM IST). Email: hardware@tdcs.in. Firmware update support included.",
    specifications: [
      { label: "Chipset", value: "ESP32-S2 (240MHz)" },
      { label: "Wireless", value: "WiFi 2.4GHz (802.11b/g/n)" },
      { label: "USB", value: "Native USB OTG (HID)" },
      { label: "Storage", value: "16MB Flash + MicroSD" },
      { label: "Co-processor", value: "RISC-V ULP" },
      { label: "Form Factor", value: "USB-A (< 1 inch)" },
      { label: "Weight", value: "4g" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=6He9pXwVFNQ",
    reviews: [
      { id: "d1", author: "Saurabh G.", rating: 5, date: "2024-04-10", comment: "This is insane value. WiFi deauth + BadUSB + SD logging all in one tiny device. The web interface is chef's kiss.", title: "All-in-One Beast!", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEhpg85kcbLYyB0P3udNVYsShqBclfoItuKOHIJdv0e24E4k-0vpvNvZJPE_wZyzLBIF5A0D2zvNwgKMaEcpRbvDYnhXJHzPBBknmC-6dTxtjfzx5lZFzlSJx_JeED7zUYkGSe8R4V9r1j2q6CfN6T-9y4B2Nw19WpasOhVPnue_9ElCVBltZ34PVOIPZP3x"] },
      { id: "d2", author: "Meera K.", rating: 5, date: "2024-05-28", comment: "The hidden MicroSD slot is genius. Perfect for red team exercises. Firmware was already loaded — just plug and go.", title: "Red Team Essential", verified: true },
      { id: "d3", author: "Raj P.", rating: 5, date: "2024-07-02", comment: "Compared to Flipper Zero at ₹30K, this does 80% of the work at under ₹3K. Incredible engineering by TDCS.", title: "Budget Flipper Alternative", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 5. CYD-ESP32 (Marauder) Cyber Edition
  // ═══════════════════════════════════════════════════
  {
    id: "esp32-cyd-display",
    name: "CYD-ESP32 (Marauder) Cyber Edition",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjqcwQ8tlpM_VZABagrFHNl9-TlkTqRBc9pCOnTN8MdNvdwisP4o01w9m_74zIGI25zNIYamW8xTCL8iHhWqfuvapylSwQ3vg4Y2EObm2ocTwTmXTf0fMpGz6YjxanD7hflt4yOTVH81fKzjbHG2trxkQQrygMca5NhAIslIxl1w3EnTCGmVX1gK3JgDBwa",
      "https://blogger.googleusercontent.com/img/a/AVvXsEhVSMk0TdIm1rZpy1urOvEjaQevbBAkJoo2gTpKSzVrh0skf9FMvjCNGK7KPfHUPl72KmpKzsmleTWEg59txoLejf1JvivH_ditc1W73V3Xe7PSojjFYr1zT73Y57irJF6H61v76dm8j78oIZaPFeZ9dhCkPv6YH-c16fHCNbOsQpyf5wHXCCk9pWIsa4EN",
      "https://blogger.googleusercontent.com/img/a/AVvXsEirPBeAfGm5bJY_4EjgFYtAWmwZaEwoFGNZ2AV6o0AdBfpwpYEzzeKuYR_3J3xcIitkkDJJW6-p3rheGd-a9NhfGO4iqiX_ZYGNQbHtpYEx1SZgNRhocBil2cTOQi8dUMEd_GvCyfdJjjGUOXNnLorz6smF-779in7h8-HKin7iNB0lM-ynCq7uzifZbAVr",
      "https://blogger.googleusercontent.com/img/a/AVvXsEhM3NJqsbqd6CWKIZI1qtM2JlnseIsyP2PRas6lG7JCt9xhHQ9zKIkaUwVctPN3MeVu9Snq0zkHs2ARJf8xlyIHBJk3K6TFzdLeaZc-ue9rpJqgiiwvIgpgHbwIe3CHCx4ZmjY6pNId1OSr7eASQ8mg5651w9Lb90Y9x_GN2uKM6c_Uu0BrHQ_g5NYvp_n_"
    ],
    category: "Development / IoT",
    rating: 5.0,
    reviewCount: 210,
    originalPrice: 3999,
    salePrice: 2450,
    isOutOfStock: true,
    description: "The CYD-ESP32 'Cheap Yellow Display' Marauder Cyber Edition combines a powerful ESP32 with a 2.8-inch touchscreen for a visual WiFi security auditing experience. Pre-loaded with ESP32 Marauder firmware, it provides a full graphical interface for packet sniffing, deauth attacks, and beacon spam — no laptop required.",
    longDescription: "The ESP32-2432S028 'Cheap Yellow Display' (CYD) has become a cult classic in the hardware hacking community, and this TDCS Cyber Edition takes it to the next level. By pre-loading the renowned ESP32 Marauder firmware, we've transformed this affordable development board into a standalone WiFi security auditing tool with a full graphical user interface. The 2.8-inch resistive touchscreen (320×240, ILI9341 driver) provides real-time visualization of nearby access points, connected clients, and packet activity. You can launch deauthentication attacks, create beacon spam (hundreds of fake SSIDs), or sniff probe requests — all from the touchscreen menu without needing a computer. The onboard MicroSD card slot enables logging captured data for later analysis. The Marauder firmware also includes Bluetooth scanning capabilities, making this a true multi-protocol audit device. The built-in RGB LED provides visual feedback during operations, and the light sensor can be used for ambient-aware display brightness.",
    features: [
      "ESP32-WROOM-32 Dual Core processor",
      "2.8\" TFT Touch Screen (320×240) with ILI9341",
      "Pre-loaded ESP32 Marauder firmware",
      "MicroSD slot for data logging",
      "Programmable RGB LED",
      "WiFi + Bluetooth scanning from GUI",
      "Standalone operation — no PC needed"
    ],
    packageContents: [
      "1x CYD-ESP32 Board (Marauder Pre-Installed)",
      "1x MicroSD Card (4GB)",
      "1x Micro-USB Cable (1m)",
      "1x Touch Stylus",
      "1x Getting Started Guide"
    ],
    legal: "For educational and authorized security testing purposes only. Network attacks without authorization are illegal.",
    disclaimer: "Use only on networks you own or have permission to test. TDCS is not liable for unauthorized use.",
    delivery: "Standard: 5-7 business days. Express: 2-3 business days. Tracked & insured shipping.",
    support: "30-day warranty. WhatsApp & email support. Free Marauder firmware update guides.",
    specifications: [
      { label: "Display", value: "2.8\" ILI9341 w/ XPT2046 Touch" },
      { label: "Processor", value: "ESP32-WROOM-32 (240MHz)" },
      { label: "Resolution", value: "320 × 240 px" },
      { label: "WiFi", value: "802.11 b/g/n 2.4GHz" },
      { label: "Bluetooth", value: "BT 4.2 + BLE" },
      { label: "Storage", value: "MicroSD (up to 32GB)" },
      { label: "Power", value: "Micro-USB 5V" }
    ],
    reviews: [
      { id: "e1", author: "Varun D.", rating: 5, date: "2024-03-15", comment: "This is the coolest hacking gadget I own. Touchscreen Marauder is incredible — scan, deauth, sniff, all from a tiny screen. Feels like a cyberpunk tool.", title: "Touchscreen Hacking Beast", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEjqcwQ8tlpM_VZABagrFHNl9-TlkTqRBc9pCOnTN8MdNvdwisP4o01w9m_74zIGI25zNIYamW8xTCL8iHhWqfuvapylSwQ3vg4Y2EObm2ocTwTmXTf0fMpGz6YjxanD7hflt4yOTVH81fKzjbHG2trxkQQrygMca5NhAIslIxl1w3EnTCGmVX1gK3JgDBwa"] },
      { id: "e2", author: "Aditi S.", rating: 5, date: "2024-04-28", comment: "Pre-loaded Marauder saved me so much setup time. Just power on and start scanning. MicroSD logging is a great bonus.", title: "Plug & Scan", verified: true },
      { id: "e3", author: "Nikhil R.", rating: 5, date: "2024-06-10", comment: "At ₹2,450 this is an absolute steal. Shows all APs, clients, and lets you run attacks from the screen. Better than I expected.", title: "Unbeatable Price-to-Feature", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 6. EBYTE E01-2G4M27D NRF24l01 PA LNA (Long Range)
  // ═══════════════════════════════════════════════════
  {
    id: "tdcs-nrf24-long-range",
    name: "EBYTE E01-2G4M27D NRF24l01 PA LNA (Long Range)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjN_8lLaLfol0uZHlPgqWDqS3KMQL1drS13qg5zYp0aETGKT-rF6FJM10DaXx_csJExYvJYJw74oiIC741H7q0Bq7WYb5I2fv7CXJd-LFSuqs4sbLE9oygw_8IDNI-wfiwScO0r71q3c0DsPhp0205wnTfRXRlGahhfnC7sRzTSd3FRoi5gsMTC6tNnbSnr"
    ],
    category: "RF / Wireless",
    rating: 4.6,
    reviewCount: 45,
    originalPrice: 950,
    salePrice: 795,
    isOutOfStock: false,
    description: "The EBYTE E01-2G4M27D is a high-power, long-range version of the popular NRF24L01 transceiver. With a built-in Power Amplifier (PA) and Low Noise Amplifier (LNA), it achieves transmission ranges of up to 800 meters in open air. Essential for 2.4GHz wireless security research, drone signal analysis, and MouseJack attacks.",
    longDescription: "The NRF24L01 has been a staple in wireless security research for years, but the standard module's limited range restricts its usefulness in real-world scenarios. The EBYTE E01-2G4M27D solves this by integrating a high-power PA (Power Amplifier) and LNA (Low Noise Amplifier) with an SMA antenna connector, boosting the effective range to over 800 meters line-of-sight. Operating on the 2.4GHz ISM band with 126 selectable channels, this module is the foundation of the infamous 'MouseJack' attack — a vulnerability affecting millions of wireless keyboards and mice from major manufacturers like Logitech, Microsoft, Dell, and HP. By sniffing and injecting packets on the proprietary protocols these devices use, a researcher can take over a victim's computer by injecting keystrokes through their own wireless mouse dongle. The module communicates via SPI and works with Arduino, ESP32, and Raspberry Pi. Combined with the CrazyRadio PA firmware and the Jackit toolkit, it becomes a formidable wireless assessment tool.",
    features: [
      "NRF24L01+ with integrated PA+LNA",
      "Up to 800m range (open air)",
      "126 selectable 2.4GHz channels",
      "SMA antenna connector for external antenna",
      "SPI interface (Arduino/ESP32/Pi compatible)",
      "MouseJack attack capable",
      "Data rate: 250Kbps / 1Mbps / 2Mbps"
    ],
    packageContents: [
      "1x EBYTE E01-2G4M27D Module",
      "1x SMA Antenna (5dBi)",
      "1x Dupont Wire Set (8 pieces)",
      "1x Pin Reference Card",
      "1x TDCS Sticker"
    ],
    legal: "For educational and authorized testing only. Intercepting wireless communications without consent is illegal in most jurisdictions.",
    disclaimer: "TDCS is not responsible for any unauthorized use. Only use on devices and networks you own or have explicit authorization to test.",
    delivery: "Standard: 5-7 business days. Express: 2-3 business days. Tracked shipping.",
    support: "30-day warranty. WhatsApp & email support. Arduino library guide included.",
    specifications: [
      { label: "Chipset", value: "NRF24L01+ (Nordic)" },
      { label: "Frequency", value: "2.4GHz ISM Band" },
      { label: "PA Output", value: "+27dBm" },
      { label: "LNA Gain", value: "High sensitivity" },
      { label: "Range", value: "800m+ (line of sight)" },
      { label: "Interface", value: "SPI" },
      { label: "Antenna", value: "SMA (external)" }
    ],
    reviews: [
      { id: "f1", author: "Aditya R.", rating: 5, date: "2024-06-20", comment: "MouseJack attack worked from across the office parking lot. The range on this thing is insane compared to standard NRF24.", title: "Incredible Range", verified: true },
      { id: "f2", author: "Sneha T.", rating: 4, date: "2024-07-15", comment: "Good module, paired it with my Arduino Nano. SPI wiring took a bit of figuring out but the TDCS guide helped.", title: "Solid Long-Range Module", verified: true },
      { id: "f3", author: "Manish K.", rating: 5, date: "2024-08-01", comment: "Used this with CrazyRadio PA firmware. Scanned and found 4 vulnerable wireless mice in my office. Eye-opening!", title: "MouseJack Success", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 7. ESP32/2NRF Kit (Bluetooth Penetration)
  // ═══════════════════════════════════════════════════
  {
    id: "tdcs-esp32-2nrf-kit",
    name: "ESP32/2NRF Kit (Bluetooth Penetration)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjN_8lLaLfol0uZHlPgqWDqS3KMQL1drS13qg5zYp0aETGKT-rF6FJM10DaXx_csJExYvJYJw74oiIC741H7q0Bq7WYb5I2fv7CXJd-LFSuqs4sbLE9oygw_8IDNI-wfiwScO0r71q3c0DsPhp0205wnTfRXRlGahhfnC7sRzTSd3FRoi5gsMTC6tNnbSnr"
    ],
    category: "Bluetooth",
    rating: 4.6,
    reviewCount: 56,
    originalPrice: 2499,
    salePrice: 1580,
    isOutOfStock: true,
    description: "The ESP32/2NRF Kit combines an ESP32 development board with two NRF24L01+PA+LNA modules for comprehensive Bluetooth and 2.4GHz wireless penetration testing. This kit enables BLE scanning, MouseJack attacks, wireless keyboard sniffing, and Bluetooth jamming research all in one package.",
    longDescription: "This comprehensive Bluetooth penetration testing kit brings together the best of both worlds: the ESP32's built-in Bluetooth Classic and BLE capabilities with the NRF24L01's ability to interact with proprietary 2.4GHz protocols. The ESP32 handles BLE device enumeration, GATT service discovery, and Bluetooth Classic device scanning, while the dual NRF24L01+PA+LNA modules enable MouseJack attacks against vulnerable wireless peripherals, packet sniffing on Enhanced ShockBurst protocols, and research into wireless keyboard/mouse security. Having two NRF modules allows simultaneous monitoring on different channels or running a sniffer while injecting on another frequency. The kit comes fully assembled with pre-soldered connections between the ESP32 and NRF modules, meaning you can start testing immediately. TDCS firmware provides a serial menu-driven interface for all attack modules. This is the go-to kit for anyone serious about Bluetooth and 2.4GHz wireless security.",
    features: [
      "ESP32 with Bluetooth Classic + BLE 4.2",
      "2x NRF24L01+PA+LNA long-range modules",
      "Simultaneous multi-channel monitoring",
      "MouseJack, BLE scanning, keyboard sniffing",
      "Pre-assembled & pre-programmed",
      "Serial menu-driven TDCS firmware"
    ],
    packageContents: [
      "1x ESP32 DevKit V1",
      "2x NRF24L01+PA+LNA Modules",
      "2x SMA Antennas (5dBi)",
      "1x Custom PCB Adapter Board",
      "1x Micro-USB Cable (1m)",
      "1x Jumper Wire Set",
      "1x Complete Attack Guide"
    ],
    legal: "For educational and authorized security testing purposes only. Intercepting Bluetooth or wireless communications without consent is prohibited by law.",
    disclaimer: "TDCS is not responsible for unauthorized use. Test only on devices you own or have written authorization to assess.",
    delivery: "Standard: 5-7 business days. Express: 2-3 business days. Tracked & insured.",
    support: "30-day warranty. WhatsApp & email support. Includes firmware update access.",
    specifications: [
      { label: "Main MCU", value: "ESP32-WROOM-32 (240MHz)" },
      { label: "Bluetooth", value: "Classic + BLE 4.2" },
      { label: "RF Modules", value: "2x NRF24L01+PA+LNA" },
      { label: "RF Range", value: "800m+ each (LOS)" },
      { label: "WiFi", value: "802.11 b/g/n 2.4GHz" },
      { label: "Power", value: "Micro-USB 5V" },
      { label: "Channels", value: "126 × 2 (simultaneous)" }
    ],
    reviews: [
      { id: "g1", author: "Rohit M.", rating: 5, date: "2024-04-05", comment: "Dual NRF modules are a game changer — sniff on one channel, inject on another. BLE scanning with ESP32 is the cherry on top.", title: "Dual NRF = Dual Power", verified: true },
      { id: "g2", author: "Kavitha S.", rating: 4, date: "2024-05-12", comment: "Pre-assembled kit saved me hours of soldering. Found 6 vulnerable wireless mice in my college lab within minutes.", title: "Ready Out of the Box", verified: true },
      { id: "g3", author: "Amit J.", rating: 5, date: "2024-06-30", comment: "Best Bluetooth pentest kit under ₹2K. The serial menu is intuitive and covers all major attack vectors.", title: "Complete BT Pentest Kit", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 8. ESP8266-Kit (Pre-Installed WiFi Firmware)
  // ═══════════════════════════════════════════════════
  {
    id: "all-tdcs-courses",
    name: "ESP8266-Kit (Pre-Installed WiFi Firmware)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEi19affCJsFqGgVFUFzlYkdaP0AcsjA-n_bbE8FYNewIK_7kHEeY25UvGTsqZKpiMfzqPFPtd8dvPXdpSGW3WLK2NpTglfiMYImq_JvHK1xcT1u5ENaxPsWe6CGRhUh3gsysUy33FqYkJPmrAE_rk94OJAhtJQd9FhMX_qBboPIIjyybK7T8tZeyG8OJrcn",
      "https://blogger.googleusercontent.com/img/a/AVvXsEgm2rP7ziezJgjJkwMidPVi6eCPXbnTV0ApJQFgX0B-H3H2dSYEebM8nt23Y99FCbfi5a6aUU9auyTum2fdPfvV_vdKZcqGDlS7ld672MLC_XzXiWAuO07jDtF5UI84foQfVoMrSo5TUskp7Jh5irhkc8Xc7Txqqz9gNBzSTeDRhy7R2lOau9Mht3AeXoXs",
      "https://blogger.googleusercontent.com/img/a/AVvXsEhSc57v-lais9H2HkY7LbEIAVffLLj-RaQ-APgWVjv06RGigXjIsqr2RQU-Ylnq-Mmxcacy6ceLRTPm2Jqfhhnk2m5Sp53KH8-lbbgAeM0QvOP1pKHwWOJD10WW5KVmxb9jh9XI9iJh70nVjNU8xgGw1bc8aqHUaYTE9txTh4qnnFnx_or_YItIWI97NEW3"
    ],
    category: "WiFi Auditing",
    rating: 4.8,
    reviewCount: 315,
    originalPrice: 999,
    salePrice: 599,
    isOutOfStock: false,
    description: "The ESP8266 NodeMCU is the legendary board that democratized WiFi hacking. Pre-installed with WiFi Deauther firmware, this board allows you to monitor packets, create fake access points (Beacon Spam), and test network resilience — all out of the box. No setup needed, just power on and hack.",
    longDescription: "The ESP8266 NodeMCU is arguably the single most important board in the WiFi hacking revolution. Before it arrived, experimenting with WiFi required expensive, specialized equipment. The ESP8266 changed everything by putting a full TCP/IP stack and 802.11 b/g/n WiFi into a $5 module. Its claim to fame in the security community is the WiFi Deauther project by Spacehuhn — a firmware that exploits a well-known vulnerability in the 802.11 protocol to send deauthentication frames, disconnecting clients from their networks. Beyond deauth attacks, you can use it for Beacon Spam (creating hundreds of fake SSIDs), Probe Request sniffing, and building Evil Twin access points for authorized phishing assessments. The NodeMCU variant adds a CP2102 USB-to-serial converter, making programming as easy as plugging in a USB cable and uploading code from the Arduino IDE. This TDCS edition comes pre-flashed with the latest Deauther firmware — just plug in a power bank and you're ready to audit.",
    features: [
      "Integrated 802.11 b/g/n WiFi 2.4GHz",
      "Pre-installed WiFi Deauther firmware",
      "Built-in CP2102 USB-to-TTL converter",
      "Deep sleep power saving mode",
      "Breadboard friendly form-factor",
      "Web-based control interface"
    ],
    packageContents: [
      "1x ESP8266 NodeMCU Board (Pre-Flashed)",
      "1x Micro-USB Cable (1m)",
      "1x Breadboard (400 tie-points)",
      "1x Jumper Wire Set (20 pieces)",
      "1x Setup & Flashing Guide"
    ],
    legal: "This product is sold exclusively for educational purposes, authorized security testing, and legitimate research. Sending deauthentication frames on networks you do not own or have authorization to test is illegal in most jurisdictions.",
    disclaimer: "WiFi Deauther functionality should only be used on your own networks or with explicit written permission. TDCS is not responsible for any unauthorized or illegal use.",
    delivery: "Standard delivery: 5-7 business days. Express delivery: 2-3 business days. Shipped with tracking and insurance.",
    support: "30-day replacement warranty. WhatsApp support Mon-Sat (10 AM - 7 PM IST). Email: hardware@tdcs.in. Includes TDCS firmware flashing tutorials.",
    specifications: [
      { label: "Chipset", value: "ESP8266-12E" },
      { label: "Clock Speed", value: "80 MHz / 160 MHz" },
      { label: "Flash Memory", value: "4 MB" },
      { label: "WiFi", value: "802.11 b/g/n 2.4GHz" },
      { label: "GPIO Pins", value: "17 (multiplexed)" },
      { label: "ADC", value: "1 × 10-bit" },
      { label: "Interface", value: "Micro-USB" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=6He9pXwVFNQ",
    reviews: [
      { id: "h1", author: "Amit V.", rating: 5, date: "2024-03-01", comment: "Best investment for my career. Learned WiFi security fundamentals hands-on. Deauther was pre-installed and worked out of the box!", title: "Career-Changing Board", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEi19affCJsFqGgVFUFzlYkdaP0AcsjA-n_bbE8FYNewIK_7kHEeY25UvGTsqZKpiMfzqPFPtd8dvPXdpSGW3WLK2NpTglfiMYImq_JvHK1xcT1u5ENaxPsWe6CGRhUh3gsysUy33FqYkJPmrAE_rk94OJAhtJQd9FhMX_qBboPIIjyybK7T8tZeyG8OJrcn"] },
      { id: "h2", author: "Sneha R.", rating: 5, date: "2024-04-15", comment: "Deauther firmware installed in under 10 minutes. TDCS guide was crystal clear. Amazing for the price at ₹599!", title: "Easy Setup, Great Results", verified: true },
      { id: "h3", author: "Karan D.", rating: 4, date: "2024-05-02", comment: "Works great for 2.4GHz. Wish it supported 5GHz too but at ₹599 can't complain. Get the BW16 if you need 5GHz.", title: "Excellent Value", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 9. Lilygo T-Embed CC1101 Plus (Pre-Program)
  // ═══════════════════════════════════════════════════
  {
    id: "lilygo-tembed-cc1101",
    name: "Lilygo T-Embed CC1101 Plus (Pre-Program)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEi5m8SotFBwLZpNH-oVd3XlN9Oknn4fiE3EUDDIhKDk2SyFt_nPglhlI74l4Wjz04b-Z3JhFtK2xXOtRGPsFbUENYKRctKzqrJnBk4sLgf4Inl5rArmtqqE_I5m2LN88GtVsCOYQ19ngWPiJ9AI-_4sB1UQUwb38XmxqS57qTFEp3g7Qz37DAjbmlCvGCVs",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjUNbmcWWO88vdp1q8BW0xM5IIl0FgieKD6voCiQ0CsxsKB-VwLNok7eVdtuhrzlIhN3vOVYshJx0L4lqLjWY23Di_w84MH3u85Bn_M2k_Jd4hbopMzSLazXtzJLUQ3QHzkI0kifRd1yVk_ZmEKxd5OEKSxqBOzF9ONugjOduoGiQl1q64V794E7pdDcvBU",
      "https://blogger.googleusercontent.com/img/a/AVvXsEgUjIUVnidp3QKuC94DcpeDeHyqSv9iFY6ds1YDoTXRcanpWWYkhOL-H9Igu5iplrh8Qwieq4dQDJ2pWrh9Hnqi5Mt12xOL2UI9PZyodAEDb-czgtai0wMjRclS-fXyqezF621XZOluSjNwhkOd_jlBepdVMQs5DNt877Dfye8tZdX26SuDym3kjMYUB15v"
    ],
    category: "Hardware / HID",
    rating: 4.9,
    reviewCount: 45,
    originalPrice: 9600,
    salePrice: 8498,
    isOutOfStock: true,
    description: "The Lilygo T-Embed CC1101 Plus is an industrial-grade programmable control panel that doubles as a powerful pentesting tool. Pre-programmed with TDCS firmware, it pairs an ESP32-S3 with a CC1101 Sub-GHz transceiver in a transparent cyberpunk enclosure with rotary encoder and LCD display.",
    longDescription: "The Lilygo T-Embed CC1101 Plus is an industrial-grade programmable control panel that doubles as a powerful pentesting tool. Encased in a transparent shell with a rotary encoder and a vibrant LCD, it looks like a futuristic gadget. Under the hood, it pairs an ESP32-S3 with a CC1101 Transceiver, allowing you to interface with both WiFi networks and Sub-GHz devices (gates, remotes). This TDCS edition comes pre-programmed with custom firmware that provides a menu-driven interface for Sub-GHz signal scanning, capture, and replay. The rotary encoder makes navigating menus intuitive, while the 1.9-inch IPS display provides crystal-clear visualization of captured signals. Dual microphones and a speaker enable audio-based features, and the Grove interface allows easy expansion with sensors and modules. Ideally suited for researchers building custom remotes or signal analyzers.",
    features: [
      "ESP32-S3 (Dual Core) + CC1101 Sub-GHz Module",
      "1.9-inch LCD (170×320) & Rotary Encoder",
      "Dual Microphones & Speaker",
      "Built-in Battery & Grove Interface",
      "Transparent 'Cyberpunk' Aesthetic",
      "Pre-programmed TDCS firmware"
    ],
    packageContents: [
      "1x Lilygo T-Embed CC1101 Plus (Pre-Programmed)",
      "1x USB-C Cable (1m)",
      "1x SMA Antenna (Sub-GHz)",
      "1x Protective Carry Pouch",
      "1x Quick Start Guide"
    ],
    legal: "For educational and authorized security testing only. Interfering with radio frequencies without authorization is illegal.",
    disclaimer: "TDCS is not responsible for misuse. Only use on devices and systems you own or have written authorization to test.",
    delivery: "Standard: 5-7 business days. Express: 2-3 business days. Insured courier with tracking.",
    support: "30-day warranty. WhatsApp & email support. Firmware update guides included.",
    specifications: [
      { label: "Main Chip", value: "ESP32-S3 (Dual Core 240MHz)" },
      { label: "Radio", value: "TI CC1101 (300-928MHz)" },
      { label: "Display", value: "ST7789V IPS (170×320)" },
      { label: "Audio", value: "Dual MEMS Mic + Speaker" },
      { label: "Battery", value: "Built-in LiPo" },
      { label: "Interface", value: "USB-C + Grove" },
      { label: "Enclosure", value: "Transparent Polycarbonate" }
    ],
    reviews: [
      { id: "i1", author: "Siddharth K.", rating: 5, date: "2024-05-10", comment: "The build quality is premium. Transparent case looks amazing and the rotary encoder navigation is super smooth. Sub-GHz scanning works perfectly.", title: "Premium Build, Premium Tool", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEi5m8SotFBwLZpNH-oVd3XlN9Oknn4fiE3EUDDIhKDk2SyFt_nPglhlI74l4Wjz04b-Z3JhFtK2xXOtRGPsFbUENYKRctKzqrJnBk4sLgf4Inl5rArmtqqE_I5m2LN88GtVsCOYQ19ngWPiJ9AI-_4sB1UQUwb38XmxqS57qTFEp3g7Qz37DAjbmlCvGCVs"] },
      { id: "i2", author: "Pallavi M.", rating: 5, date: "2024-06-22", comment: "Pre-programmed firmware is a huge time saver. Captured and replayed a gate signal in 30 seconds flat.", title: "Signal Capture Made Easy", verified: true },
      { id: "i3", author: "Harish V.", rating: 4, date: "2024-07-30", comment: "Beautiful device. Wish battery life was a bit better, but USB-C charging makes it manageable.", title: "Gorgeous but Battery Could Be Better", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 10. M5-PCB (CC1101/NRF/SD)
  // ═══════════════════════════════════════════════════
  {
    id: "tdcs-m5-pcb",
    name: "M5-PCB (CC1101/NRF/SD)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEgiEvVwPPSxB_jUcqIhWwrnbMvRQz8fUEMWV50pYU5Xi_txwbSoMIlNCF0VS8ksMY5zwMX5sy2Z0XUYj1ZzlpUjxdK0hYw4DPkS8Y_xgBRxmcuiJwVblJCu6jFEqwsIrbvALlN7biC8Napi2IevX2EZbvMiyUwBoSWIMML9sjgbyHVHa5LQ1boJo8M7FjiF"
    ],
    category: "Hardware / Expansion",
    rating: 5.0,
    reviewCount: 22,
    originalPrice: 990,
    salePrice: 640,
    isOutOfStock: false,
    description: "The M5-PCB is a custom expansion board designed for M5Stack devices that adds CC1101 Sub-GHz transceiver, NRF24L01 2.4GHz module, and MicroSD card slot capabilities. Transform your M5StickC or M5Stack into a multi-protocol RF analysis platform.",
    longDescription: "The M5-PCB is TDCS's custom-designed expansion board that transforms any M5Stack-compatible device into a multi-protocol RF powerhouse. This single PCB integrates three critical modules: a Texas Instruments CC1101 for Sub-GHz signal analysis (300-928MHz range covering car remotes, garage doors, and IoT sensors), a Nordic NRF24L01 for 2.4GHz protocol research (MouseJack attacks, wireless peripheral sniffing), and a MicroSD card slot for on-device data logging. The board is designed to plug directly into M5StickC Plus2 or M5Stack Core modules via the Grove/GPIO connector, maintaining the compact form factor that makes M5 devices so portable. With this expansion, your pocket-sized M5 device gains capabilities that rival much larger and more expensive equipment. The CC1101 module supports multiple modulation schemes (2-FSK, 4-FSK, GFSK, MSK, OOK), making it compatible with virtually all Sub-GHz protocols. Combined with the NRF24's 2.4GHz coverage, you have a true dual-band RF analysis tool that fits in your pocket.",
    features: [
      "CC1101 Sub-GHz transceiver (300-928MHz)",
      "NRF24L01 2.4GHz module",
      "MicroSD card slot for data logging",
      "Plug & play with M5StickC/M5Stack",
      "Compact PCB form factor",
      "Multi-protocol RF analysis"
    ],
    packageContents: [
      "1x M5-PCB Expansion Board (Assembled)",
      "1x CC1101 Module (Pre-Soldered)",
      "1x NRF24L01 Module (Pre-Soldered)",
      "1x SMA Antenna Adapter",
      "1x Grove Connection Cable",
      "1x Assembly Guide"
    ],
    legal: "For educational and authorized testing purposes only.",
    disclaimer: "TDCS is not responsible for misuse of RF capabilities. Use only on frequencies and devices you are authorized to test.",
    delivery: "Standard: 5-7 business days. Express: 2-3 business days. Tracked shipping.",
    support: "30-day warranty. WhatsApp & email support.",
    specifications: [
      { label: "CC1101 Range", value: "300-928 MHz" },
      { label: "NRF24 Range", value: "2.4 GHz ISM Band" },
      { label: "SD Card", value: "MicroSD (up to 32GB)" },
      { label: "Compatibility", value: "M5StickC, M5Stack Core" },
      { label: "Connector", value: "Grove / GPIO" },
      { label: "Power", value: "3.3V (from host device)" },
      { label: "Dimensions", value: "35 × 25mm" }
    ],
    reviews: [
      { id: "j1", author: "Vishnu P.", rating: 5, date: "2024-06-15", comment: "Turned my M5StickC into a full RF analysis tool. CC1101 captures garage signals perfectly. NRF24 handles MouseJack. All in my pocket!", title: "Pocket RF Lab!", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEgiEvVwPPSxB_jUcqIhWwrnbMvRQz8fUEMWV50pYU5Xi_txwbSoMIlNCF0VS8ksMY5zwMX5sy2Z0XUYj1ZzlpUjxdK0hYw4DPkS8Y_xgBRxmcuiJwVblJCu6jFEqwsIrbvALlN7biC8Napi2IevX2EZbvMiyUwBoSWIMML9sjgbyHVHa5LQ1boJo8M7FjiF"] },
      { id: "j2", author: "Lakshmi R.", rating: 5, date: "2024-07-08", comment: "Clean PCB design, everything pre-soldered. Plugged into my M5Stack and it just worked. SD logging is a great addition.", title: "Plug & Play Perfection", verified: true },
      { id: "j3", author: "Akash D.", rating: 5, date: "2024-08-12", comment: "At ₹640 this is an absolute steal. Three modules on one tiny board. TDCS engineering at its finest.", title: "Incredible Value", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 11. M5StickC Plus2 (Pre-Installed Firmware)
  // ═══════════════════════════════════════════════════
  {
    id: "tdcs-m5stickc-plus2",
    name: "M5StickC Plus2 (Pre-Installed Firmware)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEgiEvVwPPSxB_jUcqIhWwrnbMvRQz8fUEMWV50pYU5Xi_txwbSoMIlNCF0VS8ksMY5zwMX5sy2Z0XUYj1ZzlpUjxdK0hYw4DPkS8Y_xgBRxmcuiJwVblJCu6jFEqwsIrbvALlN7biC8Napi2IevX2EZbvMiyUwBoSWIMML9sjgbyHVHa5LQ1boJo8M7FjiF",
      "https://blogger.googleusercontent.com/img/a/AVvXsEiqZWyADzedT_L_MJP27icDZeVPnOfecyLXAI9Ly_zNMR8yfr33qJbchkQFq1Lv-e0j32716bpUCzQ_7bcCtTYGQHFwkJMnYSys-B4YlHeOsiG0HObgGsEIBctXWC4ZNr2-TEgYyiKVDDKUQynTt66BLjrB64-WQKELK9RKw1bvUJuU8RvD_UJis88H_cNL",
      "https://blogger.googleusercontent.com/img/a/AVvXsEgAxnBiwyUY-7pvDFgM6kxexP4OpDLUWsPfvZQF77kQIFdHDoDjHNj-iJHnc3EGaoMOyOYMndDoeL25FElpRvPV1e4bDXkS7Z84sBDUU6c9BYJsolBrMGKeqmsoKSljCoI7zzgYVTB0W844E8Hr3CJbqhZiDFaxMpr8stqYzIk4sD8x9cJJ5GDObnmDEKmV",
      "https://blogger.googleusercontent.com/img/a/AVvXsEhFrydXYFhR_LN9aPLPAjQZ4O24IwE5Mdgc-z7cTK55l49hbmKipNRP1dZbaeIHqS2tGLH1f9FbZ1rAzuiFpfleGeDZMCwvsQh8kwUNx0wN1SsATt75fV3cz_R-dAC81lksAhFo4hGtF_TCFe0sTW7I8d8CQqVV2i9ol85XD-XCnZUjCkY3lX7fbkR1k2mY"
    ],
    category: "Development / IoT",
    rating: 5.0,
    reviewCount: 38,
    originalPrice: 4000,
    salePrice: 3480,
    isOutOfStock: false,
    description: "The M5StickC PLUS2 is a pocket-sized IoT powerhouse running ESP32-PICO-V3-02. Pre-installed with TDCS Nemo firmware, it transforms into a portable WiFi/BLE auditing tool with LCD screen, built-in battery, IR transmitter, and 6-axis IMU — all in a bright orange stick form factor.",
    longDescription: "The M5StickC PLUS2 is a mini IoT development board powered by the ESP32-PICO-V3-02. It's essentially a smartwatch-sized computer with a screen, battery, and sensors. In the security community, it's famous for running the 'Nemo' firmware, turning it into a portable WiFi auditing tool capable of scanning networks, performing deauth attacks, BLE enumeration, and IR remote cloning on the go. It packs a 1.14-inch TFT LCD screen (135×240), 6-axis IMU (accelerometer + gyroscope), microphone, buzzer, and IR transmitter into a bright orange stick that weighs less than 15 grams. The built-in 200mAh LiPo battery provides portable operation, and the Grove port enables expansion with sensors and the M5-PCB module. This TDCS edition comes pre-loaded with the Nemo firmware, providing an intuitive menu system for all security tools directly on the tiny screen. Navigate with the built-in buttons, select your attack, and go — no laptop required.",
    features: [
      "ESP32-PICO-V3-02 (240MHz Dual Core, WiFi/BLE)",
      "1.14 inch TFT Color Screen (135×240)",
      "Built-in 200mAh Battery & IR Transmitter",
      "6-Axis IMU (MPU6886)",
      "Grove Port for M5-PCB expansion",
      "Pre-installed Nemo security firmware",
      "Portable — weighs under 15g"
    ],
    packageContents: [
      "1x M5StickC Plus2 (Nemo Pre-Installed)",
      "1x USB-C Charging Cable",
      "1x Grove Cable",
      "1x Quick Start Guide",
      "1x TDCS Sticker Pack"
    ],
    legal: "For educational and authorized security testing only. WiFi attacks on unauthorized networks are illegal.",
    disclaimer: "TDCS is not responsible for misuse. Use only on your own networks and devices or with written authorization.",
    delivery: "Standard: 5-7 business days. Express: 2-3 business days. Tracked & insured.",
    support: "30-day warranty. WhatsApp & email support. Nemo firmware update guides included.",
    specifications: [
      { label: "SoC", value: "ESP32-PICO-V3-02 (240MHz)" },
      { label: "Display", value: "ST7789v2 (135×240)" },
      { label: "Battery", value: "200mAh LiPo" },
      { label: "WiFi", value: "802.11 b/g/n 2.4GHz" },
      { label: "Bluetooth", value: "BLE 4.2" },
      { label: "IR", value: "Infrared Transmitter" },
      { label: "Weight", value: "15g" }
    ],
    reviews: [
      { id: "k1", author: "Tanmay S.", rating: 5, date: "2024-04-20", comment: "The Nemo firmware is incredible on this. WiFi scan, deauth, BLE scan, IR clone — all from a device that fits in my watch pocket. Mind-blowing!", title: "Pocket-Sized Pentest Beast", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEgiEvVwPPSxB_jUcqIhWwrnbMvRQz8fUEMWV50pYU5Xi_txwbSoMIlNCF0VS8ksMY5zwMX5sy2Z0XUYj1ZzlpUjxdK0hYw4DPkS8Y_xgBRxmcuiJwVblJCu6jFEqwsIrbvALlN7biC8Napi2IevX2EZbvMiyUwBoSWIMML9sjgbyHVHa5LQ1boJo8M7FjiF"] },
      { id: "k2", author: "Ritu A.", rating: 5, date: "2024-05-30", comment: "Pre-loaded firmware + tiny form factor = perfect field tool. Cloned my TV remote with the IR transmitter in seconds.", title: "IR Cloning Works Perfectly", verified: true },
      { id: "k3", author: "Gaurav P.", rating: 5, date: "2024-07-18", comment: "Paired with M5-PCB and now I have Sub-GHz + 2.4GHz RF + WiFi + BLE + IR in my pocket. This is the future.", title: "Add M5-PCB = God Mode", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 12. New CC1101+SMA (300Mz-938Mz) RF Module
  // ═══════════════════════════════════════════════════
  {
    id: "CC1101+SMA (300Mz-938Mz) RF Module",
    name: "New CC1101+SMA (300MHz-938MHz) RF Module",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjUM60rdjnZLBIvc0mr-ZeUxBrF0MDxBFfRbqFRnO4C4FIariuai7Cx_wl5wzfG7v-qE1H-6BoxBm_AhvgMgkPKxQhY4FvgHf-XCYDIeEDyu5LkyGa0VSU0ZqaXnO0i2y-6lyXUwbXwCWjtVoUqCEupXukmeQkrqeoOxb12wiFdzwwWQ3h1SCJqIeoMSvDG",
      "https://blogger.googleusercontent.com/img/a/AVvXsEi8aWW8Mhr_t69BDjT0bRm_VPmEEBJviVdK_J4q-MvhUndZ6VTJ6Y4i4WnFL8NdWI4guhsur7j3sBm8VzUcslFHiIqV9FJ5W2w7grdk5TdjmuLiXlyUF5nTU9Ghnt2bkO6FEc4Akio7UPgBHUkklwtOINVs0OQJMcsb0j4SALe6aT_1FBSRWO0G9JzhJF0p",
      "https://blogger.googleusercontent.com/img/a/AVvXsEi3QytH2pOb56WXh8oY4_tllgVyjGy_XXrJb9qEw2LyJREo26hgRHk0hhAp6MtZIvN4xszGHtTW992rx17ZiVF7KgQnBM4xezFM7WvDYDF48XYEF3ZHbBjLn5RdpImY-alFiO2L-CEHUvfAVO-p1GxyxefmdUUfbp5ATwgAfLxHhbYORv-Ekvylq_wJ0JYM"
    ],
    category: "RF / Wireless",
    rating: 4.7,
    reviewCount: 89,
    originalPrice: 1499,
    salePrice: 749,
    isOutOfStock: false,
    description: "The CC1101 is the gold standard for Sub-GHz wireless communication. This module operates on 300-928 MHz frequencies used by car key fobs, garage doors, and industrial sensors. Includes SMA connector for high-gain antenna, perfect for signal analysis and replay attack research.",
    longDescription: "The CC1101 is the gold standard for Sub-GHz wireless communication. Unlike standard WiFi modules, this transceiver operates on lower frequencies (300-928 MHz), which are commonly used by car key fobs, garage door openers, automated gates, weather stations, and industrial IoT sensors. This module includes an SMA connector for an external high-gain antenna, significantly extending your range for signal analysis and replay attacks (e.g., RollJam simulations). The Texas Instruments CC1101 chip supports multiple modulation schemes — 2-FSK, 4-FSK, GFSK, MSK, and OOK — making it compatible with virtually every Sub-GHz protocol in use today. With a sensitivity of -116 dBm at 0.6 kBaud, it can pick up extremely weak signals that other receivers would miss. The chip also features hardware support for packet handling, CRC checking, data buffering, and Wake-on-Radio functionality. Compatible with Arduino, ESP32, Raspberry Pi, and Flipper Zero (via GPIO), this module is the foundation of any serious RF security research lab.",
    features: [
      "Wide Frequency Range: 300-928 MHz",
      "High Sensitivity: -116 dBm at 0.6 kBaud",
      "Hardware Packet Handling & Wake-On-Radio",
      "Compatible with Flipper Zero (GPIO) & Arduino",
      "SMA connector for external antenna",
      "Multiple modulation: 2-FSK, 4-FSK, GFSK, MSK, OOK",
      "Perfect for signal replay and jamming research"
    ],
    packageContents: [
      "1x CC1101 Module with SMA Connector",
      "1x SMA Antenna (433MHz optimized)",
      "1x Dupont Wire Set (8 pieces)",
      "1x Pin Reference Card",
      "1x TDCS Sticker"
    ],
    legal: "For educational and authorized testing only. Unauthorized interference with radio signals is illegal under telecommunications laws.",
    disclaimer: "TDCS is not responsible for misuse. Only use on frequencies and devices you are authorized to test.",
    delivery: "Standard: 5-7 business days. Express: 2-3 business days. Tracked shipping.",
    support: "30-day warranty. WhatsApp & email support. Arduino library integration guide included.",
    specifications: [
      { label: "Chip", value: "Texas Instruments CC1101" },
      { label: "Frequency", value: "300-928 MHz" },
      { label: "Modulation", value: "2-FSK, 4-FSK, GFSK, MSK, OOK" },
      { label: "Sensitivity", value: "-116 dBm @ 0.6 kBaud" },
      { label: "Max Data Rate", value: "600 kBaud" },
      { label: "Voltage", value: "1.8V - 3.6V" },
      { label: "Antenna", value: "SMA (external)" }
    ],
    reviews: [
      { id: "l1", author: "Naveen R.", rating: 5, date: "2024-03-25", comment: "Connected to my Flipper Zero via GPIO. Sub-GHz scanning range improved dramatically with the external antenna.", title: "Flipper Zero Upgrade!", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEjUM60rdjnZLBIvc0mr-ZeUxBrF0MDxBFfRbqFRnO4C4FIariuai7Cx_wl5wzfG7v-qE1H-6BoxBm_AhvgMgkPKxQhY4FvgHf-XCYDIeEDyu5LkyGa0VSU0ZqaXnO0i2y-6lyXUwbXwCWjtVoUqCEupXukmeQkrqeoOxb12wiFdzwwWQ3h1SCJqIeoMSvDG"] },
      { id: "l2", author: "Prachi T.", rating: 5, date: "2024-05-14", comment: "At ₹749 this is insane value. Captures OOK signals from weather stations and replays them perfectly.", title: "Best Value RF Module", verified: true },
      { id: "l3", author: "Deepesh M.", rating: 4, date: "2024-06-28", comment: "Good module, works well with Arduino. SPI wiring guide from TDCS was helpful. Wish it came with a better antenna.", title: "Solid Module, Decent Antenna", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 13. Rasp-AtomDuck (Wi-Fi Ducky)
  // ═══════════════════════════════════════════════════
  {
    id: "tdcs-rasp-atomduck",
    name: "Rasp-AtomDuck (Wi-Fi Ducky)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjbayeundx_TQVe4KxDo141n0wlmgwN009qVBXw8J2HnduSQQyuFc5tKMVwqtHALQl8Q7Dx3-llm2hgOEBzd-F1laXUoUReyZEsAy0N610PLxGjoxuMWc6HX6UKffANdNWo65-vSJP3W0Mq1XECsabs5EU-Oq6uIL7JdNURS-E12QKZutxFTUSoqHzjnbVF",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjx9_GSMO5DyQC2NSe6KUAjf7kFX0PJwoFUeao1B7YDeSQL3nD3YTAItfuDAALZb2qsPyxIhmOSxzugMoINNmFFrTwZGqNFU1tI7BFEDjbdTsOuhVmFbUF8XL_T81ffiTv6b-xRPaxFFWWCYjNyshcgWM8CZqPse32Um0_ao7RTouOP1DmqhilCeAqA-n6T"
    ],
    category: "Hardware / HID",
    rating: 4.7,
    reviewCount: 35,
    originalPrice: 1999,
    salePrice: 1250,
    isOutOfStock: false,
    description: "The Rasp-AtomDuck is a WiFi-enabled USB Rubber Ducky that combines HID keystroke injection with wireless control. Upload and trigger payloads remotely over WiFi — no physical access needed after initial deployment. The perfect remote-access BadUSB for red team operations.",
    longDescription: "The Rasp-AtomDuck takes the classic USB Rubber Ducky concept and adds a game-changing feature: WiFi connectivity. Traditional BadUSB devices execute their payload the moment they're plugged in, which means you need physical access every time you want to change or trigger a script. The AtomDuck eliminates this limitation by combining a Raspberry Pi Pico-class microcontroller with an ESP-based WiFi module. Once plugged into a target machine, the device creates its own WiFi access point. Connect to it from your phone or laptop, and you gain a web-based interface where you can upload, edit, and trigger Ducky Script payloads in real-time. This means you can deploy the device during a physical access window, then remotely trigger different payloads later — making it infinitely more versatile for red team exercises. The device supports full Ducky Script syntax including delays, string injection, key combinations, and loops. It can also be configured to auto-execute a payload on plug-in while keeping the WiFi control active for subsequent commands.",
    features: [
      "WiFi-enabled payload management",
      "Remote script upload and trigger",
      "Web-based control interface",
      "Full Ducky Script support",
      "Auto-execute + remote trigger modes",
      "Compact USB form factor"
    ],
    packageContents: [
      "1x Rasp-AtomDuck (Pre-Programmed)",
      "1x USB-C to USB-A Adapter",
      "1x Sample Payload Collection",
      "1x WiFi Setup Guide",
      "1x TDCS Sticker"
    ],
    legal: "For educational and authorized penetration testing only. Deploying HID devices on unauthorized systems is illegal.",
    disclaimer: "TDCS is not responsible for misuse. Only deploy on systems you own or have explicit written authorization to test.",
    delivery: "Standard: 5-7 business days. Express: 2-3 business days. Tracked shipping.",
    support: "30-day warranty. WhatsApp & email support. Payload development guides included.",
    specifications: [
      { label: "HID Chip", value: "RP2040 / ATmega32U4" },
      { label: "WiFi", value: "ESP8266 (2.4GHz)" },
      { label: "Control", value: "Web UI over WiFi AP" },
      { label: "Script", value: "Ducky Script compatible" },
      { label: "USB", value: "USB-A (with USB-C adapter)" },
      { label: "Storage", value: "4MB Flash" },
      { label: "Power", value: "USB powered (5V)" }
    ],
    reviews: [
      { id: "m1", author: "Sahil G.", rating: 5, date: "2024-05-05", comment: "WiFi control is a game changer! Plugged it in during a physical pentest, then triggered payloads from my phone in the parking lot. Incredible.", title: "Remote BadUSB = Mind Blown", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEjbayeundx_TQVe4KxDo141n0wlmgwN009qVBXw8J2HnduSQQyuFc5tKMVwqtHALQl8Q7Dx3-llm2hgOEBzd-F1laXUoUReyZEsAy0N610PLxGjoxuMWc6HX6UKffANdNWo65-vSJP3W0Mq1XECsabs5EU-Oq6uIL7JdNURS-E12QKZutxFTUSoqHzjnbVF"] },
      { id: "m2", author: "Divya K.", rating: 5, date: "2024-06-18", comment: "The web interface for uploading scripts is clean and intuitive. No more reprogramming the board every time!", title: "Web UI is Clean", verified: true },
      { id: "m3", author: "Yash P.", rating: 4, date: "2024-07-25", comment: "Works great but WiFi range is limited to about 20 meters. Still perfect for most scenarios though.", title: "Great but Limited WiFi Range", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 14. Rasp-PicoDuck-C (Pre-Installed Firmware)
  // ═══════════════════════════════════════════════════
  {
    id: "Raspberry pi pico",
    name: "Rasp-PicoDuck-C (Pre-Installed Firmware)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEjbayeundx_TQVe4KxDo141n0wlmgwN009qVBXw8J2HnduSQQyuFc5tKMVwqtHALQl8Q7Dx3-llm2hgOEBzd-F1laXUoUReyZEsAy0N610PLxGjoxuMWc6HX6UKffANdNWo65-vSJP3W0Mq1XECsabs5EU-Oq6uIL7JdNURS-E12QKZutxFTUSoqHzjnbVF",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjx9_GSMO5DyQC2NSe6KUAjf7kFX0PJwoFUeao1B7YDeSQL3nD3YTAItfuDAALZb2qsPyxIhmOSxzugMoINNmFFrTwZGqNFU1tI7BFEDjbdTsOuhVmFbUF8XL_T81ffiTv6b-xRPaxFFWWCYjNyshcgWM8CZqPse32Um0_ao7RTouOP1DmqhilCeAqA-n6T",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjFStVASvoGyiNo04tlPnpm-hH8wBkGh4QKF2nPHLYvn-IawRnnXfCRsKbiNhoI867nml6FDOlyjKYHL_D8ppfYlKBc9VdX4qdA-HlD2RyEqN1_zsB6bC91Q3RsvDhz19ZSaOJXrJ6DxmhlrlwZAgT9uQ8OWlneyGeiUgpwleSVxHfocqvEwNlWU0ZSFoVk",
      "https://blogger.googleusercontent.com/img/a/AVvXsEioEP4gDS1L_sX-9iASJ0TZcdsAv7fGszsHO-pJNVnEqAdAra2_QVetbdpKNpOUFfU_SqgwCuJ2iyKtjqfQI8LcP_QqVLOhHXG-diOyUa07biUicsds79gqPgy0g1tkq6L-d2IfteuFTcqHCXN5PfCqP0_371xIu4anrSDlq6_Vjt83nYd9ZS8eqsRZ7YGW",
      "https://blogger.googleusercontent.com/img/a/AVvXsEjFFdojP8ESk0OWyp_LbI0Zqaa2FZzlJMGVIjshjaL-XwzgGxW8-J16q4_6HiLJHGRuWPBDjzxGSAhG_fsKhRJWPx6zw9rC8IjMXPoantaZN66cVQCkcB_FUDANqw_drNf9r-7lPZcXvHw9uFF3K5yjdC2MoxCVHZHVBWPtXuNDANqO7oZa8t4l7rmoP1Yi"
    ],
    category: "Hardware / HID",
    rating: 4.9,
    reviewCount: 42,
    originalPrice: 1499,
    salePrice: 890,
    isOutOfStock: false,
    description: "The Rasp-PicoDuck-C is a Raspberry Pi Pico-based USB Rubber Ducky with USB-C connectivity. Pre-installed with Pico Ducky firmware, it emulates a keyboard instantly via drag-and-drop scripting. The cheapest and most reliable HID attack platform available — perfect for beginners and pros alike.",
    longDescription: "The Raspberry Pi Pico represents a paradigm shift in the Raspberry Pi lineup. Unlike its predecessors that run full Linux distributions, the Pico is a bare-metal microcontroller board built around the custom-designed RP2040 chip. This dual-core ARM Cortex-M0+ processor clocked at 133MHz delivers exceptional performance for embedded applications while maintaining incredibly low power consumption. The board's 8 Programmable I/O (PIO) state machines are a standout feature, enabling you to implement custom communication protocols without burdening the main CPU cores. In the cybersecurity domain, the Pico has become the go-to platform for BadUSB projects — using CircuitPython or the popular Pico Ducky script, you can program it to emulate a USB keyboard and execute pre-programmed keystroke sequences in milliseconds. This TDCS PicoDuck-C edition comes with USB-C connectivity and pre-loaded Pico Ducky firmware. The drag-and-drop UF2 firmware loading via USB makes it incredibly beginner-friendly — simply hold the BOOTSEL button, plug it in, and drag your firmware file onto the drive that appears. To deploy a payload, just edit the payload.dd file on the drive and it auto-executes on next plug-in.",
    features: [
      "Dual-core ARM® Cortex®-M0+ @ 133MHz",
      "264kB on-chip SRAM & 2MB onboard Flash",
      "Drag-and-drop programming via USB-C",
      "8 × Programmable I/O (PIO) state machines",
      "Pre-installed Pico Ducky firmware",
      "Ideal for HID Attacks and keystroke injection"
    ],
    packageContents: [
      "1x Raspberry Pi Pico (PicoDuck-C Edition)",
      "1x USB-C Cable (1m)",
      "1x Pin Header Set (pre-soldered)",
      "1x Payload Script Collection",
      "1x Quick Start Guide",
      "1x TDCS Sticker Pack"
    ],
    legal: "This product is sold exclusively for educational purposes, authorized security testing, and legitimate research. Unauthorized use is strictly prohibited.",
    disclaimer: "TDCS is not responsible for misuse. By purchasing, you agree to use this device only on systems you own or have explicit written authorization to test.",
    delivery: "Standard: 5-7 business days. Express: 2-3 business days. All orders shipped via insured courier with tracking.",
    support: "30-day replacement warranty. WhatsApp support Mon-Sat (10 AM - 7 PM IST). Email: hardware@tdcs.in. Free firmware update guides.",
    specifications: [
      { label: "Microcontroller", value: "RP2040 (Dual Cortex-M0+)" },
      { label: "Clock", value: "133 MHz" },
      { label: "RAM", value: "264KB SRAM" },
      { label: "Storage", value: "2MB Q-SPI Flash" },
      { label: "USB", value: "USB-C (native)" },
      { label: "Voltage", value: "1.8V - 5.5V" },
      { label: "PIO", value: "8 state machines" }
    ],
    videoUrl: "https://www.youtube.com/watch?v=Zy64kZEM_bg",
    reviews: [
      { id: "n1", author: "Rohan K.", rating: 5, date: "2024-02-14", comment: "Incredible value at ₹890. Drag-and-drop works perfectly. USB-C is a welcome upgrade over micro-USB.", title: "Best Budget HID Device", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEjbayeundx_TQVe4KxDo141n0wlmgwN009qVBXw8J2HnduSQQyuFc5tKMVwqtHALQl8Q7Dx3-llm2hgOEBzd-F1laXUoUReyZEsAy0N610PLxGjoxuMWc6HX6UKffANdNWo65-vSJP3W0Mq1XECsabs5EU-Oq6uIL7JdNURS-E12QKZutxFTUSoqHzjnbVF"] },
      { id: "n2", author: "Priya S.", rating: 5, date: "2024-03-20", comment: "Used this for my OSCP prep lab. Pico Ducky scripts worked flawlessly out of the box. Pre-soldered headers saved time.", title: "Perfect for Pentesting Labs", verified: true },
      { id: "n3", author: "Arjun M.", rating: 4, date: "2024-04-05", comment: "Good board for the price. Only wish it had WiFi built-in, but for pure HID attacks this is unbeatable at ₹890.", title: "Great for HID, misses WiFi", verified: true }
    ]
  },

  // ═══════════════════════════════════════════════════
  // 15. Raspberry Pi-Kit (Pre-Installed Kali Linux)
  // ═══════════════════════════════════════════════════
  {
    id: "tdcs-pi5-kit",
    name: "Raspberry Pi-Kit (Pre-Installed Kali Linux)",
    images: [
      "https://blogger.googleusercontent.com/img/a/AVvXsEiaAWFzWBGmfCFmO2YOCOK_ZikHCL-_M-ezK1lni9YzqxUle1BHjTHPk6mxil0qxeXm_NxUazlT7E6JLbgeTrnTBEHjHwq72LnxOmRaNq7k4aAc24tohWJMYf6z--97tR95WwRVBI8kojR89J6l1F25ZbK_dMCLRFaI3ln2i3eA4tWZhfuM9jJggv4u09T3",
      "https://blogger.googleusercontent.com/img/a/AVvXsEinQypTkhUNays3yhK_X95PxGL87Oo66nRma-P-p6VkR_-fplkXrqAwduxNStjdoNVnNolu7htR0CEW1oBibeih8irzGD4_mqsx060KyFGv1KNRRzhFak4JKeR9jTnR1lsvi1y2Uk-4nPbjStC-kg9_cZCag1NI4uJXiRyFm14LJlr2uFLFkPlc8_rLnWaS"
    ],
    category: "Single Board Computers",
    rating: 4.9,
    reviewCount: 65,
    originalPrice: 8000,
    salePrice: 6800,
    isOutOfStock: false,
    description: "The ultimate ARM-based hacking station. This Raspberry Pi kit comes pre-flashed with Kali Linux, optimized for the Pi's architecture. Whether you're cracking hashes, running vulnerability scans, or building a portable pentest lab — this kit has everything you need right out of the box.",
    longDescription: "The Raspberry Pi has become the hacker's best friend, and this TDCS kit takes it to the next level by providing a complete, ready-to-hack solution. The kit comes with a Raspberry Pi pre-flashed with a custom build of Kali Linux, optimized for the ARM architecture. Kali Linux is the world's most popular penetration testing distribution, packed with hundreds of security tools including Nmap, Metasploit, Burp Suite, Aircrack-ng, John the Ripper, and many more. The powerful quad-core processor with generous RAM handles resource-intensive tasks like hash cracking with Hashcat, vulnerability scanning with OpenVAS, and wireless attacks with ease. Dual HDMI output means you can run a full desktop environment with multiple monitors, while the Gigabit Ethernet and WiFi provide network connectivity for both testing and research. The kit includes an active cooler to prevent thermal throttling during long hash-cracking sessions, and the official power supply ensures stable operation. Whether you're a student building your first pentest lab or a professional who needs a portable assessment platform, this kit delivers professional-grade capabilities at an unbeatable price.",
    features: [
      "Quad-core ARM Cortex processor",
      "Pre-installed Kali Linux (ARM64)",
      "Dual HDMI output for desktop environment",
      "Gigabit Ethernet + WiFi",
      "Active cooler for sustained workloads",
      "Complete kit — just add monitor and keyboard"
    ],
    packageContents: [
      "1x Raspberry Pi Board",
      "1x MicroSD Card (Pre-Flashed with Kali Linux)",
      "1x Official Power Supply (USB-C)",
      "1x Active Cooler / Heatsink Kit",
      "1x Protective Case",
      "1x HDMI Cable",
      "1x Quick Start Guide"
    ],
    legal: "Kali Linux contains penetration testing tools. Using these tools on systems without explicit authorization is illegal.",
    disclaimer: "TDCS is not responsible for misuse of tools included in Kali Linux. Only use for authorized security testing, education, and research.",
    delivery: "Standard: 5-7 business days. Express: 2-3 business days. Insured courier with tracking.",
    support: "30-day warranty on hardware. WhatsApp & email support. Kali Linux setup & tool guides included.",
    specifications: [
      { label: "CPU", value: "Quad-core ARM Cortex" },
      { label: "RAM", value: "4GB / 8GB LPDDR4X" },
      { label: "OS", value: "Kali Linux ARM64" },
      { label: "Network", value: "Gigabit LAN + WiFi" },
      { label: "Video", value: "Dual Micro-HDMI (4K)" },
      { label: "Storage", value: "MicroSD (pre-loaded)" },
      { label: "Power", value: "USB-C (5V/3A)" }
    ],
    reviews: [
      { id: "o1", author: "Suresh M.", rating: 5, date: "2024-04-12", comment: "Complete hacking lab in a tiny box. Kali was pre-installed with all tools updated. Ran Nmap scans within 5 minutes of unboxing!", title: "Portable Pentest Lab", verified: true, images: ["https://blogger.googleusercontent.com/img/a/AVvXsEiaAWFzWBGmfCFmO2YOCOK_ZikHCL-_M-ezK1lni9YzqxUle1BHjTHPk6mxil0qxeXm_NxUazlT7E6JLbgeTrnTBEHjHwq72LnxOmRaNq7k4aAc24tohWJMYf6z--97tR95WwRVBI8kojR89J6l1F25ZbK_dMCLRFaI3ln2i3eA4tWZhfuM9jJggv4u09T3"] },
      { id: "o2", author: "Ananya J.", rating: 5, date: "2024-05-28", comment: "The active cooler keeps it running cool even during Hashcat sessions. Professional quality kit at a student-friendly price.", title: "Stays Cool Under Pressure", verified: true },
      { id: "o3", author: "Vikrant T.", rating: 5, date: "2024-07-10", comment: "Best purchase for my cybersecurity course. Everything was in the box — just connected to a monitor and started learning.", title: "Everything in the Box", verified: true }
    ]
  }
];
