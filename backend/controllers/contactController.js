import Contact from "../models/Contact.js";

export const saveContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, message: "Message saved!", contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
