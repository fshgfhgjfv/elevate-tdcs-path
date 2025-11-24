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
    imgSrc: "data:image/jpeg;base64,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",
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
