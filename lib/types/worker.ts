// Worker model and types

export type TradeCategory =
  | "electrician"
  | "plumber"
  | "carpenter"
  | "painter"
  | "mason"
  | "welder"
  | "general"
  | "hvac"
  | "mechanic"

export type ExperienceLevel = "entry" | "intermediate" | "expert"

export interface WorkerProfile {
  id: number
  userId: number
  firstName: string
  lastName: string
  profileImage?: string
  bio?: string
  primaryTrade: TradeCategory
  secondaryTrades: TradeCategory[]
  experienceLevel: ExperienceLevel
  yearsOfExperience: number
  skills: string[]
  certifications?: string[]
  location: {
    city: string
    state: string
    latitude?: number
    longitude?: number
  }
  serviceRadius: number // in km
  hourlyRate?: number
  dailyRate?: number
  availability: {
    workingDays: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[]
    hoursPerDay: number
    canWorkWeekends: boolean
  }
  rating: number // 0-5
  totalReviews: number
  totalJobsCompleted: number
  responseRate: number // 0-100
  matchingPreferences?: {
    preferredJobTypes: string[]
    minimumJobDuration?: number
    maxTravelDistance?: number
  }
  verified: boolean
  backgroundCheckCompleted: boolean
  documents?: {
    governmentId?: {
      type: string
      verified: boolean
    }
    bankAccount?: {
      verified: boolean
    }
  }
  createdAt: Date
  updatedAt: Date
}

export interface WorkerStats {
  workerId: number
  totalEarnings: number
  jobsCompleted: number
  jobsCancelled: number
  averageRating: number
  monthlyStats: {
    month: string
    jobsCompleted: number
    earnings: number
  }[]
}
