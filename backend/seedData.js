const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');
const Content = require('./src/models/Content');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Content.deleteMany({});
    
    console.log('Existing data cleared...');

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@dbtaware.gov.in',
      password: 'Admin@123',
      firstName: 'System',
      lastName: 'Administrator',
      phoneNumber: '9876543210',
      state: 'Delhi',
      district: 'New Delhi',
      educationLevel: 'Post-Graduate',
      role: 'admin',
      emailVerified: true,
      phoneVerified: true,
      profileCompleted: true,
      isActive: true
    });

    console.log('Admin user created...');

    // Create sample content
    const sampleContent = [
      {
        title: 'Understanding Aadhaar vs DBT: A Complete Guide',
        description: 'Learn the critical difference between Aadhaar linking and DBT enabling to ensure timely scholarship disbursement.',
        content: `
        <h2>Introduction</h2>
        <p>Many students face delays in receiving their scholarships simply because they don't understand the crucial difference between Aadhaar linking and DBT (Direct Benefit Transfer) enabling. This guide will clarify these concepts and help you ensure timely receipt of your benefits.</p>

        <h2>What is Aadhaar Linking?</h2>
        <p><strong>Aadhaar Linking</strong> is the basic process of connecting your 12-digit Aadhaar number with your bank account. This serves as:</p>
        <ul>
          <li><strong>Identification verification</strong> for your bank account</li>
          <li><strong>Basic Know Your Customer (KYC)</strong> compliance</li>
          <li><strong>Identity authentication</strong> for various services</li>
        </ul>

        <h3>Key Points about Aadhaar Linking:</h3>
        <ul>
          <li>✅ Links your identity to your bank account</li>
          <li>✅ Required for basic banking operations</li>
          <li>✅ Helps in identity verification</li>
          <li>❌ <strong>Does NOT automatically enable government benefit transfers</strong></li>
        </ul>

        <h2>What is DBT Enabling?</h2>
        <p><strong>DBT (Direct Benefit Transfer) Enabling</strong> is an advanced integration that connects your Aadhaar-linked bank account to the government's Public Financial Management System (PFMS). This enables:</p>
        <ul>
          <li><strong>Direct transfer</strong> of government benefits</li>
          <li><strong>Real-time tracking</strong> of benefit disbursements</li>
          <li><strong>Elimination of intermediaries</strong> in the transfer process</li>
          <li><strong>Faster and transparent</strong> fund transfers</li>
        </ul>

        <h3>Key Points about DBT Enabling:</h3>
        <ul>
          <li>✅ Enables direct government benefit transfers</li>
          <li>✅ Works through the Aadhaar Payment Bridge System (APBS)</li>
          <li>✅ Ensures faster scholarship disbursement</li>
          <li>✅ Provides transaction tracking capabilities</li>
          <li>✅ <strong>Required for scholarship payments</strong></li>
        </ul>

        <h2>The Critical Difference</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Aspect</th>
              <th>Aadhaar Linking</th>
              <th>DBT Enabling</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Purpose</strong></td>
              <td>Basic identification</td>
              <td>Government benefit transfer</td>
            </tr>
            <tr>
              <td><strong>System Integration</strong></td>
              <td>Bank's internal system</td>
              <td>Government's PFMS system</td>
            </tr>
            <tr>
              <td><strong>Scholarship Eligibility</strong></td>
              <td>Not sufficient</td>
              <td>Mandatory requirement</td>
            </tr>
            <tr>
              <td><strong>Processing Time</strong></td>
              <td>Immediate</td>
              <td>3-7 working days</td>
            </tr>
          </tbody>
        </table>

        <h2>Why This Matters for Students</h2>
        <h3>Without DBT Enabling:</h3>
        <ul>
          <li>❌ Scholarship applications may be rejected</li>
          <li>❌ Payments will face significant delays</li>
          <li>❌ Manual processing increases error chances</li>
          <li>❌ No real-time tracking of funds</li>
        </ul>

        <h3>With DBT Enabling:</h3>
        <ul>
          <li>✅ Instant eligibility for all government schemes</li>
          <li>✅ Direct transfer from government treasury</li>
          <li>✅ Real-time payment notifications</li>
          <li>✅ Transparent tracking system</li>
          <li>✅ Faster dispute resolution</li>
        </ul>

        <h2>Common Misconceptions</h2>
        <h3>Myth 1: "Aadhaar linking is enough for scholarships"</h3>
        <p><strong>Reality:</strong> Aadhaar linking only verifies your identity. DBT enabling is additionally required for receiving government benefits.</p>

        <h3>Myth 2: "DBT enabling is automatic after Aadhaar linking"</h3>
        <p><strong>Reality:</strong> DBT enabling is a separate process that requires explicit application and verification.</p>

        <h3>Myth 3: "All banks automatically enable DBT"</h3>
        <p><strong>Reality:</strong> While most banks support DBT, you need to explicitly request DBT enabling for your account.</p>

        <h2>Next Steps</h2>
        <ol>
          <li><strong>Check your current status</strong> using our Status Checker tool</li>
          <li><strong>Follow our step-by-step guide</strong> if DBT enabling is required</li>
          <li><strong>Verify completion</strong> through multiple channels</li>
          <li><strong>Apply for scholarships</strong> with confidence</li>
        </ol>

        <p><strong>Remember:</strong> Both Aadhaar linking AND DBT enabling are necessary for smooth scholarship processing. Don't let a simple misunderstanding delay your educational benefits!</p>
        `,
        contentType: 'article',
        category: 'aadhaar-basics',
        tags: ['basics', 'aadhaar', 'dbt', 'scholarship', 'banking'],
        language: 'en',
        difficulty: 'beginner',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date(),
        featured: true,
        estimatedReadTime: 5,
        metaDescription: 'Understand the crucial difference between Aadhaar linking and DBT enabling to ensure you receive your scholarship benefits on time.',
        seoKeywords: ['aadhaar linking', 'dbt enabling', 'scholarship', 'direct benefit transfer', 'government benefits']
      },
      {
        title: 'Step-by-Step Guide to Enable DBT for Your Account',
        description: 'Complete walkthrough with 6 detailed steps, troubleshooting tips, and verification methods to enable DBT for your bank account.',
        content: `
        <h2>Before You Begin</h2>
        <h3>Prerequisites Checklist:</h3>
        <ul>
          <li>Active bank account with any participating bank</li>
          <li>Aadhaar card (physical or e-Aadhaar)</li>
          <li>Mobile number registered with your bank</li>
          <li>Email address (recommended)</li>
          <li>Recent bank statement or cancelled cheque</li>
        </ul>

        <p><strong>Important Notes:</strong> The process typically takes 3-7 working days. Keep all documents ready before starting and ensure your mobile number is active for OTP verification.</p>

        <h2>Step 1: Verify Aadhaar-Bank Linking Status</h2>
        <h3>Online Verification:</h3>
        <ol>
          <li>Visit the UIDAI website (https://uidai.gov.in)</li>
          <li>Go to "My Aadhaar" → "Aadhaar Services"</li>
          <li>Select "Check Aadhaar/Bank Account Linking Status"</li>
          <li>Enter your Aadhaar number and account details</li>
          <li>Verify with OTP sent to registered mobile</li>
        </ol>

        <p><strong>⚠️ Important:</strong> If Aadhaar is not linked, you must complete this step before proceeding to DBT enabling.</p>

        <h2>Step 2: Access DBT Enabling Services</h2>
        <h3>Method 1: Through Bank (Recommended)</h3>
        <ol>
          <li><strong>Visit your bank branch</strong> with required documents</li>
          <li><strong>Request DBT enabling</strong> for your account</li>
          <li><strong>Fill the application form</strong> (usually available at the branch)</li>
          <li><strong>Submit documents</strong> for verification</li>
        </ol>

        <h3>Method 2: Online Portal</h3>
        <ol>
          <li>Visit your bank's official website</li>
          <li>Login to net banking</li>
          <li>Look for "Government Schemes" or "DBT Services"</li>
          <li>Select "Enable DBT" or "PFMS Registration"</li>
          <li>Follow on-screen instructions</li>
        </ol>

        <h3>Method 3: Mobile Banking App</h3>
        <ol>
          <li>Open your bank's mobile app</li>
          <li>Navigate to "Services" → "Government Schemes"</li>
          <li>Select "DBT Enabling" or "Benefit Transfer Services"</li>
          <li>Complete the application process</li>
        </ol>

        <h2>Step 3: Document Submission</h2>
        <h3>Required Documents:</h3>
        <ol>
          <li><strong>Aadhaar Card</strong> (original + photocopy)</li>
          <li><strong>Bank Account Details</strong> (account number, IFSC code)</li>
          <li><strong>Cancelled Cheque</strong> or recent bank statement</li>
          <li><strong>Identity Proof</strong> (if different from Aadhaar)</li>
          <li><strong>Mobile Number Verification</strong> (OTP-based)</li>
        </ol>

        <h2>Step 4: Application Processing</h2>
        <h3>What Happens Next:</h3>
        <ul>
          <li><strong>Application Submission:</strong> Your request enters the bank's processing system</li>
          <li><strong>Internal Verification:</strong> Bank verifies all provided information</li>
          <li><strong>PFMS Integration:</strong> Your account details are sent to the government's PFMS system</li>
          <li><strong>System Integration:</strong> Your account gets integrated with the DBT framework</li>
          <li><strong>Final Verification:</strong> Government system confirms the integration</li>
        </ul>

        <h3>Timeline:</h3>
        <ul>
          <li><strong>Day 1-2:</strong> Internal bank processing</li>
          <li><strong>Day 3-5:</strong> PFMS system integration</li>
          <li><strong>Day 6-7:</strong> Final verification and activation</li>
        </ul>

        <h2>Step 5: Status Verification</h2>
        <h3>How to Check Status:</h3>
        <p><strong>Method 1: Bank Inquiry</strong></p>
        <ul>
          <li>Call your bank's customer service</li>
          <li>Provide your account number and Aadhaar details</li>
          <li>Ask for DBT enabling status</li>
        </ul>

        <p><strong>Method 2: Online Verification</strong></p>
        <ul>
          <li>Use our platform's Status Checker tool</li>
          <li>Visit the PFMS website (https://pfms.nic.in)</li>
          <li>Check through bank's net banking portal</li>
        </ul>

        <h3>Confirmation Indicators:</h3>
        <ul>
          <li>✅ <strong>SMS confirmation</strong> from your bank</li>
          <li>✅ <strong>Email notification</strong> about successful enabling</li>
          <li>✅ <strong>Status shows as "DBT Enabled"</strong> in bank systems</li>
          <li>✅ <strong>PFMS portal shows</strong> your account as registered</li>
        </ul>

        <h2>Step 6: Test Your Setup</h2>
        <h3>Verification Methods:</h3>
        <ol>
          <li><strong>Check with scholarship portal:</strong> Try applying for a small test transaction</li>
          <li><strong>Contact customer service:</strong> Confirm DBT status over phone</li>
          <li><strong>Visit bank branch:</strong> Get written confirmation if needed</li>
        </ol>

        <h2>Troubleshooting Common Issues</h2>
        <h3>Issue 1: Aadhaar Not Linked Error</h3>
        <p><strong>Solution:</strong> Complete Aadhaar linking first before attempting DBT enabling</p>

        <h3>Issue 2: Mobile Number Mismatch</h3>
        <p><strong>Solution:</strong> Update mobile number with bank to match Aadhaar records</p>

        <h3>Issue 3: Document Verification Failure</h3>
        <p><strong>Solution:</strong> Ensure all documents are clear, valid, and match exactly</p>

        <h3>Issue 4: Processing Delays</h3>
        <p><strong>Solution:</strong> Wait for full 7-day processing period before follow-up</p>

        <h2>Important Tips for Success</h2>
        <h3>Do's:</h3>
        <ul>
          <li>✅ Keep all documents ready before starting</li>
          <li>✅ Use registered mobile number for verification</li>
          <li>✅ Visit bank during business hours for better service</li>
          <li>✅ Keep reference numbers for tracking</li>
          <li>✅ Follow up if no confirmation received after 7 days</li>
        </ul>

        <h3>Don'ts:</h3>
        <ul>
          <li>❌ Don't submit photocopies of documents only</li>
          <li>❌ Don't use different mobile numbers during process</li>
          <li>❌ Don't expect instant activation</li>
          <li>❌ Don't skip verification steps</li>
          <li>❌ Don't ignore error messages</li>
        </ul>

        <h2>What Happens After DBT Enabling?</h2>
        <h3>Immediate Benefits:</h3>
        <ul>
          <li>✅ Eligible for all government scholarship schemes</li>
          <li>✅ Direct transfer capability activated</li>
          <li>✅ Real-time payment tracking enabled</li>
          <li>✅ Faster disbursement processing</li>
        </ul>

        <h2>Next Steps</h2>
        <ol>
          <li><strong>Apply for scholarships</strong> through official portals</li>
          <li><strong>Keep documents updated</strong> with bank and government portals</li>
          <li><strong>Monitor payment status</strong> regularly</li>
          <li><strong>Update information</strong> whenever you change bank or mobile number</li>
        </ol>

        <p><strong>Remember:</strong> DBT enabling is a one-time process that ensures lifelong access to government benefits. Take your time and follow each step carefully for the best results!</p>
        `,
        contentType: 'guide',
        category: 'bank-linking',
        tags: ['tutorial', 'dbt-enabling', 'step-by-step', 'banking', 'government-schemes'],
        language: 'en',
        difficulty: 'beginner',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date(),
        featured: true,
        estimatedReadTime: 8,
        metaDescription: 'Comprehensive 6-step guide to enable DBT for your bank account, including troubleshooting tips and verification methods.',
        seoKeywords: ['dbt enabling', 'step by step', 'bank account', 'pfms', 'government benefits']
      },
      {
        title: 'Essential Documents Required for Aadhaar-Bank Account Seeding & DBT',
        description: 'Complete checklist of documents needed for Aadhaar linking, bank account seeding, and DBT enabling to receive government scholarships and benefits.',
        content: `
        <h2>Why Document Preparation is Critical</h2>
        <p>Having the right documents ready is essential for:</p>
        <ul>
          <li>✅ Linking Aadhaar to your bank account successfully</li>
          <li>✅ Enabling DBT (Direct Benefit Transfer) for your account</li>
          <li>✅ Applying for government scholarships smoothly</li>
          <li>✅ Avoiding application rejections due to missing papers</li>
          <li>✅ Speeding up verification and approval processes</li>
        </ul>

        <p><strong>Important Note:</strong> This guide covers documents for three related but distinct processes: Aadhaar-Bank Linking, DBT Enabling, and Scholarship Applications. Requirements may vary slightly by bank and state.</p>

        <h2>Documents for Aadhaar-Bank Account Linking</h2>

        <h3>Mandatory Documents:</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Document</th>
              <th>Details Required</th>
              <th>Format/Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Aadhaar Card</strong></td>
              <td>12-digit Aadhaar number, clear photo, both sides</td>
              <td>Original + Self-attested photocopy</td>
            </tr>
            <tr>
              <td><strong>Bank Passbook</strong></td>
              <td>First page with account details, customer photo</td>
              <td>Original + Photocopy of first page</td>
            </tr>
            <tr>
              <td><strong>OR Cancelled Cheque</strong></td>
              <td>Pre-printed cheque with name, account number, IFSC</td>
              <td>Original cancelled cheque</td>
            </tr>
            <tr>
              <td><strong>Identity Proof</strong></td>
              <td>Valid government-issued ID matching Aadhaar name</td>
              <td>Original + Self-attested copy</td>
            </tr>
            <tr>
              <td><strong>Mobile Number</strong></td>
              <td>Active mobile registered with both Aadhaar and bank</td>
              <td>SIM card with active connection</td>
            </tr>
          </tbody>
        </table>

        <h3>Acceptable Identity Proofs (if name verification needed):</h3>
        <ul>
          <li>✅ Passport</li>
          <li>✅ Voter ID Card (Election Card)</li>
          <li>✅ Driving License</li>
          <li>✅ PAN Card</li>
          <li>✅ Government Employee ID Card</li>
          <li>✅ Student ID Card (from recognized institution)</li>
        </ul>

        <h3>Additional Documents (if name mismatch exists):</h3>
        <ul>
          <li><strong>Marriage Certificate:</strong> If name changed after marriage</li>
          <li><strong>Gazette Notification:</strong> For official name changes</li>
          <li><strong>Affidavit:</strong> Sworn statement explaining name variation</li>
          <li><strong>School/College Certificate:</strong> Showing name as per Aadhaar</li>
        </ul>

        <h2>Documents for DBT Enabling</h2>

        <h3>Primary Requirements:</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Document</th>
              <th>Purpose</th>
              <th>Specifications</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Aadhaar Card (Physical or e-Aadhaar)</strong></td>
              <td>Identity and address proof</td>
              <td>Original + 2 photocopies, both sides</td>
            </tr>
            <tr>
              <td><strong>Bank Account Proof</strong></td>
              <td>Verify account ownership</td>
              <td>Passbook first page OR cancelled cheque</td>
            </tr>
            <tr>
              <td><strong>Bank Statement</strong></td>
              <td>Show account activity</td>
              <td>Last 3 months, bank sealed</td>
            </tr>
            <tr>
              <td><strong>DBT Application Form</strong></td>
              <td>Formal request for DBT enabling</td>
              <td>Bank's prescribed format, duly filled</td>
            </tr>
            <tr>
              <td><strong>Aadhaar-Bank Linking Proof</strong></td>
              <td>Confirm prior linking</td>
              <td>UIDAI acknowledgment OR bank confirmation</td>
            </tr>
          </tbody>
        </table>

        <h3>Supporting Documents:</h3>
        <ul>
          <li><strong>Passport-size Photographs:</strong> 2 recent color photos (same as Aadhaar if possible)</li>
          <li><strong>Signature Specimen:</strong> On bank's prescribed form</li>
          <li><strong>Address Proof:</strong> Utility bill, rent agreement (if address verification needed)</li>
          <li><strong>KYC Documents:</strong> If KYC not completed or expired</li>
        </ul>

        <h2>Documents for Scholarship Applications</h2>

        <h3>Personal & Identity Documents:</h3>
        <ol>
          <li><strong>Aadhaar Card</strong>
            <ul>
              <li>Original + self-attested photocopy (both sides)</li>
              <li>Ensure Aadhaar number is clearly visible</li>
              <li>e-Aadhaar is acceptable for online applications</li>
            </ul>
          </li>
          <li><strong>Passport-size Photographs</strong>
            <ul>
              <li>Recent color photos (2-4 copies)</li>
              <li>Size: 3.5cm x 4.5cm</li>
              <li>White or light blue background</li>
              <li>Digital format for online applications (JPG, size < 100KB)</li>
            </ul>
          </li>
          <li><strong>Date of Birth Proof</strong>
            <ul>
              <li>Birth Certificate (preferred)</li>
              <li>OR School Leaving Certificate</li>
              <li>OR 10th Class Mark Sheet</li>
            </ul>
          </li>
        </ol>

        <h3>Educational Documents:</h3>
        <ol>
          <li><strong>School/College Bonafide Certificate</strong>
            <ul>
              <li>Current academic year certificate</li>
              <li>Issued by institution head</li>
              <li>Must mention: Student name, class, roll number, session</li>
              <li>Institution seal and authorized signature required</li>
            </ul>
          </li>
          <li><strong>Previous Year Mark Sheet</strong>
            <ul>
              <li>Latest examination result</li>
              <li>Self-attested photocopy</li>
              <li>Must show class passed and percentage</li>
            </ul>
          </li>
          <li><strong>Admission Receipt/Proof</strong>
            <ul>
              <li>Fee receipt showing current enrollment</li>
              <li>Admission letter from institution</li>
            </ul>
          </li>
          <li><strong>Previous Qualification Certificates</strong>
            <ul>
              <li>For post-matric: Class 10th and 12th certificates</li>
              <li>For higher education: Graduation/PG degrees</li>
            </ul>
          </li>
        </ol>

        <h3>Family & Income Documents:</h3>
        <ol>
          <li><strong>Income Certificate</strong>
            <ul>
              <li>Issued by competent authority (Tehsildar/SDM/Revenue Officer)</li>
              <li>Must be recent (not older than 6 months)</li>
              <li>Should state family's annual income from all sources</li>
              <li>Must be on official letterhead with seal and signature</li>
            </ul>
          </li>
          <li><strong>Caste Certificate (if applicable)</strong>
            <ul>
              <li>For SC/ST/OBC category students</li>
              <li>Issued by competent authority</li>
              <li>Original + self-attested photocopy</li>
              <li>Must be in student's name (not parent's)</li>
            </ul>
          </li>
          <li><strong>Parents' Identity Proof</strong>
            <ul>
              <li>Father's and Mother's Aadhaar cards</li>
              <li>OR Voter ID cards</li>
              <li>Self-attested photocopies</li>
            </ul>
          </li>
          <li><strong>Domicile/Residence Certificate</strong>
            <ul>
              <li>Proof of state residency (if required by scheme)</li>
              <li>Issued by local revenue authority</li>
            </ul>
          </li>
        </ol>

        <h3>Bank Account Documents:</h3>
        <ol>
          <li><strong>Bank Passbook First Page</strong>
            <ul>
              <li>Clear photocopy showing:</li>
              <li>- Student's name (account holder)</li>
              <li>- Account number</li>
              <li>- IFSC code</li>
              <li>- Bank name and branch</li>
              <li>Must be in student's own name (not parent's joint account)</li>
            </ul>
          </li>
          <li><strong>Cancelled Cheque</strong>
            <ul>
              <li>Pre-printed cheque (not handwritten)</li>
              <li>Write "CANCELLED" in capital letters</li>
              <li>Should show name, account number, IFSC clearly</li>
            </ul>
          </li>
          <li><strong>DBT Enabling Proof</strong>
            <ul>
              <li>Bank certificate confirming DBT status</li>
              <li>OR PFMS verification screenshot</li>
              <li>OR NSP portal confirmation</li>
            </ul>
          </li>
        </ol>

        <h3>Additional Documents (Specific Categories):</h3>

        <h4>For Disabled Students:</h4>
        <ul>
          <li>Disability Certificate (40% or above)</li>
          <li>Issued by competent medical authority</li>
          <li>Valid throughout the scholarship period</li>
        </ul>

        <h4>For Minority Students:</h4>
        <ul>
          <li>Community/Religion Certificate</li>
          <li>Issued by designated authority</li>
          <li>Specified format as per scheme guidelines</li>
        </ul>

        <h4>For Hostellers:</h4>
        <ul>
          <li>Hostel Admission Receipt</li>
          <li>Hostel Fee Receipt</li>
          <li>Hostel Certificate from Warden/Principal</li>
        </ul>

        <h4>For Single Girl Child:</h4>
        <ul>
          <li>Affidavit from parents declaring single girl child</li>
          <li>Notarized on stamp paper</li>
        </ul>

        <h2>Document Formatting Guidelines</h2>

        <h3>For Physical Submission:</h3>
        <ul>
          <li>✅ Use good quality photocopies (clear, not faded)</li>
          <li>✅ Self-attest all document copies (sign across the photo with date)</li>
          <li>✅ Arrange documents in proper sequence</li>
          <li>✅ Use paper clips (avoid stapling unless instructed)</li>
          <li>✅ Keep original documents ready for verification</li>
          <li>✅ Make one extra set for your personal records</li>
        </ul>

        <h3>For Online Upload:</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Document Type</th>
              <th>File Format</th>
              <th>Size Limit</th>
              <th>Resolution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Photographs</td>
              <td>JPG/JPEG</td>
              <td>10-100 KB</td>
              <td>200 DPI minimum</td>
            </tr>
            <tr>
              <td>Certificates/Documents</td>
              <td>PDF (preferred) or JPG</td>
              <td>50-200 KB</td>
              <td>200-300 DPI</td>
            </tr>
            <tr>
              <td>Signature</td>
              <td>JPG/JPEG</td>
              <td>10-50 KB</td>
              <td>Clear, on white paper</td>
            </tr>
            <tr>
              <td>Bank Passbook</td>
              <td>PDF or JPG</td>
              <td>100-200 KB</td>
              <td>300 DPI minimum</td>
            </tr>
          </tbody>
        </table>

        <h3>Scanning/Photography Tips:</h3>
        <ul>
          <li>✅ Scan in color mode (not black & white)</li>
          <li>✅ Ensure entire document is visible (no cropping of edges)</li>
          <li>✅ Use proper lighting (no shadows or glare)</li>
          <li>✅ Keep document flat on scanner bed</li>
          <li>✅ Use scanning apps like CamScanner for mobile scanning</li>
          <li>✅ Save files with descriptive names (e.g., "Aadhaar_Front.pdf")</li>
          <li>✅ Compress files if size exceeds limit (without losing clarity)</li>
        </ul>

        <h2>Common Document-Related Mistakes to Avoid</h2>

        <h3>Top 10 Mistakes:</h3>
        <ol>
          <li>❌ <strong>Name Mismatch:</strong> Ensure name is exactly same across all documents</li>
          <li>❌ <strong>Expired Certificates:</strong> Check validity dates (especially income certificate)</li>
          <li>❌ <strong>Unclear Photocopies:</strong> Use high-quality scans/photocopies</li>
          <li>❌ <strong>Missing Signatures:</strong> Sign and date all required fields</li>
          <li>❌ <strong>Wrong Account Details:</strong> Verify account number and IFSC code multiple times</li>
          <li>❌ <strong>Parent's Account:</strong> Bank account must be in student's own name</li>
          <li>❌ <strong>Incomplete Documents:</strong> Don't submit partial documents (e.g., only one side of Aadhaar)</li>
          <li>❌ <strong>Wrong File Format:</strong> Follow specified format (PDF/JPG) and size limits</li>
          <li>❌ <strong>Missing Seal/Stamp:</strong> Ensure all certificates have official seal</li>
          <li>❌ <strong>Outdated Information:</strong> Use current address, mobile number, email</li>
        </ol>

        <h2>Document Checklist by Process</h2>

        <h3>Aadhaar-Bank Linking Checklist:</h3>
        <ul>
          <li>☐ Aadhaar Card (original + 1 photocopy)</li>
          <li>☐ Bank Passbook first page OR Cancelled Cheque</li>
          <li>☐ Identity Proof (if needed)</li>
          <li>☐ Mobile phone with active SIM (for OTP)</li>
        </ul>

        <h3>DBT Enabling Checklist:</h3>
        <ul>
          <li>☐ Aadhaar Card (original + 2 photocopies)</li>
          <li>☐ Bank Passbook OR Cancelled Cheque</li>
          <li>☐ Bank Statement (last 3 months)</li>
          <li>☐ DBT Application Form (filled and signed)</li>
          <li>☐ Aadhaar Linking Proof</li>
          <li>☐ Passport-size Photos (2 copies)</li>
        </ul>

        <h3>Scholarship Application Checklist:</h3>
        <ul>
          <li>☐ Aadhaar Card (both sides)</li>
          <li>☐ Recent Photographs (2-4 copies or digital)</li>
          <li>☐ School/College Bonafide Certificate (current year)</li>
          <li>☐ Previous Year Mark Sheet</li>
          <li>☐ Income Certificate (within 6 months)</li>
          <li>☐ Caste Certificate (if applicable)</li>
          <li>☐ Bank Passbook first page</li>
          <li>☐ DBT Status Proof</li>
          <li>☐ Admission Receipt</li>
          <li>☐ Parents' ID Proof</li>
          <li>☐ Additional category-specific documents (if any)</li>
        </ul>

        <h2>Where to Obtain These Documents</h2>

        <h3>Government Authorities:</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Document</th>
              <th>Issuing Authority</th>
              <th>Where to Apply</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Income Certificate</td>
              <td>Tehsildar/SDM/Revenue Officer</td>
              <td>Tehsil Office / Online Portal (e-District)</td>
            </tr>
            <tr>
              <td>Caste Certificate</td>
              <td>District Magistrate/Competent Authority</td>
              <td>District Office / Online Portal</td>
            </tr>
            <tr>
              <td>Domicile Certificate</td>
              <td>Revenue Department</td>
              <td>Tehsil Office / e-District Portal</td>
            </tr>
            <tr>
              <td>Birth Certificate</td>
              <td>Municipal Corporation/Gram Panchayat</td>
              <td>Local Municipal Office / Online</td>
            </tr>
            <tr>
              <td>Disability Certificate</td>
              <td>Medical Board/Chief Medical Officer</td>
              <td>District Hospital / Government Hospital</td>
            </tr>
          </tbody>
        </table>

        <h3>Educational Institution:</h3>
        <ul>
          <li><strong>Bonafide Certificate:</strong> School/College Office</li>
          <li><strong>Mark Sheets:</strong> Examination Department / Board Office</li>
          <li><strong>Admission Receipt:</strong> Accounts Section</li>
          <li><strong>Character Certificate:</strong> Principal's Office</li>
          <li><strong>Hostel Certificate:</strong> Hostel Warden / Administration</li>
        </ul>

        <h3>Bank:</h3>
        <ul>
          <li><strong>Bank Statement:</strong> Request at branch or download from net banking</li>
          <li><strong>Cancelled Cheque:</strong> Use from cheque book OR request at branch</li>
          <li><strong>DBT Enabling Certificate:</strong> Request from branch manager</li>
          <li><strong>Account Details Certificate:</strong> Branch can provide on request</li>
        </ul>

        <h2>Timeline for Document Preparation</h2>

        <h3>Recommended Schedule:</h3>
        <ol>
          <li><strong>3 months before application:</strong> Start collecting certificates that take time (income, caste)</li>
          <li><strong>2 months before:</strong> Get educational documents, complete Aadhaar linking</li>
          <li><strong>1 month before:</strong> Obtain bank-related documents, enable DBT</li>
          <li><strong>2 weeks before:</strong> Verify all documents, make photocopies, scan for online submission</li>
          <li><strong>1 week before:</strong> Final review, organize documents, test file uploads</li>
        </ol>

        <h2>Tips for Successful Document Management</h2>

        <h3>Organization:</h3>
        <ul>
          <li>✅ Use labeled folders or envelopes for each document category</li>
          <li>✅ Maintain both physical and digital copies</li>
          <li>✅ Create a checklist and tick off as you collect each document</li>
          <li>✅ Keep originals in safe place - submit only photocopies unless original verification needed</li>
        </ul>

        <h3>Verification:</h3>
        <ul>
          <li>✅ Check spelling of name, father's name across all documents</li>
          <li>✅ Verify dates (birth date, issue dates, validity dates)</li>
          <li>✅ Confirm account number, IFSC code by checking multiple times</li>
          <li>✅ Ensure all seals, signatures, stamps are clear and visible</li>
        </ul>

        <h3>Backup:</h3>
        <ul>
          <li>✅ Keep extra photocopies (minimum 2 sets of each document)</li>
          <li>✅ Store digital copies in cloud storage (Google Drive, OneDrive)</li>
          <li>✅ Email scanned copies to yourself for easy access</li>
          <li>✅ Keep a document checklist in your phone for quick reference</li>
        </ul>

        <h2>Frequently Asked Questions</h2>

        <h3>Q1: Is e-Aadhaar acceptable or do I need physical Aadhaar card?</h3>
        <p><strong>A:</strong> e-Aadhaar (downloaded from UIDAI website) is acceptable for most purposes including bank linking and scholarship applications. However, keep a printed copy for physical submission.</p>

        <h3>Q2: Can I use my parent's bank account for scholarship?</h3>
        <p><strong>A:</strong> No, the bank account must be in the student's own name. Joint accounts with parents are generally not accepted for DBT scholarships.</p>

        <h3>Q3: How recent should the income certificate be?</h3>
        <p><strong>A:</strong> Income certificates should typically not be older than 6 months from the date of application. Some schemes may require certificates from the current financial year.</p>

        <h3>Q4: What if my name differs slightly in different documents?</h3>
        <p><strong>A:</strong> Minor variations (like middle name abbreviations) may be acceptable, but significant differences will require correction. Provide an affidavit explaining the variation or update documents to match exactly.</p>

        <h3>Q5: Do I need to submit original documents?</h3>
        <p><strong>A:</strong> Generally, self-attested photocopies are sufficient for submission. However, keep originals ready for physical verification if called. Some institutions may require original verification before final approval.</p>

        <h2>Conclusion</h2>
        <p>Proper documentation is the foundation of successful Aadhaar linking, DBT enabling, and scholarship applications. By following this comprehensive guide and maintaining organized, accurate documents, you can ensure smooth processing and avoid delays.</p>

        <p><strong>Key Takeaways:</strong></p>
        <ul>
          <li>Start document collection early - don't wait for deadlines</li>
          <li>Ensure name consistency across all documents</li>
          <li>Keep both physical and digital copies organized</li>
          <li>Verify all details multiple times before submission</li>
          <li>Maintain extra copies for future use</li>
        </ul>

        <p><strong>Remember:</strong> A complete, well-organized document set is your ticket to hassle-free scholarship processing and timely benefit receipt!</p>
        `,
        contentType: 'guide',
        category: 'aadhaar-basics',
        tags: ['documents', 'aadhaar', 'bank-linking', 'dbt', 'scholarship-application', 'requirements'],
        language: 'en',
        difficulty: 'beginner',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date(),
        featured: true,
        estimatedReadTime: 15,
        metaDescription: 'Complete checklist of documents for Aadhaar-bank linking, DBT enabling, and scholarship applications. Includes formatting guidelines.',
        seoKeywords: ['aadhaar documents', 'bank account seeding', 'scholarship documents', 'dbt requirements', 'document checklist']
      },
      {
        title: 'Step-by-Step Guide: Linking Aadhaar to Bank Account',
        description: 'Complete walkthrough of the process to link your Aadhaar number with your bank account for DBT benefits.',
        content: `
        <h2>Why Link Aadhaar to Bank Account?</h2>
        <p>Linking your Aadhaar to your bank account is mandatory to receive government benefits including scholarships through Direct Benefit Transfer (DBT). This ensures that benefits are transferred directly to your account without any intermediaries.</p>

        <h3>Methods to Link Aadhaar to Bank Account:</h3>

        <h4>Method 1: Online Banking</h4>
        <ol>
          <li>Log in to your bank's net banking portal</li>
          <li>Navigate to 'Service Requests' or 'Update Details' section</li>
          <li>Select 'Link Aadhaar' option</li>
          <li>Enter your 12-digit Aadhaar number</li>
          <li>Verify the details and submit</li>
          <li>You will receive a confirmation SMS</li>
        </ol>

        <h4>Method 2: Visit Bank Branch</h4>
        <ol>
          <li>Visit your bank branch with original documents</li>
          <li>Fill the Aadhaar linking form</li>
          <li>Submit the form with required documents:
            <ul>
              <li>Original Aadhaar card</li>
              <li>Bank passbook or account statement</li>
              <li>Identity proof</li>
            </ul>
          </li>
          <li>Bank official will verify and process the request</li>
          <li>Linking will be completed within 2-3 working days</li>
        </ol>

        <h4>Method 3: ATM</h4>
        <ol>
          <li>Insert your ATM card and enter PIN</li>
          <li>Select 'Registration' from the menu</li>
          <li>Choose 'Link Aadhaar' option</li>
          <li>Enter your 12-digit Aadhaar number</li>
          <li>Confirm the details</li>
          <li>Take a printout of the transaction receipt</li>
        </ol>

        <h4>Method 4: Mobile Banking</h4>
        <ol>
          <li>Open your bank's mobile app</li>
          <li>Go to 'Services' or 'Requests' section</li>
          <li>Select 'Link Aadhaar to Account'</li>
          <li>Enter Aadhaar number and verify OTP</li>
          <li>Submit the request</li>
        </ol>

        <h3>How to Check if Aadhaar is Linked:</h3>
        <p>You can verify if your Aadhaar is successfully linked by:</p>
        <ul>
          <li>Checking your bank statement for confirmation</li>
          <li>Calling your bank's customer care</li>
          <li>Visiting UIDAI website and using the 'Check Aadhaar Bank Linking Status' service</li>
          <li>Using your bank's mobile app or net banking portal</li>
        </ul>

        <h3>Important Points to Remember:</h3>
        <ul>
          <li>Ensure your name in Aadhaar matches your bank account</li>
          <li>Your mobile number should be registered with both Aadhaar and bank account</li>
          <li>Keep your Aadhaar updated with current address</li>
          <li>The linking process is free of charge</li>
          <li>You can link multiple bank accounts to the same Aadhaar</li>
        </ul>
        `,
        contentType: 'guide',
        category: 'bank-linking',
        tags: ['aadhaar', 'bank-linking', 'step-by-step', 'tutorial'],
        language: 'en',
        difficulty: 'beginner',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date(),
        featured: true,
        estimatedReadTime: 10,
        metaDescription: 'Detailed step-by-step guide to link your Aadhaar number with bank account for receiving DBT benefits and scholarships.'
      },
      {
        title: 'Pre-Matric Scholarship Schemes for SC Students',
        description: 'Comprehensive guide to Pre-Matric scholarships including eligibility, benefits, application process, and success tips for SC students in classes I to X.',
        content: `
        <h2>About Pre-Matric Scholarship Schemes</h2>
        <p>The Pre-Matric Scholarship Scheme is a centrally sponsored program for students belonging to Scheduled Caste (SC) families. This initiative aims to support students in classes I through X, helping to reduce school dropout rates and encouraging continued education in financially disadvantaged families.</p>

        <p><strong>Key Objective:</strong> To provide financial assistance for education expenses, thereby promoting enrollment and retention of SC students in schools across India.</p>

        <h2>Eligibility Criteria</h2>
        <h3>Primary Requirements:</h3>
        <ol>
          <li><strong>Caste:</strong> Student must belong to a Scheduled Caste (SC) community as recognized by the Government of India</li>
          <li><strong>Class:</strong> Must be studying in classes I to X in a government school or a school recognized by the State Government/Union Territory Administration</li>
          <li><strong>Family Income:</strong> Parents/guardians' annual income from all sources should not exceed ₹2,50,000 (Two Lakh Fifty Thousand)</li>
          <li><strong>Age Criteria:</strong> Generally applicable for students below 20 years of age</li>
          <li><strong>Attendance:</strong> Minimum 75% attendance in the previous academic year is required (relaxation may be provided in special circumstances)</li>
          <li><strong>Academic Performance:</strong> Student should have passed the previous class examination</li>
        </ol>

        <h3>Additional Conditions:</h3>
        <ul>
          <li>Student should not be receiving any other scholarship or stipend for the same purpose</li>
          <li>Day scholars and hostellers are both eligible</li>
          <li>Students pursuing distance education are not eligible</li>
          <li>Only two children from the same family can avail of this scholarship</li>
        </ul>

        <h2>Financial Assistance Details</h2>
        <h3>Scholarship Components for Classes I-X:</h3>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Component</th>
              <th>Day Scholars (Annual)</th>
              <th>Hostellers (Annual)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Admission Fee</strong></td>
              <td>₹500</td>
              <td>₹500</td>
            </tr>
            <tr>
              <td><strong>Tuition Fee</strong></td>
              <td>₹3,500</td>
              <td>₹3,500</td>
            </tr>
            <tr>
              <td><strong>Other Compulsory Charges</strong></td>
              <td>₹1,000</td>
              <td>₹1,000</td>
            </tr>
            <tr>
              <td><strong>Day Scholars (Classes I-X)</strong></td>
              <td>₹2,250 per annum</td>
              <td>-</td>
            </tr>
            <tr>
              <td><strong>Hostellers (Classes I-V)</strong></td>
              <td>-</td>
              <td>₹7,000 per annum</td>
            </tr>
            <tr>
              <td><strong>Hostellers (Classes VI-X)</strong></td>
              <td>-</td>
              <td>₹10,000 per annum</td>
            </tr>
          </tbody>
        </table>

        <p><strong>Note:</strong> Actual amounts are reimbursed based on actuals or as per the rates prescribed above, whichever is less.</p>

        <h2>Application Process</h2>
        <h3>Step-by-Step Guide:</h3>

        <h4>Step 1: Registration on National Scholarship Portal (NSP)</h4>
        <ol>
          <li>Visit the official National Scholarship Portal at <strong>https://scholarships.gov.in</strong></li>
          <li>Click on "New Registration" button</li>
          <li>Select "Pre-Matric Scholarship for SC Students"</li>
          <li>Fill in basic details: Name, Date of Birth, Mobile Number, Email ID</li>
          <li>Create a strong password</li>
          <li>Verify your mobile number and email through OTP</li>
          <li>Note down your Application ID for future reference</li>
        </ol>

        <h4>Step 2: Complete Application Form</h4>
        <ol>
          <li>Log in to NSP portal with your Application ID and password</li>
          <li>Select the appropriate scholarship scheme</li>
          <li>Fill in all sections carefully:
            <ul>
              <li><strong>Personal Details:</strong> Name, father's name, Aadhaar number, date of birth, gender</li>
              <li><strong>Educational Details:</strong> School name, class, roll number, academic performance</li>
              <li><strong>Family Details:</strong> Parents' occupation, annual income, caste category</li>
              <li><strong>Contact Information:</strong> Permanent address, current address, mobile number, email</li>
              <li><strong>Bank Account Details:</strong> Account number, IFSC code, bank name, branch</li>
            </ul>
          </li>
        </ol>

        <h4>Step 3: Document Upload</h4>
        <p>Prepare scanned copies (PDF/JPG format, size less than 200KB each) of the following documents:</p>
        <ul>
          <li><strong>Aadhaar Card</strong> (mandatory for DBT)</li>
          <li><strong>Caste Certificate</strong> issued by competent authority</li>
          <li><strong>Income Certificate</strong> (not older than 6 months)</li>
          <li><strong>School Bonafide Certificate</strong> with current class details</li>
          <li><strong>Previous Year Mark Sheet</strong> (proof of class passed)</li>
          <li><strong>Bank Passbook First Page</strong> (with student's name, account number, IFSC)</li>
          <li><strong>Passport Size Photograph</strong> (recent, clear)</li>
          <li><strong>Fee Receipt</strong> (if applicable)</li>
          <li><strong>Self-Declaration Form</strong> (downloadable from portal)</li>
        </ul>

        <h4>Step 4: Verification and Submission</h4>
        <ol>
          <li>Review all entered information carefully</li>
          <li>Preview the filled application form</li>
          <li>Check for any errors or missing information</li>
          <li>Upload all required documents in specified format</li>
          <li>Accept the declaration and terms & conditions</li>
          <li>Click on "Final Submit" button</li>
          <li>Download and print the submitted application form for your records</li>
        </ol>

        <h4>Step 5: Institute Verification</h4>
        <ol>
          <li>After submission, your school will verify the application</li>
          <li>School authorities will check details and documents</li>
          <li>Submit hard copy of application with required documents to school office</li>
          <li>Track verification status on NSP portal</li>
        </ol>

        <h4>Step 6: Department/State Verification</h4>
        <ol>
          <li>Once school verifies, application moves to state-level verification</li>
          <li>District Social Welfare Officer reviews the application</li>
          <li>Additional verification may be conducted if required</li>
          <li>Status updates will be visible on NSP portal</li>
        </ol>

        <h2>Important Dates and Timeline</h2>
        <h3>Typical Application Schedule (varies by state):</h3>
        <ul>
          <li><strong>Application Start Date:</strong> Usually opens in July-August</li>
          <li><strong>Last Date for Student Application:</strong> September-October (exact date varies)</li>
          <li><strong>Institute Verification Deadline:</strong> October-November</li>
          <li><strong>State Verification Deadline:</strong> November-December</li>
          <li><strong>Scholarship Disbursement:</strong> December-March (after all verifications)</li>
        </ul>

        <p><strong>⚠️ Important:</strong> Exact dates vary by state. Check your state's notification on the NSP portal regularly.</p>

        <h2>State-wise Variations</h2>
        <p>While the central scheme provides a framework, individual states may have additional provisions or modifications. Some common variations include:</p>
        <ul>
          <li><strong>Income Limits:</strong> Some states may have different income ceiling criteria</li>
          <li><strong>Additional Benefits:</strong> Certain states provide supplementary allowances</li>
          <li><strong>Application Deadlines:</strong> Vary significantly across states</li>
          <li><strong>Document Requirements:</strong> Additional state-specific documents may be required</li>
          <li><strong>Verification Process:</strong> Some states have additional verification stages</li>
        </ul>

        <p><strong>Recommendation:</strong> Always check your state's Social Welfare Department website or NSP portal for state-specific guidelines.</p>

        <h2>Frequently Asked Questions (FAQs)</h2>

        <h3>Q1: Can I apply if my family income is slightly above ₹2.5 lakhs?</h3>
        <p><strong>A:</strong> No, the income ceiling is strictly enforced. However, check if your state has any higher ceiling limits for state-specific schemes.</p>

        <h3>Q2: What if I don't have an Aadhaar card yet?</h3>
        <p><strong>A:</strong> Aadhaar is mandatory for scholarship disbursement through DBT. Apply for Aadhaar immediately and update your scholarship application once you receive it.</p>

        <h3>Q3: Can I receive this scholarship if I'm already receiving another scholarship?</h3>
        <p><strong>A:</strong> Generally, students cannot receive multiple scholarships for the same purpose. However, scholarships for different purposes (e.g., merit-based vs. need-based) may be combinable. Check specific scheme guidelines.</p>

        <h3>Q4: What happens if my application is rejected?</h3>
        <p><strong>A:</strong> You'll receive a notification with rejection reasons. You can correct errors and reapply if the application window is still open, or contact your District Social Welfare Officer for clarification.</p>

        <h3>Q5: How long does it take to receive the scholarship amount?</h3>
        <p><strong>A:</strong> After all verifications are complete, disbursement typically takes 30-60 days. The amount is directly transferred to the student's bank account linked with Aadhaar.</p>

        <h3>Q6: Can I track my scholarship application status?</h3>
        <p><strong>A:</strong> Yes, log in to NSP portal with your Application ID and password to check real-time application status and verification progress.</p>

        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>❌ <strong>Incorrect Aadhaar Details:</strong> Ensure Aadhaar number is entered correctly and matches exactly with your Aadhaar card</li>
          <li>❌ <strong>Bank Account Mismatch:</strong> Bank account should be in student's name and linked with Aadhaar for DBT</li>
          <li>❌ <strong>Poor Quality Documents:</strong> Upload clear, legible scanned copies; blurry documents lead to rejection</li>
          <li>❌ <strong>Incomplete Application:</strong> Fill all mandatory fields; incomplete applications are automatically rejected</li>
          <li>❌ <strong>Wrong Income Certificate:</strong> Income certificate should be recent (within 6 months) and from competent authority</li>
          <li>❌ <strong>Missing School Verification:</strong> Always submit hard copy documents to school for verification</li>
          <li>❌ <strong>Late Application:</strong> Apply well before deadline; last-minute applications often face technical issues</li>
        </ul>

        <h2>Tips for Successful Application:</h2>
        <ol>
          <li>✅ <strong>Start Early:</strong> Begin application process as soon as the portal opens</li>
          <li>✅ <strong>Keep Documents Ready:</strong> Prepare all required documents in advance</li>
          <li>✅ <strong>Aadhaar-Bank Linking:</strong> Ensure your Aadhaar is linked to your bank account before applying</li>
          <li>✅ <strong>Accurate Information:</strong> Double-check all entered details before submission</li>
          <li>✅ <strong>Follow Up:</strong> Regularly check application status and respond promptly to any queries</li>
          <li>✅ <strong>Contact School:</strong> Keep your school's scholarship coordinator informed about your application</li>
          <li>✅ <strong>Maintain Records:</strong> Keep copies of all submitted documents and application acknowledgment</li>
          <li>✅ <strong>Update Mobile/Email:</strong> Use active mobile number and email for receiving important notifications</li>
        </ol>

        <h2>Contact Information for Help</h2>
        <h3>National Scholarship Portal Helpdesk:</h3>
        <ul>
          <li><strong>Email:</strong> helpdesk@nsp.gov.in</li>
          <li><strong>Toll-Free Number:</strong> 0120-6619540 (10 AM to 6 PM, Monday to Friday)</li>
          <li><strong>Website:</strong> https://scholarships.gov.in</li>
        </ul>

        <h3>State-Level Contacts:</h3>
        <p>For state-specific queries, contact your District Social Welfare Officer or visit your state's Social Welfare Department website.</p>

        <h2>Conclusion</h2>
        <p>The Pre-Matric Scholarship Scheme for SC students is a valuable opportunity to ease the financial burden of education for economically disadvantaged families. By understanding the eligibility criteria, preparing documents in advance, and following the application process carefully, students can successfully secure this scholarship.</p>

        <p><strong>Remember:</strong> Education is your right, and scholarships like these are designed to ensure that financial constraints don't hinder your academic journey. Apply on time, provide accurate information, and take full advantage of this government initiative!</p>
        `,
        contentType: 'guide',
        category: 'scholarship-guide',
        tags: ['scholarships', 'pre-matric', 'sc-students', 'eligibility', 'application', 'nsp', 'financial-assistance'],
        language: 'en',
        difficulty: 'intermediate',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date(),
        featured: true,
        estimatedReadTime: 10,
        metaDescription: 'Complete guide to Pre-Matric Scholarships for SC students: eligibility, financial benefits, NSP application process, and success tips.',
        seoKeywords: ['pre-matric scholarship', 'sc students', 'scheduled caste scholarship', 'nsp portal', 'scholarship application']
      },
      {
        title: 'How to Check Your DBT Status Online: Complete Verification Guide',
        description: 'Comprehensive guide with 6 verification methods to check your DBT status online, including bank-specific procedures, PFMS portal access, and troubleshooting tips.',
        content: `
        <h2>Why Check Your DBT Status?</h2>
        <p>Knowing your Direct Benefit Transfer (DBT) status is crucial to ensure you're eligible to receive government scholarships and benefits directly into your bank account. Regular status checks help you:</p>
        <ul>
          <li>✅ Confirm your account is DBT-enabled and ready to receive funds</li>
          <li>✅ Identify and resolve issues before scholarship disbursement</li>
          <li>✅ Track the progress of your DBT enabling application</li>
          <li>✅ Ensure your Aadhaar-bank linking is active and verified</li>
          <li>✅ Avoid scholarship payment delays due to DBT-related problems</li>
        </ul>

        <p><strong>Important:</strong> DBT status is different from Aadhaar-bank linking status. Both must be active for successful scholarship transfers!</p>

        <h2>Method 1: Check Through PFMS Portal (Official Government Portal)</h2>
        <h3>Step-by-Step Process:</h3>
        <ol>
          <li><strong>Visit the PFMS Portal:</strong> Go to <strong>https://pfms.nic.in</strong></li>
          <li><strong>Navigate to "Know Your Payment":</strong> Look for the "Know Your Payment" or "Track Your Payment" option on the homepage</li>
          <li><strong>Select Verification Type:</strong> Choose "Bank Account" from the dropdown menu</li>
          <li><strong>Enter Bank Details:</strong>
            <ul>
              <li>Bank Name</li>
              <li>Account Number</li>
              <li>Confirm Account Number</li>
            </ul>
          </li>
          <li><strong>Enter Captcha Code:</strong> Type the security code displayed on screen</li>
          <li><strong>Click "Search":</strong> Submit your query to check DBT status</li>
        </ol>

        <h3>Understanding PFMS Results:</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Status Message</th>
              <th>Meaning</th>
              <th>Action Required</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>"Account is Active"</strong></td>
              <td>DBT enabled successfully</td>
              <td>✅ No action needed - ready to receive benefits</td>
            </tr>
            <tr>
              <td><strong>"Account Not Found"</strong></td>
              <td>Account not registered in PFMS</td>
              <td>⚠️ Apply for DBT enabling at your bank</td>
            </tr>
            <tr>
              <td><strong>"Invalid Account Number"</strong></td>
              <td>Incorrect account details entered</td>
              <td>🔄 Re-enter correct account number and try again</td>
            </tr>
            <tr>
              <td><strong>"Under Verification"</strong></td>
              <td>Application is being processed</td>
              <td>⏳ Wait 7-10 days and check again</td>
            </tr>
          </tbody>
        </table>

        <h2>Method 2: Check via National Scholarship Portal (NSP)</h2>
        <h3>For Students Applying for Scholarships:</h3>
        <ol>
          <li><strong>Login to NSP:</strong> Visit <strong>https://scholarships.gov.in</strong> and log in with your credentials</li>
          <li><strong>Go to Dashboard:</strong> Navigate to your student dashboard</li>
          <li><strong>Check Account Status:</strong> Look for "Bank Account Verification Status" section</li>
          <li><strong>View DBT Details:</strong> The portal will show if your account is DBT-compliant</li>
        </ol>

        <h3>Status Indicators on NSP:</h3>
        <ul>
          <li><strong>Green Tick (✅):</strong> Account verified and DBT-enabled</li>
          <li><strong>Yellow Warning (⚠️):</strong> Pending verification - action may be needed</li>
          <li><strong>Red Cross (❌):</strong> Account not DBT-enabled or verification failed</li>
        </ul>

        <h2>Method 3: Bank-Specific Online Verification</h2>
        <h3>Using Your Bank's Net Banking Portal:</h3>

        <h4>For State Bank of India (SBI):</h4>
        <ol>
          <li>Login to SBI Online Banking</li>
          <li>Go to "e-Services" → "Aadhaar Services"</li>
          <li>Select "Check Aadhaar-Account Linking Status"</li>
          <li>View DBT enablement details</li>
        </ol>

        <h4>For HDFC Bank:</h4>
        <ol>
          <li>Login to HDFC NetBanking</li>
          <li>Navigate to "Enquiries" → "Service Requests"</li>
          <li>Select "Aadhaar Linking Status"</li>
          <li>Check if DBT services are active</li>
        </ol>

        <h4>For ICICI Bank:</h4>
        <ol>
          <li>Login to ICICI iMobile or NetBanking</li>
          <li>Go to "Accounts" → "Account Details"</li>
          <li>Check "Government Schemes" section</li>
          <li>Verify DBT status indicator</li>
        </ol>

        <h4>For Punjab National Bank (PNB):</h4>
        <ol>
          <li>Login to PNB Internet Banking</li>
          <li>Navigate to "Aadhaar Services"</li>
          <li>Select "Aadhaar Seeding Status"</li>
          <li>View DBT enablement confirmation</li>
        </ol>

        <h4>For Canara Bank:</h4>
        <ol>
          <li>Login to Canara Bank Net Banking</li>
          <li>Go to "Services" → "Aadhaar"</li>
          <li>Click "Check Aadhaar Status"</li>
          <li>Review DBT activation details</li>
        </ol>

        <h3>General Steps for Other Banks:</h3>
        <p>If your bank is not listed above, follow these general steps:</p>
        <ol>
          <li>Login to your bank's net banking portal</li>
          <li>Look for sections like:
            <ul>
              <li>"Aadhaar Services"</li>
              <li>"Government Schemes"</li>
              <li>"DBT Services"</li>
              <li>"e-Services"</li>
              <li>"Service Requests"</li>
            </ul>
          </li>
          <li>Select "Check Aadhaar Linking" or "DBT Status"</li>
          <li>View your account's DBT enablement status</li>
        </ol>

        <h2>Method 4: Check via Mobile Banking Apps</h2>
        <h3>Using Your Bank's Mobile App:</h3>
        <ol>
          <li><strong>Open Mobile Banking App:</strong> Launch your bank's official mobile app</li>
          <li><strong>Navigate to Services:</strong> Look for "Services" or "More Options" menu</li>
          <li><strong>Find Aadhaar/DBT Section:</strong> Locate "Aadhaar Services" or "Government Schemes"</li>
          <li><strong>Check Status:</strong> Select "Check DBT Status" or "Aadhaar Linking Status"</li>
          <li><strong>View Results:</strong> App will display your current DBT enablement status</li>
        </ol>

        <h3>Advantages of Mobile App Verification:</h3>
        <ul>
          <li>✅ Quick and convenient - check anytime, anywhere</li>
          <li>✅ Real-time status updates</li>
          <li>✅ Easy to take screenshots for records</li>
          <li>✅ Push notifications for status changes (some banks)</li>
        </ul>

        <h2>Method 5: Visit Bank Branch for Physical Verification</h2>
        <h3>When to Choose This Method:</h3>
        <ul>
          <li>Unable to access online banking</li>
          <li>Conflicting information from different sources</li>
          <li>Need official written confirmation</li>
          <li>Want to resolve issues immediately</li>
        </ul>

        <h3>What to Bring:</h3>
        <ul>
          <li>✅ Original Aadhaar Card</li>
          <li>✅ Bank Passbook or Cheque Book</li>
          <li>✅ Identity Proof</li>
          <li>✅ Mobile phone (for OTP verification)</li>
        </ul>

        <h3>What to Ask:</h3>
        <ol>
          <li>"Is my account DBT-enabled?"</li>
          <li>"What is my account's PFMS registration status?"</li>
          <li>"Is my Aadhaar linked and verified for DBT?"</li>
          <li>"Can I get written confirmation of DBT status?"</li>
        </ol>

        <h2>Method 6: Call Bank Customer Care</h2>
        <h3>Telephone Verification Process:</h3>
        <ol>
          <li><strong>Call Customer Care:</strong> Dial your bank's customer service number (usually printed on debit card)</li>
          <li><strong>Navigate IVR Menu:</strong> Select options for:
            <ul>
              <li>"Aadhaar Services" or</li>
              <li>"Government Schemes" or</li>
              <li>"Speak to Representative"</li>
            </ul>
          </li>
          <li><strong>Verify Identity:</strong> Provide:
            <ul>
              <li>Account number</li>
              <li>Registered mobile number</li>
              <li>Date of birth</li>
              <li>Aadhaar number (last 4 digits)</li>
            </ul>
          </li>
          <li><strong>Request DBT Status:</strong> Ask "Is my account DBT-enabled and ready to receive scholarship benefits?"</li>
          <li><strong>Note Reference Number:</strong> Write down the call reference number for future follow-ups</li>
        </ol>

        <h3>Major Banks Customer Care Numbers:</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Customer Care Number</th>
              <th>Timing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>State Bank of India (SBI)</td>
              <td>1800-11-2211 / 1800-425-3800</td>
              <td>24x7</td>
            </tr>
            <tr>
              <td>HDFC Bank</td>
              <td>1800-202-6161</td>
              <td>24x7</td>
            </tr>
            <tr>
              <td>ICICI Bank</td>
              <td>1860-120-7777</td>
              <td>24x7</td>
            </tr>
            <tr>
              <td>Punjab National Bank</td>
              <td>1800-180-2222</td>
              <td>24x7</td>
            </tr>
            <tr>
              <td>Bank of Baroda</td>
              <td>1800-258-4455</td>
              <td>24x7</td>
            </tr>
            <tr>
              <td>Canara Bank</td>
              <td>1800-425-0018</td>
              <td>24x7</td>
            </tr>
          </tbody>
        </table>

        <h2>Troubleshooting Common Issues</h2>

        <h3>Issue 1: "Account Not Found" in PFMS</h3>
        <p><strong>Possible Causes:</strong></p>
        <ul>
          <li>DBT not enabled for your account</li>
          <li>Recent account opening (not yet updated in PFMS)</li>
          <li>Incorrect account number entered</li>
        </ul>
        <p><strong>Solutions:</strong></p>
        <ol>
          <li>Verify you entered the correct account number</li>
          <li>Check with your bank if DBT enabling is complete</li>
          <li>Wait 7-10 days if you recently applied for DBT</li>
          <li>Visit branch to initiate DBT enabling if not done</li>
        </ol>

        <h3>Issue 2: Status Shows "Under Verification" for Long Time</h3>
        <p><strong>Possible Causes:</strong></p>
        <ul>
          <li>Pending documentation</li>
          <li>Name mismatch between Aadhaar and bank account</li>
          <li>System processing delays</li>
        </ul>
        <p><strong>Solutions:</strong></p>
        <ol>
          <li>Contact bank to check pending requirements</li>
          <li>Verify name matches exactly on Aadhaar and bank records</li>
          <li>Submit any missing documents immediately</li>
          <li>Follow up every 7 days until resolved</li>
        </ol>

        <h3>Issue 3: Different Status on Different Platforms</h3>
        <p><strong>Possible Causes:</strong></p>
        <ul>
          <li>Different systems update at different times</li>
          <li>Recent status changes not yet synchronized</li>
          <li>Technical glitches on specific platforms</li>
        </ul>
        <p><strong>Solutions:</strong></p>
        <ol>
          <li>Always verify on PFMS portal (official source)</li>
          <li>Check bank's official channels for confirmation</li>
          <li>Visit branch for authoritative written confirmation</li>
          <li>Allow 24-48 hours for system synchronization</li>
        </ol>

        <h3>Issue 4: DBT Shows Active But Scholarship Payment Failed</h3>
        <p><strong>Possible Causes:</strong></p>
        <ul>
          <li>Inactive or frozen bank account</li>
          <li>KYC not completed or expired</li>
          <li>Account number mismatch in scholarship application</li>
          <li>Bank IFSC code changed</li>
        </ul>
        <p><strong>Solutions:</strong></p>
        <ol>
          <li>Verify account is active and operational</li>
          <li>Complete/update KYC at your bank</li>
          <li>Double-check account number in scholarship portal</li>
          <li>Update IFSC code if bank branch changed</li>
          <li>Contact scholarship portal helpdesk with transaction details</li>
        </ol>

        <h2>Important Tips for Successful Verification</h2>

        <h3>Do's:</h3>
        <ul>
          <li>✅ Check DBT status regularly, especially before scholarship deadlines</li>
          <li>✅ Use official websites and apps only (avoid third-party sites)</li>
          <li>✅ Keep screenshots of verification results for your records</li>
          <li>✅ Verify status on multiple platforms for confirmation</li>
          <li>✅ Note down reference numbers from customer care calls</li>
          <li>✅ Follow up promptly if issues are detected</li>
          <li>✅ Maintain updated contact details (mobile, email) with bank</li>
        </ul>

        <h3>Don'ts:</h3>
        <ul>
          <li>❌ Don't share OTPs or passwords with anyone claiming to "help"</li>
          <li>❌ Don't trust unofficial third-party verification websites</li>
          <li>❌ Don't ignore "Under Verification" status for too long</li>
          <li>❌ Don't assume DBT is active without proper verification</li>
          <li>❌ Don't wait until scholarship disbursement time to check</li>
          <li>❌ Don't rely on single verification method - cross-check</li>
        </ul>

        <h2>When Should You Check Your DBT Status?</h2>

        <h3>Recommended Checking Schedule:</h3>
        <ol>
          <li><strong>After Opening New Bank Account:</strong> Check within 7 days to ensure DBT is enabled</li>
          <li><strong>Before Applying for Scholarships:</strong> Verify status 2-3 weeks before application deadline</li>
          <li><strong>After Aadhaar Linking:</strong> Check within 10 days of linking Aadhaar to account</li>
          <li><strong>During Scholarship Application:</strong> Verify at time of filling application form</li>
          <li><strong>Before Disbursement Period:</strong> Check 1-2 weeks before expected scholarship payment</li>
          <li><strong>After Any Bank Account Changes:</strong> Verify within 7 days of any updates</li>
        </ol>

        <h2>What to Do After Confirming DBT Active Status?</h2>

        <h3>Next Steps:</h3>
        <ol>
          <li>✅ <strong>Take Screenshot:</strong> Capture proof of active DBT status</li>
          <li>✅ <strong>Update Scholarship Portals:</strong> Ensure account details match on all scholarship applications</li>
          <li>✅ <strong>Verify Account Details:</strong> Double-check account number and IFSC code</li>
          <li>✅ <strong>Keep Documents Ready:</strong> Maintain copies of verification proof</li>
          <li>✅ <strong>Monitor Regularly:</strong> Check status monthly to catch any issues early</li>
          <li>✅ <strong>Inform School/College:</strong> Provide verification proof if requested</li>
        </ol>

        <h2>Contact Information for Help</h2>

        <h3>PFMS Helpdesk:</h3>
        <ul>
          <li><strong>Email:</strong> helpdesk-pfms@nic.in</li>
          <li><strong>Phone:</strong> 1800-118-111 / 01123343860</li>
          <li><strong>Timing:</strong> 9:30 AM to 6:00 PM (Monday to Friday)</li>
        </ul>

        <h3>National Scholarship Portal:</h3>
        <ul>
          <li><strong>Email:</strong> helpdesk@nsp.gov.in</li>
          <li><strong>Toll-Free:</strong> 0120-6619540</li>
          <li><strong>Timing:</strong> 10:00 AM to 6:00 PM (Monday to Friday)</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Checking your DBT status is a simple but crucial step in ensuring you receive government scholarships and benefits without delays. By using the methods outlined in this guide, you can easily verify your DBT status and address any issues proactively.</p>

        <p><strong>Key Takeaway:</strong> Don't wait for problems to arise during scholarship disbursement. Regular DBT status checks help you stay prepared and ensure smooth receipt of your entitled benefits. If you encounter any issues, don't hesitate to reach out to your bank or the relevant helpdesk for assistance.</p>

        <p><strong>Remember:</strong> A little effort in verification today can save you from significant payment delays tomorrow!</p>
        `,
        contentType: 'guide',
        category: 'troubleshooting',
        tags: ['dbt-status', 'verification', 'pfms', 'online-check', 'bank-account', 'troubleshooting'],
        language: 'en',
        difficulty: 'beginner',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date(),
        featured: true,
        estimatedReadTime: 12,
        metaDescription: 'Learn 6 methods to check your DBT status online: PFMS portal, NSP, bank portals, mobile apps, and more. Includes troubleshooting tips.',
        seoKeywords: ['dbt status check', 'pfms verification', 'check dbt online', 'bank account verification', 'scholarship payment status']
      },
      {
        title: 'Troubleshooting Common Aadhaar and DBT Issues',
        description: 'Solutions to frequently encountered problems with Aadhaar linking, DBT transfers, and scholarship applications.',
        content: `
        <h2>Common Issues and Their Solutions</h2>
        <p>Students often face various challenges while linking Aadhaar, applying for scholarships, or receiving DBT benefits. Here are the most common issues and their solutions.</p>

        <h3>Aadhaar Related Issues</h3>

        <h4>Issue 1: Name Mismatch Between Aadhaar and Bank Account</h4>
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Update your name in Aadhaar to match bank records, OR</li>
          <li>Update your name in bank account to match Aadhaar</li>
          <li>Visit UIDAI enrollment center with supporting documents</li>
          <li>Use online Aadhaar update service</li>
          <li>Allow 15-20 days for processing</li>
        </ol>

        <h4>Issue 2: Mobile Number Not Linked to Aadhaar</h4>
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Visit nearest Aadhaar enrollment center</li>
          <li>Carry original Aadhaar card and mobile phone</li>
          <li>Fill mobile number update form</li>
          <li>Verify through OTP</li>
          <li>Service is free of charge</li>
        </ol>

        <h4>Issue 3: Address Update in Aadhaar</h4>
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Use online Aadhaar update portal</li>
          <li>Upload address proof documents</li>
          <li>Pay ₹50 processing fee</li>
          <li>Track status using URN number</li>
          <li>Updated Aadhaar will be delivered by post</li>
        </ol>

        <h3>Bank Linking Issues</h3>

        <h4>Issue 1: Aadhaar Not Getting Linked to Bank Account</h4>
        <p><strong>Possible Reasons and Solutions:</strong></p>
        <ul>
          <li><strong>Name Mismatch:</strong> Ensure exact name match</li>
          <li><strong>Inactive Account:</strong> Reactivate your bank account</li>
          <li><strong>Technical Issues:</strong> Try linking through different methods</li>
          <li><strong>Bank Branch Visit:</strong> Visit branch for manual verification</li>
        </ul>

        <h4>Issue 2: Multiple Bank Accounts Linked</h4>
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Check NPCI website for linked accounts</li>
          <li>De-link unwanted accounts</li>
          <li>Keep only active primary account linked</li>
          <li>Contact bank customer care if needed</li>
        </ol>

        <h3>Scholarship Application Issues</h3>

        <h4>Issue 1: Unable to Register on NSP Portal</h4>
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Clear browser cache and cookies</li>
          <li>Try different browsers (Chrome, Firefox)</li>
          <li>Check internet connectivity</li>
          <li>Try during off-peak hours</li>
          <li>Contact NSP helpdesk: 0120-6619540</li>
        </ol>

        <h4>Issue 2: Document Upload Failure</h4>
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Ensure document size is under 200KB</li>
          <li>Use PDF or JPG format only</li>
          <li>Scan documents clearly</li>
          <li>Check file name for special characters</li>
          <li>Try uploading one document at a time</li>
        </ol>

        <h4>Issue 3: Application Status Shows 'Rejected'</h4>
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Check rejection reason in application</li>
          <li>Correct the mentioned issues</li>
          <li>Contact institution for clarification</li>
          <li>Re-apply if correction window is available</li>
          <li>Submit appeal if rejection seems incorrect</li>
        </ol>

        <h3>DBT Payment Issues</h3>

        <h4>Issue 1: Scholarship Amount Not Credited</h4>
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Check application status on NSP portal</li>
          <li>Verify if Aadhaar is properly linked to bank</li>
          <li>Contact bank for payment status</li>
          <li>Check with institution's scholarship cell</li>
          <li>File complaint on PFMS portal if needed</li>
        </ol>

        <h4>Issue 2: Payment Credited to Wrong Account</h4>
        <p><strong>Solution:</strong></p>
        <ol>
          <li>Check all linked bank accounts</li>
          <li>Contact the bank where money was credited</li>
          <li>Request bank to reverse transaction</li>
          <li>Update correct account details in application</li>
          <li>File complaint with PFMS</li>
        </ol>

        <h3>General Tips</h3>
        <ul>
          <li><strong>Keep Records:</strong> Maintain copies of all documents and receipts</li>
          <li><strong>Regular Updates:</strong> Keep Aadhaar and bank details updated</li>
          <li><strong>Multiple Channels:</strong> Try different methods if one doesn't work</li>
          <li><strong>Patience:</strong> Allow sufficient time for processing</li>
          <li><strong>Help Available:</strong> Use official helpline numbers and support</li>
        </ul>

        <h3>Important Contact Numbers</h3>
        <ul>
          <li><strong>Aadhaar Helpline:</strong> 1947</li>
          <li><strong>NSP Helpdesk:</strong> 0120-6619540</li>
          <li><strong>PFMS Helpline:</strong> 1800-118-111</li>
          <li><strong>Banking Ombudsman:</strong> 14448</li>
        </ul>
        `,
        contentType: 'guide',
        category: 'troubleshooting',
        tags: ['troubleshooting', 'issues', 'solutions', 'help', 'support'],
        language: 'en',
        difficulty: 'intermediate',
        author: adminUser._id,
        isPublished: true,
        publishedAt: new Date(),
        featured: false,
        estimatedReadTime: 15,
        metaDescription: 'Comprehensive troubleshooting guide for common Aadhaar, DBT, and scholarship application issues with step-by-step solutions.'
      }
    ];

    // Insert sample content
    for (const contentData of sampleContent) {
      await Content.create(contentData);
    }

    console.log('Sample content created...');
    console.log('\n✅ Database seeded successfully!');
    console.log('\nCreated:');
    console.log('- 1 Admin user (admin@dbtaware.gov.in / Admin@123)');
    console.log('- 5 Sample articles and guides');
    console.log('\nYou can now start the application and test the features.');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

const runSeeder = async () => {
  await connectDB();
  await seedData();
};

runSeeder();