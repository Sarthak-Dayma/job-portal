import type { Job, Worker } from "./types"

interface JobMatch {
  jobId: string
  matchScore: number
  reasons: string[]
}

interface WorkerMatch {
  workerId: string
  matchScore: number
  reasons: string[]
}

export class MatchingService {
  /**
   * Improved match calculation with weighted scoring
   * Weights:
   * - Skills: 40%
   * - Experience: 25%
   * - Rating: 20%
   * - Verification: 10%
   * - Location: 5%
   */
  calculateJobMatch(worker: Worker, job: Job): JobMatch {
    let score = 0
    const reasons: string[] = []

    // Skill matching (40 points max)
    if (job.skills && job.skills.length > 0 && worker.skills && worker.skills.length > 0) {
      const matchedSkills = job.skills.filter((skill) =>
        worker.skills!.some(
          (wSkill) =>
            wSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(wSkill.toLowerCase()),
        ),
      )
      const skillMatch = (matchedSkills.length / job.skills.length) * 40
      score += skillMatch
      if (matchedSkills.length > 0) {
        reasons.push(`Skills: ${matchedSkills.slice(0, 2).join(", ")}${matchedSkills.length > 2 ? " +more" : ""}`)
      }
    }

    // Experience level (25 points max)
    if (worker.totalJobs && worker.totalJobs > 0) {
      const experienceScore = Math.min((worker.totalJobs / 10) * 25, 25)
      score += experienceScore
      if (worker.totalJobs >= 5) {
        reasons.push(`Experienced: ${worker.totalJobs}+ jobs`)
      }
    }

    // Rating (20 points max)
    if (worker.rating && worker.rating > 0) {
      const ratingScore = (worker.rating / 5) * 20
      score += ratingScore
      if (worker.rating >= 4) {
        reasons.push(`Top rated: ${worker.rating}/5`)
      }
    }

    // Verification status (10 points max)
    if (worker.verified) {
      score += 10
      reasons.push("Verified")
    }

    return {
      jobId: job.id,
      matchScore: Math.min(Math.round(score), 100),
      reasons,
    }
  }

  /**
   * Added distance calculation for location-based matching
   * Uses simple lat/long distance calculation (Haversine formula)
   */
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  findJobMatches(worker: Worker, allJobs: Job[], limit = 10): JobMatch[] {
    const matches = allJobs
      .filter((job) => job.status === "active")
      .map((job) => this.calculateJobMatch(worker, job))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)

    return matches
  }

  findWorkerMatches(job: Job, allWorkers: Worker[], limit = 10): WorkerMatch[] {
    const matches = allWorkers
      .map((worker) => ({
        workerId: worker.id,
        matchScore: this.calculateJobMatch(worker, job).matchScore,
        reasons: this.calculateJobMatch(worker, job).reasons,
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit)

    return matches
  }

  /**
   * Enhanced search with better filtering options
   */
  searchJobs(
    jobs: Job[],
    criteria: {
      category?: string
      location?: string
      minWage?: number
      maxWage?: number
      skills?: string[]
      searchText?: string
      radius?: number
    },
  ): Job[] {
    return jobs.filter((job) => {
      // Text search
      if (criteria.searchText) {
        const searchLower = criteria.searchText.toLowerCase()
        const titleMatch = job.title.toLowerCase().includes(searchLower)
        const descMatch = job.description.toLowerCase().includes(searchLower)
        if (!titleMatch && !descMatch) return false
      }

      if (criteria.category && job.category !== criteria.category) {
        return false
      }

      if (criteria.location && !job.location.toLowerCase().includes(criteria.location.toLowerCase())) {
        return false
      }

      if (criteria.minWage && job.wage.amount < criteria.minWage) {
        return false
      }
      if (criteria.maxWage && job.wage.amount > criteria.maxWage) {
        return false
      }

      if (criteria.skills && criteria.skills.length > 0) {
        const jobSkillsLower = job.skills.map((s) => s.toLowerCase())
        const hasRequiredSkills = criteria.skills.some((skill) =>
          jobSkillsLower.some(
            (jobSkill) => jobSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(jobSkill),
          ),
        )
        if (!hasRequiredSkills) return false
      }

      return true
    })
  }

  sortByRelevance(jobs: Job[], worker: Worker): Job[] {
    return jobs
      .map((job) => ({
        job,
        match: this.calculateJobMatch(worker, job),
      }))
      .sort((a, b) => b.match.matchScore - a.match.matchScore)
      .map((item) => item.job)
  }

  /**
   * Get trending jobs based on application count
   */
  getTrendingJobs(jobs: Job[], limit = 10): Job[] {
    return jobs.sort((a, b) => b.applicants - a.applicants).slice(0, limit)
  }
}

export const matchingService = new MatchingService()
