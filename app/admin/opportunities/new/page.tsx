"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { ArrowLeft } from "lucide-react"

export default function NewOpportunityPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    institution: "",
    type: "scholarship" as const,
    description: "",
    deadline: "",
    amount: "",
    eligibility: "",
    applicationUrl: "",
    featured: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        router.push("/admin/opportunities")
      }
    } catch (error) {
      console.error("Failed to create opportunity:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <Link
            href="/admin/opportunities"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Opportunities
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">Add New Opportunity</h1>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 max-w-2xl">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="Opportunity title"
                />
              </div>

              <div>
                <label htmlFor="institution" className="block text-sm font-semibold text-foreground mb-2">
                  Institution
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="University or organization name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-foreground mb-2">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  >
                    <option value="scholarship">Scholarship</option>
                    <option value="admission">Admission</option>
                    <option value="program">Program</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-semibold text-foreground mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-semibold text-foreground mb-2">
                  Award Amount (Optional)
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="e.g., $50,000"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                  placeholder="Describe the opportunity"
                />
              </div>

              <div>
                <label htmlFor="eligibility" className="block text-sm font-semibold text-foreground mb-2">
                  Eligibility Requirements
                </label>
                <textarea
                  id="eligibility"
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none"
                  placeholder="List eligibility requirements"
                />
              </div>

              <div>
                <label htmlFor="applicationUrl" className="block text-sm font-semibold text-foreground mb-2">
                  Application URL
                </label>
                <input
                  type="url"
                  id="applicationUrl"
                  name="applicationUrl"
                  value={formData.applicationUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                  placeholder="https://example.com/apply"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="featured" className="text-sm font-semibold text-foreground">
                  Feature this opportunity on homepage
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Opportunity"}
                </button>
                <Link
                  href="/admin/opportunities"
                  className="flex-1 px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
