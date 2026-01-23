import React, { useState, useEffect } from "react";
import { 
  Shield, LogOut, BookOpen, Users, 
  MoreVertical, Edit, Wifi, Loader2, CheckCircle, Lock, 
  AlertTriangle, XCircle, Save, ArrowLeft, Plus, Trash2, FileText, DollarSign, HelpCircle, List
} from 'lucide-react';

// --- 1. EXPANDED MOCK DATA ---

const INITIAL_COURSES = [
  { 
    id: 1, 
    title: "Cyber Master's Pro Black-Hat Lite", 
    description: "Foundational ethical hacking & network security program for beginners.", 
    price: 499, 
    mode: "Live Online",
    students: 120,
    slug: "cyber-lite",
    // Detailed Data for Editing
    curriculum: [
        { title: "Introduction to Hacking", lessons: ["Setting up Lab", "Linux Basics", "Networking 101"] },
        { title: "Network Security", lessons: ["NMAP Scanning", "Wireshark Analysis"] }
    ],
    faqs: [
        { q: "Is this for beginners?", a: "Yes, absolutely no prior experience required." },
        { q: "Do I get a certificate?", a: "Yes, upon 80% completion." }
    ]
  },
  { 
    id: 2, 
    title: "Cyber Master's Pro Black Hat", 
    description: "Advanced program covering exploit dev, malware analysis, red teaming & advanced pentesting.", 
    price: 19999, 
    mode: "Live Online",
    students: 45,
    slug: "black-hat-pro",
    curriculum: [
        { title: "Advanced Exploit Dev", lessons: ["Buffer Overflows", "Shellcoding", "Fuzzing"] },
        { title: "Red Teaming", lessons: ["Active Directory Attacks", "C2 Infrastructure"] }
    ],
    faqs: [
        { q: "Is Python required?", a: "Yes, intermediate Python skills are needed." }
    ]
  },
  { 
    id: 3, 
    title: "Bug Hunting & Penetration Testing", 
    description: "Professional bug bounty hunting methodologies and web application penetration testing.", 
    price: 6999, 
    mode: "Live Online",
    students: 85,
    slug: "bug-bounty",
    curriculum: [
        { title: "Web Vulnerabilities", lessons: ["XSS", "SQL Injection", "CSRF"] },
        { title: "Report Writing", lessons: ["CVSS Scoring", "Writing Professional Reports"] }
    ],
    faqs: []
  },
];

const useToast = () => {
  const toast = (props) => {
    const style = props.variant === "destructive" ? "bg-red-600" : "bg-emerald-600";
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-2xl z-50 text-white flex flex-col gap-1 min-w-[300px] animate-slideIn ${style}`;
    notification.innerHTML = `<span class="font-bold">${props.title}</span><span class="text-sm opacity-90">${props.description || ''}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };
  return { toast };
};

// --- 2. EDITOR COMPONENTS ---

const CourseEditor = ({ course, onSave, onCancel }) => {
    const [activeTab, setActiveTab] = useState("general");
    const [formData, setFormData] = useState({ ...course });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // --- Curriculum Handlers ---
    const addModule = () => {
        setFormData(prev => ({
            ...prev,
            curriculum: [...(prev.curriculum || []), { title: "New Module", lessons: [] }]
        }));
    };
    const updateModuleTitle = (idx, newTitle) => {
        const newCurriculum = [...formData.curriculum];
        newCurriculum[idx].title = newTitle;
        setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
    };

    // --- FAQ Handlers ---
    const addFAQ = () => {
        setFormData(prev => ({
            ...prev,
            faqs: [...(prev.faqs || []), { q: "New Question", a: "New Answer" }]
        }));
    };
    const updateFAQ = (idx, field, value) => {
        const newFAQs = [...formData.faqs];
        newFAQs[idx][field] = value;
        setFormData(prev => ({ ...prev, faqs: newFAQs }));
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen pb-20">
            {/* Header */}
            <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Editing: {course.slug}</h2>
                        <span className="text-xs text-gray-500">Changes will reflect immediately on dashboard</span>
                    </div>
                </div>
                <button 
                    onClick={() => onSave(formData)}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors"
                >
                    <Save className="w-4 h-4" /> Save Changes
                </button>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">
                {/* Sidebar Navigation */}
                <div className="w-64 flex-shrink-0 space-y-2">
                    <TabButton active={activeTab === "general"} onClick={() => setActiveTab("general")} icon={<FileText className="w-4 h-4" />} label="General Details" />
                    <TabButton active={activeTab === "pricing"} onClick={() => setActiveTab("pricing")} icon={<DollarSign className="w-4 h-4" />} label="Pricing & Plans" />
                    <TabButton active={activeTab === "curriculum"} onClick={() => setActiveTab("curriculum")} icon={<List className="w-4 h-4" />} label="Curriculum" />
                    <TabButton active={activeTab === "faq"} onClick={() => setActiveTab("faq")} icon={<HelpCircle className="w-4 h-4" />} label="FAQ & Support" />
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                    
                    {/* 1. General Tab (simulates CourseCard.tsx) */}
                    {activeTab === "general" && (
                        <div className="space-y-6 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Information</h3>
                            <InputGroup label="Course Title" value={formData.title} onChange={(v) => handleInputChange("title", v)} />
                            <InputGroup label="Description" value={formData.description} onChange={(v) => handleInputChange("description", v)} type="textarea" />
                            <InputGroup label="Slug (URL)" value={formData.slug} onChange={(v) => handleInputChange("slug", v)} />
                            <InputGroup label="Mode" value={formData.mode} onChange={(v) => handleInputChange("mode", v)} />
                        </div>
                    )}

                    {/* 2. Pricing Tab (simulates CoursePricing.tsx) */}
                    {activeTab === "pricing" && (
                        <div className="space-y-6 animate-fadeIn">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pricing Configuration</h3>
                            <InputGroup label="Price (INR)" value={formData.price} onChange={(v) => handleInputChange("price", parseInt(v) || 0)} type="number" />
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <p className="text-sm text-blue-800 dark:text-blue-200">
                                    Current Enrolled Students: <strong>{formData.students}</strong>
                                </p>
                            </div>
                        </div>
                    )}

                    {/* 3. Curriculum Tab (simulates CourseCurriculum.tsx) */}
                    {activeTab === "curriculum" && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Curriculum</h3>
                                <button onClick={addModule} className="text-sm flex items-center gap-1 text-blue-500 hover:text-blue-400">
                                    <Plus className="w-4 h-4" /> Add Module
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {formData.curriculum?.map((module, idx) => (
                                    <div key={idx} className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <label className="text-xs text-gray-500 uppercase font-bold">Module {idx + 1} Title</label>
                                        <input 
                                            value={module.title}
                                            onChange={(e) => updateModuleTitle(idx, e.target.value)}
                                            className="w-full mt-1 bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-blue-500 outline-none text-gray-900 dark:text-white font-medium p-2"
                                        />
                                        <div className="mt-2 text-xs text-gray-400 pl-2">
                                            {module.lessons.length} Lessons configured (Edit details in JSON mode)
                                        </div>
                                    </div>
                                ))}
                                {(!formData.curriculum || formData.curriculum.length === 0) && <p className="text-gray-500 italic">No modules configured.</p>}
                            </div>
                        </div>
                    )}

                    {/* 4. FAQ Tab (simulates CourseFAQ.tsx) */}
                    {activeTab === "faq" && (
                        <div className="space-y-6 animate-fadeIn">
                             <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
                                <button onClick={addFAQ} className="text-sm flex items-center gap-1 text-blue-500 hover:text-blue-400">
                                    <Plus className="w-4 h-4" /> Add Question
                                </button>
                            </div>
                            <div className="space-y-4">
                                {formData.faqs?.map((faq, idx) => (
                                    <div key={idx} className="bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
                                        <input 
                                            value={faq.q}
                                            onChange={(e) => updateFAQ(idx, "q", e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-800 rounded p-2 text-sm text-gray-900 dark:text-white border border-transparent focus:border-blue-500 outline-none"
                                            placeholder="Question"
                                        />
                                        <textarea 
                                            value={faq.a}
                                            onChange={(e) => updateFAQ(idx, "a", e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-gray-800 rounded p-2 text-sm text-gray-600 dark:text-gray-300 border border-transparent focus:border-blue-500 outline-none h-20"
                                            placeholder="Answer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper Components for Editor
const TabButton = ({ active, onClick, icon, label }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            active 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
    >
        {icon}
        {label}
    </button>
);

const InputGroup = ({ label, value, onChange, type = "text" }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</label>
        {type === "textarea" ? (
            <textarea 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
            />
        ) : (
            <input 
                type={type} 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
        )}
    </div>
);


// --- 3. LOGIN SCREEN (UNCHANGED LOGIC) ---
const LoginScreen = ({ handleLogin, isLoading }) => {
    // [Login Screen Code kept identical to previous secure version]
    // Repeating logic for completeness of single-file
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verifyingEmail, setVerifyingEmail] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const { toast } = useToast();
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [lockoutTimer, setLockoutTimer] = useState(0);

    const AUTHORIZED_EMAIL = "admin@tdcs.com";
    const AUTHORIZED_CODE = "710003";
    const AUTHORIZED_PASS = "password123";
    const MAX_ATTEMPTS = 4;
    const LOCKOUT_DURATION = 120;

    useEffect(() => {
        let interval;
        if (lockoutTimer > 0) {
            interval = setInterval(() => {
                setLockoutTimer((prev) => prev - 1);
            }, 1000);
        } else if (lockoutTimer === 0 && failedAttempts >= MAX_ATTEMPTS) {
            setFailedAttempts(0); 
        }
        return () => clearInterval(interval);
    }, [lockoutTimer, failedAttempts]);

    const handleVerifyEmail = () => {
        if(!email) return;
        setVerifyingEmail(true);
        setEmailError(false);
        setTimeout(() => {
            setVerifyingEmail(false);
            if (email.trim() === AUTHORIZED_EMAIL) {
                setIsEmailVerified(true);
                setEmailError(false);
                toast({ title: "Email Verified", description: "Enter Security PIN." });
            } else {
                setIsEmailVerified(false);
                setEmailError(true);
                toast({ title: "Access Denied", description: "Unauthorized email.", variant: "destructive" });
            }
        }, 800);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (lockoutTimer > 0) return;
        const isValidUser = (email.trim() === AUTHORIZED_EMAIL && securityCode === AUTHORIZED_CODE && password === AUTHORIZED_PASS);
        if (!isValidUser) {
            const newAttempts = failedAttempts + 1;
            setFailedAttempts(newAttempts);
            if (newAttempts >= MAX_ATTEMPTS) {
                setLockoutTimer(LOCKOUT_DURATION); 
                toast({ title: "System Locked", description: "Too many failed attempts.", variant: "destructive" });
            } else {
                toast({ title: "Failed", description: `Attempt ${newAttempts}/${MAX_ATTEMPTS}`, variant: "destructive" });
            }
            return;
        }
        handleLogin();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
            <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                {lockoutTimer > 0 && (
                    <div className="absolute inset-0 bg-gray-900/95 z-50 flex flex-col items-center justify-center text-center p-6">
                        <Lock className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
                        <h2 className="text-2xl font-bold text-white mb-2">System Locked</h2>
                        <div className="text-4xl font-mono font-bold text-red-500 bg-red-500/10 px-6 py-3 rounded-xl border border-red-500/20">{formatTime(lockoutTimer)}</div>
                    </div>
                )}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">TDCS Admin</h1>
                    <p className="text-gray-400 text-sm mt-2">Secure Gateway</p>
                </div>
                <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Identifier</label>
                        <div className="flex gap-2">
                            <input type="email" value={email} disabled={isEmailVerified} onChange={e => {setEmail(e.target.value); setEmailError(false);}} className={`flex-1 bg-gray-950 border ${isEmailVerified ? 'border-green-500/50 text-green-400' : emailError ? 'border-red-500 text-red-400' : 'border-gray-800 text-white'} rounded-lg p-3 outline-none transition-all placeholder-gray-600`} placeholder="Enter registered email" />
                            {!isEmailVerified ? (
                                <button type="button" onClick={handleVerifyEmail} disabled={!email || verifyingEmail} className={`px-4 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 min-w-[80px] flex items-center justify-center ${emailError ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                                    {verifyingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                                </button>
                            ) : (<div className="flex items-center justify-center px-4 bg-green-500/10 border border-green-500/20 rounded-lg"><CheckCircle className="w-5 h-5 text-green-500" /></div>)}
                        </div>
                        {emailError && <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><XCircle className="w-3 h-3" /> Email not found.</p>}
                    </div>
                    {isEmailVerified && (
                        <div className="animate-slideDown space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-blue-400 mb-1 flex items-center gap-2"><Lock className="w-3 h-3" /> Security PIN</label>
                                <input type="password" value={securityCode} onChange={e => setSecurityCode(e.target.value)} maxLength={6} placeholder="• • • • • •" className="w-full bg-gray-950 border border-blue-500/30 rounded-lg p-3 text-white text-center font-mono text-lg tracking-[0.5em] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:tracking-widest" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600" />
                            </div>
                            {failedAttempts > 0 && <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50"><AlertTriangle className="w-4 h-4" /><span>Attempts left: {MAX_ATTEMPTS - failedAttempts}</span></div>}
                            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 flex justify-center items-center shadow-lg shadow-blue-900/20">{isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Authenticate"}</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

// --- 4. DASHBOARD COMPONENTS ---

const CourseCard = ({ course, onEdit }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
        <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-900 p-6 relative">
            <div className="absolute top-4 left-4">
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-100 text-xs font-bold uppercase tracking-wider">
                    <Wifi className="w-3 h-3 animate-pulse" />
                    {course.mode}
                </span>
            </div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-500 transition-colors mb-2">
                {course.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-1">
                {course.description}
            </p>
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>{course.students} Enrolled</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <span>{course.slug}</span>
                </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold">Price</span>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹{course.price.toLocaleString()}
                    </div>
                </div>
                <button 
                    onClick={() => onEdit(course)}
                    className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                    View Details
                </button>
            </div>
        </div>
    </div>
);

// --- 5. MAIN APP CONTROLLER ---

export default function App() {
    const [view, setView] = useState('login'); // 'login' | 'dashboard' | 'editor'
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const { toast } = useToast();

    const handleLogin = async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        toast({ title: "Authenticated", description: "Loading CMS..." });
        setCourses(INITIAL_COURSES);
        setView('dashboard');
        setIsLoading(false);
    };

    const handleLogout = () => {
        setView('login');
        toast({ title: "Logged Out", description: "Session terminated." });
    };

    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setView('editor');
    };

    const handleSaveCourse = (updatedCourse) => {
        setIsLoading(true);
        // Simulate API Update
        setTimeout(() => {
            setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
            setIsLoading(false);
            setView('dashboard');
            setSelectedCourse(null);
            toast({ title: "Changes Saved", description: `${updatedCourse.title} updated successfully.` });
        }, 800);
    };

    const handleCancelEdit = () => {
        setView('dashboard');
        setSelectedCourse(null);
    };

    // --- VIEW ROUTING ---

    if (view === 'login') {
        return (
            <>
                <style>{`
                    @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
                    .animate-slideDown { animation: slideDown 0.4s ease-out forwards; }
                `}</style>
                <LoginScreen handleLogin={handleLogin} isLoading={isLoading} />
            </>
        );
    }

    if (view === 'editor' && selectedCourse) {
        return (
            <CourseEditor 
                course={selectedCourse} 
                onSave={handleSaveCourse} 
                onCancel={handleCancelEdit} 
            />
        );
    }

    // Dashboard View
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
             <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
            `}</style>
            
            {/* Nav */}
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg"><Shield className="w-5 h-5 text-white" /></div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">TDCS<span className="text-blue-600">.Admin</span></span>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                        <LogOut className="w-4 h-4" /><span>Logout</span>
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Course Management</h1>
                    <p className="text-gray-500 dark:text-gray-400">Select a course to edit curriculum, pricing, and FAQ details.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} onEdit={handleEditClick} />
                    ))}
                </div>
            </main>
        </div>
    );
}