"use client"

import { StudentHeader } from "@/components/student-header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface Application {
  id: number
  student_id: number
  opportunity_id: number
  status: "pending" | "accepted" | "rejected" | "withdrawn"
  applied_at: string
  title: string
  institution: string
  type: string
  deadline: string
  amount?: string
}

export default function StudentApplicationsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return
      
      try {
        const response = await fetch(`/api/applications?studentId=${user.id}`)
        const result = await response.json()
        if (result.success) {
          setApplications(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch applications:', error)
      } finally {
        setDataLoading(false)
      }
    }

    if (user) {
      fetchApplications()
    }
  }, [user])

  if (loading || dataLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "student") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <StudentHeader />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Applications</h1>
          <p className="text-muted-foreground">Track the status of your scholarship and admission applications</p>
        </div>

        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{app.title}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        {app.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{app.institution}</p>
                    <p className="text-sm text-muted-foreground">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
                    {app.amount && <p className="text-sm font-medium text-foreground mt-1">{app.amount}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {app.status === 'pending' && <Clock className="text-yellow-500" size={20} />}
                    {app.status === 'accepted' && <CheckCircle className="text-green-500" size={20} />}
                    {app.status === 'rejected' && <XCircle className="text-red-500" size={20} />}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground mb-4">You haven't applied to any opportunities yet</p>
            <a
              href="/student/opportunities"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Browse Opportunities
            </a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
