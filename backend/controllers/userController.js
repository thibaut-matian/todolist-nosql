const User = require('../models/User');

// --- 1. CRÉER UN UTILISATEUR ---
exports.createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = await User.create({ username, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --- 2. RÉCUPÉRER UN UTILISATEUR (ET SES TÂCHES) ---
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 3. AJOUTER UNE TÂCHE (CREATE TODO) ---
exports.addTodo = async (req, res) => {
  try {
    // On utilise $push pour ajouter un élément dans le tableau "todos"
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { todos: req.body } },
      { new: true, runValidators: true } // new: true renvoie le document mis à jour
    );
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(201).json(user.todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --- 4. MODIFIER UNE TÂCHE (UPDATE TODO) ---
exports.updateTodo = async (req, res) => {
  try {
    const { id, todoId } = req.params;
    const { title, description, completed, priority, dueDate } = req.body;

    // On cible l'utilisateur ET la tâche spécifique dans son tableau
    const user = await User.findOneAndUpdate(
      { _id: id, 'todos._id': todoId },
      {
        $set: {
          'todos.$.title': title,
          'todos.$.description': description,
          'todos.$.completed': completed,
          'todos.$.priority': priority,
          'todos.$.dueDate': dueDate
        }
      },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: 'Utilisateur ou tâche non trouvé' });
    res.status(200).json(user.todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --- 5. SUPPRIMER UNE TÂCHE (DELETE TODO) ---
exports.deleteTodo = async (req, res) => {
  try {
    const { id, todoId } = req.params;

    // On utilise $pull pour retirer un élément du tableau selon son _id
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { todos: { _id: todoId } } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json({ message: 'Tâche supprimée avec succès', todos: user.todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};