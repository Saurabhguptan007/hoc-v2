import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const opportunity = await db.opportunities.getById(parseInt(id))
    if (!opportunity) {
      return Response.json({ success: false, error: "Opportunity not found" }, { status: 404 })
    }
    return Response.json({ success: true, data: opportunity })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to fetch opportunity" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await request.json()
    const opportunity = await db.opportunities.update(parseInt(id), body)
    if (!opportunity) {
      return Response.json({ success: false, error: "Opportunity not found" }, { status: 404 })
    }
    return Response.json({ success: true, data: opportunity })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to update opportunity" }, { status: 400 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await db.opportunities.delete(parseInt(id))
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to delete opportunity" }, { status: 500 })
  }
}
