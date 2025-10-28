"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Path to <span className="text-primary">Global Education</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Discover thousands of scholarship opportunities and admission pathways to top universities worldwide. We
              connect ambitious students with their dream institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/opportunities"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Explore Opportunities
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/success-stories"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Read Success Stories
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl"></div>
            <div className="relative bg-card rounded-2xl p-8 border border-border shadow-lg">
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="pt-4 space-y-3">
                  <div className="flex gap-2">
                    <div className="h-3 bg-primary/30 rounded w-1/3"></div>
                    <div className="h-3 bg-accent/30 rounded w-1/3"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-3 bg-primary/20 rounded w-1/2"></div>
                    <div className="h-3 bg-accent/20 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
