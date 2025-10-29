import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// Import advanced hooks for 3D/parallax effects
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { Download } from "lucide-react";
import { DownloadBrochureModal } from "./DownloadBrochureModal";

// --- Custom CSS to define and apply the new gradient ---
const GRADIENT_CLASS = "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";

interface HeroProps {
  showOnInnerPages?: boolean;
}

// 1. Splitting the headline into words for individual animation
const headline = "The Training and Placement platform for your career";
const words = headline.split(" ");

// Word-by-word animation variants
const wordContainerVariants = {
    visible: {
        transition: {
            staggerChildren: 0.04, // Stagger effect for words
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
    // Use useInView to trigger animations when the component scrolls into view
    const isInView = useInView(heroRef, { once: true, amount: 0.1 });

    // Framer Motion 3D Tilt/Parallax values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]); // Map y movement to X rotation
    const rotateY = useTransform(x, [-100, 100], [-10, 10]); // Map x movement to Y rotation

    // --- Original Animation variants (for sections other than headline) ---
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

    // Card mouse move handler for 3D effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cardRef: React.RefObject<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = e.clientX - centerX; // Mouse X offset from center
        const offsetY = e.clientY - centerY; // Mouse Y offset from center

        // Set motion values scaled down for a subtle effect
        x.set(offsetX * 0.2);
        y.set(offsetY * 0.2);
    };

    const cardRefCourses = useRef(null);
    const cardRefJobs = useRef(null);

    return (
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 lg:pt-40 bg-white dark:bg-gray-900 overflow-hidden">
            {/* 2. Animated Background/Overlay (Subtle Glow/Blob) */}
            <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
                <motion.div
                    className="absolute w-[600px] h-[600px] bg-[#FF50B3] opacity-10 rounded-full blur-3xl"
                    initial={{ x: -200, y: -200 }}
                    animate={{ x: 0, y: 0, scale: [1, 1.05, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                />
                <motion.div
                    className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8C53FF] opacity-10 rounded-full blur-3xl"
                    initial={{ x: 200, y: 200 }}
                    animate={{ x: 0, y: 0, scale: [1, 0.95, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
                />
            </div>
            
            <div className="container mx-auto px-4 z-10">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"} // Animate when in view
                >
                    {/* Left Column: Main Text, Buttons, and Badges (Takes full width on mobile) */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div variants={itemVariants} className="flex items-center space-x-3">
                            {/* Avatars */}
                            <div className="flex -space-x-2 overflow-hidden">
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFV4OWyD-dpHkkEFbAGYgoOAim674uDerzeBvx37rp3dl6VHIsIkbWtVaaoR4GWqdA-MW0UJpRs9VBkZO-mIeHQMrSCOoamOXHXoGopFkAVHRdo3sdIKbuameNOQCAcCWlm8EkgqTNKZ0nn1tT-Ov7QuLmGYVG_xIBVCTG454m9rfwSRdtlBWGAuY4DSjc/s539/WhatsApp_Image_2025-10-26_at_15.56.54_d2e7dc94-removebg-preview.png" alt="Student avatar" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student avatar" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student avatar" />
                            </div>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                35k+ Happy Students
                            </p>
                        </motion.div>

                        <motion.h1 
                            variants={wordContainerVariants} 
                            animate={isInView ? "visible" : "hidden"}
                            className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white"
                        >
                            {/* 3. Word-by-Word Headline Animation */}
                            {words.map((word, index) => (
                                <motion.span key={index} variants={wordItemVariants} className="inline-block mr-2" style={{ perspective: 1000 }}>
                                    {/* Apply gradient only to 'Training' and 'career' */}
                                    {word === 'Training' || word === 'career' ? (
                                        <span className={GRADIENT_CLASS}>{word}</span>
                                    ) : (
                                        word
                                    )}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-xl">
                            Get job-ready with expert-led courses or participate in our free hiring drives.
                        </motion.p>
                        
                        {/* BUTTONS SECTION */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-start mb-6">
                            <Link to="/courses">
                                <Button variant="gradient" size="lg" className="text-lg px-8 py-6 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                                    View Courses
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-lg px-8 py-6 w-full sm:w-auto border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsBrochureModalOpen(true)}
                            >
                                <Download className="mr-2 h-5 w-5 animate-bounce-slow" /> {/* Added a subtle icon animation */}
                                Download Brochure
                            </Button>
                        </motion.div>

                        {/* Recognition Badges - Simplified animation for responsiveness */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-wrap gap-4 md:gap-8 items-center pt-4"
                        >
                            {/* Badges... (content remains the same) */}
                            <div className="w-24 h-10 bg-white dark:bg-gray-800 flex items-center justify-center rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02]">
                                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                                    <span className="text-blue-700 font-extrabold text-base">in</span> LinkedIn<br/>TOP
                                </span>
                            </div>
                            <div className="w-32 h-10 bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-transform hover:scale-[1.02]">
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
                        
                        {/* Courses Card with 3D Tilt Effect */}
                        <motion.div
                            ref={cardRefCourses}
                            variants={itemVariants}
                            className="relative p-6 md:p-8 rounded-xl shadow-2xl text-white overflow-hidden cursor-pointer will-change-transform" 
                            style={{ 
                                background: 'linear-gradient(135deg, #4F46E5, #3B82F6)', 
                                rotateX, // Apply the rotation X motion value
                                rotateY, // Apply the rotation Y motion value
                                transformStyle: "preserve-3d" // Essential for 3D effect
                            }}
                            onMouseMove={(e) => handleMouseMove(e, cardRefCourses)}
                            onMouseLeave={() => { x.set(0); y.set(0); }} // Reset tilt on mouse leave
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        >
                            <h3 className="text-2xl font-bold mb-3 z-10 relative">COURSES</h3>
                            <p className="mb-6 z-10 relative">Industry Ready Training to get you placed!</p>
                            <Link to="/courses">
                                <Button variant="outline" size="lg" className="text-lg px-6 bg-white text-blue-600 hover:bg-gray-100 z-10 relative">
                                    View Courses ↗
                                </Button>
                            </Link>
                            {/* Image position and parallax effect */}
                            <motion.img
                                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiFV4OWyD-dpHkkEFbAGYgoOAim674uDerzeBvx37rp3dl6VHIsIkbWtVaaoR4GWqdA-MW0UJpRs9VBkZO-mIeHQMrSCOoamOXHXoGopFkAVHRdo3sdIKbuameNOQCAcCWlm8EkgqTNKZ0nn1tT-Ov7QuLmGYVG_xIBVCTG454m9rfwSRdtlBWGAuY4DSjc/s539/WhatsApp_Image_2025-10-26_at_15.56.54_d2e7dc94-removebg-preview.png"
                                alt="Student for Courses"
                                className="absolute -right-8 -bottom-8 h-48 w-48 md:h-64 md:w-64 object-cover z-0"
                                style={{ x: useTransform(x, [-100, 100], [10, -10]), y: useTransform(y, [-100, 100], [10, -10]), transformStyle: "preserve-3d" }} // Parallax effect
                            />
                        </motion.div>

                        {/* Jobs Card with 3D Tilt Effect (using different refs/values for independence) */}
                        <motion.div
                            ref={cardRefJobs}
                            variants={itemVariants}
                            className="relative p-6 md:p-8 rounded-xl shadow-2xl text-white overflow-hidden cursor-pointer will-change-transform"
                            style={{ 
                                background: 'linear-gradient(135deg, #A855F7, #EC4899)',
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d"
                            }}
                            onMouseMove={(e) => handleMouseMove(e, cardRefJobs)}
                            onMouseLeave={() => { x.set(0); y.set(0); }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        >
                            <h3 className="text-2xl font-bold mb-3 z-10 relative">JOBS</h3>
                            <p className="mb-6 z-10 relative">If you're skilled, get hired directly with our FREE verified hiring drives!</p>
                            <Link to="/hiring-drives">
                                <Button variant="outline" size="lg" className="text-lg px-6 bg-white text-purple-600 hover:bg-gray-100 z-10 relative">
                                    View Hiring Drives ↗
                                </Button>
                            </Link>
                            <motion.img
                                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQ0tEjYMM5XfgAEUIFghZDgQ4qlL_i_RB2GbVyMg_xapb65wtrHWPKPOVDc2XnlAb3SurAPLjxcwTj-0v0ZtYJtoNOW8KKw69-323EdcSAM1v2sa8Vib4hMYUwNi8CE3vDP60ABkr__xPG3PXGW2On3wFSQ2J4pNZKxnBdik0U1ki5IltqyhKi5xTrjRB7/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png"
                                alt="Student for Jobs"
                                className="absolute -right-8 -bottom-8 h-48 w-48 md:h-64 md:w-64 object-cover z-0"
                                style={{ x: useTransform(x, [-100, 100], [10, -10]), y: useTransform(y, [-100, 100], [10, -10]), transformStyle: "preserve-3d" }} // Parallax effect
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