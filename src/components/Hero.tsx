import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { Download } from "lucide-react";
import { DownloadBrochureModal } from "./DownloadBrochureModal";

const GRADIENT_CLASS =
  "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";

interface HeroProps {
  showOnInnerPages?: boolean;
}

const headline = "The Training and Placement platform for your career";
const words = headline.split(" ");

const wordContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.4,
    },
  },
};

const wordItemVariants = {
  hidden: { opacity: 0, y: 20, rotateX: 90 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};

export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cardRef: React.RefObject<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;
    x.set(offsetX * 0.2);
    y.set(offsetY * 0.2);
  };

  const cardRefCourses = useRef(null);
  const cardRefJobs = useRef(null);

  return (
    <>
      {/* === HERO SECTION === */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 lg:pt-40 bg-white dark:bg-gray-900 overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
          <motion.div
            className="absolute w-[600px] h-[600px] bg-[#FF50B3] opacity-10 rounded-full blur-3xl"
            initial={{ x: -200, y: -200 }}
            animate={{ x: 0, y: 0, scale: [1, 1.05, 1] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8C53FF] opacity-10 rounded-full blur-3xl"
            initial={{ x: 200, y: 200 }}
            animate={{ x: 0, y: 0, scale: [1, 0.95, 1] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-3"
              >
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba65f8?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Student avatar"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Student avatar"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Student avatar"
                  />
                </div>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                  35k+ Happy Students
                </p>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={wordContainerVariants}
                animate={isInView ? "visible" : "hidden"}
                className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white"
              >
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordItemVariants}
                    className="inline-block mr-2"
                    style={{ perspective: 1000 }}
                  >
                    {["Training", "Placement", "career"].includes(word) ? (
                      <span className={GRADIENT_CLASS}>{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-muted-foreground max-w-xl"
              >
                Get job-ready with expert-led courses or participate in our free
                hiring drives.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-start mb-6"
              >
                <Link to="/courses">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="gradient"
                      size="lg"
                      className="text-lg px-8 py-6 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow"
                    >
                      View Courses
                    </Button>
                  </motion.div>
                </Link>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 w-full sm:w-auto border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setIsBrochureModalOpen(true)}
                  >
                    <Download className="mr-2 h-5 w-5 animate-bounce-slow" />
                    Download Brochure
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - CARDS */}
            <div className="lg:col-span-1 space-y-6">
              {/* Courses */}
              <motion.div
                ref={cardRefCourses}
                variants={itemVariants}
                className="relative p-6 md:p-8 rounded-xl shadow-2xl text-white overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #4F46E5, #3B82F6)",
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={(e) => handleMouseMove(e, cardRefCourses)}
                onMouseLeave={() => {
                  x.set(0);
                  y.set(0);
                }}
              >
                <h3 className="text-2xl font-bold mb-3 z-10 relative">COURSES</h3>
                <p className="mb-6 z-10 relative">
                  Industry Ready Training to get you placed!
                </p>
                <Link to="/courses">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-6 bg-white text-blue-600 hover:bg-gray-100 z-10 relative"
                  >
                    View Courses ↗
                  </Button>
                </Link>
                <motion.img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFV4OWyD-dpHkkEFbAGYgoOAim674uDerzeBvx37rp3dl6VHIsIkbWtVaaoR4GWqdA-MW0UJpRs9VBkZO-mIeHQMrSCOoamOXHXoGopFkAVHRdo3sdIKbuameNOQCAcCWlm8EkgqTNKZ0nn1tT-Ov7QuLmGYVG_xIBVCTG454m9rfwSRdtlBWGAuY4DSjc/s539/WhatsApp_Image_2025-10-26_at_15.56.54_d2e7dc94-removebg-preview.png"
                  alt="Student for Courses"
                  className="absolute -right-8 -bottom-8 h-48 w-48 md:h-64 md:w-64 object-cover z-0"
                />
              </motion.div>

              {/* Jobs */}
              <motion.div
                ref={cardRefJobs}
                variants={itemVariants}
                className="relative p-6 md:p-8 rounded-xl shadow-2xl text-white overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #A855F7, #EC4899)",
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                onMouseMove={(e) => handleMouseMove(e, cardRefJobs)}
                onMouseLeave={() => {
                  x.set(0);
                  y.set(0);
                }}
              >
                <h3 className="text-2xl font-bold mb-3 z-10 relative">JOBS</h3>
                <p className="mb-6 z-10 relative">
                  Get hired directly with our FREE verified hiring drives!
                </p>
                <Link to="/hiring-drives">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-6 bg-white text-purple-600 hover:bg-gray-100 z-10 relative"
                  >
                    View Hiring Drives ↗
                  </Button>
                </Link>
                <motion.img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQ0tEjYMM5XfgAEUIFghZDgQ4qlL_i_RB2GbVyMg_xapb65wtrHWPKPOVDc2XnlAb3SurAPLjxcwTj-0v0ZtYJtoNOW8KKw69-323EdcSAM1v2sa8Vib4hMYUwNi8CE3vDP60ABkr__xPG3PXGW2On3wFSQ2J4pNZKxnBdik0U1ki5IltqyhKi5xTrjRB7/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png"
                  alt="Student for Jobs"
                  className="absolute -right-8 -bottom-8 h-48 w-48 md:h-64 md:w-64 object-cover z-0"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <DownloadBrochureModal
          isOpen={isBrochureModalOpen}
          onClose={() => setIsBrochureModalOpen(false)}
        />
      </section>

      {/* === LEADERSHIP SECTION === */}
      <{/* === LEADERSHIP SECTION === */}
<section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
  <div className="container mx-auto px-4 text-center">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-extrabold mb-12 text-gray-900 dark:text-white"
    >
      Meet Our <span className={GRADIENT_CLASS}>Leadership</span>
    </motion.h2>

    {/* Leadership Layout */}
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
      {/* CEO - Large Card */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="relative p-8 md:p-10 rounded-2xl shadow-2xl text-white overflow-hidden cursor-pointer bg-gradient-to-br from-[#4F46E5] to-[#3B82F6] w-full max-w-sm lg:max-w-md"
      >
        <motion.img
          src="https://blogger.googleusercontent.com/img/a/AVvXsEjNQhD_FqbzJzTQupYXGoQBA-TyfWRY7LI76n5is3RoKkbKLeSkELjipGiDLQodxlbsFEfhBsyKVKj0sKLXSiPNd2GedCzGcT3DDwxb0fSspFYBWV0Lb6JV5DYj0jrrcjKZ1U1bVDn1gQ4bMdp8WViDpcHEWE8XaAyqAEeqb0rnmlIgg4au8lLLqCPYRxa9"
          alt="CEO"
          className="w-40 h-40 sm:w-52 sm:h-52 object-cover rounded-full border-4 border-white shadow-xl mx-auto mb-6"
        />
        <h3 className="text-2xl font-bold mb-2">Amit Verma</h3>
        <p className="text-lg opacity-90 mb-4">CEO & Founder</p>
        <p className="text-sm text-white/80">
          Leading the vision and strategy to empower students and transform careers.
        </p>
      </motion.div>

      {/* COO + CMO smaller stacked cards */}
      <div className="flex flex-col gap-8 w-full max-w-sm">
        {/* COO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="relative p-6 rounded-xl shadow-xl text-white bg-gradient-to-br from-[#A855F7] to-[#EC4899] overflow-hidden"
        >
          <img
            src="https://blogger.googleusercontent.com/img/a/AVvXsEhPcY7OD_gvFPpSHxxFdNsKjh7B0YsN4dDz2DATlkBPxrfHB1s1vJuSY6ivppjiUWBLJgnaHmag-MT1j5dY3ogIZnmk8XUANyMirIM2KFEX0NU7IOem0cxXU3JZz181SdNAfMxSn0UvfmB0B_0binfWdGEjveahWjhfSjJ5COdckX94i6iZxkBBB4akTyyz"
            alt="COO"
            className="w-28 h-28 object-cover rounded-full border-4 border-white mx-auto mb-4 shadow-lg"
          />
          <h4 className="text-xl font-bold mb-1">Priya Sharma</h4>
          <p className="text-sm opacity-90 mb-2">COO</p>
          <p className="text-sm text-white/80">
            Driving operational excellence and seamless execution across all departments.
          </p>
        </motion.div>

        {/* CMO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}
          className="relative p-6 rounded-xl shadow-xl text-white bg-gradient-to-br from-[#FF9A3C] to-[#FF50B3] overflow-hidden"
        >
          <img
            src="https://blogger.googleusercontent.com/img/a/AVvXsEgrwmLkO5Feodxq5QaY_atrGnsO9pqgfFM05kadDK8NB_24j-cIBsML47l20CtYES_Zfa4jUVR24_u4po_QnjcsO4yiRZUlpESCdAb2JVdbzkhp3gaU55kpGn_v-EUQaxkosCtzSR3-0eyjtW4m9gkglNME7wzxffg-A0kX98SqspAZNX1Aep3Wf-OgGpoP"
            alt="CMO"
            className="w-28 h-28 object-cover rounded-full border-4 border-white mx-auto mb-4 shadow-lg"
          />
          <h4 className="text-xl font-bold mb-1">Ravi Patel</h4>
          <p className="text-sm opacity-90 mb-2">CMO</p>
          <p className="text-sm text-white/80">
            Crafting powerful marketing strategies and building strong brand identity.
          </p>
        </motion.div>
      </div>
    </div>
  </div>
</section>
