import React from 'react';
import { Container, Row, Col, Card, Accordion, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaQuestionCircle, 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp,
  FaIdCard,
  FaUniversity,
  FaGraduationCap,
  FaFileAlt,
  FaExclamationCircle,
  FaRobot
} from 'react-icons/fa';
import Chatbot from '../components/chatbot/Chatbot';

const Help = () => {
  const faqs = [
    {
      category: 'Aadhaar Basics',
      icon: <FaIdCard className="text-primary" />,
      questions: [
        {
          q: 'What is Aadhaar and why is it important for DBT?',
          a: 'Aadhaar is a 12-digit unique identification number issued by UIDAI. It is mandatory for Direct Benefit Transfer (DBT) to ensure scholarships are directly credited to your bank account without delays or middlemen.'
        },
        {
          q: 'How do I check if my Aadhaar is valid?',
          a: 'Visit the official UIDAI website (uidai.gov.in) and use the "Verify Aadhaar" service. You can verify using your Aadhaar number or Virtual ID.'
        },
        {
          q: 'Can I update my Aadhaar details online?',
          a: 'Yes, you can update your mobile number, email, and address online through the UIDAI portal. For other changes like name or date of birth, you need to visit an Aadhaar enrollment center.'
        }
      ]
    },
    {
      category: 'Bank Linking',
      icon: <FaUniversity className="text-success" />,
      questions: [
        {
          q: 'How do I link my Aadhaar with my bank account?',
          a: 'You can link Aadhaar with your bank account by: 1) Visiting your bank branch with Aadhaar card, 2) Using net banking, 3) Using mobile banking app, or 4) Calling customer care. Check our detailed guide in the Learning Center.'
        },
        {
          q: 'How long does Aadhaar-bank linking take?',
          a: 'The linking process is usually instant if done through bank branch or net banking. However, it may take 24-48 hours for the status to reflect in the system.'
        },
        {
          q: 'Can I link multiple bank accounts with one Aadhaar?',
          a: 'Yes, you can link your Aadhaar with multiple bank accounts. However, for DBT purposes, ensure your primary account (where you want scholarships) is properly linked.'
        }
      ]
    },
    {
      category: 'Scholarships',
      icon: <FaGraduationCap className="text-warning" />,
      questions: [
        {
          q: 'What scholarships are available for SC/ST students?',
          a: 'Pre-Matric Scholarship (Class 9-10), Post-Matric Scholarship (Class 11+), Merit-cum-Means Scholarship, and Top Class Education Scheme are major scholarships. Visit the Learning Center for complete details.'
        },
        {
          q: 'When should I apply for scholarships?',
          a: 'Applications typically open in July-August each year. Deadlines vary by state but are usually between September-November. Always check the National Scholarship Portal (NSP) for exact dates.'
        },
        {
          q: 'What documents are required for scholarship application?',
          a: 'Common documents include: Aadhaar card, caste certificate, income certificate, previous year mark sheets, bank account details, bonafide certificate, and passport-size photos.'
        }
      ]
    },
    {
      category: 'DBT (Direct Benefit Transfer)',
      icon: <FaFileAlt className="text-info" />,
      questions: [
        {
          q: 'What is DBT and how does it work?',
          a: 'DBT is a mechanism to transfer subsidies and benefits directly to beneficiary bank accounts. For scholarships, once approved, the amount is credited directly to your Aadhaar-linked bank account.'
        },
        {
          q: 'How do I check my DBT status?',
          a: 'You can check DBT status on the National Scholarship Portal (NSP) using your application ID. Also, check the "DBT Bharat" portal or the respective scholarship scheme website.'
        },
        {
          q: 'What if my DBT payment fails?',
          a: 'Payment can fail due to: incorrect bank details, Aadhaar not linked, account inactive, or name mismatch. First, verify all details are correct. If the issue persists, contact your bank and the scholarship portal helpdesk.'
        }
      ]
    },
    {
      category: 'Technical Issues',
      icon: <FaExclamationCircle className="text-danger" />,
      questions: [
        {
          q: 'I forgot my NSP login password. What should I do?',
          a: 'Click on "Forgot Password" on the NSP login page. Enter your registered mobile number or email to receive a reset link. Follow the instructions to create a new password.'
        },
        {
          q: 'My application is stuck in "Institute Verification" status',
          a: 'This means your institute needs to verify your application. Contact your college/school nodal officer or scholarship coordinator to expedite the verification process.'
        },
        {
          q: 'I cannot upload documents on the portal',
          a: 'Ensure your documents are: 1) In PDF format, 2) Less than 200KB in size, 3) Clearly scanned and readable. Try using a different browser (Chrome recommended) or clear browser cache.'
        }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: <FaPhone className="text-primary" />,
      title: 'Helpline Number',
      value: '0120-6619540',
      description: 'Mon-Fri: 10 AM - 6 PM'
    },
    {
      icon: <FaEnvelope className="text-success" />,
      title: 'Email Support',
      value: 'helpdesk@nsp.gov.in',
      description: 'Response within 48 hours'
    },
    {
      icon: <FaWhatsapp className="text-info" />,
      title: 'WhatsApp',
      value: '+91 8800-XXX-XXX',
      description: 'Quick queries only'
    }
  ];

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <FaQuestionCircle size={60} className="text-primary mb-3" />
        <h1 className="display-5 fw-bold">Help & Support Center</h1>
        <p className="lead text-muted">
          Find answers to common questions about Aadhaar, DBT, and scholarships
        </p>
      </div>

      {/* Quick Actions */}
      <Row className="g-3 mb-5">
        <Col md={4}>
          <Card className="h-100 shadow-sm hover-shadow" style={{ transition: 'all 0.3s', cursor: 'pointer' }}>
            <Card.Body className="text-center">
              <FaIdCard size={40} className="text-primary mb-3" />
              <h5>Aadhaar Guides</h5>
              <p className="text-muted small mb-3">Step-by-step guides for Aadhaar-related tasks</p>
              <Button 
                as={Link} 
                to="/learning-center/category/aadhaar-basics" 
                variant="outline-primary" 
                size="sm"
              >
                View Guides
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm hover-shadow" style={{ transition: 'all 0.3s', cursor: 'pointer' }}>
            <Card.Body className="text-center">
              <FaGraduationCap size={40} className="text-success mb-3" />
              <h5>Scholarship Info</h5>
              <p className="text-muted small mb-3">Complete information about available scholarships</p>
              <Button 
                as={Link} 
                to="/learning-center/category/scholarship-guide" 
                variant="outline-success" 
                size="sm"
              >
                Learn More
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 shadow-sm hover-shadow" style={{ transition: 'all 0.3s', cursor: 'pointer' }}>
            <Card.Body className="text-center">
              <FaFileAlt size={40} className="text-warning mb-3" />
              <h5>Troubleshooting</h5>
              <p className="text-muted small mb-3">Solutions to common problems and errors</p>
              <Button 
                as={Link} 
                to="/learning-center/category/troubleshooting" 
                variant="outline-warning" 
                size="sm"
              >
                Get Help
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Emergency Notice */}
      <Alert variant="warning" className="mb-5">
        <Alert.Heading className="d-flex align-items-center">
          <FaExclamationCircle className="me-2" />
          Important Notice
        </Alert.Heading>
        <p className="mb-0">
          Scholarship application deadline: <strong>October 31, 2025</strong>. 
          Ensure your Aadhaar is linked to your bank account before applying.
        </p>
      </Alert>

      {/* FAQs */}
      <h2 className="mb-4">
        <FaQuestionCircle className="me-2 text-primary" />
        Frequently Asked Questions
      </h2>

      {faqs.map((category, idx) => (
        <Card key={idx} className="mb-4 shadow-sm">
          <Card.Header className="bg-light">
            <h5 className="mb-0 d-flex align-items-center">
              {category.icon}
              <span className="ms-2">{category.category}</span>
            </h5>
          </Card.Header>
          <Card.Body>
            <Accordion flush>
              {category.questions.map((faq, qIdx) => (
                <Accordion.Item key={qIdx} eventKey={`${idx}-${qIdx}`}>
                  <Accordion.Header>{faq.q}</Accordion.Header>
                  <Accordion.Body className="text-muted">
                    {faq.a}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Card.Body>
        </Card>
      ))}

      {/* Contact Information */}
      <Card className="shadow-sm mt-5">
        <Card.Body className="p-4">
          <h3 className="mb-4 text-center">Still Need Help?</h3>
          <p className="text-center text-muted mb-4">
            Our support team is here to assist you with any questions or concerns
          </p>
          
          <Row className="g-4">
            {contactInfo.map((contact, idx) => (
              <Col key={idx} md={4}>
                <div className="text-center">
                  <div className="mb-3">
                    {React.cloneElement(contact.icon, { size: 40 })}
                  </div>
                  <h6 className="fw-bold">{contact.title}</h6>
                  <p className="mb-1 fw-bold text-primary">{contact.value}</p>
                  <small className="text-muted">{contact.description}</small>
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4 pt-4 border-top">
            <p className="text-muted mb-3">
              For urgent queries, please visit the nearest Aadhaar enrollment center or your institute's scholarship coordinator.
            </p>
            <Button variant="primary" href="https://scholarships.gov.in" target="_blank">
              Visit National Scholarship Portal
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* AI Chatbot Section */}
      <Card className="shadow-sm mt-5 mb-5">
        <Card.Header className="bg-gradient text-white" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <h3 className="mb-0 d-flex align-items-center">
            <FaRobot className="me-2" />
            Ask Our AI Assistant
          </h3>
          <p className="mb-0 mt-2 small">
            Get instant answers to your questions about Aadhaar, DBT, scholarships, and more!
          </p>
        </Card.Header>
        <Card.Body className="p-0">
          <Chatbot isOpen={true} embedded={true} />
        </Card.Body>
      </Card>

      {/* Additional Resources */}
      <div className="mt-5 text-center">
        <h4 className="mb-3">Additional Resources</h4>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <Button variant="outline-primary" size="sm" as={Link} to="/learning-center">
            Learning Center
          </Button>
          <Button variant="outline-success" size="sm" as={Link} to="/learning-center?tab=quizzes">
            Test Your Knowledge
          </Button>
          <Button variant="outline-info" size="sm" href="https://uidai.gov.in" target="_blank">
            UIDAI Official Website
          </Button>
          <Button variant="outline-warning" size="sm" href="https://pfms.nic.in" target="_blank">
            Check DBT Payment Status
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Help;
