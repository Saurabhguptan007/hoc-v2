"use client"

import { TeacherHeader } from "@/components/teacher-header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Mail, Phone, User, Calendar, CheckCircle, XCircle } from "lucide-react"

interface Application {
  id: number
  student_id: number
  opportunity_id: number
  status: string
  applied_at: string
  applicant_name: string
  applicant_email: string
  applicant_phone: string
  application_reason: string
  title: string
  institution: string
}

export default function TeacherEnquiriesPage() {
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
      try {
        const response = await fetch('/api/applications')
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

    fetchApplications()
  }, [])

  const updateApplicationStatus = async (applicationId: number, status: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (response.ok) {
        setApplications(apps => 
          apps.map(app => 
            app.id === applicationId ? { ...app, status } : app
          )
        )
      }
    } catch (error) {
      console.error('Failed to update application:', error)
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Student Enquiries</h1>
          <p className="text-muted-foreground">Track students who need guidance and support</p>
        </div>

        {applications.length > 0 ? (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{app.applicant_name}</h3>
                    <p className="text-muted-foreground">{app.title}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-muted-foreground" />
                    <span className="text-sm">{app.applicant_email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-muted-foreground" />
                    <span className="text-sm">{app.applicant_phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span className="text-sm">{new Date(app.applied_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-foreground mb-2">Application Reason:</h4>
                  <p className="text-sm text-muted-foreground">{app.application_reason}</p>
                </div>
                
                {app.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateApplicationStatus(app.id, 'accepted')}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle size={16} />
                      Accept
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(app.id, 'rejected')}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground mb-4">No applications yet</p>
            <p className="text-sm text-muted-foreground">Student applications will appear here</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
