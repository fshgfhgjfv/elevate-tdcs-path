import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Download, X, CalendarCheck } from "lucide-react";
import type { RefObject } from "react";

const GRADIENT_CLASS = "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";

interface HeroProps {
  showOnInnerPages?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const alertMessage = (message: string, type: 'success' | 'error') => {
  const alertBox = document.getElementById('global-alert-hero');
  if (alertBox) {
    alertBox.textContent = message;
    alertBox.className = `fixed top-4 right-4 z-[9999] p-4 rounded-lg shadow-xl text-white transition-opacity duration-300 opacity-100 ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`;
    setTimeout(() => alertBox.classList.replace('opacity-100', 'opacity-0'), 3000);
  }
};

// ✅ Book Demo Modal
const BookDemoModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alertMessage("Demo booked! We'll contact you shortly (simulated).", "success");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <CalendarCheck className="w-5 h-5 mr-3 text-red-500" />
            Book a Free Demo Session
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
            Schedule a quick 15-minute call with our career counselor.
          </p>
          <input
            type="text"
            placeholder="Your full name"
            required
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="tel"
            placeholder="+91-XXXXXXXXXX"
            required
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-3 font-medium rounded-lg text-white bg-red-600 hover:bg-red-700"
          >
            <CalendarCheck className="w-5 h-5 mr-2" /> Confirm Demo Time
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ Download Brochure Modal
const DownloadBrochureModal = ({ isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alertMessage("Brochure link sent! (simulated).", "success");
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
            <Download className="w-5 h-5 mr-3 text-indigo-500" /> Request Our Brochure
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <input
            type="text"
            placeholder="Your full name"
            required
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <input
            type="email"
            placeholder="email@company.com"
            required
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-3 font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Download className="w-5 h-5 mr-2" /> Download Instantly
          </button>
        </form>
      </div>
    </div>
  );
};

// ✅ Main Hero Component
export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.1 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const cardRefCEO = useRef<HTMLDivElement>(null);
  const cardRefCOO = useRef<HTMLDivElement>(null);
  const cardRefCMO = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent, ref: RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * 0.2);
    y.set(offsetY * 0.2);
  };

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 lg:pt-40 bg-white dark:bg-gray-900 overflow-hidden">
      <div id="global-alert-hero" className="fixed top-4 right-4 z-[9999] opacity-0 transition-opacity duration-300"></div>

      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] bg-[#FF50B3] opacity-10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8C53FF] opacity-10 rounded-full blur-3xl"
          animate={{ scale: [1, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
              The <span className={GRADIENT_CLASS}>Training</span> and Placement platform for your <span className={GRADIENT_CLASS}>career</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl">
              Get job-ready with expert-led courses or join our free hiring drives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/courses">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  View Courses
                </Button>
              </Link>
              <Button size="lg" className="text-lg px-8 py-6 bg-indigo-600 text-white" onClick={() => setIsDemoModalOpen(true)}>
                Book a Demo
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsBrochureModalOpen(true)}
              >
                <Download className="mr-2 h-5 w-5" /> Download Brochure
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN – New Animated Leadership Cards */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-end space-y-6 relative">
            {/* CEO */}
            <motion.div
              ref={cardRefCEO}
              layout
              onMouseMove={(e) => handleMouseMove(e, cardRefCEO)}
              onMouseLeave={() => { x.set(0); y.set(0); }}
              onClick={() => setExpandedCard(expandedCard === 'ceo' ? null : 'ceo')}
              className="relative w-full rounded-2xl shadow-2xl text-white overflow-hidden cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)',
                rotateX, rotateY, transformStyle: "preserve-3d"
              }}
            >
              <motion.div className={`p-8 md:p-10 transition-all ${expandedCard === 'ceo' ? 'scale-105' : 'scale-100'}`}>
                <h3 className="text-3xl font-extrabold mb-1">Dibyajit Ghosh</h3>
                <p className="text-lg">Founder & CEO (Director of TDCS)</p>
                <AnimatePresence>
                  {expandedCard === 'ceo' && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="mt-4 text-sm font-semibold opacity-90">
                      Visionary leader driving future talent.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhQ9heh07dWNTxnm6dhyphenhyphen2rzfxjmA_xS3UXPh3sBCY_B2ywNCfyr8QXWKLsur3PJKzLo-pUsoGmIfTmGl8m7cGmUezdk_RvStMnzxjIstX1S-V6gc2PrG8WkudchJv_c0LuVu0xbO7mUnWh5mWZHMe9THz3dwqCLTN0-2bAoI0k_rynUr6vk2xDdSKi0bM-/s539/WhatsApp_Image_2025-10-26_at_15.56.54_d2e7dc94-removebg-preview.png"
                alt="Dibyajit Ghosh"
                className="absolute -right-6 -bottom-6 w-44 h-44 md:w-52 md:h-52 object-contain opacity-80"
              />
            </motion.div>

            {/* COO + CMO */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              {/* COO */}
              <motion.div
                ref={cardRefCOO}
                layout
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setExpandedCard(expandedCard === 'coo' ? null : 'coo')}
                className="relative p-6 flex-1 rounded-xl shadow-xl text-white overflow-hidden cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #059669, #34D399)' }}
              >
                <h3 className="text-xl font-bold mb-1">Shivam Shing</h3>
                <p className="text-sm mb-3">{expandedCard === 'coo' ? 'Chief Operating Officer' : 'COO'}</p>
                <AnimatePresence>
                  {expandedCard === 'coo' && (
                    <motion.p initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="text-xs font-medium opacity-80">
                      Operational excellence meets innovation.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* CMO */}
              <motion.div
                ref={cardRefCMO}
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setExpandedCard(expandedCard === 'cmo' ? null : 'cmo')}
                className="relative p-6 flex-1 rounded-xl shadow-xl text-white overflow-hidden cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #DC2626, #F87171)' }}
              >
                <h3 className="text-xl font-bold mb-1">Tushar Bhakta</h3>
                <p className="text-sm mb-3">{expandedCard === 'cmo' ? 'Chief Marketing Officer' : 'CMO'}</p>
                <AnimatePresence>
                  {expandedCard === 'cmo' && (
                    <motion.p initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} className="text-xs font-medium opacity-80">
                      Creative strategist shaping brand impact.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      <DownloadBrochureModal isOpen={isBrochureModalOpen} onClose={() => setIsBrochureModalOpen(false)} />
    </section>
  );
};
