"use client"

import { useState } from "react"
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import LanguageSwitcher from '../shared/language-switcher'

interface OtpFormProps {
  step: "phone" | "otp"
  userType: "worker" | "employer" | "admin"
  onPhoneSubmit: (phone: string) => void
  onOtpVerify: (code: string) => void
  onBack: () => void
}

export default function OtpForm({ step, userType, onPhoneSubmit, onOtpVerify, onBack }: OtpFormProps) {
  const { t } = useLanguage()
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handlePhoneSubmit = () => {
    if (phone.length < 10) {
      alert(t('auth.invalidPhone'))
      return
    }
    setIsLoading(true)
    onPhoneSubmit(phone)
    setIsLoading(false)
  }

  const handleOtpSubmit = () => {
    if (otp.length !== 6) {
      alert(t('auth.invalidOtp'))
      return
    }
    setIsLoading(true)
    onOtpVerify(otp)
    setIsLoading(false)
  }

  const colorClasses = {
    worker: { bg: 'from-blue-50 to-blue-100', button: 'bg-[#0A66C2] hover:bg-[#004182]', text: 'text-[#0A66C2]' },
    employer: { bg: 'from-orange-50 to-orange-100', button: 'bg-[#FF6B35] hover:bg-[#E85D2C]', text: 'text-[#FF6B35]' },
    admin: { bg: 'from-green-50 to-green-100', button: 'bg-[#10B981] hover:bg-[#059669]', text: 'text-[#10B981]' },
  }

  const colors = colorClasses[userType]

  if (step === "phone") {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${colors.bg} via-white flex items-center justify-center px-4`}>
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className={`flex items-center gap-2 ${colors.text} hover:opacity-80 font-semibold transition-colors`}
            >
              <ArrowLeft className="w-5 h-5" />
              {t('common.back')}
            </button>
            <LanguageSwitcher />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.button} rounded-2xl mb-4 shadow-lg`}>
                <span className="text-2xl">📱</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.enterPhone')}</h2>
              <p className="text-gray-600">We'll send you a verification code</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">{t('profile.phone')}</label>
                <input
                  type="tel"
                  placeholder={t('auth.phonePlaceholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  maxLength={10}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0A66C2] focus:ring-4 focus:ring-blue-100 transition-all text-lg font-semibold"
                />
                <p className="text-xs text-gray-500 mt-2">Enter 10-digit mobile number</p>
              </div>

              <button
                onClick={handlePhoneSubmit}
                disabled={phone.length < 10 || isLoading}
                className={`w-full py-4 ${colors.button} text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]`}
              >
                {isLoading ? t('common.loading') : t('auth.sendOtp')}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.bg} via-white flex items-center justify-center px-4`}>
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 ${colors.text} hover:opacity-80 font-semibold transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            {t('common.back')}
          </button>
          <LanguageSwitcher />
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.button} rounded-2xl mb-4 shadow-lg`}>
              <span className="text-2xl">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('auth.verifyOtp')}</h2>
            <p className="text-gray-600">Enter the 6-digit code sent to</p>
            <p className="font-bold text-gray-900 mt-1">{phone}</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">Verification Code</label>
              <input
                type="text"
                placeholder={t('auth.otpPlaceholder')}
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6).replace(/\D/g, ""))}
                maxLength={6}
                className="w-full px-4 py-5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0A66C2] focus:ring-4 focus:ring-blue-100 transition-all text-4xl tracking-[1em] text-center font-bold"
              />
            </div>

            <button
              onClick={handleOtpSubmit}
              disabled={otp.length !== 6 || isLoading}
              className={`w-full py-4 ${colors.button} text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]`}
            >
              {isLoading ? t('common.loading') : t('auth.verifyOtp')}
            </button>

            <p className="text-center text-gray-600 text-sm">
              Didn't receive the code?{" "}
              <button className={`${colors.text} hover:opacity-80 font-bold transition-colors`}>
                {t('auth.resendOtp')}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
