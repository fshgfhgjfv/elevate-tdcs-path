import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { Download, X } from "lucide-react";
import type { RefObject } from "react";

const GRADIENT_CLASS =
  "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";

interface HeroProps {
  showOnInnerPages?: boolean;
}

interface DownloadBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BROCHURE_URL =
  "https://drive.google.com/file/d/1QyvVIVld5m8ORla6uqNK1NQHZIItwbzJ/view?usp=drivesdk";

const DownloadBrochureModal = ({ isOpen, onClose }: DownloadBrochureModalProps) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Validation
    if (!formData.name.trim()) {
      alertMessage("Please enter your name.", "error");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alertMessage("Please enter a valid 10-digit mobile number.", "error");
      return;
    }

    if (!/.+@.+\..+/.test(formData.email)) {
      alertMessage("Please enter a valid email address.", "error");
      return;
    }

    if (!formData.course) {
      alertMessage("Please select a course of interest.", "error");
      return;
    }

    if (!formData.consent) {
      alertMessage("Please agree to receive course updates.", "error");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      alertMessage("Thank you! Your brochure will open shortly.", "success");
      window.open(BROCHURE_URL, "_blank");
      setIsSubmitting(false);
      onClose();
      setFormData({
        name: "",
        phone: "",
        email: "",
        course: "",
        consent: false,
      });
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <Download className="w-5 h-5 mr-3 text-indigo-500" />
            Download Course Brochure
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Fill in your details to get our detailed brochure instantly.
          </p>

          <div>
            <label
              htmlFor="modal-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="modal-name"
              name="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label
              htmlFor="modal-phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="modal-phone"
              name="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              pattern="\d{10}"
              maxLength={10}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
              placeholder="10-digit mobile number"
            />
          </div>

          <div>
            <label
              htmlFor="modal-email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="modal-email"
              name="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="modal-course"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Course of Interest
            </label>
            <select
              id="modal-course"
              name="course"
              required
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
            >
              <option value="">Select a course</option>
              <option value="cyber-masters-pro-lite">
                Cyber Master’s Pro Lite
              </option>
              <option value="cyber-masters-pro-black-hat">
                Cyber Master’s Pro Black Hat
              </option>
            </select>
          </div>

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="modal-consent"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1"
            />
            <label
              htmlFor="modal-consent"
              className="text-sm text-gray-600 dark:text-gray-400"
            >
              I agree to receive course updates and offers from TDCS.
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out"
          >
            <Download className="w-5 h-5 mr-2" />
            {isSubmitting ? "Processing..." : "Download Brochure"}
          </Button>
        </form>
      </div>
    </div>
  );
};

// ---------------- Hero Section (unchanged except for modal integration) ----------------

export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const cardRefCEO: RefObject<HTMLDivElement> = useRef(null);
  const cardRefCOO: RefObject<HTMLDivElement> = useRef(null);
  const cardRefCMO: RefObject<HTMLDivElement> = useRef(null);

  // ... rest of Hero component remains same (unchanged content, background, cards, etc.)

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 lg:pt-40 bg-white dark:bg-gray-900 overflow-hidden">
      <div id="global-alert-hero" className="fixed top-4 right-4 z-[9999] opacity-0 transition-opacity duration-300 pointer-events-none"></div>

      {/* ... existing hero content ... */}

      {/* Brochure Modal */}
      <DownloadBrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />
    </section>
  );
};
