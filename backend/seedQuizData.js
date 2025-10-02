const mongoose = require('mongoose');
const Quiz = require('./src/models/Quiz');
const Question = require('./src/models/Question');
const QuizAttempt = require('./src/models/QuizAttempt');
const User = require('./src/models/User');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const quizzesData = [
  {
    title: 'Troubleshooting Common Aadhaar and DBT Issues - Quiz',
    description: 'Test your understanding of common Aadhaar and DBT problems and their solutions',
    category: 'troubleshooting',
    difficulty: 'intermediate',
    passingScore: 60,
    timeLimit: 15,
    totalQuestions: 12,
    totalMarks: 12,
    attemptsAllowed: 3,
    instructions: [
      'Read each question carefully before answering',
      'You have 15 minutes to complete this quiz',
      'Each question carries 1 mark',
      'You need to score 60% or above to pass',
      'You can attempt this quiz up to 3 times'
    ],
    questions: [
      {
        questionText: 'What is the first step you should take if your Aadhaar authentication fails?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Visit the nearest Aadhaar enrollment center', isCorrect: false },
          { text: 'Check your biometric data and ensure clean fingers', isCorrect: true },
          { text: 'Call UIDAI helpline immediately', isCorrect: false },
          { text: 'Request a new Aadhaar card', isCorrect: false }
        ],
        marks: 1,
        explanation: 'The first step is always to ensure your biometrics (fingerprints) are clean and dry. Most authentication failures occur due to poor quality fingerprints.',
        order: 1,
        difficulty: 'easy',
        tags: ['authentication', 'biometric', 'troubleshooting']
      },
      {
        questionText: 'What should you do if your bank account is not linked to DBT despite linking Aadhaar?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Wait for 6 months', isCorrect: false },
          { text: 'Visit your bank and verify the Aadhaar-bank linkage with DBT seeding', isCorrect: true },
          { text: 'Open a new bank account', isCorrect: false },
          { text: 'Contact scholarship portal directly', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Simply linking Aadhaar to your bank account is not enough. You must ensure DBT seeding is done, which can be verified at your bank branch.',
        order: 2,
        difficulty: 'medium',
        tags: ['bank-linking', 'dbt', 'troubleshooting']
      },
      {
        questionText: 'If your Aadhaar address is outdated, what is the easiest way to update it?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Visit Aadhaar enrollment center with address proof', isCorrect: false },
          { text: 'Use online Aadhaar update portal with supporting documents', isCorrect: true },
          { text: 'Send documents via post to UIDAI', isCorrect: false },
          { text: 'Call UIDAI helpline to update', isCorrect: false }
        ],
        marks: 1,
        explanation: 'The easiest and fastest way is to use the online Aadhaar update portal at uidai.gov.in where you can upload supporting documents and update your address.',
        order: 3,
        difficulty: 'easy',
        tags: ['address-update', 'online-services']
      },
      {
        questionText: 'What is the typical processing time for Aadhaar updates?',
        questionType: 'multiple-choice',
        options: [
          { text: '1-2 days', isCorrect: false },
          { text: '7-10 days', isCorrect: true },
          { text: '30 days', isCorrect: false },
          { text: '3 months', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Aadhaar updates typically take 7-10 days to reflect in the system after submission.',
        order: 4,
        difficulty: 'easy',
        tags: ['processing-time', 'updates']
      },
      {
        questionText: 'If you receive an "Aadhaar not seeded" error during scholarship application, what does this mean?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Your Aadhaar is invalid', isCorrect: false },
          { text: 'Your Aadhaar is not linked with your bank account for DBT', isCorrect: true },
          { text: 'Your bank account is closed', isCorrect: false },
          { text: 'You are not eligible for scholarship', isCorrect: false }
        ],
        marks: 1,
        explanation: '"Aadhaar not seeded" means your Aadhaar number is not properly linked with your bank account for Direct Benefit Transfer. You need to visit your bank to complete DBT seeding.',
        order: 5,
        difficulty: 'medium',
        tags: ['dbt-seeding', 'error-messages']
      },
      {
        questionText: 'DBT seeding must be done even after linking Aadhaar to bank account.',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ],
        marks: 1,
        explanation: 'True. Linking Aadhaar to bank account and DBT seeding are two different processes. Both must be completed for scholarship payments to work.',
        order: 6,
        difficulty: 'medium',
        tags: ['dbt-seeding', 'bank-linking']
      },
      {
        questionText: 'What should you do if your mobile number is not updated in Aadhaar?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Visit Aadhaar enrollment center with mobile number proof', isCorrect: false },
          { text: 'Use Aadhaar OTP-based mobile update service at enrollment center', isCorrect: true },
          { text: 'File a complaint online', isCorrect: false },
          { text: 'Wait for automatic update', isCorrect: false }
        ],
        marks: 1,
        explanation: 'You can update your mobile number by visiting an Aadhaar enrollment center with your Aadhaar card and using the OTP-based mobile update service.',
        order: 7,
        difficulty: 'easy',
        tags: ['mobile-update', 'enrollment-center']
      },
      {
        questionText: 'How can you verify if your Aadhaar-bank linkage is successful?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Check passbook', isCorrect: false },
          { text: 'Visit bank and request verification or check through net banking', isCorrect: true },
          { text: 'Call UIDAI helpline', isCorrect: false },
          { text: 'Wait for SMS confirmation', isCorrect: false }
        ],
        marks: 1,
        explanation: 'You can verify Aadhaar-bank linkage by visiting your bank branch or checking through net banking where you can see if Aadhaar is linked to your account.',
        order: 8,
        difficulty: 'medium',
        tags: ['verification', 'bank-linking']
      },
      {
        questionText: 'What is the UIDAI toll-free helpline number?',
        questionType: 'multiple-choice',
        options: [
          { text: '1800-300-1947', isCorrect: true },
          { text: '1800-180-1551', isCorrect: false },
          { text: '1800-111-999', isCorrect: false },
          { text: '1800-425-3800', isCorrect: false }
        ],
        marks: 1,
        explanation: 'The UIDAI toll-free helpline number is 1800-300-1947, available for Aadhaar-related queries and support.',
        order: 9,
        difficulty: 'easy',
        tags: ['helpline', 'support']
      },
      {
        questionText: 'If biometric authentication fails repeatedly, what alternative can be used?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Password authentication', isCorrect: false },
          { text: 'OTP-based authentication', isCorrect: true },
          { text: 'Email verification', isCorrect: false },
          { text: 'Signature verification', isCorrect: false }
        ],
        marks: 1,
        explanation: 'If biometric authentication fails repeatedly, you can use OTP-based authentication where an OTP is sent to your registered mobile number.',
        order: 10,
        difficulty: 'medium',
        tags: ['authentication', 'otp', 'biometric']
      },
      {
        questionText: 'Aadhaar updates can only be done offline at enrollment centers.',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true }
        ],
        marks: 1,
        explanation: 'False. Many Aadhaar updates like address, mobile number, and email can now be done online through the UIDAI portal.',
        order: 11,
        difficulty: 'easy',
        tags: ['online-services', 'updates']
      },
      {
        questionText: 'What document do you need to carry when visiting the bank for DBT seeding?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Only Aadhaar card', isCorrect: false },
          { text: 'Aadhaar card and passbook', isCorrect: true },
          { text: 'Only passbook', isCorrect: false },
          { text: 'Income certificate', isCorrect: false }
        ],
        marks: 1,
        explanation: 'You should carry both your Aadhaar card and bank passbook when visiting the bank for DBT seeding to verify both account and Aadhaar details.',
        order: 12,
        difficulty: 'easy',
        tags: ['dbt-seeding', 'documents']
      }
    ]
  },
  {
    title: 'Understanding Aadhaar Basics - Quiz',
    description: 'Test your knowledge about Aadhaar card fundamentals, enrollment process, and essential documents',
    category: 'aadhaar-basics',
    difficulty: 'beginner',
    passingScore: 60,
    timeLimit: 12,
    totalQuestions: 10,
    totalMarks: 10,
    attemptsAllowed: 3,
    instructions: [
      'Read each question carefully before answering',
      'You have 12 minutes to complete this quiz',
      'Each question carries 1 mark',
      'You need to score 60% or above to pass',
      'You can attempt this quiz up to 3 times'
    ],
    questions: [
      {
        questionText: 'What does UIDAI stand for?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Unique Identification Authority of India', isCorrect: true },
          { text: 'Universal Identity Authority of India', isCorrect: false },
          { text: 'Unified Indian Digital Authentication Institute', isCorrect: false },
          { text: 'Universal Identity Development Authority of India', isCorrect: false }
        ],
        marks: 1,
        explanation: 'UIDAI stands for Unique Identification Authority of India, which is the government body responsible for issuing Aadhaar numbers.',
        order: 1,
        difficulty: 'easy',
        tags: ['uidai', 'basics']
      },
      {
        questionText: 'How many digits does an Aadhaar number contain?',
        questionType: 'multiple-choice',
        options: [
          { text: '10 digits', isCorrect: false },
          { text: '12 digits', isCorrect: true },
          { text: '14 digits', isCorrect: false },
          { text: '16 digits', isCorrect: false }
        ],
        marks: 1,
        explanation: 'An Aadhaar number is a unique 12-digit identification number issued by UIDAI to residents of India.',
        order: 2,
        difficulty: 'easy',
        tags: ['aadhaar-number', 'basics']
      },
      {
        questionText: 'Aadhaar enrollment is mandatory for all Indian citizens.',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true }
        ],
        marks: 1,
        explanation: 'False. While Aadhaar is widely used, it is not legally mandatory for all citizens, though it is required for many government schemes and services.',
        order: 3,
        difficulty: 'medium',
        tags: ['enrollment', 'legal']
      },
      {
        questionText: 'Which of the following biometric data is NOT collected during Aadhaar enrollment?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Fingerprints', isCorrect: false },
          { text: 'Iris scan', isCorrect: false },
          { text: 'Facial photograph', isCorrect: false },
          { text: 'Voice recognition', isCorrect: true }
        ],
        marks: 1,
        explanation: 'Voice recognition is not collected during Aadhaar enrollment. UIDAI collects fingerprints, iris scans, and facial photographs.',
        order: 4,
        difficulty: 'easy',
        tags: ['biometric', 'enrollment']
      },
      {
        questionText: 'What is the minimum age for Aadhaar enrollment?',
        questionType: 'multiple-choice',
        options: [
          { text: 'No minimum age', isCorrect: true },
          { text: '5 years', isCorrect: false },
          { text: '10 years', isCorrect: false },
          { text: '18 years', isCorrect: false }
        ],
        marks: 1,
        explanation: 'There is no minimum age for Aadhaar enrollment. Even newborn babies can be enrolled for Aadhaar.',
        order: 5,
        difficulty: 'easy',
        tags: ['enrollment', 'age-requirement']
      },
      {
        questionText: 'Which document is mandatory for Aadhaar enrollment?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Voter ID card', isCorrect: false },
          { text: 'Proof of Identity (PoI)', isCorrect: true },
          { text: 'Driving license', isCorrect: false },
          { text: 'PAN card', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Proof of Identity (PoI) is mandatory for Aadhaar enrollment. This can be satisfied by various documents like voter ID, passport, driving license, etc.',
        order: 6,
        difficulty: 'medium',
        tags: ['documents', 'poi']
      },
      {
        questionText: 'Can you update your Aadhaar details after enrollment?',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ],
        marks: 1,
        explanation: 'True. You can update your Aadhaar details like name, address, date of birth, mobile number, etc., both online and offline.',
        order: 7,
        difficulty: 'easy',
        tags: ['updates', 'enrollment']
      },
      {
        questionText: 'What is e-Aadhaar?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Electronic version of Aadhaar available for download', isCorrect: true },
          { text: 'Email notification about Aadhaar', isCorrect: false },
          { text: 'Online Aadhaar update service', isCorrect: false },
          { text: 'Aadhaar card with electronic chip', isCorrect: false }
        ],
        marks: 1,
        explanation: 'e-Aadhaar is a digitally signed electronic copy of your Aadhaar card that can be downloaded from the UIDAI website and is legally valid.',
        order: 8,
        difficulty: 'easy',
        tags: ['e-aadhaar', 'digital-services']
      },
      {
        questionText: 'How long does it typically take to receive your Aadhaar number after enrollment?',
        questionType: 'multiple-choice',
        options: [
          { text: '1-2 days', isCorrect: false },
          { text: '15-30 days', isCorrect: false },
          { text: '60-90 days', isCorrect: true },
          { text: '6 months', isCorrect: false }
        ],
        marks: 1,
        explanation: 'After enrollment, it typically takes 60-90 days to receive your physical Aadhaar card by post. However, you can download e-Aadhaar once your enrollment is processed.',
        order: 9,
        difficulty: 'medium',
        tags: ['processing-time', 'enrollment']
      },
      {
        questionText: 'Aadhaar can be used as proof of citizenship.',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true }
        ],
        marks: 1,
        explanation: 'False. Aadhaar is NOT proof of citizenship. It is merely a proof of residence and identity in India.',
        order: 10,
        difficulty: 'medium',
        tags: ['legal', 'citizenship']
      }
    ]
  },
  {
    title: 'DBT Information and Scholarship Process - Quiz',
    description: 'Test your understanding of Direct Benefit Transfer (DBT) system and scholarship application process',
    category: 'dbt-info',
    difficulty: 'intermediate',
    passingScore: 60,
    timeLimit: 15,
    totalQuestions: 12,
    totalMarks: 12,
    attemptsAllowed: 3,
    instructions: [
      'Read each question carefully before answering',
      'You have 15 minutes to complete this quiz',
      'Each question carries 1 mark',
      'You need to score 60% or above to pass',
      'You can attempt this quiz up to 3 times'
    ],
    questions: [
      {
        questionText: 'What does DBT stand for?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Digital Banking Transfer', isCorrect: false },
          { text: 'Direct Benefit Transfer', isCorrect: true },
          { text: 'Direct Banking Transaction', isCorrect: false },
          { text: 'Digital Benefit Transaction', isCorrect: false }
        ],
        marks: 1,
        explanation: 'DBT stands for Direct Benefit Transfer, a system that enables direct transfer of government subsidies and benefits to citizens\' bank accounts.',
        order: 1,
        difficulty: 'easy',
        tags: ['dbt', 'basics']
      },
      {
        questionText: 'Which ministry oversees the National Scholarship Portal (NSP)?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Ministry of Education', isCorrect: false },
          { text: 'Ministry of Social Justice and Empowerment', isCorrect: true },
          { text: 'Ministry of Finance', isCorrect: false },
          { text: 'Ministry of Electronics and Information Technology', isCorrect: false }
        ],
        marks: 1,
        explanation: 'The National Scholarship Portal is overseen by the Ministry of Social Justice and Empowerment, though multiple ministries offer scholarships through it.',
        order: 2,
        difficulty: 'medium',
        tags: ['nsp', 'scholarship']
      },
      {
        questionText: 'DBT seeding requires both Aadhaar and bank account linkage.',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ],
        marks: 1,
        explanation: 'True. DBT seeding requires your Aadhaar number to be linked with your bank account so that benefits can be transferred directly.',
        order: 3,
        difficulty: 'easy',
        tags: ['dbt-seeding', 'bank-linking']
      },
      {
        questionText: 'What is the primary benefit of DBT for scholarship disbursement?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Faster processing', isCorrect: false },
          { text: 'Eliminates intermediaries and reduces corruption', isCorrect: true },
          { text: 'Lower bank charges', isCorrect: false },
          { text: 'Automatic eligibility verification', isCorrect: false }
        ],
        marks: 1,
        explanation: 'The primary benefit of DBT is that it eliminates intermediaries, ensures direct transfer to beneficiaries, and reduces corruption and leakage in the system.',
        order: 4,
        difficulty: 'medium',
        tags: ['dbt-benefits', 'transparency']
      },
      {
        questionText: 'Which portal is used for most central government scholarships?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Scholarships.gov.in (NSP)', isCorrect: true },
          { text: 'India.gov.in', isCorrect: false },
          { text: 'Uidai.gov.in', isCorrect: false },
          { text: 'Mygov.in', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Scholarships.gov.in, also known as the National Scholarship Portal (NSP), is the unified portal for most central government scholarships.',
        order: 5,
        difficulty: 'easy',
        tags: ['nsp', 'portal']
      },
      {
        questionText: 'When do most scholarship applications typically open?',
        questionType: 'multiple-choice',
        options: [
          { text: 'January-March', isCorrect: false },
          { text: 'July-October', isCorrect: true },
          { text: 'Throughout the year', isCorrect: false },
          { text: 'November-December', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Most scholarship applications on NSP typically open between July and October each year for the current academic session.',
        order: 6,
        difficulty: 'medium',
        tags: ['timeline', 'application']
      },
      {
        questionText: 'You can apply for multiple scholarships on NSP.',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ],
        marks: 1,
        explanation: 'True. Students can apply for multiple scholarships on NSP if they meet the eligibility criteria for each scheme.',
        order: 7,
        difficulty: 'easy',
        tags: ['nsp', 'multiple-applications']
      },
      {
        questionText: 'What is the first step in enabling DBT for scholarships?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Apply for scholarship first', isCorrect: false },
          { text: 'Link Aadhaar with bank account', isCorrect: true },
          { text: 'Register on NSP', isCorrect: false },
          { text: 'Upload documents', isCorrect: false }
        ],
        marks: 1,
        explanation: 'The first step is to ensure your Aadhaar is linked with your bank account. Without this, DBT cannot be enabled for scholarship payments.',
        order: 8,
        difficulty: 'medium',
        tags: ['dbt-process', 'bank-linking']
      },
      {
        questionText: 'Which type of bank account is recommended for DBT?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Fixed deposit account', isCorrect: false },
          { text: 'Savings account', isCorrect: true },
          { text: 'Current account', isCorrect: false },
          { text: 'Any type of account', isCorrect: false }
        ],
        marks: 1,
        explanation: 'A savings account is recommended for DBT as it is the most common type and is specifically designed for receiving payments and benefits.',
        order: 9,
        difficulty: 'easy',
        tags: ['bank-account', 'account-type']
      },
      {
        questionText: 'How can you check your DBT status?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Visit UIDAI website', isCorrect: false },
          { text: 'Check pfms.nic.in or scholarship portal', isCorrect: true },
          { text: 'Call bank helpline', isCorrect: false },
          { text: 'Visit nearest enrollment center', isCorrect: false }
        ],
        marks: 1,
        explanation: 'You can check your DBT status on the PFMS (Public Financial Management System) portal at pfms.nic.in or through the scholarship portal you applied on.',
        order: 10,
        difficulty: 'medium',
        tags: ['verification', 'pfms']
      },
      {
        questionText: 'DBT eliminates the need for caste certificates in scholarship applications.',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true }
        ],
        marks: 1,
        explanation: 'False. DBT only handles the payment transfer mechanism. All required documents including caste certificates are still needed for eligibility verification.',
        order: 11,
        difficulty: 'medium',
        tags: ['documents', 'eligibility']
      },
      {
        questionText: 'What happens if your bank account is not DBT-enabled when scholarship is sanctioned?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Payment will be automatically enabled', isCorrect: false },
          { text: 'Payment will fail and you need to enable DBT', isCorrect: true },
          { text: 'Payment will be sent by cheque', isCorrect: false },
          { text: 'Scholarship will be cancelled', isCorrect: false }
        ],
        marks: 1,
        explanation: 'If your account is not DBT-enabled, the payment will fail. You will need to enable DBT at your bank and then the payment can be reprocessed.',
        order: 12,
        difficulty: 'medium',
        tags: ['payment-failure', 'dbt-enabling']
      }
    ]
  },
  {
    title: 'Bank Linking and Account Management - Quiz',
    description: 'Test your knowledge about linking Aadhaar with bank accounts and managing DBT-enabled accounts',
    category: 'bank-linking',
    difficulty: 'intermediate',
    passingScore: 60,
    timeLimit: 15,
    totalQuestions: 12,
    totalMarks: 12,
    attemptsAllowed: 3,
    instructions: [
      'Read each question carefully before answering',
      'You have 15 minutes to complete this quiz',
      'Each question carries 1 mark',
      'You need to score 60% or above to pass',
      'You can attempt this quiz up to 3 times'
    ],
    questions: [
      {
        questionText: 'Can you link multiple bank accounts to one Aadhaar number?',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ],
        marks: 1,
        explanation: 'True. You can link multiple bank accounts to one Aadhaar number, though only one can be designated as the primary account for DBT.',
        order: 1,
        difficulty: 'medium',
        tags: ['multiple-accounts', 'bank-linking']
      },
      {
        questionText: 'Which form is typically used for Aadhaar-bank account linking?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Form 60', isCorrect: false },
          { text: 'KYC form with Aadhaar details', isCorrect: true },
          { text: 'PAN form', isCorrect: false },
          { text: 'Account opening form', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Banks use a KYC (Know Your Customer) form where you provide your Aadhaar details to link it with your bank account.',
        order: 2,
        difficulty: 'easy',
        tags: ['kyc', 'forms']
      },
      {
        questionText: 'What is the deadline set by RBI for linking Aadhaar with bank accounts?',
        questionType: 'multiple-choice',
        options: [
          { text: 'December 31, 2022', isCorrect: false },
          { text: 'March 31, 2023', isCorrect: false },
          { text: 'No fixed deadline currently', isCorrect: true },
          { text: 'December 31, 2023', isCorrect: false }
        ],
        marks: 1,
        explanation: 'As of now, there is no fixed deadline for linking Aadhaar with bank accounts, but it is mandatory for receiving government benefits through DBT.',
        order: 3,
        difficulty: 'medium',
        tags: ['deadline', 'rbi']
      },
      {
        questionText: 'Can you link Aadhaar to your bank account online?',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ],
        marks: 1,
        explanation: 'True. Most banks now allow you to link Aadhaar with your bank account online through net banking or mobile banking.',
        order: 4,
        difficulty: 'easy',
        tags: ['online-services', 'net-banking']
      },
      {
        questionText: 'What documents do you need to carry when visiting bank for Aadhaar linking?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Only Aadhaar card', isCorrect: false },
          { text: 'Aadhaar card and bank passbook', isCorrect: true },
          { text: 'Only passbook', isCorrect: false },
          { text: 'PAN card and Aadhaar card', isCorrect: false }
        ],
        marks: 1,
        explanation: 'You should carry both your Aadhaar card and bank passbook when visiting the bank for Aadhaar linking to verify both documents.',
        order: 5,
        difficulty: 'easy',
        tags: ['documents', 'bank-visit']
      },
      {
        questionText: 'What is NPR seeding in bank accounts?',
        questionType: 'multiple-choice',
        options: [
          { text: 'National Population Register seeding', isCorrect: true },
          { text: 'National Payment Register seeding', isCorrect: false },
          { text: 'New Payment Rules seeding', isCorrect: false },
          { text: 'Net Payment Registration', isCorrect: false }
        ],
        marks: 1,
        explanation: 'NPR seeding refers to National Population Register seeding, which links your NPR data with your bank account, similar to Aadhaar seeding.',
        order: 6,
        difficulty: 'hard',
        tags: ['npr', 'seeding']
      },
      {
        questionText: 'DBT seeding is automatically done when you link Aadhaar to bank account.',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true }
        ],
        marks: 1,
        explanation: 'False. DBT seeding is a separate process that must be explicitly done at the bank, even after linking Aadhaar.',
        order: 7,
        difficulty: 'medium',
        tags: ['dbt-seeding', 'common-misconception']
      },
      {
        questionText: 'How can you verify if Aadhaar is linked to your bank account?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Check bank statement', isCorrect: false },
          { text: 'Use net banking or visit bank branch', isCorrect: true },
          { text: 'Call UIDAI helpline', isCorrect: false },
          { text: 'Check Aadhaar card', isCorrect: false }
        ],
        marks: 1,
        explanation: 'You can verify Aadhaar-bank linkage through net banking (in account details section) or by visiting your bank branch and asking them to check.',
        order: 8,
        difficulty: 'easy',
        tags: ['verification', 'net-banking']
      },
      {
        questionText: 'What is NPCI Mapper?',
        questionType: 'multiple-choice',
        options: [
          { text: 'A service to link Aadhaar with bank for DBT', isCorrect: true },
          { text: 'A bank branch locator', isCorrect: false },
          { text: 'An online payment gateway', isCorrect: false },
          { text: 'A government scholarship portal', isCorrect: false }
        ],
        marks: 1,
        explanation: 'NPCI Mapper is a service by National Payments Corporation of India that helps in Aadhaar-bank account mapping for DBT purposes.',
        order: 9,
        difficulty: 'hard',
        tags: ['npci', 'technical']
      },
      {
        questionText: 'Can post office savings accounts be used for DBT?',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ],
        marks: 1,
        explanation: 'True. Post office savings accounts can be linked with Aadhaar and used for receiving DBT payments.',
        order: 10,
        difficulty: 'medium',
        tags: ['post-office', 'account-types']
      },
      {
        questionText: 'What should you do if your bank rejects Aadhaar linking?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Open new account in different bank', isCorrect: false },
          { text: 'Verify Aadhaar details match bank records, update if needed', isCorrect: true },
          { text: 'Forget about DBT', isCorrect: false },
          { text: 'Apply for new Aadhaar', isCorrect: false }
        ],
        marks: 1,
        explanation: 'If linking is rejected, it\'s usually due to name mismatch or incorrect details. Verify that your Aadhaar details match your bank records and update if necessary.',
        order: 11,
        difficulty: 'medium',
        tags: ['troubleshooting', 'rejection']
      },
      {
        questionText: 'Which of these is NOT required for DBT seeding at bank?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Aadhaar card', isCorrect: false },
          { text: 'Bank account number', isCorrect: false },
          { text: 'PAN card', isCorrect: true },
          { text: 'Passbook', isCorrect: false }
        ],
        marks: 1,
        explanation: 'PAN card is not required for DBT seeding. You only need your Aadhaar card, account number, and passbook.',
        order: 12,
        difficulty: 'easy',
        tags: ['documents', 'requirements']
      }
    ]
  },
  {
    title: 'Pre-Matric and Post-Matric Scholarship Schemes - Quiz',
    description: 'Test your understanding of various scholarship schemes available for students',
    category: 'scholarship-guide',
    difficulty: 'advanced',
    passingScore: 60,
    timeLimit: 20,
    totalQuestions: 15,
    totalMarks: 15,
    attemptsAllowed: 3,
    instructions: [
      'Read each question carefully before answering',
      'You have 20 minutes to complete this quiz',
      'Each question carries 1 mark',
      'You need to score 60% or above to pass',
      'You can attempt this quiz up to 3 times'
    ],
    questions: [
      {
        questionText: 'What does "Pre-Matric" scholarship mean?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Scholarship before class 10', isCorrect: true },
          { text: 'Scholarship before graduation', isCorrect: false },
          { text: 'Scholarship before 12th class', isCorrect: false },
          { text: 'Scholarship for primary education', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Pre-Matric scholarships are meant for students studying in classes 9th and 10th (before matriculation).',
        order: 1,
        difficulty: 'easy',
        tags: ['pre-matric', 'definitions']
      },
      {
        questionText: 'Which ministry offers the Pre-Matric Scholarship for SC students?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Ministry of Education', isCorrect: false },
          { text: 'Ministry of Social Justice and Empowerment', isCorrect: true },
          { text: 'Ministry of Tribal Affairs', isCorrect: false },
          { text: 'Ministry of Minority Affairs', isCorrect: false }
        ],
        marks: 1,
        explanation: 'The Ministry of Social Justice and Empowerment provides Pre-Matric scholarships for Scheduled Caste students.',
        order: 2,
        difficulty: 'medium',
        tags: ['sc-scholarship', 'ministry']
      },
      {
        questionText: 'What is the annual family income limit for most central government scholarships for SC/ST students?',
        questionType: 'multiple-choice',
        options: [
          { text: '₹1,00,000', isCorrect: false },
          { text: '₹2,00,000', isCorrect: false },
          { text: '₹2,50,000', isCorrect: true },
          { text: '₹5,00,000', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Most central government scholarships for SC/ST students have an annual family income limit of ₹2,50,000.',
        order: 3,
        difficulty: 'medium',
        tags: ['income-limit', 'eligibility']
      },
      {
        questionText: 'Post-Matric scholarships are available only for graduate students.',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true }
        ],
        marks: 1,
        explanation: 'False. Post-Matric scholarships are available for students from class 11th onwards, including higher secondary, graduation, and post-graduation.',
        order: 4,
        difficulty: 'easy',
        tags: ['post-matric', 'eligibility']
      },
      {
        questionText: 'Which scholarship is specifically for minority community students?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Pre-Matric Scholarship for SC', isCorrect: false },
          { text: 'Post-Matric Scholarship for ST', isCorrect: false },
          { text: 'Pre-Matric Scholarship for Minorities', isCorrect: true },
          { text: 'National Means-cum-Merit Scholarship', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Pre-Matric and Post-Matric scholarships for minorities are specifically designed for students from minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, and Parsis).',
        order: 5,
        difficulty: 'easy',
        tags: ['minority-scholarship', 'types']
      },
      {
        questionText: 'What is the minimum attendance requirement for most scholarships?',
        questionType: 'multiple-choice',
        options: [
          { text: '50%', isCorrect: false },
          { text: '60%', isCorrect: false },
          { text: '75%', isCorrect: true },
          { text: '80%', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Most scholarships require a minimum of 75% attendance in the academic year.',
        order: 6,
        difficulty: 'medium',
        tags: ['attendance', 'requirements']
      },
      {
        questionText: 'Can a student receive multiple scholarships simultaneously?',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true }
        ],
        marks: 1,
        explanation: 'False. Generally, a student cannot receive more than one scholarship for the same purpose in the same academic year.',
        order: 7,
        difficulty: 'medium',
        tags: ['multiple-scholarships', 'rules']
      },
      {
        questionText: 'What document is mandatory for caste-based scholarships?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Income certificate', isCorrect: false },
          { text: 'Caste certificate', isCorrect: true },
          { text: 'Domicile certificate', isCorrect: false },
          { text: 'All of the above', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Caste certificate is mandatory for all caste-based scholarships (SC/ST/OBC) to prove eligibility.',
        order: 8,
        difficulty: 'easy',
        tags: ['documents', 'caste-certificate']
      },
      {
        questionText: 'Which scholarship scheme is for meritorious students from economically weaker sections?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Prime Minister\'s Scholarship Scheme', isCorrect: false },
          { text: 'National Means-cum-Merit Scholarship (NMMS)', isCorrect: true },
          { text: 'INSPIRE Scholarship', isCorrect: false },
          { text: 'Pragati Scholarship', isCorrect: false }
        ],
        marks: 1,
        explanation: 'National Means-cum-Merit Scholarship (NMMS) is specifically for meritorious students from economically weaker sections studying in classes 9-12.',
        order: 9,
        difficulty: 'medium',
        tags: ['nmms', 'merit-scholarship']
      },
      {
        questionText: 'What is the typical time frame for scholarship disbursement after approval?',
        questionType: 'multiple-choice',
        options: [
          { text: '1-2 weeks', isCorrect: false },
          { text: '1-2 months', isCorrect: true },
          { text: '6 months', isCorrect: false },
          { text: '1 year', isCorrect: false }
        ],
        marks: 1,
        explanation: 'After approval and verification, scholarships are typically disbursed within 1-2 months, though it can vary based on the scheme.',
        order: 10,
        difficulty: 'medium',
        tags: ['disbursement', 'timeline']
      },
      {
        questionText: 'Scholarship renewal is automatic if you were selected in previous year.',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true }
        ],
        marks: 1,
        explanation: 'False. Scholarship renewal is not automatic. You must apply and meet eligibility criteria each year.',
        order: 11,
        difficulty: 'easy',
        tags: ['renewal', 'application']
      },
      {
        questionText: 'Which scholarship is specifically for girl students pursuing technical education?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Pragati Scholarship', isCorrect: true },
          { text: 'Saksham Scholarship', isCorrect: false },
          { text: 'INSPIRE Scholarship', isCorrect: false },
          { text: 'NSP Scholarship', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Pragati Scholarship is specifically designed for girl students pursuing technical education (engineering/diploma) from economically weaker sections.',
        order: 12,
        difficulty: 'medium',
        tags: ['pragati', 'girl-students', 'technical']
      },
      {
        questionText: 'What is the last date for most NSP scholarship applications?',
        questionType: 'multiple-choice',
        options: [
          { text: 'June 30', isCorrect: false },
          { text: 'September 30', isCorrect: false },
          { text: 'October 31', isCorrect: true },
          { text: 'December 31', isCorrect: false }
        ],
        marks: 1,
        explanation: 'Most NSP scholarship applications close around October 31st, though exact dates may vary year to year.',
        order: 13,
        difficulty: 'medium',
        tags: ['deadline', 'application']
      },
      {
        questionText: 'Can students studying in private institutions apply for government scholarships?',
        questionType: 'true-false',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false }
        ],
        marks: 1,
        explanation: 'True. Students in private institutions can apply for government scholarships if they meet other eligibility criteria.',
        order: 14,
        difficulty: 'easy',
        tags: ['private-institutions', 'eligibility']
      },
      {
        questionText: 'What happens if you fail to maintain required attendance or academic performance?',
        questionType: 'multiple-choice',
        options: [
          { text: 'Nothing, scholarship continues', isCorrect: false },
          { text: 'Scholarship is suspended or discontinued', isCorrect: true },
          { text: 'You get a warning only', isCorrect: false },
          { text: 'Amount is reduced', isCorrect: false }
        ],
        marks: 1,
        explanation: 'If you fail to maintain required attendance or academic performance, your scholarship will be suspended or discontinued.',
        order: 15,
        difficulty: 'easy',
        tags: ['requirements', 'discontinuation']
      }
    ]
  }
];

const seedQuizzes = async () => {
  try {
    await connectDB();

    // Get admin user
    const admin = await User.findOne({ email: 'admin@dbtaware.gov.in' });
    if (!admin) {
      console.error('Admin user not found. Please run user seed first.');
      process.exit(1);
    }

    console.log('Clearing existing quizzes and questions...');
    await Question.deleteMany({});
    await Quiz.deleteMany({});
    await QuizAttempt.deleteMany({});

    console.log('Creating quizzes and questions...');
    
    for (const quizData of quizzesData) {
      const { questions, ...quizInfo } = quizData;
      
      // Create quiz
      const quiz = await Quiz.create({
        ...quizInfo,
        createdBy: admin._id
      });

      console.log(`✓ Created quiz: ${quiz.title}`);

      // Create questions for this quiz
      const questionsToCreate = questions.map(q => ({
        ...q,
        quiz: quiz._id
      }));

      await Question.insertMany(questionsToCreate);
      console.log(`  ✓ Added ${questions.length} questions`);
    }

    console.log('\n✅ Successfully seeded all quizzes and questions!');
    console.log(`\nSummary:`);
    console.log(`- Total Quizzes: ${quizzesData.length}`);
    console.log(`- Total Questions: ${quizzesData.reduce((sum, q) => sum + q.totalQuestions, 0)}`);
    console.log(`\nQuizzes by category:`);
    quizzesData.forEach(q => {
      console.log(`  - ${q.category}: ${q.title} (${q.totalQuestions} questions)`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding quizzes:', error);
    process.exit(1);
  }
};

seedQuizzes();
