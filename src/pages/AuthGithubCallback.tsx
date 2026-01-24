import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const GithubCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const handleGithubCallback = async () => {
      if (code) {
        try {
          // 1. Log the code (In a real app, send this to your backend)
          console.log("Received GitHub Auth Code:", code);
          
          // 2. Simulate network delay for authentication
          await new Promise(resolve => setTimeout(resolve, 1500)); 

          // 3. Mock User Data (Simulating a backend response)
          const mockGithubUser = {
            name: "GitHub User",
            email: "user@github.com",
            photo: "https://github.com/ghost.png",
            method: "github",
            token: code // Storing code just for reference
          };

          // 4. Save session and redirect
          localStorage.setItem("tdcs_user", JSON.stringify(mockGithubUser));
          toast.success("Successfully logged in with GitHub!");
          navigate("/dashboard");
          
        } catch (error) {
          console.error(error);
          toast.error("GitHub Login Failed");
          navigate("/login");
        }
      } else {
        // If no code is present, go back to login
        navigate("/login");
      }
    };

    handleGithubCallback();
  }, [code, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Authenticating with GitHub...</h2>
        <p className="text-muted-foreground text-sm">Please wait while we verify your credentials.</p>
      </div>
    </div>
  );
};

export default GithubCallback;