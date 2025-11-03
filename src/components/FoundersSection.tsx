import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Globe } from "lucide-react";
// Removed local image imports, as we'll use URLs directly

const founders = [
  {
    name: "Dibyajit Ghosh",
    role: "Founder & CEO / Forensic Investor Director",
    // Updated image URL from Hero.jsx
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhQ9heh07dWNTxnm6dhyphenhyphen2rzfxjmA_xS3UXPh3sBCY_B2ywNCfyr8QXWKLsur3PJKzLo-pUsoGmIfTmGl8m7cGmUezdk_RvStMnzxjIstX1S-V6gc2PrG8WkudchJv_c0LuVu0xbO7mUnWh5mWZHMe9THz3dwqCLTN0-2bAoI0k_rynUr6vk2xDdSKi0bM-/s539/WhatsApp_Image_2025-10-26_at_15.56.54_d2e7dc94-removebg-preview.png",
    bio: "Leading TDCS with a vision to transform technical education and placement services.",
    linkedin: "https://linkedin.com",
    website: "https://tdcs.tech",
  },
  // RE-ORDERED: Shivam (COO) is now second
  {
    name: "Shivam Shing",
    role: "Chief Operating Officer (COO)",
    // Updated image URL from Hero.jsx
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEgiDtg5YtmQ7bdvNmeAAMyhwpc5tLm_RNR2Lv4y4u6hsMzTiuqNyxo7O0qU32donmMZoTduoxe-4WgWVdPh29JH9vmYXkqCI7hiyzwaYBxxXgTfKbCsjTST6gyIWQB230kRXgwfQvxV-dqB9V-Xqr3915tuA9d88D1rGY-l9sJy_vhC3HJR0pdEI6F3E8Nr",
    bio: "Ensuring operational excellence and student success.",
    linkedin: "https://linkedin.com",
    website: "https://tdcs.tech",
  },
  // RE-ORDERED: Tushar (CMO) is now third
  {
    name: "Tushar Bhakta",
    role: "Chief Marketing Officer (CMO)",
    // Updated image URL from Hero.jsx
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh68HDmzQ4YTj9g9soRrkq-eHc9cAfbC03ZOXSClA19NofdsJ2lzm2A29d2qxG3xXSUfuEVl-sGEVnkokdgS6snQn86My-Bekn2MLrF135mZPHpwXfsLg1XxhFaClj1Uebgi6IcxeseCR6rvwc3vg6IgYUm8voolffwjQhcY4haMotxomzPVjfJm7ylnHdF/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png",
    bio: "Driving growth and brand strategy at TDCS.",
    linkedin: "https://linkedin.com",
    website: "https://tdcs.tech",
  },
];

export const FoundersSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="founders" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Meet Our Founders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The visionaries behind TDCS Technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden rounded-lg bg-card border shadow-lg transition-all duration-300 group-hover:shadow-glow">
                <div className="relative overflow-hidden h-80">
                  <motion.img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{founder.name}</h3>
                    <p className="text-sm text-white/90">{founder.role}</p>
                  </div>
                </div>
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: hoveredIndex === index ? "0%" : "100%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary-dark/95 p-6 flex flex-col justify-center"
                >
                  <h3 className="text-2xl font-bold mb-2 text-white">{founder.name}</h3>
                  <p className="text-sm text-white/90 mb-4">{founder.role}</p>
                  <p className="text-white/80 text-sm mb-6">{founder.bio}</p>
                  <div className="flex gap-4">
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-white/80">
                      <Linkedin size={20} />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                    <a href={founder.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-white/80">
                      <Globe size={20} />
                      <span className="text-sm">Website</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
