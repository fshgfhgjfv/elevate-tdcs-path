import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, BookOpen, Award } from "lucide-react";
import { toast } from "sonner";

// Razorpay test key - TODO: Replace with production key in production
const RAZORPAY_KEY = "rzp_test_1DP5mmOlF5G5ag";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("tdcs_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Check if already enrolled
    const enrollmentKey = `tdcs_purchased_${id}`;
    if (localStorage.getItem(enrollmentKey)) {
      setIsEnrolled(true);
    }
  }, [id]);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleEnroll = () => {
    if (!user) {
      toast.error("Please login first to enroll");
      navigate("/login", { state: { from: `/courses/${id}` } });
      return;
    }

    if (!course) return;

    // Initialize Razorpay
    // TODO: In production, create order on server and verify payment with webhook
    const options = {
      key: RAZORPAY_KEY,
      amount: course.price * 100, // Convert to paise
      currency: "INR",
      name: "TDCS Technologies",
      description: course.title,
      handler: function (response: any) {
        // Payment successful
        const enrollmentData = {
          userEmail: user.email,
          date: new Date().toISOString(),
          courseId: id,
          paymentId: response.razorpay_payment_id,
        };

        localStorage.setItem(`tdcs_purchased_${id}`, JSON.stringify(enrollmentData));
        setIsEnrolled(true);
        toast.success("✅ Payment Successful! Welcome to the course.");
        navigate("/my-profile");
      },
      prefill: {
        email: user.email,
      },
      theme: {
        color: "#FFB347",
      },
      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

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

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-muted gradient-text font-semibold text-sm mb-4">
                {course.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="text-primary" />
                  <span>{course.modules.length} Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-primary" />
                  <span>Certificate Included</span>
                </div>
              </div>

              <div className="text-4xl font-bold gradient-text mb-6">
                ₹{course.price.toLocaleString()}
              </div>

              {isEnrolled ? (
                <Link to={`/courses/${id}/content`}>
                  <Button variant="gradient" size="lg" className="w-full md:w-auto">
                    Go to Course
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="gradient"
                  size="lg"
                  className="w-full md:w-auto"
                  onClick={handleEnroll}
                >
                  Enroll Now
                </Button>
              )}
            </div>

            <div>
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-96 object-cover rounded-lg shadow-glow-lg"
              />
            </div>
          </div>

          {/* Overview */}
          <Card className="mb-8 shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">Course Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{course.overview}</p>
            </CardContent>
          </Card>

          {/* Modules */}
          <Card className="mb-8 shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">Course Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {course.modules.map((module, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                    <span>{module}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What's Included */}
          <Card className="mb-8 shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">What's Included</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {course.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Demo Video */}
          {course.demoVideo && (
            <Card className="mb-8 shadow-glow">
              <CardHeader>
                <CardTitle className="gradient-text">Course Demo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <iframe
                    src={course.demoVideo.replace("/view", "/preview")}
                    className="w-full h-full rounded-lg"
                    allow="autoplay"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            {isEnrolled ? (
              <div>
                <h3 className="text-2xl font-bold mb-4">Ready to Continue Learning?</h3>
                <Link to={`/courses/${id}/content`}>
                  <Button variant="gradient" size="lg">
                    Go to Course Content
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <Button variant="gradient" size="lg" onClick={handleEnroll}>
                  Enroll Now for ₹{course.price.toLocaleString()}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetail;
