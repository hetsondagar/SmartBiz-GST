import express from 'express';
import { param, query, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

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

// Get all users (admin only)
router.get('/',
  authenticateToken,
  requireAdmin,
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('userType').optional().isIn(['shopkeeper', 'buyer', 'admin']).withMessage('Invalid user type'),
    query('isActive').optional().isBoolean().withMessage('isActive must be boolean'),
    query('search').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Search term too long')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const {
        page = 1,
        limit = 20,
        userType,
        isActive,
        search
      } = req.query;

      const offset = (page - 1) * limit;

      // Build query conditions
      let whereConditions = [];
      let queryParams = [];
      let paramCount = 0;

      if (userType) {
        paramCount++;
        whereConditions.push(`user_type = $${paramCount}`);
        queryParams.push(userType);
      }

      if (isActive !== undefined) {
        paramCount++;
        whereConditions.push(`is_active = $${paramCount}`);
        queryParams.push(isActive === 'true');
      }

      if (search) {
        paramCount++;
        whereConditions.push(`(
          first_name ILIKE $${paramCount} OR 
          last_name ILIKE $${paramCount} OR 
          email ILIKE $${paramCount} OR 
          business_name ILIKE $${paramCount}
        )`);
        queryParams.push(`%${search}%`);
      }

      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

      // Get users
      const result = await pool.query(`
        SELECT 
          id, email, first_name, last_name, business_name, business_type,
          phone, city, state, user_type, is_active, is_verified, created_at
        FROM users 
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}
      `, [...queryParams, limit, offset]);

      // Get total count
      const countResult = await pool.query(`
        SELECT COUNT(*) as total
        FROM users 
        ${whereClause}
      `, queryParams);

      const total = parseInt(countResult.rows[0].total);
      const totalPages = Math.ceil(total / limit);

      res.json({
        success: true,
        data: result.rows.map(user => ({
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          businessName: user.business_name,
          businessType: user.business_type,
          phone: user.phone,
          location: `${user.city}, ${user.state}`,
          userType: user.user_type,
          isActive: user.is_active,
          isVerified: user.is_verified,
          createdAt: user.created_at
        })),
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Get user by ID
router.get('/:id',
  authenticateToken,
  [
    param('id').isUUID().withMessage('Invalid user ID')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Check if user is accessing their own data or is admin
      if (req.user.id !== id && req.user.userType !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      const result = await pool.query(`
        SELECT 
          id, email, first_name, last_name, business_name, business_type,
          phone, address, city, state, pincode, gst_number, user_type,
          is_active, is_verified, created_at, updated_at
        FROM users 
        WHERE id = $1
      `, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const user = result.rows[0];

      res.json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          businessName: user.business_name,
          businessType: user.business_type,
          phone: user.phone,
          address: user.address,
          city: user.city,
          state: user.state,
          pincode: user.pincode,
          gstNumber: user.gst_number,
          userType: user.user_type,
          isActive: user.is_active,
          isVerified: user.is_verified,
          createdAt: user.created_at,
          updatedAt: user.updated_at
        }
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Deactivate user (admin only)
router.put('/:id/deactivate',
  authenticateToken,
  requireAdmin,
  [
    param('id').isUUID().withMessage('Invalid user ID')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Check if user exists
      const userResult = await pool.query(
        'SELECT id, is_active FROM users WHERE id = $1',
        [id]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (!userResult.rows[0].is_active) {
        return res.status(400).json({
          success: false,
          message: 'User is already deactivated'
        });
      }

      // Deactivate user
      await pool.query(
        'UPDATE users SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [id]
      );

      res.json({
        success: true,
        message: 'User deactivated successfully'
      });
    } catch (error) {
      console.error('Error deactivating user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to deactivate user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Activate user (admin only)
router.put('/:id/activate',
  authenticateToken,
  requireAdmin,
  [
    param('id').isUUID().withMessage('Invalid user ID')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Check if user exists
      const userResult = await pool.query(
        'SELECT id, is_active FROM users WHERE id = $1',
        [id]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (userResult.rows[0].is_active) {
        return res.status(400).json({
          success: false,
          message: 'User is already active'
        });
      }

      // Activate user
      await pool.query(
        'UPDATE users SET is_active = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [id]
      );

      res.json({
        success: true,
        message: 'User activated successfully'
      });
    } catch (error) {
      console.error('Error activating user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to activate user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Delete user (admin only)
router.delete('/:id',
  authenticateToken,
  requireAdmin,
  [
    param('id').isUUID().withMessage('Invalid user ID')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { id } = req.params;

      // Check if user exists
      const userResult = await pool.query(
        'SELECT id FROM users WHERE id = $1',
        [id]
      );

      if (userResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Delete user (cascade will handle related records)
      await pool.query('DELETE FROM users WHERE id = $1', [id]);

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

export default router;
