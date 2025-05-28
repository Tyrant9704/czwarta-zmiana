import { NextResponse } from "next/server"
import { sendEmail } from "@/app/actions/email"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Call the enhanced sendEmail function which now includes validation and sanitization
    const result = await sendEmail(data)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ success: false, error: "Coś poszło nie tak" }, { status: 500 })
  }
}
