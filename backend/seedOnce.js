const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');

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

const seedAdminIfNotExists = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@dbtaware.gov.in' });

        if (existingAdmin) {
            console.log('✅ Admin user already exists. Skipping seed.');
            process.exit(0);
        }

        // Create admin user only if it doesn't exist
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

        console.log('✅ Admin user created successfully!');
        console.log('\nAdmin Credentials:');
        console.log('Email: admin@dbtaware.gov.in');
        console.log('Password: Admin@123');
        console.log('\n⚠️ Please change this password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdminIfNotExists();
