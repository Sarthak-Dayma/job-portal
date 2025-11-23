"use client"

import { useState } from "react"
import { adminService } from "@/lib/admin-service"
import { Users, Shield, AlertTriangle, Search, Filter } from 'lucide-react'
import type { Worker, Employer } from "@/lib/types"

interface UserManagementProps {
  workers: Worker[]
  employers: Employer[]
}

export default function UserManagement({ workers, employers }: UserManagementProps) {
  const [suspendedUsers, setSuspendedUsers] = useState<Set<string>>(new Set())
  const [filterVerified, setFilterVerified] = useState<"all" | "verified" | "unverified">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [userType, setUserType] = useState<"workers" | "employers">("workers")

  const filteredWorkers = workers.filter((w) => {
    const matchesVerification =
      filterVerified === "all" || (filterVerified === "verified" ? w.verified : !w.verified)
    const matchesSearch =
      w.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.phone.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesVerification && matchesSearch
  })

  const filteredEmployers = employers.filter((e) => {
    const matchesVerification =
      filterVerified === "all" || (filterVerified === "verified" ? e.verified : !e.verified)
    const matchesSearch =
      e.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesVerification && matchesSearch
  })

  const handleSuspend = (userId: string, userName: string) => {
    if (window.confirm(`Suspend ${userName}? This action can be reversed.`)) {
      setSuspendedUsers((prev) => new Set([...prev, userId]))
      const result = adminService.suspendUser(userId, "Admin suspension", "admin_current")
      alert(result.message)
    }
  }

  const handleUnsuspend = (userId: string) => {
    setSuspendedUsers((prev) => {
      const next = new Set(prev)
      next.delete(userId)
      return next
    })
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Users className="w-8 h-8 text-primary" />
          User Management
        </h2>
        <p className="text-muted-foreground">View, monitor, and manage all platform users</p>
      </div>

      {/* Tab Selection */}
      <div className="flex gap-2 border-b border-border">
        {(["workers", "employers"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setUserType(tab)
              setSearchQuery("")
            }}
            className={`px-6 py-3 font-bold border-b-2 transition-all ${
              userType === tab
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "workers" ? "Workers" : "Employers"} ({tab === "workers" ? workers.length : employers.length})
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search ${userType} by name or phone...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-lg bg-card focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterVerified("all")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              filterVerified === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80 border border-border"
            }`}
          >
            <Filter className="w-4 h-4 inline mr-2" />
            All ({userType === "workers" ? workers.length : employers.length})
          </button>
          <button
            onClick={() => setFilterVerified("verified")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              filterVerified === "verified"
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-foreground hover:bg-muted/80 border border-border"
            }`}
          >
            Verified ({userType === "workers" ? workers.filter((w) => w.verified).length : employers.filter((e) => e.verified).length})
          </button>
          <button
            onClick={() => setFilterVerified("unverified")}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              filterVerified === "unverified"
                ? "bg-yellow-500 text-white"
                : "bg-muted text-foreground hover:bg-muted/80 border border-border"
            }`}
          >
            Pending ({userType === "workers" ? workers.filter((w) => !w.verified).length : employers.filter((e) => !e.verified).length})
          </button>
        </div>
      </div>

      {/* Workers Table */}
      {userType === "workers" && (
        <div className="bg-card border-2 border-border rounded-xl overflow-hidden shadow-sm">
          {filteredWorkers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No workers found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b-2 border-border">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Name</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Phone</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Skills</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Rating</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Status</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkers.map((worker) => (
                    <tr key={worker.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6 font-semibold text-foreground">{worker.name}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{worker.phone}</td>
                      <td className="py-4 px-6">
                        <div className="flex gap-1 flex-wrap max-w-xs">
                          {worker.skills.slice(0, 2).map((skill) => (
                            <span key={skill} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                          {worker.skills.length > 2 && (
                            <span className="text-xs text-muted-foreground">+{worker.skills.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold">
                        <span className="text-accent">⭐ {worker.rating.toFixed(1)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            worker.verified
                              ? "bg-accent/10 text-accent"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {worker.verified ? "✓ Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {suspendedUsers.has(worker.id) ? (
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                            <button
                              onClick={() => handleUnsuspend(worker.id)}
                              className="text-destructive hover:text-destructive/80 text-xs font-bold underline"
                            >
                              Unsuspend
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSuspend(worker.id, worker.name || "Worker")}
                            className="text-primary hover:text-primary/80 text-xs font-bold underline transition-colors"
                          >
                            Suspend
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Employers Table */}
      {userType === "employers" && (
        <div className="bg-card border-2 border-border rounded-xl overflow-hidden shadow-sm">
          {filteredEmployers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No employers found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b-2 border-border">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Company</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Contact</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Jobs Posted</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Rating</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Status</th>
                    <th className="text-left py-4 px-6 font-bold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployers.map((employer) => (
                    <tr key={employer.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-6 font-semibold text-foreground">{employer.companyName}</td>
                      <td className="py-4 px-6 text-muted-foreground text-sm">{employer.phone}</td>
                      <td className="py-4 px-6 font-semibold text-secondary">{employer.totalJobsPosted}</td>
                      <td className="py-4 px-6 font-semibold">
                        <span className="text-accent">⭐ {employer.rating.toFixed(1)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            employer.verified
                              ? "bg-accent/10 text-accent"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {employer.verified ? "✓ Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {suspendedUsers.has(employer.id) ? (
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-destructive" />
                            <button
                              onClick={() => handleUnsuspend(employer.id)}
                              className="text-destructive hover:text-destructive/80 text-xs font-bold underline"
                            >
                              Unsuspend
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSuspend(employer.id, employer.companyName)}
                            className="text-secondary hover:text-secondary/80 text-xs font-bold underline transition-colors"
                          >
                            Suspend
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
