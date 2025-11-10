import React from "react";
import { motion } from "framer-motion";
import { courses, testimonials, hiringDrives, Course } from "@/data/courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

/**
 * A4CardGrid
 * Renders course / testimonial / hiring drive cards with an A4-like portrait aspect ratio
 * - Uses CSS aspect-ratio: 1 / 1.414 to approximate A4 (portrait)
 * - Responsive grid
 * - Hover + entrance animations via Framer Motion
 * - Print friendly styles so cards print nicely on A4 paper
 */

export default function A4CardGrid() {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 18 } },
    hover: { scale: 1.02 },
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <style>{`
        /* Ensure A4-like aspect ratio on screen */
        .a4-card { aspect-ratio: 1 / 1.414; }

        /* Fallback for browsers that don't support aspect-ratio */
        @supports not (aspect-ratio: 1 / 1.414) {
          .a4-card { height: calc(210mm * 1); width: calc(210mm); max-width: 100%; }
        }

        /* Print styles: make each card fill an A4 page when printing */
        @media print {
          body { -webkit-print-color-adjust: exact; }
          .print-a4 { page-break-after: always; width: 210mm; height: 297mm; }
        }
      `}</style>

      <h2 className="text-3xl font-bold mb-6">Courses — A4 Preview Cards</h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course: Course) => (
          <motion.div
            key={course.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="a4-card"
          >
            <Card className="h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="h-0 pb-[141.4%] relative"> {/* preserves 1:1.414 box for older browsers */}
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-0px)]">
                <div>
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{course.overview}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-primary/10 rounded-md">{course.category}</span>
                    <span className="text-xs px-2 py-1 bg-secondary/10 rounded-md">{course.duration}</span>
                    <span className="text-xs px-2 py-1 bg-accent/10 rounded-md">₹{course.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <Button onClick={() => navigate(`/courses/${course.id}`)} variant="default">View Details</Button>
                  <Button onClick={() => window.open(course.demoVideo || "#", "_blank") } variant="outline">Demo</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Testimonials preview */}
      <h2 className="text-3xl font-bold mt-12 mb-6">Testimonials — A4 Cards</h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div key={i} variants={cardVariants} initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true }} className="a4-card">
            <Card className="h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="h-0 pb-[141.4%] relative bg-gradient-to-b from-background to-muted">
                {/* Optional background image could use company logo or styled pattern */}
                {t.image && (
                  <img src={t.image} alt={t.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                )}
              </div>
              <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-0px)]">
                <div>
                  <h3 className="text-xl font-semibold">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.before} → {t.after}</p>
                  <p className="mt-4 text-sm italic">“{t.testimonial}”</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">{t.name.charAt(0)}</div>
                    )}
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.company}</div>
                    </div>
                  </div>
                  <Button onClick={() => alert(`Open profile for ${t.name}`)} variant="outline">Profile</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Hiring Drives preview */}
      <h2 className="text-3xl font-bold mt-12 mb-6">Hiring Drives — A4 Cards</h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hiringDrives.map((h, idx) => (
          <motion.div key={idx} variants={cardVariants} initial="hidden" whileInView="visible" whileHover="hover" viewport={{ once: true }} className="a4-card">
            <Card className="h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="h-0 pb-[141.4%] relative bg-gray-50">
                <img src={h.logo} alt={h.company} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-0px)]">
                <div>
                  <h3 className="text-xl font-bold">{h.company}</h3>
                  <p className="text-sm text-muted-foreground">{h.role} — {h.location}</p>
                  <p className="mt-4 text-sm">Salary: <span className="font-semibold">{h.salary}</span></p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Button onClick={() => alert(`Apply to ${h.company}`)} variant="default">Apply</Button>
                  <Button onClick={() => alert(`${h.company} • ${h.role}`)} variant="outline">Details</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
