"use client"

import { TeacherHeader } from "@/components/teacher-header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Opportunity {
  id: number
  title: string
  institution: string
  type: string
  description: string
  deadline: string
  amount?: string
  featured: boolean
  created_by: number
}

export default function TeacherOpportunitiesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchOpportunities = async () => {
      if (!user) return
      
      try {
        const response = await fetch('/api/opportunities')
        const result = await response.json()
        if (result.success) {
          setOpportunities(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch opportunities:', error)
      } finally {
        setDataLoading(false)
      }
    }

    if (user) {
      fetchOpportunities()
    }
  }, [user])

  const deleteOpportunity = async (id: number) => {
    if (!confirm('Are you sure you want to delete this opportunity?')) return
    
    try {
      const response = await fetch(`/api/opportunities/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setOpportunities(ops => ops.filter(op => op.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete opportunity:', error)
    }
  }

  if (loading || dataLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "teacher") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Manage Opportunities</h1>
            <p className="text-muted-foreground">Create and manage scholarship and program opportunities</p>
          </div>
          <Link
            href="/teacher/opportunities/new"
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
            Add Opportunity
          </Link>
        </div>

        {opportunities.length > 0 ? (
          <div className="space-y-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{opp.title}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        {opp.type}
                      </span>
                      {opp.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{opp.institution}</p>
                    <p className="text-sm text-foreground mb-2">{opp.description}</p>
                    <p className="text-sm text-muted-foreground">Deadline: {new Date(opp.deadline).toLocaleDateString()}</p>
                    {opp.amount && <p className="text-sm font-medium text-primary">{opp.amount}</p>}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => router.push(`/teacher/opportunities/edit/${opp.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteOpportunity(opp.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground mb-4">You haven't posted any opportunities yet</p>
            <Link
              href="/teacher/opportunities/new"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Create Your First Opportunity
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
