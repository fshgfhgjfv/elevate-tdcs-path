import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Globe } from "lucide-react";
import dibyajitImage from "@/assets/founders/dibyajit-ghosh.jpg";
import tusharImage from "@/assets/founders/tushar-bhakta.jpg";
import shivamImage from "@/assets/founders/shivam-shing.jpg";

const founders = [
  {
    name: "Dibyajit Ghosh",
    role: "Founder & CEO / Forensic Investor Director",
    image: dibyajitImage,
    bio: "Leading TDCS with a vision to transform technical education and placement services.",
    linkedin: "https://linkedin.com",
    website: "https://tdcs.tech",
  },
  {
    name: "Tushar Bhakta",
    role: "Chief Marketing Officer (CMO)",
    image: tusharImage,
    bio: "Driving growth and brand strategy at TDCS.",
    linkedin: "https://linkedin.com",
    website: "https://tdcs.tech",
  },
  {
    name: "Shivam Shing",
    role: "Chief Operating Officer (COO)",
    image: shivamImage,
    bio: "Ensuring operational excellence and student success.",
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
