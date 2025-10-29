import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { Download, X } from "lucide-react";

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
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

const DownloadBrochureModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const alertMessage = (message, type) => {
    const alertBox = document.getElementById("global-alert-hero");
    if (alertBox) {
      alertBox.textContent = message;
      alertBox.className = `fixed top-4 right-4 z-[9999] p-4 rounded-lg shadow-xl text-white transition-opacity duration-300 opacity-100 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`;
      setTimeout(() => {
        alertBox.className = alertBox.className.replace("opacity-100", "opacity-0");
      }, 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted for brochure download.");
    alertMessage(
      "Thank you! Your brochure download link has been sent to your email (simulated).",
      "success"
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Download className="w-5 h-5 mr-3 text-indigo-500" />
            Request Our Full Brochure
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fill out the form to instantly receive a PDF brochure detailing our programs, placements, and pricing.
          </p>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Work Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="email@company.com"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Instantly
          </button>
        </form>
      </div>
    </div>
  );
};

export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const cardRefCEO = useRef(null);
  const cardRefCOO = useRef(null);
  const cardRefCMO = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.2);
    y.set(offsetY * 0.2);
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div id="global-alert-hero" className="fixed top-4 right-4 z-[9999] opacity-0"></div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={itemVariants} className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                <img className="h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pinimg.com/736x/9c/2a/81/9c2a81633cffd91adf5354958f50f3be.jpg" />
                <img className="h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032" />
                <img className="h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" />
              </div>
              <p className="text-lg font-semibold text-gray-700">35k+ Happy Students</p>
            </motion.div>

            <motion.h1
              variants={wordContainerVariants}
              animate={isInView ? "visible" : "hidden"}
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              {words.map((word, i) => (
                <motion.span key={i} variants={wordItemVariants} className="inline-block mr-2">
                  {word === "Training" || word === "career" ? (
                    <span className={GRADIENT_CLASS}>{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-xl">
              Get job-ready with expert-led courses or participate in our free hiring drives.
            </motion.p>

            {/* Buttons Section */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link to="/courses">
                <Button variant="gradient" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                  View Courses
                </Button>
              </Link>

              <Link to="/book-demo">
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8 py-6 w-full sm:w-auto bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Book a Demo 📅
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 w-full sm:w-auto"
                onClick={() => setIsBrochureModalOpen(true)}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Brochure
              </Button>
            </motion.div>
          </div>

          {/* Right Section (Cards) */}
          <div className="lg:col-span-1 space-y-4 flex flex-col items-center lg:items-end">
            <motion.div
              ref={cardRefCEO}
              variants={itemVariants}
              className="relative p-8 w-full rounded-2xl shadow-2xl text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                rotateX,
                rotateY,
              }}
              onMouseMove={(e) => handleMouseMove(e, cardRefCEO)}
              onMouseLeave={() => {
                x.set(0);
                y.set(0);
              }}
            >
              <h3 className="text-3xl font-extrabold mb-2">Rudra Narayan</h3>
              <p className="text-lg mb-6">CEO & Founder (IIT Delhi Alumnus)</p>

              <motion.img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhQ9heh07dWNTxnm6dhyphenhyphen2rzfxjmA_xS3UXPh3sBCY_B2ywNCfyr8QXWKLsur3PJKzLo-pUsoGmIfTmGl8m7cGmUezdk_RvStMnzxjIstX1S-V6gc2PrG8WkudchJv_c0LuVu0xbO7mUnWh5mWZHMe9THz3dwqCLTN0-2bAoI0k_rynUr6vk2xDdSKi0bM-/s539/WhatsApp_Image_2025-10-26_at_15.56.54_d2e7dc94-removebg-preview.png"
                alt="CEO"
                className="absolute -right-4 -bottom-4 h-56 w-56 object-cover opacity-80"
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
  );
};
