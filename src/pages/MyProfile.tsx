import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { User, Edit2, Save, Camera } from "lucide-react";
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
  profilePhoto?: string; // <-- NEW
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
    state: "",
    city: "",
    fatherOccupation: "",
    degree: "",
    department: "",
    graduationYear: "",
    graduationPercentage: "",
    tenth: "",
    twelfth: "",
    college: "",
    postGrad: "No",
    employmentStatus: "Student",
    jobType: "",
    codingExperience: "No",
    profilePhoto: "",
  });

  // ✅ Load user info from signup + saved profile
  useEffect(() => {
    const userData = localStorage.getItem("tdcs_user");
    if (!userData) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    const savedProfile = localStorage.getItem("tdcs_profile");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    } else {
      // Pre-fill from signup data if available
      setProfileData((prev) => ({
        ...prev,
        name: parsedUser.name || prev.name,
        email: parsedUser.email || prev.email,
        mobile: parsedUser.mobile || prev.mobile,
      }));
    }
  }, [navigate]);

  const handleSave = (section: "personal" | "education" | "career") => {
    localStorage.setItem("tdcs_profile", JSON.stringify(profileData));
    toast.success("Profile updated successfully!");
    if (section === "personal") setEditingPersonal(false);
    if (section === "education") setEditingEducation(false);
    if (section === "career") setEditingCareer(false);
  };

  // ✅ Handle profile photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      const updatedProfile = { ...profileData, profilePhoto: imageData };
      setProfileData(updatedProfile);
      localStorage.setItem("tdcs_profile", JSON.stringify(updatedProfile));
      toast.success("Profile photo updated!");
    };
    reader.readAsDataURL(file);
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
            <p className="text-muted-foreground">Manage your personal, education, and career details.</p>
          </div>

          {/* Profile Header Card */}
          <Card className="shadow-glow-lg border-2">
            <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                {profileData.profilePhoto ? (
                  <img
                    src={profileData.profilePhoto}
                    alt="Profile"
                    className="h-24 w-24 rounded-full object-cover border-4 border-primary shadow-lg"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
                    <User className="h-10 w-10" />
                  </div>
                )}

                {/* Upload Button */}
                <label
                  htmlFor="photo-upload"
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:scale-110 transition-transform"
                >
                  <Camera className="h-4 w-4" />
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <h2 className="text-2xl font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground">{profileData.email || "Update your email"}</p>
              </div>
            </CardContent>
          </Card>

          {/* --- KEEP your existing Personal, Education, Career cards below --- */}
          {/* Just replace their Save buttons with: onClick={() => handleSave("personal")} etc. */}

        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
