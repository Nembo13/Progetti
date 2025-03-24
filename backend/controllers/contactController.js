// controllers/contactController.js
const Contact = require('../models/Contact');

/**
 * Crea una nuova richiesta di contatto.
 * Attende nel body:
 * - firstName, lastName, email, phone, message
 */
exports.createContact = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    // Crea un nuovo documento Contact
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    // Salva la richiesta nel database
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};