"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Edit2, Trash2, Star } from "lucide-react"

interface Opportunity {
  id: string
  title: string
  institution: string
  type: string
  deadline: string
  featured: boolean
}

export default function ManageOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    try {
      const response = await fetch("/api/opportunities")
      const data = await response.json()
      if (data.success) {
        setOpportunities(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch opportunities:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this opportunity?")) return

    try {
      const response = await fetch(`/api/opportunities/${id}`, {
        method: "DELETE",
      })
      const data = await response.json()
      if (data.success) {
        setOpportunities(opportunities.filter((o) => o.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete opportunity:", error)
    }
  }

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      const response = await fetch(`/api/opportunities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !featured }),
      })
      const data = await response.json()
      if (data.success) {
        setOpportunities(opportunities.map((o) => (o.id === id ? { ...o, featured: !featured } : o)))
      }
    } catch (error) {
      console.error("Failed to update opportunity:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-foreground">Manage Opportunities</h1>
            <Link
              href="/admin/opportunities/new"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Add New
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-muted rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : opportunities.length > 0 ? (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Institution</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Deadline</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {opportunities.map((opp) => (
                    <tr key={opp.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{opp.title}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{opp.institution}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                          {opp.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(opp.deadline).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleFeatured(opp.id, opp.featured)}
                            className={`p-2 rounded-lg transition-colors ${
                              opp.featured
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                            title={opp.featured ? "Remove from featured" : "Add to featured"}
                          >
                            <Star size={18} />
                          </button>
                          <Link
                            href={`/admin/opportunities/${opp.id}/edit`}
                            className="p-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(opp.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No opportunities yet</p>
              <Link
                href="/admin/opportunities/new"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Create First Opportunity
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
