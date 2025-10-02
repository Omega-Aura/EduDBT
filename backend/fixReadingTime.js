const mongoose = require('mongoose');
require('dotenv').config();

const Content = require('./src/models/Content');

const fixReadingTime = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Define the reading times for each article
    const updates = [
      { title: /Essential Documents Required for Aadhaar-Bank Account Seeding and DBT/, estimatedReadTime: 20 },
      { title: /Step-by-Step Guide to Enable DBT for Your Account/, estimatedReadTime: 16 },
      { title: /Step-by-Step Guide: Linking Aadhaar to Bank Account/, estimatedReadTime: 18 },
      { title: /How to Check Your DBT Status Online - Complete Verification Guide/, estimatedReadTime: 12 },
      { title: /Pre-Matric Scholarship Schemes for SC Students - Complete Guide/, estimatedReadTime: 20 },
      { title: /^Troubleshooting Common Aadhaar and DBT Issues$/, estimatedReadTime: 15 }
    ];

    console.log('Updating reading times for new articles...\n');

    for (const update of updates) {
      const result = await Content.updateMany(
        { title: update.title },
        { $set: { estimatedReadTime: update.estimatedReadTime } }
      );
      
      const articles = await Content.find({ title: update.title }).select('title estimatedReadTime');
      articles.forEach(article => {
        console.log(`✅ Updated: ${article.title}`);
        console.log(`   Reading Time: ${article.estimatedReadTime} min\n`);
      });
    }

    // Verify all articles now have reading times
    const articlesWithoutTime = await Content.find({ estimatedReadTime: { $exists: false } }).select('title');
    if (articlesWithoutTime.length > 0) {
      console.log('\n⚠️  Articles still missing reading time:');
      articlesWithoutTime.forEach(a => console.log('  -', a.title));
    } else {
      console.log('✅ All articles now have reading times!');
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

fixReadingTime();
