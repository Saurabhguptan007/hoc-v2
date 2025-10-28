import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

async function seed() {
  try {
    console.log("Starting database seed...")

    // Insert success stats
    await sql`
      INSERT INTO success_stats (metric, value, description) VALUES
      ('Students Placed', '5,000+', 'Successful placements in top institutions'),
      ('Scholarship Value', '$250M+', 'Total scholarship value awarded'),
      ('Success Rate', '92%', 'Application success rate'),
      ('Partner Institutions', '500+', 'Top universities worldwide')
      ON CONFLICT DO NOTHING
    `

    // Insert opportunities
    const opportunities = [
      {
        title: "Global Excellence Scholarship",
        institution: "Oxford University",
        type: "scholarship",
        description: "Full tuition scholarship for international students with exceptional academic records.",
        deadline: "2025-03-31",
        amount: "$50,000+",
        eligibility: "GPA 3.8+, IELTS 7.5+",
        application_url: "https://example.com/apply",
        featured: true,
      },
      {
        title: "STEM Excellence Program",
        institution: "MIT",
        type: "program",
        description: "Intensive summer program for high school students interested in STEM fields.",
        deadline: "2025-04-15",
        amount: "Full coverage",
        eligibility: "High school juniors and seniors",
        application_url: "https://example.com/apply",
        featured: true,
      },
      {
        title: "Merit-Based Admission",
        institution: "Stanford University",
        type: "admission",
        description: "Direct admission pathway for students with outstanding academic achievements.",
        deadline: "2025-02-28",
        amount: "Tuition assistance available",
        eligibility: "SAT 1500+, GPA 3.9+",
        application_url: "https://example.com/apply",
        featured: false,
      },
      {
        title: "International Student Scholarship",
        institution: "Cambridge University",
        type: "scholarship",
        description: "Comprehensive scholarship covering tuition and living expenses for international students.",
        deadline: "2025-05-15",
        amount: "$60,000+",
        eligibility: "GPA 3.7+, English proficiency required",
        application_url: "https://example.com/apply",
        featured: true,
      },
      {
        title: "Engineering Excellence Award",
        institution: "Caltech",
        type: "scholarship",
        description: "Prestigious award for students pursuing engineering and applied sciences.",
        deadline: "2025-04-30",
        amount: "$45,000+",
        eligibility: "Strong math and science background, GPA 3.8+",
        application_url: "https://example.com/apply",
        featured: false,
      },
      {
        title: "Business Leadership Program",
        institution: "Harvard Business School",
        type: "program",
        description: "Exclusive summer program for aspiring business leaders and entrepreneurs.",
        deadline: "2025-03-20",
        amount: "Partial scholarship available",
        eligibility: "Demonstrated leadership experience, GPA 3.6+",
        application_url: "https://example.com/apply",
        featured: true,
      },
      {
        title: "Medical Sciences Scholarship",
        institution: "Johns Hopkins University",
        type: "scholarship",
        description: "Full scholarship for students pursuing medicine and health sciences.",
        deadline: "2025-05-01",
        amount: "$70,000+",
        eligibility: "Pre-med requirements, GPA 3.9+, MCAT preparation",
        application_url: "https://example.com/apply",
        featured: false,
      },
      {
        title: "Arts and Humanities Fellowship",
        institution: "Yale University",
        type: "scholarship",
        description: "Fellowship for talented students in arts, literature, and humanities.",
        deadline: "2025-04-10",
        amount: "$40,000+",
        eligibility: "Portfolio required, GPA 3.5+",
        application_url: "https://example.com/apply",
        featured: false,
      },
      {
        title: "Computer Science Bootcamp",
        institution: "UC Berkeley",
        type: "program",
        description: "Intensive bootcamp for aspiring software engineers and computer scientists.",
        deadline: "2025-03-15",
        amount: "Full coverage",
        eligibility: "Basic programming knowledge, problem-solving skills",
        application_url: "https://example.com/apply",
        featured: true,
      },
      {
        title: "Environmental Studies Grant",
        institution: "University of Chicago",
        type: "scholarship",
        description: "Grant for students committed to environmental research and sustainability.",
        deadline: "2025-05-20",
        amount: "$35,000+",
        eligibility: "Environmental science background, GPA 3.6+",
        application_url: "https://example.com/apply",
        featured: false,
      },
    ]

    for (const opp of opportunities) {
      await sql`
        INSERT INTO opportunities (title, institution, type, description, deadline, amount, eligibility, application_url, featured)
        VALUES (${opp.title}, ${opp.institution}, ${opp.type}, ${opp.description}, ${opp.deadline}, ${opp.amount}, ${opp.eligibility}, ${opp.application_url}, ${opp.featured})
        ON CONFLICT DO NOTHING
      `
    }

    console.log("Database seed completed successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seed()
