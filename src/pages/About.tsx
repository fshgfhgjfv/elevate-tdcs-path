import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Target, Eye, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">About TDCS</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Empowering futures through. <span className="text-primary font-semibold">Cybersecurity, Software,</span> and <span className="text-primary font-semibold">Career Development</span> excellence.
          </p>
        </motion.div>

        {/* Mission, Vision, Community Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {[
            {
              title: "Mission",
              icon: Target,
              desc: "To bridge the gap between education and employment through quality, hands-on learning experiences.",
            },
            {
              title: "Vision",
              icon: Eye,
              desc: "To become India’s most trusted platform for technical education and cybersecurity innovation.",
            },
            {
              title: "Community",
              icon: Users,
              desc: "Over 35,000+ students trained and 5,000+ placed in leading tech companies worldwide.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
            >
              <Card className="shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <item.icon className="w-12 h-12 gradient-text mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-glow-lg border-2 border-primary/10 bg-gradient-to-br from-background to-primary/5">
            <CardContent className="p-8 md:p-10">
              <h2 className="text-3xl font-bold gradient-text mb-6 text-center md:text-left">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  <span className="font-semibold text-foreground">TDCS Technologies Private Limited</span> is a leading
                  training and placement company focused on bridging the gap between
                  education and employment in the fast-evolving technology landscape.
                </p>
                <p>
                  We specialize in <span className="text-primary font-medium">Cybersecurity</span>,{" "}
                  <span className="text-primary font-medium">Software Development</span>,{" "}
                  and <span className="text-primary font-medium">Emerging Tech</span> — empowering
                  learners with practical skills and real-world projects.
                </p>
                <p>
                  With <span className="font-semibold text-foreground">5,000+ successful placements</span> and{" "}
                  <span className="font-semibold text-foreground">partnerships with 50+ companies</span>,
                  TDCS has become a trusted name for learners aiming to build impactful careers in tech.
                </p>
                <p>
                  Our goal is to create a generation of professionals who are not just job-ready, but
                  innovation-driven — shaping the digital security and technology future of India.
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
