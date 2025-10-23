import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Users, Briefcase, Target, Award } from "lucide-react";

const reasons = [
  {
    icon: BookOpen,
    title: "Learn from the Best",
    description: "Learn high demand skills taught by industry experts & experienced professionals",
    rating: "4.7/5",
    badge: "Top rated, holistic learning experience",
  },
  {
    icon: Users,
    title: "Get Mentored & Clear Doubts",
    description: "Receive 1-on-1 mentorship & get your doubts resolved instantly for a smooth learning experience",
    rating: "4.9/5",
    badge: "Master topics with extensive mentorship",
  },
  {
    icon: Briefcase,
    title: "Build Real-World Industry Projects",
    description: "Work on real-world, industry-level projects to strengthen your skills and portfolio",
    rating: "10+",
    badge: "Build working projects for production",
  },
  {
    icon: Target,
    title: "Perfect Your Skills with Mock Sessions",
    description: "Sharpen your skills through extensive mock interviews & assessments to ensure you're job-ready",
    rating: "12+",
    badge: "Simulate actual interviews",
  },
  {
    icon: Award,
    title: "Ace Placements & Land Your Dream Tech Job",
    description: "Become industry ready & secure your dream tech role with our comprehensive placement support",
    rating: "500+",
    badge: "Companies hiring",
  },
];

export const WhyJoinSection = () => {
  return (
    <section className="py-16" id="why-join">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Why TDCS Technologies?</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-glow transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <reason.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{reason.description}</p>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold gradient-text">{reason.rating}</span>
                      <Button variant="outline" size="sm">Book A Free Session</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{reason.badge}</p>
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
