import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Alert, Modal, Form } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { FaEdit, FaTrash, FaPlus, FaEye, FaBook, FaQuestionCircle, FaUsers } from 'react-icons/fa';
import axios from 'axios';

const AdminPanel = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/content`);
      if (response.data.success) {
        setArticles(response.data.data || []);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading articles:', err);
      setError('Failed to load articles');
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/content/${deleteItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Article deleted successfully');
      setShowDeleteModal(false);
      loadArticles();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete article');
      setTimeout(() => setError(''), 3000);
    }
  };

  const confirmDelete = (id) => {
    setDeleteItemId(id);
    setShowDeleteModal(true);
  };

  if (user?.role !== 'admin') {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Access Denied</Alert.Heading>
          <p>You don't have permission to access this page. Admin privileges required.</p>
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Admin Panel</h2>
          <p className="text-muted">Manage content, quizzes, and users</p>
        </div>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Statistics Cards */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <FaBook size={40} className="text-primary mb-3" />
              <h3>{articles.length}</h3>
              <p className="text-muted mb-0">Total Articles</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <FaQuestionCircle size={40} className="text-success mb-3" />
              <h3>0</h3>
              <p className="text-muted mb-0">Total Quizzes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="text-center">
              <FaUsers size={40} className="text-info mb-3" />
              <h3>-</h3>
              <p className="text-muted mb-0">Total Users</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Articles Management */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Header className="bg-white border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <FaBook className="me-2" />
              Articles & Content
            </h5>
            <Button variant="primary" size="sm" disabled>
              <FaPlus className="me-2" />
              Add New Article
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          {articles.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <FaBook size={50} className="mb-3 opacity-50" />
              <p>No articles found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Views</th>
                    <th>Created</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article._id}>
                      <td>
                        <div className="fw-semibold">{article.title}</div>
                        <small className="text-muted">{article.description?.substring(0, 60)}...</small>
                      </td>
                      <td>
                        <Badge bg="secondary">{article.category || 'General'}</Badge>
                      </td>
                      <td>
                        <Badge bg={article.isPublished ? 'success' : 'warning'}>
                          {article.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td>{article.viewCount || 0}</td>
                      <td>
                        <small className="text-muted">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </small>
                      </td>
                      <td className="text-end">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          title="View"
                          onClick={() => window.open(`/learning-center/articles/${article._id}`, '_blank')}
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="me-2"
                          title="Edit"
                          disabled
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Delete"
                          onClick={() => confirmDelete(article._id)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this article? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
