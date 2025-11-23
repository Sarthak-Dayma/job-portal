"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Paperclip, X, ImageIcon, Phone, Video, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
  read: boolean
  attachments?: { type: string; url: string; name: string }[]
}

interface ChatWindowProps {
  conversationId: string
  recipientName: string
  recipientAvatar?: string
  currentUserId: string
  onClose: () => void
}

export default function ChatWindow({
  conversationId,
  recipientName,
  recipientAvatar,
  currentUserId,
  onClose,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock messages - replace with real API
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: "1",
        senderId: "other",
        text: "Hi! I saw your application for the construction helper role.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
      },
      {
        id: "2",
        senderId: currentUserId,
        text: "Yes! I'm very interested in this position.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5 * 60 * 1000),
        read: true,
      },
      {
        id: "3",
        senderId: "other",
        text: "Great! Can you start from Monday?",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: true,
      },
    ]
    setMessages(mockMessages)
  }, [conversationId, currentUserId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date(),
      read: false,
    }

    setMessages(prev => [...prev, message])
    setNewMessage("")

    // Mock response after 2 seconds
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            senderId: "other",
            text: "Sure, that sounds good!",
            timestamp: new Date(),
            read: false,
          },
        ])
      }, 1500)
    }, 2000)
  }

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="fixed bottom-0 right-4 z-50 w-96 rounded-t-lg border border-border bg-card shadow-2xl flex flex-col" style={{ height: "32rem" }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3 bg-card rounded-t-lg">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={recipientAvatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {recipientName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">
              {recipientName}
            </h3>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs rounded-2xl px-4 py-2 ${
                message.senderId === currentUserId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.senderId === currentUserId
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground/70"
                }`}
              >
                {formatTimestamp(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 h-9"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            size="icon"
            className="h-9 w-9 flex-shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
