"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import WorkerProfileEdit from "./worker-profile-edit"
import { Edit2, Award, Briefcase, Calendar, Star, MapPin, DollarSign, Clock, CheckCircle2, XCircle } from 'lucide-react'
import type { WorkerProfile } from "@/lib/types/worker"

interface WorkerProfileProps {
  userState: any
}

export default function WorkerProfile({ userState }: WorkerProfileProps) {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  
  const [profile, setProfile] = useState<Partial<WorkerProfile>>({
    firstName: "Ramesh",
    lastName: "Kumar",
    bio: "Experienced electrician with 5+ years of expertise in industrial wiring and troubleshooting. Committed to safety and quality workmanship.",
    primaryTrade: "electrician",
    secondaryTrades: ["hvac"],
    experienceLevel: "expert",
    yearsOfExperience: 5,
    skills: ["Electrical Wiring", "Panel Installation", "Troubleshooting", "Safety Compliance"],
    certifications: ["ITI Electrician", "Safety Training Certificate"],
    location: { city: "Mumbai", state: "Maharashtra" },
    serviceRadius: 15,
    hourlyRate: 350,
    dailyRate: 2500,
    availability: {
      workingDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
      hoursPerDay: 8,
      canWorkWeekends: true
    },
    rating: 4.5,
    totalReviews: 24,
    totalJobsCompleted: 47,
    verified: true,
    backgroundCheckCompleted: true,
    createdAt: new Date('2024-01-15')
  })

  const handleSaveProfile = async (updatedProfile: Partial<WorkerProfile>) => {
    setProfile(updatedProfile)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <WorkerProfileEdit 
        userState={userState}
        onSave={handleSaveProfile}
        onCancel={() => setIsEditing(false)}
        initialData={profile}
      />
    )
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-border rounded-xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0">
              {profile.firstName?.[0]}{profile.lastName?.[0]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">
                  {profile.firstName} {profile.lastName}
                </h1>
                {profile.verified && (
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                )}
              </div>
              <p className="text-lg text-primary font-semibold capitalize mb-2">
                {profile.primaryTrade?.replace(/_/g, ' ')}
              </p>
              <p className="text-muted-foreground mb-4">{profile.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.location?.city}, {profile.location?.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.yearsOfExperience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {profile.createdAt?.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-all whitespace-nowrap"
          >
            <Edit2 className="w-4 h-4" />
            {t('common.edit')} {t('profile.title')}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-accent" />
            <p className="text-sm font-semibold text-muted-foreground">{t('profile.rating')}</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{profile.rating?.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground mt-1">{profile.totalReviews} reviews</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <p className="text-sm font-semibold text-muted-foreground">Jobs Done</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{profile.totalJobsCompleted}</p>
          <p className="text-xs text-muted-foreground mt-1">Completed successfully</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <p className="text-sm font-semibold text-muted-foreground">Hourly Rate</p>
          </div>
          <p className="text-3xl font-bold text-foreground">₹{profile.hourlyRate}</p>
          <p className="text-xs text-muted-foreground mt-1">₹{profile.dailyRate}/day</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <p className="text-sm font-semibold text-muted-foreground">Availability</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{profile.availability?.hoursPerDay}h</p>
          <p className="text-xs text-muted-foreground mt-1">
            {profile.availability?.canWorkWeekends ? "Weekends available" : "Weekdays only"}
          </p>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          {t('profile.skills')}
        </h2>
        <div className="flex flex-wrap gap-3">
          {profile.skills?.map((skill) => (
            <span
              key={skill}
              className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      {profile.certifications && profile.certifications.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-secondary" />
            Certifications
          </h2>
          <div className="space-y-3">
            {profile.certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 p-4 bg-secondary/10 rounded-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-semibold text-foreground">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verification Status */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">{t('profile.verificationStatus')}</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              {profile.verified ? (
                <CheckCircle2 className="w-5 h-5 text-accent" />
              ) : (
                <XCircle className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="font-semibold">Profile Verification</span>
            </div>
            <span className={`text-sm font-bold ${profile.verified ? 'text-accent' : 'text-muted-foreground'}`}>
              {profile.verified ? t('profile.verified') : t('profile.notVerified')}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              {profile.backgroundCheckCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-accent" />
              ) : (
                <XCircle className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="font-semibold">Background Check</span>
            </div>
            <span className={`text-sm font-bold ${profile.backgroundCheckCompleted ? 'text-accent' : 'text-muted-foreground'}`}>
              {profile.backgroundCheckCompleted ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Service Area */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Service Area
        </h2>
        <p className="text-muted-foreground">
          Available to work within <span className="font-bold text-foreground">{profile.serviceRadius} km</span> of {profile.location?.city}
        </p>
      </div>
    </div>
  )
}
