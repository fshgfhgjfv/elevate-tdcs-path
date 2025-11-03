import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Trophy, 
  Award, 
  TrendingUp, 
  Settings, 
  HelpCircle,
  ChevronRight,
  Play
} from "lucide-react";
import { courses } from "@/data/courses";

interface EnrolledCourse {
  courseId: string;
  date: string;
  paymentId: string;
  progress?: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem("tdcs_user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));

    // Get all enrolled courses
    const enrolled: EnrolledCourse[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("tdcs_purchased_")) {
        const courseId = key.replace("tdcs_purchased_", "");
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        enrolled.push({ ...data, courseId, progress: Math.floor(Math.random() * 100) });
      }
    });
    setEnrolledCourses(enrolled);
  }, [navigate]);

  const sidebarItems = [
    { icon: Trophy, label: "Leaderboard", path: "/dashboard/leaderboard" },
    { icon: Award, label: "Certificates", path: "/dashboard/certificates" },
    { icon: TrendingUp, label: "Progress", path: "/dashboard/progress" },
    { icon: Settings, label: "Settings", path: "/my-profile" },
    { icon: HelpCircle, label: "Support", path: "/contact-us" },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="hidden lg:flex flex-col w-64 bg-card border-r min-h-screen sticky top-20"
        >
          <div className="p-6">
            <h2 className="text-xl font-bold gradient-text mb-6">Dashboard</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 hover:bg-primary/10"
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
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

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-glow transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                      <p className="text-3xl font-bold">{enrolledCourses.length}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-glow transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Certificates</p>
                      <p className="text-3xl font-bold">0</p>
                    </div>
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-glow transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Ranking</p>
                      <p className="text-3xl font-bold">-</p>
                    </div>
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

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
                      <Button variant="gradient">
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
                              <div className="flex items-center gap-6">
                                <img
                                  src={course.thumbnail}
                                  alt={course.title}
                                  className="w-24 h-24 rounded-lg object-cover"
                                />
                                <div className="flex-1">
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
                                  <Button variant="gradient" className="gap-2">
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

            {/* Mobile Sidebar Links */}
            <Card className="lg:hidden">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {sidebarItems.map((item) => (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3"
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
