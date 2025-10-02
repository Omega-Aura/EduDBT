const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  forgotPassword
} = require('../controllers/authController');
const {
  validateRegistration,
  validateLogin,
  handleValidationErrors
} = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');
const { authLimiter, passwordResetLimiter } = require('../middleware/rateLimiter');

// @route   POST /api/auth/register
router.post('/register', validateRegistration, handleValidationErrors, registerUser);

// @route   POST /api/auth/login
router.post('/login', validateLogin, handleValidationErrors, loginUser);

// @route   GET /api/auth/me
router.get('/me', authenticateToken, getCurrentUser);

// @route   POST /api/auth/logout
router.post('/logout', authenticateToken, logoutUser);

// @route   POST /api/auth/forgot-password
router.post('/forgot-password', passwordResetLimiter, forgotPassword);

module.exports = router;