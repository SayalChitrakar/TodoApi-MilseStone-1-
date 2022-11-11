const express = require('express');
const router = express.Router();
const todoController =require("./../Controller/TodoController");
const authController = require("./../Controller/authController");



router
    .route('/')
    .get(authController.checkIfLogin,todoController.getAllToDos)
    .post(authController.checkIfLogin,todoController.addTodo)
    .put(authController.checkIfLogin,todoController.moveTodo)

router
    .route('/moveToProgress/:id')
    .post(authController.checkIfLogin,todoController.moveToProgress)

router
    .route('/moveToTesting/:id')
    .post(authController.checkIfLogin,todoController.moveToTesting)

router
    .route('/moveToDone/:id')
    .post(authController.checkIfLogin,todoController.moveToDone)


module.exports = router;