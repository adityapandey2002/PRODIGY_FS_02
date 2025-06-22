const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
  refreshToken
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const { validateUser, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateUser, handleValidationErrors, register);
router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.post('/refresh', refreshToken);

module.exports = router;
