"use client"

import { useEffect, useState } from "react"

interface Stat {
  id: number
  metric: string
  value: string
  description: string
}

export function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats")
        const data = await response.json()
        console.log("Stats API response:", data)
        if (data.success) {
          console.log("Setting stats:", data.data)
          setStats(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.id || index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{stat.metric}</h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
