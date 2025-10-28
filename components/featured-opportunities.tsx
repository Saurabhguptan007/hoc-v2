"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Opportunity {
  id: string
  title: string
  institution: string
  type: string
  description: string
  deadline: string
  amount?: string
  featured: boolean
}

export function FeaturedOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch("/api/opportunities?featured=true")
        const data = await response.json()
        if (data.success) {
          setOpportunities(data.data.slice(0, 3))
        }
      } catch (error) {
        console.error("Failed to fetch opportunities:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [])

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Featured Opportunities</h2>
            <p className="text-muted-foreground">Handpicked opportunities for you</p>
          </div>
          <Link
            href="/opportunities"
            className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
          >
            View All
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {opportunities.map((opp) => (
            <Link key={opp.id} href={`/opportunities/${opp.id}`}>
              <div className="h-full bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold mb-2">
                      {opp.type}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">{opp.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{opp.institution}</p>
                <p className="text-sm text-foreground mb-4 line-clamp-2">{opp.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Deadline: {new Date(opp.deadline).toLocaleDateString()}
                  </span>
                  {opp.amount && <span className="text-sm font-semibold text-primary">{opp.amount}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
