import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { Download, X } from "lucide-react";
import type { RefObject } from "react";

// --- Gradient Class ---
const GRADIENT_CLASS =
  "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";

// --- Interfaces ---
interface HeroProps {
  showOnInnerPages?: boolean;
}
interface DownloadBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// --- Headline Setup ---
const headline = "The Training and Placement platform for your career";
const words = headline.split(" ");

// --- Animation Variants ---
const wordContainerVariants = {
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.4 },
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

// --- DownloadBrochureModal ---
const DownloadBrochureModal = ({
  isOpen,
  onClose,
}: DownloadBrochureModalProps) => {
  if (!isOpen) return null;

  const alertMessage = (message: string, type: "success" | "error") => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alertMessage(
      "Thank you! Your brochure download link has been sent to your email (simulated).",
      "success"
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Download className="w-5 h-5 mr-2 text-indigo-500" />
            Request Our Full Brochure
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fill out the form to instantly receive a PDF brochure detailing our
            programs, placements, and pricing.
          </p>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
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
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="email@company.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            <Download className="inline-block w-5 h-5 mr-2" />
            Download Instantly
          </button>
        </form>
      </div>
    </div>
  );
};

// --- ✅ BookDemoModal Integration ---
const BookDemoModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const alertMessage = (message: string, type: "success" | "error") => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alertMessage("Thank you! Our team will contact you soon.", "success");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Book a Free Demo
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Gmail
            </label>
            <input
              type="email"
              required
              pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Mobile Number
            </label>
            <input
              type="tel"
              required
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="10-digit number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Course Interested In
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="e.g. Cyber Master's Pro"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

// --- ✅ Main Hero Component ---
export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const cardRefCEO: RefObject<HTMLDivElement> = useRef(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 lg:pt-40 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div id="global-alert-hero" className="fixed top-4 right-4 opacity-0"></div>

      {/* Left Column */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={wordContainerVariants}
        >
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            {words.map((word, i) => (
              <motion.span key={i} variants={wordItemVariants} className="mr-2">
                {word === "Training" || word === "career" ? (
                  <span className={GRADIENT_CLASS}>{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Get job-ready with expert-led courses or participate in free hiring drives.
          </p>

          {/* --- ✅ Buttons --- */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/courses">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg px-8 py-6">
                View Courses
              </Button>
            </Link>

            {/* Replaced Link with Modal Trigger */}
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6"
              onClick={() => setIsDemoModalOpen(true)}
            >
              Book a Demo
            </Button>

            <Button
              variant="outline"
              className="border-2 text-lg px-8 py-6"
              onClick={() => setIsBrochureModalOpen(true)}
            >
              <Download className="mr-2 h-5 w-5" /> Download Brochure
            </Button>
          </div>
        </motion.div>
      </div>

      {/* --- ✅ Modals --- */}
      <DownloadBrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />
      <BookDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </section>
  );
};
