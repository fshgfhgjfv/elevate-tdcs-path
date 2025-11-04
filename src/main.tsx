import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthGithubCallback from "./pages/AuthGithubCallback";

// ✅ Import Google OAuth provider
import { GoogleOAuthProvider } from "@react-oauth/google";

// ✅ Your Google Client ID
const googleClientId =
  "736905272101-bfolp8smrdkl2eg59ss9n5oihcb5ph9n.apps.googleusercontent.com";

// ✅ Your GitHub Client ID
const githubClientId = "Ov23lihuI3cigP0FjM7w";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    {/* You can pass the GitHub Client ID to your App or context */}
    <App githubClientId={githubClientId} />
  </GoogleOAuthProvider>
);
