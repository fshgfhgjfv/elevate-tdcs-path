import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import contactRoutes from "./routes/contactRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ---------------------- CORS CONFIGURATION ----------------------
const allowedOrigins = [
  "http://localhost:5173",                 // Local React
  "http://localhost:3000",                 // Optional local
  "https://www.tdcstechnologies.com",      // Live website
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow server tools & postman
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS policy: The site ${origin} is not allowed.`), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ------------------------- MIDDLEWARE ----------------------------
app.use(express.json());

// ----------------------- MONGO CONNECTION ------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "TDCSTECHNOLOGIESPRIVATELIMITED",
  })
  .then(() => console.log("🚀 MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Error:", err.message));

// --------------------------- ROUTES ------------------------------
app.get("/", (req, res) => res.send("Backend Server Running..."));

app.use("/api/contact", contactRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/newsletter", newsletterRoutes);

// --------------------------- 404 ROUTE ---------------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// -------------------- GLOBAL ERROR HANDLER ----------------------
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

// -------------------------- START SERVER -------------------------
app.listen(PORT, () => console.log(`🌐 Server running at http://localhost:${PORT}`));
