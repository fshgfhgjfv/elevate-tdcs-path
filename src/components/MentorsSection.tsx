import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mentors = [
  {
    name: "Rajesh Kumar",
    role: "Senior Security Architect",
    company: "Google",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    expertise: ["DSA", "System Design", "Cybersecurity"],
    experience: "12+ years",
  },
  {
    name: "Priya Sharma",
    role: "Lead Developer",
    company: "Microsoft",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    expertise: ["SQL", "Java", "Cloud Security"],
    experience: "10+ years",
  },
  {
    name: "Arjun Patel",
    role: "Security Engineer",
    company: "Amazon",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    expertise: ["Python", "Ethical Hacking", "DevSecOps"],
    experience: "8+ years",
  },
  {
    name: "Sneha Reddy",
    role: "Full Stack Developer",
    company: "Meta",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    expertise: ["React", "Node.js", "Web Security"],
    experience: "9+ years",
  },
];

export const MentorsSection = () => {
  return (
    <section id="mentors" className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Learn from the Best
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our mentors have worked at top tech companies and are passionate about teaching
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-glow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                    <p className="text-sm text-primary font-medium mb-1">{mentor.role}</p>
                    <p className="text-sm text-muted-foreground mb-3">{mentor.company}</p>
                    
                    <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {mentor.experience} experience
                      </p>
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
