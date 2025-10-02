import React from 'react';
import { Form } from 'react-bootstrap';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelector = ({ value, onChange, onBlur, isInvalid, error, required = false, size = 'md' }) => {
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' }
  ];

  return (
    <>
      <Form.Label>
        <FaGlobe className="me-2" />
        Preferred Language {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Select
        name="languagePreference"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={isInvalid}
        size={size}
      >
        <option value="">Select your preferred language</option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name} ({lang.nativeName})
          </option>
        ))}
      </Form.Select>
      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
      <Form.Text className="text-muted">
        Choose your preferred language for the platform interface
      </Form.Text>
    </>
  );
};

export default LanguageSelector;
