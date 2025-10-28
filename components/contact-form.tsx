"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(data.error || "Failed to send message")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Contact Information */}
      <div className="lg:col-span-1 space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Mail className="text-primary" size={24} />
            <h3 className="font-semibold text-foreground">Email</h3>
          </div>
          <p className="text-muted-foreground">info@hoccell.com</p>
          <p className="text-muted-foreground">support@hoccell.com</p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <Phone className="text-primary" size={24} />
            <h3 className="font-semibold text-foreground">Phone</h3>
          </div>
          <p className="text-muted-foreground">+1 (555) 123-4567</p>
          <p className="text-muted-foreground">+1 (555) 987-6543</p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="text-primary" size={24} />
            <h3 className="font-semibold text-foreground">Address</h3>
          </div>
          <p className="text-muted-foreground">123 Education Street</p>
          <p className="text-muted-foreground">New York, NY 10001</p>
          <p className="text-muted-foreground">United States</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitted && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
              placeholder="How can we help?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground resize-none"
              placeholder="Tell us more about your inquiry..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  )
}
