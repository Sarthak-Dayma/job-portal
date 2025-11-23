// API service layer for ShramSaathi - handles all backend communication
// Mock implementation for MVP - replace BASE_URL with actual backend endpoint

const BASE_URL = "http://localhost:8000/api" // Change to your backend URL
const mockOtpStorage: Record<string, string> = {} // Mock OTP storage - use Redis in production

// Mock OTP generation - in production, use Twilio or Firebase
function generateMockOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

interface AuthResponse {
  access_token: string
  user_type: "worker" | "employer" | "admin"
  user_id: number
  phone: string
}

interface RequestOtpResponse {
  otp_token: string
  message: string
}

// Request OTP endpoint
export async function requestOTP(phone: string): Promise<RequestOtpResponse> {
  try {
    // Mock implementation - in production, send SMS via Twilio/Firebase
    const otp = generateMockOTP()
    mockOtpStorage[phone] = otp
    console.log(`[Mock OTP for ${phone}: ${otp}]`) // Log in console for testing

    return {
      otp_token: phone,
      message: `OTP sent to ${phone}. (Test OTP: ${otp})`,
    }
  } catch (error) {
    throw new Error("Failed to request OTP")
  }
}

// Verify OTP endpoint
export async function verifyOTP(phone: string, code: string): Promise<AuthResponse> {
  try {
    // Check mock OTP
    const storedOtp = mockOtpStorage[phone]
    if (storedOtp !== code) {
      throw new Error("Invalid OTP")
    }

    // Mock user creation/retrieval
    const mockUser = {
      id: Math.floor(Math.random() * 100000),
      phone: phone,
      user_type: "worker" as const, // Can be set based on registration flow
    }

    const token = btoa(JSON.stringify(mockUser)) // Mock JWT - use real JWT in production

    delete mockOtpStorage[phone]

    return {
      access_token: token,
      user_type: mockUser.user_type,
      user_id: mockUser.id,
      phone: mockUser.phone,
    }
  } catch (error: any) {
    throw new Error(error.message || "Failed to verify OTP")
  }
}

// Worker profile endpoints
export async function getWorkerProfile(userId: number, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/workers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return await response.json()
  } catch {
    return null
  }
}

export async function updateWorkerProfile(userId: number, data: any, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/workers/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch {
    return null
  }
}

// Job endpoints
export async function getJobs(filters?: { trade?: string; city?: string; page?: number }) {
  try {
    const params = new URLSearchParams()
    if (filters?.trade) params.append("trade", filters.trade)
    if (filters?.city) params.append("city", filters.city)
    if (filters?.page) params.append("page", filters.page.toString())

    const response = await fetch(`${BASE_URL}/jobs?${params}`)
    return await response.json()
  } catch {
    return []
  }
}

export async function getJobDetail(jobId: number, token?: string) {
  try {
    const headers: any = {}
    if (token) headers.Authorization = `Bearer ${token}`

    const response = await fetch(`${BASE_URL}/jobs/${jobId}`, { headers })
    return await response.json()
  } catch {
    return null
  }
}

export async function applyForJob(jobId: number, workerId: number, coverNote: string, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/jobs/${jobId}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ worker_id: workerId, cover_note: coverNote }),
    })
    return await response.json()
  } catch {
    return null
  }
}

// Get jobs for employer
export async function getEmployerJobs(employerId: number, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/employers/${employerId}/jobs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return await response.json()
  } catch {
    return []
  }
}

// Create new job
export async function createJob(data: any, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch {
    return null
  }
}

// Get applicants for a job
export async function getJobApplicants(jobId: number, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/jobs/${jobId}/applicants`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return await response.json()
  } catch {
    return []
  }
}

// Rate worker
export async function rateWorker(jobId: number, workerId: number, score: number, comment: string, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/jobs/${jobId}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ worker_id: workerId, score, comment }),
    })
    return await response.json()
  } catch {
    return null
  }
}

// Admin endpoints
export async function getUsers(token: string) {
  try {
    const response = await fetch(`${BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return await response.json()
  } catch {
    return []
  }
}

export async function verifyWorker(workerId: number, token: string) {
  try {
    const response = await fetch(`${BASE_URL}/admin/workers/${workerId}/verify`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
    return await response.json()
  } catch {
    return null
  }
}

export function mockWorkers() {
  return [
    {
      id: 1,
      name: "Rajesh Kumar",
      trade: "Electrician",
      skills: "Wiring, Panel Installation, Troubleshooting",
      experience_years: 8,
      rate: 500,
      city: "Mumbai",
      availability: "immediate",
      languages: "Hindi, English",
      bio: "Experienced electrician with 8 years of expertise",
      rating: 4.5,
      verified: true,
    },
    {
      id: 2,
      name: "Anil Singh",
      trade: "Plumber",
      skills: "Pipe Installation, Fixing Leaks, Maintenance",
      experience_years: 5,
      rate: 400,
      city: "Delhi",
      availability: "immediate",
      languages: "Hindi",
      bio: "Trusted plumber for residential and commercial work",
      rating: 4.2,
      verified: true,
    },
    {
      id: 3,
      name: "Vijay Reddy",
      trade: "Driver",
      skills: "Heavy Vehicle, Commercial License",
      experience_years: 10,
      rate: 600,
      city: "Mumbai",
      availability: "immediate",
      languages: "Hindi, Telugu, English",
      bio: "Professional driver with clean record",
      rating: 4.8,
      verified: true,
    },
  ]
}

export function mockJobs() {
  return [
    {
      id: 1,
      title: "Emergency Electrical Repair",
      description: "Need urgent electrical repair in apartment. Circuit breaker issue.",
      trade: "Electrician",
      pay: 1000,
      date: new Date().toISOString(),
      city: "Mumbai",
      status: "open",
      employer: { name: "John Apartment Complex", phone: "+919876543210" },
    },
    {
      id: 2,
      title: "Bathroom Plumbing Installation",
      description: "Complete bathroom plumbing setup for new construction.",
      trade: "Plumber",
      pay: 3000,
      date: new Date(Date.now() + 86400000).toISOString(),
      city: "Delhi",
      status: "open",
      employer: { name: "BuildCorp Construction", phone: "+919876543211" },
    },
    {
      id: 3,
      title: "Daily Commute Driver",
      description: "Need driver for daily office commute. 6 hours per day.",
      trade: "Driver",
      pay: 500,
      date: new Date(Date.now() + 172800000).toISOString(),
      city: "Mumbai",
      status: "open",
      employer: { name: "Tech Startup XYZ", phone: "+919876543212" },
    },
  ]
}
