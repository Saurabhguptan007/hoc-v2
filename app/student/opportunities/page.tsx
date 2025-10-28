"use client"

import { StudentHeader } from "@/components/student-header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Search } from "lucide-react"

interface Opportunity {
  id: number
  title: string
  institution: string
  type: "scholarship" | "admission" | "program"
  description: string
  deadline: string
  amount?: string
  eligibility: string
  application_url: string
  featured: boolean
}

export default function StudentOpportunitiesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | "scholarship" | "admission" | "program">("all")
  const [dataLoading, setDataLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', reason: '' })

  const handleApply = (opportunityId: number) => {
    setSelectedOpportunity(opportunityId)
    setShowModal(true)
  }

  const submitApplication = async () => {
    if (!user || !selectedOpportunity) return
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          studentId: parseInt(user.id), 
          opportunityId: selectedOpportunity,
          ...formData
        })
      })
      
      const result = await response.json()
      if (result.success) {
        alert('Application submitted successfully!')
        setShowModal(false)
        setFormData({ name: '', email: '', phone: '', reason: '' })
      } else {
        alert('Failed to submit application')
      }
    } catch (error) {
      alert('Error submitting application')
    }
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        console.log("[v0] Fetching opportunities...")
        const response = await fetch("/api/opportunities")
        const result = await response.json()
        console.log("[v0] Opportunities fetched:", result)
        if (result.success) {
          setOpportunities(result.data)
          setFilteredOpportunities(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch opportunities:", error)
      } finally {
        setDataLoading(false)
      }
    }

    fetchOpportunities()
  }, [])

  useEffect(() => {
    let filtered = opportunities

    if (searchQuery) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.institution.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((opp) => opp.type === typeFilter)
    }

    setFilteredOpportunities(filtered)
  }, [searchQuery, typeFilter, opportunities])

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Opportunities</h1>
          <p className="text-muted-foreground">Search and apply for scholarships, admissions, and programs</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(["all", "scholarship", "admission", "program"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    typeFilter === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-foreground">{opp.title}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        {opp.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">{opp.institution}</p>
                    <p className="text-foreground mb-4">{opp.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Deadline</p>
                        <p className="font-medium text-foreground">{opp.deadline}</p>
                      </div>
                      {opp.amount && (
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-medium text-foreground">{opp.amount}</p>
                        </div>
                      )}
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Eligibility</p>
                        <p className="font-medium text-foreground">{opp.eligibility}</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleApply(opp.id)}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No opportunities found matching your criteria</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Application Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Why are you applying?</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={submitApplication}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
