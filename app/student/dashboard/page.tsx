"use client"

import { StudentHeader } from "@/components/student-header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, Search, Award, TrendingUp } from "lucide-react"

export default function StudentDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [opportunities, setOpportunities] = useState([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchOpportunities = async () => {
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

    fetchOpportunities()
  }, [])

  if (loading) {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground">Explore opportunities and track your applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Active Applications</h3>
              <BookOpen className="text-primary" size={24} />
            </div>
            <p className="text-3xl font-bold text-foreground">0</p>
            <p className="text-xs text-muted-foreground mt-2">Applications in progress</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Opportunities</h3>
              <Search className="text-primary" size={24} />
            </div>
            <p className="text-3xl font-bold text-foreground">{opportunities.length}</p>
            <p className="text-xs text-muted-foreground mt-2">Available to explore</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Scholarship Status</h3>
              <Award className="text-primary" size={24} />
            </div>
            <p className="text-3xl font-bold text-foreground">Pending</p>
            <p className="text-xs text-muted-foreground mt-2">No active scholarships</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Profile Strength</h3>
              <TrendingUp className="text-primary" size={24} />
            </div>
            <p className="text-3xl font-bold text-foreground">25%</p>
            <p className="text-xs text-muted-foreground mt-2">Complete your profile</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/student/opportunities"
                  className="block p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <h3 className="font-medium text-foreground">Search Opportunities</h3>
                  <p className="text-sm text-muted-foreground">Browse and apply for scholarships and programs</p>
                </Link>
                <Link
                  href="/student/applications"
                  className="block p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <h3 className="font-medium text-foreground">View My Applications</h3>
                  <p className="text-sm text-muted-foreground">Track the status of your applications</p>
                </Link>
                <Link
                  href="/student/profile"
                  className="block p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <h3 className="font-medium text-foreground">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground">Add your details to improve matching</p>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Featured Opportunities</h2>
            <div className="space-y-3">
              <div className="p-3 border border-border rounded-lg">
                <h3 className="font-medium text-foreground text-sm">Global Excellence Scholarship</h3>
                <p className="text-xs text-muted-foreground mt-1">Oxford University</p>
                <p className="text-xs text-primary font-medium mt-2">Deadline: Mar 31, 2025</p>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <h3 className="font-medium text-foreground text-sm">STEM Excellence Program</h3>
                <p className="text-xs text-muted-foreground mt-1">MIT</p>
                <p className="text-xs text-primary font-medium mt-2">Deadline: Apr 15, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
