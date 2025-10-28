import { db } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get("studentId")

  try {
    let applications
    if (studentId) {
      applications = await db.applications.getByStudentId(parseInt(studentId))
    } else {
      applications = await db.applications.getAll()
    }
    return Response.json({ success: true, data: applications })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { studentId, opportunityId, name, email, phone, reason } = await request.json()
    console.log('Creating application:', { studentId, opportunityId, name, email, phone, reason })
    const application = await db.applications.create(studentId, opportunityId, { name, email, phone, reason })
    return Response.json({ success: true, data: application })
  } catch (error) {
    console.error('Application creation error:', error)
    return Response.json({ success: false, error: error.message || "Failed to create application" }, { status: 400 })
  }
}