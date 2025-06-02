"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  MessageSquare,
  Users,
  Camera,
  Settings,
  Layout,
} from "lucide-react"

const items = [
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageSquare,
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: Camera,
  },
  {
    title: "Brand",
    href: "/dashboard/brand",
    icon: Layout,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2 p-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </Button>
          </Link>
        )
      })}
    </nav>
  )
} 