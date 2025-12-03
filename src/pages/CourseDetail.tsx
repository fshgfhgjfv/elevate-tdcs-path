import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BookOpen } from "lucide-react";
import { courses } from "@/data/courses";
import { CounselorForm } from "@/components/CounselorForm";
import { CourseFAQ } from "@/components/CourseFAQ";
import { CoursePricing } from "@/components/CoursePricing";
import { CourseCurriculum } from "@/components/CourseCurriculum";
import { CourseTestimonials } from "@/components/CourseTestimonials";
import { CourseStats } from "@/components/CourseStats";
import { WhyJoinSection } from "@/components/WhyJoinSection";
import { LearningExperience } from "@/components/LearningExperience";
import { MentorsSection } from "@/components/MentorsSection";
import { HiringPartners } from "@/components/HiringPartners";
import { RecruiterTestimonial } from "@/components/RecruiterTestimonial";

const RAZORPAY_KEY = "rzp_test_1DP5mmOlF5G5ag";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  useEffect(() => {
    const userData = localStorage.getItem("tdcs_user");
    if (userData) setUser(JSON.parse(userData));
    if (localStorage.getItem(`tdcs_purchased_${id}`)) setIsEnrolled(true);
  }, [id]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
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
      handler: (res: any) => {
        localStorage.setItem(
          `tdcs_purchased_${id}`,
          JSON.stringify({
            userEmail: user.email,
            date: new Date().toISOString(),
            courseId: id,
            paymentId: res.razorpay_payment_id,
          })
        );
        setIsEnrolled(true);
        toast.success("✅ Payment Successful! Welcome to the course.");
        navigate("/my-profile");
      },
      prefill: { email: user.email },
      theme: { color: "#6C63FF" },
    };
    new window.Razorpay(options).open();
  };

  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center flex-col text-center">
        <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
        <Link to="/courses">
          <Button variant="gradient">Browse Courses</Button>
        </Link>
      </div>
    );

  return (
    <div className="overflow-hidden relative">
      {/* Dynamic BG */}
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 blur-3xl"
        style={{ y: y1 }}
      />

      {/* Hero Section */}
      <section className="pt-28 pb-16 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-6"
        >
          <motion.img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-72 object-cover rounded-3xl mb-8 shadow-2xl"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          />
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {course.title}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {course.description}
          </p>

          <div className="mt-8 flex justify-center gap-4">
            {isEnrolled ? (
              <Link to={`/courses/${id}/content`}>
                <Button size="lg" variant="gradient">
                  <BookOpen className="mr-2" /> Continue Learning
                </Button>
              </Link>
            ) : (
              <Button size="lg" variant="gradient" onClick={handleEnroll}>
                Enroll Now
              </Button>
            )}
            <Button variant="outline" size="lg">
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <CourseStats />
      </motion.div>

      {/* Floating Tabs */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-border/40 py-3"
      >
        <div className="flex justify-center flex-wrap gap-6 text-sm font-medium">
          {[
            "Overview",
            "Curriculum",
            "Learning",
            "Mentors",
            "Pricing",
            "FAQ",
          ].map((tab, i) => (
            <a
              key={i}
              href={`#${tab.toLowerCase()}`}
              className="hover:text-primary transition-all"
            >
              {tab}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Curriculum */}
      <motion.section
        id="curriculum"
        className="py-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <CourseCurriculum />
      </motion.section>

      {/* Why Join */}
      <motion.section
        id="overview"
        className="py-16"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <WhyJoinSection />
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <CourseTestimonials />
      </motion.section>

      {/* Learning Experience */}
      <motion.section
        id="learning"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <LearningExperience />
      </motion.section>

      {/* Mentors */}
      <motion.section
        id="mentors"
        className="py-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <MentorsSection />
      </motion.section>

      {/* Hiring Partners */}
      <HiringPartners />

      {/* Recruiter Testimonials */}
      <RecruiterTestimonial />

      {/* Pricing */}
      <motion.section
        id="pricing"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <CoursePricing onEnroll={handleEnroll} courseId={id || ""} />
      </motion.section>

      {/* FAQ */}
      <motion.section
        id="faq"
        className="py-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <CourseFAQ />
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          Ready to Start Your Cyber Journey?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join 5,000+ learners already transforming their careers with TDCS Technologies.
        </p>
        {isEnrolled ? (
          <Link to={`/courses/${id}/content`}>
            <Button variant="gradient" size="lg">
              Continue Learning
            </Button>
          </Link>
        ) : (
          <Button variant="gradient" size="lg" onClick={handleEnroll}>
            Enroll Now
          </Button>
        )}
      </motion.section>
    </div>
  );
}
