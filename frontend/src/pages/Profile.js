import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Tab, Tabs, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaUser, FaLock, FaBell, FaIdCard, FaUniversity, FaSave } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth();
  const { t } = useTranslation(['profile', 'common']);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || ''
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Aadhaar Information State
  const [aadhaarInfo, setAadhaarInfo] = useState({
    aadhaarNumber: user?.aadhaarNumber || '',
    aadhaarName: user?.aadhaarName || '',
    isVerified: user?.isAadhaarVerified || false
  });

  // Bank Details State
  const [bankDetails, setBankDetails] = useState({
    bankName: user?.bankDetails?.bankName || '',
    accountNumber: user?.bankDetails?.accountNumber || '',
    ifscCode: user?.bankDetails?.ifscCode || '',
    accountHolderName: user?.bankDetails?.accountHolderName || '',
    isLinked: user?.bankDetails?.isLinked || false
  });

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleAadhaarChange = (e) => {
    setAadhaarInfo({ ...aadhaarInfo, [e.target.name]: e.target.value });
  };

  const handleBankDetailsChange = (e) => {
    setBankDetails({ ...bankDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const userData = response.data.data;
        
        // Format dateOfBirth for HTML date input (YYYY-MM-DD)
        let formattedDOB = '';
        if (userData.dateOfBirth) {
          const date = new Date(userData.dateOfBirth);
          formattedDOB = date.toISOString().split('T')[0];
        }
        
        setPersonalInfo({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || userData.phoneNumber || '',
          dateOfBirth: formattedDOB,
          gender: userData.gender || ''
        });

        setAadhaarInfo({
          aadhaarNumber: userData.aadhaarNumber || '',
          aadhaarName: userData.aadhaarName || '',
          isVerified: userData.isAadhaarVerified || false
        });

        setBankDetails({
          bankName: userData.bankDetails?.bankName || '',
          accountNumber: userData.bankDetails?.accountNumber || '',
          ifscCode: userData.bankDetails?.ifscCode || '',
          accountHolderName: userData.bankDetails?.accountHolderName || '',
          isLinked: userData.bankDetails?.isLinked || false
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowError(false);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/user/profile',
        personalInfo,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Update error:', error);
      setErrorMessage(error.response?.data?.message || t('profile:messages.error'));
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage(t('profile:password.mismatch'));
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    setLoading(true);
    setShowError(false);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/user/password',
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Password update error:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to update password');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleAadhaarSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowError(false);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/user/aadhaar',
        aadhaarInfo,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setAadhaarInfo(prev => ({
          ...prev,
          isVerified: response.data.data.isAadhaarVerified
        }));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Aadhaar update error:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to update Aadhaar details');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleBankDetailsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowError(false);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/user/bank-details',
        bankDetails,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setBankDetails(prev => ({
          ...prev,
          isLinked: response.data.data.isLinked
        }));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Bank details update error:', error);
      setErrorMessage(error.response?.data?.message || 'Failed to update bank details');
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        <Row className="mb-4">
          <Col>
            <h2>
              <FaUser className="me-2" />
              {t('profile:title')}
            </h2>
            <p className="text-muted">Manage your account information and settings</p>
          </Col>
        </Row>

        {showSuccess && (
          <Alert variant="success" dismissible onClose={() => setShowSuccess(false)}>
            ✓ {t('profile:messages.success')}
          </Alert>
        )}

        {showError && (
          <Alert variant="danger" dismissible onClose={() => setShowError(false)}>
            ✗ {errorMessage}
          </Alert>
        )}

        <Row>
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4"
                >
                  {/* Personal Information Tab */}
                  <Tab eventKey="personal" title={<span><FaUser className="me-1" /> {t('profile:tabs.personal')}</span>}>
                    <Form onSubmit={handlePersonalInfoSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>{t('profile:personal.firstName')}</Form.Label>
                            <Form.Control
                              type="text"
                              name="firstName"
                              value={personalInfo.firstName}
                              onChange={handlePersonalInfoChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="lastName"
                              value={personalInfo.lastName}
                              onChange={handlePersonalInfoChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={personalInfo.email}
                              onChange={handlePersonalInfoChange}
                              required
                              disabled
                            />
                            <Form.Text className="text-muted">
                              Email cannot be changed
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={personalInfo.phone}
                              onChange={handlePersonalInfoChange}
                              placeholder="+91 XXXXXXXXXX"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                              type="date"
                              name="dateOfBirth"
                              value={personalInfo.dateOfBirth}
                              onChange={handlePersonalInfoChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select
                              name="gender"
                              value={personalInfo.gender}
                              onChange={handlePersonalInfoChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-1" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="me-1" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </Form>
                  </Tab>

                  {/* Password Tab */}
                  <Tab eventKey="password" title={<span><FaLock className="me-1" /> Password</span>}>
                    <Form onSubmit={handlePasswordSubmit}>
                      <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                          minLength={6}
                        />
                        <Form.Text className="text-muted">
                          Password must be at least 6 characters long
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-1" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <FaSave className="me-1" />
                            Update Password
                          </>
                        )}
                      </Button>
                    </Form>
                  </Tab>

                  {/* Aadhaar Information Tab */}
                  <Tab eventKey="aadhaar" title={<span><FaIdCard className="me-1" /> Aadhaar</span>}>
                    <Form onSubmit={handleAadhaarSubmit}>
                      <Alert variant="info">
                        <strong>Important:</strong> Ensure your Aadhaar details match exactly with your official Aadhaar card.
                      </Alert>

                      <Form.Group className="mb-3">
                        <Form.Label>Aadhaar Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="aadhaarNumber"
                          value={aadhaarInfo.aadhaarNumber}
                          onChange={handleAadhaarChange}
                          placeholder="XXXX-XXXX-XXXX"
                          maxLength={12}
                        />
                        <Form.Text className="text-muted">
                          Enter 12-digit Aadhaar number without spaces
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Name as per Aadhaar</Form.Label>
                        <Form.Control
                          type="text"
                          name="aadhaarName"
                          value={aadhaarInfo.aadhaarName}
                          onChange={handleAadhaarChange}
                          placeholder="Full name as on Aadhaar card"
                        />
                      </Form.Group>

                      {aadhaarInfo.isVerified ? (
                        <Alert variant="success">
                          ✓ Your Aadhaar is verified
                        </Alert>
                      ) : (
                        <Alert variant="warning">
                          Your Aadhaar is not verified yet. Please verify to access all features.
                        </Alert>
                      )}

                      <Button variant="primary" type="submit" className="me-2" disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-1" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="me-1" />
                            Save Aadhaar Details
                          </>
                        )}
                      </Button>
                      {!aadhaarInfo.isVerified && (
                        <Button variant="success" disabled={loading}>
                          Verify Aadhaar
                        </Button>
                      )}
                    </Form>
                  </Tab>

                  {/* Bank Details Tab */}
                  <Tab eventKey="bank" title={<span><FaUniversity className="me-1" /> Bank Details</span>}>
                    <Form onSubmit={handleBankDetailsSubmit}>
                      <Alert variant="info">
                        <strong>Important:</strong> Bank details are required for DBT scholarship disbursement.
                      </Alert>

                      <Form.Group className="mb-3">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="bankName"
                          value={bankDetails.bankName}
                          onChange={handleBankDetailsChange}
                          placeholder="e.g., State Bank of India"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="accountNumber"
                          value={bankDetails.accountNumber}
                          onChange={handleBankDetailsChange}
                          placeholder="Enter your account number"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>IFSC Code</Form.Label>
                        <Form.Control
                          type="text"
                          name="ifscCode"
                          value={bankDetails.ifscCode}
                          onChange={handleBankDetailsChange}
                          placeholder="e.g., SBIN0001234"
                          maxLength={11}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Account Holder Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="accountHolderName"
                          value={bankDetails.accountHolderName}
                          onChange={handleBankDetailsChange}
                          placeholder="Name as per bank account"
                        />
                      </Form.Group>

                      {bankDetails.isLinked ? (
                        <Alert variant="success">
                          ✓ Your bank account is linked with Aadhaar
                        </Alert>
                      ) : (
                        <Alert variant="warning">
                          Your bank account is not linked with Aadhaar. Please link to receive DBT benefits.
                        </Alert>
                      )}

                      <Button variant="primary" type="submit" className="me-2" disabled={loading}>
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-1" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="me-1" />
                            Save Bank Details
                          </>
                        )}
                      </Button>
                      {!bankDetails.isLinked && (
                        <Button variant="success" disabled={loading}>
                          Link with Aadhaar
                        </Button>
                      )}
                    </Form>
                  </Tab>

                  {/* Notifications Tab */}
                  <Tab eventKey="notifications" title={<span><FaBell className="me-1" /> Notifications</span>}>
                    <h5 className="mb-3">Email Notifications</h5>
                    <Form>
                      <Form.Check
                        type="switch"
                        id="email-updates"
                        label="Receive email updates about new articles"
                        className="mb-3"
                        defaultChecked
                      />
                      <Form.Check
                        type="switch"
                        id="scholarship-alerts"
                        label="Get alerts about scholarship deadlines"
                        className="mb-3"
                        defaultChecked
                      />
                      <Form.Check
                        type="switch"
                        id="application-status"
                        label="Application status updates"
                        className="mb-3"
                        defaultChecked
                      />
                      <Form.Check
                        type="switch"
                        id="course-completion"
                        label="Course completion notifications"
                        className="mb-3"
                        defaultChecked
                      />

                      <hr className="my-4" />

                      <h5 className="mb-3">SMS Notifications</h5>
                      <Form.Check
                        type="switch"
                        id="sms-alerts"
                        label="Receive important alerts via SMS"
                        className="mb-3"
                      />

                      <Button variant="primary" className="mt-3">
                        <FaSave className="me-1" />
                        Save Preferences
                      </Button>
                    </Form>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <Button variant="secondary" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
