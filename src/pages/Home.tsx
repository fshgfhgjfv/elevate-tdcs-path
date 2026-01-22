import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { Briefcase, Award, Zap, Code, Shield, MousePointer2 } from "lucide-react";

// Existing Components
import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { StatsCounter } from "@/components/StatsCounter";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FeaturesSection } from "@/components/FeaturesSection";
import { MentorsSection } from "@/components/MentorsSection";
import { FoundersSection } from "@/components/FoundersSection";
import { ScrollingTestimonials } from "@/components/ScrollingTestimonials";
import { HomeFAQ } from "@/components/HomeFAQ";
import { RecruiterTestimonial } from "@/components/RecruiterTestimonial";
import { ApplyBatchesSection } from "@/components/ApplyBatchesSection";
import { CertificatesSection } from "@/components/CertificatesSection";
import { RecognizedBy } from "@/components/RecognizedBy";
import { ChatBot } from "@/components/ChatBot";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Data
import { courses, testimonials, tools, hiringDrives } from "@/data/courses";

// --- Visual Utilities ---

// 1. Spotlight Effect for Cards
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative group border border-white/10 bg-white/5 overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// 2. Section Heading Wrapper with Parallax
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="text-center mb-16 relative z-10"
    >
      <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white bg-[length:200%_auto] animate-gradient">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 blur-sm mt-4" />
    </motion.div>
  );
};

// 3. Main Home Component
const Home = () => {
  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax Background Logic
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20">
      
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 shadow-[0_0_10px_var(--primary)]"
        style={{ scaleX }}
      />

      {/* Dynamic Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ y: bgY }}
          className="absolute inset-0 opacity-[0.03]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        {/* Floating Glow Orbs */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        <Hero />

        {/* Features & Recognition */}
        <div className="relative bg-background/50 backdrop-blur-sm">
          <FeaturesSection />
          <RecognizedBy />
        </div>

        {/* Featured Courses with 3D Hover */}
        <section id="courses" className="py-24 relative">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Featured Programs" 
              subtitle="Master the dark arts of Cybersecurity and Modern Development with our battle-tested curriculum."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <SpotlightCard className="h-full bg-card/50 backdrop-blur-md border-primary/10">
                    <CourseCard {...course} />
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mt-16"
            >
              <Link to="/courses">
                <Button variant="default" size="lg" className="rounded-full px-8 h-12 text-lg shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all">
                  Explore Entire Catalog
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Mentors (Dark Mode styled) */}
        <div className="bg-gradient-to-b from-background via-muted/30 to-background">
          <MentorsSection />
        </div>

        {/* Infinite Marquee Hiring Drives */}
        <section id="hiring-drives" className="py-24 overflow-hidden relative">
           {/* Gradient Masks for Marquee fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="container mx-auto px-4 mb-12">
            <SectionHeader 
              title="Active Hiring Drives" 
              subtitle="Exclusive opportunities with our network of 200+ hiring partners."
            />
          </div>

          {/* Marquee Container */}
          <div className="flex overflow-hidden group">
            <motion.div
              className="flex gap-6 py-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              {[...hiringDrives, ...hiringDrives, ...hiringDrives].map((drive, index) => (
                <div key={index} className="w-[350px] flex-shrink-0 mx-2">
                  <SpotlightCard className="h-full bg-card hover:border-primary/50 transition-colors">
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <img src={drive.logo} alt={drive.company} className="w-12 h-12 rounded-full border border-white/10" />
                        <div>
                          <h3 className="font-bold text-lg leading-tight">{drive.company}</h3>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{drive.role}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6 p-3 bg-muted/20 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Package</span>
                          <span className="text-primary font-bold">{drive.salary}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Location</span>
                          <span>{drive.location}</span>
                        </div>
                      </div>

                      <Link to={`/courses/${drive.courseId}`}>
                        <Button className="w-full group" variant="outline">
                          Apply Now 
                          <Briefcase className="ml-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </SpotlightCard>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section with Glassmorphism */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-primary/5 skew-y-3 transform origin-top-left -z-10" />
          <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { end: 35000, label: "Students Placed", suffix: "+" },
                  { end: 30, label: "Highest CTC (LPA)", suffix: "" },
                  { end: 8, label: "Average CTC (LPA)", suffix: "" },
                  { end: 200, label: "Hiring Partners", suffix: "+" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", bounce: 0.5, delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-background/40 backdrop-blur-xl border border-white/10 text-center shadow-xl"
                  >
                    <StatsCounter end={stat.end} label={stat.label} suffix={stat.suffix} />
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        <FoundersSection />
        
        <div className="py-10">
          <ScrollingTestimonials />
        </div>

        {/* Student Transformations */}
        <section id="testimonials" className="py-24 bg-gradient-to-b from-background to-primary/5">
          <div className="container mx-auto px-4">
            <SectionHeader 
              title="Success Stories" 
              subtitle="Real people. Real careers. Real transformation."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CertificatesSection />

        {/* Tools & Tech - The "Cloud" Layout */}
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <SectionHeader title="Tech Arsenal" subtitle="The industry-standard tools you will master." />
            
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.05 }}
                  whileHover={{ scale: 1.15, rotate: Math.random() * 10 - 5 }}
                  className="cursor-pointer"
                >
                  <div className="px-6 py-4 rounded-xl bg-card border border-white/5 shadow-lg flex items-center gap-3 hover:border-primary/50 transition-colors">
                    <span className="text-2xl filter drop-shadow-md">{tool.emoji}</span>
                    <span className="font-semibold text-sm tracking-wide">{tool.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <HomeFAQ />
        
        <div className="relative z-10">
          <RecruiterTestimonial />
          <ApplyBatchesSection />
        </div>

        {/* Floating Utilities */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
           <ChatBot />
           <WhatsAppButton />
        </div>

      </div>
    </div>
  );
};

export default Home;