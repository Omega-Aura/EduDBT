const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow guest users
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    language: {
      type: String,
      default: 'en'
    }
  }],
  metadata: {
    userAgent: String,
    ipAddress: String,
    language: String
  }
}, {
  timestamps: true
});

// Index for efficient queries
chatHistorySchema.index({ sessionId: 1, createdAt: -1 });
chatHistorySchema.index({ userId: 1, createdAt: -1 });

// Auto-delete old chat histories after 30 days
chatHistorySchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
