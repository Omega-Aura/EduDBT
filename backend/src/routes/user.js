const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  updateAadhaarDetails,
  updateBankDetails,
  updateNotificationPreferences,
  trackArticleRead,
  getUserStats
} = require('../controllers/userController');
const {
  validateProfileUpdate,
  handleValidationErrors
} = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// @route   GET /api/user/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', getUserProfile);

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', validateProfileUpdate, handleValidationErrors, updateUserProfile);

// @route   PUT /api/user/password
// @desc    Update user password
// @access  Private
router.put('/password', updatePassword);

// @route   PUT /api/user/aadhaar
// @desc    Update Aadhaar details
// @access  Private
router.put('/aadhaar', updateAadhaarDetails);

// @route   PUT /api/user/bank-details
// @desc    Update bank details
// @access  Private
router.put('/bank-details', updateBankDetails);

// @route   PUT /api/user/notifications
// @desc    Update notification preferences
// @access  Private
router.put('/notifications', updateNotificationPreferences);

// @route   POST /api/user/track-article
// @desc    Track article read
// @access  Private
router.post('/track-article', trackArticleRead);

// @route   GET /api/user/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', getUserStats);

module.exports = router;
