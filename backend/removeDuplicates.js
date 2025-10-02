const mongoose = require('mongoose');
require('dotenv').config();

const Content = require('./src/models/Content');

const removeDuplicates = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Get all articles
    const allArticles = await Content.find({}).select('title createdAt estimatedReadTime').sort('createdAt');
    
    console.log('Total articles:', allArticles.length);
    console.log('\nLooking for duplicates...\n');

    // Group by title
    const titleGroups = {};
    allArticles.forEach(article => {
      if (!titleGroups[article.title]) {
        titleGroups[article.title] = [];
      }
      titleGroups[article.title].push(article);
    });

    // Find and remove duplicates (keep the newest one)
    let removedCount = 0;
    for (const title in titleGroups) {
      const articles = titleGroups[title];
      if (articles.length > 1) {
        console.log(`📄 Found ${articles.length} copies of: "${title}"`);
        
        // Sort by createdAt and keep the newest (last one)
        articles.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        
        // Remove all but the last (newest) one
        for (let i = 0; i < articles.length - 1; i++) {
          await Content.findByIdAndDelete(articles[i]._id);
          console.log(`   ❌ Removed older copy (${articles[i].createdAt})`);
          removedCount++;
        }
        console.log(`   ✅ Kept newest copy (${articles[articles.length - 1].createdAt})\n`);
      }
    }

    if (removedCount === 0) {
      console.log('✅ No duplicates found!');
    } else {
      console.log(`\n✅ Removed ${removedCount} duplicate article(s)`);
    }

    // Final count
    const finalCount = await Content.countDocuments();
    console.log(`\nFinal count: ${finalCount} unique articles`);

    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

removeDuplicates();
