import pool from '../config/database.js';

const createTables = async () => {
  try {
    console.log('🔄 Starting database migration...');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        business_name VARCHAR(255),
        business_type VARCHAR(100),
        phone VARCHAR(20),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        pincode VARCHAR(10),
        gst_number VARCHAR(15),
        user_type VARCHAR(20) DEFAULT 'shopkeeper' CHECK (user_type IN ('shopkeeper', 'buyer', 'admin')),
        is_verified BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create quick_add_requests table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quick_add_requests (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        product_type VARCHAR(20) NOT NULL CHECK (product_type IN ('promotion', 'request')),
        price_range VARCHAR(100),
        duration_days INTEGER NOT NULL CHECK (duration_days >= 1 AND duration_days <= 7),
        design_preference VARCHAR(50) DEFAULT 'Modern',
        images JSONB DEFAULT '[]',
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL,
        approved_at TIMESTAMP,
        rejected_at TIMESTAMP,
        rejection_reason TEXT,
        created_by UUID REFERENCES users(id),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create quick_add_likes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quick_add_likes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        quick_add_id UUID NOT NULL REFERENCES quick_add_requests(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, quick_add_id)
      );
    `);

    // Create quick_add_views table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quick_add_views (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        quick_add_id UUID NOT NULL REFERENCES quick_add_requests(id) ON DELETE CASCADE,
        ip_address INET,
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quick_add_requests_user_id ON quick_add_requests(user_id);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quick_add_requests_status ON quick_add_requests(status);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quick_add_requests_expires_at ON quick_add_requests(expires_at);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quick_add_requests_created_at ON quick_add_requests(created_at);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quick_add_likes_user_id ON quick_add_likes(user_id);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quick_add_likes_quick_add_id ON quick_add_likes(quick_add_id);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_quick_add_views_quick_add_id ON quick_add_views(quick_add_id);
    `);

    // Create function to automatically update updated_at timestamp
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Create triggers for updated_at
    await pool.query(`
      CREATE TRIGGER update_users_updated_at 
      BEFORE UPDATE ON users 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    await pool.query(`
      CREATE TRIGGER update_quick_add_requests_updated_at 
      BEFORE UPDATE ON quick_add_requests 
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log('✅ Database migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

const dropTables = async () => {
  try {
    console.log('🔄 Dropping all tables...');
    
    await pool.query('DROP TABLE IF EXISTS quick_add_views CASCADE;');
    await pool.query('DROP TABLE IF EXISTS quick_add_likes CASCADE;');
    await pool.query('DROP TABLE IF EXISTS quick_add_requests CASCADE;');
    await pool.query('DROP TABLE IF EXISTS users CASCADE;');
    await pool.query('DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;');
    
    console.log('✅ All tables dropped successfully!');
  } catch (error) {
    console.error('❌ Drop tables failed:', error);
    process.exit(1);
  }
};

// Run migration based on command line argument
const command = process.argv[2];

if (command === 'drop') {
  dropTables().then(() => process.exit(0));
} else {
  createTables().then(() => process.exit(0));
}
