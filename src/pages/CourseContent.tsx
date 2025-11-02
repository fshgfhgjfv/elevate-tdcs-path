import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { motion } from "framer-motion";
import { Download, FileText, Lock, Play, CheckCircle, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface VideoLesson {
  id: string;
  title: string;
  videoId: string;
  quiz: Quiz;
}

interface Quiz {
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: number;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const videoLessons: VideoLesson[] = [
  {
    id: "lesson-1",
    title: "Network Security Fundamentals",
    videoId: "sesacY7Xz3c",
    quiz: {
      questions: [
        {
          id: 1,
          difficulty: "Easy",
          question: "What is the primary purpose of network security?",
          options: [
            "A. To make networks faster",
            "B. To protect data and resources from unauthorized access",
            "C. To reduce network costs",
            "D. To increase bandwidth"
          ],
          correctAnswer: "B",
          explanation: "Network security aims to protect data and resources from unauthorized access, attacks, and breaches."
        },
        {
          id: 2,
          difficulty: "Easy",
          question: "Which protocol is used for secure web browsing?",
          options: ["A. HTTP", "B. FTP", "C. HTTPS", "D. SMTP"],
          correctAnswer: "C",
          explanation: "HTTPS (HTTP Secure) uses SSL/TLS encryption for secure web communication."
        },
        {
          id: 3,
          difficulty: "Medium",
          question: "What does a firewall primarily do?",
          options: [
            "A. Increases internet speed",
            "B. Filters incoming and outgoing network traffic based on security rules",
            "C. Stores passwords securely",
            "D. Encrypts all data"
          ],
          correctAnswer: "B",
          explanation: "Firewalls monitor and filter network traffic based on predefined security rules."
        },
        {
          id: 4,
          difficulty: "Hard",
          question: "Which of the following is NOT a type of network attack?",
          options: [
            "A. DDoS (Distributed Denial of Service)",
            "B. Man-in-the-Middle",
            "C. Compiler Optimization",
            "D. SQL Injection"
          ],
          correctAnswer: "C",
          explanation: "Compiler Optimization is a programming concept, not a network attack."
        },
        {
          id: 5,
          difficulty: "Very Hard",
          question: "In a Zero Trust security model, what is the fundamental principle?",
          options: [
            "A. Trust everyone inside the network perimeter",
            "B. Never trust, always verify every access request",
            "C. Only verify external requests",
  _         "D. Trust based on IP address"
          ],
          correctAnswer: "B",
          explanation: "Zero Trust assumes no implicit trust and requires verification for every access request, regardless of location."
        }
      ]
    }
  },
  {
    id: "lesson-2",
    title: "Password Cracking Techniques",
    videoId: "z4_oqTZJqCo",
    quiz: {
      questions: [
        {
          id: 1,
          difficulty: "Easy",
          question: "What is a brute force attack?",
          options: [
            "A. A social engineering technique",
            "B. Trying all possible password combinations systematically",
            "C. Using malware to steal passwords",
            "D. Encrypting passwords"
          ],
          correctAnswer: "B",
          explanation: "Brute force attacks try every possible combination until finding the correct password."
        },
        {
          id: 2,
          difficulty: "Easy-Medium",
          question: "What is a dictionary attack?",
          options: [
            "A. Using common words and phrases as password guesses",
            "B. Reading the dictionary for fun",
            "C. Encrypting dictionary words",
            "D. A type of encryption"
          ],
          correctAnswer: "A",
          explanation: "Dictionary attacks use lists of common words, phrases, and known passwords to crack accounts."
        },
        {
          id: 3,
          difficulty: "Medium",
          question: "What is password hashing?",
          options: [
            "A. Storing passwords in plain text",
            "B. Converting passwords into fixed-length encrypted strings",
            "C. Sharing passwords securely",
            "D. Deleting passwords"
          ],
          correctAnswer: "B",
          explanation: "Hashing converts passwords into fixed-length strings using cryptographic algorithms, making them secure for storage."
        },
        {
          id: 4,
          difficulty: "Hard",
          question: "What is a rainbow table attack?",
          options: [
            "A. Using pre-computed hash values to crack passwords quickly",
            "B. A colorful display attack",
            "C. Brute forcing with colors",
            "D. Social engineering via email"
          ],
          correctAnswer: "A",
          explanation: "Rainbow tables contain pre-computed hashes that speed up password cracking significantly."
        },
        {
          id: 5,
          difficulty: "Very Hard",
          question: "Which technique makes rainbow table attacks ineffective?",
          options: [
            "A. Using longer passwords only",
            "B. Adding a unique salt to each password before hashing",
            "C. Using uppercase letters",
            "D. Changing passwords monthly"
          ],
          correctAnswer: "B",
          explanation: "Salting adds random data to passwords before hashing, making each hash unique and rainbow tables useless."
        }
      ]
    }
  },
  {
    id: "lesson-3",
    title: "Web Application Vulnerabilities",
    videoId: "F5KJVuii0Yw",
    quiz: {
      questions: [
        {
          id: 1,
          difficulty: "Easy",
          question: "Which of the following best describes a reflected XSS vulnerability?",
          options: [
            "A. Malicious script stored on the server and served to every user.",
            "B. A script injected by an attacker that is reflected off the server in a response to a victim's request.",
            "C. Running server-side code that leaks database credentials.",
            "D. An attacker modifying DNS records to redirect traffic."
          ],
          correctAnswer: "B",
          explanation: "Reflected XSS occurs when attacker-supplied data is included in a response (e.g., search results, error message) without proper encoding, causing the victim's browser to execute the script."
        },
        {
          id: 2,
          difficulty: "Easy-Medium",
          question: "An application builds this SQL query by concatenating user input directly:\n\nSELECT * FROM users WHERE username = '\" + input_username + \"';\n\nWhich attacker input could allow login bypass (classic SQL injection)?",
          options: [
            "A. alice",
            "B. ' OR '1'='1",
          _ "C. ../etc/passwd",
            "D. <script>alert(1)</script>"
          ],
          correctAnswer: "B",
          explanation: "Input ' OR '1'='1 changes the WHERE clause to always true, returning all users and enabling bypass. Correct fix: parameterized queries / prepared statements."
ci     },
        {
          id: 3,
          difficulty: "Medium",
          question: "Which defense is the most effective and recommended way to prevent CSRF on state-changing POST requests?",
          options: [
            "A. Using CAPTCHAs on every form.",
            "B. Verifying the Origin or Referer header only.",
            "C. Including and validating a per-session or per-request anti-CSRF token.",
            "D. Requiring the user to re-enter their password on each request."
          ],
    _     correctAnswer: "C",
          explanation: "Anti-CSRF tokens (synchronized/Double-Submit) that the server generates and validates are the recommended defense. Origin/Referer checks help but can be insufficient alone."
        },
        {
          id: 4,
          difficulty: "Hard",
          question: "An API endpoint /api/orders/{orderId} returns order details. User A can access /api/orders/123 and receives JSON for order 123 which belongs to User B. What is the primary underlying vulnerability and the best corrective measure?",
          options: [
            "A. Vulnerability: XSS. Fix: escape output.",
            "B. Vulnerability: IDOR / broken access control. Fix: enforce server-side authorization checks that confirm the requesting user is allowed to access the requested resource.",
            "C. Vulnerability: CSRF. Fix: add CSRF tokens.",
            "D. Vulnerability: SSRF. Fix: block internal network calls."
          ],
          correctAnswer: "B",
          explanation: "This is an IDOR / broken access control issue. The server must enforce authorization — e.g., check order.ownerId == currentUser.id — rather than relying on obscurity or client-side checks."
        },
        {
          id: 5,
          difficulty: "Very Hard",
          question: "A web app accepts serialized objects from clients, deserializes them directly, and later executes methods on objects. An attacker crafts a malicious serialized payload that, when deserialized, triggers arbitrary code execution on the server. Which mitigation(s) best reduce this risk?",
          options: [
            "A. Accept and deserialize only from authenticated clients.",
            "B. Switch to a different serialization format (e.g., JSON) and validate inputs; implement strict allowlists for types during deserialization; run the app with least privilege and sandboxing.",
            "C. Encrypt serialized objects with HTTPS so transport is secure.",
            "D. Increase server logging and alerting for suspicious activity."
          ],
          correctAnswer: "B",
          explanation: "Safest approach: avoid unsafe native deserialization; prefer safer formats (JSON) or use frameworks that restrict types; implement type allowlists during deserialization; run with minimal privileges and sandbox critical functionality. Transport encryption (C) and logging (D) help but don't prevent exploitation; (A) isn't sufficient because authenticated clients can still send malicious payloads."
        }
      ]
    }
  }
];

const CourseContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const course = courses.find((c) => c.id === id);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [videoProgress, setVideoProgress] = useState<Record<string, number>>({});
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check enrollment status
    const enrollmentKey = `tdcs_purchased_${id}`;
    const enrollment = localStorage.getItem(enrollmentKey);
    
    if (!enrollment) {
      setIsEnrolled(false);
    } else {
      setIsEnrolled(true);
      loadProgress();
    }
  }, [id]);

  // Screen recording detection
  useEffect(() => {
    const detectScreenRecording = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', detectScreenRecording);
    
    return () => {
      document.removeEventListener('visibilitychange', detectScreenRecording);
    };
  }, []);

  const loadProgress = () => {
    const savedProgress = localStorage.getItem(`course_progress_${id}`);
    if (savedProgress) {
      const data = JSON.parse(savedProgress);
      setVideoProgress(data.videoProgress || {});
      setCompletedLessons(data.completedLessons || []);
      setEarnedBadges(data.earnedBadges || []);
      setCurrentLesson(data.currentLesson || 0);
    }
  };

  const saveProgress = (updates: any) => {
    const data = {
      videoProgress,
      completedLessons,
      earnedBadges,
      currentLesson,
      ...updates
    };
    localStorage.setItem(`course_progress_${id}`, JSON.stringify(data));
  };

  const handleVideoProgress = (lessonId: string, progress: number) => {
    const newProgress = { ...videoProgress, [lessonId]: progress };
    setVideoProgress(newProgress);
    saveProgress({ videoProgress: newProgress });

    if (progress >= 100 && !completedLessons.includes(lessonId)) {
      setShowQuiz(true);
    }
  };

  const handleQuizSubmit = () => {
    const currentQuiz = videoLessons[currentLesson].quiz;
    let correctCount = 0;
    
    currentQuiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    setQuizSubmitted(true);

    const score = (correctCount / currentQuiz.questions.length) * 100;
    
    if (score >= 80) {
      const lessonId = videoLessons[currentLesson].id;
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      
      const newBadge = `${videoLessons[currentLesson].title} Master`;
      const newBadges = [...earnedBadges, newBadge];
      setEarnedBadges(newBadges);
      
      saveProgress({ 
        completedLessons: newCompleted, 
        earnedBadges: newBadges,
        currentLesson: currentLesson + 1
      });

      toast({
        title: "🎉 Quiz Passed!",
        description: `You scored ${correctCount}/${currentQuiz.questions.length}. Next lesson unlocked!`,
      });

      setTimeout(() => {
        setShowQuiz(false);
        setQuizSubmitted(false);
        setQuizAnswers({});
        if (currentLesson < videoLessons.length - 1) {
          setCurrentLesson(currentLesson + 1);
        }
      }, 3000);
    } else {
      toast({
        title: "Keep Trying!",
        description: `You scored ${correctCount}/${currentQuiz.questions.length}. You need 80% to pass. Review the video and try again.`,
        variant: "destructive"
      });
    }
  };

  const isLessonUnlocked = (index: number) => {
    if (index === 0) return true;
    return completedLessons.includes(videoLessons[index - 1].id);
  };

  const calculateOverallProgress = () => {
    return Math.round((completedLessons.length / videoLessons.length) * 100);
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
A       <div className="container mx-auto px-4">
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
    s       </div>
              <h1 className="text-3xl font-bold mb-4">Access Restricted</h1>
              <p className="text-lg text-muted-foreground mb-8">
                You must enroll in this course to view the content.
              </p>
              <Link to={`/courses/${id}`}>
a             <Button variant="gradient" size="lg">
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
          className="max-w-6xl mx-auto select-none"
          onContextMenu={(e) => e.preventDefault()}
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
transc         )}
          </div>

          {/* Lessons List */}
          <Card className="mb-8 shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">Video Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {videoLessons.map((lesson, index) => {
                  const unlocked = isLessonUnlocked(index);
                  const completed = completedLessons.includes(lesson.id);
                  const isCurrent = index === currentLesson;
                  
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => unlocked && setCurrentLesson(index)}
                      disabled={!unlocked}
                      className={`w-full flex items-center justify-between p-4 rounded-lg transition-all ${
                        isCurrent
                          ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary'
                          : unlocked
            _           ? 'bg-muted/50 hover:bg-muted'
                          : 'bg-muted/30 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          completed ? 'bg-green-500' : isCurrent ? 'gradient-primary' : 'bg-muted'
                        }`}>
                          {completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : unlocked ? (
                            <Play className="w-5 h-5 text-white" />
                          ) : (
                            <Lock className="w-5 h-5 text-muted-foreground" />
See                       )}
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{lesson.title}</p>
                          {videoProgress[lesson.id] > 0 && (
                            <p className="text-sm text-muted-foreground">
                              {Math.round(videoProgress[lesson.id])}% watched
                            </p>
                          )}
                        </div>
                      </div>
                      {!unlocked && <Lock className="w-5 h-5 text-muted-foreground" />}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Current Video Player */}
          {!showQuiz && (
            <Card className="mb-8 shadow-glow">
              <CardHeader>
                <CardTitle className="gradient-text">
                  {videoLessons[currentLesson].title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoLessons[currentLesson].videoId}?enablejsapi=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={(e) => {
i                     // Simulate progress tracking (in production, use YouTube API)
                      let progress = videoProgress[videoLessons[currentLesson].id] || 0;
                      progressIntervalRef.current = setInterval(() => {
                        if (progress < 100) {
                          progress += 1;
                          handleVideoProgress(videoLessons[currentLesson].id, progress);
                        } else {
                          if (progressIntervalRef.current) {
                            clearInterval(progressIntervalRef.current);
                          }
                        }
                      }, 3000); // Simulates progress every 3 seconds
                    }}
                  />
                </div>
                
                {/* Video Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Video Progress</span>
A                   <span className="font-semibold">
                      {Math.round(videoProgress[videoLessons[currentLesson].id] || 0)}%
                    </span>
                  </div>
                  <Progress 
                    value={videoProgress[videoLessons[currentLesson].id] || 0} 
                    className="h-2"
                  />
                  {(videoProgress[videoLessons[currentLesson].id] || 0) >= 100 && (
                    <Button 
                      onClick={() => setShowQuiz(true)}
                      className="w-full mt-4"
                      variant="gradient"
                    >
                      Take Quiz to Unlock Next Lesson
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quiz Section */}
          {showQuiz && (
            <Card className="mb-8 shadow-glow-lg gradient-primary text-white">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  Quiz: {videoLessons[currentLesson].title}
                </CardTitle>
                <p className="text-white/90">
                  Answer at least 4 out of 5 questions correctly to unlock the next lesson
ad             </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {videoLessons[currentLesson].quiz.questions.map((q, idx) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                        Q{q.id}
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {q.difficulty}
                      </span>
                    </div>
                    <p className="text-lg font-medium mb-4 whitespace-pre-line">{q.question}</p>
                    
                    <RadioGroup
                      value={quizAnswers[q.id]}
                      onValueChange={(value) => 
                        setQuizAnswers({ ...quizAnswers, [q.id]: value })
                      }
                      disabled={quizSubmitted}
          _         >
                      {q.options.map((option, optIdx) => {
                        const optionLetter = option.charAt(0);
                        const isCorrect = optionLetter === q.correctAnswer;
                        const isSelected = quizAnswers[q.id] === optionLetter;
                        
                        return (
                          <div
                            key={optIdx}
                            className={`flex items-center space-x-3 p-4 rounded-lg mb-2 transition-all ${
                              quizSubmitted
                                ? isCorrect
                                  ? 'bg-green-500/30 border-2 border-green-400'
                                  : isSelected && !isCorrect
                                  ? 'bg-red-500/30 border-2 border-red-400'
                                  : 'bg-white/5'
                                : 'bg-white/5 hover:bg-white/10'
                            }`}
                          >
                            <RadioGroupItem value={optionLetter} id={`q${q.id}-${optIdx}`} />
                            <Label
                d             htmlFor={`q${q.id}-${optIdx}`}
                              className="flex-1 cursor-pointer text-white"
                            >
                              {option}
                            </Label>
                          </div>
                        );
Ci                     })}
                    </RadioGroup>
                    
                    {quizSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-4 bg-white/20 rounded-lg"
email                   >
                        <p className="font-semibold mb-2">Explanation:</p>
                        <p className="text-white/90">{q.explanation}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}

                {!quizSubmitted && (
                  <Button
                    onClick={handleQuizSubmit}
transc                   disabled={Object.keys(quizAnswers).length < videoLessons[currentLesson].quiz.questions.length}
                    className="w-full bg-white text-primary hover:bg-white/90"
                    size="lg"
                  >
                    Submit Quiz
                  </Button>
s               )}
              </CardContent>
end         </Card>
          )}

          {/* Modules */}
          <Card className="mb-8 shadow-glow">
See           <CardHeader>
              <CardTitle className="gradient-text">Course Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {course.modules.map((module, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                    D <span className="font-medium">{module}</span>
                    </div>
                    <span className="text-sm text-primary font-semibold">
                      {index === 0 ? "Current" : index < 2 ? "Available" : "Locked"}
                  Data </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Downloadable Resources */}
          <Card className="mb-8 shadow-glow">
            <CardHeader>
              <CardTitle className="gradient-text">Downloadable Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {course.resources?.map((resource, index) => (
                  <div
                    key={index}
s                   className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
A                     <FileText className="text-primary" />
                      <span className="font-medium">{resource.name}</span>
s                   </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
a                     Download
                    </Button>
                  </div>
                ))}
                
                <Button variant="gradient" className="w-full mt-4">
                  <Download className="mr-2 h-4 w-4" />
                  Download All Materials
    Date           </Button>
              </div>
            </CardContent>
Data       </Card>

          {/* Certificate CTA */}
          <Card className="shadow-glow-lg gradient-primary text-white">
email           <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">Complete the Course</h3>
              <p className="mb-6 opacity-90">
                Finish all modules to earn your professional certificate
              </p>
              <Link to="/certificate-download">
                <Button variant="outline" className="bg-white text-primary hover:bg-white/90">
S                 View Certificate
          _     </Button>
              </Link>
            </CardContent>
        A </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseContent;