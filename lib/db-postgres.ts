import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export interface User {
  id: number
  email: string
  password: string
  name: string
  role: "student" | "teacher"
  created_at: string
}

export interface StudentProfile {
  id: number
  user_id: number
  school: string
  grade: string
  interests: string[]
  scholarship_status: "pending" | "accepted" | "rejected" | "none"
  created_at: string
}

export interface TeacherProfile {
  id: number
  user_id: number
  school: string
  subject: string
  student_enquiries: number
  created_at: string
}

export interface Opportunity {
  id: number
  title: string
  institution: string
  type: "scholarship" | "admission" | "program"
  description: string
  deadline: string
  amount?: string
  eligibility: string
  application_url: string
  featured: boolean
  created_by?: number
  created_at: string
}

export interface SuccessStat {
  id: number
  metric: string
  value: string
  description: string
  created_at: string
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export const db = {
  users: {
    create: async (email: string, password: string, name: string, role: "student" | "teacher") => {
      const client = await pool.connect()
      try {
        const existingUser = await client.query('SELECT id FROM users WHERE email = $1', [email])
        if (existingUser.rows.length > 0) return null

        const result = await client.query(
          'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING *',
          [email, password, name, role]
        )

        const newUser = result.rows[0] as User

        if (role === "student") {
          await client.query(
            'INSERT INTO student_profiles (user_id, school, grade, interests, scholarship_status) VALUES ($1, $2, $3, $4, $5)',
            [newUser.id, '', '', '{}', 'none']
          )
        } else {
          await client.query(
            'INSERT INTO teacher_profiles (user_id, school, subject, student_enquiries) VALUES ($1, $2, $3, $4)',
            [newUser.id, '', '', 0]
          )
        }

        return newUser
      } catch (error) {
        console.error("Error creating user:", error)
        return null
      } finally {
        client.release()
      }
    },

    login: async (email: string, password: string) => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'SELECT * FROM users WHERE email = $1 AND password = $2',
          [email, password]
        )
        return result.rows.length > 0 ? (result.rows[0] as User) : null
      } catch (error) {
        console.error("Error logging in:", error)
        return null
      } finally {
        client.release()
      }
    },

    getById: async (id: number) => {
      const client = await pool.connect()
      try {
        const result = await client.query('SELECT * FROM users WHERE id = $1', [id])
        return result.rows.length > 0 ? (result.rows[0] as User) : null
      } catch (error) {
        console.error("Error getting user:", error)
        return null
      } finally {
        client.release()
      }
    },

    getByEmail: async (email: string) => {
      const client = await pool.connect()
      try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email])
        return result.rows.length > 0 ? (result.rows[0] as User) : null
      } catch (error) {
        console.error("Error getting user by email:", error)
        return null
      } finally {
        client.release()
      }
    },
  },

  opportunities: {
    getAll: async () => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'SELECT * FROM opportunities ORDER BY featured DESC, created_at DESC'
        )
        return result.rows as Opportunity[]
      } catch (error) {
        console.error("Error getting opportunities:", error)
        return []
      } finally {
        client.release()
      }
    },

    getFeatured: async () => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'SELECT * FROM opportunities WHERE featured = true ORDER BY created_at DESC'
        )
        return result.rows as Opportunity[]
      } catch (error) {
        console.error("Error getting featured opportunities:", error)
        return []
      } finally {
        client.release()
      }
    },

    getById: async (id: number) => {
      const client = await pool.connect()
      try {
        const result = await client.query('SELECT * FROM opportunities WHERE id = $1', [id])
        return result.rows.length > 0 ? (result.rows[0] as Opportunity) : null
      } catch (error) {
        console.error("Error getting opportunity:", error)
        return null
      } finally {
        client.release()
      }
    },

    create: async (opp: Omit<Opportunity, "id" | "created_at">) => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'INSERT INTO opportunities (title, institution, type, description, deadline, amount, eligibility, application_url, featured, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
          [opp.title, opp.institution, opp.type, opp.description, opp.deadline, opp.amount, opp.eligibility, opp.application_url, opp.featured, opp.created_by]
        )
        return result.rows[0] as Opportunity
      } catch (error) {
        console.error("Error creating opportunity:", error)
        throw error
      } finally {
        client.release()
      }
    },
  },

  messages: {
    create: async (msg: Omit<ContactMessage, "id" | "created_at">) => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
          [msg.name, msg.email, msg.subject, msg.message]
        )
        return result.rows[0] as ContactMessage
      } catch (error) {
        console.error("Error creating message:", error)
        throw error
      } finally {
        client.release()
      }
    },
  },
}