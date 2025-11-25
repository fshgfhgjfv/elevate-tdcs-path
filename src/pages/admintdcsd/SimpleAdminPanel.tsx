import React, { useState, useEffect, useCallback } from "react";
import { 
  Shield, LogOut, BookOpen, FileText, DollarSign, 
  Loader2, Wifi, Users, MoreVertical, Edit, Trash2 
} from 'lucide-react';

// --- 1. MOCK DATA & UTILITIES ---

// specific mock data based on your request
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

// Mock Auth Client
const mockSupabase = {
    auth: {
        signInWithPassword: async ({ email, password }) => {
            await new Promise(r => setTimeout(r, 800)); // Fake delay
            if (email === "admin@tdcs.com" && password === "password123") {
                return { data: { user: { id: "admin-1", email } }, error: null };
            }
            return { data: null, error: { message: "Invalid credentials" } };
        },
        signOut: async () => {
            await new Promise(r => setTimeout(r, 300));
            return { error: null };
        }
    },
    from: (table) => ({
        select: () => ({
            order: async () => ({ data: MOCK_COURSES, error: null })
        })
    })
};

// --- 2. COMPONENTS ---

const LoginScreen = ({ handleLogin, isLoading }) => {
    const [email, setEmail] = useState("admin@tdcs.com");
    const [password, setPassword] = useState("password123");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
            <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">TDCS Admin Portal</h1>
                    <p className="text-gray-400 text-sm mt-2">Enter credentials to manage courses</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(email, password); }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <button 
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign In to Dashboard"}
                    </button>
                </form>
            </div>
        </div>
    );
};

const CourseCard = ({ course }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group">
        {/* Card Header / Image Placeholder */}
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

        {/* Card Body */}
        <div className="p-6">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-500 transition-colors">
                    {course.title}
                </h3>
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
                {course.description}
            </p>

            {/* Stats Row */}
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

            {/* Footer */}
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
    const [view, setView] = useState('login'); // Start at login
    const [isLoading, setIsLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const { toast } = useToast();

    const handleLogin = async (email, password) => {
        setIsLoading(true);
        const { error } = await mockSupabase.auth.signInWithPassword({ email, password });
        
        if (error) {
            toast({ title: "Access Denied", description: error.message, variant: "destructive" });
            setIsLoading(false);
        } else {
            toast({ title: "Welcome Admin", description: "Loading dashboard data..." });
            // Simulate data fetch
            const { data } = await mockSupabase.from('courses').select().order();
            setCourses(data);
            setView('dashboard');
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);
        await mockSupabase.auth.signOut();
        setView('login');
        setIsLoading(false);
        toast({ title: "Logged Out", description: "See you next time." });
    };

    if (view === 'login') {
        return <LoginScreen handleLogin={handleLogin} isLoading={isLoading} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
             {/* Global Animation Styles */}
             <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
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
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</span>
                            <span className="text-xs text-gray-500">admin@tdcs.com</span>
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

                {/* Grid Layout for the 3 Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </main>
        </div>
    );
}