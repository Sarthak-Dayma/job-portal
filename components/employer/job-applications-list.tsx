"use client"

import { useEffect, useState } from "react"
import { applicationService } from "@/lib/api-service"
import { CheckCircle2, XCircle, Clock, Users } from 'lucide-react'
import type { JobApplication } from "@/lib/types"

interface JobApplicationsListProps {
  jobId?: string | null
}

export default function JobApplicationsList({ jobId }: JobApplicationsListProps) {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "applied" | "accepted" | "rejected">("all")

  useEffect(() => {
    const loadApplications = async () => {
      if (!jobId) {
        setApplications([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const apps = await applicationService.getApplications(jobId, localStorage.getItem("token") || "")
        setApplications(apps)
      } catch (err) {
        setError("Failed to load applications")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadApplications()
  }, [jobId])

  const filteredApps = filter === "all" ? applications : applications.filter(app => app.status === filter)

  const stats = {
    total: applications.length,
    accepted: applications.filter(a => a.status === "accepted").length,
    rejected: applications.filter(a => a.status === "rejected").length,
    pending: applications.filter(a => a.status === "applied").length,
  }

  if (!jobId) {
    return (
      <div className="text-center py-12">
        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Select a Job</h2>
        <p className="text-muted-foreground">Choose a job posting to view applicants</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Loading applications...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
        <p className="font-semibold">{error}</p>
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border-2 border-dashed border-border">
        <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-lg text-muted-foreground">No applications yet for this job</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Total</p>
          <p className="text-3xl font-bold text-foreground">{stats.total}</p>
        </div>
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Pending</p>
          <p className="text-3xl font-bold text-primary">{stats.pending}</p>
        </div>
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Accepted</p>
          <p className="text-3xl font-bold text-accent">{stats.accepted}</p>
        </div>
        <div className="bg-card border-2 border-border rounded-lg p-4">
          <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Rejected</p>
          <p className="text-3xl font-bold text-destructive">{stats.rejected}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-border">
        {(["all", "applied", "accepted", "rejected"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-3 font-semibold border-b-2 transition-all ${
              filter === f
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "applied" ? "Pending" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className={`bg-card border-2 rounded-lg p-6 transition-all ${
              app.status === "accepted"
                ? "border-accent/30 bg-accent/5"
                : app.status === "rejected"
                  ? "border-destructive/30 bg-destructive/5"
                  : "border-border hover:border-primary"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">Worker #{app.workerId}</h3>
                <p className="text-sm text-muted-foreground">Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
              </div>
              <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${
                  app.status === "accepted"
                    ? "bg-accent/10 text-accent flex items-center gap-1"
                    : app.status === "rejected"
                      ? "bg-destructive/10 text-destructive flex items-center gap-1"
                      : "bg-primary/10 text-primary flex items-center gap-1"
                }`}
              >
                {app.status === "accepted" && <CheckCircle2 className="w-4 h-4" />}
                {app.status === "rejected" && <XCircle className="w-4 h-4" />}
                {app.status === "applied" && <Clock className="w-4 h-4" />}
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </span>
            </div>

            {app.status === "applied" && (
              <div className="flex gap-2 pt-4 border-t border-border">
                <button className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-bold transition-all">
                  <CheckCircle2 className="w-4 h-4 inline mr-2" />
                  Accept
                </button>
                <button className="flex-1 px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg font-bold transition-all">
                  <XCircle className="w-4 h-4 inline mr-2" />
                  Reject
                </button>
              </div>
            )}
            {app.status === "accepted" && (
              <div className="flex gap-2 pt-4 border-t border-border">
                <button className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold transition-all">
                  Mark as Completed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
