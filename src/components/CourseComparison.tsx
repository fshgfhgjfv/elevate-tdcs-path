import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Assuming you have a Badge component
import { CheckCircle2, X, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 1. IMPROVED DATA STRUCTURE
// We added an 'accessor' key to link the course to the feature object property.
const comparisonData = {
  courses: [
    {
      id: "bug-hunting-pentest",
      name: "Bug Bounty Hunter Pro",
      tagline: "Master Bug Hunting",
      highlight: "Best for Researchers",
      accessor: "bugBounty", // Matches the key in features
      recommended: false,
    },
    {
      id: "cyber-blackhat",
      name: "Cyber Master's Pro Black Hat",
      tagline: "With Placement",
      highlight: "Most Popular",
      accessor: "blackHat",
      recommended: true,
    },
    {
      id: "cyber-lite",
      name: "Cyber Master's Pro Lite",
      tagline: "Essential Skills",
      highlight: "Best Value",
      accessor: "lite",
      recommended: false,
    },
  ],
  features: [
    { name: "Duration", bugBounty: "2 months", blackHat: "6 months", lite: "15 days" },
    { name: "Price", bugBounty: "₹6,999", blackHat: "₹19,000", lite: "₹499" },
    { name: "EMI Option", bugBounty: "₹2,999/mo", blackHat: "₹2,833/mo", lite: "₹230/mo" },
    { name: "Live Bug Hunting", bugBounty: true, blackHat: false, lite: false },
    { name: "Private Platforms Access", bugBounty: true, blackHat: false, lite: false },
    { name: "CVE Documentation", bugBounty: true, blackHat: false, lite: false },
    { name: "Ethical Hacking", bugBounty: true, blackHat: true, lite: true },
    { name: "Penetration Testing", bugBounty: true, blackHat: true, lite: true },
    { name: "Network Security", bugBounty: true, blackHat: true, lite: true },
    { name: "Web Security", bugBounty: true, blackHat: true, lite: true },
    { name: "Placement Assistance", bugBounty: false, blackHat: true, lite: true },
    { name: "Mock Interviews", bugBounty: false, blackHat: true, lite: true },
    { name: "Resume Preparation", bugBounty: false, blackHat: true, lite: true },
    { name: "Aptitude Training", bugBounty: false, blackHat: true, lite: true },
    { name: "Soft Skills Training", bugBounty: false, blackHat: true, lite: true },
    { name: "Placement Portal", bugBounty: false, blackHat: true, lite: true },
  ],
};

// 2. HELPER COMPONENT FOR CELL RENDERING
// This cleans up the main code significantly
const FeatureValue = ({ value }: { value: string | boolean }) => {
  if (typeof value === "boolean") {
    return value ? (
      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
    ) : (
      <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
    );
  }
  return <span className="font-semibold text-primary">{value}</span>;
};

export const CourseComparison = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Compare Our <span className="text-primary">Courses</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect cybersecurity path tailored to your career goals.
          </p>
        </motion.div>

        {/* --- DESKTOP VIEW (TABLE) --- */}
        <div className="hidden lg:block">
          <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="p-6 text-left w-1/4 font-bold text-lg">Features</th>
                    {comparisonData.courses.map((course, index) => (
                      <th key={course.id} className="p-6 text-center w-1/4 align-top relative">
                        {course.recommended && (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                             <Badge className="bg-primary text-primary-foreground hover:bg-primary">Recommended</Badge>
                          </div>
                        )}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <h3 className="text-xl font-bold text-foreground">{course.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{course.tagline}</p>
                          <Badge variant="outline" className="mb-2 border-primary/20 text-primary bg-primary/5">
                            {course.highlight}
                          </Badge>
                        </motion.div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.features.map((feature, idx) => (
                    <motion.tr
                      key={feature.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`
                        border-b border-border/40 transition-colors hover:bg-muted/40
                        ${idx % 2 === 0 ? "bg-transparent" : "bg-muted/10"}
                      `}
                    >
                      <td className="p-4 font-medium text-foreground/90 pl-8">{feature.name}</td>
                      {comparisonData.courses.map((course) => (
                        <td key={`${course.id}-${feature.name}`} className="p-4 text-center">
                          {/* Dynamic Accessor Logic */}
                          <FeatureValue value={(feature as any)[course.accessor]} />
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/30">
                    <td className="p-6"></td>
                    {comparisonData.courses.map((course) => (
                      <td key={course.id} className="p-6 text-center">
                        <Button
                          variant={course.recommended ? "default" : "outline"}
                          size="lg"
                          className={`w-full ${course.recommended ? "shadow-lg shadow-primary/20" : ""}`}
                          onClick={() => navigate(`/courses/${course.id}`)}
                        >
                          View Details
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* --- MOBILE VIEW (STACKED CARDS) --- */}
        <div className="lg:hidden space-y-8">
          {comparisonData.courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative overflow-hidden ${course.recommended ? 'border-primary shadow-lg shadow-primary/10' : ''}`}>
                {course.recommended && (
                   <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                     Recommended
                   </div>
                )}
                
                <CardHeader className="text-center pb-2 bg-muted/20">
                  <Badge variant="secondary" className="w-fit mx-auto mb-2">{course.highlight}</Badge>
                  <CardTitle className="text-2xl">{course.name}</CardTitle>
                  <p className="text-muted-foreground">{course.tagline}</p>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="divide-y divide-border/50">
                    {comparisonData.features.map((feature) => (
                      <div key={feature.name} className="flex justify-between items-center p-4 hover:bg-muted/20">
                        <span className="text-sm font-medium text-muted-foreground">{feature.name}</span>
                        <div className="text-sm font-semibold">
                          <FeatureValue value={(feature as any)[course.accessor]} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 bg-muted/20">
                    <Button 
                      className="w-full" 
                      variant={course.recommended ? "default" : "outline"}
                      size="lg"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      Choose {course.name}
                    </Button>
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