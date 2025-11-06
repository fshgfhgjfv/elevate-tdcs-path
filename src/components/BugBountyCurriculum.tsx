import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, Bug, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { bugBountyCurriculum } from "@/data/bugBountyCurriculum";

export const BugBountyCurriculum = () => {
  const [selectedUnit, setSelectedUnit] = useState(0);
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);

  const handleTopicClick = (index: number) => {
    setExpandedTopic(expandedTopic === index ? null : index);
  };

  const currentModule = bugBountyCurriculum[selectedUnit];

  return (
    <section className="py-16" id="curriculum">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <Bug className="w-14 h-14 text-primary" />
          </motion.div>
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Bug Bounty Curriculum
          </h2>
          <p className="text-lg text-muted-foreground">
            Master Bug Hunting, Web Security, and Professional Penetration Testing
          </p>
        </motion.div>

        {/* Curriculum Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Module List */}
          <div className="space-y-2">
            {bugBountyCurriculum.map((unit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedUnit === index
                      ? "shadow-glow border-primary bg-primary/5"
                      : "hover:shadow-glow"
                  }`}
                  onClick={() => {
                    setSelectedUnit(index);
                    setExpandedTopic(null);
                  }}
                >
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      {unit.unit}
                    </p>
                    <p className="font-semibold text-sm">{unit.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Topics List */}
          <motion.div
            key={selectedUnit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-3"
          >
            <Card className="shadow-glow-lg">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold gradient-text mb-6">
                  {currentModule.title}
                </h3>

                {/* Expandable Topics */}
                <div className="space-y-3">
                  {currentModule.topics.map((topic, index) => (
                    <motion.div key={index} layout className="border-b pb-2">
                      <div
                        className="flex items-center justify-between gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => handleTopicClick(index)}
                      >
                        <div className="flex items-center gap-3">
                          <ChevronRight
                            className={`text-primary transition-transform ${
                              expandedTopic === index ? "rotate-90" : ""
                            }`}
                          />
                          <span className="font-medium">{`Topic ${index + 1}: ${
                            topic.title
                          }`}</span>
                        </div>
                        <ChevronDown
                          className={`transition-transform ${
                            expandedTopic === index ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      <AnimatePresence>
                        {expandedTopic === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-10 pr-4 pb-3 text-muted-foreground text-sm"
                          >
                            {topic.details}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <Button variant="gradient" size="lg" className="shadow-glow">
            <Download className="mr-2" />
            Download Bug Bounty Curriculum
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
