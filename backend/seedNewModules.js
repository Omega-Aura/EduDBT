const mongoose = require('mongoose');
require('dotenv').config();

const Content = require('./src/models/Content');
const User = require('./src/models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding new modules...');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const seedNewModules = async () => {
  try {
    // Find admin user to set as author
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.error('Admin user not found! Please run seedData.js first.');
      process.exit(1);
    }

    console.log('Admin user found, proceeding with content creation...');

    const newModules = [
      // Module 1: Troubleshooting Common Aadhaar and DBT Issues
      {
        title: 'Troubleshooting Common Aadhaar and DBT Issues',
        description: 'Solve everyday problems that students face when linking Aadhaar with bank accounts and applying for scholarships. Get practical solutions to common errors.',
        content: `
        <h2>What is this module about?</h2>
        <p>This section helps you solve everyday problems that students face when linking their Aadhaar with bank accounts and applying for scholarships.</p>

        <h2>Why do you need this?</h2>
        <ul>
          <li>Many students get stuck when their scholarship applications are rejected</li>
          <li>Sometimes your Aadhaar doesn't link properly with your bank account</li>
          <li>You might face errors during the application process</li>
        </ul>

        <h2>Common Problems and Simple Solutions</h2>

        <h3>Problem 1: "My Aadhaar is not linking with my bank account"</h3>
        <p><strong>Symptoms:</strong></p>
        <ul>
          <li>Error message during linking process</li>
          <li>OTP verification fails</li>
          <li>System shows "details not found"</li>
        </ul>

        <p><strong>Solutions:</strong></p>
        <ol>
          <li><strong>Check Name Matching:</strong>
            <ul>
              <li>Your name must match exactly on both Aadhaar card and bank account</li>
              <li>Even a single letter difference will cause failure</li>
              <li>Check for middle names, initials, or spelling variations</li>
            </ul>
          </li>
          <li><strong>Visit Bank Branch:</strong>
            <ul>
              <li>Take your original Aadhaar card to the bank</li>
              <li>Ask the bank officer to manually verify and link</li>
              <li>Get a receipt with reference number</li>
            </ul>
          </li>
          <li><strong>Update Mobile Number:</strong>
            <ul>
              <li>Ensure your mobile number is registered with both Aadhaar and bank</li>
              <li>Same mobile number must be linked to both</li>
              <li>Update if numbers are different</li>
            </ul>
          </li>
        </ol>

        <h3>Problem 2: "My scholarship application was rejected"</h3>
        <p><strong>Common Reasons:</strong></p>
        <ul>
          <li>Bank account doesn't have DBT enabled (not just Aadhaar linked)</li>
          <li>Documents are unclear or incorrectly uploaded</li>
          <li>Income certificate is expired or invalid</li>
          <li>Application filled incorrectly</li>
        </ul>

        <p><strong>Step-by-Step Fix:</strong></p>
        <ol>
          <li><strong>Check DBT Status:</strong>
            <ul>
              <li>Visit pfms.nic.in</li>
              <li>Go to "Know Your Payment" section</li>
              <li>Enter your Aadhaar and account number</li>
              <li>Verify status shows "Active" or "DBT Enabled"</li>
            </ul>
          </li>
          <li><strong>Verify Documents:</strong>
            <ul>
              <li>Check if all documents are clearly scanned</li>
              <li>File size should be under 2 MB each</li>
              <li>Use PDF format for documents</li>
              <li>Ensure all text is readable</li>
            </ul>
          </li>
          <li><strong>Income Certificate Check:</strong>
            <ul>
              <li>Certificate should not be older than 1 year</li>
              <li>Must be from competent authority</li>
              <li>Digitally signed certificates preferred</li>
              <li>Get new certificate if expired</li>
            </ul>
          </li>
        </ol>

        <h3>Problem 3: "I'm getting error messages on the portal"</h3>
        <p><strong>Common Errors and Fixes:</strong></p>

        <h4>Error: "Session Timeout" or "Page Not Responding"</h4>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Clear browser cookies and cache</li>
          <li>Close and reopen the browser</li>
          <li>Try using Chrome or Firefox browser</li>
          <li>Check your internet connection</li>
        </ul>

        <h4>Error: "Invalid Login Credentials"</h4>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Check if CAPS LOCK is on</li>
          <li>Verify username and password carefully</li>
          <li>Use "Forgot Password" option to reset</li>
          <li>Clear browser cache before trying again</li>
        </ul>

        <h4>Error: "Document Upload Failed"</h4>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Reduce file size to under 2 MB</li>
          <li>Convert images to PDF format</li>
          <li>Check file is not corrupted</li>
          <li>Try uploading one document at a time</li>
        </ul>

        <h4>Error: "Aadhaar Verification Failed"</h4>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Verify you entered correct 12-digit Aadhaar number</li>
          <li>Check if Aadhaar is active (not cancelled)</li>
          <li>Ensure name matches with Aadhaar records</li>
          <li>Try verification after 24 hours</li>
        </ul>

        <h2>Quick Action Steps</h2>
        <div class="alert alert-info">
          <h4>Before Contacting Support:</h4>
          <ul>
            <li>✅ Take clear screenshots of error messages</li>
            <li>✅ Note down date, time, and reference numbers</li>
            <li>✅ Keep all original documents ready</li>
            <li>✅ Write down steps you already tried</li>
          </ul>
        </div>

        <h2>Helpline Numbers and Support</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Service</th>
              <th>Contact Number</th>
              <th>Timings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>National Scholarship Portal</td>
              <td>0120-6619540</td>
              <td>10 AM - 6 PM (Mon-Fri)</td>
            </tr>
            <tr>
              <td>UIDAI (Aadhaar)</td>
              <td>1947</td>
              <td>24x7</td>
            </tr>
            <tr>
              <td>PFMS Helpline</td>
              <td>1800-118-001</td>
              <td>10 AM - 5 PM (Mon-Fri)</td>
            </tr>
            <tr>
              <td>Your Bank Customer Care</td>
              <td>Check bank website</td>
              <td>24x7 (Most banks)</td>
            </tr>
          </tbody>
        </table>

        <h2>When to Visit Which Office</h2>
        <h3>Visit Bank Branch When:</h3>
        <ul>
          <li>Aadhaar linking fails multiple times</li>
          <li>DBT status shows as inactive</li>
          <li>Account details need correction</li>
          <li>Require physical verification</li>
        </ul>

        <h3>Visit Aadhaar Center When:</h3>
        <ul>
          <li>Need to update name or address</li>
          <li>Mobile number update required</li>
          <li>Biometric update needed</li>
          <li>Aadhaar card reprint required</li>
        </ul>

        <h3>Contact Scholarship Portal When:</h3>
        <ul>
          <li>Application status shows error</li>
          <li>Document verification pending for long</li>
          <li>Payment not received after approval</li>
          <li>Need to reapply after rejection</li>
        </ul>

        <h2>Prevention Tips</h2>
        <div class="alert alert-success">
          <h4>To Avoid Common Problems:</h4>
          <ul>
            <li>🎯 Complete Aadhaar linking at least 1 month before applying</li>
            <li>🎯 Enable DBT at least 2 weeks before scholarship deadline</li>
            <li>🎯 Keep all documents updated and valid</li>
            <li>🎯 Use same mobile number for all services</li>
            <li>🎯 Maintain photocopies of all documents</li>
            <li>🎯 Apply early, don't wait for last date</li>
          </ul>
        </div>
        `,
        category: 'troubleshooting',
        contentType: 'guide',
        author: adminUser._id,
        difficulty: 'beginner',
        readingTime: 15,
        featured: true,
        isPublished: true,
        tags: ['troubleshooting', 'aadhaar-linking', 'dbt', 'scholarship', 'common-issues', 'error-fixes'],
        metaDescription: 'Comprehensive troubleshooting guide for common Aadhaar and DBT issues faced by students during scholarship applications.',
        language: 'en',
        viewCount: 0
      },

      // Module 2: How to Check Your DBT Status Online
      {
        title: 'How to Check Your DBT Status Online - Complete Verification Guide',
        description: 'Step-by-step guide to check if your bank account is ready to receive government scholarships through Direct Benefit Transfer (DBT). Learn multiple verification methods.',
        content: `
        <h2>What is DBT Status?</h2>
        <p>DBT (Direct Benefit Transfer) status tells you if your bank account is ready to receive government scholarships directly. It's like a green signal that confirms your account is properly configured in the government's payment system.</p>

        <h2>Why is this important?</h2>
        <div class="alert alert-warning">
          <h4>Critical Reasons:</h4>
          <ul>
            <li>❌ <strong>Without proper DBT status, your scholarship money cannot reach your account</strong></li>
            <li>✅ You can track if your application is being processed</li>
            <li>✅ Helps you know what steps to take next</li>
            <li>✅ Prevents last-minute panic before deadlines</li>
            <li>✅ Ensures smooth scholarship disbursement</li>
          </ul>
        </div>

        <h2>Method 1: Using Government PFMS Website</h2>
        <p>This is the most official and reliable method to check your DBT status.</p>

        <h3>Step-by-Step Instructions:</h3>
        <ol>
          <li><strong>Open the Official Website:</strong>
            <ul>
              <li>Go to <code>pfms.nic.in</code> in your browser</li>
              <li>This is the Public Financial Management System website</li>
              <li>It's a government website (notice .nic.in domain)</li>
            </ul>
          </li>
          <li><strong>Navigate to Payment Section:</strong>
            <ul>
              <li>Look for "Know Your Payment" section on homepage</li>
              <li>OR find "Track Your Payment/Receipt" option</li>
              <li>Click on it to proceed</li>
            </ul>
          </li>
          <li><strong>Enter Your Details:</strong>
            <ul>
              <li>Enter your 12-digit Aadhaar number</li>
              <li>Enter your bank account number (without spaces)</li>
              <li>Select your bank name from dropdown</li>
              <li>Enter the captcha code shown</li>
            </ul>
          </li>
          <li><strong>Submit and View Status:</strong>
            <ul>
              <li>Click "Submit" button</li>
              <li>Wait for page to load (may take 10-15 seconds)</li>
              <li>Your DBT status will be displayed</li>
            </ul>
          </li>
        </ol>

        <div class="alert alert-info">
          <strong>Pro Tip:</strong> If the website is slow, try accessing it early morning (6-8 AM) or late evening (after 8 PM) when traffic is less.
        </div>

        <h2>Method 2: Using Your Bank's Website/App</h2>
        <p>Most major banks now provide DBT status checking through their internet banking.</p>

        <h3>For Internet Banking:</h3>
        <ol>
          <li><strong>Login to Your Account:</strong>
            <ul>
              <li>Go to your bank's internet banking website</li>
              <li>Enter your username and password</li>
              <li>Complete two-factor authentication</li>
            </ul>
          </li>
          <li><strong>Find DBT Services:</strong>
            <ul>
              <li>Look for "Government Schemes" menu</li>
              <li>OR search for "Aadhaar Services"</li>
              <li>OR check under "My Account" section</li>
            </ul>
          </li>
          <li><strong>Check Status:</strong>
            <ul>
              <li>Click on "DBT Status" or "Check DBT Status"</li>
              <li>Your current status will be displayed</li>
              <li>You may also see last verification date</li>
            </ul>
          </li>
        </ol>

        <h3>For Mobile Banking App:</h3>
        <ol>
          <li>Open your bank's mobile app</li>
          <li>Login with your credentials</li>
          <li>Go to "Services" or "More" menu</li>
          <li>Find "Aadhaar" or "DBT" option</li>
          <li>Click "Check Status"</li>
        </ol>

        <h2>Method 3: SMS Check (Bank-Specific)</h2>
        <p>Some banks allow checking DBT status via SMS. Here are formats for major banks:</p>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>SMS Format</th>
              <th>Send To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>State Bank of India</td>
              <td>DBT [Account Number]</td>
              <td>09223488888</td>
            </tr>
            <tr>
              <td>Bank of Baroda</td>
              <td>DBTSTS [Account Number]</td>
              <td>8422009988</td>
            </tr>
            <tr>
              <td>Punjab National Bank</td>
              <td>AADHAR [Account Number]</td>
              <td>5607040</td>
            </tr>
            <tr>
              <td>HDFC Bank</td>
              <td>Check on app/net banking</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>

        <p><em>Note: SMS services may not be available for all banks. Contact your bank's customer care for specific details.</em></p>

        <h2>Understanding Your Status Results</h2>

        <h3>✅ Status: "Active" or "DBT Enabled"</h3>
        <p><strong>What it means:</strong></p>
        <ul>
          <li>Your account is fully ready to receive scholarships</li>
          <li>All verification is complete</li>
          <li>You can apply for schemes with confidence</li>
        </ul>
        <p><strong>What to do:</strong></p>
        <ul>
          <li>Proceed with scholarship applications</li>
          <li>No additional action required</li>
          <li>Keep checking periodically to ensure status remains active</li>
        </ul>

        <h3>⏳ Status: "Under Process" or "Pending Verification"</h3>
        <p><strong>What it means:</strong></p>
        <ul>
          <li>Your DBT enabling request is being processed</li>
          <li>System verification is in progress</li>
          <li>Should be completed within 3-7 working days</li>
        </ul>
        <p><strong>What to do:</strong></p>
        <ul>
          <li>Wait for 7 working days</li>
          <li>Check status again after a week</li>
          <li>Don't apply for any DBT immediately</li>
          <li>If still pending after 10 days, contact bank</li>
        </ul>

        <h3>❌ Status: "Not Found" or "Inactive" or "Not Enabled"</h3>
        <p><strong>What it means:</strong></p>
        <ul>
          <li>DBT is not enabled for your account</li>
          <li>Account not registered in PFMS system</li>
          <li>You cannot receive government benefits yet</li>
        </ul>
        <p><strong>What to do:</strong></p>
        <ul>
          <li>Visit your bank branch immediately</li>
          <li>Fill DBT enabling form</li>
          <li>Submit required documents</li>
          <li>Get reference number for tracking</li>
        </ul>

        <h3>⚠️ Status: "Details Mismatch" or "Verification Failed"</h3>
        <p><strong>What it means:</strong></p>
        <ul>
          <li>Your details don't match between systems</li>
          <li>Name, account number, or Aadhaar has issues</li>
          <li>Requires correction</li>
        </ul>
        <p><strong>What to do:</strong></p>
        <ul>
          <li>Check if you entered correct details</li>
          <li>Verify account number is correct</li>
          <li>Ensure Aadhaar number is accurate</li>
          <li>Visit bank if problem persists</li>
        </ul>

        <h2>Troubleshooting Common Issues</h2>

        <h3>Issue: Website showing "Server Error" or not loading</h3>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Try accessing during non-peak hours</li>
          <li>Clear browser cache and cookies</li>
          <li>Use a different browser</li>
          <li>Check your internet connection</li>
        </ul>

        <h3>Issue: "Aadhaar number not found in database"</h3>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Verify you entered correct Aadhaar number</li>
          <li>Check if Aadhaar is linked to bank account</li>
          <li>Ensure there are no spaces in Aadhaar number</li>
          <li>Wait 24 hours after Aadhaar linking and try again</li>
        </ul>

        <h3>Issue: "Account number not recognized"</h3>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Use account number from bank passbook/statement</li>
          <li>Remove any spaces or special characters</li>
          <li>Try with zeros if account number is shorter</li>
          <li>Contact bank to verify account number format</li>
        </ul>

        <h2>What to Do After Checking Status</h2>

        <h3>If Status is Active:</h3>
        <ol>
          <li>✅ Take a screenshot for your records</li>
          <li>✅ Note down the date of verification</li>
          <li>✅ Proceed with scholarship application</li>
          <li>✅ Check status monthly to ensure it stays active</li>
        </ol>

        <h3>If Status is Not Active:</h3>
        <ol>
          <li>📋 Visit your bank branch with documents</li>
          <li>📋 Fill DBT enabling application</li>
          <li>📋 Get acknowledgment receipt</li>
          <li>📋 Wait 7 working days</li>
          <li>📋 Check status again</li>
          <li>📋 Follow up if still not active</li>
        </ol>

        <h2>Important Tips</h2>
        <div class="alert alert-success">
          <h4>Best Practices:</h4>
          <ul>
            <li>🎯 Check DBT status at least 2 weeks before applying for scholarships</li>
            <li>🎯 Keep checking status every month even after it's active</li>
            <li>🎯 Take screenshots each time you check for future reference</li>
            <li>🎯 Update your mobile number with both bank and Aadhaar</li>
            <li>🎯 Don't wait for last moment before scholarship deadlines</li>
            <li>🎯 Save the PFMS website link in your bookmarks</li>
          </ul>
        </div>

        <h2>Frequently Asked Questions</h2>

        <h3>Q1: How often should I check my DBT status?</h3>
        <p><strong>A:</strong> Check once a month if it's active. Check daily if it's under process.</p>

        <h3>Q2: Can DBT status change from active to inactive?</h3>
        <p><strong>A:</strong> Rarely, but yes. This can happen if there are changes in your account or Aadhaar details. Regular checking helps catch this early.</p>

        <h3>Q3: Is there a charge for checking DBT status?</h3>
        <p><strong>A:</strong> No, checking DBT status is completely free on all platforms.</p>

        <h3>Q4: What if my bank is not listed on PFMS website?</h3>
        <p><strong>A:</strong> Contact your bank's customer care. They can verify if your bank is part of the DBT system and provide alternative checking methods.</p>

        <h3>Q5: Can I check someone else's DBT status?</h3>
        <p><strong>A:</strong> No, you need the account holder's Aadhaar number and account number, which are confidential.</p>
        `,
        category: 'dbt-info',
        contentType: 'guide',
        author: adminUser._id,
        difficulty: 'beginner',
        readingTime: 12,
        featured: true,
        isPublished: true,
        tags: ['dbt', 'status-check', 'pfms', 'verification', 'scholarship', 'online-guide'],
        metaDescription: 'Complete guide to check DBT status online using PFMS, bank websites, and SMS. Learn what different status messages mean and next steps.',
        language: 'en',
        viewCount: 0
      },

      // Module 3: Pre-Matric Scholarship Schemes for SC Students
      {
        title: 'Pre-Matric Scholarship Schemes for SC Students - Complete Guide',
        description: 'Everything you need to know about pre-matric scholarships for SC students studying in classes 1-10. Learn eligibility, amounts, documents needed, and application process.',
        content: `
        <h2>What are Pre-Matric Scholarships?</h2>
        <p>Pre-Matric Scholarships are financial assistance programs provided by the Government of India to help <strong>Scheduled Caste (SC)</strong> students complete their education from classes 1 to 10. These scholarships are designed to encourage SC students to continue their education and reduce dropout rates.</p>

        <h2>Purpose of the Scheme</h2>
        <ul>
          <li>💰 Provide financial support for education expenses</li>
          <li>📚 Reduce dropout rates among SC students</li>
          <li>🎓 Encourage continuation of education up to class 10</li>
          <li>👨‍👩‍👧‍👦 Support economically weaker families</li>
          <li>📈 Improve literacy rates in SC communities</li>
        </ul>

        <h2>Eligibility Criteria</h2>

        <h3>You are eligible if ALL of the following apply:</h3>

        <h4>1. Community Requirement:</h4>
        <ul>
          <li>✅ You belong to Scheduled Caste (SC) community</li>
          <li>✅ You have a valid SC certificate</li>
          <li>✅ Certificate must be from competent authority</li>
        </ul>

        <h4>2. Educational Requirement:</h4>
        <ul>
          <li>✅ You are studying in classes 1 to 10</li>
          <li>✅ Enrolled in a government-recognized school</li>
          <li>✅ Regular attendance (minimum 75% required)</li>
        </ul>

        <h4>3. Income Requirement:</h4>
        <ul>
          <li>✅ Your family's annual income is less than ₹2,50,000</li>
          <li>✅ Income includes all sources (salary, business, agriculture)</li>
          <li>✅ Valid income certificate from competent authority required</li>
        </ul>

        <h4>4. Other Requirements:</h4>
        <ul>
          <li>✅ Indian citizen</li>
          <li>✅ Not receiving similar scholarship from other sources</li>
          <li>✅ Bank account with DBT enabled</li>
          <li>✅ Aadhaar card mandatory</li>
        </ul>

        <h2>Scholarship Amounts</h2>

        <h3>For Day Scholars (Students who go home daily):</h3>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Class</th>
              <th>Annual Amount</th>
              <th>Monthly Equivalent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Class 1 to 5</strong></td>
              <td>₹1,000 per year</td>
              <td>~₹100 per month</td>
            </tr>
            <tr>
              <td><strong>Class 6 to 8</strong></td>
              <td>₹1,500 per year</td>
              <td>~₹150 per month</td>
            </tr>
            <tr>
              <td><strong>Class 9 to 10</strong></td>
              <td>₹2,000 per year</td>
              <td>~₹200 per month</td>
            </tr>
          </tbody>
        </table>

        <h3>For Hostellers (Students staying in hostel):</h3>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Class</th>
              <th>Annual Amount</th>
              <th>Monthly Equivalent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Class 1 to 5</strong></td>
              <td>₹2,000 per year</td>
              <td>~₹200 per month</td>
            </tr>
            <tr>
              <td><strong>Class 6 to 8</strong></td>
              <td>₹3,000 per year</td>
              <td>~₹300 per month</td>
            </tr>
            <tr>
              <td><strong>Class 9 to 10</strong></td>
              <td>₹4,000 per year</td>
              <td>~₹400 per month</td>
            </tr>
          </tbody>
        </table>

        <div class="alert alert-info">
          <strong>Note:</strong> Amounts may vary slightly based on state implementation. Check your state's specific scholarship portal for exact amounts.
        </div>

        <h2>Required Documents</h2>

        <h3>Mandatory Documents (Must have):</h3>
        <ol>
          <li><strong>SC Certificate (Caste Certificate):</strong>
            <ul>
              <li>From District Magistrate or authorized officer</li>
              <li>Should clearly mention "Scheduled Caste"</li>
              <li>Self-attested photocopy required</li>
            </ul>
          </li>
          <li><strong>Income Certificate:</strong>
            <ul>
              <li>From Revenue Officer/Tehsildar</li>
              <li>Should show family income less than ₹2,50,000</li>
              <li>Valid for current financial year</li>
              <li>Must be less than 1 year old</li>
            </ul>
          </li>
          <li><strong>Aadhaar Card:</strong>
            <ul>
              <li>Student's Aadhaar card (original + photocopy)</li>
              <li>Should be clearly readable</li>
              <li>All 12 digits should be visible</li>
            </ul>
          </li>
          <li><strong>Bank Account Details:</strong>
            <ul>
              <li>Bank account in student's name (preferred)</li>
              <li>OR in parent's/guardian's name</li>
              <li>Cancelled cheque or first page of passbook</li>
              <li>DBT must be enabled</li>
            </ul>
          </li>
          <li><strong>School Bonafide Certificate:</strong>
            <ul>
              <li>From school principal</li>
              <li>Should mention current class</li>
              <li>School seal and signature required</li>
            </ul>
          </li>
          <li><strong>Previous Year's Marksheet:</strong>
            <ul>
              <li>For classes 2-10 (not required for class 1)</li>
              <li>Self-attested photocopy</li>
              <li>Should show passed status</li>
            </ul>
          </li>
          <li><strong>Recent Photograph:</strong>
            <ul>
              <li>Passport size, colored photograph</li>
              <li>White background preferred</li>
              <li>Less than 6 months old</li>
            </ul>
          </li>
        </ol>

        <h3>Additional Documents (if applicable):</h3>
        <ul>
          <li><strong>Hostel Certificate:</strong> If claiming hostel rates</li>
          <li><strong>Disability Certificate:</strong> If student has disability</li>
          <li><strong>Domicile Certificate:</strong> If studying in different state</li>
          <li><strong>Migration Certificate:</strong> If changed schools</li>
        </ul>

        <h2>How to Apply - Step-by-Step Process</h2>

        <h3>Step 1: Preparation (Do this first!)</h3>
        <ol>
          <li>Collect all required documents listed above</li>
          <li>Make photocopies of all documents</li>
          <li>Ensure your bank account has DBT enabled</li>
          <li>Link Aadhaar with bank account if not done</li>
          <li>Get a valid email ID and mobile number</li>
        </ol>

        <h3>Step 2: Registration</h3>
        <ol>
          <li>Visit <code>scholarships.gov.in</code> (National Scholarship Portal)</li>
          <li>Click on <strong>"New Registration"</strong></li>
          <li>Select scheme: <strong>"Pre-Matric Scholarship for SC Students"</strong></li>
          <li>Select your state</li>
          <li>Fill registration form with:</li>
            <ul>
              <li>Full name (as per Aadhaar)</li>
              <li>Date of birth</li>
              <li>Email ID</li>
              <li>Mobile number</li>
              <li>Create password (keep it safe!)</li>
            </ul>
          <li>Click <strong>"Register"</strong></li>
          <li>You'll receive Application ID on email/SMS</li>
          <li><strong>IMPORTANT:</strong> Note down your Application ID safely!</li>
        </ol>

        <h3>Step 3: Login and Fill Application</h3>
        <ol>
          <li>Login with your Application ID and password</li>
          <li>Fill the application form with:</li>
            <ul>
              <li><strong>Personal Details:</strong> Name, father's name, mother's name, address</li>
              <li><strong>Academic Details:</strong> School name, class, roll number</li>
              <li><strong>Bank Details:</strong> Account number, IFSC code, bank name</li>
              <li><strong>Income Details:</strong> Family income, source of income</li>
              <li><strong>Caste Details:</strong> SC certificate details</li>
            </ul>
          <li>Double-check all information before proceeding</li>
          <li>Click <strong>"Save as Draft"</strong> to save progress</li>
        </ol>

        <h3>Step 4: Upload Documents</h3>
        <ol>
          <li>Go to <strong>"Upload Documents"</strong> section</li>
          <li>Upload all required documents in PDF format</li>
          <li>Ensure each file is less than 2 MB</li>
          <li>Document requirements:</li>
            <ul>
              <li>SC Certificate (PDF)</li>
              <li>Income Certificate (PDF)</li>
              <li>Aadhaar Card (PDF)</li>
              <li>Bank Passbook/Cancelled Cheque (PDF)</li>
              <li>School Certificate (PDF)</li>
              <li>Previous Marksheet (PDF)</li>
              <li>Photograph (JPG/PNG)</li>
            </ul>
          <li>Click <strong>"Upload"</strong> for each document</li>
          <li>Wait for confirmation message</li>
        </ol>

        <h3>Step 5: Submit Application</h3>
        <ol>
          <li>Review all filled information carefully</li>
          <li>Check if all documents are uploaded</li>
          <li>Read the declaration carefully</li>
          <li>Tick the checkbox: "I declare that all information is true"</li>
          <li>Click <strong>"Submit"</strong></li>
          <li>You'll receive confirmation on screen</li>
          <li>Note down your Application Reference Number</li>
          <li>Take screenshot of confirmation page</li>
          <li>Print the acknowledgment receipt</li>
        </ol>

        <h3>Step 6: Institute Verification</h3>
        <ol>
          <li>Submit printed acknowledgment to your school</li>
          <li>School will verify your details online</li>
          <li>This may take 7-15 days</li>
          <li>Check status regularly on portal</li>
        </ol>

        <h2>Important Dates (Approximate - Check for Current Year)</h2>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Typical Timeline</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Application Portal Opens</td>
              <td>July - August</td>
            </tr>
            <tr>
              <td>Last Date to Apply</td>
              <td>October - November</td>
            </tr>
            <tr>
              <td>Institute Verification Period</td>
              <td>November - December</td>
            </tr>
            <tr>
              <td>State Verification</td>
              <td>December - January</td>
            </tr>
            <tr>
              <td>Results Declared</td>
              <td>January - February</td>
            </tr>
            <tr>
              <td>Amount Credited to Bank</td>
              <td>March - May</td>
            </tr>
          </tbody>
        </table>

        <div class="alert alert-warning">
          <strong>⚠️ Important:</strong> Dates vary each year and by state. Always check the official scholarship portal for exact dates for current year.
        </div>

        <h2>Tracking Your Application Status</h2>

        <h3>How to Check Status:</h3>
        <ol>
          <li>Visit <code>scholarships.gov.in</code></li>
          <li>Click <strong>"Check Application Status"</strong></li>
          <li>Enter Application ID and Date of Birth</li>
          <li>Enter captcha code</li>
          <li>Click <strong>"Submit"</strong></li>
          <li>Your current status will be displayed</li>
        </ol>

        <h3>Understanding Status Messages:</h3>
        <ul>
          <li><strong>"Application Submitted":</strong> Your application is received</li>
          <li><strong>"Under Institute Verification":</strong> School is checking your details</li>
          <li><strong>"Approved by Institute":</strong> School has approved</li>
          <li><strong>"Under State Verification":</strong> State authorities reviewing</li>
          <li><strong>"Approved":</strong> Your scholarship is approved!</li>
          <li><strong>"Amount Credited":</strong> Money has been sent to your account</li>
          <li><strong>"Pending for Documents":</strong> Some documents are missing</li>
          <li><strong>"Rejected":</strong> Application not approved (check reason)</li>
        </ul>

        <h2>Common Reasons for Rejection and How to Avoid</h2>

        <h3>1. Incomplete Application</h3>
        <p><strong>How to avoid:</strong></p>
        <ul>
          <li>Fill all mandatory fields</li>
          <li>Don't leave any section blank</li>
          <li>Review before submitting</li>
        </ul>

        <h3>2. Invalid Documents</h3>
        <p><strong>How to avoid:</strong></p>
        <ul>
          <li>Ensure income certificate is less than 1 year old</li>
          <li>SC certificate should be from authorized officer</li>
          <li>Upload clear, readable scans</li>
        </ul>

        <h3>3. DBT Not Enabled</h3>
        <p><strong>How to avoid:</strong></p>
        <ul>
          <li>Check DBT status before applying</li>
          <li>Enable DBT at least 2 weeks before deadline</li>
          <li>Verify status shows "Active"</li>
        </ul>

        <h3>4. Income Exceeds Limit</h3>
        <p><strong>How to avoid:</strong></p>
        <ul>
          <li>Ensure family income is below ₹2,50,000</li>
          <li>Get accurate income certificate</li>
          <li>Include all income sources</li>
        </ul>

        <h3>5. Duplicate Application</h3>
        <p><strong>How to avoid:</strong></p>
        <ul>
          <li>Apply only once per year</li>
          <li>Don't submit multiple applications</li>
          <li>If needed to reapply, first cancel old application</li>
        </ul>

        <h2>Pro Tips for Successful Application</h2>
        <div class="alert alert-success">
          <h4>🎯 Best Practices:</h4>
          <ul>
            <li><strong>Apply Early:</strong> Don't wait for last date. Portal gets slow.</li>
            <li><strong>Keep Copies:</strong> Make photocopies of all documents before uploading</li>
            <li><strong>Use Chrome Browser:</strong> Works best with scholarship portal</li>
            <li><strong>Stable Internet:</strong> Use good internet connection while uploading</li>
            <li><strong>Save Application ID:</strong> Write it down on paper and save in phone</li>
            <li><strong>Check Regularly:</strong> Track status every week</li>
            <li><strong>Ask for Help:</strong> Contact your school teacher if confused</li>
            <li><strong>Keep Email Active:</strong> All notifications come via email</li>
            <li><strong>Print Receipt:</strong> Keep hard copy of acknowledgment</li>
            <li><strong>Verify Details:</strong> Double-check before final submission</li>
          </ul>
        </div>

        <h2>Helpline and Support</h2>

        <h3>Technical Issues (Portal/Website):</h3>
        <ul>
          <li><strong>Phone:</strong> 0120-6619540</li>
          <li><strong>Email:</strong> helpdesk@nsp.gov.in</li>
          <li><strong>Timing:</strong> 10 AM - 6 PM (Monday to Friday)</li>
        </ul>

        <h3>Scholarship-Related Queries:</h3>
        <ul>
          <li>Contact your school principal or scholarship coordinator</li>
          <li>Visit State Scholarship Office</li>
          <li>Check state government scholarship portal</li>
        </ul>

        <h2>After Scholarship is Approved</h2>

        <h3>When will you receive the money?</h3>
        <ul>
          <li>Usually within 2-3 months after approval</li>
          <li>Directly transferred to your bank account</li>
          <li>You'll receive SMS notification</li>
          <li>Check bank passbook/statement for credit</li>
        </ul>

        <h3>What if money doesn't come?</h3>
        <ul>
          <li>Wait for 15 days after approval</li>
          <li>Check with your bank about DBT status</li>
          <li>Contact state scholarship cell</li>
          <li>File complaint on portal if needed</li>
        </ul>

        <h2>Renewal for Next Year</h2>
        <ul>
          <li>You need to apply fresh every year</li>
          <li>Process remains the same</li>
          <li>Update marksheet with latest year's result</li>
          <li>Income certificate may need renewal if old</li>
          <li>Same Application ID can be used for login</li>
        </ul>

        <div class="alert alert-info">
          <strong>Remember:</strong> Education is your right. Don't let financial constraints stop you. Apply for this scholarship and focus on your studies. The government wants to help you succeed!
        </div>
        `,
        category: 'scholarship-guide',
        contentType: 'guide',
        author: adminUser._id,
        difficulty: 'beginner',
        readingTime: 20,
        featured: true,
        isPublished: true,
        tags: ['pre-matric', 'sc-scholarship', 'scholarship', 'class-1-10', 'financial-aid', 'application-guide'],
        metaDescription: 'Complete guide to Pre-Matric Scholarship for SC students. Learn eligibility, amounts, documents, application process, and tips for success.',
        language: 'en',
        viewCount: 0
      }
    ];

    // Insert the new modules
    const insertedContent = await Content.insertMany(newModules);
    
    console.log(`✅ Successfully added ${insertedContent.length} new educational modules!`);
    console.log('\nAdded Modules:');
    insertedContent.forEach((content, index) => {
      console.log(`${index + 1}. ${content.title} (Category: ${content.category})`);
    });

  } catch (error) {
    console.error('Error seeding new modules:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
};

// Run the seed function
connectDB().then(() => {
  seedNewModules();
});
