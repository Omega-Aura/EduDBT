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
    console.log('MongoDB Connected for seeding final module...');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

const seedFinalModule = async () => {
  try {
    // Find admin user to set as author
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.error('Admin user not found! Please run seedData.js first.');
      process.exit(1);
    }

    console.log('Admin user found, proceeding with final module...');

    const finalModule = [
      // Module 6: Essential Documents Required
      {
        title: 'Essential Documents Required for Aadhaar-Bank Account Seeding and DBT',
        description: 'Complete checklist of all mandatory and optional documents needed for Aadhaar seeding, DBT enabling, and scholarship applications. Prepare in advance to avoid delays.',
        content: `
        <h2>Introduction</h2>
        <p>Having the <strong>right documents</strong> is the foundation of a smooth scholarship application process. Missing or incorrect documents are the #1 reason for application rejection. This comprehensive guide ensures you have everything ready <em>before</em> you start the process.</p>

        <div class="alert alert-warning">
          <h4>⚠️ Critical Point:</h4>
          <p>All documents must be <strong>clear, readable, and valid</strong>. Blurred, torn, or expired documents will be rejected.</p>
        </div>

        <h2>Complete Document Checklist</h2>

        <h3>Category 1: Identity Proof Documents</h3>

        <h4>1. Aadhaar Card (Absolutely Mandatory)</h4>
        <p><strong>What You Need:</strong></p>
        <ul>
          <li>✅ <strong>Original Aadhaar Card</strong>
            <ul>
              <li>Either physical card issued by UIDAI</li>
              <li>OR e-Aadhaar (downloaded PDF from uidai.gov.in)</li>
              <li>Must show full 12-digit number clearly</li>
              <li>No portion should be masked or hidden</li>
            </ul>
          </li>
          <li>✅ <strong>Photocopy of Aadhaar</strong>
            <ul>
              <li>Take 3-4 photocopies in advance</li>
              <li>Should be clear and legible</li>
              <li>All corners visible</li>
              <li>Don't fold or staple</li>
            </ul>
          </li>
        </ul>

        <p><strong>Important Points:</strong></p>
        <ul>
          <li>📌 Name on Aadhaar must match EXACTLY with bank account</li>
          <li>📌 Address can be different (not an issue)</li>
          <li>📌 If name doesn't match, update either Aadhaar or bank records first</li>
          <li>📌 Aadhaar must be active (not suspended or cancelled)</li>
        </ul>

        <p><strong>What if You Don't Have Aadhaar?</strong></p>
        <ul>
          <li>Visit nearest Aadhaar Enrollment Center</li>
          <li>Carry school ID and birth certificate</li>
          <li>Guardian must accompany if you're below 18</li>
          <li>Get Aadhaar acknowledgment slip (can use for temporary purposes)</li>
          <li>Actual Aadhaar comes in 30-90 days</li>
        </ul>

        <h4>2. School/College ID Card</h4>
        <ul>
          <li>Valid ID card from current institution</li>
          <li>Should show:
            <ul>
              <li>Your name</li>
              <li>Photograph</li>
              <li>Class/Standard</li>
              <li>School/College name</li>
            </ul>
          </li>
          <li>Must be current year's card</li>
          <li>Old year cards not accepted</li>
        </ul>

        <h4>3. Passport Size Photographs</h4>
        <ul>
          <li>Keep at least 5-6 recent photographs</li>
          <li>White or light-colored background</li>
          <li>Should be clear and in focus</li>
          <li>Same as used in school ID</li>
          <li>Not older than 6 months</li>
        </ul>

        <h3>Category 2: Bank Account Documents</h3>

        <h4>1. Bank Passbook (Mandatory)</h4>
        <p><strong>What You Need:</strong></p>
        <ul>
          <li>✅ <strong>Original Passbook</strong>
            <ul>
              <li>For verification at bank</li>
              <li>Shows account number and IFSC</li>
              <li>Should have recent transactions</li>
            </ul>
          </li>
          <li>✅ <strong>Photocopy of First Page</strong>
            <ul>
              <li>Page showing account number</li>
              <li>Page showing IFSC code</li>
              <li>Page showing account holder's name</li>
              <li>Take 2-3 copies</li>
            </ul>
          </li>
        </ul>

        <p><strong>Important Requirements:</strong></p>
        <ul>
          <li>📌 Account must be in <strong>your own name</strong> (not parent's)</li>
          <li>📌 Account must be <strong>Savings Account</strong> (not current or fixed)</li>
          <li>📌 Account must be <strong>active</strong> (recent transactions visible)</li>
          <li>📌 Account should have minimum balance maintained</li>
        </ul>

        <h4>2. Cancelled Cheque (Recommended)</h4>
        <ul>
          <li>Get a cheque from your passbook</li>
          <li>Write "CANCELLED" diagonally across it</li>
          <li>Don't sign it</li>
          <li>Shows: Account number, IFSC, name</li>
          <li>Accepted as proof of account details</li>
        </ul>

        <p><em>Note: If you don't have cheque book, bank statement works too.</em></p>

        <h4>3. Bank Statement (Alternative)</h4>
        <ul>
          <li>Request from bank branch OR</li>
          <li>Download from internet banking</li>
          <li>Should be on bank's letterhead</li>
          <li>Not older than 3 months</li>
          <li>Must show: Name, Account Number, IFSC, Branch</li>
        </ul>

        <h3>Category 3: Educational Documents</h3>

        <h4>1. Previous Year Mark Sheet</h4>
        <ul>
          <li>Last passed exam marksheet</li>
          <li>Shows your academic performance</li>
          <li>Required for eligibility verification</li>
          <li>Should be attested by school/college</li>
        </ul>

        <p><strong>For Different Classes:</strong></p>
        <ul>
          <li>Class 10 Students: Need Class 9 marksheet</li>
          <li>Class 11 Students: Need Class 10 marksheet</li>
          <li>College Students: Need 12th and last semester marksheets</li>
        </ul>

        <h4>2. Current Year Admission Receipt/Certificate</h4>
        <ul>
          <li>Proof that you're currently enrolled</li>
          <li>Fee receipt of current year</li>
          <li>Admission letter</li>
          <li>Bonafide certificate from school/college</li>
        </ul>

        <h4>3. School/College Leaving Certificate (if applicable)</h4>
        <ul>
          <li>If you changed schools</li>
          <li>Transfer certificate</li>
          <li>Migration certificate</li>
        </ul>

        <h3>Category 4: Category/Caste Documents</h3>

        <h4>1. Caste Certificate (Mandatory for SC Students)</h4>
        <p><strong>Requirements:</strong></p>
        <ul>
          <li>✅ Issued by competent authority (Tahsildar/SDM)</li>
          <li>✅ Should mention specific caste name</li>
          <li>✅ Should state "Scheduled Caste" clearly</li>
          <li>✅ Must have government seal and signature</li>
          <li>✅ Validity: Usually lifetime (unless specified)</li>
        </ul>

        <p><strong>Photocopies Needed:</strong></p>
        <ul>
          <li>Take 5-6 attested photocopies</li>
          <li>Attestation by Gazetted Officer OR</li>
          <li>Attestation by School/College Principal</li>
        </ul>

        <div class="alert alert-danger">
          <h4>⚠️ Critical Warning:</h4>
          <p>Fake caste certificates lead to <strong>criminal charges</strong> and permanent scholarship ban. Only apply if you genuinely belong to the category.</p>
        </div>

        <h4>2. Income Certificate (if required)</h4>
        <ul>
          <li>Shows family's annual income</li>
          <li>Issued by Tahsildar/Revenue Officer</li>
          <li>Validity: Usually 6 months to 1 year</li>
          <li>Required for income-based scholarships</li>
          <li>Should show income below eligibility limit</li>
        </ul>

        <p><strong>Documents for Income Certificate:</strong></p>
        <ul>
          <li>Parent's salary slips (if employed)</li>
          <li>IT returns (if applicable)</li>
          <li>Ration card</li>
          <li>Self-declaration (if no fixed income)</li>
        </ul>

        <h3>Category 5: Family Documents</h3>

        <h4>1. Parent's Aadhaar Card</h4>
        <ul>
          <li>Father's Aadhaar card (original + photocopy)</li>
          <li>Mother's Aadhaar card (original + photocopy)</li>
          <li>Required for verification of family details</li>
        </ul>

        <h4>2. Family Documents (if applicable)</h4>
        <ul>
          <li>Ration Card (shows family composition)</li>
          <li>Domicile Certificate (shows residence)</li>
          <li>BPL Card (if applicable)</li>
        </ul>

        <h3>Category 6: Address Proof Documents</h3>

        <h4>Any ONE of the Following:</h4>
        <ol>
          <li><strong>Aadhaar Card</strong> (Best option - already have it)</li>
          <li><strong>Voter ID</strong> (if you're 18+)</li>
          <li><strong>Electricity Bill</strong> (not older than 3 months)</li>
          <li><strong>Water Bill</strong> (recent)</li>
          <li><strong>Telephone Bill</strong> (landline or mobile)</li>
          <li><strong>Rent Agreement</strong> (if staying in rented house)</li>
          <li><strong>School Bonafide with Address</strong></li>
        </ol>

        <h2>Special Documents for Specific Situations</h2>

        <h3>For Students Below 18 Years (Minors)</h3>
        <ol>
          <li>Birth Certificate (mandatory)</li>
          <li>Parent's consent letter</li>
          <li>Parent's ID proof (Aadhaar/Voter ID)</li>
          <li>Guardian's signature on forms</li>
        </ol>

        <h3>For Differently-Abled Students</h3>
        <ol>
          <li>Disability Certificate from Government Hospital</li>
          <li>Should mention percentage of disability</li>
          <li>Issued by Medical Board</li>
          <li>Valid disability certificates accepted</li>
        </ol>

        <h3>For Orphan Students</h3>
        <ol>
          <li>Death Certificate of parents</li>
          <li>Guardian's ID and address proof</li>
          <li>Guardianship certificate from court</li>
          <li>Orphanage certificate (if applicable)</li>
        </ol>

        <h3>For Single Parent Family</h3>
        <ol>
          <li>Death certificate of one parent OR</li>
          <li>Divorce decree</li>
          <li>Single parent's income certificate</li>
        </ol>

        <h2>Document Preparation Guidelines</h2>

        <h3>✅ Quality Standards:</h3>

        <h4>For All Documents:</h4>
        <ul>
          <li>✅ <strong>Clear and Legible:</strong> All text must be readable</li>
          <li>✅ <strong>Complete:</strong> No portion should be cut or missing</li>
          <li>✅ <strong>Valid:</strong> Should not be expired</li>
          <li>✅ <strong>Original Color:</strong> Colored photocopies if original is colored</li>
          <li>✅ <strong>Proper Size:</strong> Standard A4 size for copies</li>
        </ul>

        <h4>For Photocopies:</h4>
        <ul>
          <li>Use good quality photocopier</li>
          <li>Check each copy after printing</li>
          <li>Don't accept faded or unclear copies</li>
          <li>Keep originals safely at home</li>
          <li>Carry originals only for verification</li>
        </ul>

        <h4>For Attestation:</h4>
        <ul>
          <li>Get attested by authorized person:
            <ul>
              <li>School/College Principal</li>
              <li>Gazetted Officer (Class I or II)</li>
              <li>Bank Manager</li>
              <li>Notary Public</li>
            </ul>
          </li>
          <li>Attesting person should:
            <ul>
              <li>Sign across the photocopy</li>
              <li>Put official stamp/seal</li>
              <li>Write "True Copy" or "Attested Copy"</li>
              <li>Write date of attestation</li>
            </ul>
          </li>
        </ul>

        <h2>Document Organization Tips</h2>

        <h3>Create a Document File/Folder:</h3>
        <ol>
          <li><strong>Buy a Clear File or Folder:</strong>
            <ul>
              <li>Transparent file with pockets</li>
              <li>Keeps documents flat and safe</li>
              <li>Easy to carry to bank/office</li>
            </ul>
          </li>
          <li><strong>Organize by Category:</strong>
            <ul>
              <li>Section 1: Identity Documents (Aadhaar, School ID)</li>
              <li>Section 2: Bank Documents (Passbook copy, cheque)</li>
              <li>Section 3: Educational Documents (Marksheets, certificates)</li>
              <li>Section 4: Category Documents (Caste, Income certificates)</li>
              <li>Section 5: Miscellaneous (Photographs, address proof)</li>
            </ul>
          </li>
          <li><strong>Label Each Document:</strong>
            <ul>
              <li>Use sticky notes</li>
              <li>Write purpose (e.g., "For Aadhaar Linking")</li>
              <li>Helps in quick access</li>
            </ul>
          </li>
          <li><strong>Create a Checklist:</strong>
            <ul>
              <li>List all documents</li>
              <li>Tick when prepared</li>
              <li>Verify before leaving for bank/office</li>
            </ul>
          </li>
        </ol>

        <h2>Digital Document Management</h2>

        <h3>Scan All Documents:</h3>
        <p><strong>Why You Need Digital Copies:</strong></p>
        <ul>
          <li>📱 For online applications (NSP, state portals)</li>
          <li>📱 Backup if originals are lost</li>
          <li>📱 Easy to share via email</li>
          <li>📱 Can print again if needed</li>
        </ul>

        <h3>Scanning Guidelines:</h3>
        <ol>
          <li><strong>File Format:</strong>
            <ul>
              <li>Save as PDF (most widely accepted)</li>
              <li>JPEG also acceptable for photos</li>
              <li>Avoid TIFF or other formats</li>
            </ul>
          </li>
          <li><strong>File Size:</strong>
            <ul>
              <li>Each document: 50-500 KB</li>
              <li>Not too large (portals have limits)</li>
              <li>Not too small (should be clear)</li>
              <li>Compress if needed using online tools</li>
            </ul>
          </li>
          <li><strong>Resolution:</strong>
            <ul>
              <li>Minimum 150 DPI</li>
              <li>Recommended: 200-300 DPI</li>
              <li>Should be sharp and readable</li>
            </ul>
          </li>
          <li><strong>File Naming:</strong>
            <ul>
              <li>Use clear names: "Aadhaar_Card_Front.pdf"</li>
              <li>Avoid spaces (use underscores)</li>
              <li>Include your name: "RahulKumar_Caste_Certificate.pdf"</li>
            </ul>
          </li>
        </ol>

        <h3>Storage Options:</h3>
        <ul>
          <li>📂 Google Drive (free 15 GB)</li>
          <li>📂 DigiLocker (government's digital document storage)</li>
          <li>📂 Local computer/laptop</li>
          <li>📂 External hard drive/pen drive</li>
          <li>📂 Mobile phone (keep backup)</li>
        </ul>

        <div class="alert alert-success">
          <strong>Pro Tip:</strong> Create a folder named "Scholarship_Documents_2024" and keep all scans there. Back up to cloud storage.
        </div>

        <h2>Using DigiLocker (Recommended)</h2>

        <p><strong>What is DigiLocker?</strong></p>
        <ul>
          <li>Government's digital document wallet</li>
          <li>Stores documents securely</li>
          <li>Linked with your Aadhaar</li>
          <li>Free and official</li>
          <li>Accepted by all government departments</li>
        </ul>

        <h3>How to Set Up DigiLocker:</h3>
        <ol>
          <li>Visit <code>digilocker.gov.in</code> or download app</li>
          <li>Register using your Aadhaar number</li>
          <li>Verify with OTP sent to Aadhaar-linked mobile</li>
          <li>Create 6-digit security PIN</li>
          <li>Your account is ready</li>
        </ol>

        <h3>Documents Available in DigiLocker:</h3>
        <ul>
          <li>Aadhaar card (auto-fetched from UIDAI)</li>
          <li>Marksheets (if board provides)</li>
          <li>Driving License (if applicable)</li>
          <li>PAN card (from Income Tax)</li>
          <li>Vehicle registration (if applicable)</li>
        </ul>

        <h3>Upload Your Documents:</h3>
        <ul>
          <li>Scan and upload: Caste certificate, Income certificate</li>
          <li>Bank statements, Passbook copy</li>
          <li>School certificates, Fee receipts</li>
          <li>Keep organized in folders</li>
        </ul>

        <h2>Document Verification Process</h2>

        <h3>What Happens During Verification:</h3>
        <ol>
          <li><strong>At Bank:</strong>
            <ul>
              <li>Officer checks your original documents</li>
              <li>Matches with photocopies submitted</li>
              <li>Verifies signature</li>
              <li>May take fingerprint</li>
            </ul>
          </li>
          <li><strong>For Scholarship:</strong>
            <ul>
              <li>School/college verifies educational documents</li>
              <li>District office verifies caste/income certificates</li>
              <li>System cross-checks with government databases</li>
            </ul>
          </li>
          <li><strong>For DBT:</strong>
            <ul>
              <li>PFMS system verifies Aadhaar with UIDAI</li>
              <li>Bank account verified with RBI database</li>
              <li>Name matching checked</li>
            </ul>
          </li>
        </ol>

        <h2>Common Document-Related Errors</h2>

        <h3>Error 1: Name Mismatch</h3>
        <p><strong>Problem:</strong> Name different in Aadhaar, bank, and school records</p>
        <p><strong>Solution:</strong></p>
        <ul>
          <li>Decide on one correct spelling</li>
          <li>Update all documents to match</li>
          <li>Priority: Update in Aadhaar first, then others</li>
        </ul>

        <h3>Error 2: Expired Certificates</h3>
        <p><strong>Problem:</strong> Income certificate or other docs expired</p>
        <p><strong>Solution:</strong></p>
        <ul>
          <li>Check validity dates</li>
          <li>Renew before applying</li>
          <li>Keep track of expiry dates</li>
        </ul>

        <h3>Error 3: Unclear Photocopies</h3>
        <p><strong>Problem:</strong> Submitted copies are blurred or faded</p>
        <p><strong>Solution:</strong></p>
        <ul>
          <li>Always check quality after photocopying</li>
          <li>Use good quality copier</li>
          <li>Redo if not clear</li>
        </ul>

        <h3>Error 4: Missing Attestation</h3>
        <p><strong>Problem:</strong> Documents need attestation but not done</p>
        <p><strong>Solution:</strong></p>
        <ul>
          <li>Check which documents need attestation</li>
          <li>Get attested before submission</li>
          <li>Keep both attested and non-attested copies</li>
        </ul>

        <h2>Quick Reference Checklist</h2>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Document</th>
              <th>Original</th>
              <th>Photocopy</th>
              <th>Attested</th>
              <th>Scanned</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Aadhaar Card</td>
              <td>✅</td>
              <td>✅ (3 copies)</td>
              <td>Not required</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Bank Passbook/Cheque</td>
              <td>✅</td>
              <td>✅ (2 copies)</td>
              <td>Not required</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>School ID Card</td>
              <td>✅</td>
              <td>✅ (1 copy)</td>
              <td>Not required</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Last Year Marksheet</td>
              <td>✅</td>
              <td>✅ (2 copies)</td>
              <td>✅ Required</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Caste Certificate</td>
              <td>✅</td>
              <td>✅ (5 copies)</td>
              <td>✅ Required</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Income Certificate</td>
              <td>✅</td>
              <td>✅ (2 copies)</td>
              <td>✅ Required</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Admission Receipt</td>
              <td>✅</td>
              <td>✅ (2 copies)</td>
              <td>✅ Required</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Passport Photos</td>
              <td>N/A</td>
              <td>5-6 photos</td>
              <td>Not required</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Parent's Aadhaar</td>
              <td>✅</td>
              <td>✅ (1 copy each)</td>
              <td>Not required</td>
              <td>✅</td>
            </tr>
            <tr>
              <td>Address Proof</td>
              <td>✅</td>
              <td>✅ (1 copy)</td>
              <td>Not required</td>
              <td>✅</td>
            </tr>
          </tbody>
        </table>

        <h2>Where to Keep Documents</h2>

        <h3>At Home:</h3>
        <ul>
          <li>🏠 Keep originals in a safe, dry place</li>
          <li>🏠 Use a waterproof document bag/box</li>
          <li>🏠 Inform parents about location</li>
          <li>🏠 Never keep near water or damp areas</li>
        </ul>

        <h3>When Traveling to Bank/Office:</h3>
        <ul>
          <li>🎒 Use a clear file folder</li>
          <li>🎒 Keep in a bag/backpack safely</li>
          <li>🎒 Don't fold documents</li>
          <li>🎒 Hold bag carefully in crowded places</li>
        </ul>

        <h2>Final Tips</h2>

        <div class="alert alert-success">
          <h4>🎯 Best Practices:</h4>
          <ul>
            <li>✅ Prepare all documents 1 month in advance</li>
            <li>✅ Make extra photocopies (always useful)</li>
            <li>✅ Verify documents before leaving home</li>
            <li>✅ Keep digital and physical both</li>
            <li>✅ Update documents when details change</li>
            <li>✅ Check expiry dates regularly</li>
            <li>✅ Maintain a document checklist</li>
          </ul>
        </div>

        <div class="alert alert-info">
          <h4>Remember:</h4>
          <p><strong>Documents are your identity</strong> in the scholarship process. Being well-prepared with all documents saves time and prevents application rejection. Invest time once in proper document preparation, and you'll have smooth applications every time!</p>
        </div>
        `,
        category: 'aadhaar-basics',
        contentType: 'guide',
        author: adminUser._id,
        difficulty: 'beginner',
        readingTime: 20,
        featured: true,
        isPublished: true,
        tags: ['documents', 'checklist', 'aadhaar', 'bank-account', 'scholarship-documents', 'preparation'],
        metaDescription: 'Complete checklist of essential documents required for Aadhaar linking, DBT enabling, and scholarship applications. Prepare all documents in advance.',
        language: 'en',
        viewCount: 0
      }
    ];

    // Add the final module
    const insertedContent = await Content.insertMany(finalModule);
    
    console.log(`✅ Successfully added final educational module!`);
    console.log('\nAdded Module:');
    console.log(`1. ${insertedContent[0].title} (Category: ${insertedContent[0].category})`);
    console.log('\n🎉 All 6 comprehensive educational modules are now ready!');
    console.log('\nNext Steps:');
    console.log('1. Run: node backend/seedNewModules.js (to add first 3 modules)');
    console.log('2. Run: node backend/seedRemainingModules.js (to add next 2 modules)');
    console.log('3. Run: node backend/seedFinalModule.js (to add final module)');
    console.log('4. Visit Learning Center to see all new content!');

  } catch (error) {
    console.error('Error seeding final module:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
};

// Run the seed function
connectDB().then(() => {
  seedFinalModule();
});
