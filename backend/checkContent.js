const mongoose = require('mongoose');
require('dotenv').config();

const Content = require('./src/models/Content');

const checkContent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Get total count
    const total = await Content.countDocuments();
    console.log('Total articles in database:', total);

    // Get all articles
    const allArticles = await Content.find({})
      .select('title category readingTime estimatedReadTime content')
      .sort('-createdAt')
      .limit(13);

    console.log('\nAll Articles:');
    console.log('='.repeat(60));
    
    allArticles.forEach((article, index) => {
      console.log(`\n${index + 1}. ${article.title}`);
      console.log(`   Category: ${article.category}`);
      console.log(`   Reading Time: ${article.readingTime || article.estimatedReadTime || 'N/A'} min`);
      console.log(`   Content Type: ${typeof article.content}`);
      console.log(`   Content Length: ${article.content ? article.content.length : 0} characters`);
      
      if (article.content) {
        const preview = article.content.substring(0, 150).replace(/\s+/g, ' ').trim();
        console.log(`   Preview: ${preview}...`);
      } else {
        console.log(`   ⚠️  WARNING: Content is empty!`);
      }
    });

    await mongoose.connection.close();
    console.log('\n\nDatabase connection closed.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkContent();
