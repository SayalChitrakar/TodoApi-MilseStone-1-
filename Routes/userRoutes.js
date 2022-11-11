const express = require('express');
const router = express.Router();
const authController =require("./../Controller/authController");



router
    .route('/signUp')
    .post(authController.signUp)


module.exports = router;