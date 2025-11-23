"use client"

import { useState, useEffect } from "react"
import { jobService, applicationService } from "@/lib/api-service"
import JobCard from "../jobs/job-card"
import WorkerProfile from "./worker-profile"
import JobDetail from "../jobs/job-detail"
import Header from "../shared/header"
import { Briefcase, User, FileText, Search, TrendingUp, MapPin, Star, Target, Sparkles } from 'lucide-react'
import type { Job, JobApplication } from "@/lib/types"
import { useLanguage } from '@/lib/i18n/language-context'

interface WorkerDashboardProps {
  userState: any
  onLogout: () => void
}

export default function WorkerDashboard({ userState, onLogout }: WorkerDashboardProps) {
  const { t } = useLanguage()
  const [tab, setTab] = useState("jobs")
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setFilteredJobs(filtered)
  }, [searchQuery, jobs])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const data = await jobService.getJobs()
        setJobs(data)
        setFilteredJobs(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleApplyForJob = async (jobId: string) => {
    try {
      const application = await applicationService.applyForJob(jobId, userState.token)
      setApplications([...applications, application])
      setSelectedJob(null)
    } catch (err) {
      console.error(err)
    }
  }

  if (selectedJob) {
    return (
      <JobDetail
        job={selectedJob}
        userType="worker"
        onBack={() => setSelectedJob(null)}
        onApply={() => handleApplyForJob(selectedJob.id)}
      />
    )
  }

  const stats = {
    totalApplications: applications.length,
    acceptedApplications: applications.filter(a => a.status === 'accepted').length,
    pendingApplications: applications.filter(a => a.status === 'applied').length,
    completedJobs: applications.filter(a => a.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <Header 
        title="ShramSaathi" 
        subtitle={t('worker.subtitle')} 
        onLogout={onLogout} 
        userType="worker"
        notificationCount={3}
        messageCount={1}
      />

      {/* Professional Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: "jobs", label: t('worker.availableJobs'), icon: Briefcase },
              { id: "applications", label: t('worker.myApplications'), icon: FileText },
              { id: "profile", label: t('worker.profile'), icon: User },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-semibold transition-all ${
                  tab === id
                    ? 'border-[#0A66C2] text-[#0A66C2]'
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
        {/* Jobs Tab - LinkedIn Style */}
        {tab === "jobs" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('worker.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20 transition-all"
                  />
                </div>
              </div>

              {/* Recommended Jobs Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-[#0A66C2]" />
                  <h2 className="text-xl font-bold text-gray-900">{t('worker.recommendations')}</h2>
                </div>
                
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0A66C2] mx-auto mb-3" />
                      <p className="text-gray-600 text-sm">{t('common.loading')}</p>
                    </div>
                  </div>
                ) : filteredJobs.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">{searchQuery ? 'No jobs match your search' : t('worker.noJobs')}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredJobs.slice(0, 10).map((job) => (
                      <div
                        key={job.id}
                        onClick={() => setSelectedJob(job)}
                        className="border border-gray-200 rounded-lg p-5 hover:shadow-lg hover:border-[#0A66C2] transition-all duration-200 cursor-pointer bg-white"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1 hover:text-[#0A66C2] transition-colors">
                              {job.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">{job.category}</p>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                <span className="font-semibold text-[#0A66C2]">₹{job.wage.amount.toLocaleString()}/{job.wage.period}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
                            <Target className="w-4 h-4" />
                            <span>95%</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.skills.slice(0, 5).map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-500">
                            Posted {new Date(job.createdAt).toLocaleDateString()}
                          </span>
                          <button className="text-sm font-semibold text-[#0A66C2] hover:underline">
                            {t('worker.viewDetails')} →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {userState.name?.charAt(0) || 'W'}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-1">{userState.name || 'Worker'}</h3>
                <p className="text-sm text-gray-600 mb-4">{userState.phone}</p>
                <div className="flex items-center justify-center gap-1 text-yellow-500 mb-4">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-gray-900 font-bold">4.8</span>
                  <span className="text-gray-600 text-sm">(24 reviews)</span>
                </div>
                <button 
                  onClick={() => setTab('profile')}
                  className="w-full py-2 border-2 border-[#0A66C2] text-[#0A66C2] rounded-lg font-semibold hover:bg-[#0A66C2] hover:text-white transition-all"
                >
                  View Profile
                </button>
              </div>

              {/* Stats Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Your Activity</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Applications</span>
                    <span className="font-bold text-gray-900">{stats.totalApplications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Accepted</span>
                    <span className="font-bold text-green-600">{stats.acceptedApplications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="font-bold text-yellow-600">{stats.pendingApplications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="font-bold text-[#0A66C2]">{stats.completedJobs}</span>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-[#0A66C2]" />
                  <h3 className="font-bold text-gray-900">Pro Tip</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Complete your profile and add skills to get better job matches and increase your chances of getting hired!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {tab === "applications" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('worker.myApplications')}</h2>
              {applications.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">{t('worker.noApplications')}</p>
                  <button 
                    onClick={() => setTab('jobs')}
                    className="text-[#0A66C2] font-semibold hover:underline"
                  >
                    Browse Jobs →
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-1">Job #{app.jobId}</h3>
                          <p className="text-sm text-gray-600">
                            Applied {new Date(app.appliedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                            app.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : app.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : app.status === "completed"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {tab === "profile" && (
          <div className="max-w-4xl mx-auto">
            <WorkerProfile userState={userState} />
          </div>
        )}
      </div>
    </div>
  )
}
