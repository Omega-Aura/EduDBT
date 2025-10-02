const ChatHistory = require('../models/ChatHistory');
const geminiService = require('../services/geminiService');
const { v4: uuidv4 } = require('uuid');

// Send a message to the chatbot
exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId, language = 'en' } = req.body;
    const userId = req.user ? req.user.userId : null;

    console.log('Chatbot message received:', { message, sessionId, language, userId });

    // Validate input
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Message cannot be empty'
      });
    }

    // Generate or validate sessionId
    const chatSessionId = sessionId || uuidv4();

    // Check for quick response first (saves API calls)
    const quickResponse = geminiService.getQuickResponse(message, language);
    
    let botResponse;
    if (quickResponse) {
      console.log('Using quick response for greeting');
      botResponse = quickResponse;
    } else {
      // Retrieve conversation history for context
      let chatHistory = await ChatHistory.findOne({ sessionId: chatSessionId });
      const conversationHistory = chatHistory ? chatHistory.messages : [];

      console.log('Calling Gemini API...');
      // Generate AI response using Gemini
      const aiResponse = await geminiService.generateResponse(
        message,
        conversationHistory,
        language
      );

      console.log('Gemini API response:', { success: aiResponse.success, hasMessage: !!aiResponse.message });

      if (!aiResponse.success) {
        console.error('Gemini API failed:', aiResponse.error);
        return res.status(500).json({
          success: false,
          error: 'Failed to generate response',
          message: aiResponse.message // Fallback message
        });
      }

      botResponse = aiResponse.message;
    }

    // Validate bot response
    if (!botResponse || botResponse.trim() === '') {
      console.error('Bot response is empty!');
      botResponse = 'I apologize, but I had trouble generating a response. Please try rephrasing your question or visit our Learning Center for detailed guides.';
    }

    // Save the conversation to database
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date(),
      language
    };

    const assistantMessage = {
      role: 'assistant',
      content: botResponse,
      timestamp: new Date(),
      language
    };

    // Update or create chat history
    if (await ChatHistory.findOne({ sessionId: chatSessionId })) {
      await ChatHistory.findOneAndUpdate(
        { sessionId: chatSessionId },
        {
          $push: {
            messages: {
              $each: [userMessage, assistantMessage]
            }
          },
          userId: userId || undefined
        }
      );
    } else {
      await ChatHistory.create({
        sessionId: chatSessionId,
        userId,
        messages: [userMessage, assistantMessage],
        metadata: {
          userAgent: req.headers['user-agent'],
          language
        }
      });
    }

    // Return the response
    res.json({
      success: true,
      sessionId: chatSessionId,
      message: botResponse,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Chatbot Error:', error);
    res.status(500).json({
      success: false,
      error: 'An error occurred while processing your message',
      details: error.message
    });
  }
};

// Get chat history for a session
exports.getChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID is required'
      });
    }

    const chatHistory = await ChatHistory.findOne({ sessionId });

    if (!chatHistory) {
      return res.json({
        success: true,
        messages: [],
        sessionId
      });
    }

    res.json({
      success: true,
      messages: chatHistory.messages,
      sessionId: chatHistory.sessionId,
      createdAt: chatHistory.createdAt
    });

  } catch (error) {
    console.error('Get Chat History Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve chat history'
    });
  }
};

// Clear chat history for a session
exports.clearChatHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID is required'
      });
    }

    await ChatHistory.findOneAndDelete({ sessionId });

    res.json({
      success: true,
      message: 'Chat history cleared successfully'
    });

  } catch (error) {
    console.error('Clear Chat History Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear chat history'
    });
  }
};

// Get user's chat sessions (for logged-in users)
exports.getUserChatSessions = async (req, res) => {
  try {
    const userId = req.user.userId;

    const sessions = await ChatHistory.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(10)
      .select('sessionId messages createdAt updatedAt');

    res.json({
      success: true,
      sessions: sessions.map(session => ({
        sessionId: session.sessionId,
        messageCount: session.messages.length,
        lastMessage: session.messages[session.messages.length - 1],
        createdAt: session.createdAt,
        updatedAt: session.updatedAt
      }))
    });

  } catch (error) {
    console.error('Get User Sessions Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve chat sessions'
    });
  }
};
