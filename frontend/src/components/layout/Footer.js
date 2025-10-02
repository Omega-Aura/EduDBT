import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation(['common']);
  
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>{t('common:footer.title')}</h5>
            <p className="mb-0">
              {t('common:footer.description')}
            </p>
          </Col>
          <Col md={3}>
            <h6>{t('common:footer.quickLinks')}</h6>
            <ul className="list-unstyled">
              <li><Link to="/learning-center" className="text-light text-decoration-none">{t('common:footer.learningCenter')}</Link></li>
              <li><Link to="/help" className="text-light text-decoration-none">{t('common:footer.helpSupport')}</Link></li>
              <li><Link to="/privacy" className="text-light text-decoration-none">{t('common:footer.privacyPolicy')}</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h6>{t('common:footer.contact')}</h6>
            <ul className="list-unstyled">
              <li>{t('common:footer.email')}</li>
              <li>{t('common:footer.phone')}</li>
              <li>{t('common:footer.helpline')}</li>
            </ul>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              {t('common:footer.copyright')} | {t('common:footer.developedFor')}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;