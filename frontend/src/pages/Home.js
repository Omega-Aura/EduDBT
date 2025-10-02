import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { 
  FaIdCard, 
  FaUniversity, 
  FaBookOpen, 
  FaQuestionCircle,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation(['home', 'common']);

  const features = [
    {
      icon: <FaIdCard size={48} className="text-primary mb-3" />,
      title: t('home:features.aadhaarBasics.title'),
      description: t('home:features.aadhaarBasics.description'),
      link: '/learning-center/category/aadhaar-basics'
    },
    {
      icon: <FaUniversity size={48} className="text-success mb-3" />,
      title: t('home:features.bankLinking.title'),
      description: t('home:features.bankLinking.description'),
      link: '/learning-center/category/bank-linking'
    },
    {
      icon: <FaBookOpen size={48} className="text-info mb-3" />,
      title: t('home:features.scholarship.title'),
      description: t('home:features.scholarship.description'),
      link: '/learning-center/category/scholarship-guide'
    },
    {
      icon: <FaQuestionCircle size={48} className="text-warning mb-3" />,
      title: t('home:features.help.title'),
      description: t('home:features.help.description'),
      link: '/help'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-3">
                {t('home:hero.title')}
              </h1>
              <p className="lead mb-4">
                {t('home:hero.subtitle')}
              </p>
              {!isAuthenticated ? (
                <div className="d-flex gap-3 flex-wrap">
                  <Button as={Link} to="/register" variant="light" size="lg">
                    {t('home:hero.getStarted')}
                  </Button>
                  <Button as={Link} to="/login" variant="outline-light" size="lg">
                    {t('home:hero.exploreContent')} 🔒
                  </Button>
                </div>
              ) : (
                <div className="d-flex gap-3 flex-wrap">
                  <Button as={Link} to="/dashboard" variant="light" size="lg">
                    {t('home:hero.goToDashboard')}
                  </Button>
                  <Button as={Link} to="/learning-center" variant="outline-light" size="lg">
                    {t('home:hero.learningCenter')}
                  </Button>
                </div>
              )}
            </Col>
            <Col lg={4} className="text-center mt-4 mt-lg-0">
              <div className="bg-white rounded-circle p-4 d-inline-block">
                <FaIdCard size={120} className="text-primary" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Welcome Message for Authenticated Users */}
      {isAuthenticated && (
        <section className="py-4 bg-light">
          <Container>
            <Row>
              <Col>
                <div className="d-flex align-items-center">
                  <FaCheckCircle className="text-success me-2" size={24} />
                  <h4 className="mb-0">{t('home:welcome.back', { name: user?.firstName })}</h4>
                </div>
                <p className="mb-0 text-muted">
                  {t('home:welcome.subtitle')}
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-6 fw-bold">{t('home:features.title')}</h2>
              <p className="lead text-muted">
                {t('home:features.subtitle')}
              </p>
            </Col>
          </Row>
          
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="h-100 text-center border-0 shadow-sm hover-shadow">
                  <Card.Body className="p-4">
                    {feature.icon}
                    <Card.Title className="h5">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to={isAuthenticated ? feature.link : '/login'} 
                      variant="outline-primary"
                      size="sm"
                    >
                      {t('home:features.learnMore')} {!isAuthenticated && '🔒'}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center">
            <Col md={3} className="mb-4">
              <h3 className="display-6 text-primary fw-bold">10K+</h3>
              <p className="text-muted">{t('home:statistics.studentsHelped')}</p>
            </Col>
            <Col md={3} className="mb-4">
              <h3 className="display-6 text-success fw-bold">50+</h3>
              <p className="text-muted">{t('home:statistics.learningResources')}</p>
            </Col>
            <Col md={3} className="mb-4">
              <h3 className="display-6 text-info fw-bold">24/7</h3>
              <p className="text-muted">{t('home:statistics.supportAvailable')}</p>
            </Col>
            <Col md={3} className="mb-4">
              <h3 className="display-6 text-warning fw-bold">98%</h3>
              <p className="text-muted">{t('home:statistics.successRate')}</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      {!isAuthenticated && (
        <section className="py-5 bg-primary text-white">
          <Container>
            <Row className="text-center">
              <Col>
                <h2 className="display-6 fw-bold mb-3">{t('home:cta.title')}</h2>
                <p className="lead mb-4">
                  {t('home:cta.subtitle')}
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <Button as={Link} to="/register" variant="light" size="lg">
                    {t('home:cta.createAccount')}
                  </Button>
                  <Button as={Link} to="/login" variant="outline-light" size="lg">
                    {t('home:cta.signIn')}
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Important Notice */}
      <section className="py-4 bg-warning bg-opacity-25">
        <Container>
          <Row>
            <Col>
              <div className="d-flex align-items-start">
                <FaExclamationTriangle className="text-warning me-3 mt-1" size={20} />
                <div>
                  <h6 className="fw-bold mb-1">{t('home:notice.important')}</h6>
                  <p className="mb-0 small">
                    {t('home:notice.text')}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;