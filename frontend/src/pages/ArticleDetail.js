import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Spinner, Alert, Badge, Button, Card, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format view count (e.g., 1234 -> 1.2K, 1234567 -> 1.2M)
  const formatViewCount = (count) => {
    if (!count) return '0';
    if (count < 1000) return count.toString();
    if (count < 1000000) return (count / 1000).toFixed(1) + 'K';
    return (count / 1000000).toFixed(1) + 'M';
  };

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await axios.get(`${API_BASE_URL}/content/${id}`);
      
      if (response.data.success) {
        setArticle(response.data.data);
        
        // Track article read
        const token = localStorage.getItem('token');
        if (token) {
          try {
            await axios.post(
              `${API_BASE_URL}/user/track-article`,
              { articleId: id },
              { headers: { Authorization: `Bearer ${token}` } }
            );
          } catch (err) {
            // Silently fail - tracking is not critical
          }
        }
      }
    } catch (err) {
      console.error('Error loading article:', err);
      setError('Failed to load article. Please try again later.');
    } finally {
      setLoading(false);
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
    const categories = {
      'aadhaar-basics': 'Aadhaar Basics',
      'dbt-info': 'DBT Information',
      'scholarship-guide': 'Scholarship Guide',
      'bank-linking': 'Bank Linking',
      'troubleshooting': 'Troubleshooting',
      'news-updates': 'News & Updates'
    };
    return categories[categoryValue] || categoryValue;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="primary" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading article...</p>
      </Container>
    );
  }

  if (error || !article) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Article</Alert.Heading>
          <p>{error || 'Article not found'}</p>
          <hr />
          <div className="d-flex justify-content-start gap-2">
            <Button variant="outline-danger" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button variant="danger" onClick={() => navigate('/learning-center')}>
              Browse All Articles
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/learning-center' }}>
          Learning Center
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{article.title}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Article Header */}
      <div className="mb-4">
        <div className="d-flex gap-2 mb-3 flex-wrap">
          <Badge bg="primary" className="text-uppercase">
            {getCategoryLabel(article.category)}
          </Badge>
          <Badge bg={getDifficultyBadge(article.difficulty)}>
            {article.difficulty}
          </Badge>
          {article.featured && (
            <Badge bg="warning" text="dark">
              ⭐ Featured
            </Badge>
          )}
        </div>

        <h1 className="display-5 fw-bold mb-3">{article.title}</h1>

        <p className="lead text-muted mb-4">{article.description}</p>

        <div className="d-flex flex-wrap gap-3 text-muted mb-4" style={{ fontSize: '0.95rem' }}>
          {article.author && (
            <span>
              <strong>👤 Author:</strong> {article.author.firstName} {article.author.lastName}
            </span>
          )}
          <span>
            <strong>🕐 Reading Time:</strong> {article.estimatedReadTime || 5} minutes
          </span>
          <span>
            <strong>👁️ Views:</strong> {formatViewCount(article.viewCount)}
          </span>
          {article.publishedAt && (
            <span>
              <strong>📅 Published:</strong> {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="d-flex flex-wrap gap-2 mb-4">
            {article.tags.map((tag, index) => (
              <Badge key={index} bg="light" text="dark" className="px-3 py-2">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Article Content */}
      <Card className="shadow-sm mb-4">
        <Card.Body className="p-4 p-md-5">
          {typeof article.content === 'string' ? (
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                fontSize: '1.1rem',
                lineHeight: '1.8',
                color: '#333'
              }}
            />
          ) : (
            <div className="alert alert-danger">
              <p>Error: Article content is not in the correct format.</p>
              <p>Content type: {typeof article.content}</p>
              <p>Please contact support.</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Article Footer */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          ← Go Back
        </Button>
        <Button variant="primary" onClick={() => navigate('/learning-center')}>
          Browse More Articles
        </Button>
      </div>

      {/* Help Section */}
      <Card className="bg-light">
        <Card.Body className="text-center py-4">
          <h5>Was this article helpful?</h5>
          <p className="text-muted mb-3">
            Let us know if you have any questions or need further assistance.
          </p>
          <Button variant="primary" href="/help">
            Contact Support
          </Button>
        </Card.Body>
      </Card>

      {/* Custom Styles for Article Content */}
      <style>{`
        .article-content h2 {
          color: #1a1a1a;
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e9ecef;
        }
        
        .article-content h3 {
          color: #2c2c2c;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .article-content h4 {
          color: #3c3c3c;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        
        .article-content p {
          margin-bottom: 1rem;
        }
        
        .article-content ul, .article-content ol {
          margin-bottom: 1rem;
          padding-left: 2rem;
        }
        
        .article-content li {
          margin-bottom: 0.5rem;
        }
        
        .article-content table {
          width: 100%;
          margin: 1.5rem 0;
          border-collapse: collapse;
        }
        
        .article-content table th {
          background-color: #f8f9fa;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          border: 1px solid #dee2e6;
        }
        
        .article-content table td {
          padding: 0.75rem;
          border: 1px solid #dee2e6;
        }
        
        .article-content table tr:nth-child(even) {
          background-color: #f8f9fa;
        }
        
        .article-content strong {
          font-weight: 600;
          color: #1a1a1a;
        }
        
        .article-content code {
          background-color: #f8f9fa;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }
        
        .article-content blockquote {
          border-left: 4px solid #0d6efd;
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: #6c757d;
          font-style: italic;
        }
      `}</style>
    </Container>
  );
};

export default ArticleDetail;
