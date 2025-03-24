// Importa le librerie necessarie
const express = require('express');
const cors = require('cors');

// Inizializza l'app Express
const app = express();

// Middleware: abilita CORS e converte i body delle richieste in JSON
app.use(cors());
app.use(express.json());

// Importa la funzione per connettersi a MongoDB
const connectDB = require('./config/db');

// Stabilire la connessione a MongoDB
connectDB();

// Importa le rotte per l'autenticazione
const authRoutes = require('./routes/authRoutes');

// Configura le rotte di autenticazione con prefisso /api/auth
app.use('/api/auth', authRoutes);

// Importa le rotte per i prodotti
const productRoutes = require('./routes/productRoutes');

// Configura le rotte di prodotti con prefisso /api/products
app.use('/api/products', productRoutes);

// Importa le rotte per i preventivi
const quoteRoutes = require('./routes/quoteRoutes');

// Configura le rotte di preventivi con prefisso /api/quotes
app.use('/api/quotes', quoteRoutes);

// Importa le rotte per i contatti
const contactRoutes = require('./routes/contactRoutes');

// Configura le rotte di contatti con prefisso /api/contacts
app.use('/api/contacts', contactRoutes);

// Importa la rotta per gestione PDF
const pdfRoutes = require('./routes/pdfRoutes');

// Configura la rotta di PDF con prefisso /api/pdf
app.use('/api/pdf', pdfRoutes);


// Imposta la porta. Se non specificata nell'ambiente, usa 5000.
const PORT = process.env.PORT || 5000;

// Avvia il server in ascolto sulla porta definita
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});