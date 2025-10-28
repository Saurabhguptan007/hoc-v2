import { db } from "@/lib/db"

export async function GET() {
  try {
    const stats = await db.stats.getAll()
    return Response.json({ success: true, data: stats })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch stats" }, { status: 500 })
  }
}
