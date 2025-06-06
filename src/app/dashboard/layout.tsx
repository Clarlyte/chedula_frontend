"use client";

import React, { useState } from 'react';
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react';

// Note: createServerComponentClient and cookies() can only be used in Server Components.
// We will need to rethink how user session is handled in a client component layout.
// For now, I'll keep the structure but the auth logic here might need adjustment.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This part needs re-evaluation in a client component:
  // const supabase = createServerComponentClient({ cookies })
  // const { data: { session } } = await supabase.auth.getSession()
  // const user = session?.user

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Temporarily hide header for simplicity while focusing on sidebar toggle */}
      {/* {user && <DashboardHeader user={user} />} */}

      {/* Mobile Menu Toggle Button (visible on small screens) */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar - conditionally visible and positioned */}
        <aside className={`fixed top-0 left-0 z-40 h-screen w-64 shrink-0 overflow-y-auto border-r bg-background transition-transform ${isSidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'} md:sticky md:top-14 md:translate-x-0 md:block md:w-[220px] md:h-[calc(100vh-3.5rem)] md:border-r`}>
          {/* Placeholder for sidebar content if DashboardNav needs user/server data */}
          {/* If DashboardNav is purely UI, it can stay here */} 
          <div className="flex h-16 items-center border-b border-gold-500/20 px-6 md:hidden">
             <h2 className="text-lg font-semibold text-gold-400"></h2> {/* Mobile Sidebar Header */}
          </div>
          <DashboardNav />
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <main className={`flex w-full flex-col overflow-hidden bg-background transition-all duration-300 ${isSidebarOpen ? 'md:ml-0' : 'md:ml-0'}`}> {/* Adjust ml as needed for mobile layout shift */}
          {children}
        </main>
      </div>
    </div>
  )
} 