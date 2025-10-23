import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Code, MessageCircle, Trophy, Target } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Learning",
    description: "Learn from industry experts with real-world experience in cybersecurity and development",
  },
  {
    icon: Briefcase,
    title: "100% Placement",
    description: "Get placed in top companies with our proven placement assistance and hiring drives",
  },
  {
    icon: Code,
    title: "Real Projects",
    description: "Work on live projects and build a portfolio that stands out to employers",
  },
  {
    icon: MessageCircle,
    title: "24/7 Doubt Support",
    description: "Get your doubts cleared anytime with our dedicated support team and mentors",
  },
  {
    icon: Trophy,
    title: "Weekly Challenges",
    description: "Participate in coding challenges and competitions to sharpen your skills",
  },
  {
    icon: Target,
    title: "Career Guidance",
    description: "Receive personalized career guidance and interview preparation support",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Why TDCS Technologies?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to launch your dream career in tech
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-glow transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
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
