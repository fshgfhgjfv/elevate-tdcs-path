import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthGithubCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGitHubCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        toast.error("GitHub login failed: No code found");
        navigate("/signup");
        return;
      }

      try {
        const response = await fetch(`/api/auth/github?code=${code}`);
        const userData = await response.json();

        if (userData?.id) {
          const user = {
            name: userData.name || userData.login,
            email: userData.email,
            avatar: userData.avatar_url,
            provider: "github",
          };
          localStorage.setItem("tdcs_user", JSON.stringify(user));
          toast.success(`Welcome ${user.name}!`);
          navigate("/dashboard");
        } else {
          toast.error("GitHub login failed. Please try again.");
          navigate("/signup");
        }
      } catch (error) {
        console.error(error);
        toast.error("GitHub authentication error");
        navigate("/signup");
      }
    };

    handleGitHubCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg font-medium animate-pulse">
        Signing you in with GitHub...
      </p>
    </div>
  );
};

export default AuthGithubCallback;
