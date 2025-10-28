import { db } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const featured = searchParams.get("featured")
  const teacherId = searchParams.get("teacherId")

  try {
    let results
    if (teacherId) {
      results = await db.opportunities.getByTeacher(parseInt(teacherId))
    } else if (featured === "true") {
      results = await db.opportunities.getFeatured()
    } else if (query) {
      results = await db.opportunities.search(query)
    } else {
      results = await db.opportunities.getAll()
    }

    return Response.json({ success: true, data: results })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch opportunities" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Creating opportunity:', body)
    const opportunity = await db.opportunities.create(body)
    return Response.json({ success: true, data: opportunity }, { status: 201 })
  } catch (error) {
    console.error('Opportunity creation error:', error)
    return Response.json({ success: false, error: error.message || "Failed to create opportunity" }, { status: 400 })
  }
}
