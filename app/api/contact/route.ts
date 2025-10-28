import { db } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return Response.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const contactMessage = await db.messages.create({
      name,
      email,
      subject,
      message,
    })

    // In production, send email here using a service like SendGrid or Resend
    console.log("New contact message:", contactMessage)

    return Response.json({ success: true, data: contactMessage }, { status: 201 })
  } catch (error) {
    return Response.json({ success: false, error: "Failed to send message" }, { status: 400 })
  }
}
