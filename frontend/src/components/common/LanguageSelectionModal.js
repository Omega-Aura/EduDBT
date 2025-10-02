import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { FaGlobe, FaCheck } from 'react-icons/fa';
import './LanguageSelectionModal.css';

const LanguageSelectionModal = ({ show, onLanguageSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' }
  ];

  const handleLanguageClick = (code) => {
    setSelectedLanguage(code);
  };

  const handleContinue = () => {
    onLanguageSelect(selectedLanguage);
  };

  return (
    <Modal 
      show={show} 
      onHide={() => {}} 
      backdrop="static" 
      keyboard={false}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title className="w-100 text-center">
          <FaGlobe className="me-2 text-primary" size={28} />
          <div className="mt-2">
            <h4 className="mb-1">Select Your Preferred Language</h4>
            <p className="text-muted small mb-0">अपनी पसंदीदा भाषा चुनें</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Row className="g-3">
          {languages.map((lang) => (
            <Col xs={6} md={4} key={lang.code}>
              <Card
                className={`language-card h-100 cursor-pointer ${
                  selectedLanguage === lang.code ? 'selected' : ''
                }`}
                onClick={() => handleLanguageClick(lang.code)}
              >
                <Card.Body className="text-center p-3 position-relative">
                  {selectedLanguage === lang.code && (
                    <div className="position-absolute top-0 end-0 p-2">
                      <FaCheck className="text-success" />
                    </div>
                  )}
                  <div className="language-flag mb-2">{lang.flag}</div>
                  <h6 className="mb-1">{lang.name}</h6>
                  <small className="text-muted language-native">
                    {lang.nativeName}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-0 pt-0">
        <Button 
          variant="primary" 
          size="lg" 
          onClick={handleContinue}
          className="px-5"
        >
          Continue / जारी रखें
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LanguageSelectionModal;
