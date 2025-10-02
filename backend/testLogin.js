require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');

const testLogin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@dbtaware.gov.in' }).select('+password');
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      process.exit(1);
    }

    console.log('✅ Admin user found:');
    console.log('  Email:', admin.email);
    console.log('  Username:', admin.username);
    console.log('  Role:', admin.role);
    console.log('  isActive:', admin.isActive);
    console.log('  Password hash:', admin.password.substring(0, 20) + '...');

    // Test password comparison
    const testPassword = 'Admin@123';
    console.log('\nTesting password:', testPassword);
    
    const isMatch = await admin.comparePassword(testPassword);
    console.log('Password match result:', isMatch ? '✅ CORRECT' : '❌ INCORRECT');

    // Try a few variations
    const variations = ['admin@123', 'ADMIN@123', 'Admin123', 'Admin@12'];
    for (const pwd of variations) {
      const match = await admin.comparePassword(pwd);
      console.log(`  "${pwd}": ${match ? '✅' : '❌'}`);
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

testLogin();
