import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

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

// Register new user
router.post('/register',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').trim().isLength({ min: 1, max: 100 }).withMessage('First name is required'),
    body('lastName').trim().isLength({ min: 1, max: 100 }).withMessage('Last name is required'),
    body('businessName').optional().trim().isLength({ max: 255 }).withMessage('Business name too long'),
    body('businessType').optional().trim().isLength({ max: 100 }).withMessage('Business type too long'),
    body('phone').optional().isMobilePhone().withMessage('Valid phone number required'),
    body('userType').optional().isIn(['shopkeeper', 'buyer']).withMessage('Invalid user type')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const {
        email,
        password,
        firstName,
        lastName,
        businessName,
        businessType,
        phone,
        userType = 'shopkeeper'
      } = req.body;

      // Check if user already exists
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Create user
      const result = await pool.query(`
        INSERT INTO users (
          email, password_hash, first_name, last_name, business_name, 
          business_type, phone, user_type
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, email, first_name, last_name, user_type, created_at
      `, [email, passwordHash, firstName, lastName, businessName, businessType, phone, userType]);

      const user = result.rows[0];

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            userType: user.user_type,
            createdAt: user.created_at
          },
          token
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to register user',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Login user
router.post('/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const result = await pool.query(`
        SELECT id, email, password_hash, first_name, last_name, user_type, 
               is_active, is_verified, business_name
        FROM users 
        WHERE email = $1
      `, [email]);

      if (result.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const user = result.rows[0];

      // Check if account is active
      if (!user.is_active) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            userType: user.user_type,
            isVerified: user.is_verified,
            businessName: user.business_name
          },
          token
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to login',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, email, first_name, last_name, business_name, business_type,
             phone, address, city, state, pincode, gst_number, user_type,
             is_verified, is_active, created_at
      FROM users 
      WHERE id = $1
    `, [req.user.id]);

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
        isVerified: user.is_verified,
        isActive: user.is_active,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update user profile
router.put('/profile', 
  authenticateToken,
  [
    body('firstName').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Invalid first name'),
    body('lastName').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Invalid last name'),
    body('businessName').optional().trim().isLength({ max: 255 }).withMessage('Business name too long'),
    body('businessType').optional().trim().isLength({ max: 100 }).withMessage('Business type too long'),
    body('phone').optional().isMobilePhone().withMessage('Valid phone number required'),
    body('address').optional().trim().isLength({ max: 500 }).withMessage('Address too long'),
    body('city').optional().trim().isLength({ max: 100 }).withMessage('City name too long'),
    body('state').optional().trim().isLength({ max: 100 }).withMessage('State name too long'),
    body('pincode').optional().isPostalCode('IN').withMessage('Valid Indian pincode required'),
    body('gstNumber').optional().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).withMessage('Invalid GST number format')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        businessName,
        businessType,
        phone,
        address,
        city,
        state,
        pincode,
        gstNumber
      } = req.body;

      // Build dynamic update query
      const updateFields = [];
      const values = [];
      let paramCount = 0;

      if (firstName !== undefined) {
        paramCount++;
        updateFields.push(`first_name = $${paramCount}`);
        values.push(firstName);
      }
      if (lastName !== undefined) {
        paramCount++;
        updateFields.push(`last_name = $${paramCount}`);
        values.push(lastName);
      }
      if (businessName !== undefined) {
        paramCount++;
        updateFields.push(`business_name = $${paramCount}`);
        values.push(businessName);
      }
      if (businessType !== undefined) {
        paramCount++;
        updateFields.push(`business_type = $${paramCount}`);
        values.push(businessType);
      }
      if (phone !== undefined) {
        paramCount++;
        updateFields.push(`phone = $${paramCount}`);
        values.push(phone);
      }
      if (address !== undefined) {
        paramCount++;
        updateFields.push(`address = $${paramCount}`);
        values.push(address);
      }
      if (city !== undefined) {
        paramCount++;
        updateFields.push(`city = $${paramCount}`);
        values.push(city);
      }
      if (state !== undefined) {
        paramCount++;
        updateFields.push(`state = $${paramCount}`);
        values.push(state);
      }
      if (pincode !== undefined) {
        paramCount++;
        updateFields.push(`pincode = $${paramCount}`);
        values.push(pincode);
      }
      if (gstNumber !== undefined) {
        paramCount++;
        updateFields.push(`gst_number = $${paramCount}`);
        values.push(gstNumber);
      }

      if (updateFields.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No fields to update'
        });
      }

      paramCount++;
      values.push(req.user.id);

      const result = await pool.query(`
        UPDATE users 
        SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $${paramCount}
        RETURNING *
      `, values);

      const user = result.rows[0];

      res.json({
        success: true,
        message: 'Profile updated successfully',
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
          isVerified: user.is_verified,
          isActive: user.is_active,
          updatedAt: user.updated_at
        }
      });
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update profile',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

// Change password
router.put('/change-password',
  authenticateToken,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      // Get current password hash
      const result = await pool.query(
        'SELECT password_hash FROM users WHERE id = $1',
        [req.user.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, result.rows[0].password_hash);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }

      // Hash new password
      const saltRounds = 12;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      await pool.query(
        'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [newPasswordHash, req.user.id]
      );

      res.json({
        success: true,
        message: 'Password changed successfully'
      });
    } catch (error) {
      console.error('Password change error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to change password',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      });
    }
  }
);

export default router;
