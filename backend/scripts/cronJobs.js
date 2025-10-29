import cron from 'node-cron';
import pool from '../config/database.js';

// Function to mark expired quick adds as expired
const markExpiredQuickAdds = async () => {
  try {
    console.log('🔄 Checking for expired quick adds...');
    
    const result = await pool.query(`
      UPDATE quick_add_requests 
      SET status = 'expired', updated_at = CURRENT_TIMESTAMP
      WHERE status = 'approved' 
      AND expires_at < CURRENT_TIMESTAMP
      RETURNING id, title, user_id
    `);

    if (result.rows.length > 0) {
      console.log(`✅ Marked ${result.rows.length} quick adds as expired:`, 
        result.rows.map(row => ({ id: row.id, title: row.title }))
      );
    } else {
      console.log('ℹ️ No expired quick adds found');
    }
  } catch (error) {
    console.error('❌ Error marking expired quick adds:', error);
  }
};

// Function to clean up old expired quick adds (older than 30 days)
const cleanupOldQuickAdds = async () => {
  try {
    console.log('🧹 Cleaning up old expired quick adds...');
    
    const result = await pool.query(`
      DELETE FROM quick_add_requests 
      WHERE status = 'expired' 
      AND updated_at < CURRENT_TIMESTAMP - INTERVAL '30 days'
      RETURNING id, title
    `);

    if (result.rows.length > 0) {
      console.log(`🗑️ Deleted ${result.rows.length} old expired quick adds:`, 
        result.rows.map(row => ({ id: row.id, title: row.title }))
      );
    } else {
      console.log('ℹ️ No old expired quick adds to clean up');
    }
  } catch (error) {
    console.error('❌ Error cleaning up old quick adds:', error);
  }
};

// Function to send notifications for expiring quick adds (24 hours before expiry)
const notifyExpiringQuickAdds = async () => {
  try {
    console.log('📧 Checking for expiring quick adds...');
    
    const result = await pool.query(`
      SELECT qa.id, qa.title, qa.expires_at, u.email, u.first_name, u.last_name
      FROM quick_add_requests qa
      JOIN users u ON qa.user_id = u.id
      WHERE qa.status = 'approved'
      AND qa.expires_at BETWEEN CURRENT_TIMESTAMP + INTERVAL '23 hours' 
      AND CURRENT_TIMESTAMP + INTERVAL '25 hours'
    `);

    if (result.rows.length > 0) {
      console.log(`📬 Found ${result.rows.length} quick adds expiring soon:`, 
        result.rows.map(row => ({ 
          id: row.id, 
          title: row.title, 
          user: `${row.first_name} ${row.last_name}`,
          email: row.email
        }))
      );
      
      // Here you would integrate with your notification service
      // For now, we'll just log the notifications
      for (const quickAdd of result.rows) {
        console.log(`📧 Notification: Quick add "${quickAdd.title}" expires in 24 hours for ${quickAdd.email}`);
      }
    } else {
      console.log('ℹ️ No quick adds expiring in the next 24 hours');
    }
  } catch (error) {
    console.error('❌ Error checking expiring quick adds:', error);
  }
};

// Schedule cron jobs
const startCronJobs = () => {
  console.log('⏰ Starting cron jobs...');

  // Check for expired quick adds every hour
  cron.schedule('0 * * * *', markExpiredQuickAdds, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  // Clean up old expired quick adds daily at 2 AM
  cron.schedule('0 2 * * *', cleanupOldQuickAdds, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  // Check for expiring quick adds daily at 9 AM
  cron.schedule('0 9 * * *', notifyExpiringQuickAdds, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });

  console.log('✅ Cron jobs started successfully');
  console.log('📅 Schedule:');
  console.log('  - Expired quick adds check: Every hour');
  console.log('  - Old quick adds cleanup: Daily at 2 AM');
  console.log('  - Expiring notifications: Daily at 9 AM');
};

// Manual execution functions for testing
export const runExpiredCheck = markExpiredQuickAdds;
export const runCleanup = cleanupOldQuickAdds;
export const runExpiringCheck = notifyExpiringQuickAdds;

export default startCronJobs;
