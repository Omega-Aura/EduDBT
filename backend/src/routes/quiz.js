const express = require('express');
const router = express.Router();
const {
  getAllQuizzes,
  getQuizById,
  getQuizzesByCategory,
  getQuizQuestions,
  startQuizAttempt,
  submitQuizAnswers,
  getUserAttempts,
  getAttemptResults,
  createQuiz,
  updateQuiz,
  deleteQuiz
} = require('../controllers/quizController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// Public routes
// @route   GET /api/quizzes
router.get('/', getAllQuizzes);

// @route   GET /api/quizzes/category/:category
router.get('/category/:category', getQuizzesByCategory);

// @route   GET /api/quizzes/:id
router.get('/:id', getQuizById);

// Protected routes (Authenticated users)
// @route   GET /api/quizzes/:id/questions
router.get('/:id/questions', authenticateToken, getQuizQuestions);

// @route   POST /api/quizzes/:id/start
router.post('/:id/start', authenticateToken, startQuizAttempt);

// @route   POST /api/quizzes/:id/submit
router.post('/:id/submit', authenticateToken, submitQuizAnswers);

// @route   GET /api/quizzes/attempts
router.get('/attempts/my-attempts', authenticateToken, getUserAttempts);

// @route   GET /api/quizzes/attempts/:attemptId
router.get('/attempts/:attemptId', authenticateToken, getAttemptResults);

// Protected routes (Admin only)
// @route   POST /api/quizzes
router.post('/', authenticateToken, authorizeRoles('admin'), createQuiz);

// @route   PUT /api/quizzes/:id
router.put('/:id', authenticateToken, authorizeRoles('admin'), updateQuiz);

// @route   DELETE /api/quizzes/:id
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteQuiz);

module.exports = router;
