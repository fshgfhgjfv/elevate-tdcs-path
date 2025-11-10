import React from 'react';
import { CheckCircle2, X } from "lucide-react";
import { motion } from "framer-motion";

// Helper components simulating Shadcn components using pure Tailwind CSS for a self-contained file.
const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-800 border border-gray-700 rounded-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 border-b border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-bold text-white ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant, size, className = "", onClick }) => {
  let baseStyle = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform active:scale-95 text-center shadow-lg";
  let variantStyle = "";

  // Custom gradient style for primary action (Most Popular)
  if (variant === "gradient") {
    variantStyle = "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-green-500/50";
  } else if (variant === "outline") {
    // Custom outline style for secondary actions
    variantStyle = "bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-700";
  }

  return (
    <div className={`${baseStyle} ${variantStyle} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

// Data Structure (from user input)
const comparisonData = {
    features: [
        { name: "Duration", bugBounty: "3 months", blackHat: "6 months", lite: "15 days" },
        { name: "Price", bugBounty: "₹6,999", blackHat: "₹19,999", lite: "₹499" },
        { name: "EMI Option", bugBounty: "₹2,999/mo", blackHat: "₹4,833/mo", lite: "₹200/5days" },
        { name: "Live Bug Hunting", bugBounty: true, blackHat: false, lite: false },
        { name: "Private Platforms Access", bugBounty: true, blackHat: false, lite: false },
        { name: "CVE Documentation", bugBounty: true, blackHat: false, lite: false },
        { name: "Ethical Hacking", bugBounty: true, blackHat: true, lite: true },
        { name: "Penetration Testing", bugBounty: true, blackHat: true, lite: true },
        { name: "Network Security", bugBounty: true, blackHat: true, lite: true },
        { name: "Web Security", bugBounty: true, blackHat: true, lite: true },
        { name: "Placement Assistance", bugBounty: false, blackHat: true, lite: true },
        { name: "Mock Interviews", bugBounty: false, blackHat: true, lite: true },
        { name: "Resume Preparation", bugBounty: false, blackHat: true, lite: true },
        { name: "Aptitude Training", bugBounty: false, blackHat: true, lite: true },
        { name: "Soft Skills Training", bugBounty: false, blackHat: true, lite: true },
        { name: "Placement Portal", bugBounty: false, blackHat: true, lite: true },
    ],
    courses: [
        {
            id: "bug-hunting-pentest",
            name: "Bug Bounty Hunter Pro",
            tagline: "Master Bug Hunting",
            highlight: "Best for Security Researchers",
            columnKey: "bugBounty",
        },
        {
            id: "cyber-blackhat",
            name: "Cyber Master's Pro Black Hat",
            tagline: "High-Value with Placement",
            highlight: "Most Popular",
            columnKey: "blackHat",
        },
        {
            id: "cyber-lite",
            name: "Cyber Master's Pro Lite",
            tagline: "Essential Starter Skills",
            highlight: "Best Value",
            columnKey: "lite",
        },
    ],
};

// Component to render icons or text values
const FeatureIcon = ({ value }) => {
  if (typeof value === "boolean") {
    return value ? (
      <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto" />
    ) : (
      <X className="w-6 h-6 text-red-400 mx-auto opacity-50" />
    );
  }
  return <span className="font-extrabold text-lg text-yellow-400">{value}</span>;
};


const CourseComparisonTable = () => {
    // In a single-file React component, we replace navigation with a simple log.
    const handleViewCourse = (courseId) => {
        console.log(`ENROLLMENT ACTION: Redirecting to enrollment page for: ${courseId}`);
    };
    
    return (
        <section className="py-16 md:py-24 min-h-screen bg-gray-900 text-gray-100 font-inter">
            {/* Custom CSS for Gradient Header Text and Pulsing Effect */}
            <style jsx>{`
                .gradient-text-header {
                    background-image: linear-gradient(to right, #4ade80, #3b82f6);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
                .bg-gray-850 {
                    background-color: #1a202c; /* Slightly darker than 800 */
                }
                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 10px rgba(74, 222, 128, 0.4), 0 0 0 2px rgba(74, 222, 128, 0.2);
                    }
                    50% {
                        box-shadow: 0 0 20px rgba(74, 222, 128, 0.7), 0 0 0 3px rgba(74, 222, 128, 0.4);
                    }
                }
                .pulsing-border {
                    animation: pulse-glow 2s infinite ease-in-out;
                }
            `}</style>
            
            <div className="container mx-auto px-4 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ type: "spring", damping: 10, stiffness: 50 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-extrabold gradient-text-header mb-4 tracking-tight">
                        Choose Your Cyber Journey
                    </h2>
                    <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                        Compare the curriculum, duration, and placement support across our top Ethical Hacking programs.
                    </p>
                </motion.div>

                {/* Desktop View (Table) */}
                <div className="hidden lg:block overflow-x-auto">
                    <Card className="shadow-2xl shadow-blue-500/20">
                        <CardContent className="p-0">
                            <table className="w-full border-collapse">
                                <thead>
                                    {/* Sticky Header Row */}
                                    <tr className="border-b border-gray-700 bg-gray-850 sticky top-0 z-10">
                                        <th className="p-5 text-left font-bold text-lg text-green-400 w-1/4 min-w-[200px] border-r border-gray-700">
                                            Features
                                        </th>
                                        {comparisonData.courses.map((course, index) => (
                                            <th 
                                                key={course.id} 
                                                className={`p-5 text-center ${index === 1 ? 'bg-gray-700/80 border-x-4 border-green-500/50' : 'bg-gray-800'} transition-all duration-300 hover:bg-gray-700`}
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.15 }}
                                                >
                                                    <div className="mb-2">
                                                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${index === 1 ? 'bg-green-500 text-gray-900 pulsing-border' : 'bg-blue-600/20 text-blue-400'}`}>
                                                            {course.highlight}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-2xl font-extrabold mb-1 text-white">{course.name}</h3>
                                                    <p className="text-sm text-gray-400">{course.tagline}</p>
                                                </motion.div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonData.features.map((feature, index) => (
                                        <motion.tr
                                            key={feature.name}
                                            className="border-b border-gray-800 even:bg-gray-850 hover:bg-gray-700/50 transition-colors"
                                            initial={{ opacity: 0, x: -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.1 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <td className="p-4 font-medium text-gray-300 border-r border-gray-800">{feature.name}</td>
                                            
                                            {comparisonData.courses.map((course) => (
                                                <td 
                                                    key={`${feature.name}-${course.id}`} 
                                                    className={`p-4 text-center border-x border-gray-800 ${course.columnKey === 'blackHat' ? 'bg-gray-700/50 border-x-4 border-green-500/30' : ''}`}
                                                >
                                                    <FeatureIcon value={feature[course.columnKey]} />
                                                </td>
                                            ))}
                                        </motion.tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="border-t border-gray-700">
                                        <td className="p-6 border-r border-gray-700"></td>
                                        {comparisonData.courses.map((course, index) => (
                                            <td key={course.id} className="p-6 text-center">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button
                                                        variant={index === 1 ? "gradient" : "outline"}
                                                        className="w-full text-lg shadow-xl"
                                                        onClick={() => handleViewCourse(course.id)}
                                                    >
                                                        Enroll Now
                                                    </Button>
                                                </motion.div>
                                            </td>
                                        ))}
                                    </tr>
                                </tfoot>
                            </table>
                        </CardContent>
                    </Card>
                </div>

                {/* Mobile View (Cards) */}
                <div className="lg:hidden space-y-8">
                    {comparisonData.courses.map((course, courseIndex) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: courseIndex * 0.1 }}
                            whileHover={{ 
                                scale: 1.02, 
                                boxShadow: courseIndex === 1 ? "0 10px 30px rgba(74, 222, 128, 0.5)" : "0 10px 20px rgba(59, 130, 246, 0.3)"
                            }}
                        >
                            <Card 
                                className={`shadow-2xl ${courseIndex === 1 ? 'shadow-green-500/30 border-green-600' : 'shadow-blue-500/10'}`}
                            >
                                <CardHeader className={`text-center ${courseIndex === 1 ? 'bg-gray-700/50' : ''}`}>
                                    <div className="mb-2">
                                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${courseIndex === 1 ? 'bg-green-500 text-gray-900 pulsing-border' : 'bg-blue-600/20 text-blue-400'}`}>
                                            {course.highlight}
                                        </span>
                                    </div>
                                    <CardTitle className="text-2xl">{course.name}</CardTitle>
                                    <p className="text-base text-gray-400">{course.tagline}</p>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4 mb-6">
                                        {comparisonData.features.map((feature, index) => {
                                            const value = feature[course.columnKey];
                                            return (
                                                <motion.div 
                                                    key={feature.name} 
                                                    className="flex justify-between items-center pb-2 border-b border-gray-800"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, amount: 0.1 }}
                                                    transition={{ delay: index * 0.03 }}
                                                >
                                                    <span className="text-sm font-medium text-gray-300">{feature.name}</span>
                                                    <span className="ml-4">
                                                        <FeatureIcon value={value} />
                                                    </span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                    <Button
                                        variant={courseIndex === 1 ? "gradient" : "outline"}
                                        className="w-full text-lg shadow-xl"
                                        onClick={() => handleViewCourse(course.id)}
                                    >
                                        Enroll Now
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function App() {
    return <CourseComparisonTable />;
}