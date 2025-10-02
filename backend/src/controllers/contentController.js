const Content = require('../models/Content');

// @desc    Get all content with pagination and filtering
// @route   GET /api/content
// @access  Public
const getAllContent = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      contentType,
      language = 'en',
      difficulty,
      featured,
      search
    } = req.query;

    // Build query
    const query = { isPublished: true };

    if (category) query.category = category;
    if (contentType) query.contentType = contentType;
    if (language) query.language = language;
    if (difficulty) query.difficulty = difficulty;
    if (featured !== undefined) query.featured = featured === 'true';

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const total = await Content.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // Fetch content
    let contentQuery = Content.find(query)
      .populate('author', 'firstName lastName username')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // If searching, sort by relevance score
    if (search) {
      contentQuery = contentQuery.sort({ score: { $meta: 'textScore' } });
    }

    const content = await contentQuery.exec();

    res.json({
      success: true,
      data: {
        content,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit),
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: error.message
    });
  }
};

// @desc    Get single content by ID
// @route   GET /api/content/:id
// @access  Public
const getContentById = async (req, res) => {
  try {
    // Use findByIdAndUpdate with $inc for atomic increment (prevents race conditions)
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { $inc: { viewCount: 1 } },
      { new: true } // Return the updated document
    ).populate('author', 'firstName lastName username');

    if (!content || !content.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content',
      error: error.message
    });
  }
};

// @desc    Get featured content
// @route   GET /api/content/featured
// @access  Public
const getFeaturedContent = async (req, res) => {
  try {
    const { language = 'en', limit = 5 } = req.query;

    const content = await Content.find({
      isPublished: true,
      featured: true,
      language
    })
      .populate('author', 'firstName lastName username')
      .limit(parseInt(limit))
      .sort({ publishedAt: -1 });

    res.json({
      success: true,
      data: { content }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured content',
      error: error.message
    });
  }
};

// @desc    Get content categories
// @route   GET /api/content/categories
// @access  Public
const getContentCategories = async (req, res) => {
  try {
    const { language = 'en' } = req.query;

    const categories = await Content.aggregate([
      { $match: { isPublished: true, language } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content categories',
      error: error.message
    });
  }
};

// @desc    Create new content (Admin only)
// @route   POST /api/content
// @access  Private/Admin
const createContent = async (req, res) => {
  try {
    const contentData = {
      ...req.body,
      author: req.user._id
    };

    // Calculate estimated read time (average 200 words per minute)
    if (req.body.content) {
      const wordCount = req.body.content.split(/\s+/).length;
      contentData.estimatedReadTime = Math.ceil(wordCount / 200);
    }

    const content = await Content.create(contentData);

    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: { content }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create content',
      error: error.message
    });
  }
};

// @desc    Update content (Admin only)
// @route   PUT /api/content/:id
// @access  Private/Admin
const updateContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    // Update estimated read time if content is modified
    if (req.body.content) {
      const wordCount = req.body.content.split(/\s+/).length;
      req.body.estimatedReadTime = Math.ceil(wordCount / 200);
    }

    req.body.lastModified = new Date();

    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName username');

    res.json({
      success: true,
      message: 'Content updated successfully',
      data: { content: updatedContent }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update content',
      error: error.message
    });
  }
};

// @desc    Delete content (Admin only)
// @route   DELETE /api/content/:id
// @access  Private/Admin
const deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    await Content.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete content',
      error: error.message
    });
  }
};

module.exports = {
  getAllContent,
  getContentById,
  getFeaturedContent,
  getContentCategories,
  createContent,
  updateContent,
  deleteContent
};