import React from 'react';
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { useResponsive } from '../../hooks/useResponsive';
import { useLanguage } from '../../context/LanguageContext';
import { FaUser, FaSignOutAlt, FaHome, FaBook, FaQuestionCircle, FaTrophy, FaGlobe } from 'react-icons/fa';

const Header = () => {
  const { t } = useTranslation(['common', 'navigation']);
  const { isAuthenticated, user, logout } = useAuth();
  const { isMobile } = useResponsive();
  const { currentLanguage, changeLanguage, languages, getCurrentLanguageName } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          {isMobile ? t('common:appName') : t('common:appName')}
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <FaHome className="me-1" />
              {t('navigation:home')}
            </Nav.Link>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  <FaHome className="me-1" />
                  {t('navigation:dashboard')}
                </Nav.Link>
                <Nav.Link as={Link} to="/learning-center">
                  <FaBook className="me-1" />
                  {t('navigation:learningCenter')}
                </Nav.Link>
                <Nav.Link as={Link} to="/learning-center?tab=quizzes">
                  <FaTrophy className="me-1" />
                  {t('navigation:quizzes')}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-warning">
                  <FaBook className="me-1" />
                  {t('navigation:learningCenter')} 🔒
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="text-warning">
                  <FaTrophy className="me-1" />
                  {t('navigation:quizzes')} 🔒
                </Nav.Link>
              </>
            )}
            <Nav.Link as={Link} to="/help">
              <FaQuestionCircle className="me-1" />
              {t('navigation:help')}
            </Nav.Link>
          </Nav>
          
          <Nav className="ms-auto align-items-center">
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="outline-light" size="sm" id="language-dropdown">
                <FaGlobe className="me-1" />
                {isMobile ? currentLanguage.toUpperCase() : getCurrentLanguageName()}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {languages.map((lang) => (
                  <Dropdown.Item
                    key={lang.code}
                    active={currentLanguage === lang.code}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    {lang.name} ({lang.nativeName})
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <FaUser className="me-1" />
                  {isMobile ? t('navigation:profile') : `${t('common:welcome')}, ${user?.firstName || user?.username || t('common:user')}`}
                </Nav.Link>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={handleLogout}
                  className="ms-2"
                >
                  <FaSignOutAlt className="me-1" />
                  {!isMobile && t('navigation:logout')}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-light" 
                  size="sm" 
                  className="me-2"
                >
                  {t('navigation:login')}
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="light" 
                  size="sm"
                >
                  {t('navigation:register')}
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;