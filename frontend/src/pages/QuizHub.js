import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const QuizHub = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [userAttempts, setUserAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    loadQuizzes();
    if (token) {
      loadUserAttempts();
    }
  }, []);

  const loadQuizzes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/quizzes`);
      if (response.data.success) {
        setQuizzes(response.data.data.quizzes);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  const loadUserAttempts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/quizzes/attempts/my-attempts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setUserAttempts(response.data.data.attempts);
      }
    } catch (err) {
      console.error('Failed to load user attempts:', err);
    }
  };

  const getQuizStatus = (quizId) => {
    const attempts = userAttempts.filter(
      a => a.quiz._id === quizId && a.status === 'completed'
    );
    
    if (attempts.length === 0) {
      return { status: 'not-started', text: 'Not Started', variant: 'secondary' };
    }
    
    const bestAttempt = attempts.reduce((best, current) => 
      current.percentage > best.percentage ? current : best
    );
    
    if (bestAttempt.passed) {
      return { 
        status: 'passed', 
        text: `Passed (${bestAttempt.percentage.toFixed(1)}%)`, 
        variant: 'success',
        score: bestAttempt.percentage
      };
    } else {
      return { 
        status: 'failed', 
        text: `Failed (${bestAttempt.percentage.toFixed(1)}%)`, 
        variant: 'danger',
        score: bestAttempt.percentage
      };
    }
  };

  const getCategoryInfo = (category) => {
    const categories = {
      'aadhaar-basics': { name: 'Aadhaar Basics', color: 'info', icon: '📋' },
      'dbt-info': { name: 'DBT Information', color: 'success', icon: '💳' },
      'scholarship-guide': { name: 'Scholarship Guide', color: 'warning', icon: '🎓' },
      'bank-linking': { name: 'Bank Linking', color: 'danger', icon: '🏦' },
      'troubleshooting': { name: 'Troubleshooting', color: 'secondary', icon: '🔧' },
      'news-updates': { name: 'News & Updates', color: 'dark', icon: '📰' }
    };
    return categories[category] || { name: category, color: 'primary', icon: '📚' };
  };

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      beginner: { variant: 'success', icon: '⭐' },
      intermediate: { variant: 'warning', icon: '⭐⭐' },
      advanced: { variant: 'danger', icon: '⭐⭐⭐' }
    };
    return badges[difficulty] || badges.beginner;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading quizzes...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Group quizzes by category
  const quizzesByCategory = quizzes.reduce((acc, quiz) => {
    if (!acc[quiz.category]) {
      acc[quiz.category] = [];
    }
    acc[quiz.category].push(quiz);
    return acc;
  }, {});

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="mb-2">
          <span className="me-2">🎯</span>
          Quiz Hub
        </h1>
        <p className="text-muted">
          Test your knowledge and track your progress across various topics
        </p>
      </div>

      {!isAuthenticated && (
        <Alert variant="info" className="mb-4">
          <Alert.Heading>
            <i className="bi bi-info-circle me-2"></i>
            Sign in to take quizzes
          </Alert.Heading>
          <p className="mb-0">
            You need to be logged in to attempt quizzes and track your progress.
            <Link to="/login" className="alert-link ms-2">Login now</Link>
          </p>
        </Alert>
      )}

      {/* Quiz Stats for authenticated users */}
      {isAuthenticated && userAttempts.length > 0 && (
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center border-primary">
              <Card.Body>
                <h3 className="text-primary mb-0">
                  {userAttempts.filter(a => a.status === 'completed').length}
                </h3>
                <small className="text-muted">Quizzes Completed</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-success">
              <Card.Body>
                <h3 className="text-success mb-0">
                  {userAttempts.filter(a => a.passed).length}
                </h3>
                <small className="text-muted">Quizzes Passed</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-info">
              <Card.Body>
                <h3 className="text-info mb-0">
                  {userAttempts.length > 0 
                    ? (userAttempts
                        .filter(a => a.status === 'completed')
                        .reduce((sum, a) => sum + a.percentage, 0) / 
                       userAttempts.filter(a => a.status === 'completed').length
                      ).toFixed(1)
                    : '0'}%
                </h3>
                <small className="text-muted">Average Score</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Quizzes by Category */}
      {Object.keys(quizzesByCategory).map(category => {
        const categoryInfo = getCategoryInfo(category);
        
        return (
          <div key={category} className="mb-5">
            <h3 className="mb-3">
              <span className="me-2">{categoryInfo.icon}</span>
              {categoryInfo.name}
              <Badge bg={categoryInfo.color} className="ms-2">
                {quizzesByCategory[category].length}
              </Badge>
            </h3>
            
            <Row>
              {quizzesByCategory[category].map(quiz => {
                const status = isAuthenticated ? getQuizStatus(quiz._id) : null;
                const difficultyBadge = getDifficultyBadge(quiz.difficulty);
                const attemptsCount = userAttempts.filter(
                  a => a.quiz._id === quiz._id && a.status === 'completed'
                ).length;

                return (
                  <Col key={quiz._id} md={6} lg={4} className="mb-4">
                    <Card className="h-100 shadow-sm hover-card">
                      <Card.Body className="d-flex flex-column">
                        <div className="mb-3">
                          <Badge bg={difficultyBadge.variant} className="me-2">
                            {difficultyBadge.icon} {quiz.difficulty}
                          </Badge>
                          {status && (
                            <Badge bg={status.variant}>
                              {status.text}
                            </Badge>
                          )}
                        </div>

                        <Card.Title className="mb-2">{quiz.title}</Card.Title>
                        <Card.Text className="text-muted mb-3 flex-grow-1">
                          {quiz.description}
                        </Card.Text>

                        <div className="quiz-info mb-3">
                          <div className="d-flex justify-content-between text-muted small mb-2">
                            <span>
                              <i className="bi bi-question-circle me-1"></i>
                              {quiz.totalQuestions} Questions
                            </span>
                            <span>
                              <i className="bi bi-clock me-1"></i>
                              {quiz.timeLimit} mins
                            </span>
                          </div>
                          <div className="d-flex justify-content-between text-muted small">
                            <span>
                              <i className="bi bi-trophy me-1"></i>
                              Pass: {quiz.passingScore}%
                            </span>
                            <span>
                              <i className="bi bi-arrow-repeat me-1"></i>
                              {quiz.attemptsAllowed} attempts
                            </span>
                          </div>
                        </div>

                        {isAuthenticated && attemptsCount > 0 && (
                          <div className="text-muted small mb-3">
                            <i className="bi bi-clipboard-check me-1"></i>
                            Attempted {attemptsCount}/{quiz.attemptsAllowed} times
                          </div>
                        )}

                        {isAuthenticated ? (
                          attemptsCount >= quiz.attemptsAllowed ? (
                            <Button variant="secondary" disabled className="w-100">
                              <i className="bi bi-lock me-2"></i>
                              Max Attempts Reached
                            </Button>
                          ) : (
                            <Button 
                              as={Link} 
                              to={`/quiz/${quiz._id}`}
                              variant="primary" 
                              className="w-100"
                            >
                              <i className="bi bi-play-circle me-2"></i>
                              {attemptsCount > 0 ? 'Retake Quiz' : 'Start Quiz'}
                            </Button>
                          )
                        ) : (
                          <Button 
                            as={Link} 
                            to="/login"
                            variant="outline-primary" 
                            className="w-100"
                          >
                            <i className="bi bi-lock me-2"></i>
                            Login to Start
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        );
      })}

      {quizzes.length === 0 && (
        <Alert variant="info">
          <Alert.Heading>No Quizzes Available</Alert.Heading>
          <p className="mb-0">Check back later for new quizzes!</p>
        </Alert>
      )}

      <style jsx>{`
        .hover-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </Container>
  );
};

export default QuizHub;
