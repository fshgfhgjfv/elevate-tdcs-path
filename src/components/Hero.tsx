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

// 1. Splitting the headline into words for individual animation (retained from previous iteration)
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

// --- Main Component ---
export const Hero = ({ showOnInnerPages = true }: HeroProps) => {
    const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
    const heroRef = useRef(null);
    const isInView = useInView(heroRef, { once: true, amount: 0.1 });

    // Framer Motion 3D Tilt/Parallax values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    // Card refs for 3D effect (updated for new cards)
    const cardRefCEO = useRef(null);
    const cardRefCOO = useRef(null);
    const cardRefCMO = useRef(null);

    // Original Animation variants (for sections other than headline)
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
    // We'll use this handler on all three cards
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, cardRef: React.RefObject<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        x.set(offsetX * 0.2);
        y.set(offsetY * 0.2);
    };

    return (
        <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:pt-32 lg:pt-40 bg-white dark:bg-gray-900 overflow-hidden">
             {/* Animated Background/Overlay (Glow retained) */}
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
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Left Column: Main Text, Buttons, and Badges (REMAINS THE SAME) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Avatars and Happy Students Count */}
                        <motion.div variants={itemVariants} className="flex items-center space-x-3">
                            <div className="flex -space-x-2 overflow-hidden">
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://images.unsplash.com/photo-1491528323818-fdd1faba65f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student avatar" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student avatar" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Student avatar" />
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
                                <motion.span key={index} variants={wordItemVariants} className="inline-block mr-2" style={{ perspective: 1000 }}>
                                    {word === 'Training' || word === 'career' ? (
                                        <span className={GRADIENT_CLASS}>{word}</span>
                                    ) : (
                                        word
                                    )}
                                </motion.span>
                            ))}
                        </motion.h1>

                        {/* Subheading and Buttons */}
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-xl">
                            Get job-ready with expert-led courses or participate in our free hiring drives.
                        </motion.p>
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
                                <Download className="mr-2 h-5 w-5 animate-bounce-slow" />
                                Download Brochure
                            </Button>
                        </motion.div>

                        {/* Recognition Badges */}
                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-wrap gap-4 md:gap-8 items-center pt-4"
                        >
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

                    {/* Right Column: Tiered Leadership Cards (NEW STRUCTURE) */}
                    <div className="lg:col-span-1 space-y-4 flex flex-col items-center lg:items-end">
                        
                        {/* 1. CEO Card (Larger, Blue Gradient, Centered on mobile) */}
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
                            <h3 className="text-3xl font-extrabold mb-2 z-10 relative">Rudra Narayan</h3>
                            <p className="text-lg mb-6 z-10 relative">CEO & Founder (IIT Delhi Alumnus)</p>
                            <Button variant="outline" size="lg" className="text-base px-6 bg-white text-blue-700 hover:bg-gray-100 z-10 relative">
                                Connect on LinkedIn 🔗
                            </Button>
                            
                            {/* CEO Image - Larger and positioned for impact */}
                            <motion.img
                                src="https://i.ibb.co/L8dY8g0/rudra-narayan-CEO.png" // Placeholder URL for CEO
                                alt="Rudra Narayan, CEO"
                                className="absolute -right-4 -bottom-4 h-56 w-56 md:h-72 md:w-72 object-cover opacity-80 z-0"
                                style={{ x: useTransform(x, [-100, 100], [10, -10]), y: useTransform(y, [-100, 100], [10, -10]), transformStyle: "preserve-3d" }}
                            />
                        </motion.div>

                        {/* 2. COO & CMO Cards (Smaller, Side-by-Side on wide screens, Stacked on mobile) */}
                        <div className="flex flex-row gap-4 w-full">
                            
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
                                <h3 className="text-xl font-bold mb-1 z-10 relative">Priya Verma</h3>
                                <p className="text-sm mb-4 z-10 relative">Chief Operating Officer</p>
                                <motion.img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
                                    alt="COO"
                                    className="absolute -right-4 -bottom-4 h-24 w-24 object-cover opacity-70 z-0"
                                    style={{ x: useTransform(x, [-100, 100], [5, -5]), y: useTransform(y, [-100, 100], [5, -5]), transformStyle: "preserve-3d" }}
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
                                <h3 className="text-xl font-bold mb-1 z-10 relative">Anil Sharma</h3>
                                <p className="text-sm mb-4 z-10 relative">Chief Marketing Officer</p>
                                <motion.img
                                    src="https://images.unsplash.com/photo-1560250097-fb5c6d36e2f6?w=200&h=200&fit=crop"
                                    alt="CMO"
                                    className="absolute -right-4 -bottom-4 h-24 w-24 object-cover opacity-70 z-0"
                                    style={{ x: useTransform(x, [-100, 100], [5, -5]), y: useTransform(y, [-100, 100], [5, -5]), transformStyle: "preserve-3d" }}
                            />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Download Brochure Modal (RETAINS ORIGINAL FUNCTIONALITY) */}
            <DownloadBrochureModal 
                isOpen={isBrochureModalOpen} 
                onClose={() => setIsBrochureModalOpen(false)} 
            />
        </section>
    );
};