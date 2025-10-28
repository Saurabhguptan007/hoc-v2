"use client"

import { TeacherHeader } from "@/components/teacher-header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Users, Plus, HelpCircle, TrendingUp } from "lucide-react"

export default function TeacherDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [applications, setApplications] = useState([])
  const [opportunities, setOpportunities] = useState([])
  const [totalOpportunities, setTotalOpportunities] = useState([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      
      try {
        const [appsResponse, oppsResponse, totalOppsResponse] = await Promise.all([
          fetch('/api/applications'),
          fetch(`/api/opportunities?teacherId=${user.id}`),
          fetch('/api/opportunities')
        ])
        
        const appsResult = await appsResponse.json()
        const oppsResult = await oppsResponse.json()
        const totalOppsResult = await totalOppsResponse.json()
        
        if (appsResult.success) {
          setApplications(appsResult.data)
        }
        if (oppsResult.success) {
          setOpportunities(oppsResult.data)
        }
        if (totalOppsResult.success) {
          setTotalOpportunities(totalOppsResult.data)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setDataLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user])

  if (loading) {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground">Manage opportunities and track student enquiries</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Student Enquiries</h3>
              <Users className="text-primary" size={24} />
            </div>
            <p className="text-3xl font-bold text-foreground">{applications.length}</p>
            <p className="text-xs text-muted-foreground mt-2">Students seeking guidance</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Opportunities Posted</h3>
              <Plus className="text-primary" size={24} />
            </div>
            <p className="text-3xl font-bold text-foreground">{opportunities.length}</p>
            <p className="text-xs text-muted-foreground mt-2">Opportunities you've added</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Total Opportunities</h3>
              <HelpCircle className="text-primary" size={24} />
            </div>
            <p className="text-3xl font-bold text-foreground">{totalOpportunities.length}</p>
            <p className="text-xs text-muted-foreground mt-2">Available in the system</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Success Rate</h3>
              <TrendingUp className="text-primary" size={24} />
            </div>
            <p className="text-3xl font-bold text-foreground">92%</p>
            <p className="text-xs text-muted-foreground mt-2">Student placement rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/teacher/opportunities/new"
                  className="block p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <h3 className="font-medium text-foreground">Add New Opportunity</h3>
                  <p className="text-sm text-muted-foreground">Post a new scholarship or program</p>
                </Link>
                <Link
                  href="/teacher/opportunities"
                  className="block p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <h3 className="font-medium text-foreground">Manage Opportunities</h3>
                  <p className="text-sm text-muted-foreground">Edit or delete your posted opportunities</p>
                </Link>
                <Link
                  href="/teacher/enquiries"
                  className="block p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <h3 className="font-medium text-foreground">View Student Enquiries</h3>
                  <p className="text-sm text-muted-foreground">See which students need guidance</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
            <div className="space-y-3 text-sm">
              {applications.slice(0, 3).map((app: any) => (
                <div key={app.id} className="p-3 border border-border rounded-lg">
                  <p className="font-medium text-foreground">{app.applicant_name || app.student_name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{app.applicant_email}</p>
                  <p className="text-xs text-muted-foreground">{app.applicant_phone}</p>
                  <p className="text-xs text-muted-foreground mt-1">Applied to: {app.title}</p>
                  <p className="text-xs text-primary font-medium mt-1">{app.status}</p>
                </div>
              ))}
              {applications.length === 0 && (
                <div className="p-3 border border-border rounded-lg">
                  <p className="font-medium text-foreground">No applications yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Students will appear here when they apply</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
