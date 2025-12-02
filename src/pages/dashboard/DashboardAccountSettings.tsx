import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Lock,
  Shield,
  Smartphone,
  LogOut,
  Trash2,
  Camera,
  Save,
  KeyRound,
  Sun,
  Moon,
  Loader2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

interface DashboardAccountSettingsProps {
  user: { name: string; email: string };
  setUser: (user: { name: string; email: string } | null) => void;
}

const DashboardAccountSettings = ({ user, setUser }: DashboardAccountSettingsProps) => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: "",
  });
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const updatedUser = { name: profileData.name, email: profileData.email };
      localStorage.setItem("tdcs_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
    }, 1000);
  };

  const handlePasswordChange = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (passwordData.new !== passwordData.confirm) {
        toast({
          title: "Error",
          description: "New passwords do not match",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      setPasswordData({ current: "", new: "", confirm: "" });
      setLoading(false);
    }, 1000);
  };

  const handleLogoutAllDevices = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out from all devices.",
    });
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("tdcs_user");
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("tdcs_")) {
        localStorage.removeItem(key);
      }
    });
    window.location.href = "/";
  };

  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-1 gradient-text">Account Settings</h1>
            <p className="text-muted-foreground">
              Manage your account preferences and security settings
            </p>
          </div>
          <div className="flex items-center gap-2">
            {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleProfileUpdate}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-2xl gradient-primary text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="gap-2">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4 justify-end">
                  <Button type="submit" disabled={loading} className="gap-2">
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <form onSubmit={handlePasswordChange}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5" />
                    <div>
                      <CardTitle>Password Management</CardTitle>
                      <CardDescription>Change your password</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwordData.current}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, current: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={passwordData.new}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, new: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={passwordData.confirm}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirm: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4 justify-end">
                  <Button type="submit" variant="default" className="gap-2" disabled={loading}>
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <KeyRound className="w-4 h-4" />
                    )}
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </CardFooter>
              </Card>
            </form>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <div>
                    <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                    <CardDescription>Add an extra layer of security</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      Enable 2FA
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Secure your account with email OTP or authenticator app
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                {twoFactorEnabled && (
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    <p className="text-sm font-medium">Choose your 2FA method:</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Email OTP
                      </Button>
                      <Button variant="outline" size="sm">
                        Authenticator App
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Sessions Tab */}
        <TabsContent value="sessions">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <div>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>
                      Manage devices logged into your account
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Recent Login Sessions</h4>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      No other active sessions detected
                    </p>
                  </div>
                </div>
                <Separator />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="gap-2 w-full sm:w-auto">
                      <LogOut className="w-4 h-4" />
                      Logout from All Devices
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Logout from all devices?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will end all active sessions across all devices. You'll
                        need to login again.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogoutAllDevices}>
                        Logout All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Danger Zone Tab */}
        <TabsContent value="danger">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-destructive">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-destructive" />
                  <div>
                    <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    <CardDescription>
                      Permanently delete your account and all associated data
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="gap-2 w-full sm:w-auto">
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete
                        your account and remove all your data from our servers
                        including course progress and certificates.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardAccountSettings;
