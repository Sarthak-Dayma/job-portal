"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { workerService } from "@/lib/api-service"
import { Save, X, Upload, Trash2, Award, Briefcase, Calendar, MapPin, DollarSign, Clock, Plus, GraduationCap, FileText, Phone, Mail, User, Star, CheckCircle2 } from 'lucide-react'
import type { WorkerProfile } from "@/lib/types/worker"

interface WorkerProfileEditProps {
  userState: any
  onSave: (profile: Partial<WorkerProfile>) => void
  onCancel: () => void
  initialData?: Partial<WorkerProfile>
}

export default function WorkerProfileEdit({ 
  userState, 
  onSave, 
  onCancel,
  initialData = {}
}: WorkerProfileEditProps) {
  const { t } = useLanguage()
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<Partial<WorkerProfile>>({
    firstName: initialData.firstName || "",
    lastName: initialData.lastName || "",
    bio: initialData.bio || "",
    primaryTrade: initialData.primaryTrade || "general",
    secondaryTrades: initialData.secondaryTrades || [],
    experienceLevel: initialData.experienceLevel || "entry",
    yearsOfExperience: initialData.yearsOfExperience || 0,
    skills: initialData.skills || [],
    certifications: initialData.certifications || [],
    location: initialData.location || { city: "", state: "" },
    serviceRadius: initialData.serviceRadius || 10,
    hourlyRate: initialData.hourlyRate || undefined,
    dailyRate: initialData.dailyRate || undefined,
    availability: initialData.availability || {
      workingDays: ["mon", "tue", "wed", "thu", "fri"],
      hoursPerDay: 8,
      canWorkWeekends: false
    },
    ...initialData
  })

  const [newSkill, setNewSkill] = useState("")
  const [newCertification, setNewCertification] = useState("")
  const [certificates, setCertificates] = useState<Array<{ name: string; file?: File; url?: string }>>([])

  const tradeOptions = [
    { value: "electrician", label: "Electrician", labelHi: "इलेक्ट्रीशियन" },
    { value: "plumber", label: "Plumber", labelHi: "प्लंबर" },
    { value: "carpenter", label: "Carpenter", labelHi: "बढ़ई" },
    { value: "painter", label: "Painter", labelHi: "पेंटर" },
    { value: "mason", label: "Mason", labelHi: "राजमिस्त्री" },
    { value: "welder", label: "Welder", labelHi: "वेल्डर" },
    { value: "mechanic", label: "Mechanic", labelHi: "मैकेनिक" },
    { value: "hvac", label: "HVAC Technician", labelHi: "एचवीएसी तकनीशियन" },
    { value: "general", label: "General Labor", labelHi: "सामान्य मजदूर" },
  ]

  const experienceLevels = [
    { value: "entry", label: "Entry Level (0-2 years)", labelHi: "शुरुआती स्तर (0-2 वर्ष)" },
    { value: "intermediate", label: "Intermediate (3-5 years)", labelHi: "मध्यवर्ती (3-5 वर्ष)" },
    { value: "expert", label: "Expert (5+ years)", labelHi: "विशेषज्ञ (5+ वर्ष)" },
  ]

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData(prev => ({
        ...prev,
        [parent]: { ...(prev[parent] as any), [child]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter(s => s !== skill) || []
    }))
  }

  const addCertification = () => {
    if (newCertification.trim() && !formData.certifications?.includes(newCertification.trim())) {
      setFormData(prev => ({
        ...prev,
        certifications: [...(prev.certifications || []), newCertification.trim()]
      }))
      setNewCertification("")
    }
  }

  const removeCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications?.filter(c => c !== cert) || []
    }))
  }

  const handleCertificateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newCerts = Array.from(files).map(file => ({
        name: file.name,
        file
      }))
      setCertificates(prev => [...prev, ...newCerts])
    }
  }

  const removeCertificateFile = (index: number) => {
    setCertificates(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      // In a real app, upload certificates first
      await onSave(formData)
    } catch (err) {
      alert("Failed to save profile")
      console.error(err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('profile.editProfile')}</h1>
            <p className="text-muted-foreground mt-1">Update your professional information</p>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        {/* Personal Information */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">{t('profile.personalInfo')}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                First Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Last Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Bio / About Yourself
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Tell employers about your experience, work style, and what makes you a great hire..."
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-32 resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {formData.bio?.length || 0}/500 characters
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                City <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.location?.city}
                  onChange={(e) => handleInputChange("location.city", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter city"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                State <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.location?.state}
                onChange={(e) => handleInputChange("location.state", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter state"
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Briefcase className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Professional Details</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Primary Trade <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.primaryTrade}
                onChange={(e) => handleInputChange("primaryTrade", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {tradeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Experience Level <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {experienceLevels.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Years of Experience
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={formData.yearsOfExperience}
                onChange={(e) => handleInputChange("yearsOfExperience", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Service Radius (km)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.serviceRadius}
                onChange={(e) => handleInputChange("serviceRadius", parseInt(e.target.value) || 10)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Hourly Rate (₹)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  min="0"
                  value={formData.hourlyRate || ""}
                  onChange={(e) => handleInputChange("hourlyRate", parseFloat(e.target.value) || undefined)}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Daily Rate (₹)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  min="0"
                  value={formData.dailyRate || ""}
                  onChange={(e) => handleInputChange("dailyRate", parseFloat(e.target.value) || undefined)}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Skills <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Add a skill (e.g., Wiring, Plumbing)"
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                onClick={addSkill}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills?.map((skill) => (
                <span
                  key={skill}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 group"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Certifications
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                placeholder="Add a certification (e.g., ITI Electrician)"
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                onClick={addCertification}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 font-semibold transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.certifications?.map((cert) => (
                <div
                  key={cert}
                  className="bg-secondary/10 text-secondary-foreground px-4 py-3 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span className="font-medium">{cert}</span>
                  </div>
                  <button
                    onClick={() => removeCertification(cert)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certificate Upload */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Upload Certificates & Documents</h2>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-semibold mb-2">Upload Certificate Files</p>
            <p className="text-sm text-muted-foreground mb-4">
              PDF, JPG, PNG up to 5MB each
            </p>
            <label className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-semibold cursor-pointer transition-all">
              Choose Files
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleCertificateUpload}
                className="hidden"
              />
            </label>
          </div>

          {certificates.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Uploaded Files:</p>
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-muted px-4 py-3 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <span className="font-medium">{cert.name}</span>
                  </div>
                  <button
                    onClick={() => removeCertificateFile(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Availability */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Availability</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Hours per Day
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={formData.availability?.hoursPerDay}
                onChange={(e) => handleInputChange("availability.hoursPerDay", parseInt(e.target.value) || 8)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="flex items-center gap-3 pt-8">
              <input
                type="checkbox"
                id="weekends"
                checked={formData.availability?.canWorkWeekends}
                onChange={(e) => handleInputChange("availability.canWorkWeekends", e.target.checked)}
                className="w-5 h-5 text-primary border-border rounded focus:ring-primary"
              />
              <label htmlFor="weekends" className="text-sm font-semibold text-foreground cursor-pointer">
                Available on Weekends
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 sticky bottom-0 bg-background p-4 border-t border-border rounded-t-xl">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg transition-all shadow-lg"
          >
            <Save className="w-5 h-5" />
            {isSaving ? "Saving..." : "Save Profile"}
          </button>
          <button
            onClick={onCancel}
            disabled={isSaving}
            className="px-6 py-4 bg-muted text-foreground rounded-lg hover:bg-muted/80 font-bold text-lg transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
