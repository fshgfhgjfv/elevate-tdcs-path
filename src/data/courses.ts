// Course data for TDCS platform
// TODO: Replace with Supabase/Firebase database integration

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: "Live Online" | "Offline" | "Self-Paced";
  duration: string;
  modules: string[];
  overview: string;
  includes: string[];
  demoVideo?: string;
  resources?: { name: string; url: string }[];
}

export const courses: Course[] = [
  {
    id: "cyber-lite",
    title: "Cyber Master's Pro Lite",
    description: "Foundational ethical hacking & network security program for beginners.",
    price: 499,
    thumbnail: "https://blogger.googleusercontent.com/img/a/AVvXsEjrF7wwBNUBcrKQRtoMtSanIL8-qr4mXsnNFpEerE_ytS3GvCVrkyyZA_JZX-F4jM3hoaWXctDQRswRjE0QSMzR9KrABNbudCm66YZPiCRmU6SRQbImBij-7Yhm6jhmAVMK7WM8bpdLrU2YA9jaH_EHxVXTLofmVHgupKW01Y891h2NBK2Pvrpv7e4ZTSkR",
    category: "Live Online",
    duration: "2 months",
    modules: [
      "Network Security Fundamentals",
      "Password Cracking Techniques",
      "Web Application Vulnerabilities",
      "Social Engineering",
      "Reconnaissance & Information Gathering",
      "Linux for Security Professionals",
    ],
    overview:
      "This foundational course in ethical hacking covers the essential concepts of penetration testing basics, network security, reconnaissance, and basic Linux commands. Perfect for beginners looking to start their cybersecurity career.",
    includes: [
      "Video lessons with lifetime access",
      "Hands-on practice labs",
      "Downloadable study materials and PDFs",
      "Completion certificate",
      "Community forum access",
    ],
    demoVideo: "https://drive.google.com/file/d/1aSj5YmuMg7RZ_Cc37h2x-p0pE3ZD1TNY/view?usp=drive_link",
    resources: [
      { name: "Sample Lab Guide", url: "#" },
      { name: "Course Slidebook", url: "#" },
      { name: "Security Cheat Sheet", url: "#" },
    ],
  },
  {
    id: "cyber-blackhat",
    title: "Cyber Master's Pro Black Hat",
    description:
      "Advanced program covering exploit dev, malware analysis, red teaming & advanced pentesting.",
    price: 19999,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    category: "Live Online",
    duration: "4 months",
    modules: [
      "Exploit Development",
      "Reverse Engineering",
      "Malware Analysis",
      "Red Teaming Operations",
      "Advanced Network Pentesting",
      "Digital Forensics",
    ],
    overview:
      "Advanced ethical hacking program covering exploit development, reverse engineering, malware analysis, red teaming strategies, and professional penetration testing workflows. Designed for experienced security professionals.",
    includes: [
      "Private lab environment access",
      "Real-world case studies",
      "Professional pentesting tools",
      "Professional certificate",
      "Career placement support",
      "1-on-1 mentorship sessions",
    ],
    demoVideo: "https://drive.google.com/file/d/1aSj5YmuMg7RZ_Cc37h2x-p0pE3ZD1TNY/view?usp=drive_link",
    resources: [
      { name: "Advanced Lab Guide", url: "#" },
      { name: "Exploit Development Manual", url: "#" },
      { name: "Malware Analysis Toolkit", url: "#" },
    ],
  },
];

export const testimonials = [
  {
    name: "Sandeep Singh",
    before: "Chemical Engineer",
    after: "Software Engineer",
    company: "Innovaccer",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhO_LzwKyTQyM8z_44Nobdc4Zx0I0ASkuPAwikVbRFs3PIFwywjKyRCmrex5MZJ3K5Rz96DGjSC91HeD9SO40r2lh_2CZt4PzjE9q2zhDTh3-vlN_OTP3YsSexs-NQbXOw2PdtFvOVLCTbu4Ixee_47J2QWVoDicUm0DthmPr8pdMKXyeE-vt6VNP2UTXMH/s600/profile-pic%20(14).png",
  },
  {
    name: "Kabita Mondal",
    before: "M.Sc in CS",
    after: "Application Developer",
    company: "Thoughtworks",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjVg9u82-OP6b9tgeYLydpOTyHai-4TKfkDQ6DG5qqItYmHUqro8=w45-h45-p-rp-mo-br100",
  },
  {
    name: "Akash Ingoley",
    before: "Gap year",
    after: "Software Developer",
    company: "Pay Glocal",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjWGLJlaotl0Vc251R-dUvjcsyACKq6U5SilOXFOjC3pY6y2_uigbg=w45-h45-p-rp-mo-br100",
  },
  {
    name: "Pradyot Verma",
    before: "Mechanical Engineer",
    after: "Software Developer",
    company: "MakeMyTrip",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjWqB6KP5Lc-T7C1POzxL-r-J-wKad79kZfJjPnI-qjeS6xb7rRR=w45-h45-p-rp-mo-br100",
  },
  {
    name: "Stuti Pandey",
    before: "Fresher Graduate",
    after: "Full Stack Developer",
    company: "Zomato",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEiR5vzDDaHMOfP1b-GEtK6ei7hJEusnJCXBjSvIGljLZn3JO2xjGRmXp0yLkyNLPIcfdSGJ3rvwzJQrxswByoWFdnt2NLHhfR9MGYE2Mw8_MuljtoWurnjNQZgLSt-_JDJDa13sA1OEVCLQrMRrYWaRgce8pSOYBVu-5L5vB3bXczlNFDNaGyyYJCYUy1fV",
  },
  {
    name: "Lalit K Tiwari",
    before: "Civil Engineer",
    after: "Data Analyst",
    company: "Flipkart",
    image: "https://lh3.googleusercontent.com/a-/ALV-UjXHjNg8vPzKqCEbF_YLkTpR2D4Nv5mL9oZaWpQHoI9dRxQd8gZ5=w45-h45-p-rp-mo-br100",
  },
];

export const tools = [
  { name: "Kali Linux", icon: "🐉" },
  { name: "Nmap", icon: "🗺️" },
  { name: "Metasploit", icon: "🎯" },
  { name: "Burp Suite", icon: "🔍" },
  { name: "Wireshark", icon: "🦈" },
  { name: "Python", icon: "🐍" },
  { name: "Linux", icon: "🐧" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "📦" },
  { name: "SQL", icon: "💾" },
];

export const hiringDrives = [
  {
    company: "TechCorp India",
    role: "Software Developer",
    salary: "6-10 LPA",
    location: "Bangalore",
    logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhO_LzwKyTQyM8z_44Nobdc4Zx0I0ASkuPAwikVbRFs3PIFwywjKyRCmrex5MZJ3K5Rz96DGjSC91HeD9SO40r2lh_2CZt4PzjE9q2zhDTh3-vlN_OTP3YsSexs-NQbXOw2PdtFvOVLCTbu4Ixee_47J2QWVoDicUm0DthmPr8pdMKXyeE-vt6VNP2UTXMH/s600/profile-pic%20(14).png",
  },
  {
    company: "DataSystems Pro",
    role: "Data Analyst",
    salary: "5-8 LPA",
    location: "Mumbai",
    logo: "https://lh3.googleusercontent.com/a-/ALV-UjVg9u82-OP6b9tgeYLydpOTyHai-4TKfkDQ6DG5qqItYmHUqro8=w45-h45-p-rp-mo-br100",
  },
  {
    company: "SecureNet Solutions",
    role: "Security Analyst",
    salary: "7-12 LPA",
    location: "Hyderabad",
    logo: "https://lh3.googleusercontent.com/a-/ALV-UjWGLJlaotl0Vc251R-dUvjcsyACKq6U5SilOXFOjC3pY6y2_uigbg=w45-h45-p-rp-mo-br100",
  },
  {
    company: "CloudTech Services",
    role: "DevOps Engineer",
    salary: "8-15 LPA",
    location: "Pune",
    logo: "https://lh3.googleusercontent.com/a-/ALV-UjWqB6KP5Lc-T7C1POzxL-r-J-wKad79kZfJjPnI-qjeS6xb7rRR=w45-h45-p-rp-mo-br100",
  },
];
