import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------- GOOGLE LOGIN -----------------
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setGoogleLoading(true);

        const googleUser = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        // send this data to your backend
        const res = await axios.post(
          "https://your-backend.com/api/google-login",
          {
            name: googleUser.data.name,
            email: googleUser.data.email,
            picture: googleUser.data.picture,
          }
        );

        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } catch (err) {
        console.error("Google login failed:", err);
        alert("Google login failed");
      } finally {
        setGoogleLoading(false);
      }
    },

    onError: (err) => {
      console.error("Google login error:", err);
      alert("Google Auth Error");
    },
  });

  // -------------- NORMAL SIGNUP -----------------
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://your-backend.com/api/signup",
        form
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-500 mb-6">
          Sign up to continue
        </p>

        {/* ---------- SIGNUP FORM ---------- */}
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full border p-3 rounded-lg"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* ---------- DIVIDER ---------- */}
        <div className="mt-6 flex items-center justify-center">
          <span className="h-px w-full bg-gray-300"></span>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <span className="h-px w-full bg-gray-300"></span>
        </div>

        {/* ---------- GOOGLE BUTTON ---------- */}
        <button
          onClick={() => googleLogin()}
          disabled={googleLoading}
          className="mt-4 flex w-full items-center justify-center gap-3 border p-3 rounded-lg hover:bg-gray-100"
        >
          {googleLoading ? (
            "Signing in..."
          ) : (
            <>
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                className="w-5 h-5"
              />
              Continue with Google
            </>
          )}
        </button>

        {/* ---------- LOGIN LINK ---------- */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
