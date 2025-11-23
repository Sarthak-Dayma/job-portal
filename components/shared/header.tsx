"use client"

import { LogOut, Bell, MessageCircle } from 'lucide-react'
import { useState } from "react"
import LanguageSwitcher from './language-switcher'
import { useLanguage } from '@/lib/i18n/language-context'
import NotificationsDropdown from './notifications-dropdown'
import MessagesList from '../messaging/messages-list'

interface HeaderProps {
  title: string
  subtitle?: string
  onLogout: () => void
  userType: "worker" | "employer" | "admin"
  notificationCount?: number
  messageCount?: number
  userState?: any
}

export default function Header({ 
  title, 
  subtitle, 
  onLogout, 
  userType,
  notificationCount = 0,
  messageCount = 0,
  userState
}: HeaderProps) {
  const { t } = useLanguage()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMessages, setShowMessages] = useState(false)

  const colorClasses = {
    worker: "bg-gradient-to-r from-[#0A66C2] via-[#0A66C2] to-[#004182]",
    employer: "bg-gradient-to-r from-[#FF6B35] via-[#FF6B35] to-[#E85D2C]",
    admin: "bg-gradient-to-r from-[#10B981] via-[#10B981] to-[#059669]",
  }

  return (
    <div className={`${colorClasses[userType]} text-white sticky top-0 z-50 shadow-lg border-b-4 border-white/10`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-bold text-xl" style={{ color: userType === 'worker' ? '#0A66C2' : userType === 'employer' ? '#FF6B35' : '#10B981' }}>
                श्र
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="text-xs sm:text-sm opacity-90 font-medium">{subtitle}</p>}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications)
                  setShowMessages(false)
                }}
                className="relative p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-50">
                    <NotificationsDropdown userState={userState} />
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button 
                onClick={() => {
                  setShowMessages(!showMessages)
                  setShowNotifications(false)
                }}
                className="relative p-2 hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                {messageCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {messageCount > 9 ? '9+' : messageCount}
                  </span>
                )}
              </button>
              {showMessages && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMessages(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 z-50 w-96 h-[32rem] bg-card rounded-lg shadow-2xl border border-border overflow-hidden">
                    <MessagesList userState={userState} />
                  </div>
                </>
              )}
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 font-medium backdrop-blur-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t('common.logout')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
