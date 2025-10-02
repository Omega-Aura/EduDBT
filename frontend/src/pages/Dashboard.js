import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, ListGroup, ProgressBar, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FaBook, FaUser, FaCheckCircle, FaClock, FaAward, FaChartLine, FaGraduationCap, FaUniversity, FaIdCard, FaExclamationTriangle, FaBell, FaEdit } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useTranslation(['dashboard', 'common']);
  const [stats, setStats] = useState({ articlesRead: 0, coursesCompleted: 0, certificatesEarned: 0, totalProgress: 0 });
  const [quizStats, setQuizStats] = useState({ totalAttempts: 0, quizzesPassed: 0, averageScore: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadDashboardData(); }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      
      if (token) {
        try {
          // Load user stats
          const statsRes = await axios.get(`${API_BASE_URL}/user/stats`, { 
            headers: { Authorization: `Bearer ${token}` } 
          });
          if (statsRes.data.success) {
            setStats(statsRes.data.data);
          }

          // Load quiz stats
          const quizRes = await axios.get(`${API_BASE_URL}/quizzes/attempts/my-attempts`, { 
            headers: { Authorization: `Bearer ${token}` } 
          });
          if (quizRes.data.success) {
            const attempts = quizRes.data.data.attempts.filter(a => a.status === 'completed');
            const passed = attempts.filter(a => a.passed).length;
            const avgScore = attempts.length > 0 ? attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length : 0;
            setQuizStats({ totalAttempts: attempts.length, quizzesPassed: passed, averageScore: avgScore });
          }
        } catch (err) { 
          console.error('Failed to load dashboard data:', err);
          // Keep default zero stats on error
        }
      }
      setLoading(false);
    } catch (error) { console.error('Error:', error); setLoading(false); }
  };

  const userChecklist = [
    { id: 1, text: t('dashboard:progressChecklist.completeProfile'), completed: !!user?.firstName && !!user?.dateOfBirth && !!user?.gender, link: '/profile' },
    { id: 2, text: t('dashboard:progressChecklist.linkAadhaar'), completed: !!user?.aadhaarNumber, link: '/profile?tab=aadhaar' },
    { id: 3, text: t('dashboard:progressChecklist.addBankDetails'), completed: !!user?.bankDetails?.accountNumber, link: '/profile?tab=bank' },
    { id: 4, text: t('dashboard:progressChecklist.readDBTGuide'), completed: stats.articlesRead >= 3, link: '/learning-center/category/dbt-info' },
    { id: 5, text: t('dashboard:progressChecklist.takeQuiz'), completed: quizStats.totalAttempts > 0, link: '/learning-center?tab=quizzes' }
  ];

  const completedTasks = userChecklist.filter(item => item.completed).length;
  const actualProgress = Math.round((completedTasks / userChecklist.length) * 100);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">{t('dashboard:loading')}</span></div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="mb-4">
        <h2>{t('dashboard:welcome', { name: user?.profile?.firstName || user?.username || 'Student' })}</h2>
        <p className="text-muted">{t('dashboard:subtitle')}</p>
      </div>
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} md={3}><Card className="border-0 shadow-sm h-100"><Card.Body className="text-center"><FaBook size={30} className="text-primary mb-2" /><h3>{stats.articlesRead}</h3><p className="text-muted mb-0 small">{t('dashboard:statistics.articlesRead')}</p></Card.Body></Card></Col>
        <Col xs={12} sm={6} md={3}><Card className="border-0 shadow-sm h-100"><Card.Body className="text-center"><FaGraduationCap size={30} className="text-success mb-2" /><h3>{quizStats.quizzesPassed}</h3><p className="text-muted mb-0 small">{t('dashboard:statistics.coursesCompleted')}</p></Card.Body></Card></Col>
        <Col xs={12} sm={6} md={3}><Card className="border-0 shadow-sm h-100"><Card.Body className="text-center"><FaAward size={30} className="text-warning mb-2" /><h3>{stats.certificatesEarned}</h3><p className="text-muted mb-0 small">{t('dashboard:statistics.certificatesEarned')}</p></Card.Body></Card></Col>
        <Col xs={12} sm={6} md={3}><Card className="border-0 shadow-sm h-100"><Card.Body className="text-center"><FaChartLine size={30} className="text-info mb-2" /><h3>{actualProgress}%</h3><p className="text-muted mb-0 small">{t('dashboard:statistics.overallProgress')}</p></Card.Body></Card></Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4"><Card.Body><h5><FaClock className="me-2" />{t('dashboard:quickActions.title')}</h5><Row className="g-2"><Col xs={12} sm={6}><Button variant="outline-primary" className="w-100" as={Link} to="/learning-center"><FaBook className="me-2" />{t('dashboard:quickActions.browseMaterials')}</Button></Col><Col xs={12} sm={6}><Button variant="outline-success" className="w-100" as={Link} to="/learning-center?tab=quizzes"><FaGraduationCap className="me-2" />{t('dashboard:quickActions.takeQuiz')}</Button></Col><Col xs={12} sm={6}><Button variant="outline-info" className="w-100" as={Link} to="/profile"><FaUser className="me-2" />{t('dashboard:quickActions.updateProfile')}</Button></Col><Col xs={12} sm={6}><Button variant="outline-warning" className="w-100" as={Link} to="/learning-center/category/dbt-info"><FaIdCard className="me-2" />{t('dashboard:quickActions.checkDBT')}</Button></Col></Row></Card.Body></Card>
          {quizStats.totalAttempts > 0 && (<Card className="border-0 shadow-sm mb-4"><Card.Body><div className="d-flex justify-content-between align-items-center mb-3"><h5 className="mb-0"><FaAward className="me-2 text-warning" />{t('dashboard:quizPerformance.title')}</h5><Button variant="link" size="sm" as={Link} to="/learning-center?tab=quizzes">{t('dashboard:quizPerformance.viewAll')}</Button></div><Row><Col xs={4} className="text-center"><div className="p-3 bg-light rounded"><h4 className="text-primary mb-0">{quizStats.totalAttempts}</h4><small className="text-muted">{t('dashboard:quizPerformance.completed')}</small></div></Col><Col xs={4} className="text-center"><div className="p-3 bg-light rounded"><h4 className="text-success mb-0">{quizStats.quizzesPassed}</h4><small className="text-muted">{t('dashboard:quizPerformance.passed')}</small></div></Col><Col xs={4} className="text-center"><div className="p-3 bg-light rounded"><h4 className="text-info mb-0">{quizStats.averageScore.toFixed(1)}%</h4><small className="text-muted">{t('dashboard:quizPerformance.avgScore')}</small></div></Col></Row>{quizStats.averageScore >= 80 && <Alert variant="success" className="mb-0 mt-2">{t('dashboard:quizPerformance.excellent')}</Alert>}</Card.Body></Card>)}
          <Card className="border-0 shadow-sm mb-4"><Card.Body><div className="d-flex justify-content-between mb-3"><h5 className="mb-0"><FaCheckCircle className="me-2 text-success" />{t('dashboard:progressChecklist.title')}</h5><Badge bg="primary">{completedTasks}/{userChecklist.length}</Badge></div><ProgressBar now={(completedTasks / userChecklist.length) * 100} className="mb-3" style={{ height: '8px' }} /><ListGroup variant="flush">{userChecklist.map(item => (<ListGroup.Item key={item.id} className="px-0 d-flex justify-content-between align-items-center"><div className="d-flex align-items-center">{item.completed ? <FaCheckCircle className="text-success me-2" /> : <div className="me-2" style={{ width: '16px', height: '16px', border: '2px solid #ccc', borderRadius: '50%' }} />}<span className={item.completed ? 'text-decoration-line-through text-muted' : ''}>{item.text}</span></div>{!item.completed && <Button variant="link" size="sm" as={Link} to={item.link}>{t('dashboard:progressChecklist.complete')}</Button>}</ListGroup.Item>))}</ListGroup></Card.Body></Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4"><Card.Body><div className="text-center mb-3"><FaUser size={50} className="text-primary mb-2" /><h6>{user?.firstName || user?.username}</h6><small className="text-muted">{user?.email}</small></div><div className="mb-3"><div className="d-flex justify-content-between mb-1"><small>{t('dashboard:profileCard.profileCompletion')}</small><small className="text-primary">{actualProgress}%</small></div><ProgressBar now={actualProgress} style={{ height: '6px' }} /></div><Button variant="primary" size="sm" className="w-100" as={Link} to="/profile"><FaEdit className="me-2" />{t('dashboard:profileCard.editProfile')}</Button></Card.Body></Card>
          <Card className="border-0 shadow-sm mb-4 border-start border-warning border-4"><Card.Body><h6><FaBell className="me-2 text-warning" />{t('dashboard:notices.title')}</h6><Alert variant="warning" className="mb-2 py-2 small"><FaExclamationTriangle className="me-2" />{t('dashboard:notices.scholarshipDeadline')}</Alert><Alert variant="info" className="mb-2 py-2 small"><FaIdCard className="me-2" />{t('dashboard:notices.aadhaarLinking')}</Alert><Alert variant="success" className="mb-0 py-2 small"><FaUniversity className="me-2" />{t('dashboard:notices.bankGuide')}</Alert></Card.Body></Card>
          <Card className="border-0 shadow-sm bg-primary text-white"><Card.Body><h6 className="mb-2">{t('dashboard:helpCard.title')}</h6><p className="small mb-3">{t('dashboard:helpCard.subtitle')}</p><Button variant="light" size="sm" className="w-100">{t('dashboard:helpCard.contactSupport')}</Button></Card.Body></Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
