// Authentication utilities for JWT handling

interface JwtPayload {
  id: string
  phone: string
  role: "worker" | "employer" | "admin"
  iat?: number
  exp?: number
}

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production"

export function jwtSign(payload: Omit<JwtPayload, "iat" | "exp">): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  }

  const now = Math.floor(Date.now() / 1000)
  const tokenPayload = {
    ...payload,
    iat: now,
    exp: now + 7 * 24 * 60 * 60, // 7 days
  }

  // Simple JWT implementation (in production, use a proper library like jsonwebtoken)
  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url")
  const base64Payload = Buffer.from(JSON.stringify(tokenPayload)).toString("base64url")

  const message = `${base64Header}.${base64Payload}`

  // Mock HMAC signing (real implementation would use crypto module)
  const signature = Buffer.from(JWT_SECRET).toString("base64url").slice(0, 43)

  return `${message}.${signature}`
}

export function jwtVerify(token: string): JwtPayload | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString())

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return payload as JwtPayload
  } catch {
    return null
  }
}
