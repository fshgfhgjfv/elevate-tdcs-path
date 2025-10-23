import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", icon: "🌐" },
  { name: "CSS", icon: "🎨" },
  { name: "Node.js", icon: "🟢" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Express.js", icon: "⚡" },
  { name: "JavaScript", icon: "📜" },
  { name: "Git", icon: "🔀" },
  { name: "Python", icon: "🐍" },
];

const tools = [
  { name: "VS Code", icon: "💻" },
  { name: "AWS", icon: "☁️" },
  { name: "Github", icon: "🐙" },
  { name: "Docker", icon: "🐳" },
  { name: "Command Line", icon: "⌨️" },
];

const careers = [
  "Backend Developers",
  "Frontend Developers",
  "Full Stack Developers",
  "Mobile App Developer",
];

export const CourseSkillsTools = () => {
  return (
    <section className="py-16 bg-muted/20" id="overview">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Course Overview</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Future-Ready Full Stack Developer Skills Enhanced by GenAI – No Prior Coding Needed
          </p>
        </motion.div>

        <Tabs defaultValue="skills" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <Card className="shadow-glow">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <span className="text-4xl mb-2">{skill.icon}</span>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools">
            <Card className="shadow-glow">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tools.map((tool, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col items-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <span className="text-4xl mb-2">{tool.icon}</span>
                      <span className="text-sm font-medium">{tool.name}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="shadow-glow">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">10+ Real-World Projects</h3>
                <p className="text-muted-foreground mb-6">
                  Build working projects to learn application, teamwork and hurdles of real production
                </p>
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
                  alt="Projects"
                  className="w-full rounded-lg shadow-glow"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="careers">
            <Card className="shadow-glow">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {careers.map((career, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <span className="font-semibold">{career}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
