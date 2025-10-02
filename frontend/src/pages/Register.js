import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LanguageSelector from '../components/common/LanguageSelector';

const Register = () => {
  const { t } = useTranslation(['auth', 'common']);
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading, error, clearAuthError } = useAuth();
  const navigate = useNavigate();

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
    'Andaman and Nicobar Islands', 'Dadra and Nagar Haveli and Daman and Diu',
    'Lakshadweep'
  ];

  const educationLevels = ['10th', '12th', 'Graduate', 'Post-Graduate', 'Diploma', 'ITI'];

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('auth:register.errors.usernameMin'))
      .max(30, t('auth:register.errors.usernameMax'))
      .matches(/^[a-zA-Z0-9_]+$/, t('auth:register.errors.usernameInvalid'))
      .required(t('auth:register.errors.usernameRequired')),
    email: Yup.string()
      .email(t('auth:register.errors.emailInvalid'))
      .required(t('auth:register.errors.emailRequired')),
    password: Yup.string()
      .min(8, t('auth:register.errors.passwordMin'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        t('auth:register.errors.passwordWeak')
      )
      .required(t('auth:register.errors.passwordRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('auth:register.errors.confirmPasswordMismatch'))
      .required(t('auth:register.errors.confirmPasswordRequired')),
    firstName: Yup.string()
      .min(2, t('auth:register.errors.firstNameMin'))
      .max(50, t('auth:register.errors.firstNameMax'))
      .matches(/^[a-zA-Z\s]+$/, t('auth:register.errors.firstNameInvalid'))
      .required(t('auth:register.errors.firstNameRequired')),
    lastName: Yup.string()
      .min(2, t('auth:register.errors.lastNameMin'))
      .max(50, t('auth:register.errors.lastNameMax'))
      .matches(/^[a-zA-Z\s]+$/, t('auth:register.errors.lastNameInvalid'))
      .required(t('auth:register.errors.lastNameRequired')),
    phoneNumber: Yup.string()
      .matches(/^[6-9]\d{9}$/, t('auth:register.errors.phoneInvalid'))
      .required(t('auth:register.errors.phoneRequired')),
    state: Yup.string()
      .required(t('auth:register.errors.stateRequired')),
    district: Yup.string()
      .min(2, t('auth:register.errors.districtMin'))
      .required(t('auth:register.errors.districtRequired')),
    educationLevel: Yup.string()
      .required(t('auth:register.errors.educationRequired')),
    languagePreference: Yup.string()
      .required(t('auth:register.errors.languageRequired')),
  });

  const handleSubmit = async (values) => {
    clearAuthError();
    const { confirmPassword, ...registrationData } = values;
    
    try {
      const result = await register(registrationData);
      
      if (result.type === 'auth/register/fulfilled') {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold">{t('auth:register.title')}</h2>
                <p className="text-muted">{t('auth:register.subtitle')}</p>
              </div>

              {error && (
                <Alert variant="danger" dismissible onClose={clearAuthError}>
                  {error}
                </Alert>
              )}

              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                  firstName: '',
                  lastName: '',
                  phoneNumber: '',
                  state: '',
                  district: '',
                  educationLevel: '',
                  languagePreference: 'en'
                }}
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
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('auth:register.firstNameLabel')}</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.firstName && errors.firstName}
                            placeholder={t('auth:register.firstNamePlaceholder')}
                            autoComplete="off"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('auth:register.lastNameLabel')}</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.lastName && errors.lastName}
                            placeholder={t('auth:register.lastNamePlaceholder')}
                            autoComplete="off"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>{t('auth:register.usernameLabel')}</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.username && errors.username}
                        placeholder={t('auth:register.usernamePlaceholder')}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>{t('auth:register.emailLabel')}</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && errors.email}
                        placeholder={t('auth:register.emailPlaceholder')}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>{t('auth:register.phoneLabel')}</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.phoneNumber && errors.phoneNumber}
                        placeholder={t('auth:register.phonePlaceholder')}
                        maxLength={10}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('auth:register.stateLabel')}</Form.Label>
                          <Form.Select
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.state && errors.state}
                          >
                            <option value="">{t('auth:register.selectState')}</option>
                            {indianStates.map((state) => (
                              <option key={state} value={state}>
                                {state}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            {errors.state}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('auth:register.districtLabel')}</Form.Label>
                          <Form.Control
                            type="text"
                            name="district"
                            value={values.district}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.district && errors.district}
                            placeholder={t('auth:register.districtPlaceholder')}
                            autoComplete="off"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.district}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>{t('auth:register.educationLabel')}</Form.Label>
                      <Form.Select
                        name="educationLevel"
                        value={values.educationLevel}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.educationLevel && errors.educationLevel}
                      >
                        <option value="">{t('auth:register.selectEducation')}</option>
                        {educationLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.educationLevel}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <LanguageSelector
                        value={values.languagePreference}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.languagePreference && errors.languagePreference}
                        error={errors.languagePreference}
                        required={true}
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('auth:register.passwordLabel')}</Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.password && errors.password}
                              placeholder={t('auth:register.passwordPlaceholder')}
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
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-4">
                          <Form.Label>{t('auth:register.confirmPasswordLabel')}</Form.Label>
                          <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.confirmPassword && errors.confirmPassword}
                            placeholder={t('auth:register.confirmPasswordPlaceholder')}
                            autoComplete="new-password"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

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
                          {t('auth:register.creating')}
                        </>
                      ) : (
                        t('auth:register.submitButton')
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>

              <div className="text-center">
                <p className="text-muted mb-0">
                  {t('auth:register.haveAccount')}{' '}
                  <Link to="/login" className="text-decoration-none">
                    {t('auth:register.signIn')}
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;