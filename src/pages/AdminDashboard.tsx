import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  LogOut, 
  Plus, 
  Video,
  Users,
  CreditCard,
  BookOpen,
  Loader2,
  ExternalLink,
  Trash2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface PaymentSubmission {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  course_name: string;
  amount_paid: number;
  transaction_id: string;
  screenshot_url: string | null;
  status: string;
  created_at: string;
}

interface Recording {
  id: string;
  course_name: string;
  title: string;
  recording_url: string;
  created_at: string;
}

interface CourseAccess {
  id: string;
  user_id: string;
  course_name: string;
  unlocked_at: string;
}

const allCourses = [
  "Cyber Master's Pro Lite",
  "Cyber Master's Pro Black Hat",
  "Bug Hunting & Penetration Testing",
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  const [payments, setPayments] = useState<PaymentSubmission[]>([]);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [courseAccess, setCourseAccess] = useState<CourseAccess[]>([]);
  
  const [newRecording, setNewRecording] = useState({
    course_name: "",
    title: "",
    recording_url: "",
  });
  const [isAddingRecording, setIsAddingRecording] = useState(false);

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

  // Check admin role
  useEffect(() => {
    if (user) {
      checkAdminRole();
    }
  }, [user]);

  const checkAdminRole = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      
      if (error) throw error;
      
      if (data) {
        setIsAdmin(true);
        fetchAllData();
      } else {
        toast.error("Access denied. Admin only.");
        navigate("/student-dashboard");
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      navigate("/student-dashboard");
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    
    try {
      // Fetch all payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from("payment_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (paymentsError) throw paymentsError;
      setPayments(paymentsData || []);

      // Fetch all recordings
      const { data: recordingsData, error: recordingsError } = await supabase
        .from("course_recordings")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (recordingsError) throw recordingsError;
      setRecordings(recordingsData || []);

      // Fetch all course access
      const { data: accessData, error: accessError } = await supabase
        .from("course_access")
        .select("*")
        .order("unlocked_at", { ascending: false });
      
      if (accessError) throw accessError;
      setCourseAccess(accessData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaymentStatus = async (paymentId: string, newStatus: "verified" | "rejected") => {
    setActionLoading(paymentId);
    
    try {
      const { error } = await supabase
        .from("payment_submissions")
        .update({ status: newStatus })
        .eq("id", paymentId);
      
      if (error) throw error;
      
      toast.success(`Payment ${newStatus === "verified" ? "approved" : "rejected"}`);
      
      // Refresh data
      await fetchAllData();
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Failed to update payment status");
    } finally {
      setActionLoading(null);
    }
  };

  const addRecording = async () => {
    if (!newRecording.course_name || !newRecording.title || !newRecording.recording_url) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsAddingRecording(true);
    
    try {
      const { error } = await supabase.from("course_recordings").insert({
        course_name: newRecording.course_name,
        title: newRecording.title,
        recording_url: newRecording.recording_url,
      });
      
      if (error) throw error;
      
      toast.success("Recording added successfully");
      setNewRecording({ course_name: "", title: "", recording_url: "" });
      await fetchAllData();
    } catch (error) {
      console.error("Error adding recording:", error);
      toast.error("Failed to add recording");
    } finally {
      setIsAddingRecording(false);
    }
  };

  const deleteRecording = async (recordingId: string) => {
    try {
      const { error } = await supabase
        .from("course_recordings")
        .delete()
        .eq("id", recordingId);
      
      if (error) throw error;
      
      toast.success("Recording deleted");
      await fetchAllData();
    } catch (error) {
      console.error("Error deleting recording:", error);
      toast.error("Failed to delete recording");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/auth");
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
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const pendingPayments = payments.filter((p) => p.status === "pending");
  const verifiedPayments = payments.filter((p) => p.status === "verified");

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
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage payments, recordings, and course access</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-yellow-500/10">
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingPayments.length}</p>
                    <p className="text-sm text-muted-foreground">Pending Payments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-500/10">
                    <CreditCard className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{verifiedPayments.length}</p>
                    <p className="text-sm text-muted-foreground">Verified Payments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-500/10">
                    <Video className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{recordings.length}</p>
                    <p className="text-sm text-muted-foreground">Recordings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-purple-500/10">
                    <Users className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{courseAccess.length}</p>
                    <p className="text-sm text-muted-foreground">Course Access</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="payments" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="payments">Payment Submissions</TabsTrigger>
              <TabsTrigger value="recordings">Manage Recordings</TabsTrigger>
              <TabsTrigger value="access">Course Access</TabsTrigger>
            </TabsList>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Submissions</CardTitle>
                  <CardDescription>Review and verify payment submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  {payments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No payment submissions yet</p>
                  ) : (
                    <div className="space-y-4">
                      {payments.map((payment) => (
                        <div
                          key={payment.id}
                          className="border rounded-lg p-4 space-y-3"
                        >
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{payment.full_name}</h3>
                                {getStatusBadge(payment.status)}
                              </div>
                              <p className="text-sm text-muted-foreground">{payment.email}</p>
                              <p className="text-sm text-muted-foreground">{payment.phone}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">{payment.course_name}</p>
                              <p className="text-lg font-bold text-primary">₹{payment.amount_paid.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                            <p><strong>Transaction ID:</strong> {payment.transaction_id}</p>
                            <p><strong>Submitted:</strong> {new Date(payment.created_at).toLocaleString()}</p>
                            {payment.screenshot_url && (
                              <p>
                                <strong>Screenshot:</strong>{" "}
                                <a href={payment.screenshot_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                                  View <ExternalLink className="h-3 w-3" />
                                </a>
                              </p>
                            )}
                          </div>

                          {payment.status === "pending" && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => updatePaymentStatus(payment.id, "verified")}
                                disabled={actionLoading === payment.id}
                              >
                                {actionLoading === payment.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                  </>
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updatePaymentStatus(payment.id, "rejected")}
                                disabled={actionLoading === payment.id}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recordings Tab */}
            <TabsContent value="recordings">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Course Recordings</CardTitle>
                      <CardDescription>Manage recordings for each course</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Recording
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Recording</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <Label>Course</Label>
                            <Select
                              value={newRecording.course_name}
                              onValueChange={(value) => setNewRecording({ ...newRecording, course_name: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select course" />
                              </SelectTrigger>
                              <SelectContent>
                                {allCourses.map((course) => (
                                  <SelectItem key={course} value={course}>
                                    {course}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label>Recording Title</Label>
                            <Input
                              placeholder="e.g., Introduction to Ethical Hacking"
                              value={newRecording.title}
                              onChange={(e) => setNewRecording({ ...newRecording, title: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label>Recording URL</Label>
                            <Input
                              placeholder="https://..."
                              value={newRecording.recording_url}
                              onChange={(e) => setNewRecording({ ...newRecording, recording_url: e.target.value })}
                            />
                          </div>
                          <Button onClick={addRecording} className="w-full" disabled={isAddingRecording}>
                            {isAddingRecording ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Add Recording"
                            )}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {recordings.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No recordings added yet</p>
                  ) : (
                    <div className="space-y-4">
                      {allCourses.map((course) => {
                        const courseRecordings = recordings.filter((r) => r.course_name === course);
                        
                        return (
                          <div key={course} className="border rounded-lg p-4">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <BookOpen className="h-4 w-4" />
                              {course}
                              <Badge variant="secondary">{courseRecordings.length} recordings</Badge>
                            </h3>
                            {courseRecordings.length === 0 ? (
                              <p className="text-sm text-muted-foreground">No recordings for this course</p>
                            ) : (
                              <div className="space-y-2">
                                {courseRecordings.map((recording, index) => (
                                  <div
                                    key={recording.id}
                                    className="flex items-center justify-between p-2 bg-muted/50 rounded"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium">{index + 1}.</span>
                                      <span className="text-sm">{recording.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button asChild size="sm" variant="ghost">
                                        <a href={recording.recording_url} target="_blank" rel="noopener noreferrer">
                                          <ExternalLink className="h-4 w-4" />
                                        </a>
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-destructive hover:text-destructive"
                                        onClick={() => deleteRecording(recording.id)}
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Course Access Tab */}
            <TabsContent value="access">
              <Card>
                <CardHeader>
                  <CardTitle>Course Access</CardTitle>
                  <CardDescription>View all users with course access</CardDescription>
                </CardHeader>
                <CardContent>
                  {courseAccess.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No course access granted yet</p>
                  ) : (
                    <div className="space-y-3">
                      {courseAccess.map((access) => (
                        <div
                          key={access.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{access.course_name}</p>
                            <p className="text-sm text-muted-foreground">User ID: {access.user_id.slice(0, 8)}...</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="bg-green-500/10 text-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(access.unlocked_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
