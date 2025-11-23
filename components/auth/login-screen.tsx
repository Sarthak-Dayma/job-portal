"use client"

import { useState } from "react"
import OtpForm from "./otp-form"
import UserTypeSelector from "./user-type-selector"

interface LoginScreenProps {
  onLogin: (state: any) => void
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<"type" | "phone" | "otp">("type")
  const [userType, setUserType] = useState<"worker" | "employer" | "admin">("worker")
  const [phone, setPhone] = useState("")
  const [otpToken, setOtpToken] = useState("")

  const handleUserTypeSelect = (type: "worker" | "employer" | "admin") => {
    setUserType(type)
    setStep("phone")
  }

  const handlePhoneSubmit = async (phoneNum: string) => {
    setPhone(phoneNum)
    // Mock OTP request - in production, call actual API
    const mockOtpToken = `token_${Date.now()}`
    setOtpToken(mockOtpToken)
    setStep("otp")
  }

  const handleOtpVerify = async (code: string) => {
    // Mock OTP verification - in production, call actual API
    if (code.length === 6) {
      onLogin({
        token: `jwt_${Date.now()}`,
        userType,
        userId: Math.floor(Math.random() * 1000),
        phone,
      })
    }
  }

  if (step === "type") {
    return <UserTypeSelector onSelect={handleUserTypeSelect} />
  }

  if (step === "phone" || step === "otp") {
    return (
      <OtpForm
        step={step}
        userType={userType}
        onPhoneSubmit={handlePhoneSubmit}
        onOtpVerify={handleOtpVerify}
        onBack={() => setStep("type")}
      />
    )
  }

  return null
}
