const express = require('express');
const router = express.Router();

const AuthVerify = require('../middleware/AuthVerifyMiddleware');
const {
  registration,
  profileUpdate,
  login,
} = require('../controllers/UsersController');

router.post('/registration', registration);
router.post('/login', login);
router.post('/profileUpdate', AuthVerify, profileUpdate);

module.exports = router;
