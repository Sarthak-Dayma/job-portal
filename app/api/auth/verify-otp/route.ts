import { type NextRequest, NextResponse } from "next/server"
import { jwtSign } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { phone, code, otpToken } = await request.json()

    // Validate inputs
    if (!phone || !code || !otpToken) {
      return NextResponse.json({ error: "Missing required fields", code: "MISSING_FIELDS" }, { status: 400 })
    }

    if (code.length !== 6 || !/^\d+$/.test(code)) {
      return NextResponse.json({ error: "Invalid OTP format", code: "INVALID_OTP_FORMAT" }, { status: 400 })
    }

    // Decode and verify OTP token
    try {
      const decoded = JSON.parse(Buffer.from(otpToken, "base64").toString())
      const isExpired = Date.now() - decoded.timestamp > 600000 // 10 minutes
      const codeMatches = decoded.otp === code
      const phoneMatches = decoded.phone === phone

      if (!phoneMatches || !codeMatches || isExpired) {
        return NextResponse.json({ error: "Invalid or expired OTP", code: "INVALID_OTP" }, { status: 401 })
      }

      // OTP verified - create/fetch user and issue JWT
      const user = {
        id: `user_${phone.replace(/\D/g, "")}`,
        phone,
        role: decoded.userRole as "worker" | "employer" | "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      const token = jwtSign(user)

      return NextResponse.json({
        token,
        user,
      })
    } catch (decodeError) {
      return NextResponse.json({ error: "Invalid OTP token", code: "INVALID_TOKEN" }, { status: 401 })
    }
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json({ error: "Failed to verify OTP", code: "VERIFICATION_FAILED" }, { status: 500 })
  }
}
