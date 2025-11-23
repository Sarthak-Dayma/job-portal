"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  Save,
  X,
  Upload,
  Trash2,
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  User,
  FileText,
  CheckCircle2,
  Plus,
  Users
} from "lucide-react"
import type { CompanyProfile } from "@/lib/types/employer"

interface EmployerProfileEditProps {
  userState: any
  onSave: (profile: Partial<CompanyProfile>) => Promise<void> | void
  onCancel: () => void
  initialData?: Partial<CompanyProfile>
}

export default function EmployerProfileEdit({
  userState,
  onSave,
  onCancel,
  initialData = {}
}: EmployerProfileEditProps) {
  const { t } = useLanguage()
  const [isSaving, setIsSaving] = useState(false)

  // Allow indexing by arbitrary strings while keeping Partial<CompanyProfile>
  const [formData, setFormData] = useState<Partial<CompanyProfile> & Record<string, any>>({
    companyName: initialData.companyName ?? "",
    bio: initialData.bio ?? "",
    website: initialData.website ?? "",
    location: initialData.location ?? { city: "", state: "", address: "" },
    contactPerson: initialData.contactPerson ?? { name: "", phone: "", email: "" },
    industryTypes: initialData.industryTypes ?? [],
    businessType: initialData.businessType ?? "small",
    yearsInBusiness: initialData.yearsInBusiness ?? 0,
    numberOfEmployees: initialData.numberOfEmployees ?? undefined,
    ...initialData
  })

  const [newIndustry, setNewIndustry] = useState("")
  const [documents, setDocuments] = useState<Array<{ name: string; type: string; file?: File }>>([])

  const businessTypes = [
    { value: "individual", label: "Individual / Sole Proprietor", labelHi: "व्यक्तिगत / एकल स्वामी" },
    { value: "small", label: "Small Business", labelHi: "छोटा व्यवसाय" },
    { value: "medium", label: "Medium Enterprise", labelHi: "मध्यम उद्यम" },
    { value: "large", label: "Large Corporation", labelHi: "बड़ा निगम" }
  ]

  const industryOptions = [
    "Construction",
    "Manufacturing",
    "Retail",
    "Hospitality",
    "Healthcare",
    "IT Services",
    "Real Estate",
    "Transportation",
    "Education",
    "Agriculture",
    "Other"
  ]

  /**
   * Generic setter supporting dot-notated keys like "location.city" (supports arbitrary depth).
   */
  const handleInputChange = (field: string, value: any) => {
    if (!field) return

    if (field.includes(".")) {
      // support deep nested paths
      const keys = field.split(".")
      setFormData(prev => {
        const copy: Record<string, any> = { ...(prev as Record<string, any>) }

        let cursor = copy
        for (let i = 0; i < keys.length - 1; i++) {
          const k = keys[i]
          // ensure the path exists and is an object
          if (typeof cursor[k] !== "object" || cursor[k] === null) cursor[k] = {}
          cursor[k] = { ...(cursor[k] as Record<string, any>) }
          cursor = cursor[k]
        }

        cursor[keys[keys.length - 1]] = value
        return copy
      })
    } else {
      setFormData(prev => ({ ...(prev as Record<string, any>), [field]: value }))
    }
  }

  const addIndustry = () => {
    const trimmed = newIndustry.trim()
    if (trimmed && !formData.industryTypes?.includes(trimmed)) {
      setFormData(prev => ({
        ...(prev as Record<string, any>),
        industryTypes: [...(prev.industryTypes || []), trimmed]
      }))
      setNewIndustry("")
    }
  }

  const removeIndustry = (industry: string) => {
    setFormData(prev => ({
      ...(prev as Record<string, any>),
      industryTypes: (prev.industryTypes || []).filter((i: string) => i !== industry)
    }))
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const files = e.target.files
    if (files && files[0]) {
      setDocuments(prev => [
        ...prev,
        {
          name: files[0].name,
          type: docType,
          file: files[0]
        }
      ])
      // clear the input so same file can be re-selected if needed
      e.currentTarget.value = ""
    }
  }

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      // In a real app, upload documents first and add their URLs to formData
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
            <h1 className="text-3xl font-bold text-foreground">{t("profile.editProfile")}</h1>
            <p className="text-muted-foreground mt-1">Update your company information</p>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        {/* Company Information */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Company Information</h2>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Company Name <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={formData.companyName ?? ""}
              onChange={e => handleInputChange("companyName", e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Company Bio / About</label>
            <textarea
              value={formData.bio ?? ""}
              onChange={e => handleInputChange("bio", e.target.value)}
              placeholder="Tell workers about your company, work culture, and what makes you a great employer..."
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-32 resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">{(formData.bio?.length as number) ?? 0}/500 characters</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Business Type <span className="text-destructive">*</span>
              </label>
              <select
                value={formData.businessType ?? "small"}
                onChange={e => handleInputChange("businessType", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {businessTypes.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Years in Business</label>
              <input
                type="number"
                min={0}
                max={100}
                value={formData.yearsInBusiness ?? 0}
                onChange={e => handleInputChange("yearsInBusiness", parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Number of Employees</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  min={1}
                  value={formData.numberOfEmployees ?? ""}
                  onChange={e => handleInputChange("numberOfEmployees", e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="url"
                  value={formData.website ?? ""}
                  onChange={e => handleInputChange("website", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>

          {/* Industry Types */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Industry Types <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2 mb-3">
              <select
                value={newIndustry}
                onChange={e => setNewIndustry(e.target.value)}
                className="flex-1 px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="">Select an industry</option>
                {industryOptions.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <button
                onClick={addIndustry}
                disabled={!newIndustry.trim()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(formData.industryTypes || []).map((industry: string) => (
                <span
                  key={industry}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {industry}
                  <button onClick={() => removeIndustry(industry)} className="hover:text-destructive transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Location</h2>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Address <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={formData.location?.address ?? ""}
              onChange={e => handleInputChange("location.address", e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="Enter full address"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                City <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.location?.city ?? ""}
                onChange={e => handleInputChange("location.city", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                State <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.location?.state ?? ""}
                onChange={e => handleInputChange("location.state", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter state"
              />
            </div>
          </div>
        </div>

        {/* Contact Person */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Contact Person</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.contactPerson?.name ?? ""}
                onChange={e => handleInputChange("contactPerson.name", e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Enter contact person name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone <span className="text-destructive">*</span></label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  value={formData.contactPerson?.phone ?? ""}
                  onChange={e => handleInputChange("contactPerson.phone", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email <span className="text-destructive">*</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.contactPerson?.email ?? ""}
                  onChange={e => handleInputChange("contactPerson.email", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Business Documents</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { type: "businessProof", label: "Business Registration" },
              { type: "gstCertificate", label: "GST Certificate" },
              { type: "bankStatement", label: "Bank Statement" },
              { type: "other", label: "Other Documents" }
            ].map(doc => (
              <div key={doc.type} className="border border-border rounded-lg p-4">
                <label className="block text-sm font-semibold text-foreground mb-3">{doc.label}</label>
                <label className="flex items-center justify-center gap-2 px-4 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg cursor-pointer transition-all border-2 border-dashed border-border">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Choose File</span>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={e => handleDocumentUpload(e, doc.type)}
                    className="hidden"
                  />
                </label>
              </div>
            ))}
          </div>

          {documents.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">Uploaded Documents:</p>
              {documents.map((doc, index) => (
                <div key={index} className="bg-muted px-4 py-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.type}</p>
                    </div>
                  </div>
                  <button onClick={() => removeDocument(index)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
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
