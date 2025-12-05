import mongoose from "mongoose";

const NewsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
});

export default mongoose.model("Newsletter", NewsletterSchema);