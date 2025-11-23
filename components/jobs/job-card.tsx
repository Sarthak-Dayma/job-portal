"use client"

import { MapPin, Clock, Users, TrendingUp } from 'lucide-react'

interface JobCardProps {
  job: any
  matchScore?: number
  distance?: number
  onSelect: () => void
}

export default function JobCard({ job, matchScore, distance, onSelect }: JobCardProps) {
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-IN", { month: "short", day: "numeric" })
  }

  return (
    <div
      onClick={onSelect}
      className="bg-card border-2 border-border hover:border-primary rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
    >
      {/* Header with title and match score */}
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">{job.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {job.employerId || "Professional Opportunity"}
          </p>
        </div>
        {matchScore && (
          <div className="flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold whitespace-nowrap">
            <TrendingUp className="w-4 h-4" />
            {matchScore}%
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{job.location || "India"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{formatDate(job.startDate)}</span>
        </div>
        {distance && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{distance}km away</span>
          </div>
        )}
      </div>

      {/* Skills and Wage */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          {job.requiredSkills?.slice(0, 2).map((skill: string) => (
            <span key={skill} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
              {skill}
            </span>
          ))}
          {job.requiredSkills?.length > 2 && (
            <span className="text-xs text-muted-foreground px-3 py-1">+{job.requiredSkills.length - 2} more</span>
          )}
        </div>
        <p className="text-lg font-bold text-accent">
          ₹{job.wage?.amount ? job.wage.amount.toLocaleString() : `${job.budget?.min}`}
        </p>
      </div>
    </div>
  )
}
