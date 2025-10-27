import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { DownloadBrochureModal } from "./DownloadBrochureModal"; 

// --- Custom CSS to define and apply the new gradient ---
// NOTE: You must ensure this custom class or style is defined in your main CSS/Tailwind configuration.
// For direct Tailwind application without external CSS, we'll use inline styles/classes that assume
// a setup that supports applying background gradients to text and clipping the text.

const GRADIENT_CLASS = "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";

interface HeroProps {
  showOnInnerPages?: boolean;
}

export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  // Animation variants
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
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 lg:pt-40">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          // MOBILE OPTIMIZATION: Default to 1 column, switch to 3 on large screens
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Main Text, Buttons, and Badges (Takes full width on mobile) */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={itemVariants} className="flex items-center space-x-3">
              {/* Avatars (kept for visual context) */}
              <div className="flex -space-x-2 overflow-hidden">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba65f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student avatar" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student avatar" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student avatar" />
              </div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                35k+ Happy Students
              </p>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold leading-tight">
              {/* Gradient applied to Training and career */}
              The <span className={GRADIENT_CLASS}>Training</span> and Placement platform for your <span className={GRADIENT_CLASS}>career</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-xl">
              Get job-ready with expert-led courses or participate in our free hiring drives.
            </motion.p>
            
            {/* BUTTONS SECTION - Mobile: stack vertically, Sm: side-by-side */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-start mb-6">
                <Link to="/courses">
                    <Button variant="gradient" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto">
                        View Courses
                    </Button>
                </Link>
                {/* Download Brochure Button */}
                <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 w-full sm:w-auto border-2"
                    onClick={() => setIsBrochureModalOpen(true)}
                >
                    <Download className="mr-2 h-5 w-5" />
                    Download Brochure
                </Button>
            </motion.div>

            {/* Recognition Badges - Uses flex-wrap for mobile responsiveness */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap gap-4 md:gap-8 items-center pt-4"
            >
                {/* Badges... (content remains the same) */}
                 <div className="w-24 h-10 bg-white dark:bg-gray-800 flex items-center justify-center rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                    <span className="text-blue-700 font-extrabold text-base">in</span> LinkedIn<br/>TOP
                    </span>
                </div>
                <div className="w-32 h-10 bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                    <span className="text-2xl font-bold text-black dark:text-white">Y</span>
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">Combinator</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <span className="text-lg font-serif mr-1">💡</span> By IIT Delhi Alumni
                </div>
            </motion.div>
          </div>

          {/* Right Column: Courses and Jobs Cards (Will stack under the left column on mobile) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Courses Card */}
            <motion.div
              variants={itemVariants}
              className="relative p-6 md:p-8 rounded-xl shadow-lg text-white overflow-hidden" 
              style={{ background: 'linear-gradient(135deg, #4F46E5, #3B82F6)' }}
            >
              <h3 className="text-2xl font-bold mb-3">COURSES</h3>
              <p className="mb-6 z-10 relative">Industry Ready Training to get you placed!</p>
              <Link to="/courses">
                <Button variant="outline" size="lg" className="text-lg px-6 bg-white text-blue-600 hover:bg-gray-100 z-10 relative">
                  View Courses ↗
                </Button>
              </Link>
              {/* Image position adjusted for responsive safety */}
              <motion.img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFV4OWyD-dpHkkEFbAGYgoOAim674uDerzeBvx37rp3dl6VHIsIkbWtVaaoR4GWqdA-MW0UJpRs9VBkZO-mIeHQMrSCOoamOXHXoGopFkAVHRdo3sdIKbuameNOQCAcCWlm8EkgqTNKZ0nn1tT-Ov7QuLmGYVG_xIBVCTG454m9rfwSRdtlBWGAuY4DSjc/s539/WhatsApp_Image_2025-10-26_at_15.56.54_d2e7dc94-removebg-preview.png"
                alt="Student for Courses"
                className="absolute -right-8 -bottom-8 h-48 w-48 md:h-64 md:w-64 object-cover"
                whileHover={{ scale: 1.1 }}
                whileFocus={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Jobs Card */}
            <motion.div
              variants={itemVariants}
              className="relative p-6 md:p-8 rounded-xl shadow-lg text-white overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)' }}
            >
              <h3 className="text-2xl font-bold mb-3">JOBS</h3>
              <p className="mb-6 z-10 relative">If you're skilled, get hired directly with our FREE verified hiring drives!</p>
              <Link to="/hiring-drives">
                <Button variant="outline" size="lg" className="text-lg px-6 bg-white text-purple-600 hover:bg-gray-100 z-10 relative">
                  View Hiring Drives ↗
                </Button>
              </Link>
              <motion.img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQ0tEjYMM5XfgAEUIFghZDgQ4qlL_i_RB2GbVyMg_xapb65wtrHWPKPOVDc2XnlAb3SurAPLjxcwTj-0v0ZtYJtoNOW8KKw69-323EdcSAM1v2sa8Vib4hMYUwNi8CE3vDP60ABkr__xPG3PXGW2On3wFSQ2J4pNZKxnBdik0U1ki5IltqyhKi5xTrjRB7/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png"
                alt="Student for Jobs"
                className="absolute -right-8 -bottom-8 h-48 w-48 md:h-64 md:w-64 object-cover"
                whileHover={{ scale: 1.1 }}
                whileFocus={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Download Brochure Modal */}
      <DownloadBrochureModal 
        isOpen={isBrochureModalOpen} 
        onClose={() => setIsBrochureModalOpen(false)} 
      />
    </section>
  );
};