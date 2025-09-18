"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ChatInterface = ({ chat }) => {
  const [messages, setMessages] = React.useState([
    { id: 1, text: "Hello!", sender: "them" },
    { id: 2, text: "Hi, how are you?", sender: "me" },
  ])
  const [newMessage, setNewMessage] = React.useState("")

  const handleSend = () => {
    if (!newMessage.trim()) return
    setMessages([
      ...messages,
      { id: Date.now(), text: newMessage, sender: "me" },
    ])
    setNewMessage("")
  }

  return (
    <div className="flex flex-col h-full border-l">
      {/* Chat Header */}
      <div className="flex items-center gap-3 border-b p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={chat.avatar} alt={chat.name} />
          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-medium">{chat.name}</div>
          <div
            className={`text-xs ${
              chat.online ? "text-green-500" : "text-gray-400"
            }`}
          >
            {chat.online ? "Online" : "Offline"}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[30%] rounded-lg px-3 py-2 ${
              msg.sender === "me"
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-gray-200 text-gray-900"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="border-t p-4 flex gap-2">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  )
}

export default ChatInterface
