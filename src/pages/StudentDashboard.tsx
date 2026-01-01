import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  BookOpen, 
  Play, 
  Lock, 
  Clock, 
  CheckCircle, 
  XCircle,
  LogOut,
  User as UserIcon
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface CourseAccess {
  id: string;
  course_name: string;
  unlocked_at: string;
}

interface PaymentSubmission {
  id: string;
  course_name: string;
  amount_paid: number;
  status: string;
  created_at: string;
  transaction_id: string;
}

interface Recording {
  id: string;
  course_name: string;
  title: string;
  recording_url: string;
  created_at: string;
}

// Fixed courses data
const allCourses = [
  {
    id: "cyber-lite",
    name: "Cyber Master's Pro Lite",
    price: 499,
    description: "Foundational ethical hacking & network security program for beginners.",
  },
  {
    id: "cyber-blackhat",
    name: "Cyber Master's Pro Black Hat",
    price: 19999,
    description: "Advanced penetration testing & red team operations mastery program.",
  },
  {
    id: "bug-hunting",
    name: "Bug Hunting & Penetration Testing",
    price: 6999,
    description: "Professional bug bounty hunting & vulnerability assessment training.",
  },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [courseAccess, setCourseAccess] = useState<CourseAccess[]>([]);
  const [paymentSubmissions, setPaymentSubmissions] = useState<PaymentSubmission[]>([]);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Fetch data when user is available
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Fetch course access
      const { data: accessData, error: accessError } = await supabase
        .from("course_access")
        .select("*")
        .eq("user_id", user.id);
      
      if (accessError) throw accessError;
      setCourseAccess(accessData || []);

      // Fetch payment submissions
      const { data: paymentsData, error: paymentsError } = await supabase
        .from("payment_submissions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (paymentsError) throw paymentsError;
      setPaymentSubmissions(paymentsData || []);

      // Fetch recordings for unlocked courses
      if (accessData && accessData.length > 0) {
        const courseNames = accessData.map((a) => a.course_name);
        const { data: recordingsData, error: recordingsError } = await supabase
          .from("course_recordings")
          .select("*")
          .in("course_name", courseNames)
          .order("created_at", { ascending: true });
        
        if (recordingsError) throw recordingsError;
        setRecordings(recordingsData || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const isUnlocked = (courseName: string) => {
    return courseAccess.some((a) => a.course_name === courseName);
  };

  const getRecordingsForCourse = (courseName: string) => {
    return recordings.filter((r) => r.course_name === courseName);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "verified":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" /> Verified</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Student Dashboard</h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <UserIcon className="h-4 w-4" />
                {user?.email}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="courses" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="courses">My Courses</TabsTrigger>
              <TabsTrigger value="recordings">Recordings</TabsTrigger>
              <TabsTrigger value="payments">Payment History</TabsTrigger>
            </TabsList>

            {/* My Courses Tab */}
            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCourses.map((course) => {
                  const unlocked = isUnlocked(course.name);
                  const courseRecordings = getRecordingsForCourse(course.name);
                  
                  return (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className={`h-full ${unlocked ? "border-green-500/30 bg-green-500/5" : "opacity-75"}`}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{course.name}</CardTitle>
                            {unlocked ? (
                              <Badge className="bg-green-500">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Unlocked
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                <Lock className="h-3 w-3 mr-1" />
                                Locked
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {unlocked ? (
                            <>
                              <p className="text-sm text-muted-foreground mb-3">
                                {courseRecordings.length} recordings available
                              </p>
                              <Button 
                                className="w-full"
                                onClick={() => setSelectedCourse(course.name)}
                              >
                                <Play className="h-4 w-4 mr-2" />
                                View Recordings
                              </Button>
                            </>
                          ) : (
                            <>
                              <p className="text-lg font-bold mb-3">₹{course.price.toLocaleString()}</p>
                              <Button 
                                className="w-full"
                                onClick={() => navigate(`/enroll/${course.id}`)}
                              >
                                <BookOpen className="h-4 w-4 mr-2" />
                                Enroll Now
                              </Button>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Recordings Tab */}
            <TabsContent value="recordings">
              {courseAccess.length === 0 ? (
                <Card>
                  <CardContent className="pt-8 pb-8 text-center">
                    <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Courses Unlocked</h3>
                    <p className="text-muted-foreground mb-4">
                      Enroll in a course to access recordings
                    </p>
                    <Button onClick={() => navigate("/courses")}>
                      View Courses
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {courseAccess.map((access) => {
                    const courseRecordings = getRecordingsForCourse(access.course_name);
                    
                    return (
                      <Card key={access.id}>
                        <CardHeader>
                          <CardTitle>{access.course_name}</CardTitle>
                          <CardDescription>
                            Unlocked on {new Date(access.unlocked_at).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {courseRecordings.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">
                              No recordings available yet. Check back soon!
                            </p>
                          ) : (
                            <div className="space-y-3">
                              {courseRecordings.map((recording, index) => (
                                <div
                                  key={recording.id}
                                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <p className="font-medium">{recording.title}</p>
                                      <p className="text-xs text-muted-foreground">
                                        Added {new Date(recording.created_at).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  <Button asChild size="sm">
                                    <a href={recording.recording_url} target="_blank" rel="noopener noreferrer">
                                      <Play className="h-4 w-4 mr-1" />
                                      Watch
                                    </a>
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* Payment History Tab */}
            <TabsContent value="payments">
              {paymentSubmissions.length === 0 ? (
                <Card>
                  <CardContent className="pt-8 pb-8 text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Payment History</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't made any payments yet
                    </p>
                    <Button onClick={() => navigate("/courses")}>
                      Explore Courses
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {paymentSubmissions.map((payment) => (
                    <Card key={payment.id}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div>
                            <h3 className="font-semibold">{payment.course_name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Transaction ID: {payment.transaction_id}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Submitted: {new Date(payment.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <p className="text-lg font-bold">₹{payment.amount_paid.toLocaleString()}</p>
                            {getStatusBadge(payment.status)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
