const express = require('express');
const router = express.Router();
const todoController =require("./../Controller/TodoController");
const authController = require("./../Controller/authController");


router
    .route('/')
    .get(authController.checkIfLogin,todoController.getAllProgress)



module.exports = router;