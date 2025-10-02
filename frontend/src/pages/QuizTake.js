import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert, Spinner, ProgressBar, Modal } from 'react-bootstrap';
import axios from 'axios';

const QuizTake = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [attempt, setAttempt] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    loadQuizData();
  }, [quizId]);

  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const loadQuizData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      // Load quiz details
      const quizResponse = await axios.get(`${API_URL}/quizzes/${quizId}`);
      if (quizResponse.data.success) {
        setQuiz(quizResponse.data.data);
      }

      // Start quiz attempt
      const attemptResponse = await axios.post(
        `${API_URL}/quizzes/${quizId}/start`,
        {},
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (attemptResponse.data.success) {
        setAttempt(attemptResponse.data.data);
        
        // Calculate time remaining
        const startTime = new Date(attemptResponse.data.data.startedAt);
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const totalTime = quizResponse.data.data.timeLimit * 60;
        setTimeRemaining(Math.max(0, totalTime - elapsed));
      }

      // Load questions
      const questionsResponse = await axios.get(
        `${API_URL}/quizzes/${quizId}/questions`,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      
      if (questionsResponse.data.success) {
        setQuestions(questionsResponse.data.data.questions);
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load quiz');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');

      const answersArray = questions.map(q => ({
        questionId: q._id,
        selectedAnswer: answers[q._id] || ''
      }));

      const response = await axios.post(
        `${API_URL}/quizzes/${quizId}/submit`,
        {
          attemptId: attempt._id,
          answers: answersArray
        },
        { headers: { Authorization: `Bearer ${token}` }}
      );

      if (response.data.success) {
        navigate(`/quiz/results/${attempt._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit quiz');
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading quiz...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => navigate('/quiz-hub')}>
            Back to Quiz Hub
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Quiz not found</Alert>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <Container className="py-4">
      {/* Quiz Header */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1">{quiz.title}</h4>
              <p className="text-muted mb-0 small">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="text-end">
              <div className={`h4 mb-0 ${timeRemaining < 300 ? 'text-danger' : 'text-primary'}`}>
                <i className="bi bi-clock me-2"></i>
                {formatTime(timeRemaining)}
              </div>
              <small className="text-muted">Time Remaining</small>
            </div>
          </div>
          <ProgressBar 
            now={progress} 
            className="mt-3" 
            style={{ height: '8px' }}
            variant={progress === 100 ? 'success' : 'primary'}
          />
        </Card.Body>
      </Card>

      {/* Question Card */}
      <Card className="mb-4 shadow">
        <Card.Body className="p-4">
          <div className="mb-4">
            <span className="badge bg-secondary me-2">
              {currentQuestion.difficulty || 'Medium'}
            </span>
            <span className="badge bg-info">
              {currentQuestion.marks} {currentQuestion.marks === 1 ? 'Mark' : 'Marks'}
            </span>
          </div>

          <h5 className="mb-4">{currentQuestion.questionText}</h5>

          <Form>
            {currentQuestion.questionType === 'multiple-choice' && (
              <div>
                {currentQuestion.options.map((option, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    id={`option-${index}`}
                    name={`question-${currentQuestion._id}`}
                    label={option.text}
                    checked={answers[currentQuestion._id] === option.text}
                    onChange={() => handleAnswerChange(currentQuestion._id, option.text)}
                    className="mb-3 p-3 border rounded hover-option"
                  />
                ))}
              </div>
            )}

            {currentQuestion.questionType === 'true-false' && (
              <div>
                {currentQuestion.options.map((option, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    id={`option-${index}`}
                    name={`question-${currentQuestion._id}`}
                    label={option.text}
                    checked={answers[currentQuestion._id] === option.text}
                    onChange={() => handleAnswerChange(currentQuestion._id, option.text)}
                    className="mb-3 p-3 border rounded hover-option"
                  />
                ))}
              </div>
            )}

            {currentQuestion.questionType === 'short-answer' && (
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Type your answer here..."
                  value={answers[currentQuestion._id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion._id, e.target.value)}
                  className="p-3"
                />
              </Form.Group>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* Navigation */}
      <div className="d-flex justify-content-between align-items-center">
        <Button 
          variant="outline-secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Previous
        </Button>

        <div className="text-center">
          <p className="mb-0 text-muted small">
            Answered: {answeredCount}/{questions.length}
          </p>
        </div>

        {currentQuestionIndex === questions.length - 1 ? (
          <Button 
            variant="success"
            onClick={() => setShowSubmitModal(true)}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Submitting...
              </>
            ) : (
              <>
                Submit Quiz
                <i className="bi bi-check-circle ms-2"></i>
              </>
            )}
          </Button>
        ) : (
          <Button 
            variant="primary"
            onClick={handleNext}
          >
            Next
            <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        )}
      </div>

      {/* Submit Confirmation Modal */}
      <Modal show={showSubmitModal} onHide={() => setShowSubmitModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to submit your quiz?</p>
          <Alert variant="info" className="mb-0">
            <small>
              <strong>Answered:</strong> {answeredCount}/{questions.length} questions<br />
              <strong>Unanswered:</strong> {questions.length - answeredCount} questions<br />
              {questions.length - answeredCount > 0 && (
                <span className="text-danger">
                  Unanswered questions will be marked as incorrect.
                </span>
              )}
            </small>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSubmitModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={() => {
              setShowSubmitModal(false);
              handleSubmit();
            }}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Yes, Submit'}
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .hover-option {
          cursor: pointer;
          transition: background-color 0.2s, border-color 0.2s;
        }
        .hover-option:hover {
          background-color: #f8f9fa;
          border-color: #0d6efd !important;
        }
      `}</style>
    </Container>
  );
};

export default QuizTake;
