import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, ChevronRight } from "lucide-react";
import { courses } from "@/data/courses";

interface EnrolledCourse {
  courseId: string;
  date: string;
  paymentId: string;
  progress?: number;
}

interface DashboardMyCoursesProps {
  user: { name: string; email: string };
}

const DashboardMyCourses = ({ user }: DashboardMyCoursesProps) => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);

  useEffect(() => {
    const enrolled: EnrolledCourse[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("tdcs_purchased_")) {
        const courseId = key.replace("tdcs_purchased_", "");
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        enrolled.push({ ...data, courseId, progress: Math.floor(Math.random() * 100) });
      }
    });
    setEnrolledCourses(enrolled);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey
        </p>
      </motion.div>

      {/* Enrolled Courses */}
      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>
            Continue learning where you left off
          </CardDescription>
        </CardHeader>
        <CardContent>
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No courses enrolled yet</h3>
              <p className="text-muted-foreground mb-6">
                Start your learning journey by enrolling in a course
              </p>
              <Link to="/courses">
                <Button variant="default" className="gradient-primary">
                  Browse Courses
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {enrolledCourses.map((enrolled) => {
                const course = courses.find((c) => c.id === enrolled.courseId);
                if (!course) return null;

                return (
                  <motion.div
                    key={enrolled.courseId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="hover:shadow-glow transition-all">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full md:w-24 h-24 rounded-lg object-cover"
                          />
                          <div className="flex-1 w-full">
                            <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {course.description}
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="flex-1 bg-muted rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                                  style={{ width: `${enrolled.progress || 0}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {enrolled.progress || 0}%
                              </span>
                            </div>
                          </div>
                          <Link to={`/courses/${course.id}/content`}>
                            <Button variant="default" className="gradient-primary gap-2 whitespace-nowrap">
                              <Play className="w-4 h-4" />
                              Continue
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardMyCourses;
