// Temporary script to fix announcement dates for testing
const { Pool } = require('pg');

async function fixDates() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  try {
    // Get current date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    // Update SSC CGL form to be expired
    await pool.query(
      'UPDATE announcements SET expiry_date = $1, is_active = false WHERE title LIKE $2',
      [lastWeek.toISOString(), '%SSC CGL%']
    );

    // Update one more form to be expired 
    await pool.query(
      'UPDATE announcements SET expiry_date = $1, is_active = false WHERE title LIKE $2',
      [yesterday.toISOString(), '%Bank PO%']
    );

    console.log('Updated announcement dates successfully');
    
    // Check the results
    const result = await pool.query(
      'SELECT id, title, expiry_date, is_active FROM announcements ORDER BY created_at'
    );
    
    console.log('Current announcements:');
    result.rows.forEach(row => {
      console.log(`${row.id}: ${row.title} - Expires: ${row.expiry_date} - Active: ${row.is_active}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await pool.end();
  }
}

fixDates();