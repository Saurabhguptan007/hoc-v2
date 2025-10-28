import { db } from "@/lib/db"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const { status } = await request.json()
    const application = await db.applications.updateStatus(parseInt(id), status)
    return Response.json({ success: true, data: application })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to update application" }, { status: 400 })
  }
}