"use client"

import { useState, useEffect } from "react"
import { Bell, Check, X, Briefcase, UserCheck, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "job_match" | "application" | "acceptance" | "completion" | "message" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

interface NotificationsDropdownProps {
  userState: any
}

export default function NotificationsDropdown({ userState }: NotificationsDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Mock notifications - replace with real API
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "job_match",
        title: "New Job Match",
        message: "Construction Helper position in Mumbai matches your profile",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
      },
      {
        id: "2",
        type: "application",
        title: "Application Update",
        message: "Your application for Plumber role was viewed",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
      },
      {
        id: "3",
        type: "message",
        title: "New Message",
        message: "ABC Construction sent you a message",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
      },
    ]
    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter(n => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "job_match":
        return <Briefcase className="h-5 w-5 text-primary" />
      case "application":
      case "acceptance":
        return <UserCheck className="h-5 w-5 text-accent" />
      case "completion":
        return <Check className="h-5 w-5 text-accent" />
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />
    }
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <div className="w-96 rounded-lg border border-border bg-card shadow-lg">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-lg font-bold text-card-foreground">
          Notifications
        </h3>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-sm text-primary hover:text-primary"
          >
            Mark all read
          </Button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              No notifications yet
            </p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`border-b border-border px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                !notification.read ? "bg-primary/5" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold text-card-foreground">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="border-t border-border px-4 py-2 text-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-primary hover:text-primary"
          >
            View all notifications
          </Button>
        </div>
      )}
    </div>
  )
}
