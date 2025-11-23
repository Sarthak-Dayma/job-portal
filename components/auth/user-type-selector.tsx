"use client"

import { useLanguage } from '@/lib/i18n/language-context'
import LanguageSwitcher from '../shared/language-switcher'

export default function UserTypeSelector({ onSelect }: { onSelect: (type: "worker" | "employer" | "admin") => void }) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-2xl mb-6 shadow-lg">
            <span className="text-3xl font-bold text-white">श्र</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">{t('auth.welcome')}</h1>
          <p className="text-lg text-gray-600 font-medium">{t('auth.tagline')}</p>
        </div>

        <div className="bg-white rounded-2xl p-2 shadow-lg border-2 border-gray-100 mb-6">
          <h2 className="text-lg font-bold text-gray-900 text-center mb-4 px-4 pt-2">{t('auth.selectUserType')}</h2>
          
          <div className="space-y-3">
            <button
              onClick={() => onSelect("worker")}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 hover:border-[#0A66C2] p-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#0A66C2] rounded-xl flex items-center justify-center text-2xl shadow-md">
                  👷
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-lg text-gray-900 mb-0.5">{t('auth.worker')}</p>
                  <p className="text-sm text-gray-600">{t('auth.workerDesc')}</p>
                </div>
                <span className="text-2xl text-[#0A66C2] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>

            <button
              onClick={() => onSelect("employer")}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 hover:border-[#FF6B35] p-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#FF6B35] rounded-xl flex items-center justify-center text-2xl shadow-md">
                  💼
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-lg text-gray-900 mb-0.5">{t('auth.employer')}</p>
                  <p className="text-sm text-gray-600">{t('auth.employerDesc')}</p>
                </div>
                <span className="text-2xl text-[#FF6B35] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>

            <button
              onClick={() => onSelect("admin")}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 hover:border-[#10B981] p-5 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#10B981] rounded-xl flex items-center justify-center text-2xl shadow-md">
                  ⚙️
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-lg text-gray-900 mb-0.5">Administrator</p>
                  <p className="text-sm text-gray-600">Platform management access</p>
                </div>
                <span className="text-2xl text-[#10B981] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">🌍 Multilingual Support • English & हिंदी</p>
        </div>
      </div>
    </div>
  )
}
