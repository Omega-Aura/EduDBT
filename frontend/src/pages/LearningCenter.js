import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Form, Badge, Button, Tabs, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaBook, FaQuestionCircle, FaClock, FaTrophy, FaGraduationCap, FaPlay, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const LearningCenter = () => {
  const { category } = useParams();
  const { t } = useTranslation(['learning', 'common']);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'articles';
  
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [userAttempts, setUserAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Format view count (e.g., 1234 -> 1.2K, 1234567 -> 1.2M)
  const formatViewCount = (count) => {
    if (!count) return '0';
    if (count < 1000) return count.toString();
    if (count < 1000000) return (count / 1000).toFixed(1) + 'K';
    return (count / 1000000).toFixed(1) + 'M';
  };

  const categories = [
    { value: 'all', label: t('learning:categories.all'), color: 'primary' },
    { value: 'aadhaar-basics', label: t('learning:categories.aadhaarBasics'), color: 'info' },
    { value: 'dbt-info', label: t('learning:categories.dbtInfo'), color: 'success' },
    { value: 'scholarship-guide', label: t('learning:categories.scholarshipGuide'), color: 'warning' },
    { value: 'bank-linking', label: t('learning:categories.bankLinking'), color: 'danger' },
    { value: 'troubleshooting', label: t('learning:categories.troubleshooting'), color: 'secondary' },
    { value: 'news-updates', label: t('learning:categories.newsUpdates'), color: 'dark' }
  ];

  const difficulties = [
    { value: 'all', label: t('learning:difficulties.all') },
    { value: 'beginner', label: t('learning:difficulties.beginner') },
    { value: 'intermediate', label: t('learning:difficulties.intermediate') },
    { value: 'advanced', label: t('learning:difficulties.advanced') }
  ];

  useEffect(() => {
    loadContent();
    loadQuizzes();
    const token = localStorage.getItem('token');
    if (token) {
      loadUserAttempts();
    }
  }, []);

  useEffect(() => {
    // Update selected category when URL parameter changes
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  useEffect(() => {
    filterArticles();
    filterQuizzes();
  }, [articles, quizzes, searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  const loadContent = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/content');
      
      if (response.data.success) {
        setArticles(response.data.data.content);
      }
    } catch (err) {
      console.error('Error loading content:', err);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const loadQuizzes = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${API_URL}/quizzes`);
      
      if (response.data.success) {
        setQuizzes(response.data.data.quizzes);
      }
    } catch (err) {
      console.error('Error loading quizzes:', err);
    }
  };

  const loadUserAttempts = async () => {
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/quizzes/attempts/my-attempts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setUserAttempts(response.data.data.attempts);
      }
    } catch (err) {
      console.error('Error loading attempts:', err);
    }
  };

  const filterArticles = useCallback(() => {
    let filtered = [...articles];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty && selectedDifficulty !== 'all') {
      filtered = filtered.filter(article => article.difficulty === selectedDifficulty);
    }

    // Sort articles
    if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      // Default: newest first
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredArticles(filtered);
  }, [articles, searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterQuizzes = useCallback(() => {
    let filtered = [...quizzes];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(quiz =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(quiz => quiz.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty && selectedDifficulty !== 'all') {
      filtered = filtered.filter(quiz => quiz.difficulty === selectedDifficulty);
    }

    // Sort quizzes
    if (sortBy === 'popular') {
      // For quizzes, we don't have view count, so sort by totalQuestions
      filtered.sort((a, b) => b.totalQuestions - a.totalQuestions);
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      // Default: newest first
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredQuizzes(filtered);
  }, [quizzes, searchTerm, selectedCategory, selectedDifficulty, sortBy]);

  const getAttemptStats = (quizId) => {
    const attempts = userAttempts.filter(a => a.quiz._id === quizId && a.status === 'completed');
    
    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        bestScore: 0,
        hasPassed: false,
        lastAttemptId: null
      };
    }

    const bestScore = Math.max(...attempts.map(a => a.percentage));
    const lastAttempt = attempts[attempts.length - 1];
    
    return {
      totalAttempts: attempts.length,
      bestScore: Math.round(bestScore),
      hasPassed: attempts.some(a => a.passed),
      lastAttemptId: lastAttempt._id
    };
  };

  const handleStartQuiz = async (quizId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.post(
        `${API_URL}/quizzes/${quizId}/start`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        navigate(`/quiz/${quizId}?attemptId=${response.data.data._id}`);
      }
    } catch (err) {
      console.error('Error starting quiz:', err);
      alert(err.response?.data?.message || 'Failed to start quiz. Please try again.');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'secondary';
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      beginner: 'success',
      intermediate: 'warning',
      advanced: 'danger'
    };
    return badges[difficulty] || 'secondary';
  };

  const getCategoryLabel = (categoryValue) => {
    const cat = categories.find(c => c.value === categoryValue);
    return cat ? cat.label : categoryValue;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading articles...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Learning Center</h1>
        <p className="lead text-muted">
          Comprehensive guides and resources for Aadhaar, DBT, and scholarship applications
        </p>
      </div>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Search and Filters */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="g-3">
            {/* Search Bar */}
            <Col md={12}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="🔍 Search articles by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="lg"
                />
              </Form.Group>
            </Col>

            {/* Category Filter */}
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Category</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Difficulty Filter */}
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Difficulty Level</Form.Label>
                <Form.Select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  {difficulties.map(diff => (
                    <option key={diff.value} value={diff.value}>
                      {diff.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Sort By */}
            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">Sort By</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                  <option value="oldest">Oldest First</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
            <div className="mt-3">
              <small className="text-muted">Active filters:</small>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {searchTerm && (
                  <Badge bg="info" className="d-flex align-items-center gap-1">
                    Search: "{searchTerm}"
                    <button
                      className="btn-close btn-close-white"
                      style={{ fontSize: '0.6rem' }}
                      onClick={() => setSearchTerm('')}
                    />
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge bg="primary" className="d-flex align-items-center gap-1">
                    {getCategoryLabel(selectedCategory)}
                    <button
                      className="btn-close btn-close-white"
                      style={{ fontSize: '0.6rem' }}
                      onClick={() => setSelectedCategory('all')}
                    />
                  </Badge>
                )}
                {selectedDifficulty !== 'all' && (
                  <Badge bg="warning" className="d-flex align-items-center gap-1">
                    {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
                    <button
                      className="btn-close btn-close-white"
                      style={{ fontSize: '0.6rem' }}
                      onClick={() => setSelectedDifficulty('all')}
                    />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Tabs for Articles and Quizzes */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => navigate(`/learning-center?tab=${k}`)}
        className="mb-4"
      >
        {/* Articles Tab */}
        <Tab eventKey="articles" title={<><FaBook className="me-2" />Articles</>}>
          {/* Results Count */}
          <div className="mb-3 mt-3">
            <p className="text-muted">
              Showing {filteredArticles.length} of {articles.length} articles
            </p>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <Alert variant="info">
              <Alert.Heading>No articles found</Alert.Heading>
              <p>
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
              <Button
                variant="outline-info"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                }}
              >
                Clear All Filters
              </Button>
            </Alert>
          ) : (
            <Row className="g-4">
              {filteredArticles.map((article) => (
                <Col key={article._id} md={6} lg={4}>
                  <Card className="h-100 shadow-sm hover-shadow" style={{ transition: 'all 0.3s' }}>
                    {article.featured && (
                      <div className="bg-gradient-to-r from-primary to-info text-white px-3 py-2">
                        <small className="fw-bold">⭐ Featured</small>
                      </div>
                    )}
                    
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Badge bg="primary" className="text-uppercase" style={{ fontSize: '0.7rem' }}>
                          {getCategoryLabel(article.category)}
                        </Badge>
                        <Badge bg={getDifficultyBadge(article.difficulty)}>
                          {article.difficulty}
                        </Badge>
                      </div>

                      <Card.Title className="mb-2">
                        <Link
                          to={`/learning-center/articles/${article._id}`}
                          className="text-decoration-none text-dark"
                          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                        >
                          {article.title}
                        </Link>
                      </Card.Title>

                      <Card.Text className="text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
                        {article.description?.substring(0, 120)}...
                      </Card.Text>

                      <div className="mb-3">
                        {article.tags?.slice(0, 3).map((tag, index) => (
                          <Badge key={index} bg="light" text="dark" className="me-1 mb-1" style={{ fontSize: '0.7rem' }}>
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="d-flex justify-content-between align-items-center text-muted" style={{ fontSize: '0.85rem' }}>
                        <span>
                          🕐 {article.estimatedReadTime || 5} min read
                        </span>
                        <span>
                          👁️ {formatViewCount(article.viewCount)} views
                        </span>
                      </div>

                      <Link
                        to={`/learning-center/articles/${article._id}`}
                        className="btn btn-outline-primary mt-3 w-100"
                      >
                        Read Article →
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>

        {/* Quizzes Tab */}
        <Tab eventKey="quizzes" title={<><FaGraduationCap className="me-2" />Quizzes</>}>
          {/* Results Count */}
          <div className="mb-3 mt-3">
            <p className="text-muted">
              Showing {filteredQuizzes.length} of {quizzes.length} quizzes
            </p>
          </div>

          {/* Quizzes Grid */}
          {filteredQuizzes.length === 0 ? (
            <Alert variant="info">
              <Alert.Heading>No quizzes found</Alert.Heading>
              <p>
                Try adjusting your filters or search terms to find quizzes that match your interests.
              </p>
              <Button
                variant="outline-info"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                }}
              >
                Clear All Filters
              </Button>
            </Alert>
          ) : (
            <Row className="g-4">
              {filteredQuizzes.map((quiz) => {
                const attemptStats = getAttemptStats(quiz._id);
                const attemptsLeft = quiz.attemptsAllowed - attemptStats.totalAttempts;
                
                return (
                  <Col key={quiz._id} md={6} lg={4}>
                    <Card className="h-100 shadow-sm hover-shadow" style={{ transition: 'all 0.3s' }}>
                      <Card.Header className={`bg-${getDifficultyColor(quiz.difficulty)} text-white`}>
                        <div className="d-flex justify-content-between align-items-center">
                          <Badge bg="light" text="dark" className="text-uppercase" style={{ fontSize: '0.7rem' }}>
                            {getCategoryLabel(quiz.category)}
                          </Badge>
                          <Badge bg="dark">
                            {quiz.difficulty}
                          </Badge>
                        </div>
                      </Card.Header>
                      
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="h5 mb-2">
                          <FaQuestionCircle className="me-2 text-primary" />
                          {quiz.title}
                        </Card.Title>
                        
                        <Card.Text className="text-muted flex-grow-1">
                          {quiz.description}
                        </Card.Text>

                        <div className="d-flex justify-content-between text-muted small mb-3">
                          <span>
                            <FaQuestionCircle className="me-1" />
                            {quiz.totalQuestions} questions
                          </span>
                          <span>
                            <FaClock className="me-1" />
                            {quiz.timeLimit} min
                          </span>
                          <span>
                            <FaTrophy className="me-1" />
                            {quiz.totalMarks} marks
                          </span>
                        </div>

                        {attemptStats.totalAttempts > 0 && (
                          <Alert variant="light" className="py-2 mb-2">
                            <small>
                              <strong>Best Score:</strong> {attemptStats.bestScore}% 
                              {attemptStats.hasPassed && (
                                <FaCheckCircle className="ms-2 text-success" />
                              )}
                              <br />
                              <strong>Attempts:</strong> {attemptStats.totalAttempts} / {quiz.attemptsAllowed}
                            </small>
                          </Alert>
                        )}

                        {attemptsLeft > 0 ? (
                          <Button
                            variant={attemptStats.totalAttempts > 0 ? "outline-primary" : "primary"}
                            className="w-100 mt-auto"
                            onClick={() => handleStartQuiz(quiz._id)}
                          >
                            <FaPlay className="me-2" />
                            {attemptStats.totalAttempts > 0 ? 'Retake Quiz' : 'Start Quiz'}
                          </Button>
                        ) : (
                          <Alert variant="warning" className="mb-0 py-2">
                            <small>
                              <FaExclamationTriangle className="me-2" />
                              Maximum attempts reached
                            </small>
                          </Alert>
                        )}

                        {attemptStats.totalAttempts > 0 && (
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            className="w-100 mt-2"
                            onClick={() => navigate(`/quiz/results/${attemptStats.lastAttemptId}`)}
                          >
                            View Last Results
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Tab>
      </Tabs>

      {/* Help Section */}
      <Card className="mt-5 bg-light">
        <Card.Body className="text-center py-4">
          <h4>Can't find what you're looking for?</h4>
          <p className="text-muted mb-3">
            Our team is here to help you with any questions about Aadhaar, DBT, or scholarships.
          </p>
          <Button variant="primary" href="/help">
            Get Help
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LearningCenter;
