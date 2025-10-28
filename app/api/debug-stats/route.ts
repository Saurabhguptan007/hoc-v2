import { db } from "@/lib/db"

export async function GET() {
  try {
    console.log("Fetching stats...")
    const stats = await db.stats.getAll()
    console.log("Stats result:", stats)
    return Response.json({ 
      success: true, 
      data: stats,
      count: stats.length 
    })
  } catch (error) {
    console.error("Stats error:", error)
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}