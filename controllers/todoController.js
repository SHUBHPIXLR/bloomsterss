const Todo = require('../models/todoModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');

// Create Todo
exports.createTodo = asyncErrorHandler(async (req, res, next) => {
    const newTodo = req.body;
    const todo = await Todo.create(newTodo);
    return res.status(200).json({
        status: true,
        message: "Todo Created Successfully",
        data: todo
    })
});

// Get All Todos --ADMIN
exports.getAllTodos = asyncErrorHandler(async (req, res, next) => {

    const todos = await Todo.find();

    return res.status(200).json({
        status: true,
        message: "All Todos Fetched Successfully",
        data: todos
    });
});

// Update User
exports.updateTodo = asyncErrorHandler( async (req, res, next) => {

    const newTodo = req.body;
    const todoId = req.params.id;
    const updatedTodo = await Todo.findByIdAndUpdate(todoId, newTodo, {new: true})
    return res.status(200).json({
        status: true,
        message: "Todo updated successfully",
        data: updatedTodo
    })
});

// Get Todo Details
exports.getTodoDetails = asyncErrorHandler(async (req, res, next) => {

    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        return res.status(404).json({
            status: false,
            message: "Todo Not Found",
            data: null
        })
    }

    return res.status(200).json({
        status: true,
        message: "Todo Fetch Successfully",
        data: todo
    })

});


// Delete Todo ---
exports.deleteTodo = asyncErrorHandler(async (req, res, next) => {

    const todo = await Todo.findById(req.params.id);

    if (!todo) {
        return res.status(404).json({
            status: false,
            message: "Todo Not Found",
            data: null
        })
    }

    await todo.deleteOne({ _id: req.params.id });

    return res.status(200).json({
        status: true,
        message: "Todo deleted successfully",
    })

});