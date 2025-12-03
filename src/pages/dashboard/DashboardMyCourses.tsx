import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BookOpen, Play, ChevronRight, CheckCircle, Clock } from "lucide-react";
import { courses } from "@/data/courses";
import { useToast } from "@/hooks/use-toast";

interface EnrolledCourse {
  courseId: string;
  date: string;
  paymentId: string;
  progress?: number;
  lastAccessed?: string;
}

interface DashboardMyCoursesProps {
  user: { name: string; email: string };
}

const DashboardMyCourses = ({ user }: DashboardMyCoursesProps) => {
  const { toast } = useToast();
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "progress">("date");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const enrolled: EnrolledCourse[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("tdcs_purchased_")) {
        const courseId = key.replace("tdcs_purchased_", "");
        const data = JSON.parse(localStorage.getItem(key) || "{}");
        enrolled.push({
          ...data,
          courseId,
          progress: data.progress || Math.floor(Math.random() * 80),
          lastAccessed: data.lastAccessed || new Date().toISOString(),
        });
      }
    });
    setEnrolledCourses(enrolled);
  }, []);

  // Handle updating course progress
  const updateProgress = (courseId: string, completed = false) => {
    const updated = enrolledCourses.map((course) =>
      course.courseId === courseId
        ? {
            ...course,
            progress: completed ? 100 : Math.min((course.progress || 0) + 10, 100),
            lastAccessed: new Date().toISOString(),
          }
        : course
    );
    setEnrolledCourses(updated);
    const storedKey = `tdcs_purchased_${courseId}`;
    const stored = JSON.parse(localStorage.getItem(storedKey) || "{}");
    localStorage.setItem(
      storedKey,
      JSON.stringify({
        ...stored,
        progress: completed ? 100 : Math.min((stored.progress || 0) + 10, 100),
        lastAccessed: new Date().toISOString(),
      })
    );

    toast({
      title: completed ? "Course completed!" : "Progress saved",
      description: completed
        ? "You've successfully completed this course!"
        : "Your progress has been updated.",
    });
  };

  const filteredCourses = enrolledCourses
    .filter((course) => {
      const courseData = courses.find((c) => c.id === course.courseId);
      if (!courseData) return false;
      const matchesSearch = courseData.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (activeTab === "in-progress") return course.progress! < 100 && matchesSearch;
      if (activeTab === "completed") return course.progress === 100 && matchesSearch;
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "progress") return (b.progress || 0) - (a.progress || 0);
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Continue your learning journey
        </p>
      </motion.div>

      {/* Search + Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Input
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:w-1/2"
        />
        <select
          className="border rounded-md p-2 text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "progress")}
        >
          <option value="date">Sort by Date</option>
          <option value="progress">Sort by Progress</option>
        </select>
      </div>

      {/* Tabs for Course Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value={activeTab}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activeTab === "all"
                      ? "My Courses"
                      : activeTab === "in-progress"
                      ? "Courses in Progress"
                      : "Completed Courses"}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === "all"
                      ? "All your enrolled courses"
                      : activeTab === "in-progress"
                      ? "Keep learning and track your progress"
                      : "Well done! Here are your completed courses"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredCourses.length === 0 ? (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">
                        {activeTab === "completed"
                          ? "No completed courses yet"
                          : "No courses found"}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {activeTab === "completed"
                          ? "Finish a course to see it here!"
                          : "Start by enrolling in a course."}
                      </p>
                      <Link to="/courses">
                        <Button variant="default" className="gradient-primary">
                          Browse Courses
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredCourses.map((enrolled) => {
                        const course = courses.find(
                          (c) => c.id === enrolled.courseId
                        );
                        if (!course) return null;
                        return (
                          <motion.div
                            key={enrolled.courseId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
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
                                    <h3 className="text-xl font-bold mb-1">
                                      {course.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-3">
                                      {course.description}
                                    </p>

                                    {/* Progress bar */}
                                    <div className="flex items-center gap-4">
                                      <div className="flex-1 bg-muted rounded-full h-2">
                                        <div
                                          className={`h-2 rounded-full transition-all ${
                                            enrolled.progress === 100
                                              ? "bg-green-500"
                                              : "bg-gradient-to-r from-primary to-secondary"
                                          }`}
                                          style={{
                                            width: `${enrolled.progress || 0}%`,
                                          }}
                                        />
                                      </div>
                                      <span className="text-sm font-medium">
                                        {enrolled.progress || 0}%
                                      </span>
                                    </div>

                                    {/* Last accessed */}
                                    <div className="flex items-center text-xs text-muted-foreground mt-2 gap-1">
                                      <Clock className="w-3 h-3" />
                                      Last accessed:{" "}
                                      {new Date(
                                        enrolled.lastAccessed || ""
                                      ).toLocaleDateString()}
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex flex-col gap-2">
                                    <Link
                                      to={`/courses/${course.id}/content`}
                                      onClick={() =>
                                        updateProgress(course.id, false)
                                      }
                                    >
                                      <Button
                                        variant="default"
                                        className="gradient-primary gap-2"
                                      >
                                        <Play className="w-4 h-4" />
                                        Continue
                                        <ChevronRight className="w-4 h-4" />
                                      </Button>
                                    </Link>

                                    {enrolled.progress! < 100 && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          updateProgress(enrolled.courseId, true)
                                        }
                                        className="gap-2"
                                      >
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        Mark Completed
                                      </Button>
                                    )}
                                  </div>
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
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default DashboardMyCourses;
