import express from "express";
import { ContactModel } from "../models/ContactModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const contact = new ContactModel(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: "Message received!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
