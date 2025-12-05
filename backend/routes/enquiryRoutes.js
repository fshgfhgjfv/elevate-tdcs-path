import express from "express";
import Enquiry from "../models/Enquiry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and email are required" });
    }

    const newEnquiry = new Enquiry({ name, email, phone, service, message });
    await newEnquiry.save();

    res.status(201).json({ success: true, message: "Enquiry submitted successfully!" });
  } catch (error) {
    console.error("Enquiry error:", error);
    res.status(500).json({ success: false, message: "Failed to submit enquiry" });
  }
});

export default router;