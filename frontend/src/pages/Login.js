import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { FaEye, FaEyeSlash, FaInfoCircle } from 'react-icons/fa';
import LanguageSelectionModal from '../components/common/LanguageSelectionModal';

const Login = () => {
  const { t } = useTranslation(['auth', 'common']);
  const [showPassword, setShowPassword] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState('');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const { login, isLoading, error, clearAuthError, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user has selected language before (stored in localStorage)
  useEffect(() => {
    const storedLanguage = localStorage.getItem('userLanguage');
    if (!storedLanguage) {
      setShowLanguageModal(true);
    } else {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  // Check if user was redirected from a protected route
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const from = params.get('from');
    const message = params.get('message');
    
    if (message) {
      setRedirectMessage(decodeURIComponent(message));
    } else if (from) {
      setRedirectMessage('Please log in to access this feature.');
    }

    // If already authenticated, redirect to intended destination or dashboard
    if (isAuthenticated) {
      const intendedDestination = from || '/dashboard';
      navigate(intendedDestination, { replace: true });
    }
  }, [location, isAuthenticated, navigate]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('auth:login.errors.invalidEmail'))
      .required(t('auth:login.errors.requiredEmail')),
    password: Yup.string()
      .required(t('auth:login.errors.requiredPassword')),
  });

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem('userLanguage', language);
    setShowLanguageModal(false);
  };

  const handleSubmit = async (values) => {
    clearAuthError();
    try {
      const result = await login(values);
      if (result.type === 'auth/login/fulfilled') {
        // Get the intended destination from URL params or default to dashboard
        const params = new URLSearchParams(location.search);
        const from = params.get('from') || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <LanguageSelectionModal 
        show={showLanguageModal} 
        onLanguageSelect={handleLanguageSelect} 
      />
      
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">{t('auth:login.title')}</h2>
                  <p className="text-muted">{t('auth:login.subtitle')}</p>
                </div>

              {redirectMessage && (
                <Alert variant="info" className="d-flex align-items-center">
                  <FaInfoCircle className="me-2" />
                  {redirectMessage}
                </Alert>
              )}

              {error && (
                <Alert variant="danger" dismissible onClose={clearAuthError}>
                  {error}
                </Alert>
              )}

              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>{t('auth:login.emailLabel')}</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                        placeholder={t('auth:login.emailPlaceholder')}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>{t('auth:login.passwordLabel')}</Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.password && errors.password}
                          placeholder={t('auth:login.passwordPlaceholder')}
                          autoComplete="new-password"
                        />
                        <Button
                          variant="link"
                          className="position-absolute end-0 top-0 p-2 border-0"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ zIndex: 10 }}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check
                        type="checkbox"
                        id="remember"
                        label={t('auth:login.rememberMe')}
                      />
                      <Link to="/forgot-password" className="text-decoration-none">
                        {t('auth:login.forgotPassword')}
                      </Link>
                    </div>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mb-3"
                      size="lg"
                      disabled={isLoading || !isValid}
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          {t('common:loading')}...
                        </>
                      ) : (
                        t('auth:login.submitButton')
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>

              <div className="text-center">
                <p className="text-muted mb-0">
                  {t('auth:login.noAccount')}{' '}
                  <Link to="/register" className="text-decoration-none">
                    {t('auth:login.createAccount')}
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Login;