"use client"

import { useEffect, useState } from "react"
import { matchingService } from "@/lib/matching-service"
import { Zap, TrendingUp, Award, CheckCircle2 } from 'lucide-react'
import type { Job, Worker, JobMatch } from "@/lib/types"

interface JobMatchingProps {
  worker?: Worker
  jobs?: Job[]
  limit?: number
  onJobSelect?: (job: Job) => void
}

export default function JobMatching({ worker, jobs = [], limit = 5, onJobSelect }: JobMatchingProps) {
  const [matches, setMatches] = useState<JobMatch[]>([])
  const [matchedJobs, setMatchedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!worker || !jobs.length) {
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const calculated = matchingService.findJobMatches(worker, jobs, limit)
      setMatches(calculated)
      
      // Get full job objects for matched jobs
      const matched = calculated
        .map(match => jobs.find(job => job.id === match.jobId))
        .filter(Boolean) as Job[]
      setMatchedJobs(matched)
    } catch (error) {
      console.error("Error calculating matches:", error)
    } finally {
      setLoading(false)
    }
  }, [worker, jobs, limit])

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
        <p className="text-muted-foreground text-sm">Calculating perfect matches for you...</p>
      </div>
    )
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border-2 border-dashed border-border">
        <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-muted-foreground">No matches found. Try updating your skills.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-accent" />
          Your Perfect Matches
        </h3>
        <p className="text-sm text-muted-foreground">{matches.length} jobs recommended</p>
      </div>

      {matches.map((match, idx) => {
        const job = matchedJobs[idx]
        return (
          <div
            key={match.jobId}
            onClick={() => job && onJobSelect?.(job)}
            className="bg-card border-2 border-primary/20 hover:border-primary rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
          >
            {/* Match Score Bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">Match Score</p>
                    <p className="text-2xl font-bold text-primary">{match.matchScore}%</p>
                  </div>
                </div>
              </div>
              <div className="w-24 bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500"
                  style={{ width: `${match.matchScore}%` }}
                />
              </div>
            </div>

            {/* Match Reasons */}
            {match.reasons && match.reasons.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-muted-foreground uppercase">Why this match?</p>
                <div className="flex flex-wrap gap-2">
                  {match.reasons.map((reason, ridx) => (
                    <span key={ridx} className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Job Preview */}
            {job && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</p>
                <p className="text-sm text-muted-foreground">₹{job.wage.amount.toLocaleString()} • {job.location}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
