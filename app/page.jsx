"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import ChatInterface from "@/components/chatInterface/ChatInterface"
import SearchForm from "@/components/search-form"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// 🔹 Define an initial chat object
const initialChat = {
  name: "William Smith",
  avatar: "/avatars/william.jpg",
  online: true,
}

const Page = () => {
  // Optional: you can make this dynamic later
  const [activeChat, setActiveChat] = React.useState(initialChat)

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "350px",
      }}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4 justify-between">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="ml-auto">
            <SearchForm />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Pass the chat object */}
          <ChatInterface chat={activeChat} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Page
