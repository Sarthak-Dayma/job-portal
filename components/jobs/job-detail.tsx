"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Clock, Users, Banknote, AlertCircle } from 'lucide-react'

interface JobDetailProps {
  job: any
  userType: "worker" | "employer"
  onBack: () => void
  onApply: (coverLetter?: string) => void
}

export default function JobDetail({ job, userType, onBack, onApply }: JobDetailProps) {
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleApply = async () => {
    if (!coverLetter.trim()) {
      alert("Please share why you're interested in this job")
      return
    }
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      onApply(coverLetter)
      setCoverLetter("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold flex-1 text-balance">{job.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-12">
        {/* Key Details Grid */}
        <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Banknote className="w-4 h-4 text-secondary" />
                <p className="text-xs font-bold text-muted-foreground uppercase">Payment</p>
              </div>
              <p className="text-2xl font-bold text-secondary">
                ₹{job.wage ? job.wage.amount.toLocaleString() : "Negotiable"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{job.wage?.period || "per"} engagement</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-primary" />
                <p className="text-xs font-bold text-muted-foreground uppercase">Category</p>
              </div>
              <p className="font-bold text-foreground capitalize">{job.category || job.tradeCategory}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-accent" />
                <p className="text-xs font-bold text-muted-foreground uppercase">Location</p>
              </div>
              <p className="font-bold text-foreground">{job.location}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <p className="text-xs font-bold text-muted-foreground uppercase">Start</p>
              </div>
              <p className="font-bold text-foreground">{formatDate(job.startDate)}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-foreground mb-4">Job Details</h3>
          <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>

        {/* Required Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill: string) => (
                <span key={skill} className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Apply Section for Workers */}
        {userType === "worker" && (
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-4">Ready to Apply?</h3>
            <p className="text-muted-foreground mb-4">Tell the employer about your experience and why you're a great fit for this role</p>
            <textarea
              placeholder="Share your relevant experience, skills, and availability..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              maxLength={500}
              className="w-full px-4 py-3 border-2 border-border rounded-lg bg-card focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-32 resize-none mb-3"
            />
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-muted-foreground">{coverLetter.length}/500 characters</p>
            </div>
            <button
              onClick={handleApply}
              disabled={isSubmitting || coverLetter.trim().length === 0}
              className="w-full py-3 bg-primary hover:bg-primary/90 disabled:bg-muted text-primary-foreground font-bold rounded-lg transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Apply for This Job"}
            </button>
          </div>
        )}

        {/* Info for Employers */}
        {userType === "employer" && (
          <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-foreground mb-4">Job Status</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-semibold">Current Status</p>
                <span className={`px-4 py-2 rounded-lg text-sm font-bold ${
                  job.status === "active" ? "bg-accent/10 text-accent" :
                  job.status === "filled" ? "bg-primary/10 text-primary" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-semibold">Total Applications</p>
                <p className="text-2xl font-bold text-foreground">{job.applicants || 0}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
