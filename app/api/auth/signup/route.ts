import { db } from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json()

    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["student", "teacher"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    const user = await db.users.create(email, password, name, role)

    if (!user) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
