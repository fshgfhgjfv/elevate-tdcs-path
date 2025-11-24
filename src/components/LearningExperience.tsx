import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const experiences = [
  {
    imgSrc: "data:image/png;base64,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",
    title: "Modern Classrooms",
    description: "State-of-the-art classrooms with interactive lectures taught by industry professionals.",
  },
  {
    imgSrc: "https://your-google-image-link-2.jpg",
    title: "Learn By Doing",
    description: "Environment for intense practical & applied learning that prepare you for real-world challenges.",
  },
  {
    imgSrc: "https://your-google-image-link-3.jpg",
    title: "Student Practice Area",
    description: "Go-to zone for practice, collaborations & self-improvement.",
  },
  {
    imgSrc: "https://your-google-image-link-4.jpg",
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
            src="https://blogger.googleusercontent.com/img/a/AVvXsEiR5vzDDaHMOfP1b-GEtK6ei7hJEusnJCXBjSvIGljLZn3JO2xjGRmXp0yLkyNLPIcfdSGJ3rvwzJQrxswByoWFdnt2NLHhfR9MGYE2Mw8_MuljtoWurnjNQZgLSt-_JDJDa13sA1OEVCLQrMRrYWaRgce8pSOYBVu-5L5vB3bXczlNFDNaGyyYJCYUy1fV"
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
