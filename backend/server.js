const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./backend/schemas/Contact'); // Import the Model created in Step 1

const app = express();

// Middleware (Crucial)
app.use(express.json()); // Allows server to read JSON data from React
app.use(cors()); // Allows React (port 5173) to talk to Node (port 5000)

// Database Connection
// Replace with the connection string you got from the screenshot earlier
mongoose.connect("mongodb+srv://TDCS_webpage_db_user:71b7PPdu30xctQfq@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// 👇 THIS IS THE ROUTE THAT FIXES YOUR 405 ERROR 👇
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Create new entry using the Model
    const newContact = new Contact({
      name,
      email,
      phone,
      message
    });

    // Save to MongoDB
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