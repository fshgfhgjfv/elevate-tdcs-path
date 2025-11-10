import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    name: "Website Security",
    description:
      "Protect your site from hackers, malware, and data leaks with advanced monitoring and defense systems.",
    price: "Starting at $199",
  },
  {
    name: "Penetration Testing",
    description:
      "Comprehensive testing to identify vulnerabilities in your website before attackers do.",
    price: "Starting at $299",
  },
  {
    name: "Bug Hunting",
    description:
      "We analyze your website’s code and logic to find and fix bugs that impact performance or security.",
    price: "Starting at $149",
  },
  {
    name: "Web Development",
    description:
      "Custom-built websites using modern frameworks like React, Next.js, or WordPress with responsive design.",
    price: "Starting at $499",
  },
  {
    name: "Figma Website Design",
    description:
      "Beautiful, user-focused UI/UX designs created in Figma — perfect for startups and redesigns.",
    price: "Starting at $199",
  },
];

export default function WebsiteDevelopment() {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Website Development & Security Services
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From web design to cybersecurity — we build and protect your digital presence.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-glow transition-all duration-300 border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">
                  {service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{service.price}</span>
                  <Button variant="outline">Get Quote</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
