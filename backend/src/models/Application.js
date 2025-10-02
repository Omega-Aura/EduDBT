const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicationId: {
    type: String,
    unique: true,
    required: true
  },
  scholarshipType: {
    type: String,
    required: true,
    enum: ['pre-matric', 'post-matric', 'merit-cum-means', 'other']
  },
  academicYear: {
    type: String,
    required: true
  },
  instituteName: {
    type: String,
    required: true,
    trim: true
  },
  courseDetails: {
    courseName: { type: String, required: true },
    courseLevel: { type: String, required: true },
    courseDuration: { type: Number, required: true },
    currentYear: { type: Number, required: true }
  },
  personalDetails: {
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    category: { type: String, enum: ['SC', 'ST', 'OBC', 'General', 'Minority'], required: true },
    religion: { type: String },
    caste: { type: String }
  },
  addressDetails: {
    permanentAddress: {
      street: String,
      city: String,
      district: String,
      state: String,
      pincode: String
    },
    currentAddress: {
      street: String,
      city: String,
      district: String,
      state: String,
      pincode: String
    },
    sameAsPermanent: { type: Boolean, default: false }
  },
  bankDetails: {
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    bankName: { type: String, required: true },
    branchName: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    isDBTEnabled: { type: Boolean, default: false },
    verificationStatus: { type: String, enum: ['pending', 'verified', 'failed'], default: 'pending' }
  },
  aadhaarDetails: {
    aadhaarNumber: { type: String, required: true },
    isLinkedToBank: { type: Boolean, default: false },
    verificationStatus: { type: String, enum: ['pending', 'verified', 'failed'], default: 'pending' }
  },
  documents: [{
    documentType: { 
      type: String, 
      enum: ['aadhaar', 'bank-passbook', 'income-certificate', 'caste-certificate', 'marksheet', 'fee-receipt', 'other'],
      required: true 
    },
    documentUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    verified: { type: Boolean, default: false }
  }],
  applicationStatus: {
    type: String,
    enum: ['draft', 'submitted', 'under-review', 'approved', 'rejected', 'disbursed'],
    default: 'draft'
  },
  submissionDate: {
    type: Date
  },
  reviewDate: {
    type: Date
  },
  approvalDate: {
    type: Date
  },
  rejectionReason: {
    type: String
  },
  disbursementDetails: {
    amount: Number,
    disbursementDate: Date,
    transactionId: String,
    status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' }
  },
  trackingHistory: [{
    status: String,
    description: String,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

// Generate unique application ID
applicationSchema.pre('save', async function(next) {
  if (this.isNew) {
    const currentYear = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.applicationId = `DBT${currentYear}${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Index for efficient querying
applicationSchema.index({ user: 1, applicationStatus: 1 });
applicationSchema.index({ applicationId: 1 });
applicationSchema.index({ scholarshipType: 1, applicationStatus: 1 });

module.exports = mongoose.model('Application', applicationSchema);