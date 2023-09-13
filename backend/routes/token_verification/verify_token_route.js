const express = require('express');

const router = express.Router();

const middleware = require('../../middleware/verifyToken');

router.post('/', middleware.verifyToken)

module.exports = router;