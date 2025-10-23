import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Globe } from "lucide-react";

const founders = [
  {
    name: "Dr. Amit Verma",
    role: "Co-Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "Former Security Head at TCS with 15+ years of experience in cybersecurity. Ph.D. in Computer Science from IIT Delhi.",
    linkedin: "#",
    website: "#",
  },
  {
    name: "Neha Agarwal",
    role: "Co-Founder & CTO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
    bio: "Ex-Senior Engineer at Google. Expert in cloud security and DevSecOps. Alumni of IIT Bombay.",
    linkedin: "#",
    website: "#",
  },
];

export const FoundersSection = () => {
  return (
    <section id="founders" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Meet Our Founders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visionaries who are passionate about making quality tech education accessible
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="group hover:shadow-glow-lg transition-all duration-300 overflow-hidden h-full">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1">{founder.name}</h3>
                    <p className="text-primary font-semibold mb-4">{founder.role}</p>
                    <p className="text-muted-foreground mb-6">{founder.bio}</p>
                    
                    <div className="flex gap-4">
                      <a
                        href={founder.linkedin}
                        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-5 h-5" />
                        LinkedIn
                      </a>
                      <a
                        href={founder.website}
                        className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="w-5 h-5" />
                        Website
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
