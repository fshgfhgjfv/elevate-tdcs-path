import React, { useState, useEffect, useCallback } from "react";
import { Shield, LogOut, BookOpen, FileText, DollarSign, Loader2 } from 'lucide-react';

// --- MOCK UTILITIES AND CLIENTS (Required for Single-File Execution) ---

// 1. Mock useToast hook
const useToast = () => {
  const toast = (props) => {
    const message = props.title + (props.description ? ": " + props.description : "");
    const style = props.variant === "destructive" ? "bg-red-500 text-white" : "bg-green-500 text-white";
    console.log(`[TOAST]: ${message}`);
    
    // Simple UI notification replacement for alert/toast
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-xl z-50 transition-transform duration-300 transform translate-x-0 ${style}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('translate-x-full');
      notification.addEventListener('transitionend', () => notification.remove());
    }, 3000);
  };
  return { toast };
};

// 2. Mock Supabase Client
// We must mock the full asynchronous behavior of the Supabase methods.
const MOCK_ADMIN_EMAIL = "admin@tdcs.com";
const MOCK_ADMIN_PASSWORD = "password123";
const MOCK_ADMIN_ID = "admin-user-123";
const MOCK_COURSES = [
  { id: 1, title: "Cyber Master's Pro Lite", description: "Deep dive into state management and performance.", price: 499, slug: "react-hooks", published: true, created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 2, title: "Cyber Master's Pro Black Hat", description: "Build stunning, responsive interfaces faster.", price:19999, slug: "tailwind-mastery", published: false, created_at: new Date(Date.now() - 172800000).toISOString() },
  { id: 3, title: "Bug Bounty & Penetration Testing", description: "Authentication and database setup.", price: 6999, slug: "supabase-backend", published: true, created_at: new Date(Date.now() - 259200000).toISOString() },
];

const mockSupabase = {
    auth: {
        async getSession() {
            // Simulate persistent session check (e.g., from local storage)
            const mockSession = localStorage.getItem('mockSupabaseSession');
            if (mockSession) {
                return { data: { session: JSON.parse(mockSession) } };
            }
            return { data: { session: null } };
        },
        async signInWithPassword({ email, password }) {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
            if (email === MOCK_ADMIN_EMAIL && password === MOCK_ADMIN_PASSWORD) {
                const session = { user: { id: MOCK_ADMIN_ID, email } };
                localStorage.setItem('mockSupabaseSession', JSON.stringify(session));
                return { data: session, error: null };
            }
            return { data: null, error: new Error("Invalid login credentials.") };
        },
        async signOut() {
            await new Promise(resolve => setTimeout(resolve, 200));
            localStorage.removeItem('mockSupabaseSession');
            return { error: null };
        }
    },
    from: (tableName) => ({
        select: () => ({
            order: () => ({
                // Mock for the 'courses' table query
                async then(resolve, reject) {
                    await new Promise(r => setTimeout(r, 500));
                    if (tableName === "courses") {
                        resolve({ data: MOCK_COURSES, error: null });
                    } else if (tableName === "user_roles") {
                         // Mock role check
                        const session = JSON.parse(localStorage.getItem('mockSupabaseSession') || 'null');
                        if (session?.user?.id === MOCK_ADMIN_ID) {
                            resolve({ data: [{ role: "admin" }], error: null });
                        } else {
                            resolve({ data: null, error: null });
                        }
                    } else {
                        reject(new Error("Mock table not found."));
                    }
                }
            }),
            // Mock for select().eq().eq().single() used in role check
            eq: () => ({
                eq: () => ({
                    single: async () => {
                        await new Promise(r => setTimeout(r, 100));
                        const session = JSON.parse(localStorage.getItem('mockSupabaseSession') || 'null');
                        if (session?.user?.id === MOCK_ADMIN_ID) {
                            return { data: { role: "admin" }, error: null };
                        } else {
                            return { data: null, error: null };
                        }
                    }
                })
            })
        })
    })
};

// --- COMPONENT LOGIC STARTS HERE ---

const AdminLogin = ({ email, setEmail, password, setPassword, handleLogin, isLoading }) => (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-primary/50">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Admin Login</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Access the content management system.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="admin@tdcs.com (Try: admin@tdcs.com)"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="•••••••• (Try: password123)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white placeholder-gray-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    </div>
);


// Main App Component
export default function App() {
    // MODIFIED: Starting isAuthenticated as true to load dashboard immediately
    const [isAuthenticated, setIsAuthenticated] = useState(true); 
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [courses, setCourses] = useState([]);
    const { toast } = useToast();

    // MODIFIED: Starting view as 'dashboard'
    const [view, setView] = useState('dashboard'); 

    const loadCourses = useCallback(async () => {
        try {
            setIsLoading(true);
            const { data, error } = await mockSupabase
                .from("courses")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setCourses(data || []);
        } catch (error) {
            toast({
                title: "Error loading courses",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    const checkAuth = useCallback(async () => {
        // This function is now effectively disabled for instant viewing
        // but remains here for a proper future implementation.
        try {
            const { data: { session } } = await mockSupabase.auth.getSession();
            if (session?.user) {
                const { data: roles } = await mockSupabase
                    .from("user_roles")
                    .select("role")
                    .eq("user_id", session.user.id)
                    .eq("role", "admin")
                    .single();

                if (roles) {
                    setIsAuthenticated(true);
                    setView('dashboard');
                    await loadCourses();
                } else {
                    setIsAuthenticated(false);
                    setView('login');
                }
            } else {
                setIsAuthenticated(false);
                setView('login');
            }
        } catch (error) {
            console.error("Auth check error:", error);
            setIsAuthenticated(false);
            setView('login');
        } finally {
            setIsLoading(false);
        }
    }, [loadCourses]);

    useEffect(() => {
        // MODIFIED: Directly call loadCourses since isAuthenticated is now true by default
        loadCourses();
    }, [loadCourses]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data, error } = await mockSupabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Mock check if user has admin role
            const { data: roles } = await mockSupabase
                .from("user_roles")
                .select("role")
                .eq("user_id", data.user.id)
                .eq("role", "admin")
                .single();

            if (!roles) {
                await mockSupabase.auth.signOut();
                throw new Error("Access denied. Admin role required.");
            }

            setIsAuthenticated(true);
            setView('dashboard');
            await loadCourses();
            toast({
                title: "Welcome Admin!",
                description: "Successfully logged in to admin panel (Mocked)",
            });
        } catch (error) {
            toast({
                title: "Login failed",
                description: error.message || "An unknown error occurred.",
                variant: "destructive",
            });
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        // NOTE: Logging out will take you back to the login page.
        await mockSupabase.auth.signOut();
        setIsAuthenticated(false);
        setView('login');
        toast({
            title: "Logged out",
            description: "Successfully logged out from admin panel (Mocked)",
        });
    };

    if (isLoading && view !== 'login') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <Loader2 className="animate-spin h-12 w-12 text-indigo-500 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <AdminLogin 
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword} 
                handleLogin={handleLogin} 
                isLoading={isLoading} 
            />
        );
    }

    // --- Admin Dashboard View ---
    return (
        <div className="min-h-screen pt-12 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
            {/* Consolidated global styles and animations in one standard <style> block */}
            <style>{`
                .gradient-text {
                    background-image: linear-gradient(45deg, #4f46e5, #9333ea);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    color: transparent;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                    <div>
                        <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your courses and content (Mock Data)</p>
                    </div>
                    <button 
                        className="mt-4 sm:mt-0 flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.length === 0 ? (
                        <div className="col-span-full p-12 text-center bg-white dark:bg-gray-800 rounded-xl shadow-md">
                            <p className="text-gray-500 dark:text-gray-400">No courses found in database</p>
                        </div>
                    ) : (
                        courses.map((course, index) => (
                            <div
                                key={course.id}
                                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                                style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`, opacity: 0 }}
                            >
                                {/* Removed the <style jsx> block from here as keyframes are now global */}
                                <div className="flex items-start justify-between gap-2 mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                                        {course.title}
                                    </h2>
                                    {course.published && (
                                        <span className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 shadow-sm">
                                            Published
                                        </span>
                                    )}
                                </div>
                                
                                <div className="space-y-3 text-sm border-t pt-4">
                                    <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                                        <FileText className="h-4 w-4 mt-1 flex-shrink-0 text-indigo-500" />
                                        <span className="line-clamp-2">{course.description || "No description provided."}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                        <DollarSign className="h-4 w-4 flex-shrink-0 text-purple-500" />
                                        <span>Price: <span className="font-bold text-lg text-gray-900 dark:text-white">₹{course.price ? course.price.toLocaleString() : "0"}</span></span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                        <BookOpen className="h-4 w-4 flex-shrink-0 text-indigo-500" />
                                        <span className="font-mono text-xs">{course.slug}</span>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                                    <p className="text-xs text-gray-400 dark:text-gray-500">
                                        Created: {new Date(course.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
