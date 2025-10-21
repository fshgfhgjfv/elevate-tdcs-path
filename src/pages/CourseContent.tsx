import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import { Download, FileText, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CourseContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress] = useState(35); // Demo progress

  useEffect(() => {
    // Check enrollment status
    const enrollmentKey = `tdcs_purchased_${id}`;
    const enrollment = localStorage.getItem(enrollmentKey);
    
    if (!enrollment) {
      setIsEnrolled(false);
    } else {
      setIsEnrolled(true);
    }
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses">
            <Button variant="gradient">Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="shadow-glow-lg p-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
                  <Lock className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
              <p className="text-lg text-muted-foreground mb-8">
                You must enroll in this course to view the content.
              </p>
              <Link to={`/courses/${id}`}>
                <Button variant="gradient" size="lg">
                  Enroll Now
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <Link to={`/courses/${id}`} className="text-primary hover:underline mb-4 inline-block">
              ← Back to Course Details
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {course.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-semibold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          </div>

          {/* Video Content */}
          <Card className="mb-8 shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">Course Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                {course.demoVideo && (
                  <iframe
                    src={course.demoVideo.replace("/view", "/preview")}
                    className="w-full h-full"
                    allow="autoplay"
                  ></iframe>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Modules */}
          <Card className="mb-8 shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">Course Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {course.modules.map((module, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium">{module}</span>
                    </div>
                    <span className="text-sm text-primary font-semibold">
                      {index === 0 ? "Current" : index < 2 ? "Available" : "Locked"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Downloadable Resources */}
          <Card className="mb-8 shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">Downloadable Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {course.resources?.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="text-primary" />
                      <span className="font-medium">{resource.name}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
                
                <Button variant="gradient" className="w-full mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Download All Materials
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Certificate CTA */}
          <Card className="shadow-glow-lg gradient-primary text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Complete the Course</h3>
              <p className="mb-6 opacity-90">
                Finish all modules to earn your professional certificate
              </p>
              <Link to="/certificate-download">
                <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
                  View Certificate
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseContent;
