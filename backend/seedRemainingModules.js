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
    console.log('MongoDB Connected for seeding remaining modules...');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const seedRemainingModules = async () => {
  try {
    // Find admin user to set as author
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.error('Admin user not found! Please run seedData.js first.');
      process.exit(1);
    }

    console.log('Admin user found, proceeding with remaining modules...');

    const remainingModules = [
      // Module 4: Step-by-Step Guide: Linking Aadhaar to Bank Account
      {
        title: 'Step-by-Step Guide: Linking Aadhaar to Bank Account',
        description: 'Complete walkthrough of linking your Aadhaar card with bank account. Learn offline and online methods, required documents, and troubleshooting tips.',
        content: `
        <h2>What is Aadhaar Linking?</h2>
        <p>Aadhaar linking means connecting your 12-digit Aadhaar number with your bank account. It creates a digital connection that:</p>
        <ul>
          <li>Verifies your identity with the bank</li>
          <li>Enables secure banking transactions</li>
          <li>Is required by law for all bank accounts</li>
          <li>Is essential for receiving government benefits</li>
        </ul>

        <h2>Why Do You Need to Link Aadhaar?</h2>
        <div class="alert alert-info">
          <h4>Important Reasons:</h4>
          <ul>
            <li>⚖️ <strong>Legal Requirement:</strong> Mandated by Supreme Court for all bank accounts</li>
            <li>💰 <strong>Scholarships:</strong> Required to receive government scholarships</li>
            <li>🔒 <strong>Security:</strong> Makes your banking more secure</li>
            <li>🎯 <strong>Benefits:</strong> Necessary for all government benefit schemes</li>
            <li>✅ <strong>KYC Compliance:</strong> Satisfies Know Your Customer norms</li>
          </ul>
        </div>

        <h2>Before You Start - Things You Need</h2>

        <h3>Documents Required:</h3>
        <ol>
          <li><strong>Original Aadhaar Card</strong>
            <ul>
              <li>Physical Aadhaar card OR</li>
              <li>e-Aadhaar downloaded from uidai.gov.in</li>
              <li>Should be clearly readable</li>
              <li>All 12 digits must be visible</li>
            </ul>
          </li>
          <li><strong>Bank Passbook or Statement</strong>
            <ul>
              <li>Shows your account number</li>
              <li>Confirms your bank branch</li>
              <li>Not older than 3 months</li>
            </ul>
          </li>
          <li><strong>Registered Mobile Number</strong>
            <ul>
              <li>Should be active and accessible</li>
              <li>Preferably linked with your Aadhaar</li>
              <li>Required for OTP verification</li>
            </ul>
          </li>
          <li><strong>Pen</strong>
            <ul>
              <li>For filling forms at bank</li>
              <li>Blue or black ink preferred</li>
            </ul>
          </li>
        </ol>

        <h2>Method 1: At Bank Branch (Offline - Most Reliable)</h2>

        <h3>Step 1: Visit Your Bank Branch</h3>
        <ul>
          <li>Go to the branch where you opened your account (home branch)</li>
          <li>Visit during working hours: <strong>10 AM to 4 PM</strong></li>
          <li>Avoid month-end days (too crowded)</li>
          <li>Carry all documents mentioned above</li>
        </ul>

        <div class="alert alert-success">
          <strong>Pro Tip:</strong> Visit on Tuesday, Wednesday, or Thursday mornings. These times are usually less crowded.
        </div>

        <h3>Step 2: Collect the Form</h3>
        <ul>
          <li>Ask bank staff for <strong>"Aadhaar Linking Form"</strong></li>
          <li>Some banks call it <strong>"KYC Update Form"</strong></li>
          <li>The form is usually free (no charges)</li>
          <li>You may also find it at the reception desk</li>
        </ul>

        <h3>Step 3: Fill the Form Carefully</h3>
        <p><strong>Important Points While Filling:</strong></p>
        <ol>
          <li><strong>Name:</strong>
            <ul>
              <li>Write exactly as shown on Aadhaar card</li>
              <li>Match spelling, spaces, and initials exactly</li>
              <li>Don't abbreviate or use nicknames</li>
            </ul>
          </li>
          <li><strong>Aadhaar Number:</strong>
            <ul>
              <li>Write all 12 digits carefully</li>
              <li>Double-check each digit</li>
              <li>Don't add spaces or hyphens</li>
            </ul>
          </li>
          <li><strong>Account Number:</strong>
            <ul>
              <li>Copy from your passbook/statement</li>
              <li>Verify it's correct</li>
              <li>Include all digits</li>
            </ul>
          </li>
          <li><strong>Mobile Number:</strong>
            <ul>
              <li>Write your active mobile number</li>
              <li>Preferably the one linked with Aadhaar</li>
              <li>Ensure you have access to this number</li>
            </ul>
          </li>
          <li><strong>Signature:</strong>
            <ul>
              <li>Sign in the designated space</li>
              <li>Should match your account signature</li>
              <li>Don't sign outside the box</li>
            </ul>
          </li>
        </ol>

        <div class="alert alert-warning">
          <strong>⚠️ Common Mistake:</strong> Many students write their name in capital letters. Write in the same style as on your Aadhaar card.
        </div>

        <h3>Step 4: Submit Documents</h3>
        <ul>
          <li>Give the completed form to bank officer</li>
          <li>Show original Aadhaar card for verification</li>
          <li>Provide photocopy of Aadhaar card</li>
          <li>Bank officer will verify against your account records</li>
        </ul>

        <h3>Step 5: Verification Process</h3>
        <p><strong>What Happens Next:</strong></p>
        <ol>
          <li>Bank officer checks your signature</li>
          <li>Verifies your Aadhaar card is genuine</li>
          <li>May ask for your fingerprint on biometric device</li>
          <li>System sends OTP to your registered mobile</li>
          <li>You need to provide the OTP</li>
          <li>Officer enters OTP in system</li>
          <li>System verifies with UIDAI database</li>
        </ol>

        <h3>Step 6: Get Confirmation</h3>
        <ul>
          <li>Ask for receipt or acknowledgment slip</li>
          <li>Note down the reference number</li>
          <li>Keep this safe for future reference</li>
          <li>You may receive SMS confirmation within hours</li>
        </ul>

        <h2>Method 2: Online Through Internet Banking</h2>

        <p><em>Note: Not all banks offer this feature. Check with your bank first.</em></p>

        <h3>Step-by-Step Online Process:</h3>
        <ol>
          <li><strong>Login to Internet Banking:</strong>
            <ul>
              <li>Go to your bank's official website</li>
              <li>Enter your username and password</li>
              <li>Complete two-factor authentication</li>
            </ul>
          </li>
          <li><strong>Navigate to Aadhaar Section:</strong>
            <ul>
              <li>Look for "My Profile" or "Update Details"</li>
              <li>Find "Link Aadhaar" option</li>
              <li>OR check under "Services" menu</li>
            </ul>
          </li>
          <li><strong>Enter Aadhaar Details:</strong>
            <ul>
              <li>Enter your 12-digit Aadhaar number</li>
              <li>Enter name as per Aadhaar</li>
              <li>Verify details carefully</li>
            </ul>
          </li>
          <li><strong>Verify with OTP:</strong>
            <ul>
              <li>OTP will be sent to registered mobile</li>
              <li>Enter OTP in the given field</li>
              <li>Click "Submit" or "Verify"</li>
            </ul>
          </li>
          <li><strong>Confirmation:</strong>
            <ul>
              <li>You'll see success message on screen</li>
              <li>Take screenshot for your records</li>
              <li>You may receive email/SMS confirmation</li>
            </ul>
          </li>
        </ol>

        <h2>Method 3: Through Mobile Banking App</h2>

        <h3>Steps for App-based Linking:</h3>
        <ol>
          <li>Open your bank's mobile banking app</li>
          <li>Login with your credentials</li>
          <li>Go to "Services" or "More" menu</li>
          <li>Find "Link Aadhaar" or "Aadhaar Services"</li>
          <li>Enter Aadhaar number</li>
          <li>Verify with OTP</li>
          <li>Submit and save confirmation</li>
        </ol>

        <h2>Method 4: Through Phone Banking</h2>

        <h3>Call Your Bank's Customer Care:</h3>
        <ol>
          <li>Find customer care number (usually on bank website)</li>
          <li>Call from your registered mobile number</li>
          <li>Follow IVR instructions</li>
          <li>Select option for Aadhaar linking</li>
          <li>Provide details when asked:
            <ul>
              <li>Account number</li>
              <li>Aadhaar number</li>
              <li>Date of birth</li>
            </ul>
          </li>
          <li>Verify with OTP sent to mobile</li>
        </ol>

        <h2>Method 5: Through ATM (Select Banks Only)</h2>

        <p><em>Available for State Bank of India and some other banks.</em></p>

        <h3>ATM Linking Steps:</h3>
        <ol>
          <li>Visit your bank's ATM</li>
          <li>Insert your debit card</li>
          <li>Enter PIN</li>
          <li>Select "Services" or "Registration"</li>
          <li>Choose "Link Aadhaar"</li>
          <li>Enter 12-digit Aadhaar number</li>
          <li>Confirm details</li>
          <li>Take printed receipt</li>
        </ol>

        <h2>How Long Does It Take?</h2>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Method</th>
              <th>Processing Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>At Branch (Offline)</td>
              <td>Immediate (same day)</td>
            </tr>
            <tr>
              <td>Online/Internet Banking</td>
              <td>24-48 hours</td>
            </tr>
            <tr>
              <td>Mobile App</td>
              <td>24-48 hours</td>
            </tr>
            <tr>
              <td>Phone Banking</td>
              <td>2-3 working days</td>
            </tr>
            <tr>
              <td>ATM</td>
              <td>24-48 hours</td>
            </tr>
          </tbody>
        </table>

        <p><strong>Maximum Processing Time:</strong> 7-10 working days</p>

        <h2>How to Check if Linking is Successful</h2>

        <h3>Method 1: SMS Confirmation</h3>
        <ul>
          <li>You'll receive SMS from your bank</li>
          <li>Message will confirm Aadhaar linking</li>
          <li>Save this SMS for records</li>
        </ul>

        <h3>Method 2: Check Bank Statement</h3>
        <ul>
          <li>Login to internet banking</li>
          <li>View account details</li>
          <li>Check if Aadhaar number is displayed</li>
        </ul>

        <h3>Method 3: Call Customer Care</h3>
        <ul>
          <li>Call bank's customer care</li>
          <li>Ask "Is my Aadhaar linked?"</li>
          <li>They can verify and confirm</li>
        </ul>

        <h3>Method 4: Visit Branch</h3>
        <ul>
          <li>Go to bank branch</li>
          <li>Ask officer to check status</li>
          <li>Get written confirmation if needed</li>
        </ul>

        <h2>Common Problems and Solutions</h2>

        <h3>Problem 1: Name Mismatch</h3>
        <p><strong>Error:</strong> "Name does not match with Aadhaar records"</p>
        <p><strong>Solutions:</strong></p>
        <ol>
          <li><strong>Update in Aadhaar:</strong>
            <ul>
              <li>Visit Aadhaar enrollment center</li>
              <li>Get name corrected in Aadhaar</li>
              <li>Costs ₹50 for update</li>
              <li>Takes 7-10 days</li>
            </ul>
          </li>
          <li><strong>Update in Bank:</strong>
            <ul>
              <li>Visit bank branch</li>
              <li>Fill name change form</li>
              <li>Submit Aadhaar as proof</li>
              <li>Usually free of cost</li>
            </ul>
          </li>
        </ol>

        <h3>Problem 2: Mobile Number Different</h3>
        <p><strong>Error:</strong> "Mobile number not registered"</p>
        <p><strong>Solution:</strong></p>
        <ul>
          <li>Update mobile in Aadhaar first</li>
          <li>Visit Aadhaar center OR</li>
          <li>Use online update at uidai.gov.in</li>
          <li>Then update in bank</li>
        </ul>

        <h3>Problem 3: Address Mismatch</h3>
        <p><strong>Error:</strong> "Address does not match"</p>
        <p><strong>Solution:</strong></p>
        <ul>
          <li>Update address in Aadhaar OR</li>
          <li>Update address in bank records</li>
          <li>Ensure both show same address</li>
        </ul>

        <h3>Problem 4: Technical Error</h3>
        <p><strong>Error:</strong> "System error" or "Server timeout"</p>
        <p><strong>Solution:</strong></p>
        <ul>
          <li>Wait and try after some time</li>
          <li>Try during non-peak hours (morning)</li>
          <li>If persists, visit branch</li>
        </ul>

        <h3>Problem 5: OTP Not Received</h3>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Check if mobile number is correct</li>
          <li>Wait for 5 minutes (sometimes delayed)</li>
          <li>Check SMS inbox and spam folder</li>
          <li>Request resend OTP</li>
          <li>Try using different mobile network</li>
        </ul>

        <h2>Special Cases</h2>

        <h3>For Minor Students (Below 18 years):</h3>
        <ul>
          <li>Guardian's consent required</li>
          <li>Parent must accompany to bank</li>
          <li>Parent's Aadhaar also needed</li>
          <li>Birth certificate may be required</li>
        </ul>

        <h3>For Joint Accounts:</h3>
        <ul>
          <li>All account holders must link Aadhaar</li>
          <li>Each person links individually</li>
          <li>Separate forms for each holder</li>
        </ul>

        <h3>For NRIs (Non-Resident Indians):</h3>
        <ul>
          <li>Can link if they have Aadhaar</li>
          <li>May need to visit branch in India</li>
          <li>Some banks allow online for NRI accounts</li>
        </ul>

        <h2>After Successful Linking - What Next?</h2>

        <h3>Immediate Next Steps:</h3>
        <ol>
          <li>✅ <strong>Enable DBT:</strong> This is different from Aadhaar linking
            <ul>
              <li>Visit bank again after 2-3 days</li>
              <li>Request DBT enabling</li>
              <li>Fill separate DBT form</li>
            </ul>
          </li>
          <li>✅ <strong>Update PAN:</strong> Link PAN with Aadhaar if not done</li>
          <li>✅ <strong>Verify Regularly:</strong> Check status every few months</li>
        </ol>

        <h2>Important Tips and Best Practices</h2>

        <div class="alert alert-success">
          <h4>🎯 Do's:</h4>
          <ul>
            <li>✅ Keep original documents safely</li>
            <li>✅ Make photocopies before visiting bank</li>
            <li>✅ Double-check all details before submitting</li>
            <li>✅ Save all receipts and reference numbers</li>
            <li>✅ Link Aadhaar at least 1 month before applying for scholarships</li>
            <li>✅ Verify linking is successful</li>
            <li>✅ Update both Aadhaar and bank if you change mobile</li>
          </ul>

          <h4>❌ Don'ts:</h4>
          <ul>
            <li>❌ Don't share Aadhaar number with unauthorized persons</li>
            <li>❌ Don't submit unclear photocopies</li>
            <li>❌ Don't ignore mismatch errors</li>
            <li>❌ Don't wait for last moment</li>
            <li>❌ Don't link through unauthorized agents</li>
          </ul>
        </div>

        <h2>Bank-Specific Details</h2>

        <h3>State Bank of India (SBI):</h3>
        <ul>
          <li>Can link at ATM</li>
          <li>Online linking available</li>
          <li>Visit yono.sbi for app-based linking</li>
        </ul>

        <h3>HDFC Bank:</h3>
        <ul>
          <li>Online linking through NetBanking</li>
          <li>Can also SMS: UIDHDFCBANK to 5676766</li>
        </ul>

        <h3>ICICI Bank:</h3>
        <ul>
          <li>Available on internet banking</li>
          <li>Also on iMobile app</li>
        </ul>

        <h3>Punjab National Bank:</h3>
        <ul>
          <li>Fill form at branch</li>
          <li>Online linking available on PNB One</li>
        </ul>

        <h3>Bank of Baroda:</h3>
        <ul>
          <li>Branch visit recommended</li>
          <li>Online available on bob World app</li>
        </ul>

        <h2>Frequently Asked Questions</h2>

        <h3>Q1: Is there any fee for Aadhaar linking?</h3>
        <p><strong>A:</strong> No, Aadhaar linking is completely free. Banks don't charge anything.</p>

        <h3>Q2: Can I link one Aadhaar with multiple bank accounts?</h3>
        <p><strong>A:</strong> Yes, you can link same Aadhaar with all your bank accounts.</p>

        <h3>Q3: What if I don't have Aadhaar card?</h3>
        <p><strong>A:</strong> You need to get Aadhaar first. Visit nearest Aadhaar enrollment center.</p>

        <h3>Q4: Can linking be done by someone else on my behalf?</h3>
        <p><strong>A:</strong> No, you must be present for biometric verification and OTP.</p>

        <h3>Q5: Will my old transactions be affected?</h3>
        <p><strong>A:</strong> No, only future transactions and identity verification use Aadhaar.</p>

        <h3>Q6: What if linking fails multiple times?</h3>
        <p><strong>A:</strong> Visit branch with all documents. Bank can do manual verification and linking.</p>

        <h3>Q7: Is Aadhaar linking mandatory?</h3>
        <p><strong>A:</strong> Yes, it's mandatory as per Supreme Court for all bank accounts.</p>

        <h3>Q8: Can I link Aadhaar from home?</h3>
        <p><strong>A:</strong> Yes, if your bank offers internet/mobile banking facility for Aadhaar linking.</p>

        <div class="alert alert-info">
          <strong>Remember:</strong> Aadhaar linking is just the first step. For scholarships, you also need to enable DBT separately!
        </div>
        `,
        category: 'bank-linking',
        contentType: 'guide',
        author: adminUser._id,
        difficulty: 'beginner',
        readingTime: 18,
        featured: true,
        isPublished: true,
        tags: ['aadhaar-linking', 'bank-account', 'step-by-step', 'offline-online', 'documents', 'verification'],
        metaDescription: 'Detailed step-by-step guide for linking Aadhaar with bank account. Learn offline, online, ATM methods, required documents, and troubleshooting.',
        language: 'en',
        viewCount: 0
      },

      // Module 5: Step-by-Step Guide to Enable DBT
      {
        title: 'Step-by-Step Guide to Enable DBT for Your Account',
        description: 'Learn how to enable Direct Benefit Transfer (DBT) on your bank account to receive government scholarships. Understand the difference from Aadhaar linking.',
        content: `
        <h2>What is DBT Enabling?</h2>
        <p>DBT (Direct Benefit Transfer) enabling is an <strong>advanced step</strong> that connects your Aadhaar-linked bank account to the government's <strong>Public Financial Management System (PFMS)</strong>. This special connection allows your bank account to receive government scholarships and benefits directly from the government treasury.</p>

        <div class="alert alert-warning">
          <h4>⚠️ Important Understanding:</h4>
          <p>Many students think Aadhaar linking and DBT enabling are the same. They are NOT!</p>
        </div>

        <h2>Aadhaar Linking vs DBT Enabling</h2>

        <h3>Think of It Like This:</h3>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Comparison</th>
              <th>Aadhaar Linking</th>
              <th>DBT Enabling</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Simple Example</strong></td>
              <td>Getting a postal address</td>
              <td>Setting up a mailbox to receive letters</td>
            </tr>
            <tr>
              <td><strong>What It Does</strong></td>
              <td>Connects your ID to account</td>
              <td>Makes account ready to receive govt money</td>
            </tr>
            <tr>
              <td><strong>System</strong></td>
              <td>Bank's internal system</td>
              <td>Government's PFMS system</td>
            </tr>
            <tr>
              <td><strong>For Scholarships</strong></td>
              <td>Not sufficient</td>
              <td>Absolutely necessary</td>
            </tr>
            <tr>
              <td><strong>Can Receive Payment?</strong></td>
              <td>No</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>

        <h2>Why DBT Enabling is Important</h2>

        <h3>Without DBT Enabling:</h3>
        <ul>
          <li>❌ Cannot receive scholarship money</li>
          <li>❌ Government cannot send benefits to your account</li>
          <li>❌ Applications may be rejected</li>
          <li>❌ Payments face delays</li>
        </ul>

        <h3>With DBT Enabling:</h3>
        <ul>
          <li>✅ Direct transfer from government to your account</li>
          <li>✅ No middleman or delays</li>
          <li>✅ Real-time tracking of payments</li>
          <li>✅ Faster disbursement (within days)</li>
          <li>✅ More secure and transparent</li>
          <li>✅ Get SMS notifications for every transfer</li>
        </ul>

        <h2>Before You Start - Prerequisites</h2>

        <h3>Step 1: Ensure Aadhaar is Already Linked</h3>
        <div class="alert alert-info">
          <strong>Must Complete First:</strong>
          <ul>
            <li>✅ Your Aadhaar must be linked to your bank account FIRST</li>
            <li>✅ If not done, complete Aadhaar linking before proceeding</li>
            <li>✅ Wait for SMS confirmation of Aadhaar linking</li>
            <li>✅ Allow 24-48 hours after Aadhaar linking before enabling DBT</li>
          </ul>
        </div>

        <h3>Step 2: Gather Required Documents</h3>
        <ol>
          <li><strong>Aadhaar Card:</strong>
            <ul>
              <li>Original Aadhaar card</li>
              <li>One photocopy for bank</li>
              <li>Should be clearly readable</li>
            </ul>
          </li>
          <li><strong>Bank Account Details:</strong>
            <ul>
              <li>Account number</li>
              <li>IFSC code (from passbook/cheque)</li>
              <li>Bank name and branch</li>
            </ul>
          </li>
          <li><strong>Cancelled Cheque or Bank Statement:</strong>
            <ul>
              <li>Recent bank statement (within 3 months) OR</li>
              <li>Cancelled cheque from your account</li>
              <li>First page of passbook (with account details)</li>
            </ul>
          </li>
          <li><strong>Registered Mobile Number:</strong>
            <ul>
              <li>Must be active and accessible</li>
              <li>Should be the same number registered with bank</li>
              <li>Required for OTP verification</li>
            </ul>
          </li>
        </ol>

        <h2>Method 1: At Bank Branch (Most Reliable)</h2>

        <h3>Step 1: Visit Your Bank Branch</h3>
        <ul>
          <li>Go to your home branch (where account was opened)</li>
          <li>Visit during working hours: 10 AM to 4 PM</li>
          <li>Avoid first and last days of month (too busy)</li>
          <li>Carry all documents listed above</li>
        </ul>

        <h3>Step 2: Meet the Customer Service Officer</h3>
        <ul>
          <li>Tell them: <strong>"I want to enable DBT for my account"</strong></li>
          <li>Clarify it's for <strong>government scholarship receipt</strong></li>
          <li>Some banks may call it "Aadhaar Payment Bridge" or "APB"</li>
          <li>Ask for the specific form needed</li>
        </ul>

        <h3>Step 3: Fill DBT Application Form</h3>
        <p><strong>Form Details to Fill:</strong></p>
        <ol>
          <li><strong>Personal Information:</strong>
            <ul>
              <li>Full name (exactly as per Aadhaar)</li>
              <li>Father's/Mother's name</li>
              <li>Date of birth</li>
              <li>Address</li>
            </ul>
          </li>
          <li><strong>Aadhaar Details:</strong>
            <ul>
              <li>12-digit Aadhaar number</li>
              <li>Verify each digit carefully</li>
              <li>No spaces or hyphens</li>
            </ul>
          </li>
          <li><strong>Bank Account Details:</strong>
            <ul>
              <li>Account number (from passbook)</li>
              <li>IFSC code (11 characters)</li>
              <li>Account type (Savings/Current)</li>
            </ul>
          </li>
          <li><strong>Mobile Number:</strong>
            <ul>
              <li>10-digit registered mobile</li>
              <li>Must be active</li>
            </ul>
          </li>
          <li><strong>Purpose:</strong>
            <ul>
              <li>Mention "For Scholarship Receipt" or</li>
              <li>"For Government Benefit Transfer"</li>
            </ul>
          </li>
          <li><strong>Signature:</strong>
            <ul>
              <li>Sign as per your account signature</li>
              <li>In the designated box only</li>
            </ul>
          </li>
        </ol>

        <div class="alert alert-warning">
          <strong>Common Mistakes to Avoid:</strong>
          <ul>
            <li>❌ Don't rush while filling the form</li>
            <li>❌ Don't overwrite or cancel entries</li>
            <li>❌ Don't leave mandatory fields blank</li>
            <li>❌ Don't sign outside the signature box</li>
          </ul>
        </div>

        <h3>Step 4: Document Verification</h3>
        <p><strong>What Bank Officer Will Do:</strong></p>
        <ol>
          <li>Verify your original Aadhaar card</li>
          <li>Match details with your account records</li>
          <li>Check if Aadhaar is already linked</li>
          <li>Verify bank account is active</li>
          <li>May take your fingerprint on biometric device</li>
          <li>Send OTP to your registered mobile</li>
        </ol>

        <h3>Step 5: OTP Verification (If Required)</h3>
        <ul>
          <li>OTP will be sent to your mobile number</li>
          <li>Tell the OTP to bank officer</li>
          <li>Officer will enter in the system</li>
          <li>OTP is usually 6 digits</li>
          <li>Valid for 10-15 minutes only</li>
        </ul>

        <h3>Step 6: Form Submission and Receipt</h3>
        <ul>
          <li>Bank officer will submit your form in PFMS system</li>
          <li>You'll get an acknowledgment receipt</li>
          <li>Receipt will have a <strong>reference number</strong></li>
          <li>Note down this reference number carefully</li>
          <li>Keep the receipt safely</li>
        </ul>

        <h3>Step 7: Processing Time</h3>
        <ul>
          <li>Bank submits your details to PFMS</li>
          <li>Government system verifies the information</li>
          <li>Processing takes <strong>3-7 working days</strong></li>
          <li>You'll receive SMS confirmation once done</li>
          <li>Status changes to "DBT Enabled" or "Active"</li>
        </ul>

        <h2>Method 2: Online (If Available)</h2>

        <p><em>Note: Not all banks provide online DBT enabling. Check with your bank first.</em></p>

        <h3>For Banks Supporting Online DBT:</h3>
        <ol>
          <li><strong>Login to Internet Banking:</strong>
            <ul>
              <li>Go to your bank's official website</li>
              <li>Enter username and password</li>
              <li>Complete two-factor authentication</li>
            </ul>
          </li>
          <li><strong>Find DBT Option:</strong>
            <ul>
              <li>Look for "Government Schemes" menu</li>
              <li>OR "Services" → "DBT"</li>
              <li>OR "My Account" → "Enable DBT"</li>
            </ul>
          </li>
          <li><strong>Fill Online Form:</strong>
            <ul>
              <li>Enter Aadhaar number</li>
              <li>Verify account details pre-filled</li>
              <li>Confirm mobile number</li>
            </ul>
          </li>
          <li><strong>Submit with OTP:</strong>
            <ul>
              <li>OTP sent to registered mobile</li>
              <li>Enter OTP and submit</li>
              <li>Save confirmation message</li>
            </ul>
          </li>
        </ol>

        <h2>Method 3: Through Customer Care</h2>

        <h3>Phone Banking Process:</h3>
        <ol>
          <li>Call bank's customer care number</li>
          <li>Call from registered mobile number</li>
          <li>Listen to IVR options carefully</li>
          <li>Select option for "DBT" or "Government Schemes"</li>
          <li>Request for DBT enabling</li>
          <li>Provide details when asked:
            <ul>
              <li>Account number</li>
              <li>Aadhaar number</li>
              <li>Date of birth</li>
            </ul>
          </li>
          <li>Verify with OTP</li>
          <li>Note down reference number given</li>
        </ol>

        <h2>How to Check if DBT is Enabled</h2>

        <h3>Method 1: Bank Inquiry</h3>
        <ul>
          <li>Call customer care and ask for DBT status</li>
          <li>Visit branch and check with officer</li>
          <li>Use internet banking to view status</li>
        </ul>

        <h3>Method 2: Government Portal (Most Reliable)</h3>
        <ol>
          <li>Visit <code>pfms.nic.in</code></li>
          <li>Click "Know Your Payment" or "Track Payment"</li>
          <li>Enter Aadhaar number</li>
          <li>Enter bank account number</li>
          <li>Fill captcha code</li>
          <li>Click Submit</li>
          <li>Your DBT status will be displayed</li>
        </ol>

        <h3>Method 3: SMS (If Available)</h3>
        <ul>
          <li>Some banks provide SMS-based checking</li>
          <li>Format varies by bank</li>
          <li>Contact customer care for details</li>
        </ul>

        <h2>Understanding Status Messages</h2>

        <h3>✅ "Active" or "DBT Enabled"</h3>
        <p><strong>Meaning:</strong></p>
        <ul>
          <li>Your account is ready to receive government benefits</li>
          <li>All verifications complete</li>
          <li>You can apply for scholarships</li>
        </ul>
        <p><strong>What to do:</strong></p>
        <ul>
          <li>No further action needed</li>
          <li>Proceed with scholarship applications</li>
          <li>Check status monthly to ensure it stays active</li>
        </ul>

        <h3>⏳ "Under Process" or "Pending"</h3>
        <p><strong>Meaning:</strong></p>
        <ul>
          <li>Your application is being processed</li>
          <li>System verification in progress</li>
          <li>Typically takes 3-7 working days</li>
        </ul>
        <p><strong>What to do:</strong></p>
        <ul>
          <li>Wait for 7 working days</li>
          <li>Check status again after a week</li>
          <li>If still pending after 10 days, contact bank</li>
        </ul>

        <h3>❌ "Not Found" or "Inactive"</h3>
        <p><strong>Meaning:</strong></p>
        <ul>
          <li>DBT is not enabled yet</li>
          <li>OR application was not submitted properly</li>
        </ul>
        <p><strong>What to do:</strong></p>
        <ul>
          <li>Check if Aadhaar is linked to account first</li>
          <li>Visit bank branch to apply for DBT</li>
          <li>Submit all required documents</li>
        </ul>

        <h3>⚠️ "Details Mismatch"</h3>
        <p><strong>Meaning:</strong></p>
        <ul>
          <li>Your details don't match between systems</li>
          <li>Name, account, or Aadhaar has issues</li>
        </ul>
        <p><strong>What to do:</strong></p>
        <ul>
          <li>Verify you entered correct Aadhaar number</li>
          <li>Check account number is accurate</li>
          <li>Visit bank to rectify mismatches</li>
        </ul>

        <h2>What Happens After DBT is Enabled?</h2>

        <h3>Immediate Benefits:</h3>
        <ul>
          <li>✅ Your account is in government's PFMS database</li>
          <li>✅ Eligible for all Direct Benefit Transfer schemes</li>
          <li>✅ Can receive scholarships directly</li>
          <li>✅ Faster payment processing</li>
          <li>✅ Real-time tracking available</li>
        </ul>

        <h3>For Scholarship Applications:</h3>
        <ul>
          <li>✅ Your applications won't be rejected due to DBT</li>
          <li>✅ Payments happen automatically after approval</li>
          <li>✅ You get SMS notification for each credit</li>
          <li>✅ Can track payment status online</li>
        </ul>

        <h2>Common Issues and Solutions</h2>

        <h3>Issue 1: "DBT not showing as enabled even after 10 days"</h3>
        <p><strong>Reasons:</strong></p>
        <ul>
          <li>Form was not submitted correctly</li>
          <li>Aadhaar linking verification failed</li>
          <li>System processing delay</li>
        </ul>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Contact bank with reference number</li>
          <li>Ask them to check application status</li>
          <li>May need to reapply</li>
        </ul>

        <h3>Issue 2: "Details not found in PFMS system"</h3>
        <p><strong>Reasons:</strong></p>
        <ul>
          <li>Aadhaar linking not completed</li>
          <li>Wrong account number entered</li>
          <li>Account is inactive or dormant</li>
        </ul>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>First verify Aadhaar linking is complete</li>
          <li>Ensure account is active</li>
          <li>Visit branch for manual verification</li>
        </ul>

        <h3>Issue 3: "Mobile number mismatch"</h3>
        <p><strong>Reasons:</strong></p>
        <ul>
          <li>Different numbers with Aadhaar and bank</li>
          <li>Mobile number not updated</li>
        </ul>
        <p><strong>Solutions:</strong></p>
        <ul>
          <li>Update mobile in Aadhaar (visit center or use online)</li>
          <li>Update mobile in bank (visit branch)</li>
          <li>Use same mobile number for both</li>
        </ul>

        <h2>Important Tips for Success</h2>

        <div class="alert alert-success">
          <h4>🎯 Do's:</h4>
          <ul>
            <li>✅ Enable DBT at least 2 weeks before applying for scholarships</li>
            <li>✅ Keep all receipts and reference numbers safely</li>
            <li>✅ Check DBT status regularly</li>
            <li>✅ Update mobile number in both Aadhaar and bank</li>
            <li>✅ Ensure Aadhaar linking is complete before DBT</li>
            <li>✅ Visit branch if online methods fail</li>
            <li>✅ Ask bank for help if confused</li>
          </ul>

          <h4>❌ Don'ts:</h4>
          <ul>
            <li>❌ Don't assume DBT is automatic after Aadhaar linking</li>
            <li>❌ Don't wait for last moment before deadlines</li>
            <li>❌ Don't ignore status checking</li>
            <li>❌ Don't share Aadhaar details with unauthorized persons</li>
            <li>❌ Don't apply for scholarships before confirming DBT is active</li>
          </ul>
        </div>

        <h2>Frequently Asked Questions</h2>

        <h3>Q1: Is DBT enabling different from Aadhaar linking?</h3>
        <p><strong>A:</strong> Yes! Aadhaar linking just connects your ID with account. DBT enabling makes it ready to receive government money.</p>

        <h3>Q2: Is there any charge for DBT enabling?</h3>
        <p><strong>A:</strong> No, DBT enabling is completely free in all banks.</p>

        <h3>Q3: How many times should I enable DBT?</h3>
        <p><strong>A:</strong> Only once. Once enabled, it remains active unless account details change.</p>

        <h3>Q4: Can DBT status change from active to inactive?</h3>
        <p><strong>A:</strong> Rarely, but yes - if account becomes dormant or details are changed. Regular checking helps.</p>

        <h3>Q5: Do I need to re-enable DBT every year?</h3>
        <p><strong>A:</strong> No, DBT remains enabled. Only check status annually to ensure it's still active.</p>

        <h3>Q6: Can one Aadhaar have DBT enabled for multiple accounts?</h3>
        <p><strong>A:</strong> Yes, you can enable DBT for all accounts linked with your Aadhaar.</p>

        <h3>Q7: What if I change my bank account?</h3>
        <p><strong>A:</strong> You need to enable DBT for the new account separately.</p>

        <h3>Q8: How long does DBT remain active?</h3>
        <p><strong>A:</strong> Remains active as long as account is active and details don't change.</p>

        <div class="alert alert-info">
          <h4>Final Checklist:</h4>
          <ol>
            <li>✅ Aadhaar linked with bank account</li>
            <li>✅ DBT enabled (confirmed via PFMS)</li>
            <li>✅ Mobile number updated in both</li>
            <li>✅ Account is active</li>
            <li>✅ Status shows "Active" or "DBT Enabled"</li>
          </ol>
          <p><strong>If all above are ✅, you're ready to apply for scholarships!</strong></p>
        </div>
        `,
        category: 'bank-linking',
        contentType: 'guide',
        author: adminUser._id,
        difficulty: 'beginner',
        readingTime: 16,
        featured: true,
        isPublished: true,
        tags: ['dbt-enabling', 'direct-benefit-transfer', 'pfms', 'scholarship-receipt', 'bank-account', 'step-by-step'],
        metaDescription: 'Complete guide to enable DBT on your bank account. Learn the difference from Aadhaar linking, application process, and status verification.',
        language: 'en',
        viewCount: 0
      }
    ];

    // Add the remaining modules
    const insertedContent = await Content.insertMany(remainingModules);
    
    console.log(`✅ Successfully added ${insertedContent.length} more educational modules!`);
    console.log('\nAdded Modules:');
    insertedContent.forEach((content, index) => {
      console.log(`${index + 1}. ${content.title} (Category: ${content.category})`);
    });

  } catch (error) {
    console.error('Error seeding remaining modules:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
};

// Run the seed function
connectDB().then(() => {
  seedRemainingModules();
});
