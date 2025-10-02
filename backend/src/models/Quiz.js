const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['aadhaar-basics', 'dbt-info', 'scholarship-guide', 'bank-linking', 'troubleshooting', 'news-updates']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  passingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 60
  },
  timeLimit: {
    type: Number, // Time limit in minutes
    default: 15
  },
  totalQuestions: {
    type: Number,
    required: true,
    min: 1
  },
  totalMarks: {
    type: Number,
    required: true,
    min: 1
  },
  isActive: {
    type: Boolean,
    default: true
  },
  attemptsAllowed: {
    type: Number,
    default: 3 // Number of times user can attempt the quiz
  },
  instructions: [{
    type: String,
    trim: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
quizSchema.index({ category: 1, isActive: 1 });
quizSchema.index({ difficulty: 1, isActive: 1 });

module.exports = mongoose.model('Quiz', quizSchema);
