const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8
  },
  firstName: { 
    type: String, 
    required: true,
    trim: true
  },
  lastName: { 
    type: String, 
    required: true,
    trim: true
  },
  phoneNumber: { 
    type: String, 
    required: true,
    unique: true
  },
  phone: { 
    type: String
  },
  dateOfBirth: { 
    type: Date
  },
  gender: { 
    type: String,
    enum: ['male', 'female', 'other']
  },
  address: { 
    type: String
  },
  city: { 
    type: String
  },
  state: { 
    type: String, 
    required: true
  },
  district: { 
    type: String, 
    required: true
  },
  pincode: { 
    type: String
  },
  aadhaarNumber: { 
    type: String,
    encrypted: true
  },
  aadhaarName: { 
    type: String
  },
  isAadhaarVerified: { 
    type: Boolean, 
    default: false
  },
  bankDetails: {
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    accountHolderName: { type: String },
    isLinked: { type: Boolean, default: false }
  },
  educationLevel: { 
    type: String, 
    required: true,
    enum: ['10th', '12th', 'Graduate', 'Post-Graduate', 'Diploma', 'ITI']
  },
  scholarshipStatus: { 
    type: String, 
    enum: ['none', 'applied', 'approved', 'rejected'],
    default: 'none'
  },
  bankAccountLinked: { 
    type: Boolean, 
    default: false
  },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false }
  },
  profileCompleted: { 
    type: Boolean, 
    default: false
  },
  emailVerified: { 
    type: Boolean, 
    default: false
  },
  phoneVerified: { 
    type: Boolean, 
    default: false
  },
  role: { 
    type: String, 
    enum: ['student', 'admin'], 
    default: 'student'
  },
  preferences: { 
    type: Object, 
    default: {}
  },
  languagePreference: { 
    type: String, 
    default: 'en',
    enum: ['en', 'hi', 'bn', 'mr', 'te', 'ta', 'gu', 'ur', 'kn', 'or', 'ml', 'pa', 'as']
  },
  learningProgress: {
    articlesRead: { type: [String], default: [] }, // Array of article IDs
    coursesCompleted: { type: [String], default: [] }, // Array of course IDs
    certificatesEarned: { type: Number, default: 0 },
    totalProgress: { type: Number, default: 0 } // Percentage (0-100)
  },
  lastLogin: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);