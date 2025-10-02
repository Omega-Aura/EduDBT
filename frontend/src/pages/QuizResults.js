import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Row, Col, Button, Alert, Spinner, Badge, Accordion } from 'react-bootstrap';
import axios from 'axios';

const QuizResults = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    loadResults();
  }, [attemptId]);

  const loadResults = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(
        `${API_URL}/quizzes/attempts/${attemptId}`,
        { headers: { Authorization: `Bearer ${token}` }}
      );

      if (response.data.success) {
        setResults(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading results...</p>
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

  if (!results) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Results not found</Alert>
      </Container>
    );
  }

  const { attempt, results: questionResults } = results;
  const correctAnswers = questionResults.filter(r => r.isCorrect).length;
  const incorrectAnswers = questionResults.length - correctAnswers;
  const scoreColor = getScoreColor(attempt.percentage);

  return (
    <Container className="py-4">
      {/* Results Header */}
      <Card className={`mb-4 shadow border-${scoreColor}`}>
        <Card.Body className="text-center p-5">
          <div className="mb-3">
            {attempt.passed ? (
              <div className="display-1 text-success">🎉</div>
            ) : (
              <div className="display-1">📝</div>
            )}
          </div>
          
          <h2 className="mb-3">
            {attempt.passed ? 'Congratulations! You Passed!' : 'Keep Learning!'}
          </h2>
          
          <div className={`display-4 fw-bold text-${scoreColor} mb-2`}>
            {attempt.percentage.toFixed(1)}%
          </div>
          
          <p className="text-muted mb-4">
            You scored {attempt.score} out of {attempt.quiz.totalMarks} marks
          </p>

          <Row className="justify-content-center">
            <Col md={8}>
              <Row className="text-center">
                <Col xs={4}>
                  <div className="border rounded p-3">
                    <div className="h3 text-success mb-0">{correctAnswers}</div>
                    <small className="text-muted">Correct</small>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="border rounded p-3">
                    <div className="h3 text-danger mb-0">{incorrectAnswers}</div>
                    <small className="text-muted">Incorrect</small>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="border rounded p-3">
                    <div className="h3 text-primary mb-0">{formatTime(attempt.timeTaken)}</div>
                    <small className="text-muted">Time Taken</small>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Quiz Info */}
      <Card className="mb-4">
        <Card.Body>
          <h5 className="mb-3">{attempt.quiz.title}</h5>
          <Row>
            <Col md={6}>
              <p className="mb-2">
                <strong>Category:</strong>{' '}
                <Badge bg="info">{attempt.quiz.category}</Badge>
              </p>
              <p className="mb-2">
                <strong>Difficulty:</strong>{' '}
                <Badge bg="warning">{attempt.quiz.difficulty}</Badge>
              </p>
            </Col>
            <Col md={6}>
              <p className="mb-2">
                <strong>Passing Score:</strong> {attempt.quiz.passingScore}%
              </p>
              <p className="mb-2">
                <strong>Completed On:</strong>{' '}
                {new Date(attempt.submittedAt).toLocaleString()}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Detailed Results */}
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Detailed Results</h5>
        </Card.Header>
        <Card.Body>
          <Accordion>
            {questionResults.map((result, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  <div className="d-flex align-items-center w-100 me-3">
                    <span className={`me-3 ${result.isCorrect ? 'text-success' : 'text-danger'}`}>
                      {result.isCorrect ? '✓' : '✗'}
                    </span>
                    <span className="flex-grow-1">
                      Question {index + 1}: {result.question.questionText.substring(0, 80)}
                      {result.question.questionText.length > 80 && '...'}
                    </span>
                    <Badge bg={result.isCorrect ? 'success' : 'danger'} className="ms-2">
                      {result.marksObtained}/{result.question.marks}
                    </Badge>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="mb-3">
                    <h6 className="mb-2">Question:</h6>
                    <p>{result.question.questionText}</p>
                  </div>

                  {result.question.questionType === 'multiple-choice' || 
                   result.question.questionType === 'true-false' ? (
                    <div className="mb-3">
                      <h6 className="mb-2">Options:</h6>
                      {result.question.options.map((option, optIndex) => {
                        const isUserAnswer = option.text === result.userAnswer;
                        const isCorrectAnswer = option.text === result.question.correctAnswer;
                        
                        let className = 'p-3 mb-2 rounded border';
                        if (isCorrectAnswer) {
                          className += ' border-success bg-success-subtle';
                        } else if (isUserAnswer && !result.isCorrect) {
                          className += ' border-danger bg-danger-subtle';
                        }

                        return (
                          <div key={optIndex} className={className}>
                            {option.text}
                            {isCorrectAnswer && (
                              <Badge bg="success" className="ms-2">Correct Answer</Badge>
                            )}
                            {isUserAnswer && (
                              <Badge bg={result.isCorrect ? 'success' : 'danger'} className="ms-2">
                                Your Answer
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <div className="mb-3">
                        <h6 className="mb-2">Your Answer:</h6>
                        <p className={`p-3 rounded border ${result.isCorrect ? 'border-success bg-success-subtle' : 'border-danger bg-danger-subtle'}`}>
                          {result.userAnswer || <em>Not answered</em>}
                        </p>
                      </div>
                      <div className="mb-3">
                        <h6 className="mb-2">Correct Answer:</h6>
                        <p className="p-3 rounded border border-success bg-success-subtle">
                          {result.question.correctAnswer}
                        </p>
                      </div>
                    </>
                  )}

                  {result.question.explanation && (
                    <Alert variant="info" className="mb-0">
                      <strong>Explanation:</strong> {result.question.explanation}
                    </Alert>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      {/* Action Buttons */}
      <div className="text-center">
        <Button 
          variant="primary" 
          size="lg" 
          className="me-3"
          onClick={() => navigate('/quiz-hub')}
        >
          <i className="bi bi-house me-2"></i>
          Back to Quiz Hub
        </Button>
        
        <Button 
          variant="outline-primary" 
          size="lg"
          onClick={() => navigate('/dashboard')}
        >
          <i className="bi bi-speedometer2 me-2"></i>
          Go to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default QuizResults;
