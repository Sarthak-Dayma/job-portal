"use client"

import { useState } from "react"
import { Upload, FileText, X, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ResumeUploadProps {
  currentResume?: string
  onUpload: (file: File) => void
}

export default function ResumeUpload({ currentResume, onUpload }: ResumeUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type === "application/pdf" || file.type.includes("document")) {
      setUploadedFile(file)
      setUploading(true)
      // Simulate upload
      setTimeout(() => {
        setUploading(false)
        onUpload(file)
      }, 1500)
    } else {
      alert("Please upload a PDF or document file")
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">
          Resume / CV
        </label>
        <p className="text-xs text-muted-foreground mb-4">
          Upload your resume to help employers understand your qualifications
        </p>
      </div>

      {currentResume || uploadedFile ? (
        <div className="border border-border rounded-lg p-4 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {uploadedFile?.name || "current-resume.pdf"}
              </p>
              <p className="text-xs text-muted-foreground">
                {uploadedFile
                  ? `${(uploadedFile.size / 1024).toFixed(1)} KB`
                  : "Uploaded"}
              </p>
            </div>
            {uploading ? (
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                <Check className="h-5 w-5 text-accent-foreground" />
              </div>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUploadedFile(null)}
            className="mt-3 w-full"
          >
            Replace Resume
          </Button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <label htmlFor="resume-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm font-semibold text-foreground mb-1">
              Drop your resume here or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, DOC, DOCX up to 10MB
            </p>
          </label>
          <Input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}
