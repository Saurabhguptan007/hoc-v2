import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function GET() {
  const client = await pool.connect()
  try {
    // Test connection
    const result = await client.query('SELECT NOW()')
    
    // Check if tables exist
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `)
    
    // Check stats data
    const stats = await client.query('SELECT * FROM success_stats')
    
    return Response.json({ 
      success: true, 
      connection: result.rows[0],
      tables: tables.rows.map(t => t.table_name),
      stats: stats.rows
    })
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  } finally {
    client.release()
  }
}