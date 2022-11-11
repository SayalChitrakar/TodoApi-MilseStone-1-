const express = require('express');
const router = express.Router();
const todoController =require("./../Controller/TodoController");



router
    .route('/')
    .get(todoController.getAllDone)



module.exports = router;