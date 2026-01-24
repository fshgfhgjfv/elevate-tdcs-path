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
          // --- SIMULATION START ---
          // In a real app, you send this 'code' to your backend API.
          // Your backend exchanges it for an access token.
          // Here, we simulate a successful login after a short delay.
          
          console.log("Received GitHub Auth Code:", code);
          await new Promise(resolve => setTimeout(resolve, 1500)); 

          const mockGithubUser = {
            name: "GitHub User",
            email: "user@github.com",
            photo: "https://github.com/ghost.png",
            method: "github"
          };

          localStorage.setItem("tdcs_user", JSON.stringify(mockGithubUser));
          toast.success("Successfully logged in with GitHub!");
          navigate("/dashboard");
          // --- SIMULATION END ---
          
        } catch (error) {
          console.error(error);
          toast.error("GitHub Login Failed");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    handleGithubCallback();
  }, [code, navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <h2 className="text-xl font-semibold">Authenticating...</h2>
      <p className="text-muted-foreground text-sm">Please wait while we connect to GitHub.</p>
    </div>
  );
};

export default GithubCallback;