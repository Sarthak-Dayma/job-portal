/**
 * Job Matching Algorithm for ShramSaathi
 * Ranks workers based on skill match, experience, availability, proximity, and rating
 */

interface Worker {
  id: number
  name: string
  trade: string
  skills: string[]
  experienceYears: number
  rating: number
  availability: string
  distance?: number
  phone: string
}

interface Job {
  id: number
  tradeRequired: string
  skillsRequired?: string[]
  date: string
}

interface RankedWorker extends Worker {
  matchScore: number
  scoreBreakdown: {
    skillScore: number
    experienceBonus: number
    availabilityScore: number
    proximityScore: number
    ratingScore: number
  }
}

/**
 * Main matching function
 * Returns top N workers sorted by final score
 */
export function matchWorkersToJob(workers: Worker[], job: Job, topN = 10): RankedWorker[] {
  // Filter workers in same trade
  const eligibleWorkers = workers.filter((w) => w.trade.toLowerCase() === job.tradeRequired.toLowerCase())

  // Calculate scores
  const rankedWorkers = eligibleWorkers.map((worker) => ({
    ...worker,
    matchScore: calculateFinalScore(worker, job),
    scoreBreakdown: getScoreBreakdown(worker, job),
  }))

  // Sort by score descending
  rankedWorkers.sort((a, b) => b.matchScore - a.matchScore)

  // Return top N
  return rankedWorkers.slice(0, topN)
}

/**
 * Calculate final score using weighted formula
 * Formula: (skill × 3) + (experience × 1.5) + (availability × 2) + (proximity × 2) + (rating × 1)
 */
function calculateFinalScore(worker: Worker, job: Job): number {
  const skillScore = calculateSkillScore(worker, job)
  const experienceBonus = calculateExperienceBonus(worker)
  const availabilityScore = calculateAvailabilityScore(worker, job)
  const proximityScore = calculateProximityScore(worker)
  const ratingScore = normalizeRating(worker.rating)

  return skillScore * 3 + experienceBonus * 1.5 + availabilityScore * 2 + proximityScore * 2 + ratingScore * 1
}

/**
 * Skill matching - count overlapping skills
 * Range: 0-5 (assuming max 5 skills)
 */
function calculateSkillScore(worker: Worker, job: Job): number {
  if (!job.skillsRequired || job.skillsRequired.length === 0) {
    // If no specific skills required, trade match gives base score
    return worker.trade.toLowerCase() === job.tradeRequired.toLowerCase() ? 3 : 0
  }

  const overlappingSkills = worker.skills.filter((skill) =>
    job.skillsRequired!.some((req) => req.toLowerCase() === skill.toLowerCase()),
  )

  return overlappingSkills.length
}

/**
 * Experience bonus - up to 1.0 (max at 10 years)
 */
function calculateExperienceBonus(worker: Worker): number {
  return Math.min(worker.experienceYears, 10) / 10
}

/**
 * Availability matching
 * 1.0 = exact date match
 * 0.5 = flexible (can adjust)
 * 0.0 = not available
 */
function calculateAvailabilityScore(worker: Worker, job: Job): number {
  if (worker.availability === "immediate") {
    return 1.0
  }
  if (worker.availability === "flexible") {
    return 0.5
  }
  if (worker.availability === "dates" && worker.availability === job.date) {
    return 1.0
  }
  return 0.0
}

/**
 * Proximity score based on distance
 * Assumes 50km is minimum acceptable distance
 * Range: 0-1.0
 */
function calculateProximityScore(worker: Worker): number {
  if (!worker.distance) {
    return 0.5 // Default if distance not available
  }

  const MAX_DISTANCE_KM = 50
  const score = Math.max(0, 1 - worker.distance / MAX_DISTANCE_KM)
  return Math.min(score, 1.0)
}

/**
 * Normalize rating to 0-1 scale
 */
function normalizeRating(rating: number): number {
  return Math.min(rating / 5.0, 1.0)
}

/**
 * Return detailed score breakdown
 */
function getScoreBreakdown(worker: Worker, job: Job) {
  return {
    skillScore: calculateSkillScore(worker, job),
    experienceBonus: calculateExperienceBonus(worker),
    availabilityScore: calculateAvailabilityScore(worker, job),
    proximityScore: calculateProximityScore(worker),
    ratingScore: normalizeRating(worker.rating),
  }
}

/**
 * Example usage in API endpoint:
 *
 * GET /api/jobs/:id (returns job with recommended workers)
 *
 * const workers = await db.query('SELECT * FROM workers WHERE city = ?', [job.city]);
 * const recommended = matchWorkersToJob(workers, job, 10);
 * return { ...job, recommendedWorkers: recommended };
 */
