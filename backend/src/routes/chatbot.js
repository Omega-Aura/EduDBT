const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const { authenticateToken } = require('../middleware/auth');
const { optionalAuth } = require('../middleware/optionalAuth');

// Public routes (work for both guest and authenticated users)
router.post('/message', optionalAuth, chatbotController.sendMessage);
router.get('/history/:sessionId', chatbotController.getChatHistory);
router.delete('/history/:sessionId', chatbotController.clearChatHistory);

// Protected routes (only for authenticated users)
router.get('/sessions', authenticateToken, chatbotController.getUserChatSessions);

module.exports = router;
