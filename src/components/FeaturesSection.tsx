import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Briefcase,
  Code,
  MessageCircle,
  Trophy,
  Target,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Learning",
    description:
      "Learn from industry experts with real-world experience in cybersecurity and development.",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop&q=80",
  },
  {
    icon: Briefcase,
    title: "100% Placement",
    description:
      "Get placed in top companies with our proven placement assistance and hiring drives.",
    image:
      "https://images.unsplash.com/photo-1554774853-b414d2a2b3dd?w=600&h=400&fit=crop&q=80",
  },
  {
    icon: Code,
    title: "Real Projects",
    description:
      "Work on live projects and build a portfolio that stands out to employers.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&q=80",
  },
  {
    icon: MessageCircle,
    title: "24/7 Doubt Support",
    description:
      "Get your doubts cleared anytime with our dedicated support team and mentors.",
    image:
      "https://images.unsplash.com/photo-1587613865763-4b8b0f1de7d9?w=600&h=400&fit=crop&q=80",
  },
  {
    icon: Trophy,
    title: "Weekly Challenges",
    description:
      "Participate in coding challenges and competitions to sharpen your skills.",
    image:
      "https://images.unsplash.com/photo-1606761568499-6b918abe92b9?w=600&h=400&fit=crop&q=80",
  },
  {
    icon: Target,
    title: "Career Guidance",
    description:
      "Receive personalized career guidance and interview preparation support.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&q=80",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-muted/20 to-muted/40 relative overflow-hidden">
      {/* Subtle Animated Background */}
      <motion.div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920')] bg-cover bg-center opacity-10 blur-lg"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Why TDCS Technologies?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to launch your dream career in tech — built for the future.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="overflow-hidden group rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 bg-background/60 backdrop-blur-md border border-border/50">
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 p-2 bg-white/20 rounded-full backdrop-blur-sm">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Text Content */}
                <CardContent className="p-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-muted-foreground"
                  >
                    {feature.description}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
