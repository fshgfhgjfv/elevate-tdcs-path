import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";
import { useMotionValue, useTransform } from "framer-motion";

// --- Example service data with images and project URLs ---
const services = [
  {
    name: "Website Security",
    description:
      "Protect your site from hackers, malware, and data leaks with enterprise-grade protection and real-time threat monitoring.",
    price: "Starting at $199",
    image: "https://images.unsplash.com/photo-1556741533-f6acd647d2fb?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://yourportfolio.com/security-project",
  },
  {
    name: "Penetration Testing",
    description:
      "Simulated cyberattacks to find and fix vulnerabilities before real hackers can exploit them.",
    price: "Starting at $299",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://yourportfolio.com/penetration-test",
  },
  {
    name: "Bug Hunting",
    description:
      "Find and fix logic, performance, and security bugs with detailed code audits and patch reports.",
    price: "Starting at $149",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://yourportfolio.com/bug-hunt",
  },
  {
    name: "Web Development",
    description:
      "Modern web apps built with React, Next.js, or WordPress. Fully responsive, fast, and SEO optimized.",
    price: "Starting at $499",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://yourportfolio.com/web-dev",
  },
  {
    name: "Figma Website Design",
    description:
      "Craft visually stunning and user-centric designs in Figma, ready for seamless development handoff.",
    price: "Starting at $199",
    image: "https://images.unsplash.com/photo-1581276879432-15a19d654956?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://yourportfolio.com/figma-design",
  },
];

// --- 3D Tilt Card Component ---
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="transform-gpu"
    >
      {children}
    </motion.div>
  );
};

export default function WebsiteDevelopment() {
  return (
    <section className="container mx-auto px-4 py-20">
      {/* --- Hero Section --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Website Development & Security Services
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          From design to deployment — we build, secure, and optimize your digital experience with precision and style.
        </p>
      </motion.div>

      {/* --- Service Cards --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <TiltCard key={service.name}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.4 }}
            >
              <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 border-border/50 overflow-hidden rounded-2xl bg-gradient-to-b from-background to-background/80 backdrop-blur-lg">
                <div className="overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.name}
                    className="h-40 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-primary">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">
                      {service.price}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="relative overflow-hidden group"
                        onClick={() =>
                          window.open(service.projectUrl, "_blank")
                        }
                      >
                        <span className="flex items-center gap-2">
                          View Project
                          <ExternalLink className="w-4 h-4" />
                        </span>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"
                          layoutId="hoverGlow"
                        />
                      </Button>
                      <Button className="gradient-primary shadow-md">
                        Get Quote
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* --- Subtle Floating Glow Background --- */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[-1]"
        animate={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(56,189,248,0.08), transparent 70%)",
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
      />
    </section>
  );
}
