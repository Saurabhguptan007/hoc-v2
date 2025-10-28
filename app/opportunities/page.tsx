"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { OpportunityCard } from "@/components/opportunity-card"

interface Opportunity {
  id: string
  title: string
  institution: string
  type: "scholarship" | "admission" | "program"
  description: string
  deadline: string
  amount?: string
}

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("/api/opportunities")
        const data = await response.json()
        if (data.success) {
          setOpportunities(data.data)
          setFilteredOpportunities(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch opportunities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [])

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredOpportunities(opportunities)
      return
    }

    try {
      const response = await fetch(`/api/opportunities?q=${encodeURIComponent(query)}`)
      const data = await response.json()
      if (data.success) {
        setFilteredOpportunities(data.data)
      }
    } catch (error) {
      console.error("Failed to search opportunities:", error)
    }
  }

  const handleTypeFilter = (type: string) => {
    setSelectedType(type)
    if (type === "all") {
      setFilteredOpportunities(opportunities)
    } else {
      setFilteredOpportunities(opportunities.filter((opp) => opp.type === type))
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Explore Opportunities</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse thousands of scholarships, admissions, and programs from top institutions worldwide.
            </p>
            <div className="max-w-2xl">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button
                onClick={() => handleTypeFilter("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedType === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                All Opportunities
              </button>
              <button
                onClick={() => handleTypeFilter("scholarship")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedType === "scholarship"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Scholarships
              </button>
              <button
                onClick={() => handleTypeFilter("admission")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedType === "admission"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Admissions
              </button>
              <button
                onClick={() => handleTypeFilter("program")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedType === "program"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Programs
              </button>
            </div>

            {/* Results */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-muted rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : filteredOpportunities.length > 0 ? (
              <div>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredOpportunities.length} opportunity{filteredOpportunities.length !== 1 ? "ies" : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredOpportunities.map((opp) => (
                    <OpportunityCard key={opp.id} {...opp} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">No opportunities found</p>
                <button
                  onClick={() => {
                    handleSearch("")
                    handleTypeFilter("all")
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
