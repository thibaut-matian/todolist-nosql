const mongoose = require('mongoose');

// Schéma pour les tâches individuelles (imbriqué dans l'utilisateur)
const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre de la tâche est obligatoire'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  }
}, { 
  timestamps: true 
});

// Schéma principal de l'Utilisateur
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Le nom d’utilisateur est obligatoire'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L’email est obligatoire'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Veuillez entrer un email valide']
  },
  todos: [TodoSchema] // Tableau de tâches imbriquées
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', UserSchema);