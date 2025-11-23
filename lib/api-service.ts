const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api"

interface ApiErrorResponse {
  error: string
  code?: string
}

class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${endpoint}`
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  })

  const data = (await response.json()) as T | ApiErrorResponse

  if (!response.ok) {
    const errorData = data as ApiErrorResponse
    throw new ApiError(response.status, errorData.code || "UNKNOWN_ERROR", errorData.error || "An error occurred")
  }

  return data as T
}

import type { OtpResponse, AuthResponse, User, Worker, Job, JobApplication } from "./types"

export const authService = {
  async requestOtp(phone: string, userRole: string) {
    return apiCall<OtpResponse>("/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ phone, userRole }),
    })
  },

  async verifyOtp(phone: string, code: string, otpToken: string) {
    return apiCall<AuthResponse>("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, code, otpToken }),
    })
  },

  async verifyToken(token: string) {
    return apiCall<{ valid: boolean; user: User }>("/auth/verify-token", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
  },

  async logout(token: string) {
    return apiCall<{ success: boolean }>("/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}

export const jobService = {
  async getJobs(filters?: {
    category?: string
    location?: string
    maxWage?: number
    minWage?: number
    searchQuery?: string
  }) {
    const params = new URLSearchParams()
    if (filters?.category) params.append("category", filters.category)
    if (filters?.location) params.append("location", filters.location)
    if (filters?.maxWage) params.append("maxWage", filters.maxWage.toString())
    if (filters?.minWage) params.append("minWage", filters.minWage.toString())
    if (filters?.searchQuery) params.append("q", filters.searchQuery)

    return apiCall<Job[]>(`/jobs?${params.toString()}`)
  },

  async getJob(jobId: string) {
    return apiCall<Job>(`/jobs/${jobId}`)
  },

  async createJob(jobData: Omit<Job, "id" | "createdAt" | "updatedAt" | "applicants">) {
    return apiCall<Job>("/jobs", {
      method: "POST",
      body: JSON.stringify(jobData),
    })
  },

  async updateJob(jobId: string, updates: Partial<Job>) {
    return apiCall<Job>(`/jobs/${jobId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    })
  },

  async deleteJob(jobId: string) {
    return apiCall<{ success: boolean }>(`/jobs/${jobId}`, {
      method: "DELETE",
    })
  },

  async getFeaturedJobs(limit = 10) {
    return apiCall<Job[]>(`/jobs/featured?limit=${limit}`)
  },
}

export const applicationService = {
  async applyForJob(jobId: string, token: string) {
    return apiCall<JobApplication>("/applications", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ jobId }),
    })
  },

  async getApplications(jobId: string, token: string) {
    return apiCall<JobApplication[]>(`/applications?jobId=${jobId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  async updateApplicationStatus(
    applicationId: string,
    status: "accepted" | "rejected" | "completed",
    token: string,
  ) {
    return apiCall<JobApplication>(`/applications/${applicationId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    })
  },

  async withdrawApplication(applicationId: string, token: string) {
    return apiCall<{ success: boolean }>(`/applications/${applicationId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}

export const workerService = {
  async getWorkerProfile(workerId: string) {
    return apiCall<Worker>(`/workers/${workerId}`)
  },

  async updateWorkerProfile(workerId: string, updates: Partial<Worker>, token: string) {
    return apiCall<Worker>(`/workers/${workerId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(updates),
    })
  },

  async searchWorkers(query: string) {
    return apiCall<Worker[]>(`/workers/search?q=${encodeURIComponent(query)}`)
  },

  async getRecommendedWorkers(jobId: string) {
    return apiCall<Worker[]>(`/workers/recommendations/${jobId}`)
  },
}

export const notificationService = {
  async getNotifications(token: string, limit = 20) {
    return apiCall<any[]>(`/notifications?limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  },

  async markAsRead(notificationId: string, token: string) {
    return apiCall<{ success: boolean }>(`/notifications/${notificationId}/read`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}

export const reviewService = {
  async submitReview(targetUserId: string, rating: number, comment: string, token: string) {
    return apiCall<any>("/reviews", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ targetUserId, rating, comment }),
    })
  },

  async getReviews(userId: string) {
    return apiCall<any[]>(`/reviews/user/${userId}`)
  },
}

export type { ApiError }
