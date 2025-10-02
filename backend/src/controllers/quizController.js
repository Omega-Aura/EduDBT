const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const QuizAttempt = require('../models/QuizAttempt');

// @desc    Get all quizzes with filtering
// @route   GET /api/quizzes
// @access  Public
const getAllQuizzes = async (req, res) => {
  try {
    const {
      category,
      difficulty,
      isActive = true
    } = req.query;

    // Build query
    const query = { isActive };

    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const quizzes = await Quiz.find(query)
      .populate('createdBy', 'firstName lastName username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { quizzes }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quizzes',
      error: error.message
    });
  }
};

// @desc    Get single quiz by ID
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'firstName lastName username');

    if (!quiz || !quiz.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz',
      error: error.message
    });
  }
};

// @desc    Get quizzes by category
// @route   GET /api/quizzes/category/:category
// @access  Public
const getQuizzesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const quizzes = await Quiz.find({ 
      category, 
      isActive: true 
    })
      .populate('createdBy', 'firstName lastName username')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { quizzes }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quizzes',
      error: error.message
    });
  }
};

// @desc    Get questions for a quiz
// @route   GET /api/quizzes/:id/questions
// @access  Private
const getQuizQuestions = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz || !quiz.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Get questions and exclude correct answers from response
    const questions = await Question.find({ quiz: req.params.id })
      .select('-correctAnswer')
      .sort({ order: 1 });

    // For multiple-choice questions, don't send isCorrect flag
    const sanitizedQuestions = questions.map(q => {
      const question = q.toObject();
      if (question.options) {
        question.options = question.options.map(opt => ({
          text: opt.text,
          _id: opt._id
        }));
      }
      return question;
    });

    res.json({
      success: true,
      data: { questions: sanitizedQuestions }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questions',
      error: error.message
    });
  }
};

// @desc    Start a quiz attempt
// @route   POST /api/quizzes/:id/start
// @access  Private
const startQuizAttempt = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz || !quiz.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Check if user has exceeded attempt limit
    const previousAttempts = await QuizAttempt.countDocuments({
      user: req.user.id,
      quiz: req.params.id,
      status: 'completed'
    });

    if (previousAttempts >= quiz.attemptsAllowed) {
      return res.status(400).json({
        success: false,
        message: `You have exceeded the maximum number of attempts (${quiz.attemptsAllowed})`
      });
    }

    // Check if there's an in-progress attempt
    const inProgressAttempt = await QuizAttempt.findOne({
      user: req.user.id,
      quiz: req.params.id,
      status: 'in-progress'
    });

    if (inProgressAttempt) {
      return res.json({
        success: true,
        data: inProgressAttempt,
        message: 'Resuming existing attempt'
      });
    }

    // Create new attempt
    const attempt = await QuizAttempt.create({
      user: req.user.id,
      quiz: req.params.id,
      startedAt: new Date()
    });

    res.status(201).json({
      success: true,
      data: attempt,
      message: 'Quiz attempt started'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to start quiz attempt',
      error: error.message
    });
  }
};

// @desc    Submit quiz answers
// @route   POST /api/quizzes/:id/submit
// @access  Private
const submitQuizAnswers = async (req, res) => {
  try {
    const { attemptId, answers } = req.body;

    if (!attemptId || !answers) {
      return res.status(400).json({
        success: false,
        message: 'Attempt ID and answers are required'
      });
    }

    const attempt = await QuizAttempt.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }

    if (attempt.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to submit this attempt'
      });
    }

    if (attempt.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Quiz already submitted'
      });
    }

    const quiz = await Quiz.findById(attempt.quiz);
    
    // Get all questions with correct answers
    const questions = await Question.find({ quiz: attempt.quiz });
    const questionsMap = {};
    questions.forEach(q => {
      questionsMap[q._id.toString()] = q;
    });

    // Evaluate answers
    const evaluatedAnswers = answers.map(answer => {
      const question = questionsMap[answer.questionId];
      
      if (!question) {
        return {
          question: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
          isCorrect: false,
          marksObtained: 0
        };
      }

      let isCorrect = false;
      
      if (question.questionType === 'multiple-choice') {
        const correctOption = question.options.find(opt => opt.isCorrect);
        isCorrect = correctOption && correctOption.text === answer.selectedAnswer;
      } else if (question.questionType === 'true-false') {
        const correctOption = question.options.find(opt => opt.isCorrect);
        isCorrect = correctOption && correctOption.text === answer.selectedAnswer;
      } else if (question.questionType === 'short-answer') {
        // Simple case-insensitive comparison for short answers
        isCorrect = question.correctAnswer.toLowerCase().trim() === answer.selectedAnswer.toLowerCase().trim();
      }

      return {
        question: answer.questionId,
        selectedAnswer: answer.selectedAnswer,
        isCorrect,
        marksObtained: isCorrect ? question.marks : 0
      };
    });

    // Calculate total score
    const totalScore = evaluatedAnswers.reduce((sum, ans) => sum + ans.marksObtained, 0);
    const percentage = (totalScore / quiz.totalMarks) * 100;
    const passed = percentage >= quiz.passingScore;

    // Calculate time taken
    const timeTaken = Math.floor((new Date() - attempt.startedAt) / 1000);

    // Update attempt
    attempt.answers = evaluatedAnswers;
    attempt.score = totalScore;
    attempt.percentage = percentage;
    attempt.passed = passed;
    attempt.submittedAt = new Date();
    attempt.timeTaken = timeTaken;
    attempt.status = 'completed';

    await attempt.save();

    // Populate attempt with question details for response
    const populatedAttempt = await QuizAttempt.findById(attempt._id)
      .populate('quiz')
      .populate('answers.question');

    res.json({
      success: true,
      data: populatedAttempt,
      message: passed ? 'Congratulations! You passed the quiz.' : 'You did not pass this time. Try again!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz',
      error: error.message
    });
  }
};

// @desc    Get user's quiz attempts
// @route   GET /api/quizzes/attempts
// @access  Private
const getUserAttempts = async (req, res) => {
  try {
    const { quizId, status } = req.query;

    const query = { user: req.user.id };
    if (quizId) query.quiz = quizId;
    if (status) query.status = status;

    const attempts = await QuizAttempt.find(query)
      .populate('quiz', 'title category difficulty')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { attempts }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz attempts',
      error: error.message
    });
  }
};

// @desc    Get detailed results for a quiz attempt
// @route   GET /api/quizzes/attempts/:attemptId
// @access  Private
const getAttemptResults = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.attemptId)
      .populate('quiz')
      .populate('user', 'firstName lastName email');

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: 'Quiz attempt not found'
      });
    }

    // Check if user owns this attempt
    if (attempt.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this attempt'
      });
    }

    // Get questions with explanations
    const questions = await Question.find({ quiz: attempt.quiz._id }).sort({ order: 1 });
    
    // Combine attempt answers with question details
    const detailedResults = attempt.answers.map(answer => {
      const question = questions.find(q => q._id.toString() === answer.question.toString());
      return {
        question: {
          _id: question._id,
          questionText: question.questionText,
          questionType: question.questionType,
          options: question.options,
          explanation: question.explanation,
          marks: question.marks,
          correctAnswer: question.questionType === 'short-answer' ? question.correctAnswer : 
                        question.options.find(opt => opt.isCorrect)?.text
        },
        userAnswer: answer.selectedAnswer,
        isCorrect: answer.isCorrect,
        marksObtained: answer.marksObtained
      };
    });

    res.json({
      success: true,
      data: {
        attempt: {
          _id: attempt._id,
          quiz: attempt.quiz,
          score: attempt.score,
          percentage: attempt.percentage,
          passed: attempt.passed,
          timeTaken: attempt.timeTaken,
          startedAt: attempt.startedAt,
          submittedAt: attempt.submittedAt,
          status: attempt.status
        },
        results: detailedResults
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attempt results',
      error: error.message
    });
  }
};

// @desc    Create a new quiz (Admin only)
// @route   POST /api/quizzes
// @access  Private/Admin
const createQuiz = async (req, res) => {
  try {
    const quizData = {
      ...req.body,
      createdBy: req.user.id
    };

    const quiz = await Quiz.create(quizData);

    res.status(201).json({
      success: true,
      data: quiz,
      message: 'Quiz created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create quiz',
      error: error.message
    });
  }
};

// @desc    Update a quiz (Admin only)
// @route   PUT /api/quizzes/:id
// @access  Private/Admin
const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      data: quiz,
      message: 'Quiz updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update quiz',
      error: error.message
    });
  }
};

// @desc    Delete a quiz (Admin only)
// @route   DELETE /api/quizzes/:id
// @access  Private/Admin
const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    // Also delete associated questions
    await Question.deleteMany({ quiz: req.params.id });

    res.json({
      success: true,
      message: 'Quiz and associated questions deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete quiz',
      error: error.message
    });
  }
};

module.exports = {
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
};
