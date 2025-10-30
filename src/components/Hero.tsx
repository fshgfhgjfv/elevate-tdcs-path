import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { Download, X } from "lucide-react";
import type { RefObject } from "react";

// --- Custom CSS Gradient ---
const GRADIENT_CLASS =
  "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";

interface HeroProps {
  showOnInnerPages?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// -----------------------
// 📘 Download Brochure Modal
// -----------------------
const DownloadBrochureModal = ({ isOpen, onClose }: ModalProps) => {
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
      "Thank you! Your brochure will open shortly.",
      "success"
    );
    window.open(
      "https://drive.google.com/file/d/1QyvVIVld5m8ORla6uqNK1NQHZIItwbzJ/view?usp=drivesdk",
      "_blank"
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
            <Download className="w-5 h-5 mr-3 text-indigo-500" />
            Download Brochure
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Email (Gmail)
            </label>
            <input
              type="email"
              required
              pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder="10-digit number"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Download Now
          </button>
        </form>
      </div>
    </div>
  );
};

// -----------------------
// 🎯 Book a Demo Modal
// -----------------------
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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

// -----------------------
// 🌟 HERO COMPONENT
// -----------------------
export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div
        id="global-alert-hero"
        className="fixed top-4 right-4 z-[9999] opacity-0 transition-opacity duration-300 pointer-events-none"
      ></div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
            The <span className={GRADIENT_CLASS}>Training</span> and Placement
            platform for your <span className={GRADIENT_CLASS}>career</span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Get job-ready with expert-led courses or participate in free hiring
            drives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => setIsDemoModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg"
            >
              Book a Demo
            </Button>

            <Button
              onClick={() => setIsBrochureModalOpen(true)}
              variant="outline"
              className="border-2 px-8 py-6 text-lg rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Download className="mr-2 h-5 w-5" /> Download Brochure
            </Button>
          </div>
