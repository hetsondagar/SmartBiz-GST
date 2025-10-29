import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload, processImages } from '../middleware/upload.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Create a new quick add request
router.post('/create', 
  authenticateToken,
  upload.array('images', 3),
  processImages,
  [
    body('title').trim().isLength({ min: 1, max: 255 }).withMessage('Title is required and must be less than 255 characters'),
    body('description').trim().isLength({ min: 1, max: 1000 }).withMessage('Description is required and must be less than 1000 characters'),
    body('category').trim().isLength({ min: 1, max: 100 }).withMessage('Category is required'),
    body('productType').isIn(['promotion', 'request']).withMessage('Product type must be either promotion or request'),
    body('duration').isInt({ min: 1, max: 7 }).withMessage('Duration must be between 1 and 7 days'),
    body('designPreference').optional().isIn(['Minimal', 'Modern', 'Poster', 'Animated']).withMessage('Invalid design preference'),
    body('priceRange').optional().trim().isLength({ max: 100 }).withMessage('Price range must be less than 100 characters')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const {
        title,
        description,
        category,
        productType,
        duration,
        designPreference = 'Modern',
        priceRange
      } = req.body;

      const userId = req.user.id;
      const now = new Date();
      const expiresAt = new Date(now.getTime() + duration * 24 * 60 * 60 * 1000);

      // Process uploaded images
      const images = req.files ? req.files.map(file => ({
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype
      })) : [];

      // Insert quick add request
      const result = await pool.query(`
        INSERT INTO quick_add_requests (
          user_id, title, description, category, product_type, 
          price_range, duration_days, design_preference, images, 
          expires_at, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending')
        RETURNING *
      `, [
        userId, title, description, category, productType,
        priceRange, duration, designPreference, JSON.stringify(images),
        expiresAt
      ]);

      const quickAdd = result.rows[0];

      res.status(201).json({
        success: true,
        message: 'Quick add request created successfully',
        data: {
          id: quickAdd.id,
          title: quickAdd.title,
          description: quickAdd.description,
          category: quickAdd.category,
          productType: quickAdd.product_type,
          priceRange: quickAdd.price_range,
          duration: quickAdd.duration_days,
          designPreference: quickAdd.design_preference,
          images: JSON.parse(quickAdd.images),
          status: quickAdd.status,
          createdAt: quickAdd.created_at,
          expiresAt: quickAdd.expires_at
        }
      });
    } catch (error) {
      console.error('Error creating quick add:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create quick add request',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Get all quick add requests (with filtering and pagination)
router.get('/all',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
    query('status').optional().isIn(['pending', 'approved', 'rejected', 'expired']).withMessage('Invalid status'),
    query('productType').optional().isIn(['promotion', 'request']).withMessage('Invalid product type'),
    query('category').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Invalid category'),
    query('sortBy').optional().isIn(['created_at', 'expires_at', 'views', 'likes']).withMessage('Invalid sort field'),
    query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 10,
        status = 'approved',
        productType,
        category,
        sortBy = 'created_at',
        sortOrder = 'desc'
      } = req.query;

      const offset = (page - 1) * limit;

      // Build query conditions
      let whereConditions = ['qa.status = $1'];
      let queryParams = [status];
      let paramCount = 1;

      if (productType) {
        paramCount++;
        whereConditions.push(`qa.product_type = $${paramCount}`);
        queryParams.push(productType);
      }

      if (category) {
        paramCount++;
        whereConditions.push(`qa.category = $${paramCount}`);
        queryParams.push(category);
      }

      // Add pagination parameters
      paramCount++;
      queryParams.push(limit);
      paramCount++;
      queryParams.push(offset);

      const query = `
        SELECT 
          qa.id,
          qa.title,
          qa.description,
          qa.category,
          qa.product_type,
          qa.price_range,
          qa.duration_days,
          qa.design_preference,
          qa.images,
          qa.status,
          qa.views,
          qa.likes,
          qa.created_at,
          qa.expires_at,
          u.first_name,
          u.last_name,
          u.business_name,
          u.city,
          u.state,
          COALESCE(like_count.like_count, 0) as like_count,
          CASE 
            WHEN user_likes.user_id IS NOT NULL THEN true 
            ELSE false 
          END as is_liked
        FROM quick_add_requests qa
        JOIN users u ON qa.user_id = u.id
        LEFT JOIN (
          SELECT quick_add_id, COUNT(*) as like_count
          FROM quick_add_likes
          GROUP BY quick_add_id
        ) like_count ON qa.id = like_count.quick_add_id
        LEFT JOIN quick_add_likes user_likes ON qa.id = user_likes.quick_add_id AND user_likes.user_id = $${paramCount + 1}
        WHERE ${whereConditions.join(' AND ')}
        ORDER BY qa.${sortBy} ${sortOrder.toUpperCase()}
        LIMIT $${paramCount - 1} OFFSET $${paramCount}
      `;

      // Add user_id parameter for is_liked check (null for non-authenticated users)
      queryParams.push(req.user?.id || null);

      const result = await pool.query(query, queryParams);

      // Get total count for pagination
      const countQuery = `
        SELECT COUNT(*) as total
        FROM quick_add_requests qa
        WHERE ${whereConditions.slice(0, -2).join(' AND ')}
      `;
      const countResult = await pool.query(countQuery, queryParams.slice(0, -3));

      const total = parseInt(countResult.rows[0].total);
      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: result.rows.map(row => ({
          id: row.id,
          title: row.title,
          description: row.description,
          category: row.category,
          productType: row.product_type,
          priceRange: row.price_range,
          duration: row.duration_days,
          designPreference: row.design_preference,
          images: JSON.parse(row.images),
          status: row.status,
          views: row.views,
          likes: row.like_count,
          isLiked: row.is_liked,
          createdAt: row.created_at,
          expiresAt: row.expires_at,
          user: {
            name: `${row.first_name} ${row.last_name}`,
            businessName: row.business_name,
            location: `${row.city}, ${row.state}`
          }
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      });
    } catch (error) {
      console.error('Error fetching quick adds:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch quick add requests',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Get quick add requests for a specific user
router.get('/user/:userId',
  authenticateToken,
  [
    param('userId').isUUID().withMessage('Invalid user ID'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      // Check if user is accessing their own data or is admin
      if (req.user.id !== userId && req.user.user_type !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      const result = await pool.query(`
        SELECT 
          qa.*,
          u.first_name,
          u.last_name,
          u.business_name
        FROM quick_add_requests qa
        JOIN users u ON qa.user_id = u.id
        WHERE qa.user_id = $1
        ORDER BY qa.created_at DESC
        LIMIT $2 OFFSET $3
      `, [userId, limit, offset]);

      const countResult = await pool.query(`
        SELECT COUNT(*) as total
        FROM quick_add_requests
        WHERE user_id = $1
      `, [userId]);

      const total = parseInt(countResult.rows[0].total);
      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: result.rows.map(row => ({
          id: row.id,
          title: row.title,
          description: row.description,
          category: row.category,
          productType: row.product_type,
          priceRange: row.price_range,
          duration: row.duration_days,
          designPreference: row.design_preference,
          images: JSON.parse(row.images),
          status: row.status,
          views: row.views,
          likes: row.likes,
          createdAt: row.created_at,
          expiresAt: row.expires_at,
          user: {
            name: `${row.first_name} ${row.last_name}`,
            businessName: row.business_name
          }
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      });
    } catch (error) {
      console.error('Error fetching user quick adds:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user quick add requests',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Get a single quick add request by ID
router.get('/:id',
  [
    param('id').isUUID().withMessage('Invalid quick add ID')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;

      const result = await pool.query(`
        SELECT 
          qa.*,
          u.first_name,
          u.last_name,
          u.business_name,
          u.city,
          u.state,
          COALESCE(like_count.like_count, 0) as like_count,
          CASE 
            WHEN user_likes.user_id IS NOT NULL THEN true 
            ELSE false 
          END as is_liked
        FROM quick_add_requests qa
        JOIN users u ON qa.user_id = u.id
        LEFT JOIN (
          SELECT quick_add_id, COUNT(*) as like_count
          FROM quick_add_likes
          GROUP BY quick_add_id
        ) like_count ON qa.id = like_count.quick_add_id
        LEFT JOIN quick_add_likes user_likes ON qa.id = user_likes.quick_add_id AND user_likes.user_id = $2
        WHERE qa.id = $1
      `, [id, req.user?.id || null]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Quick add request not found'
        });
      }

      const quickAdd = result.rows[0];

      // Increment view count
      await pool.query(`
        INSERT INTO quick_add_views (quick_add_id, user_id, ip_address, user_agent)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT DO NOTHING
      `, [id, req.user?.id || null, req.ip, req.get('User-Agent')]);

      // Update view count
      await pool.query(`
        UPDATE quick_add_requests 
        SET views = views + 1 
        WHERE id = $1
      `, [id]);

      res.json({
        success: true,
        data: {
          id: quickAdd.id,
          title: quickAdd.title,
          description: quickAdd.description,
          category: quickAdd.category,
          productType: quickAdd.product_type,
          priceRange: quickAdd.price_range,
          duration: quickAdd.duration_days,
          designPreference: quickAdd.design_preference,
          images: JSON.parse(quickAdd.images),
          status: quickAdd.status,
          views: quickAdd.views + 1,
          likes: quickAdd.like_count,
          isLiked: quickAdd.is_liked,
          createdAt: quickAdd.created_at,
          expiresAt: quickAdd.expires_at,
          user: {
            name: `${quickAdd.first_name} ${quickAdd.last_name}`,
            businessName: quickAdd.business_name,
            location: `${quickAdd.city}, ${quickAdd.state}`
          }
        }
      });
    } catch (error) {
      console.error('Error fetching quick add:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch quick add request',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Like/Unlike a quick add request
router.post('/:id/like',
  authenticateToken,
  [
    param('id').isUUID().withMessage('Invalid quick add ID')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      // Check if quick add exists
      const quickAddResult = await pool.query(`
        SELECT id, likes FROM quick_add_requests WHERE id = $1
      `, [id]);

      if (quickAddResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Quick add request not found'
        });
      }

      // Check if user already liked this quick add
      const existingLike = await pool.query(`
        SELECT id FROM quick_add_likes WHERE user_id = $1 AND quick_add_id = $2
      `, [userId, id]);

      if (existingLike.rows.length > 0) {
        // Unlike
        await pool.query(`
          DELETE FROM quick_add_likes WHERE user_id = $1 AND quick_add_id = $2
        `, [userId, id]);

        await pool.query(`
          UPDATE quick_add_requests SET likes = likes - 1 WHERE id = $1
        `, [id]);

        res.json({
          success: true,
          message: 'Quick add unliked successfully',
          liked: false
        });
      } else {
        // Like
        await pool.query(`
          INSERT INTO quick_add_likes (user_id, quick_add_id) VALUES ($1, $2)
        `, [userId, id]);

        await pool.query(`
          UPDATE quick_add_requests SET likes = likes + 1 WHERE id = $1
        `, [id]);

        res.json({
          success: true,
          message: 'Quick add liked successfully',
          liked: true
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to toggle like',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Delete a quick add request
router.delete('/:id',
  authenticateToken,
  [
    param('id').isUUID().withMessage('Invalid quick add ID')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      // Check if quick add exists and user owns it
      const result = await pool.query(`
        SELECT id, user_id FROM quick_add_requests WHERE id = $1
      `, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Quick add request not found'
        });
      }

      if (result.rows[0].user_id !== userId && req.user.user_type !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      // Delete the quick add request (cascade will handle related records)
      await pool.query(`
        DELETE FROM quick_add_requests WHERE id = $1
      `, [id]);

      res.json({
        success: true,
        message: 'Quick add request deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting quick add:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete quick add request',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

export default router;
