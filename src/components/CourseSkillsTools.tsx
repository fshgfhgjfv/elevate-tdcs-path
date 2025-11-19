import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const skills = [
 { name: "Kali Linux", img: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg" },
  { name: "Metasploit", img: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Metasploit_logo_and_wordmark.png" },
  { name: "Burp Suite", img: "https://portswigger.net/content/images/logos/burp-suite.svg" },
  { name: "Wireshark", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Wireshark_icon.svg" },
  { name: "Nmap", img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Nmap-logo.svg" },
  { name: "John the Ripper", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/John_the_Ripper_logo.png" },
  { name: "Aircrack-ng", img: "https://upload.wikimedia.org/wikipedia/commons/9/98/Aircrack-ng-logo.png" },
  { name: "Hydra", img: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Hydra-logo.png" },
];
  

const careers = [
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Engineer",
  "DevOps Engineer",
  "Mobile App Developer",
  "Cloud Application Engineer",
];

export const CourseSkillsTools = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background" id="overview">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Skills, Tools & Career Outcomes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master Full Stack Development with Industry Tools and Career-Ready Projects — Powered by Real Technologies
          </p>
        </motion.div>

        <Tabs defaultValue="skills" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-10">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
          </TabsList>

          {/* --- SKILLS TAB --- */}
          <TabsContent value="skills">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 200, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="relative group bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex flex-col items-center shadow-glow hover:shadow-lg transition-all"
                >
                  <img src={skill.img} alt={skill.name} className="w-16 h-16 object-contain mb-3" />
                  <span className="font-semibold">{skill.name}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* --- TOOLS TAB --- */}
          <TabsContent value="tools">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.07 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  className="relative group bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex flex-col items-center shadow-glow hover:shadow-xl transition-all"
                >
                  <img src={tool.img} alt={tool.name} className="w-16 h-16 object-contain mb-3" />
                  <span className="font-semibold">{tool.name}</span>
                  <motion.div
                    className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* --- PROJECTS TAB --- */}
          <TabsContent value="projects">
            <Card className="shadow-glow bg-white/5 backdrop-blur-lg border border-white/10">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4 gradient-text">10+ Real-World Projects</h3>
                <p className="text-muted-foreground mb-6">
                  Apply every concept you learn with production-style projects integrating APIs, Databases, and UI Frameworks.
                </p>
                <motion.img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=500&fit=crop"
                  alt="Project Showcase"
                  className="w-full rounded-2xl shadow-lg object-cover"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- CAREERS TAB --- */}
          <TabsContent value="careers">
            <Card className="shadow-glow bg-white/5 backdrop-blur-lg border border-white/10">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {careers.map((career, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.05 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-transparent hover:from-primary/10 transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                        {index + 1}
                      </div>
                      <span className="font-semibold text-lg">{career}</span>
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
