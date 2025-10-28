import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SuccessStoryCard } from "@/components/success-story-card"

const successStories = [
  {
    name: "Sarah Chen",
    university: "Harvard University",
    scholarship: "Full Tuition + Living Expenses",
    story:
      "Sarah's journey from a small town to Harvard was made possible through the Global Excellence Scholarship. She's now studying Computer Science and has already published two research papers.",
  },
  {
    name: "Marcus Johnson",
    university: "MIT",
    scholarship: "$75,000 STEM Excellence Award",
    story:
      "Marcus participated in our STEM program and was accepted to MIT with a substantial scholarship. He's passionate about renewable energy and is working on groundbreaking research.",
  },
  {
    name: "Amara Okafor",
    university: "Oxford University",
    scholarship: "Rhodes Scholarship",
    story:
      "Amara's dedication to community service and academics earned her the prestigious Rhodes Scholarship. She's studying Philosophy, Politics, and Economics at Oxford.",
  },
  {
    name: "James Rodriguez",
    university: "Stanford University",
    scholarship: "Merit-Based Full Scholarship",
    story:
      "James was accepted to Stanford with a full merit-based scholarship. He's now leading a startup focused on educational technology for underserved communities.",
  },
  {
    name: "Priya Patel",
    university: "Cambridge University",
    scholarship: "Cambridge International Scholarship",
    story:
      "Priya's excellence in mathematics and physics led to her acceptance at Cambridge with full funding. She's conducting research in quantum computing.",
  },
  {
    name: "David Kim",
    university: "Yale University",
    scholarship: "$100,000 Annual Scholarship",
    story:
      "David's leadership in his community and academic achievements earned him a substantial scholarship to Yale. He's studying Business and Economics.",
  },
]

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Success Stories</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Meet the students who have achieved their dreams through our platform. Their stories inspire us to help
              more students reach their goals.
            </p>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <SuccessStoryCard key={index} {...story} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-card border-y border-border py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Your Success Story Starts Here</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students who have successfully secured scholarships and admissions to top universities.
            </p>
            <a
              href="/opportunities"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Explore Opportunities
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
