"use client"

import { StudentHeader } from "@/components/student-header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function StudentProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [school, setSchool] = useState("")
  const [grade, setGrade] = useState("")
  const [interests, setInterests] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleSave = () => {
    alert("Profile updated successfully!")
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "student") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <StudentHeader />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Complete your profile to get better opportunity matches</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                value={user.name}
                disabled
                className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 border border-border rounded-lg bg-muted text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">School/Institution</label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Your school name"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Grade/Level</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              >
                <option value="">Select your grade</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
                <option value="undergrad">Undergraduate</option>
                <option value="postgrad">Postgraduate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Areas of Interest</label>
              <textarea
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., Engineering, Medicine, Business, Arts..."
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Save Profile
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
