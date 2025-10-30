import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// Import advanced hooks for 3D/parallax effects
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { Download, X } from "lucide-react"; 
import type { RefObject } from "react"; // Explicitly import RefObject type for clarity

// --- Custom CSS to define and apply the new gradient ---
const GRADIENT_CLASS = "text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A3C] via-[#FF50B3] to-[#8C53FF]";

interface HeroProps {
    showOnInnerPages?: boolean;
}

interface DownloadBrochureModalProps {
    isOpen: boolean;
    onClose: () => void;
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

// --- DownloadBrochureModal Component (INTEGRATED) ---
// FIXED: Added explicit prop typing (DownloadBrochureModalProps)
const DownloadBrochureModal = ({ isOpen, onClose }: DownloadBrochureModalProps) => {
    if (!isOpen) return null;

    // Helper function to show a temporary notification instead of alert()
    const alertMessage = (message: string, type: 'success' | 'error') => {
        const alertBox = document.getElementById('global-alert-hero');
        if (alertBox) {
            alertBox.textContent = message;
            alertBox.className = `fixed top-4 right-4 z-[9999] p-4 rounded-lg shadow-xl text-white transition-opacity duration-300 opacity-100 ${
                type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`;
            setTimeout(() => {
                // Ensure opacity is properly animated out
                alertBox.className = alertBox.className.replace('opacity-100', 'opacity-0');
            }, 3000);
        }
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Simulate brochure download logic
        console.log("Form Submitted for brochure download.");
        alertMessage("Thank you! Your brochure download link has been sent to your email (simulated).", "success");
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                        <Download className="w-5 h-5 mr-3 text-indigo-500" />
                        Request Our Full Brochure
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
                        Fill out the form to instantly receive a PDF brochure detailing our programs, placements, and pricing.
                    </p>
                    
                    <div>
                        <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="modal-name"
                            name="name"
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                            placeholder="Your full name"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Work Email
                        </label>
                        <input
                            type="email"
                            id="modal-email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition"
                            placeholder="email@company.com"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
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
    // Use useInView to trigger animations when the component scrolls into view
    const isInView = useInView(heroRef, { once: true, amount: 0.1 });

    // Framer Motion 3D Tilt/Parallax values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]); // Map y movement to X rotation
    const rotateY = useTransform(x, [-100, 100], [-10, 10]); // Map x movement to Y rotation

    // Card refs for 3D effect
    const cardRefCEO: RefObject<HTMLDivElement> = useRef(null);
    const cardRefCOO: RefObject<HTMLDivElement> = useRef(null);
    const cardRefCMO: RefObject<HTMLDivElement> = useRef(null);

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
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cardRef: RefObject<HTMLDivElement>) => {
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

    return (
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 lg:pt-40 bg-white dark:bg-gray-900 overflow-hidden">
            {/* ALERT PLACEHOLDER: Used by the integrated DownloadBrochureModal for success messages */}
            <div id="global-alert-hero" className="fixed top-4 right-4 z-[9999] opacity-0 transition-opacity duration-300 pointer-events-none"></div>

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
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://i.pinimg.com/736x/9c/2a/81/9c2a81633cffd91adf5354958f50f3be.jpg" alt="Student avatar" />
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

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl">
                            Get job-ready with expert-led courses or participate in our free hiring drives.
                        </motion.p>
                        
                        {/* BUTTONS SECTION */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-start mb-6">
                            {/* 1. View Courses (Primary Gradient CTA) - Assuming 'variant="gradient"' is defined in Button component */}
                            <Link to="/courses">
                                <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
                                    View Courses
                                </Button>
                            </Link>

                            {/* 2. Book a Demo (New Secondary Solid CTA) */}
                            <Link to="/demo">
                                <Button size="lg" className="text-lg px-8 py-6 w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow bg-indigo-600 text-white hover:bg-indigo-700">
                                    Book a Demo
                                </Button>
                            </Link>
                            
                            {/* 3. Download Brochure (Outline Secondary CTA) */}
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

                        {/* Recognition Badges */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-wrap gap-4 md:gap-8 items-center pt-4"
                        >
                            <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">
                                Trusted by thousands of students globally.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column: Tiered Leadership Cards */}
                    <div className="lg:col-span-1 space-y-4 flex flex-col items-center lg:items-end">
                        
                        {/* 1. CEO Card (Larger, Blue Gradient, Centered on mobile) - MODIFIED: Removed LinkedIn Button */}
                        <motion.div
                            ref={cardRefCEO}
                            variants={itemVariants}
                            className="relative p-8 md:p-10 w-full rounded-2xl shadow-2xl text-white overflow-hidden cursor-pointer will-change-transform" 
                            style={{ 
                                background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', // Strong blue gradient
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d" 
                            }}
                            onMouseMove={(e) => handleMouseMove(e, cardRefCEO)}
                            onMouseLeave={() => { x.set(0); y.set(0); }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        >
                            <h3 className="text-3xl font-extrabold mb-2 z-10 relative">Dibyajit Ghosh </h3>
                            <p className="text-lg mb-6 z-10 relative">CEO & Founder (Director of TDCS )</p>
                            {/* Removed: Connect on LinkedIn button */}
                            <p className="text-sm font-semibold opacity-80 z-10 relative">
                                Visionary leader driving future talent.
                            </p>
                            
                            {/* CEO Image - Larger and positioned for impact */}
                            <motion.img
                                // Placeholder image for CEO
                                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhhQ9heh07dWNTxnm6dhyphenhyphen2rzfxjmA_xS3UXPh3sBCY_B2ywNCfyr8QXWKLsur3PJKzLo-pUsoGmIfTmGl8m7cGmUezdk_RvStMnzxjIstX1S-V6gc2PrG8WkudchJv_c0LuVu0xbO7mUnWh5mWZHMe9THz3dwqCLTN0-2bAoI0k_rynUr6vk2xDdSKi0bM-/s539/WhatsApp_Image_2025-10-26_at_15.56.54_d2e7dc94-removebg-preview.png" 
                                alt="Dibyajit Ghosh"
                                // Ensure image styles match the updated variable usage
                                className="absolute -right-4 -bottom-3 h-46 w-56 md:h-22 md:w-52 object-cover opacity-80 z-0"
                                style={{ 
                                    x: useTransform(x, [-100, 100], [10, -10]), 
                                    y: useTransform(y, [-100, 100], [10, -10]), 
                                    transformStyle: "preserve-3d" 
                                }}
                            />
                        </motion.div>

                        {/* 2. COO & CMO Cards (Smaller, Side-by-Side on wide screens, Stacked on mobile) */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            
                            {/* COO Card */}
                            <motion.div
                                ref={cardRefCOO}
                                variants={itemVariants}
                                className="relative p-5 md:p-6 flex-1 min-w-0 rounded-xl shadow-lg text-white overflow-hidden cursor-pointer will-change-transform"
                                style={{ 
                                    background: 'linear-gradient(135deg, #059669, #34D399)', // Green gradient
                                    rotateX: useTransform(y, [-100, 100], [5, -5]), // Subtle rotation
                                    rotateY: useTransform(x, [-100, 100], [-5, 5]),
                                    transformStyle: "preserve-3d" 
                                }}
                                onMouseMove={(e) => handleMouseMove(e, cardRefCOO)}
                                onMouseLeave={() => { x.set(0); y.set(0); }}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            >
                                <h3 className="text-xl font-bold mb-1 z-10 relative">Shivam Shing</h3>
                                <p className="text-sm mb-4 z-10 relative">Chief Operating Officer</p>
                                <motion.img
                                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh68HDmzQ4YTj9g9soRrkq-eHc9cAfbC03ZOXSClA19NofdsJ2lzm2A29d2qxG3xXSUfuEVl-sGEVnkokdgS6snQn86My-Bekn2MLrF135mZPHpwXfsLg1XxhFaClj1Uebgi6IcxeseCR6rvwc3vg6IgYUm8voolffwjQhcY4haMotxomzPVjfJm7ylnHdF/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png"
                                    alt="COO"
                                    className="absolute -right-4 -bottom-4 h-34 w-24 object-cover opacity-70 z-0"
                                    style={{ 
                                        x: useTransform(x, [-100, 100], [5, -5]), 
                                        y: useTransform(y, [-100, 100], [5, -5]), 
                                        transformStyle: "preserve-3d" 
                                    }}
                                />
                            </motion.div>

                            {/* CMO Card */}
                            <motion.div
                                ref={cardRefCMO}
                                variants={itemVariants}
                                className="relative p-5 md:p-6 flex-1 min-w-0 rounded-xl shadow-lg text-white overflow-hidden cursor-pointer will-change-transform"
                                style={{ 
                                    background: 'linear-gradient(135deg, #DC2626, #F87171)', // Red gradient
                                    rotateX: useTransform(y, [-100, 100], [5, -5]), // Subtle rotation
                                    rotateY: useTransform(x, [-100, 100], [-5, 5]),
                                    transformStyle: "preserve-3d" 
                                }}
                                onMouseMove={(e) => handleMouseMove(e, cardRefCMO)}
                                onMouseLeave={() => { x.set(0); y.set(0); }}
                                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                            >
                                <h3 className="text-xl font-bold mb-1 z-10 relative">Tushar Bhakta</h3>
                                <p className="text-sm mb-4 z-10 relative">Chief Marketing Officer</p>
                                <motion.img
                                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh68HDmzQ4YTj9g9soRrkq-eHc9cAfbC03ZOXSClA19NofdsJ2lzm2A29d2qxG3xXSUfuEVl-sGEVnkokdgS6snQn86My-Bekn2MLrF135mZPHpwXfsLg1XxhFaClj1Uebgi6IcxeseCR6rvwc3vg6IgYUm8voolffwjhcy4haMotxomzPVjfJm7ylnHdF/s500/WhatsApp_Image_2025-10-26_at_15.47.33_7e411be4-removebg-preview.png"
                                    alt="CMO"
                                    className="absolute -right-4 -bottom-4 h-24 w-24 object-cover opacity-70 z-0"
                                    style={{ 
                                        x: useTransform(x, [-100, 100], [5, -5]), 
                                        y: useTransform(y, [-100, 100], [5, -5]), 
                                        transformStyle: "preserve-3d" 
                                    }}
                                />
                            </motion.div>
                        </div>
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
