"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import EmployerProfileEdit from "./employer-profile-edit"
import { Edit2, Building2, MapPin, Globe, Phone, Mail, Star, Briefcase, Calendar, CheckCircle2, XCircle, Award } from 'lucide-react'
import type { CompanyProfile } from "@/lib/types/employer"

interface EmployerProfileProps {
  userState: any
}

export default function EmployerProfile({ userState }: EmployerProfileProps) {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)
  
  const [profile, setProfile] = useState<Partial<CompanyProfile>>({
    companyName: "BuildTech Solutions Pvt Ltd",
    bio: "Leading construction company specializing in residential and commercial projects. Committed to quality construction and timely delivery.",
    website: "https://buildtech.example.com",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      address: "123 Business Park, Andheri East, Mumbai"
    },
    contactPerson: {
      name: "Rajesh Sharma",
      phone: userState.phone,
      email: "rajesh@buildtech.com"
    },
    industryTypes: ["Construction", "Real Estate"],
    businessType: "medium",
    yearsInBusiness: 8,
    numberOfEmployees: 150,
    rating: 4.3,
    totalReviews: 18,
    totalJobsPosted: 89,
    jobsFilledSuccessfully: 76,
    verified: true,
    backgroundCheckCompleted: true,
    paymentVerified: true,
    createdAt: new Date('2023-06-10')
  })

  const handleSaveProfile = async (updatedProfile: Partial<CompanyProfile>) => {
    setProfile(updatedProfile)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <EmployerProfileEdit 
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
            <div className="w-24 h-24 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-12 h-12 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{profile.companyName}</h1>
                {profile.verified && (
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                )}
              </div>
              <div className="flex flex-wrap gap-3 mb-3">
                {profile.industryTypes?.map(industry => (
                  <span key={industry} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                    {industry}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">{profile.bio}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.location?.city}, {profile.location?.state}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>{profile.yearsInBusiness} years in business</span>
                </div>
                {profile.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Website
                    </a>
                  </div>
                )}
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
            <Briefcase className="w-5 h-5 text-primary" />
            <p className="text-sm font-semibold text-muted-foreground">Jobs Posted</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{profile.totalJobsPosted}</p>
          <p className="text-xs text-muted-foreground mt-1">{profile.jobsFilledSuccessfully} filled</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-secondary" />
            <p className="text-sm font-semibold text-muted-foreground">Success Rate</p>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {((profile.jobsFilledSuccessfully! / profile.totalJobsPosted!) * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-muted-foreground mt-1">Hiring success</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-5 h-5 text-primary" />
            <p className="text-sm font-semibold text-muted-foreground">Team Size</p>
          </div>
          <p className="text-3xl font-bold text-foreground">{profile.numberOfEmployees}</p>
          <p className="text-xs text-muted-foreground mt-1">Employees</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-semibold text-foreground mb-1">Office Address</p>
              <p className="text-muted-foreground">{profile.location?.address}</p>
              <p className="text-muted-foreground">{profile.location?.city}, {profile.location?.state}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground mb-1">Contact Person</p>
              <p className="text-muted-foreground">{profile.contactPerson?.name} - {profile.contactPerson?.phone}</p>
            </div>
          </div>

          {profile.contactPerson?.email && (
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <p className="font-semibold text-foreground mb-1">Email</p>
                <a href={`mailto:${profile.contactPerson.email}`} className="text-primary hover:underline">
                  {profile.contactPerson.email}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

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
              <span className="font-semibold">Company Verification</span>
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

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              {profile.paymentVerified ? (
                <CheckCircle2 className="w-5 h-5 text-accent" />
              ) : (
                <XCircle className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="font-semibold">Payment Verification</span>
            </div>
            <span className={`text-sm font-bold ${profile.paymentVerified ? 'text-accent' : 'text-muted-foreground'}`}>
              {profile.paymentVerified ? 'Verified' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Business Type */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Company Details</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Business Type</p>
            <p className="text-lg font-semibold text-foreground capitalize">
              {profile.businessType?.replace('_', ' ')}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Member Since</p>
            <p className="text-lg font-semibold text-foreground">
              {profile.createdAt?.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
