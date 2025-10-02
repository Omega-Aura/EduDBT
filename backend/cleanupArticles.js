const mongoose = require('mongoose');
require('dotenv').config();

const Content = require('./src/models/Content');

const cleanupArticles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Remove the old shorter versions (keeping the new comprehensive ones)
    const articlesToRemove = [
      'Essential Documents Required for Aadhaar-Bank Account Seeding & DBT', // Old (15 min)
      'How to Check Your DBT Status Online: Complete Verification Guide', // Old in troubleshooting category
      'Pre-Matric Scholarship Schemes for SC Students' // Old (10 min)
    ];

    console.log('Removing old versions of articles...\n');

    for (const title of articlesToRemove) {
      const article = await Content.findOne({ title });
      if (article) {
        console.log(`❌ Removing: ${article.title}`);
        console.log(`   Category: ${article.category}, Reading Time: ${article.estimatedReadTime} min`);
        console.log(`   Content Length: ${article.content.length} characters\n`);
        
        await Content.findByIdAndDelete(article._id);
      }
    }

    // Final verification
    const finalArticles = await Content.find({}).select('title category estimatedReadTime').sort('title');
    
    console.log('='.repeat(60));
    console.log(`\n✅ Cleanup complete! Final count: ${finalArticles.length} articles\n`);
    console.log('Remaining Articles:');
    console.log('='.repeat(60) + '\n');
    
    finalArticles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   Category: ${article.category}, Reading Time: ${article.estimatedReadTime} min\n`);
    });

    await mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

cleanupArticles();
