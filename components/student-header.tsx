"use client"

import Link from "next/link"
import { useAuth } from "./auth-context"
import { LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

export function StudentHeader() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/student/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">HC</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">HOC Cell</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/student/dashboard" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/student/opportunities" className="text-foreground hover:text-primary transition-colors">
              Find Opportunities
            </Link>
            <Link href="/student/applications" className="text-foreground hover:text-primary transition-colors">
              My Applications
            </Link>
            <div className="flex items-center gap-4 pl-4 border-l border-border">
              <span className="text-sm text-muted-foreground">{user?.name}</span>
              <button onClick={handleLogout} className="p-2 hover:bg-muted rounded-lg transition-colors" title="Logout">
                <LogOut size={20} className="text-foreground" />
              </button>
            </div>
          </div>

          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-border pt-4">
            <Link
              href="/student/dashboard"
              className="block text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/student/opportunities"
              className="block text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Find Opportunities
            </Link>
            <Link
              href="/student/applications"
              className="block text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              My Applications
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}
