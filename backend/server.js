require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connecté avec succès à MongoDB !'))
  .catch((err) => console.error('❌ Erreur de connexion à MongoDB :', err));

// Utilisation des routes de notre API
app.use('/api', userRoutes);

// Route d'accueil basique
app.get('/', (req, res) => {
  res.send('L\'API To-Do List NoSQL est opérationnelle.');
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});