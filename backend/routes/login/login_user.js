const express = require('express');

const router = express.Router();

const controller = require('../../contollers/login/login_user');

router.post('/api/login' , controller.verify_user);

router.post('/api/add_userCredentials', controller.add_user);

module.exports = router;
