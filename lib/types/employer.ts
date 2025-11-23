// Employer model and types

export interface CompanyProfile {
  id: number
  userId: number
  companyName: string
  registrationNumber?: string
  logo?: string
  bio?: string
  website?: string
  location: {
    city: string
    state: string
    address: string
    latitude?: number
    longitude?: number
  }
  contactPerson: {
    name: string
    phone: string
    email: string
  }
  industryTypes: string[]
  businessType: "individual" | "small" | "medium" | "large"
  yearsInBusiness: number
  numberOfEmployees?: number
  businessRegistration?: {
    type: string // GST, LLP, Pvt Ltd, etc.
    number: string
    verified: boolean
  }
  rating: number // 0-5
  totalReviews: number
  totalJobsPosted: number
  jobsFilledSuccessfully: number
  averageResponseTime: number // in minutes
  verified: boolean
  backgroundCheckCompleted: boolean
  paymentVerified: boolean
  documents?: {
    businessProof?: {
      type: string
      verified: boolean
    }
    gstCertificate?: {
      verified: boolean
    }
    bankAccount?: {
      verified: boolean
    }
  }
  createdAt: Date
  updatedAt: Date
}

export interface EmployerStats {
  employerId: number
  totalSpent: number
  jobsPosted: number
  jobsCompleted: number
  avgHiringTime: number // in hours
  repeatHireRate: number // 0-100
  monthlyStats: {
    month: string
    jobsPosted: number
    jobsCompleted: number
    totalSpent: number
  }[]
}
