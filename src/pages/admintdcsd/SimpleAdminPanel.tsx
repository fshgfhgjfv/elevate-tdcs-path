import React, { useState, useEffect } from "react";
import { 
  Shield, LogOut, BookOpen, Users, 
  MoreVertical, Edit, Wifi, Loader2, CheckCircle, Lock, AlertTriangle, XCircle 
} from 'lucide-react';

// --- 1. MOCK DATA (Content Only) ---

const MOCK_COURSES = [
  { 
    id: 1, 
    title: "Cyber Master's Pro Lite", 
    description: "Foundational ethical hacking & network security program for beginners.", 
    price: 499, 
    mode: "Live Online",
    students: 120,
    slug: "cyber-lite", 
    published: true, 
    created_at: new Date().toISOString() 
  },
  { 
    id: 2, 
    title: "Cyber Master's Pro Black Hat", 
    description: "Advanced program covering exploit dev, malware analysis, red teaming & advanced pentesting.", 
    price: 19999, 
    mode: "Live Online",
    students: 45,
    slug: "black-hat-pro", 
    published: true, 
    created_at: new Date().toISOString() 
  },
  { 
    id: 3, 
    title: "Bug Hunting & Penetration Testing", 
    description: "Professional bug bounty hunting methodologies and web application penetration testing.", 
    price: 6999, 
    mode: "Live Online",
    students: 85,
    slug: "bug-bounty", 
    published: true, 
    created_at: new Date().toISOString() 
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

// --- 2. COMPONENTS ---

const LoginScreen = ({ handleLogin, isLoading }) => {
    // --- STATE ---
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    
    // UI State
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [verifyingEmail, setVerifyingEmail] = useState(false);
    const [emailError, setEmailError] = useState(false); // To show red border
    const { toast } = useToast();

    // Lockout State
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [lockoutTimer, setLockoutTimer] = useState(0);

    // --- CONFIGURATION ---
    const AUTHORIZED_EMAIL = "admin@tdcs.com";
    const AUTHORIZED_CODE = "710003";
    const AUTHORIZED_PASS = "password123";
    
    const MAX_ATTEMPTS = 4;
    const LOCKOUT_DURATION = 120; // 2 minutes

    // Timer Logic
    useEffect(() => {
        let interval;
        if (lockoutTimer > 0) {
            interval = setInterval(() => {
                setLockoutTimer((prev) => prev - 1);
            }, 1000);
        } else if (lockoutTimer === 0 && failedAttempts >= MAX_ATTEMPTS) {
            setFailedAttempts(0); // Reset after penalty
        }
        return () => clearInterval(interval);
    }, [lockoutTimer, failedAttempts]);

    // --- LOGIC: STRICT EMAIL CHECK ---
    const handleVerifyEmail = () => {
        if(!email) return;
        setVerifyingEmail(true);
        setEmailError(false);
        
        // Simulating API Latency
        setTimeout(() => {
            setVerifyingEmail(false);
            
            // STRICT VALIDATION: ONLY admin@tdcs.com is allowed
            if (email.trim() === AUTHORIZED_EMAIL) {
                setIsEmailVerified(true);
                setEmailError(false);
                toast({ title: "Email Verified", description: "Please enter your security PIN." });
            } else {
                setIsEmailVerified(false);
                setEmailError(true);
                toast({ title: "Access Denied", description: "This email is not authorized for admin access.", variant: "destructive" });
            }
        }, 800);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // 1. Check Lockout
        if (lockoutTimer > 0) return;

        // 2. Validate Credentials 
        const isValidUser = (
            email.trim() === AUTHORIZED_EMAIL && 
            securityCode === AUTHORIZED_CODE && 
            password === AUTHORIZED_PASS
        );

        if (!isValidUser) {
            const newAttempts = failedAttempts + 1;
            setFailedAttempts(newAttempts);

            if (newAttempts >= MAX_ATTEMPTS) {
                setLockoutTimer(LOCKOUT_DURATION); 
                toast({ title: "System Locked", description: "Too many failed attempts.", variant: "destructive" });
            } else {
                toast({ title: "Authentication Failed", description: `Invalid credentials. Attempt ${newAttempts}/${MAX_ATTEMPTS}`, variant: "destructive" });
            }
            return;
        }

        // 3. Success
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
                
                {/* Lockout Overlay */}
                {lockoutTimer > 0 && (
                    <div className="absolute inset-0 bg-gray-900/95 z-50 flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
                        <Lock className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
                        <h2 className="text-2xl font-bold text-white mb-2">System Locked</h2>
                        <p className="text-gray-400 mb-6">Security Protocol Activated.</p>
                        <div className="text-4xl font-mono font-bold text-red-500 bg-red-500/10 px-6 py-3 rounded-xl border border-red-500/20">
                            {formatTime(lockoutTimer)}
                        </div>
                        <p className="text-xs text-gray-500 mt-4">Wait for timer to expire.</p>
                    </div>
                )}

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Authorized Access Only</h1>
                    <p className="text-gray-400 text-sm mt-2">TDCS Secure Admin Portal</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-5">
                    
                    {/* 1. Email + Verify Button */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Identifier</label>
                        <div className="flex gap-2">
                            <input 
                                type="email" 
                                value={email}
                                disabled={isEmailVerified}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    setEmailError(false); // Clear error on typing
                                }}
                                className={`flex-1 bg-gray-950 border ${
                                    isEmailVerified ? 'border-green-500/50 text-green-400' : 
                                    emailError ? 'border-red-500 text-red-400' : 
                                    'border-gray-800 text-white'
                                } rounded-lg p-3 outline-none transition-all placeholder-gray-600`}
                                placeholder="Enter registered email"
                            />
                            {!isEmailVerified ? (
                                <button 
                                    type="button"
                                    onClick={handleVerifyEmail}
                                    disabled={!email || verifyingEmail}
                                    className={`px-4 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 min-w-[80px] flex items-center justify-center ${
                                        emailError ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'
                                    }`}
                                >
                                    {verifyingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                                </button>
                            ) : (
                                <div className="flex items-center justify-center px-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                </div>
                            )}
                        </div>
                        {emailError && (
                             <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                <XCircle className="w-3 h-3" /> Email not found in admin database.
                             </p>
                        )}
                    </div>

                    {/* 2. Security Code (Appears ONLY after Verify) */}
                    {isEmailVerified && (
                        <div className="animate-slideDown space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-blue-400 mb-1 flex items-center gap-2">
                                    <Lock className="w-3 h-3" /> Security PIN
                                </label>
                                <input 
                                    type="password" 
                                    value={securityCode}
                                    onChange={e => setSecurityCode(e.target.value)}
                                    maxLength={6}
                                    placeholder="• • • • • •"
                                    className="w-full bg-gray-950 border border-blue-500/30 rounded-lg p-3 text-white text-center font-mono text-lg tracking-[0.5em] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:tracking-widest"
                                />
                            </div>

                            {/* 3. Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
                                />
                            </div>

                            {/* Error Warning */}
                            {failedAttempts > 0 && (
                                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50">
                                    <AlertTriangle className="w-4 h-4" />
                                    <span>Warning: {MAX_ATTEMPTS - failedAttempts} attempts remaining.</span>
                                </div>
                            )}

                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-lg shadow-blue-900/20"
                            >
                                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Authenticate"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

const CourseCard = ({ course }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-900 p-6 relative">
            <div className="absolute top-4 left-4">
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-100 text-xs font-bold uppercase tracking-wider">
                    <Wifi className="w-3 h-3 animate-pulse" />
                    {course.mode}
                </span>
            </div>
            <div className="absolute top-4 right-4">
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                    <MoreVertical className="w-4 h-4" />
                </button>
            </div>
        </div>
        <div className="p-6">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-500 transition-colors">
                    {course.title}
                </h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
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
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div>
                    <span className="text-xs text-gray-500 uppercase font-semibold">Price</span>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ₹{course.price.toLocaleString()}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Edit className="w-5 h-5" />
                    </button>
                    <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    </div>
);

// --- 3. MAIN APP ---

export default function App() {
    const [view, setView] = useState('login'); 
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const { toast } = useToast();

    // Mock Authentication Logic
    const handleLogin = async () => {
        setIsLoading(true);
        // Simulate Network Request
        await new Promise(r => setTimeout(r, 1500));
        
        toast({ title: "Authenticated", description: "Access Granted to Admin Panel." });
        
        // Load Data
        setCourses(MOCK_COURSES);
        setView('dashboard');
        setIsLoading(false);
    };

    const handleLogout = async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 500));
        setView('login');
        setIsLoading(false);
        toast({ title: "Logged Out", description: "Secure session terminated." });
    };

    if (view === 'login') {
        return (
            <>
                <style>{`
                    @keyframes slideDown {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .animate-slideDown { animation: slideDown 0.4s ease-out forwards; }
                    .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
                `}</style>
                <LoginScreen handleLogin={handleLogin} isLoading={isLoading} />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .animate-slideIn { animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
            `}</style>
            
            {/* Top Navigation */}
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                            TDCS<span className="text-blue-600">.Admin</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end mr-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Administrator</span>
                            <span className="text-xs text-gray-500">Secure Session</span>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/10 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Course Management</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your active training programs and student pricing.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </main>
        </div>
    );
}