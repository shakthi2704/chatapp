"use client"

import * as React from "react"
import { Inbox, GalleryVerticalEnd } from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"

// 🔹 Sample chat data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Chats",
      url: "#",
      icon: Inbox,
      isActive: true,
    },
  ],
  chats: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      date: "09:34 AM",
      teaser: "Hey, are we still good for today?",
      avatar: "/avatars/william.jpg",
      online: true,
    },
    {
      name: "Sarah Johnson",
      email: "sarahj@example.com",
      date: "08:20 AM",
      teaser: "I just sent you the report.",
      avatar: "/avatars/sarah.jpg",
      online: false,
    },
    {
      name: "Michael Brown",
      email: "michaelb@example.com",
      date: "Yesterday",
      teaser: "Let’s catch up tomorrow!",
      avatar: "/avatars/michael.jpg",
      online: true,
    },
  ],
}

// 🔹 Helper to highlight search matches (WhatsApp-style bold + primary color)
function highlightText(text, query) {
  if (!query) return text

  try {
    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={i}
          className="font-semibold text-primary" // bold + accent color
        >
          {part}
        </span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    )
  } catch (err) {
    return text
  }
}

export function AppSidebar({ ...props }) {
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const [chats, setChats] = React.useState(data.chats)
  const [showOnlineOnly, setShowOnlineOnly] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const { setOpen } = useSidebar()

  // 🔹 Filter chats based on search + online toggle
  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.teaser.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesOnline = showOnlineOnly ? chat.online : true

    return matchesSearch && matchesOnline
  })

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* 🔹 Left Icon Sidebar */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a
                  href="#"
                  className="flex items-center gap-2 self-center font-medium"
                >
                  <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                    <GalleryVerticalEnd className="size-4" />
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        setChats(data.chats.sort(() => Math.random() - 0.5))
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* 🔹 Right Sidebar (Chat List) */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem?.title}
            </div>
            <Label className="flex items-center gap-2 text-sm">
              <span>Online only</span>
              <Switch
                checked={showOnlineOnly}
                onCheckedChange={setShowOnlineOnly}
                className="shadow-none"
              />
            </Label>
          </div>
          <SidebarInput
            placeholder="Find chat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {filteredChats.map((chat) => (
                <a
                  href="#"
                  key={chat.email}
                  className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground 
                             flex items-center gap-3 border-b p-4 text-sm leading-tight 
                             last:border-b-0"
                >
                  {/* Avatar + Online Status */}
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-background ${
                        chat.online ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                  </div>

                  {/* Chat info */}
                  <div className="flex-1 overflow-hidden">
                    <div className="flex w-full items-center">
                      <span className="truncate font-medium">
                        {highlightText(chat.name, searchTerm)}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {chat.date}
                      </span>
                    </div>
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {highlightText(chat.teaser, searchTerm)}
                    </span>
                  </div>
                </a>
              ))}

              {/* 🔹 No results */}
              {filteredChats.length === 0 && (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No chats found
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
