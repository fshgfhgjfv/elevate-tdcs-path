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

// CORS Setup: allow localhost in dev + live domain
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); 
      const allowedOrigins = ["https://www.tdcstechnologies.com"];
      if (origin.includes("localhost") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy: The site ${origin} is not allowed.`), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middleware
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI, { dbName: "TDCSTECHNOLOGIESPRIVATELIMITED" })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Backend Server Running...");
});

// API Routes
app.use("/api/contact", contactRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/newsletter", newsletterRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
