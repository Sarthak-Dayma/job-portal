"use client"

import { useState } from "react"
import { adminService } from "@/lib/admin-service"
import { CheckCircle2, XCircle, AlertCircle, Shield } from 'lucide-react'
import type { Worker, Employer } from "@/lib/types"

interface VerificationPanelProps {
  workers: Worker[]
  employers: Employer[]
}

export default function VerificationPanel({ workers, employers }: VerificationPanelProps) {
  const [selectedUser, setSelectedUser] = useState<Worker | Employer | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [actionLoading, setActionLoading] = useState(false)

  const pendingWorkers = workers.filter((w) => !w.verified)
  const pendingEmployers = employers.filter((e) => !e.verified)

  const handleApprove = async (user: Worker | Employer) => {
    setActionLoading(true)
    try {
      const result = adminService.approveWorkerVerification(user as Worker, user.id, "admin_current")
      if (result.success) {
        alert(result.message)
        setSelectedUser(null)
      } else {
        alert("Error: " + result.message)
      }
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async (user: Worker | Employer) => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason")
      return
    }

    setActionLoading(true)
    try {
      const result = adminService.rejectWorkerVerification(user.id, rejectionReason, "admin_current")
      if (result.success) {
        alert(result.message)
        setSelectedUser(null)
        setRejectionReason("")
      } else {
        alert("Error: " + result.message)
      }
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Shield className="w-8 h-8 text-accent" />
          Verification Management
        </h2>
        <p className="text-muted-foreground">Review and approve pending user verifications</p>
      </div>

      {/* Pending Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Workers */}
        <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-foreground mb-2">Worker Verifications</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {pendingWorkers.length} pending • {workers.filter((w) => w.verified).length} verified
          </p>

          {pendingWorkers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>All workers verified</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingWorkers.map((worker) => (
                <div
                  key={worker.id}
                  onClick={() => setSelectedUser(worker)}
                  className="p-4 border-2 border-border hover:border-primary rounded-lg cursor-pointer transition-all duration-200 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{worker.name}</p>
                      <p className="text-sm text-muted-foreground">{worker.phone}</p>
                    </div>
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                  </div>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">Pending</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {worker.skills.length} skills
                    </span>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">
                      {worker.totalJobs} jobs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Employers */}
        <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-foreground mb-2">Employer Verifications</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {pendingEmployers.length} pending • {employers.filter((e) => e.verified).length} verified
          </p>

          {pendingEmployers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>All employers verified</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingEmployers.map((employer) => (
                <div
                  key={employer.id}
                  onClick={() => setSelectedUser(employer)}
                  className="p-4 border-2 border-border hover:border-secondary rounded-lg cursor-pointer transition-all duration-200 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground group-hover:text-secondary transition-colors">{employer.companyName}</p>
                      <p className="text-sm text-muted-foreground">{employer.phone}</p>
                    </div>
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                  </div>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">Pending</span>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full font-medium">
                      {employer.totalJobsPosted} jobs
                    </span>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">
                      {employer.rating}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Review Panel */}
      {selectedUser && (
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-xl p-8 shadow-lg animate-slideUp">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Review {selectedUser.role === "worker" ? "Worker" : "Employer"} Profile
              </h3>
              <p className="text-muted-foreground">{selectedUser.name || selectedUser.companyName}</p>
            </div>
            <button
              onClick={() => {
                setSelectedUser(null)
                setRejectionReason("")
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Profile Info */}
          <div className="bg-card rounded-lg p-6 mb-6 space-y-4 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase mb-1">Phone</p>
                <p className="text-lg font-semibold text-foreground">{selectedUser.phone}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase mb-1">Rating</p>
                <p className="text-lg font-semibold text-accent">⭐ {selectedUser.rating.toFixed(1)}/5.0</p>
              </div>
            </div>

            {selectedUser.role === "worker" && (
              <div>
                <p className="text-sm font-bold text-muted-foreground uppercase mb-3">Skills & Experience</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-bold">{(selectedUser as Worker).totalJobs}</span>
                    <span className="text-muted-foreground">jobs completed</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(selectedUser as Worker).skills?.map((skill) => (
                      <span key={skill} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedUser.role === "employer" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase mb-1">Total Jobs</p>
                  <p className="text-lg font-semibold text-foreground">{(selectedUser as Employer).totalJobsPosted}</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground uppercase mb-1">Company</p>
                  <p className="text-lg font-semibold text-foreground">{(selectedUser as Employer).companyName}</p>
                </div>
              </div>
            )}
          </div>

          {/* Rejection Reason */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-foreground mb-3">Rejection Reason (if applicable)</label>
            <textarea
              placeholder="Provide detailed reason for rejection (spam, false documents, suspicious activity, etc.)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              maxLength={300}
              className="w-full px-4 py-3 border-2 border-border rounded-lg bg-card focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-24 resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">{rejectionReason.length}/300 characters</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleApprove(selectedUser)}
              disabled={actionLoading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 disabled:bg-muted text-accent-foreground hover:text-accent-foreground font-bold rounded-lg transition-all"
            >
              <CheckCircle2 className="w-5 h-5" />
              {actionLoading ? "Processing..." : "Approve Verification"}
            </button>
            <button
              onClick={() => handleReject(selectedUser)}
              disabled={actionLoading || !rejectionReason.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-destructive hover:bg-destructive/90 disabled:bg-muted text-destructive-foreground font-bold rounded-lg transition-all"
            >
              <XCircle className="w-5 h-5" />
              {actionLoading ? "Processing..." : "Reject & Notify"}
            </button>
            <button
              onClick={() => {
                setSelectedUser(null)
                setRejectionReason("")
              }}
              className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-bold rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
