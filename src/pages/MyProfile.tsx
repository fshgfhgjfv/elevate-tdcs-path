import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { courses } from "@/data/courses";
import { Progress } from "@/components/ui/progress";
import { Download, BookOpen } from "lucide-react";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("tdcs_user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));

    // Get enrolled courses
    const enrolled = courses.filter((course) =>
      localStorage.getItem(`tdcs_purchased_${course.id}`)
    );
    setEnrolledCourses(enrolled);
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-glow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-3xl gradient-text">My Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-lg"><strong>Name:</strong> {user.name}</p>
                <p className="text-lg"><strong>Email:</strong> {user.email}</p>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-bold mb-6">My Courses</h2>
          
          {enrolledCourses.length === 0 ? (
            <Card className="shadow-glow p-8 text-center">
              <p className="text-muted-foreground mb-4">You haven't enrolled in any courses yet.</p>
              <Link to="/courses">
                <Button variant="gradient">Browse Courses</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="shadow-glow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full md:w-48 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                        <Progress value={35} className="mb-4" />
                        <div className="flex gap-3">
                          <Link to={`/courses/${course.id}/content`}>
                            <Button variant="gradient">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Continue Learning
                            </Button>
                          </Link>
                          <Link to="/certificate-download">
                            <Button variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Certificate
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
