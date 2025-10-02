const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String, 
    required: true,
    trim: true
  },
  content: { 
    type: String, 
    required: true
  },
  contentType: { 
    type: String, 
    enum: ['article', 'video', 'infographic', 'guide', 'faq'],
    required: true
  },
  category: { 
    type: String, 
    required: true,
    enum: ['aadhaar-basics', 'dbt-info', 'scholarship-guide', 'bank-linking', 'troubleshooting', 'news-updates']
  },
  tags: [{ 
    type: String,
    trim: true
  }],
  language: { 
    type: String, 
    required: true, 
    default: 'en',
    enum: ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'or']
  },
  difficulty: { 
    type: String, 
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimatedReadTime: { 
    type: Number,
    min: 1
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  isPublished: { 
    type: Boolean, 
    default: false
  },
  publishedAt: { 
    type: Date
  },
  viewCount: { 
    type: Number, 
    default: 0
  },
  likes: { 
    type: Number, 
    default: 0
  },
  featured: { 
    type: Boolean, 
    default: false
  },
  mediaUrls: [{ 
    type: String
  }],
  metaDescription: { 
    type: String,
    maxlength: 160
  },
  seoKeywords: [{
    type: String,
    trim: true
  }],
  lastModified: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

// Index for search functionality
contentSchema.index({ 
  title: 'text', 
  description: 'text', 
  content: 'text', 
  tags: 'text' 
});

// Index for filtering
contentSchema.index({ category: 1, isPublished: 1 });
contentSchema.index({ featured: 1, isPublished: 1 });
contentSchema.index({ language: 1, isPublished: 1 });

// Index for sorting by popularity
contentSchema.index({ viewCount: -1, isPublished: 1 });
contentSchema.index({ likes: -1, isPublished: 1 });

module.exports = mongoose.model('Content', contentSchema);