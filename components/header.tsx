"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useAuth } from "./auth-context"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">HC</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">HOC Cell</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!user ? (
              <>
                <Link href="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/opportunities" className="text-foreground hover:text-primary transition-colors">
                  Opportunities
                </Link>
                <Link href="/success-stories" className="text-foreground hover:text-primary transition-colors">
                  Success Stories
                </Link>
                <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <Link href="/login" className="text-foreground hover:text-primary transition-colors font-medium">
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            ) : user.role === "student" ? (
              <>
                <Link href="/student/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/student/opportunities" className="text-foreground hover:text-primary transition-colors">
                  Find Opportunities
                </Link>
                <Link href="/student/applications" className="text-foreground hover:text-primary transition-colors">
                  My Applications
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <span className="text-sm text-muted-foreground">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/teacher/dashboard" className="text-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link href="/teacher/opportunities" className="text-foreground hover:text-primary transition-colors">
                  Manage Opportunities
                </Link>
                <Link href="/teacher/enquiries" className="text-foreground hover:text-primary transition-colors">
                  Enquiries
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-border">
                  <span className="text-sm text-muted-foreground">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-border pt-4">
            {!user ? (
              <>
                <Link
                  href="/"
                  className="block text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/opportunities"
                  className="block text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Opportunities
                </Link>
                <Link
                  href="/success-stories"
                  className="block text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Success Stories
                </Link>
                <Link
                  href="/contact"
                  className="block text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <div className="flex gap-2 pt-2 border-t border-border">
                  <Link
                    href="/login"
                    className="flex-1 text-center px-4 py-2 text-foreground hover:text-primary transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            ) : user.role === "student" ? (
              <>
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
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/teacher/dashboard"
                  className="block text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/teacher/opportunities"
                  className="block text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Manage Opportunities
                </Link>
                <Link
                  href="/teacher/enquiries"
                  className="block text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Enquiries
                </Link>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}
