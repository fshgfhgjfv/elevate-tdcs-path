import express from "express";
import Newsletter from "../models/Newsletter.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.active) {
        return res.status(400).json({ success: false, message: "Email already subscribed" });
      }
      // Reactivate subscription
      existing.active = true;
      existing.subscribedAt = new Date();
      await existing.save();
      return res.status(200).json({ success: true, message: "Subscription reactivated!" });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({ success: true, message: "Successfully subscribed to newsletter!" });
  } catch (error) {
    console.error("Newsletter error:", error);
    res.status(500).json({ success: false, message: "Failed to subscribe" });
  }
});

export default router;