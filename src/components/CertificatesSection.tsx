import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import certificateDemo from "@/assets/certificate-demo.jpg";

export const CertificatesSection = () => {
  const navigate = useNavigate();

  return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left side - CTA */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-4"
                initial={{ rotateY: -20, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ perspective: 1000 }}
              >
                <Award className="w-10 h-10 text-primary" />
                <h2 className="text-4xl font-bold gradient-text">Our Certificates</h2>
              </motion.div>
              <motion.p 
                className="text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Build your resume and LinkedIn profile with TDCS certificates. 
                Showcase verified achievements to hiring partners and stand out in the competitive job market.
              </motion.p>
              <div className="space-y-4">
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    "Industry-recognized certifications",
                    "Verified digital credentials",
                    "LinkedIn-ready certificates",
                    "Boost your professional profile"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                    >
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{ perspective: 1000 }}
              >
                <Button
                  size="lg"
                  variant="gradient"
                  onClick={() => navigate("/courses")}
                  className="px-8 py-6 text-lg shadow-glow-lg"
                >
                  Enroll Now
                </Button>
              </motion.div>
            </motion.div>

            {/* Right side - Certificate Demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.03, rotateY: -3, rotateX: 3 }}
              className="relative"
              style={{ perspective: 1500, transformStyle: "preserve-3d" }}
            >
              <div className="relative rounded-lg overflow-hidden shadow-glow-lg">
                <motion.img
                  src={certificateDemo}
                  alt="TDCS Certificate Demo"
                  className="w-full h-auto"
                  loading="lazy"
                  style={{ transformStyle: "preserve-3d" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
  );
};
