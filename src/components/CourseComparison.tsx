import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const comparisonData = {
  features: [
    { name: "Duration", bugBounty: "3 months", blackHat: "6 months", lite: "15 days" },
    { name: "Price", bugBounty: "₹6,999", blackHat: "₹19,999", lite: "₹499" },
    { name: "EMI Option", bugBounty: "₹2,999/mo", blackHat: "₹4,833/mo", lite: "₹200/5days" },
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
  courses: [
    {
      id: "bug-hunting-pentest",
      name: "Bug Bounty Hunter Pro",
      tagline: "Master Bug Hunting",
      highlight: "Best for Security Researchers",
    },
    {
      id: "cyber-blackhat",
      name: "Cyber Master's Pro Black Hat",
      tagline: "With Placement",
      highlight: "Most Popular",
    },
    {
      id: "cyber-lite",
      name: "Cyber Master's Pro Lite",
      tagline: "Essential Skills",
      highlight: "Best Value",
    },
  ],
};

export const CourseComparison = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Compare Our Courses</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the perfect course that matches your career goals
          </p>
        </motion.div>

        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <Card className="shadow-glow-lg">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-6 text-left font-semibold text-foreground">Features</th>
                    {comparisonData.courses.map((course, index) => (
                      <th key={course.id} className="p-6 text-center">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="mb-2">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                              {course.highlight}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold mb-1">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">{course.tagline}</p>
                        </motion.div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.features.map((feature, index) => (
                    <motion.tr
                      key={feature.name}
                      className="border-b hover:bg-muted/20 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-4 font-medium">{feature.name}</td>
                      <td className="p-4 text-center">
                        {typeof feature.bugBounty === "boolean" ? (
                          feature.bugBounty ? (
                            <CheckCircle2 className="w-6 h-6 text-primary mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="font-semibold text-primary">{feature.bugBounty}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof feature.blackHat === "boolean" ? (
                          feature.blackHat ? (
                            <CheckCircle2 className="w-6 h-6 text-primary mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="font-semibold text-primary">{feature.blackHat}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof feature.lite === "boolean" ? (
                          feature.lite ? (
                            <CheckCircle2 className="w-6 h-6 text-primary mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          <span className="font-semibold text-primary">{feature.lite}</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-6"></td>
                    {comparisonData.courses.map((course, index) => (
                      <td key={course.id} className="p-6 text-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant={index === 1 ? "gradient" : "outline"}
                            size="lg"
                            className="w-full"
                            onClick={() => navigate(`/courses/${course.id}`)}
                          >
                            View Course
                          </Button>
                        </motion.div>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-6">
          {comparisonData.courses.map((course, courseIndex) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: courseIndex * 0.1 }}
            >
              <Card className="shadow-glow-lg">
                <CardHeader className="text-center border-b">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {course.highlight}
                    </span>
                  </div>
                  <CardTitle>{course.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{course.tagline}</p>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 mb-6">
                    {comparisonData.features.map((feature) => {
                      const value =
                        courseIndex === 0
                          ? feature.bugBounty
                          : courseIndex === 1
                          ? feature.blackHat
                          : feature.lite;
                      return (
                        <div key={feature.name} className="flex justify-between items-center">
                          <span className="text-sm font-medium">{feature.name}</span>
                          <span>
                            {typeof value === "boolean" ? (
                              value ? (
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                              ) : (
                                <X className="w-5 h-5 text-muted-foreground" />
                              )
                            ) : (
                              <span className="font-semibold text-primary text-sm">{value}</span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    variant={courseIndex === 1 ? "gradient" : "outline"}
                    size="lg"
                    className="w-full"
                    onClick={() => navigate(`/courses/${course.id}`)}
                  >
                    View Course
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
