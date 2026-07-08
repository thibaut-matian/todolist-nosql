const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes Utilisateur
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);

// Routes To-Do liées à l'utilisateur
router.post('/users/:id/todos', userController.addTodo);
router.put('/users/:id/todos/:todoId', userController.updateTodo);
router.delete('/users/:id/todos/:todoId', userController.deleteTodo);

module.exports = router;