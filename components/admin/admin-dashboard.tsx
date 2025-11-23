"use client"

import { useState, useEffect } from "react"
import VerificationPanel from "./verification-panel"
import AdminStats from "./admin-stats"
import UserManagement from "./user-management"
import Header from "../shared/header"
import Tabs from "../shared/tabs"
import { BarChart3, Shield, Users, Briefcase } from 'lucide-react'
import type { Worker, Employer } from "@/lib/types"

interface AdminDashboardProps {
  userState: any
  onLogout: () => void
}

export default function AdminDashboard({ userState, onLogout }: AdminDashboardProps) {
  const [tab, setTab] = useState("stats")
  const [isLoading, setIsLoading] = useState(true)

  const [workers] = useState<Worker[]>([
    {
      id: "worker_1",
      phone: "+91 9876543210",
      role: "worker",
      name: "Ramesh Kumar",
      skills: ["Electrical", "Wiring", "Panel Installation"],
      rating: 4.5,
      totalJobs: 12,
      verified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "worker_2",
      phone: "+91 9876543211",
      role: "worker",
      name: "Priya Singh",
      skills: ["Plumbing", "Pipe Fitting", "Maintenance"],
      rating: 4.2,
      totalJobs: 5,
      verified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  const [employers] = useState<Employer[]>([
    {
      id: "emp_1",
      phone: "+91 9876543220",
      role: "employer",
      name: "Raj Patel",
      companyName: "BuildCorp Solutions",
      verified: true,
      rating: 4.8,
      totalJobsPosted: 23,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const tabs = [
    { id: "stats", label: "Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
    { id: "verification", label: "Verification", icon: <Shield className="w-4 h-4" /> },
    { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
    { id: "jobs", label: "Jobs", icon: <Briefcase className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="ShramSaathi Admin" subtitle="Platform management and oversight" onLogout={onLogout} userType="admin" />
      <Tabs tabs={tabs} activeTab={tab} onTabChange={setTab} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4" />
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {tab === "stats" && <AdminStats workers={workers} employers={employers} />}
            {tab === "verification" && <VerificationPanel workers={workers} employers={employers} />}
            {tab === "users" && <UserManagement workers={workers} employers={employers} />}
            {tab === "jobs" && (
              <div className="text-center py-16 bg-card rounded-lg border-2 border-dashed border-border">
                <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-lg text-muted-foreground">Job moderation features coming soon</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
