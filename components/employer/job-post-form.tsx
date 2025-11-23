"use client"

import type React from "react"
import { useState } from "react"
import { AlertCircle, Plus, X } from 'lucide-react'

interface JobPostFormProps {
  onSubmit: (data: any) => void
}

const TRADE_OPTIONS = ["electrical", "plumbing", "carpentry", "painting", "masonry", "welding", "hvac", "general", "construction", "maintenance"]

export default function JobPostForm({ onSubmit }: JobPostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "electrical",
    skills: [] as string[],
    startDate: "",
    endDate: "",
    wage: { amount: "", period: "daily" as const },
    location: "",
  })

  const [skillInput, setSkillInput] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = "Job title is required"
    if (!formData.description.trim()) newErrors.description = "Job description is required"
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.wage.amount) newErrors.wage = "Wage amount is required"
    if (formData.skills.length === 0) newErrors.skills = "Add at least one required skill"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] })
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    const submitData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      skills: formData.skills,
      location: formData.location,
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      wage: { amount: Number.parseFloat(formData.wage.amount), currency: "INR", period: formData.wage.period },
      status: "active",
    }
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Post a New Job</h2>
        <p className="text-muted-foreground">Fill in the details below to post your job and find qualified workers</p>
      </div>

      {/* Basic Information */}
      <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</span>
          Basic Information
        </h3>

        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Job Title <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Senior Electrician for Industrial Wiring"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-input focus:outline-none focus:ring-2 transition-all ${
              errors.title ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"
            }`}
          />
          {errors.title && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Job Description <span className="text-destructive">*</span>
          </label>
          <textarea
            placeholder="Describe the job responsibilities, requirements, and expectations..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-input focus:outline-none focus:ring-2 transition-all h-32 resize-none ${
              errors.description ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"
            }`}
          />
          {errors.description && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.description}</p>}
        </div>
      </div>

      {/* Category & Skills */}
      <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</span>
          Category & Skills
        </h3>

        <div>
          <label className="block text-sm font-bold text-foreground mb-2">Trade Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 border-2 border-border rounded-lg bg-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          >
            {TRADE_OPTIONS.map((trade) => (
              <option key={trade} value={trade}>
                {trade.charAt(0).toUpperCase() + trade.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-foreground mb-3">
            Required Skills <span className="text-destructive">*</span>
          </label>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="e.g., Industrial Wiring"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
              className="flex-1 px-4 py-3 border-2 border-border rounded-lg bg-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
          {errors.skills && <p className="text-destructive text-sm mb-3 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.skills}</p>}
          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span key={skill} className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:opacity-60">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Payment & Duration */}
      <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</span>
          Payment & Duration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">
              Wage Amount (₹) <span className="text-destructive">*</span>
            </label>
            <input
              type="number"
              placeholder="500"
              value={formData.wage.amount}
              onChange={(e) => setFormData({ ...formData, wage: { ...formData.wage, amount: e.target.value } })}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-input focus:outline-none focus:ring-2 transition-all ${
                errors.wage ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"
              }`}
            />
            {errors.wage && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.wage}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">Payment Period</label>
            <select
              value={formData.wage.period}
              onChange={(e) => setFormData({ ...formData, wage: { ...formData.wage, period: e.target.value as any } })}
              className="w-full px-4 py-3 border-2 border-border rounded-lg bg-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="fixed">Fixed Project</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">
              Start Date <span className="text-destructive">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-input focus:outline-none focus:ring-2 transition-all ${
                errors.startDate ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"
              }`}
            />
            {errors.startDate && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.startDate}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">End Date (Optional)</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-4 py-3 border-2 border-border rounded-lg bg-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">4</span>
          Location
        </h3>

        <div>
          <label className="block text-sm font-bold text-foreground mb-2">
            Job Location <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Mumbai, Maharashtra"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-input focus:outline-none focus:ring-2 transition-all ${
              errors.location ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"
            }`}
          />
          {errors.location && <p className="text-destructive text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.location}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-lg transition-all text-lg"
      >
        Post Job Now
      </button>
    </form>
  )
}
