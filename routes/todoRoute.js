const express = require('express');
const { createTodo, getTodoDetails, updateTodo, getAllTodos, deleteTodo } = require('../controllers/todoController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/todo/create').post(createTodo);
router.route("/todo/fetchAll").get(getAllTodos);
router.route('/todo/:id').get(getTodoDetails);
router.route('/todo/:id').put(updateTodo);
router.route('/todo/:id').delete(deleteTodo);

module.exports = router;