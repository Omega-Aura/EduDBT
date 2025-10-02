const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  answers: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    selectedAnswer: {
      type: String, // For multiple-choice: option index or text, for short-answer: the answer text
      trim: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    },
    marksObtained: {
      type: Number,
      default: 0
    }
  }],
  score: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  passed: {
    type: Boolean,
    default: false
  },
  startedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  submittedAt: {
    type: Date
  },
  timeTaken: {
    type: Number // Time taken in seconds
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'abandoned'],
    default: 'in-progress'
  }
}, {
  timestamps: true
});

// Index for efficient querying
quizAttemptSchema.index({ user: 1, quiz: 1 });
quizAttemptSchema.index({ user: 1, status: 1 });
quizAttemptSchema.index({ quiz: 1, createdAt: -1 });

// Calculate score and percentage before saving
quizAttemptSchema.pre('save', function(next) {
  if (this.status === 'completed' && this.answers.length > 0) {
    // Calculate total marks obtained
    this.score = this.answers.reduce((total, answer) => total + answer.marksObtained, 0);
  }
  next();
});

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
