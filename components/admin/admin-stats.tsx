"use client"

import { adminService } from "@/lib/admin-service"
import { Users, CheckCircle2, Clock, TrendingUp } from 'lucide-react'
import type { Worker, Employer } from "@/lib/types"

interface AdminStatsProps {
  workers: Worker[]
  employers: Employer[]
}

export default function AdminStats({ workers, employers }: AdminStatsProps) {
  const stats = adminService.getDashboardStats(workers, employers)

  const statCards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      gradient: "from-primary/10 to-primary/5",
      border: "border-primary/20",
      color: "text-primary",
    },
    {
      label: "Total Workers",
      value: stats.totalWorkers,
      icon: Users,
      gradient: "from-secondary/10 to-secondary/5",
      border: "border-secondary/20",
      color: "text-secondary",
    },
    {
      label: "Verified Workers",
      value: stats.verifiedWorkers,
      icon: CheckCircle2,
      gradient: "from-accent/10 to-accent/5",
      border: "border-accent/20",
      color: "text-accent",
    },
    {
      label: "Pending Verification",
      value: stats.pendingVerifications,
      icon: Clock,
      gradient: "from-yellow-100/50 to-yellow-50/50",
      border: "border-yellow-200",
      color: "text-yellow-700",
    },
    {
      label: "Total Employers",
      value: stats.totalEmployers,
      icon: Users,
      gradient: "from-purple-100/50 to-purple-50/50",
      border: "border-purple-200",
      color: "text-purple-700",
    },
    {
      label: "Verified Employers",
      value: stats.verifiedEmployers,
      icon: CheckCircle2,
      gradient: "from-pink-100/50 to-pink-50/50",
      border: "border-pink-200",
      color: "text-pink-700",
    },
  ]

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">Real-time platform statistics and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.label}
              className={`bg-gradient-to-br ${card.gradient} border-2 ${card.border} rounded-xl p-6 shadow-sm transition-all hover:shadow-md`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-bold text-muted-foreground uppercase mb-2">{card.label}</p>
                  <p className="text-4xl font-bold text-foreground">{card.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${card.color} opacity-50`} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { title: "New Worker Registration", desc: "Priya Singh registered as worker", time: "2 hours ago" },
            { title: "Document Submitted", desc: "Ramesh Kumar submitted verification docs", time: "5 hours ago" },
            { title: "Job Posted", desc: "BuildCorp posted electrical wiring job", time: "1 day ago" },
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
              <div>
                <p className="font-semibold text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.desc}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
