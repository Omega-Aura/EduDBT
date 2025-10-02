const express = require('express');
const router = express.Router();
const {
  getAllContent,
  getContentById,
  getFeaturedContent,
  getContentCategories,
  createContent,
  updateContent,
  deleteContent
} = require('../controllers/contentController');
const {
  validateContent,
  handleValidationErrors
} = require('../middleware/validation');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Public routes
// @route   GET /api/content
router.get('/', getAllContent);

// @route   GET /api/content/featured
router.get('/featured', getFeaturedContent);

// @route   GET /api/content/categories
router.get('/categories', getContentCategories);

// @route   GET /api/content/:id
router.get('/:id', getContentById);

// Protected routes (Admin only)
// @route   POST /api/content
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  validateContent,
  handleValidationErrors,
  createContent
);

// @route   PUT /api/content/:id
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  validateContent,
  handleValidationErrors,
  updateContent
);

// @route   DELETE /api/content/:id
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  deleteContent
);

module.exports = router;