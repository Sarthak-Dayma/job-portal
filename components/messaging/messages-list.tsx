"use client"

import { useState } from "react"
import { Search, MessageSquare } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ChatWindow from "./chat-window"

interface Conversation {
  id: string
  recipientId: string
  recipientName: string
  recipientAvatar?: string
  lastMessage: string
  timestamp: Date
  unread: number
}

interface MessagesListProps {
  userState: any
}

export default function MessagesList({ userState }: MessagesListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      recipientId: "emp1",
      recipientName: "ABC Construction Co.",
      lastMessage: "Great! Can you start from Monday?",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      unread: 2,
    },
    {
      id: "2",
      recipientId: "emp2",
      recipientName: "XYZ Plumbing Services",
      lastMessage: "We reviewed your application",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unread: 0,
    },
    {
      id: "3",
      recipientId: "wkr1",
      recipientName: "Rajesh Kumar",
      lastMessage: "Thank you for your interest",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unread: 0,
    },
  ])

  const filteredConversations = conversations.filter(conv =>
    conv.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    return `${diffDays}d`
  }

  const activeConv = conversations.find(c => c.id === activeConversation)

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No messages yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Start a conversation with employers or workers
            </p>
          </div>
        ) : (
          filteredConversations.map(conversation => (
            <div
              key={conversation.id}
              onClick={() => setActiveConversation(conversation.id)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 cursor-pointer border-b border-border transition-colors"
            >
              <Avatar className="h-12 w-12 flex-shrink-0">
                <AvatarImage src={conversation.recipientAvatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {conversation.recipientName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground truncate">
                    {conversation.recipientName}
                  </h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatTimestamp(conversation.timestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="h-5 w-5 rounded-full bg-primary text-xs font-bold text-primary-foreground flex items-center justify-center flex-shrink-0">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {activeConv && (
        <ChatWindow
          conversationId={activeConv.id}
          recipientName={activeConv.recipientName}
          recipientAvatar={activeConv.recipientAvatar}
          currentUserId={userState.userId}
          onClose={() => setActiveConversation(null)}
        />
      )}
    </div>
  )
}
