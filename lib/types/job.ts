// Job model and types

import type { TradeCategory } from "./worker"

export type JobStatus = "draft" | "open" | "in_progress" | "completed" | "cancelled" | "filled"
export type JobDuration = "single-day" | "multi-day" | "ongoing" | "contract"
export type PaymentType = "hourly" | "daily" | "fixed" | "negotiable"

export interface JobPosting {
  id: number
  employerId: number
  title: string
  description: string
  tradeCategory: TradeCategory
  requiredSkills: string[]
  jobDuration: JobDuration
  startDate: Date
  endDate?: Date
  estimatedDuration?: number // in hours for multi-day
  paymentType: PaymentType
  budget: {
    min: number
    max: number
    currency: "INR"
  }
  location: {
    city: string
    state: string
    address: string
    latitude?: number
    longitude?: number
  }
  workersNeeded: number
  workersHired: number
  requiredExperience: "entry" | "intermediate" | "expert" | "any"
  requiredCertifications?: string[]
  description_details?: string
  images?: string[]
  status: JobStatus
  priority: "low" | "medium" | "high" | "urgent"
  visibility: "public" | "private"
  applicants: JobApplication[]
  createdAt: Date
  updatedAt: Date
}

export interface JobApplication {
  id: number
  jobId: number
  workerId: number
  applicationDate: Date
  status: "pending" | "accepted" | "rejected" | "withdrawn"
  quote?: number // worker's quoted price
  coverLetter?: string
  workerRating: number
  workerReviews: number
  matchScore: number // AI-calculated match percentage
  appliedAt: Date
  updatedAt: Date
}

export interface JobMatch {
  jobId: number
  workerId: number
  matchScore: number
  matchReasons: string[]
  distanceKm: number
  estimatedTravelTime: number
}
