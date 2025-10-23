import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CourseStats } from "@/components/CourseStats";
import { CounselorForm } from "@/components/CounselorForm";
import { CourseSkillsTools } from "@/components/CourseSkillsTools";
import { CourseTestimonials } from "@/components/CourseTestimonials";
import { WhyJoinSection } from "@/components/WhyJoinSection";
import { CourseCurriculum } from "@/components/CourseCurriculum";
import { LearningExperience } from "@/components/LearningExperience";
import { MentorsSection } from "@/components/MentorsSection";
import { HiringPartners } from "@/components/HiringPartners";
import { RecruiterTestimonial } from "@/components/RecruiterTestimonial";
import { CoursePricing } from "@/components/CoursePricing";
import { CourseFAQ } from "@/components/CourseFAQ";
import { BookOpen } from "lucide-react";

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
    const userData = localStorage.getItem("tdcs_user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const enrollmentKey = `tdcs_purchased_${id}`;
    if (localStorage.getItem(enrollmentKey)) {
      setIsEnrolled(true);
    }
  }, [id]);

  useEffect(() => {
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

    const options = {
      key: RAZORPAY_KEY,
      amount: course.price * 100,
      currency: "INR",
      name: "TDCS Technologies",
      description: course.title,
      handler: function (response: any) {
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
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <span className="inline-block px-4 py-1 rounded-full bg-muted gradient-text font-semibold text-sm mb-4">
                {course.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {course.title} with Placement Assistance
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                This course is designed by top experts. Get hands-on coding experience and placement 
                assistance with 60 hiring drives monthly!
              </p>

              <div className="flex flex-wrap gap-4">
                {isEnrolled ? (
                  <Link to={`/courses/${id}/content`}>
                    <Button variant="gradient" size="lg">
                      <BookOpen className="mr-2" />
                      Go to Course
                    </Button>
                  </Link>
                ) : (
                  <Button variant="gradient" size="lg" onClick={handleEnroll}>
                    Book a Free Demo
                  </Button>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <CounselorForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <CourseStats />

      {/* Navigation Tabs */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <nav className="flex gap-6 overflow-x-auto py-4 text-sm">
            <a href="#overview" className="link-underline whitespace-nowrap">Course Overview</a>
            <a href="#why-join" className="link-underline whitespace-nowrap">Why Join Us</a>
            <a href="#curriculum" className="link-underline whitespace-nowrap">Curriculum</a>
            <a href="#learning" className="link-underline whitespace-nowrap">Learning Experience</a>
            <a href="#mentors" className="link-underline whitespace-nowrap">Mentor</a>
            <a href="#pricing" className="link-underline whitespace-nowrap">Pricing</a>
            <a href="#faq" className="link-underline whitespace-nowrap">FAQ</a>
          </nav>
        </div>
      </div>

      {/* Course Program Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold gradient-text mb-6 text-center">
              STRUCTURED, INDUSTRY ORIENTED COURSE
            </h2>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Learn Full Stack Development
            </h3>
            <p className="text-center text-muted-foreground mb-8">
              Curated by top tech professionals
            </p>

            <div className="bg-muted/20 rounded-2xl p-8 border-2 border-primary/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-bold">CLASSROOM PROGRAM - JAVA</h4>
                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  Scholarships Available
                </span>
              </div>
              <p className="text-muted-foreground mb-6">
                Up skill on - Data Structures, Algorithms, Java, Java Script, Spring & Spring Boot.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Eligibility</p>
                  <p className="font-semibold">All Degrees & Backgrounds</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Next Batch</p>
                  <p className="font-semibold">03rd November</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-semibold">{course.duration}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button variant="gradient" size="lg" onClick={handleEnroll}>
                  Enquire Now
                </Button>
                <Button variant="outline" size="lg">
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Tools */}
      <CourseSkillsTools />

      {/* Testimonials */}
      <CourseTestimonials />

      {/* Why Join */}
      <WhyJoinSection />

      {/* Curriculum */}
      <CourseCurriculum />

      {/* Learning Experience */}
      <LearningExperience />

      {/* Student Life */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">Student Life 🎓</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience a vibrant student life with collaborative learning, hands-on projects, 
              and networking opportunities, all in a supportive community that helps you grow 
              both personally and professionally.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mentors */}
      <div id="mentors">
        <MentorsSection />
      </div>

      {/* Hiring Partners */}
      <HiringPartners />

      {/* Recruiter Testimonial */}
      <RecruiterTestimonial />

      {/* Pricing */}
      <CoursePricing onEnroll={handleEnroll} />

      {/* FAQ */}
      <CourseFAQ />

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who transformed their careers with TDCS Technologies
          </p>
          {isEnrolled ? (
            <Link to={`/courses/${id}/content`}>
              <Button variant="gradient" size="lg">
                Continue Learning
              </Button>
            </Link>
          ) : (
            <div className="flex gap-4 justify-center">
              <Button variant="gradient" size="lg" onClick={handleEnroll}>
                Enroll Now
              </Button>
              <Button variant="outline" size="lg">
                Request Callback
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
