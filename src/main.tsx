import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 👇 ADD THIS LINE
console.log("SUPABASE KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);

createRoot(document.getElementById("root")!).render(<App />);
