import { Hero } from "@/components/Hero";
import { CourseCard } from "@/components/CourseCard";
import { StatsCounter } from "@/components/StatsCounter";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FeaturesSection } from "@/components/FeaturesSection";
import { MentorsSection } from "@/components/MentorsSection";
import { FoundersSection } from "@/components/FoundersSection";
import { ScrollingTestimonials } from "@/components/ScrollingTestimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { courses, testimonials, tools, hiringDrives } from "@/data/courses";
import { Briefcase, Award } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Courses */}
      <section id="courses" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Featured Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Master cutting-edge cybersecurity skills with our expert-led programs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button variant="gradient" size="lg">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <MentorsSection />

      {/* Hiring Drives */}
      <section id="hiring-drives" className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Active Hiring Drives
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get placed in top companies with our free hiring drives
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringDrives.map((drive, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center mb-4">
                      <img
                        src={drive.logo}
                        alt={drive.company}
                        className="w-16 h-16 rounded-full"
                      />
                    </div>
                    <h3 className="font-bold text-center mb-2">{drive.company}</h3>
                    <p className="text-sm text-center text-muted-foreground mb-2">
                      {drive.role}
                    </p>
                    <div className="text-center">
                      <span className="text-primary font-semibold">{drive.salary}</span>
                      <p className="text-sm text-muted-foreground">{drive.location}</p>
                    </div>
                    <Button variant="gradient" className="w-full mt-4">
                      <Briefcase className="mr-2 h-4 w-4" />
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Our Impact
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCounter end={35000} label="Students Placed" suffix="+" />
            <StatsCounter end={30} label="Highest Salary (LPA)" />
            <StatsCounter end={8} label="Average Salary (LPA)" />
            <StatsCounter end={200} label="Partner Companies" suffix="+" />
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <FoundersSection />

      {/* Scrolling Testimonials */}
      <ScrollingTestimonials />

      {/* Testimonials Grid */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Student Transformations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our students transformed their careers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Our Certificates
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry-recognized certificates to boost your career
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="shadow-glow hover:shadow-glow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="aspect-[3/4] bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center">
                      <Award className="w-16 h-16 text-primary" />
                    </div>
                    <div className="text-center">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-2">
                        ✓ Verified
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Professional Certificate {i}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses">
              <Button variant="gradient" size="lg">
                Earn Your Certificate Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Tools & Technologies You'll Master
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <Card className="shadow-glow hover:shadow-glow-lg transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-2">{tool.icon}</div>
                    <p className="text-sm font-semibold">{tool.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
