"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar, MapPin, DollarSign, ExternalLink } from "lucide-react"

interface Opportunity {
  id: string
  title: string
  institution: string
  type: string
  description: string
  deadline: string
  amount?: string
  eligibility: string
  applicationUrl: string
}

export default function OpportunityDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const response = await fetch(`/api/opportunities/${id}`)
        const data = await response.json()
        if (data.success) {
          setOpportunity(data.data)
        }
      } catch (error) {
        console.error("Failed to fetch opportunity:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOpportunity()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-1/4 animate-pulse"></div>
            <div className="h-12 bg-muted rounded w-3/4 animate-pulse"></div>
            <div className="h-64 bg-muted rounded animate-pulse"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Opportunity not found</h1>
          <Link href="/opportunities" className="text-primary hover:text-primary/80 transition-colors">
            Back to Opportunities
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const daysUntilDeadline = Math.ceil(
    (new Date(opportunity.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Back to Opportunities
          </Link>

          {/* Header */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold mb-4">
              {opportunity.type}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{opportunity.title}</h1>
            <p className="text-xl text-muted-foreground flex items-center gap-2">
              <MapPin size={24} />
              {opportunity.institution}
            </p>
          </div>

          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-primary" size={24} />
                <span className="text-sm text-muted-foreground">Application Deadline</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {new Date(opportunity.deadline).toLocaleDateString()}
              </p>
              {daysUntilDeadline > 0 && (
                <p className={`text-sm mt-2 ${daysUntilDeadline <= 30 ? "text-red-600" : "text-green-600"}`}>
                  {daysUntilDeadline} days remaining
                </p>
              )}
            </div>

            {opportunity.amount && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-primary" size={24} />
                  <span className="text-sm text-muted-foreground">Award Amount</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{opportunity.amount}</p>
              </div>
            )}

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-muted-foreground">Application Status</span>
              </div>
              <p className="text-2xl font-bold text-primary">Open</p>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Description */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Opportunity</h2>
                <p className="text-foreground leading-relaxed mb-4">{opportunity.description}</p>
              </section>

              {/* Eligibility */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility Requirements</h2>
                <div className="bg-card border border-border rounded-lg p-6">
                  <p className="text-foreground leading-relaxed">{opportunity.eligibility}</p>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6 sticky top-24">
                <h3 className="text-lg font-bold text-foreground mb-4">Ready to Apply?</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Click the button below to start your application process.
                </p>
                <a
                  href={opportunity.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Apply Now
                  <ExternalLink size={20} />
                </a>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  You will be redirected to the official application portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
