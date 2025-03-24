// controllers/pdfController.js

const PDFDocument = require('pdfkit'); // Importa pdfkit
const Quote = require('../models/Quote');
const Product = require('../models/Product');

/**
 * Genera un PDF per un preventivo (Quote) identificato dal suo ID.
 * La rotta è protetta: solo utenti autenticati possono richiedere il PDF.
 * Il PDF verrà creato in memoria e inviato come flusso di dati (stream) al client.
 */
exports.generateQuotePDF = async (req, res) => {
  try {
    // Recupera l'ID del preventivo dai parametri della rotta
    const quoteId = req.params.id;

    // Trova il preventivo, popolando i dati di base del prodotto
    const quote = await Quote.findById(quoteId).populate('product', 'name basePrice description');
    if (!quote) {
      return res.status(404).json({ message: 'Preventivo non trovato' });
    }

    // Crea un documento PDF
    const doc = new PDFDocument();

    // Imposta le intestazioni della risposta per il download del file PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=preventivo_${quoteId}.pdf`);

    // Collega lo stream del documento PDF alla risposta HTTP
    doc.pipe(res);

    // Aggiunta di contenuto al PDF: Intestazione e dettagli del preventivo
    doc.fontSize(20).text('Preventivo LymeCo', { align: 'center' });
    doc.moveDown();

    // Informazioni sull'utente e sul prodotto
    doc.fontSize(12).text(`ID Preventivo: ${quote._id}`);
    doc.text(`Prodotto: ${quote.product.name}`);
    doc.text(`Descrizione: ${quote.product.description}`);
    doc.text(`Prezzo Base: €${quote.product.basePrice}`);
    doc.text(`Quantità: ${quote.quantity}`);
    doc.text(`Tipo di stampa: ${quote.printingType}`);
    doc.moveDown();
    doc.fontSize(14).text(`Prezzo Finale: €${quote.finalPrice.toFixed(2)}`, {
      underline: true,
    });

    // Finalizza il documento. Questo invierà il PDF al client.
    doc.end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};