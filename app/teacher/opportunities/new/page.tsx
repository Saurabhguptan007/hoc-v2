"use client"

import { TeacherHeader } from "@/components/teacher-header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type React from "react"

export default function NewOpportunityPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [institution, setInstitution] = useState("")
  const [type, setType] = useState<"scholarship" | "admission" | "program">("scholarship")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")
  const [amount, setAmount] = useState("")
  const [eligibility, setEligibility] = useState("")
  const [applicationUrl, setApplicationUrl] = useState("")
  const [featured, setFeatured] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          institution,
          type,
          description,
          deadline,
          amount,
          eligibility,
          application_url: applicationUrl,
          featured,
          created_by: parseInt(user.id),
        }),
      })

      if (response.ok) {
        alert("Opportunity created successfully!")
        router.push("/teacher/opportunities")
      } else {
        alert("Failed to create opportunity")
      }
    } catch (error) {
      alert("Error creating opportunity")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "teacher") {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TeacherHeader />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create New Opportunity</h1>
          <p className="text-muted-foreground">Add a new scholarship, admission, or program opportunity</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Opportunity Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g., Global Excellence Scholarship"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Institution Name</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
                placeholder="e.g., Oxford University"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "scholarship" | "admission" | "program")}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              >
                <option value="scholarship">Scholarship</option>
                <option value="admission">Admission</option>
                <option value="program">Program</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Describe the opportunity..."
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Amount (Optional)</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., $50,000+"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Eligibility Requirements</label>
              <textarea
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                required
                placeholder="e.g., GPA 3.8+, IELTS 7.5+"
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Application URL</label>
              <input
                type="url"
                value={applicationUrl}
                onChange={(e) => setApplicationUrl(e.target.value)}
                required
                placeholder="https://example.com/apply"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-foreground">Feature this opportunity on homepage</span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Opportunity"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
