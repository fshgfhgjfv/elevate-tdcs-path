import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const experiences = [
  {
    imgSrc: "/images/modern-classroom.jpg",
    title: "Modern Classrooms",
    description: "State-of-the-art classrooms with interactive lectures taught by industry professionals.",
  },
  {
    imgSrc: "/images/learn-by-doing.jpg",
    title: "Learn By Doing",
    description: "Environment for intense practical & applied learning that prepare you for real-world challenges.",
  },
  {
    imgSrc: "/images/student-practice-area.jpg",
    title: "Student Practice Area",
    description: "Go-to zone for practice, collaborations & self-improvement.",
  },
  {
    imgSrc: "/images/peer-to-peer-learning.jpg",
    title: "Peer to Peer Learning",
    description: "Collaborative learning that helps you grow with your batchmates.",
  },
];

export const LearningExperience = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Learn in a Space Built for Your Success
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-glow transition-all duration-300 text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    <img
                      src={exp.imgSrc}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-bold mb-2">0{index + 1}</p>
                  <h3 className="font-bold mb-2">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-glow-lg max-w-4xl mx-auto">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop"
            alt="Learning Environment"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center p-8">
            <div className="text-center">
              <p className="text-xl font-bold mb-4">Want to Visit?</p>
              <Button variant="gradient" size="lg">
                Schedule Centre Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
