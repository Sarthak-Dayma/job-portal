import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { phone, userRole } = await request.json()

    // Validate phone number
    if (!phone || !/^\+?[0-9]{10,15}$/.test(phone.replace(/\s/g, ""))) {
      return NextResponse.json({ error: "Invalid phone number", code: "INVALID_PHONE" }, { status: 400 })
    }

    // Validate user role
    if (!["worker", "employer", "admin"].includes(userRole)) {
      return NextResponse.json({ error: "Invalid user role", code: "INVALID_ROLE" }, { status: 400 })
    }

    // In production, integrate with SMS service (Twilio, AWS SNS, etc.)
    // For now, generate a mock OTP for demonstration
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpToken = Buffer.from(JSON.stringify({ phone, otp, userRole, timestamp: Date.now() })).toString("base64")

    // Store OTP in cache/database with expiration (10 minutes)
    // TODO: Implement actual OTP storage

    console.log(`[Mock OTP] Phone: ${phone}, OTP: ${otp}, Role: ${userRole}`)

    return NextResponse.json({
      otpToken,
      expiresIn: 600, // 10 minutes
    })
  } catch (error) {
    console.error("OTP request error:", error)
    return NextResponse.json({ error: "Failed to process request", code: "REQUEST_FAILED" }, { status: 500 })
  }
}
