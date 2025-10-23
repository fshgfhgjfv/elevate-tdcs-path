import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download } from "lucide-react";
import { motion } from "framer-motion";

const javaCurriculum = [
  {
    unit: "Unit 1",
    title: "Intro to Programming in Java",
    topics: ["Java Basics", "Patterns & Functions", "Data Structures", "Strings & Optimization", "Time & Space Complexity"],
  },
  {
    unit: "Unit 2",
    title: "Fundamental DSA Constructs",
    topics: ["Recursion", "Linked Lists", "Backtracking", "Object-Oriented Programming (OOP)", "Advanced OOP"],
  },
  {
    unit: "Unit 3",
    title: "Essential Data Structures",
    topics: ["Two-Pointer & Sliding Window", "Prefix Sum, Kadane's Algorithm", "String Searching", "Bitwise Operations, Heaps", "SQL Basic"],
  },
  {
    unit: "Unit 4",
    title: "Prominent Algorithms and Data Structures",
    topics: ["Stacks", "Queues", "Hashing", "Trees", "Binary Search"],
  },
  {
    unit: "Unit 5",
    title: "Basics of Spring & Spring Boot",
    topics: ["Backend Development Fundamentals", "Spring Framework Core", "Advanced API Development", "Database Management", "Spring Data JPA"],
  },
  {
    unit: "Unit 6",
    title: "Advanced Spring and Implementation",
    topics: ["JPA Deep Dive", "Data Transfer Objects (DTOs)", "Advanced JPA", "Integration with Java EE", "Advanced API Development"],
  },
  {
    unit: "Unit 7",
    title: "HTML & CSS",
    topics: ["Core HTML Concepts", "Style with CSS", "Enhance & Animate", "Building Real Projects", "Version Control"],
  },
  {
    unit: "Unit 8",
    title: "Basic & Advanced JS",
    topics: ["Core Concepts", "Data Structures & OOP", "Strings & Debugging", "DOM & Events, Async JavaScript", "Advanced Concepts, Storage & APIs"],
  },
];

export const CourseCurriculum = () => {
  const [selectedUnit, setSelectedUnit] = useState(0);

  return (
    <section className="py-16" id="curriculum">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Course Curriculum</h2>
          <p className="text-lg text-muted-foreground">
            The curriculum that makes you Industry Ready with Hands-on Implementation
          </p>
        </motion.div>

        <Tabs defaultValue="java" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="java">JAVA</TabsTrigger>
            <TabsTrigger value="mern">MERN</TabsTrigger>
          </TabsList>

          <TabsContent value="java">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                {javaCurriculum.map((unit, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all ${
                      selectedUnit === index ? "shadow-glow border-primary" : "hover:shadow-glow"
                    }`}
                    onClick={() => setSelectedUnit(index)}
                  >
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{unit.unit}</p>
                      <p className="font-semibold text-sm">{unit.title}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="md:col-span-3 shadow-glow-lg">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold gradient-text mb-6">
                    {javaCurriculum[selectedUnit].title}
                  </h3>
                  <div className="space-y-3">
                    {javaCurriculum[selectedUnit].topics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <ChevronRight className="text-primary flex-shrink-0" />
                        <span className="font-medium">Topic-{index + 1}</span>
                        <span className="text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button variant="gradient" size="lg">
                <Download className="mr-2" />
                Download Full Curriculum
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="mern">
            <Card className="shadow-glow-lg">
              <CardContent className="p-12 text-center">
                <h3 className="text-2xl font-bold mb-4">MERN Stack Curriculum</h3>
                <p className="text-muted-foreground mb-6">
                  Comprehensive curriculum covering MongoDB, Express, React, and Node.js
                </p>
                <Button variant="gradient">
                  <Download className="mr-2" />
                  Download MERN Curriculum
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
