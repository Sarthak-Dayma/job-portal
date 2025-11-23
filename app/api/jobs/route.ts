import { type NextRequest, NextResponse } from "next/server"

// Mock job data
const mockJobs = [
  {
    id: "job_1",
    employerId: "emp_1",
    title: "Plumber Needed",
    description: "Need experienced plumber for residential project",
    category: "plumbing",
    skills: ["plumbing", "pipe-fitting"],
    location: "Mumbai, MH",
    wage: { amount: 500, currency: "INR", period: "hourly" as const },
    startDate: new Date("2025-01-15"),
    status: "active" as const,
    applicants: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "job_2",
    employerId: "emp_2",
    title: "Electrician for Office",
    description: "Need electrician for wiring work",
    category: "electrical",
    skills: ["electrical", "wiring"],
    location: "Bangalore, KA",
    wage: { amount: 600, currency: "INR", period: "daily" as const },
    startDate: new Date("2025-01-20"),
    status: "active" as const,
    applicants: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const location = searchParams.get("location")

    let jobs = mockJobs

    if (category) {
      jobs = jobs.filter((job) => job.category === category)
    }

    if (location) {
      jobs = jobs.filter((job) => job.location.toLowerCase().includes(location.toLowerCase()))
    }

    return NextResponse.json(jobs)
  } catch (error) {
    console.error("Get jobs error:", error)
    return NextResponse.json({ error: "Failed to fetch jobs", code: "FETCH_FAILED" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const jobData = await request.json()

    // Basic validation
    if (!jobData.title || !jobData.employerId) {
      return NextResponse.json({ error: "Missing required fields", code: "MISSING_FIELDS" }, { status: 400 })
    }

    const newJob = {
      ...jobData,
      id: `job_${Date.now()}`,
      applicants: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    console.error("Create job error:", error)
    return NextResponse.json({ error: "Failed to create job", code: "CREATE_FAILED" }, { status: 500 })
  }
}
