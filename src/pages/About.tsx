import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Target, Eye, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold gradient-text mb-4">About TDCS</h1>
            <p className="text-xl text-muted-foreground">
              Empowering careers through education and placement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-glow hover:shadow-glow-lg transition-all">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 gradient-text mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Mission</h3>
                <p className="text-muted-foreground">
                  To bridge the gap between education and employment through quality training
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-glow hover:shadow-glow-lg transition-all">
              <CardContent className="p-8 text-center">
                <Eye className="w-12 h-12 gradient-text mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Vision</h3>
                <p className="text-muted-foreground">
                  To become India's leading platform for career transformation
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-glow hover:shadow-glow-lg transition-all">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 gradient-text mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-muted-foreground">
                  35,000+ students placed in top companies
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-glow-lg">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold gradient-text mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  TDCS Technologies Private Limited is a premier training and placement platform dedicated to transforming careers through expert-led education and industry connections.
                </p>
                <p>
                  We specialize in cybersecurity, software development, data analytics, and emerging technologies, providing comprehensive programs that prepare students for real-world challenges.
                </p>
                <p>
                  With 35,000+ successful placements and partnerships with 200+ companies, we've established ourselves as a trusted name in career development.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
