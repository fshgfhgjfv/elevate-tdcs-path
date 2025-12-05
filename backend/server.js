import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// 👇 Note the '.js' extension. This is required in "type": "module"
import Contact from './schemas/Contact.js'; 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
// Ensure your .env file has MONGO_URI, or paste the string directly here for testing
const dbUri = process.env.MONGO_URI || "mongodb+srv://TDCS_webpage_db_user:71b7PPdu30xctQfq@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(dbUri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      phone,
      message
    });

    await newContact.save();
    res.status(201).json({ success: true, message: "Contact saved successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});