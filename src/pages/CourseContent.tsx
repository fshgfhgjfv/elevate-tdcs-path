import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import { Download, FileText, Lock, CheckCircle, Award, BookOpen, ClipboardList, HelpCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Course-specific quizzes
const courseQuizzes: Record<string, { moduleId: string; title: string; questions: any[] }[]> = {
  "cyber-lite": [
    {
      moduleId: "module-1",
      title: "Network Security Fundamentals",
      questions: [
        { id: 1, difficulty: "Easy", question: "What is the primary purpose of network security?", options: ["A. To make networks faster", "B. To protect data and resources from unauthorized access", "C. To reduce network costs", "D. To increase bandwidth"], correctAnswer: "B", explanation: "Network security aims to protect data and resources from unauthorized access, attacks, and breaches." },
        { id: 2, difficulty: "Easy", question: "Which protocol is used for secure web browsing?", options: ["A. HTTP", "B. FTP", "C. HTTPS", "D. SMTP"], correctAnswer: "C", explanation: "HTTPS (HTTP Secure) uses SSL/TLS encryption for secure web communication." },
        { id: 3, difficulty: "Medium", question: "What does a firewall primarily do?", options: ["A. Increases internet speed", "B. Filters incoming and outgoing network traffic based on security rules", "C. Stores passwords securely", "D. Encrypts all data"], correctAnswer: "B", explanation: "Firewalls monitor and filter network traffic based on predefined security rules." },
      ]
    },
    {
      moduleId: "module-2",
      title: "Password Cracking Techniques",
      questions: [
        { id: 1, difficulty: "Easy", question: "What is a brute force attack?", options: ["A. A social engineering technique", "B. Trying all possible password combinations systematically", "C. Using malware to steal passwords", "D. Encrypting passwords"], correctAnswer: "B", explanation: "Brute force attacks try every possible combination until finding the correct password." },
        { id: 2, difficulty: "Medium", question: "What is password hashing?", options: ["A. Storing passwords in plain text", "B. Converting passwords into fixed-length encrypted strings", "C. Sharing passwords securely", "D. Deleting passwords"], correctAnswer: "B", explanation: "Hashing converts passwords into fixed-length strings using cryptographic algorithms." },
      ]
    },
  ],
  "cyber-blackhat": [
    {
      moduleId: "module-1",
      title: "Exploit Development Basics",
      questions: [
        { id: 1, difficulty: "Medium", question: "What is a buffer overflow?", options: ["A. When a program writes data beyond the buffer boundary", "B. When a buffer is too small", "C. When memory is full", "D. A type of encryption"], correctAnswer: "A", explanation: "Buffer overflow occurs when a program writes data beyond the allocated buffer, potentially allowing code execution." },
        { id: 2, difficulty: "Hard", question: "What is the purpose of a NOP sled?", options: ["A. To encrypt data", "B. To provide a landing zone for shellcode execution", "C. To increase program speed", "D. To compress files"], correctAnswer: "B", explanation: "NOP sleds provide a large target for the return address to land on before reaching shellcode." },
      ]
    },
    {
      moduleId: "module-2",
      title: "Reverse Engineering",
      questions: [
        { id: 1, difficulty: "Medium", question: "What is the main purpose of reverse engineering malware?", options: ["A. To create new malware", "B. To understand its behavior and create defenses", "C. To sell it", "D. To make it faster"], correctAnswer: "B", explanation: "Reverse engineering helps understand malware behavior to develop detection and prevention strategies." },
      ]
    },
  ],
  "bug-hunting-pentest": [
    {
      moduleId: "module-1",
      title: "Bug Bounty Fundamentals",
      questions: [
        { id: 1, difficulty: "Easy", question: "What is a bug bounty program?", options: ["A. A software development method", "B. A program where companies pay for security vulnerabilities", "C. A type of malware", "D. A hiring program"], correctAnswer: "B", explanation: "Bug bounty programs reward security researchers for discovering and reporting vulnerabilities." },
        { id: 2, difficulty: "Medium", question: "Which platform is popular for bug bounty hunting?", options: ["A. LinkedIn", "B. HackerOne", "C. Facebook", "D. GitHub"], correctAnswer: "B", explanation: "HackerOne is one of the leading bug bounty platforms connecting researchers with companies." },
      ]
    },
    {
      moduleId: "module-2",
      title: "Web Application Security",
      questions: [
        { id: 1, difficulty: "Easy", question: "What does XSS stand for?", options: ["A. Extra Secure System", "B. Cross-Site Scripting", "C. Cross-Server Security", "D. eXtreme Security Standard"], correctAnswer: "B", explanation: "XSS (Cross-Site Scripting) is a vulnerability that allows attackers to inject malicious scripts." },
        { id: 2, difficulty: "Medium", question: "What is SQL Injection?", options: ["A. A database optimization", "B. Inserting malicious SQL code through user input", "C. A type of encryption", "D. A programming language"], correctAnswer: "B", explanation: "SQL Injection occurs when attackers insert malicious SQL code through user inputs to manipulate databases." },
      ]
    },
  ],
  "network-security-defense": [
    {
      moduleId: "module-1",
      title: "Network Fundamentals & OSI Model",
      questions: [
        { id: 1, difficulty: "Easy", question: "How many layers are in the OSI model?", options: ["A. 5", "B. 6", "C. 7", "D. 8"], correctAnswer: "C", explanation: "The OSI model consists of 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application." },
        { id: 2, difficulty: "Medium", question: "At which OSI layer do routers operate?", options: ["A. Layer 1", "B. Layer 2", "C. Layer 3", "D. Layer 4"], correctAnswer: "C", explanation: "Routers operate at Layer 3 (Network Layer) using IP addresses for routing." },
      ]
    },
    {
      moduleId: "module-2",
      title: "Firewall Architecture",
      questions: [
        { id: 1, difficulty: "Easy", question: "What is the primary function of a firewall?", options: ["A. Speed up internet", "B. Filter network traffic", "C. Store data", "D. Encrypt files"], correctAnswer: "B", explanation: "Firewalls filter network traffic based on predefined security rules." },
        { id: 2, difficulty: "Medium", question: "What is a stateful firewall?", options: ["A. A firewall that doesn't track connections", "B. A firewall that monitors active connections", "C. A physical firewall", "D. A firewall for mobile devices"], correctAnswer: "B", explanation: "Stateful firewalls track active connections and make decisions based on the state of traffic." },
      ]
    },
    {
      moduleId: "module-3",
      title: "IDS/IPS Systems",
      questions: [
        { id: 1, difficulty: "Easy", question: "What does IDS stand for?", options: ["A. Internet Defense System", "B. Intrusion Detection System", "C. Internal Data Security", "D. Integrated Digital System"], correctAnswer: "B", explanation: "IDS (Intrusion Detection System) monitors network traffic for suspicious activity." },
        { id: 2, difficulty: "Medium", question: "What is the main difference between IDS and IPS?", options: ["A. IPS is passive, IDS is active", "B. IDS detects, IPS prevents", "C. They are the same", "D. IDS is for networks, IPS for applications"], correctAnswer: "B", explanation: "IDS only detects and alerts, while IPS can actively block malicious traffic." },
      ]
    },
  ],
};

// Course-specific notes/materials
const courseNotes: Record<string, { id: string; title: string; description: string; type: string }[]> = {
  "cyber-lite": [
    { id: "note-1", title: "Network Security Cheat Sheet", description: "Quick reference for network security concepts", type: "PDF" },
    { id: "note-2", title: "Linux Commands for Hackers", description: "Essential Linux commands for security professionals", type: "PDF" },
    { id: "note-3", title: "Password Security Guide", description: "Best practices for password security", type: "PDF" },
    { id: "note-4", title: "Reconnaissance Tools Guide", description: "Overview of information gathering tools", type: "PDF" },
  ],
  "cyber-blackhat": [
    { id: "note-1", title: "Exploit Development Manual", description: "Complete guide to exploit development", type: "PDF" },
    { id: "note-2", title: "Reverse Engineering with Ghidra", description: "Step-by-step reverse engineering guide", type: "PDF" },
    { id: "note-3", title: "Malware Analysis Handbook", description: "Professional malware analysis techniques", type: "PDF" },
    { id: "note-4", title: "Red Team Operations Guide", description: "Advanced red teaming strategies", type: "PDF" },
    { id: "note-5", title: "Digital Forensics Toolkit", description: "Essential forensics tools and methods", type: "PDF" },
  ],
  "bug-hunting-pentest": [
    { id: "note-1", title: "OWASP Top 10 Explained", description: "Detailed breakdown of top vulnerabilities", type: "PDF" },
    { id: "note-2", title: "Bug Bounty Methodology", description: "Professional bug hunting workflow", type: "PDF" },
    { id: "note-3", title: "Burp Suite Pro Guide", description: "Master Burp Suite for web testing", type: "PDF" },
    { id: "note-4", title: "API Security Testing Guide", description: "Finding vulnerabilities in APIs", type: "PDF" },
    { id: "note-5", title: "Report Writing Templates", description: "Professional pentest report templates", type: "DOCX" },
  ],
  "network-security-defense": [
    { id: "note-1", title: "Network Security Handbook", description: "Comprehensive network security guide", type: "PDF" },
    { id: "note-2", title: "Firewall Configuration Guide", description: "pfSense and FortiGate configurations", type: "PDF" },
    { id: "note-3", title: "Wireshark Cheat Sheet", description: "Quick reference for packet analysis", type: "PDF" },
    { id: "note-4", title: "SIEM Implementation Manual", description: "Splunk and ELK Stack setup guide", type: "PDF" },
    { id: "note-5", title: "Incident Response Playbook", description: "Step-by-step IR procedures", type: "PDF" },
    { id: "note-6", title: "Zero Trust Architecture Guide", description: "Implementing zero trust security", type: "PDF" },
  ],
};

const CourseContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const course = courses.find((c) => c.id === id);
  
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentQuizModule, setCurrentQuizModule] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  const quizzes = courseQuizzes[id || ""] || [];
  const notes = courseNotes[id || ""] || [];

  useEffect(() => {
    const enrollmentKey = `tdcs_purchased_${id}`;
    const enrollment = localStorage.getItem(enrollmentKey);
    
    if (!enrollment) {
      setIsEnrolled(false);
    } else {
      setIsEnrolled(true);
      loadProgress();
    }
  }, [id]);

  const loadProgress = () => {
    const savedProgress = localStorage.getItem(`course_progress_${id}`);
    if (savedProgress) {
      const data = JSON.parse(savedProgress);
      setCompletedQuizzes(data.completedQuizzes || []);
      setEarnedBadges(data.earnedBadges || []);
    }
  };

  const saveProgress = (updates: any) => {
    const data = {
      completedQuizzes,
      earnedBadges,
      ...updates
    };
    localStorage.setItem(`course_progress_${id}`, JSON.stringify(data));
  };

  const handleQuizSubmit = () => {
    const currentQuiz = quizzes[currentQuizModule];
    let correctCount = 0;
    
    currentQuiz.questions.forEach((q: any) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    setQuizSubmitted(true);
    const score = (correctCount / currentQuiz.questions.length) * 100;
    
    if (score >= 60) {
      const newCompleted = [...completedQuizzes, currentQuiz.moduleId];
      setCompletedQuizzes(newCompleted);
      
      const newBadge = `${currentQuiz.title} - Passed`;
      const newBadges = [...earnedBadges, newBadge];
      setEarnedBadges(newBadges);
      
      saveProgress({ completedQuizzes: newCompleted, earnedBadges: newBadges });

      toast({
        title: "🎉 Quiz Passed!",
        description: `You scored ${correctCount}/${currentQuiz.questions.length}.`,
      });
    } else {
      toast({
        title: "Keep Trying!",
        description: `You scored ${correctCount}/${currentQuiz.questions.length}. You need 60% to pass.`,
        variant: "destructive"
      });
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const calculateOverallProgress = () => {
    if (quizzes.length === 0) return 0;
    return Math.round((completedQuizzes.length / quizzes.length) * 100);
  };

  if (!course) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses">
            <Button variant="gradient">Browse Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="shadow-glow-lg p-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center">
                  <Lock className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
              <p className="text-lg text-muted-foreground mb-8">
                You must enroll in this course to view the content.
              </p>
              <Link to={`/courses/${id}/enroll`}>
                <Button variant="gradient" size="lg">
                  Enroll Now
                </Button>
              </Link>
            </Card>
          </motion.div>
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
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <Link to={`/courses/${id}`} className="text-primary hover:underline mb-4 inline-block">
              ← Back to Course Details
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              {course.title}
            </h1>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Your Progress</span>
                  <span className="font-semibold">{calculateOverallProgress()}%</span>
                </div>
                <Progress value={calculateOverallProgress()} className="h-2" />
              </div>
            </div>

            {/* Earned Badges */}
            {earnedBadges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {earnedBadges.map((badge, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-2 rounded-full border border-primary/30"
                  >
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{badge}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="notes" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="notes" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4" />
                Quizzes
              </TabsTrigger>
              <TabsTrigger value="modules" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Modules
              </TabsTrigger>
            </TabsList>

            {/* Notes Tab */}
            <TabsContent value="notes">
              <Card className="shadow-glow">
                <CardHeader>
                  <CardTitle className="gradient-text flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Study Materials & Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {notes.map((note) => (
                      <motion.div
                        key={note.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                            <FileText className="text-white w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{note.title}</p>
                            <p className="text-sm text-muted-foreground">{note.description}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          {note.type}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                  
                  <Button variant="gradient" className="w-full mt-6">
                    <Download className="mr-2 h-4 w-4" />
                    Download All Materials
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Quizzes Tab */}
            <TabsContent value="quizzes">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Quiz List */}
                <div className="space-y-2">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Available Quizzes
                  </h3>
                  {quizzes.map((quiz, index) => {
                    const isCompleted = completedQuizzes.includes(quiz.moduleId);
                    return (
                      <Card
                        key={quiz.moduleId}
                        className={`cursor-pointer transition-all duration-300 ${
                          currentQuizModule === index
                            ? "shadow-glow border-primary bg-primary/5"
                            : "hover:shadow-glow"
                        }`}
                        onClick={() => {
                          setCurrentQuizModule(index);
                          resetQuiz();
                        }}
                      >
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted ? "bg-green-500" : "bg-muted"
                          }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : (
                              <span className="text-sm font-semibold">{index + 1}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{quiz.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {quiz.questions.length} questions
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Quiz Content */}
                <div className="lg:col-span-3">
                  {quizzes.length > 0 && (
                    <Card className="shadow-glow-lg">
                      <CardHeader>
                        <CardTitle className="gradient-text">
                          Quiz: {quizzes[currentQuizModule].title}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          Answer correctly to earn your badge. 60% required to pass.
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {quizzes[currentQuizModule].questions.map((q: any, idx: number) => (
                          <motion.div
                            key={q.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-muted/30 p-6 rounded-lg border"
                          >
                            <div className="flex items-start gap-3 mb-4">
                              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                                Q{q.id}
                              </span>
                              <span className="px-3 py-1 bg-muted rounded-full text-sm">
                                {q.difficulty}
                              </span>
                            </div>
                            <p className="text-lg font-medium mb-4">{q.question}</p>
                            
                            <RadioGroup
                              value={quizAnswers[q.id]}
                              onValueChange={(value) => 
                                setQuizAnswers({ ...quizAnswers, [q.id]: value })
                              }
                              disabled={quizSubmitted}
                            >
                              {q.options.map((option: string, optIdx: number) => {
                                const optionLetter = option.charAt(0);
                                const isCorrect = optionLetter === q.correctAnswer;
                                const isSelected = quizAnswers[q.id] === optionLetter;
                                
                                return (
                                  <div
                                    key={optIdx}
                                    className={`flex items-center space-x-3 p-4 rounded-lg mb-2 transition-all ${
                                      quizSubmitted
                                        ? isCorrect
                                          ? 'bg-green-500/20 border-2 border-green-400'
                                          : isSelected && !isCorrect
                                          ? 'bg-red-500/20 border-2 border-red-400'
                                          : 'bg-background'
                                        : 'bg-background hover:bg-muted'
                                    }`}
                                  >
                                    <RadioGroupItem value={optionLetter} id={`q${q.id}-${optIdx}`} />
                                    <Label
                                      htmlFor={`q${q.id}-${optIdx}`}
                                      className="flex-1 cursor-pointer"
                                    >
                                      {option}
                                    </Label>
                                  </div>
                                );
                              })}
                            </RadioGroup>
                            
                            {quizSubmitted && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-4 p-4 bg-primary/10 rounded-lg"
                              >
                                <p className="font-semibold mb-2">Explanation:</p>
                                <p className="text-muted-foreground">{q.explanation}</p>
                              </motion.div>
                            )}
                          </motion.div>
                        ))}

                        <div className="flex gap-4">
                          {!quizSubmitted ? (
                            <Button
                              onClick={handleQuizSubmit}
                              disabled={Object.keys(quizAnswers).length < quizzes[currentQuizModule].questions.length}
                              className="flex-1"
                              variant="gradient"
                              size="lg"
                            >
                              Submit Quiz
                            </Button>
                          ) : (
                            <Button
                              onClick={resetQuiz}
                              className="flex-1"
                              variant="outline"
                              size="lg"
                            >
                              Try Again
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Modules Tab */}
            <TabsContent value="modules">
              <Card className="shadow-glow">
                <CardHeader>
                  <CardTitle className="gradient-text flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Course Modules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.modules.map((module, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                          <span className="font-medium">{module}</span>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Certificate CTA */}
          <Card className="mt-8 shadow-glow-lg gradient-primary text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Complete All Quizzes</h3>
              <p className="mb-6 opacity-90">
                Pass all module quizzes to earn your professional certificate
              </p>
              <Link to="/certificate-download">
                <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
                  View Certificate
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseContent;
