"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Plus, List } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen">
      <nav className="p-6 space-y-2">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            isActive("/admin") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
          }`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link
          href="/admin/opportunities"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            isActive("/admin/opportunities") ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
          }`}
        >
          <List size={20} />
          Manage Opportunities
        </Link>
        <Link
          href="/admin/opportunities/new"
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            isActive("/admin/opportunities/new")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          }`}
        >
          <Plus size={20} />
          Add Opportunity
        </Link>
      </nav>
    </aside>
  )
}
