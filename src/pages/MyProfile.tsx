import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { User, Edit2, Save } from "lucide-react";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  email: string;
  mobile: string;
  whatsapp: string;
  state: string;
  city: string;
  fatherOccupation: string;
  degree: string;
  department: string;
  graduationYear: string;
  graduationPercentage: string;
  tenth: string;
  twelfth: string;
  college: string;
  postGrad: string;
  employmentStatus: string;
  jobType: string;
  codingExperience: string;
}

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(false);
  const [editingCareer, setEditingCareer] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "TDCS USER",
    email: "",
    mobile: "",
    whatsapp: "",
    state: "Arunachal Pradesh",
    city: "Basar",
    fatherOccupation: "",
    degree: "Other",
    department: "",
    graduationYear: "2022",
    graduationPercentage: "",
    tenth: "",
    twelfth: "",
    college: "",
    postGrad: "No",
    employmentStatus: "Student",
    jobType: "",
    codingExperience: "No"
  });

  useEffect(() => {
    const userData = localStorage.getItem("tdcs_user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));

    // Load profile data from localStorage
    const savedProfile = localStorage.getItem("tdcs_profile");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, [navigate]);

  const handleSavePersonal = () => {
    localStorage.setItem("tdcs_profile", JSON.stringify(profileData));
    setEditingPersonal(false);
    toast.success("Personal details updated successfully!");
  };

  const handleSaveEducation = () => {
    localStorage.setItem("tdcs_profile", JSON.stringify(profileData));
    setEditingEducation(false);
    toast.success("Education details updated successfully!");
  };

  const handleSaveCareer = () => {
    localStorage.setItem("tdcs_profile", JSON.stringify(profileData));
    setEditingCareer(false);
    toast.success("Career details updated successfully!");
  };

  const handleUpdateAll = () => {
    localStorage.setItem("tdcs_profile", JSON.stringify(profileData));
    toast.success("Profile updated successfully!");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          {/* Page Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold gradient-text">My Profile</h1>
            <p className="text-muted-foreground">Manage and update your personal, education, and career details.</p>
          </div>

          {/* Profile Header Card */}
          <Card className="shadow-glow-lg border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-white text-2xl font-bold shadow-glow">
                  <User className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{profileData.name}</h2>
                  <p className="text-muted-foreground">{profileData.email || "Update your email"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Details Card */}
          <Card className="shadow-glow rounded-2xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-semibold">Personal Details</CardTitle>
                  <CardDescription>Please fill in your personal details</CardDescription>
                </div>
                <Button
                  variant={editingPersonal ? "default" : "outline"}
                  size="sm"
                  onClick={editingPersonal ? handleSavePersonal : () => setEditingPersonal(true)}
                >
                  {editingPersonal ? <><Save className="mr-2 h-4 w-4" />Save</> : <><Edit2 className="mr-2 h-4 w-4" />Edit</>}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!editingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email ID</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!editingPersonal}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-medium text-muted-foreground">Mobile Number</Label>
                  <Input
                    id="mobile"
                    value={profileData.mobile}
                    onChange={(e) => setProfileData({ ...profileData, mobile: e.target.value })}
                    disabled={!editingPersonal}
                    placeholder="Enter mobile number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-sm font-medium text-muted-foreground">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={profileData.whatsapp}
                    onChange={(e) => setProfileData({ ...profileData, whatsapp: e.target.value })}
                    disabled={!editingPersonal}
                    placeholder="Enter WhatsApp number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium text-muted-foreground">Current State</Label>
                  <Input
                    id="state"
                    value={profileData.state}
                    onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                    disabled={!editingPersonal}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-muted-foreground">Current City</Label>
                  <Input
                    id="city"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                    disabled={!editingPersonal}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="fatherOccupation" className="text-sm font-medium text-muted-foreground">Father's Occupation</Label>
                  <Select
                    value={profileData.fatherOccupation}
                    onValueChange={(value) => setProfileData({ ...profileData, fatherOccupation: value })}
                    disabled={!editingPersonal}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="government">Government Employee</SelectItem>
                      <SelectItem value="private">Private Employee</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="farmer">Farmer</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education Details Card */}
          <Card className="shadow-glow rounded-2xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-semibold">Education Details</CardTitle>
                  <CardDescription>Please fill in your education details</CardDescription>
                </div>
                <Button
                  variant={editingEducation ? "default" : "outline"}
                  size="sm"
                  onClick={editingEducation ? handleSaveEducation : () => setEditingEducation(true)}
                >
                  {editingEducation ? <><Save className="mr-2 h-4 w-4" />Save</> : <><Edit2 className="mr-2 h-4 w-4" />Edit</>}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="degree" className="text-sm font-medium text-muted-foreground">Degree</Label>
                  <Input
                    id="degree"
                    value={profileData.degree}
                    onChange={(e) => setProfileData({ ...profileData, degree: e.target.value })}
                    disabled={!editingEducation}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department" className="text-sm font-medium text-muted-foreground">Dept/Stream</Label>
                  <Select
                    value={profileData.department}
                    onValueChange={(value) => setProfileData({ ...profileData, department: value })}
                    disabled={!editingEducation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="it">Information Technology</SelectItem>
                      <SelectItem value="ece">Electronics & Communication</SelectItem>
                      <SelectItem value="ee">Electrical Engineering</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="ce">Civil Engineering</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduationYear" className="text-sm font-medium text-muted-foreground">Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    value={profileData.graduationYear}
                    onChange={(e) => setProfileData({ ...profileData, graduationYear: e.target.value })}
                    disabled={!editingEducation}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduationPercentage" className="text-sm font-medium text-muted-foreground">Graduation Percentage</Label>
                  <Input
                    id="graduationPercentage"
                    value={profileData.graduationPercentage}
                    onChange={(e) => setProfileData({ ...profileData, graduationPercentage: e.target.value })}
                    disabled={!editingEducation}
                    placeholder="Enter percentage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tenth" className="text-sm font-medium text-muted-foreground">10th Percentage/Board</Label>
                  <Input
                    id="tenth"
                    value={profileData.tenth}
                    onChange={(e) => setProfileData({ ...profileData, tenth: e.target.value })}
                    disabled={!editingEducation}
                    placeholder="e.g., 85% CBSE"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twelfth" className="text-sm font-medium text-muted-foreground">12th Percentage/Board</Label>
                  <Input
                    id="twelfth"
                    value={profileData.twelfth}
                    onChange={(e) => setProfileData({ ...profileData, twelfth: e.target.value })}
                    disabled={!editingEducation}
                    placeholder="e.g., 88% CBSE"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="college" className="text-sm font-medium text-muted-foreground">College Name</Label>
                  <Input
                    id="college"
                    value={profileData.college}
                    onChange={(e) => setProfileData({ ...profileData, college: e.target.value })}
                    disabled={!editingEducation}
                    placeholder="Enter college name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postGrad" className="text-sm font-medium text-muted-foreground">Pursuing Post Graduation</Label>
                  <Select
                    value={profileData.postGrad}
                    onValueChange={(value) => setProfileData({ ...profileData, postGrad: value })}
                    disabled={!editingEducation}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Details Card */}
          <Card className="shadow-glow rounded-2xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-semibold">Career Details</CardTitle>
                  <CardDescription>Please fill in your career details</CardDescription>
                </div>
                <Button
                  variant={editingCareer ? "default" : "outline"}
                  size="sm"
                  onClick={editingCareer ? handleSaveCareer : () => setEditingCareer(true)}
                >
                  {editingCareer ? <><Save className="mr-2 h-4 w-4" />Save</> : <><Edit2 className="mr-2 h-4 w-4" />Edit</>}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus" className="text-sm font-medium text-muted-foreground">Employment Status</Label>
                  <Input
                    id="employmentStatus"
                    value={profileData.employmentStatus}
                    onChange={(e) => setProfileData({ ...profileData, employmentStatus: e.target.value })}
                    disabled={!editingCareer}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType" className="text-sm font-medium text-muted-foreground">Desired Job Type</Label>
                  <Select
                    value={profileData.jobType}
                    onValueChange={(value) => setProfileData({ ...profileData, jobType: value })}
                    disabled={!editingCareer}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fulltime">Full Time</SelectItem>
                      <SelectItem value="parttime">Part Time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="codingExperience" className="text-sm font-medium text-muted-foreground">Have you done coding before?</Label>
                  <Select
                    value={profileData.codingExperience}
                    onValueChange={(value) => setProfileData({ ...profileData, codingExperience: value })}
                    disabled={!editingCareer}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Yes</SelectItem>
                      <SelectItem value="No">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Global Update Button */}
          <div className="flex justify-center pt-4">
            <Button
              variant="gradient"
              size="lg"
              onClick={handleUpdateAll}
              className="w-full md:w-auto px-12"
            >
              Update Profile
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
