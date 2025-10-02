const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc    Get current user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      pincode,
      languagePreference
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (phone !== undefined) user.phone = phone;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (gender !== undefined) user.gender = gender;
    if (address !== undefined) user.address = address;
    if (city !== undefined) user.city = city;
    if (state !== undefined) user.state = state;
    if (pincode !== undefined) user.pincode = pincode;
    if (languagePreference !== undefined) user.languagePreference = languagePreference;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        languagePreference: user.languagePreference
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user password
// @route   PUT /api/user/password
// @access  Private
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update Aadhaar details
// @route   PUT /api/user/aadhaar
// @access  Private
const updateAadhaarDetails = async (req, res) => {
  try {
    const { aadhaarNumber, aadhaarName } = req.body;

    if (!aadhaarNumber || !aadhaarName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Aadhaar number and name'
      });
    }

    // Validate Aadhaar number format (12 digits)
    if (!/^\d{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Aadhaar number. Must be 12 digits.'
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.aadhaarNumber = aadhaarNumber;
    user.aadhaarName = aadhaarName;
    // In production, you would verify Aadhaar through UIDAI API
    // For now, we'll mark as not verified until manual verification
    user.isAadhaarVerified = false;

    await user.save();

    res.json({
      success: true,
      message: 'Aadhaar details updated successfully',
      data: {
        aadhaarNumber: user.aadhaarNumber,
        aadhaarName: user.aadhaarName,
        isAadhaarVerified: user.isAadhaarVerified
      }
    });
  } catch (error) {
    console.error('Update Aadhaar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update bank details
// @route   PUT /api/user/bank-details
// @access  Private
const updateBankDetails = async (req, res) => {
  try {
    const { bankName, accountNumber, ifscCode, accountHolderName } = req.body;

    if (!bankName || !accountNumber || !ifscCode || !accountHolderName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all bank details'
      });
    }

    // Validate IFSC code format
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid IFSC code format'
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.bankDetails = {
      bankName,
      accountNumber,
      ifscCode,
      accountHolderName,
      isLinked: false // In production, verify through bank API
    };

    await user.save();

    res.json({
      success: true,
      message: 'Bank details updated successfully',
      data: {
        bankName: user.bankDetails.bankName,
        accountNumber: user.bankDetails.accountNumber,
        ifscCode: user.bankDetails.ifscCode,
        accountHolderName: user.bankDetails.accountHolderName,
        isLinked: user.bankDetails.isLinked
      }
    });
  } catch (error) {
    console.error('Update bank details error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update notification preferences
// @route   PUT /api/user/notifications
// @access  Private
const updateNotificationPreferences = async (req, res) => {
  try {
    const { emailNotifications, smsNotifications } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (emailNotifications !== undefined) {
      user.notificationPreferences = {
        ...user.notificationPreferences,
        email: emailNotifications
      };
    }

    if (smsNotifications !== undefined) {
      user.notificationPreferences = {
        ...user.notificationPreferences,
        sms: smsNotifications
      };
    }

    await user.save();

    res.json({
      success: true,
      message: 'Notification preferences updated successfully',
      data: user.notificationPreferences
    });
  } catch (error) {
    console.error('Update notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Track article read
// @route   POST /api/user/track-article
// @access  Private
const trackArticleRead = async (req, res) => {
  try {
    const { articleId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Initialize learningProgress if not exists
    if (!user.learningProgress) {
      user.learningProgress = {
        articlesRead: [],
        coursesCompleted: [],
        certificatesEarned: 0,
        totalProgress: 0
      };
    }

    // Add article to read list if not already there
    if (!user.learningProgress.articlesRead.includes(articleId)) {
      user.learningProgress.articlesRead.push(articleId);
      await user.save();
    }

    res.json({
      success: true,
      message: 'Article tracked successfully',
      data: {
        articlesRead: user.learningProgress.articlesRead.length
      }
    });
  } catch (error) {
    console.error('Track article error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user statistics
// @route   GET /api/user/stats
// @access  Private
const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('learningProgress');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Initialize if not exists
    const stats = user.learningProgress || {
      articlesRead: [],
      coursesCompleted: [],
      certificatesEarned: 0,
      totalProgress: 0
    };

    res.json({
      success: true,
      data: {
        articlesRead: stats.articlesRead.length,
        coursesCompleted: stats.coursesCompleted.length,
        certificatesEarned: stats.certificatesEarned,
        totalProgress: stats.totalProgress
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  updateAadhaarDetails,
  updateBankDetails,
  updateNotificationPreferences,
  trackArticleRead,
  getUserStats
};
