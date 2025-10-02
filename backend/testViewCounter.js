const mongoose = require('mongoose');
require('dotenv').config();

const Content = require('./src/models/Content');

const testViewCounter = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Get the troubleshooting article (should have highest views)
    const article = await Content.findOne({ title: /Troubleshooting/ });
    
    console.log('Testing View Counter Functionality');
    console.log('='.repeat(60));
    console.log(`\n📄 Article: ${article.title}`);
    console.log(`👁️  Current View Count: ${article.viewCount}\n`);

    // Simulate 5 views
    console.log('Simulating 5 article views...\n');
    
    for (let i = 1; i <= 5; i++) {
      // Using atomic increment (same as API does)
      const updated = await Content.findByIdAndUpdate(
        article._id,
        { $inc: { viewCount: 1 } },
        { new: true }
      );
      
      console.log(`View ${i}: Count is now ${updated.viewCount}`);
    }

    // Final verification
    const finalArticle = await Content.findById(article._id);
    console.log(`\n✅ Final View Count: ${finalArticle.viewCount}`);
    console.log(`✅ Successfully incremented by 5 views!`);
    
    // Show all articles sorted by views
    console.log('\n' + '='.repeat(60));
    console.log('All Articles Sorted by Popularity:');
    console.log('='.repeat(60) + '\n');
    
    const allArticles = await Content.find({}).select('title viewCount').sort({ viewCount: -1 });
    allArticles.forEach((a, idx) => {
      const formattedCount = a.viewCount < 1000 
        ? a.viewCount 
        : (a.viewCount / 1000).toFixed(1) + 'K';
      console.log(`${idx + 1}. ${a.title}`);
      console.log(`   👁️  ${formattedCount} views\n`);
    });

    await mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

testViewCounter();
