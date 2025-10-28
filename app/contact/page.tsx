import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Have questions about opportunities or need assistance? We're here to help. Reach out to our team and we'll
              respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-card border-y border-border py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">How do I apply for opportunities?</h3>
                <p className="text-muted-foreground">
                  Browse our opportunities page, select the one that interests you, and click "Apply Now" to be
                  redirected to the official application portal.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Are there any application fees?</h3>
                <p className="text-muted-foreground">
                  No, using HOC Cell is completely free. Some opportunities may have their own application fees, but our
                  platform charges nothing.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">How often are opportunities updated?</h3>
                <p className="text-muted-foreground">
                  We update our opportunities database daily with new scholarships, admissions, and programs from
                  institutions worldwide.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Can I get personalized recommendations?</h3>
                <p className="text-muted-foreground">
                  Contact our support team and we'll help you find opportunities that match your profile and goals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
