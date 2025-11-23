import type { WorkerProfile, CompanyProfile, JobPosting, JobApplication, TradeCategory, JobMatch } from "@/lib/types"
import { mockWorkers, mockEmployers, mockJobs } from "./mock-data"

// In-memory storage for development
const workers = [...mockWorkers]
const employers = [...mockEmployers]
const jobs = [...mockJobs]
const applications: JobApplication[] = []

// Worker services
export const workerService = {
  async getProfile(workerId: number): Promise<WorkerProfile | null> {
    return workers.find((w) => w.id === workerId) || null
  },

  async listWorkers(filters?: {
    trade?: TradeCategory
    city?: string
    minRating?: number
  }): Promise<WorkerProfile[]> {
    return workers.filter((w) => {
      if (filters?.trade && w.primaryTrade !== filters.trade) return false
      if (filters?.city && w.location.city !== filters.city) return false
      if (filters?.minRating && w.rating < filters.minRating) return false
      return true
    })
  },

  async updateProfile(workerId: number, updates: Partial<WorkerProfile>): Promise<WorkerProfile | null> {
    const index = workers.findIndex((w) => w.id === workerId)
    if (index === -1) return null

    workers[index] = {
      ...workers[index],
      ...updates,
      updatedAt: new Date(),
    }
    return workers[index]
  },

  async getStats(workerId: number) {
    const worker = workers.find((w) => w.id === workerId)
    if (!worker) return null

    return {
      workerId,
      totalEarnings: Math.floor(worker.totalJobsCompleted * 800),
      jobsCompleted: worker.totalJobsCompleted,
      jobsCancelled: Math.floor(worker.totalJobsCompleted * 0.05),
      averageRating: worker.rating,
    }
  },
}

// Employer services
export const employerService = {
  async getProfile(employerId: number): Promise<CompanyProfile | null> {
    return employers.find((e) => e.id === employerId) || null
  },

  async listEmployers(filters?: { city?: string; minRating?: number }): Promise<CompanyProfile[]> {
    return employers.filter((e) => {
      if (filters?.city && e.location.city !== filters.city) return false
      if (filters?.minRating && e.rating < filters.minRating) return false
      return true
    })
  },

  async updateProfile(employerId: number, updates: Partial<CompanyProfile>): Promise<CompanyProfile | null> {
    const index = employers.findIndex((e) => e.id === employerId)
    if (index === -1) return null

    employers[index] = {
      ...employers[index],
      ...updates,
      updatedAt: new Date(),
    }
    return employers[index]
  },

  async getStats(employerId: number) {
    const employer = employers.find((e) => e.id === employerId)
    if (!employer) return null

    return {
      employerId,
      totalSpent: Math.floor(employer.jobsPosted * 5000),
      jobsPosted: employer.totalJobsPosted,
      jobsCompleted: employer.jobsFilledSuccessfully,
      avgHiringTime: employer.averageResponseTime * 4,
      repeatHireRate: 75,
    }
  },
}

// Job services
export const jobService = {
  async getJob(jobId: number): Promise<JobPosting | null> {
    return jobs.find((j) => j.id === jobId) || null
  },

  async listJobs(filters?: {
    trade?: TradeCategory
    city?: string
    status?: string
    employerId?: number
  }): Promise<JobPosting[]> {
    return jobs.filter((j) => {
      if (filters?.trade && j.tradeCategory !== filters.trade) return false
      if (filters?.city && j.location.city !== filters.city) return false
      if (filters?.status && j.status !== filters.status) return false
      if (filters?.employerId && j.employerId !== filters.employerId) return false
      return true
    })
  },

  async createJob(job: Omit<JobPosting, "id" | "createdAt" | "updatedAt" | "applicants">): Promise<JobPosting> {
    const newJob: JobPosting = {
      ...job,
      id: Math.max(...jobs.map((j) => j.id), 0) + 1,
      applicants: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    jobs.push(newJob)
    return newJob
  },

  async updateJob(jobId: number, updates: Partial<JobPosting>): Promise<JobPosting | null> {
    const index = jobs.findIndex((j) => j.id === jobId)
    if (index === -1) return null

    jobs[index] = {
      ...jobs[index],
      ...updates,
      updatedAt: new Date(),
    }
    return jobs[index]
  },

  async getApplications(jobId: number): Promise<JobApplication[]> {
    return applications.filter((a) => a.jobId === jobId)
  },

  async applyForJob(jobId: number, workerId: number, quote?: number): Promise<JobApplication> {
    const application: JobApplication = {
      id: Math.max(...applications.map((a) => a.id), 0) + 1,
      jobId,
      workerId,
      applicationDate: new Date(),
      status: "pending",
      quote,
      workerRating: 4.5,
      workerReviews: 20,
      matchScore: Math.floor(Math.random() * 30) + 70,
      appliedAt: new Date(),
      updatedAt: new Date(),
    }
    applications.push(application)

    // Update job applicants count
    const job = jobs.find((j) => j.id === jobId)
    if (job) {
      job.applicants.push(application)
    }

    return application
  },
}

// Matching service - AI-like job matching
export const matchingService = {
  async findJobMatches(workerId: number, limit = 10): Promise<JobMatch[]> {
    const worker = workers.find((w) => w.id === workerId)
    if (!worker) return []

    const availableJobs = jobs.filter(
      (j) =>
        j.status === "open" &&
        j.location.city === worker.location.city &&
        (j.tradeCategory === worker.primaryTrade || j.tradeCategory === worker.secondaryTrades[0]),
    )

    return availableJobs.slice(0, limit).map((job) => {
      const matchScore = calculateMatchScore(worker, job)
      return {
        jobId: job.id,
        workerId,
        matchScore,
        matchReasons: getMatchReasons(worker, job),
        distanceKm: calculateDistance(worker.location, job.location),
        estimatedTravelTime: Math.floor(Math.random() * 30) + 10,
      }
    })
  },

  async findWorkerMatches(jobId: number, limit = 10): Promise<JobMatch[]> {
    const job = jobs.find((j) => j.id === jobId)
    if (!job) return []

    const availableWorkers = workers.filter(
      (w) =>
        w.verified &&
        w.location.city === job.location.city &&
        (w.primaryTrade === job.tradeCategory || w.secondaryTrades.includes(job.tradeCategory)),
    )

    return availableWorkers.slice(0, limit).map((worker) => {
      const matchScore = calculateMatchScore(worker, job)
      return {
        jobId,
        workerId: worker.id,
        matchScore,
        matchReasons: getMatchReasons(worker, job),
        distanceKm: calculateDistance(worker.location, job.location),
        estimatedTravelTime: Math.floor(Math.random() * 30) + 10,
      }
    })
  },
}

// Helper functions
function calculateMatchScore(worker: WorkerProfile, job: JobPosting): number {
  let score = 50 // base score

  // Trade match
  if (worker.primaryTrade === job.tradeCategory) score += 30
  else if (worker.secondaryTrades.includes(job.tradeCategory)) score += 15

  // Experience match
  if (worker.experienceLevel === "expert" && job.requiredExperience !== "entry") score += 15
  else if (worker.experienceLevel === "intermediate" && job.requiredExperience !== "entry") score += 10

  // Rating
  if (worker.rating >= 4.5) score += 5

  // Availability
  if (worker.availability.canWorkWeekends) score += 5

  return Math.min(100, Math.max(0, score + Math.floor(Math.random() * 10) - 5))
}

function getMatchReasons(worker: WorkerProfile, job: JobPosting): string[] {
  const reasons: string[] = []

  if (worker.primaryTrade === job.tradeCategory) {
    reasons.push(`Specializes in ${job.tradeCategory}`)
  }

  if (worker.experienceLevel === "expert") {
    reasons.push("Expert level experience")
  }

  if (worker.rating >= 4.5) {
    reasons.push(`High rated (${worker.rating}★)`)
  }

  if (worker.totalJobsCompleted > 50) {
    reasons.push(`${worker.totalJobsCompleted}+ jobs completed`)
  }

  return reasons
}

function calculateDistance(
  loc1: { latitude?: number; longitude?: number },
  loc2: { latitude?: number; longitude?: number },
): number {
  if (!loc1.latitude || !loc1.longitude || !loc2.latitude || !loc2.longitude) {
    return Math.floor(Math.random() * 20) + 1
  }

  const R = 6371 // Earth's radius in km
  const dLat = ((loc2.latitude - loc1.latitude) * Math.PI) / 180
  const dLon = ((loc2.longitude - loc1.longitude) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((loc1.latitude * Math.PI) / 180) *
      Math.cos((loc2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10
}
