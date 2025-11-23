"use client"

import { useState } from "react"
import LandingPage from "@/components/landing/landing-page"
import WorkerDashboard from "@/components/worker/worker-dashboard"
import EmployerDashboard from "@/components/employer/employer-dashboard"
import AdminDashboard from "@/components/admin/admin-dashboard"
import { LanguageProvider } from "@/lib/i18n/language-context"

export default function Home() {
  const [authState, setAuthState] = useState<{
    token?: string
    userType?: "worker" | "employer" | "admin"
    userId?: number
    phone?: string
    name?: string
  }>({})

  return (
    <LanguageProvider>
      {!authState.token ? (
        <LandingPage onLogin={setAuthState} />
      ) : authState.userType === "worker" ? (
        <WorkerDashboard userState={authState} onLogout={() => setAuthState({})} />
      ) : authState.userType === "employer" ? (
        <EmployerDashboard userState={authState} onLogout={() => setAuthState({})} />
      ) : authState.userType === "admin" ? (
        <AdminDashboard userState={authState} onLogout={() => setAuthState({})} />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )}
    </LanguageProvider>
  )
}
