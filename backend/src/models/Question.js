const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  questionType: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'short-answer'],
    required: true,
    default: 'multiple-choice'
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  }],
  correctAnswer: {
    type: String, // For short-answer questions
    trim: true
  },
  marks: {
    type: Number,
    required: true,
    default: 1
  },
  explanation: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for efficient querying
questionSchema.index({ quiz: 1, order: 1 });

// Validate that multiple-choice and true-false questions have options
questionSchema.pre('save', function(next) {
  if (this.questionType === 'multiple-choice' || this.questionType === 'true-false') {
    if (!this.options || this.options.length === 0) {
      return next(new Error('Multiple-choice and true-false questions must have options'));
    }
    
    const correctOptions = this.options.filter(opt => opt.isCorrect);
    if (correctOptions.length === 0) {
      return next(new Error('At least one option must be marked as correct'));
    }
  }
  
  if (this.questionType === 'short-answer' && !this.correctAnswer) {
    return next(new Error('Short-answer questions must have a correct answer'));
  }
  
  next();
});

module.exports = mongoose.model('Question', questionSchema);
