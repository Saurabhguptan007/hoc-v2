"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { BarChart3, Users, FileText, TrendingUp } from "lucide-react"

interface DashboardStats {
  totalOpportunities: number
  totalMessages: number
  featuredCount: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOpportunities: 0,
    totalMessages: 0,
    featuredCount: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [oppResponse, statsResponse] = await Promise.all([fetch("/api/opportunities"), fetch("/api/stats")])

        const oppData = await oppResponse.json()
        const statsData = await statsResponse.json()

        if (oppData.success && statsData.success) {
          const opportunities = oppData.data
          setStats({
            totalOpportunities: opportunities.length,
            totalMessages: 0,
            featuredCount: opportunities.filter((o: any) => o.featured).length,
          })
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-foreground mb-8">Dashboard</h1>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Opportunities</p>
                    <p className="text-3xl font-bold text-foreground">{stats.totalOpportunities}</p>
                  </div>
                  <FileText className="text-primary" size={32} />
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Featured</p>
                    <p className="text-3xl font-bold text-foreground">{stats.featuredCount}</p>
                  </div>
                  <TrendingUp className="text-accent" size={32} />
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contact Messages</p>
                    <p className="text-3xl font-bold text-foreground">{stats.totalMessages}</p>
                  </div>
                  <Users className="text-primary" size={32} />
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active</p>
                    <p className="text-3xl font-bold text-foreground">100%</p>
                  </div>
                  <BarChart3 className="text-accent" size={32} />
                </div>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/admin/opportunities/new"
                className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-foreground font-semibold"
              >
                Add New Opportunity
              </a>
              <a
                href="/admin/opportunities"
                className="p-4 border border-border rounded-lg hover:bg-muted transition-colors text-foreground font-semibold"
              >
                Manage Opportunities
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
