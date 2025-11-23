"use client"

import { useState, useEffect } from "react"
import { jobService } from "@/lib/api-service"
import JobPostForm from "./job-post-form"
import JobApplicationsList from "./job-applications-list"
import Header from "../shared/header"
import { Briefcase, Plus, Users, BarChart3, TrendingUp, Clock, CheckCircle2, Eye } from 'lucide-react'
import type { Job } from "@/lib/types"
import { useLanguage } from '@/lib/i18n/language-context'

interface EmployerDashboardProps {
  userState: any
  onLogout: () => void
}

export default function EmployerDashboard({ userState, onLogout }: EmployerDashboardProps) {
  const { t } = useLanguage()
  const [tab, setTab] = useState("overview")
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJobForApplicants, setSelectedJobForApplicants] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const data = await jobService.getJobs()
        setJobs(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handlePostJob = async (jobData: any) => {
    try {
      const newJob = await jobService.createJob({
        ...jobData,
        employerId: userState.userId,
      })
      setJobs([...jobs, newJob])
      setTab("jobs")
    } catch (err) {
      console.error(err)
    }
  }

  const stats = {
    totalJobs: jobs.length,
    totalApplicants: jobs.reduce((sum, job) => sum + job.applicants, 0),
    activePostings: jobs.filter((j) => j.status === "active").length,
    filledJobs: jobs.filter((j) => j.status === "filled").length,
    completedJobs: jobs.filter((j) => j.status === "completed").length,
    avgApplicantsPerJob: jobs.length > 0 ? Math.round(jobs.reduce((sum, job) => sum + job.applicants, 0) / jobs.length) : 0,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-slate-50">
      <Header 
        title="ShramSaathi" 
        subtitle={t('employer.subtitle')} 
        onLogout={onLogout} 
        userType="employer"
        notificationCount={5}
        messageCount={2}
      />

      {/* Professional Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: "overview", label: t('employer.analytics'), icon: BarChart3 },
              { id: "jobs", label: t('employer.postedJobs'), icon: Briefcase },
              { id: "post", label: t('employer.postJob'), icon: Plus },
              { id: "applicants", label: t('employer.applicants'), icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-semibold transition-all ${
                  tab === id
                    ? 'border-[#FF6B35] text-[#FF6B35]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview/Analytics Tab */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> +12%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{t('employer.totalJobsPosted')}</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalJobs}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> +8%
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{t('employer.totalApplicants')}</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalApplicants}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">{t('employer.activePostings')}</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activePostings}</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Completed Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedJobs}</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Jobs</h3>
                <div className="space-y-3">
                  {jobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{job.title}</p>
                        <p className="text-sm text-gray-600">{job.category}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-sm font-semibold text-[#FF6B35]">{job.applicants}</span>
                        <Users className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => setTab('post')}
                    className="w-full flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all text-left border border-gray-200"
                  >
                    <div className="w-10 h-10 bg-[#FF6B35] rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Post New Job</p>
                      <p className="text-sm text-gray-600">Reach thousands of workers</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setTab('applicants')}
                    className="w-full flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all text-left border border-gray-200"
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">View Applicants</p>
                      <p className="text-sm text-gray-600">{stats.totalApplicants} total applicants</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {tab === "jobs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">{t('employer.postedJobs')}</h2>
              <button
                onClick={() => setTab('post')}
                className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E85D2C] transition-all"
              >
                <Plus className="w-5 h-5" />
                Post Job
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-16">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35] mx-auto mb-4" />
                  <p className="text-gray-600">{t('common.loading')}</p>
                </div>
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-6">{t('employer.noJobs')}</p>
                <button
                  onClick={() => setTab("post")}
                  className="px-6 py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#E85D2C] font-semibold transition-all"
                >
                  {t('employer.postFirstJob')}
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white border border-gray-200 hover:border-[#FF6B35] rounded-xl p-6 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              job.status === "active"
                                ? "bg-green-100 text-green-700"
                                : job.status === "filled"
                                  ? "bg-blue-100 text-blue-700"
                                  : job.status === "completed"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{job.category}</p>
                        <p className="text-gray-700 line-clamp-2 mb-4">{job.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Wage</p>
                        <p className="text-lg font-bold text-[#FF6B35]">₹{job.wage.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Location</p>
                        <p className="font-semibold text-gray-900">{job.location}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Posted</p>
                        <p className="font-semibold text-gray-900">{new Date(job.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Applicants</p>
                        <button
                          onClick={() => {
                            setSelectedJobForApplicants(job.id)
                            setTab("applicants")
                          }}
                          className="text-lg font-bold text-blue-600 hover:underline"
                        >
                          {job.applicants}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Post Job Tab */}
        {tab === "post" && (
          <div className="max-w-3xl mx-auto">
            <JobPostForm onSubmit={handlePostJob} />
          </div>
        )}

        {/* Applicants Tab */}
        {tab === "applicants" && (
          <div className="max-w-5xl mx-auto">
            <JobApplicationsList jobId={selectedJobForApplicants} />
          </div>
        )}
      </div>
    </div>
  )
}
