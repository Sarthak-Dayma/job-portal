"use client"

import { useState, useEffect } from "react"
import { jobService } from "@/lib/api-service"
import { matchingService } from "@/lib/matching-service"
import JobCard from "./job-card"
import { Search, Filter, X, Zap } from 'lucide-react'
import type { Job } from "@/lib/types"

interface JobSearchProps {
  userState?: any
  onSelectJob: (job: Job) => void
}

export default function JobSearch({ userState, onSelectJob }: JobSearchProps) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 10000 })

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const data = await jobService.getJobs()
        setJobs(data)
        setFilteredJobs(data)
      } catch (err) {
        setError("Failed to load jobs")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchJobs()
  }, [])

  useEffect(() => {
    const results = matchingService.searchJobs(jobs, {
      category: selectedCategory || undefined,
      location: selectedLocation || undefined,
      minWage: priceRange.min,
      maxWage: priceRange.max,
      searchText: searchText || undefined,
    })
    setFilteredJobs(results)
  }, [searchText, selectedCategory, selectedLocation, priceRange, jobs])

  const categories = Array.from(new Set(jobs.map((job) => job.category)))
  const locations = Array.from(new Set(jobs.map((job) => job.location)))

  const hasActiveFilters = searchText || selectedCategory || selectedLocation || priceRange.min > 0 || priceRange.max < 10000

  const clearFilters = () => {
    setSearchText("")
    setSelectedCategory("")
    setSelectedLocation("")
    setPriceRange({ min: 0, max: 10000 })
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search jobs by title, skills, or description..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-lg bg-card focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border-2 border-border rounded-lg hover:border-primary bg-card transition-all font-medium"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide" : "Show"} Filters
          {hasActiveFilters && <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full font-bold">{searchText ? 1 : 0}</span>}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-card border-2 border-border rounded-lg p-6 space-y-6 animate-slideDown">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-3">Trade Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border-2 border-border rounded-lg bg-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-3">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border-2 border-border rounded-lg bg-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-bold text-foreground mb-3">Wage Range (₹)</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Math.max(0, Number.parseInt(e.target.value) || 0) })}
                    className="flex-1 px-4 py-3 border-2 border-border rounded-lg bg-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <span className="self-center text-muted-foreground font-bold">→</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number.parseInt(e.target.value) || 10000 })}
                    className="flex-1 px-4 py-3 border-2 border-border rounded-lg bg-input focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <p className="text-xs text-muted-foreground">₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-foreground">
          <span className="text-primary">{filteredJobs.length}</span> Jobs Found
        </h3>
        {filteredJobs.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Loading..." : "Updated just now"}
          </p>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading jobs...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
          <p className="font-semibold">{error}</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-card p-12 rounded-lg text-center border-2 border-dashed border-border">
          <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-lg text-muted-foreground mb-4">
            {searchText || selectedCategory || selectedLocation ? "No jobs match your search" : "No jobs available right now"}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-primary hover:text-primary/80 font-medium underline transition-colors"
            >
              Try adjusting your filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={{
                ...job,
                workersNeeded: 1,
                tradeCategory: job.category,
                requiredSkills: job.skills,
                budget: { min: Math.floor(job.wage.amount), max: Math.ceil(job.wage.amount * 1.2) },
              }}
              onSelect={() => onSelectJob(job)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
