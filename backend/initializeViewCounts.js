const mongoose = require('mongoose');
require('dotenv').config();

const Content = require('./src/models/Content');

const initializeViewCounts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Get all articles
    const articles = await Content.find({}).select('title viewCount category');

    console.log('Initializing view counts for demonstration...\n');

    // Set realistic view counts based on category and title
    for (const article of articles) {
      let views = 0;

      // Featured/comprehensive articles get more views
      if (article.title.includes('Step-by-Step') || article.title.includes('Complete Guide')) {
        views = Math.floor(Math.random() * 500) + 200; // 200-700 views
      } else if (article.title.includes('Troubleshooting')) {
        views = Math.floor(Math.random() * 800) + 400; // 400-1200 views (high traffic)
      } else if (article.title.includes('Essential Documents')) {
        views = Math.floor(Math.random() * 600) + 300; // 300-900 views
      } else if (article.title.includes('Scholarship')) {
        views = Math.floor(Math.random() * 700) + 350; // 350-1050 views
      } else {
        views = Math.floor(Math.random() * 300) + 100; // 100-400 views
      }

      await Content.findByIdAndUpdate(
        article._id,
        { $set: { viewCount: views } }
      );

      console.log(`✅ ${article.title}`);
      console.log(`   Category: ${article.category}`);
      console.log(`   Views: ${views}\n`);
    }

    // Show final statistics
    const allArticles = await Content.find({}).select('title viewCount').sort({ viewCount: -1 });
    
    console.log('='.repeat(60));
    console.log('\n📊 Final View Count Statistics:\n');
    console.log('Most Popular Articles:');
    console.log('='.repeat(60) + '\n');
    
    allArticles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   👁️  ${article.viewCount} views\n`);
    });

    const totalViews = allArticles.reduce((sum, article) => sum + (article.viewCount || 0), 0);
    const avgViews = Math.round(totalViews / allArticles.length);
    
    console.log('='.repeat(60));
    console.log(`Total Views Across All Articles: ${totalViews}`);
    console.log(`Average Views Per Article: ${avgViews}`);
    console.log('='.repeat(60));

    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

initializeViewCounts();
