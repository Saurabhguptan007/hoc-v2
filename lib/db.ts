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

export interface Application {
  id: number
  student_id: number
  opportunity_id: number
  status: "pending" | "accepted" | "rejected" | "withdrawn"
  applied_at: string
  updated_at: string
  applicant_name?: string
  applicant_email?: string
  applicant_phone?: string
  application_reason?: string
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

  studentProfiles: {
    getByUserId: async (userId: number) => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'SELECT * FROM student_profiles WHERE user_id = $1',
          [userId]
        )
        return result.rows.length > 0 ? (result.rows[0] as StudentProfile) : null
      } catch (error) {
        console.error("Error getting student profile:", error)
        return null
      } finally {
        client.release()
      }
    },

    update: async (userId: number, data: Partial<StudentProfile>) => {
      const client = await pool.connect()
      try {
        const updates: string[] = []
        const values: any[] = []
        let paramCount = 1

        if (data.school !== undefined) {
          updates.push(`school = $${paramCount++}`)
          values.push(data.school)
        }
        if (data.grade !== undefined) {
          updates.push(`grade = $${paramCount++}`)
          values.push(data.grade)
        }
        if (data.interests !== undefined) {
          updates.push(`interests = $${paramCount++}`)
          values.push(data.interests)
        }
        if (data.scholarship_status !== undefined) {
          updates.push(`scholarship_status = $${paramCount++}`)
          values.push(data.scholarship_status)
        }

        if (updates.length === 0) return null

        values.push(userId)
        const query = `UPDATE student_profiles SET ${updates.join(", ")} WHERE user_id = $${paramCount} RETURNING *`
        const result = await client.query(query, values)
        return result.rows.length > 0 ? (result.rows[0] as StudentProfile) : null
      } catch (error) {
        console.error("Error updating student profile:", error)
        return null
      } finally {
        client.release()
      }
    },
  },

  teacherProfiles: {
    getByUserId: async (userId: number) => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'SELECT * FROM teacher_profiles WHERE user_id = $1',
          [userId]
        )
        return result.rows.length > 0 ? (result.rows[0] as TeacherProfile) : null
      } catch (error) {
        console.error("Error getting teacher profile:", error)
        return null
      } finally {
        client.release()
      }
    },

    update: async (userId: number, data: Partial<TeacherProfile>) => {
      const client = await pool.connect()
      try {
        const updates: string[] = []
        const values: any[] = []
        let paramCount = 1

        if (data.school !== undefined) {
          updates.push(`school = $${paramCount++}`)
          values.push(data.school)
        }
        if (data.subject !== undefined) {
          updates.push(`subject = $${paramCount++}`)
          values.push(data.subject)
        }

        if (updates.length === 0) return null

        values.push(userId)
        const query = `UPDATE teacher_profiles SET ${updates.join(", ")} WHERE user_id = $${paramCount} RETURNING *`
        const result = await client.query(query, values)
        return result.rows.length > 0 ? (result.rows[0] as TeacherProfile) : null
      } catch (error) {
        console.error("Error updating teacher profile:", error)
        return null
      } finally {
        client.release()
      }
    },

    incrementEnquiries: async (userId: number) => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'UPDATE teacher_profiles SET student_enquiries = student_enquiries + 1 WHERE user_id = $1 RETURNING *',
          [userId]
        )
        return result.rows.length > 0 ? (result.rows[0] as TeacherProfile) : null
      } catch (error) {
        console.error("Error incrementing enquiries:", error)
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
        console.error("Error getting all opportunities:", error)
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

    search: async (query: string) => {
      const client = await pool.connect()
      try {
        const searchTerm = `%${query}%`
        const result = await client.query(
          'SELECT * FROM opportunities WHERE title ILIKE $1 OR institution ILIKE $1 OR description ILIKE $1 ORDER BY featured DESC, created_at DESC',
          [searchTerm]
        )
        return result.rows as Opportunity[]
      } catch (error) {
        console.error("Error searching opportunities:", error)
        return []
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

    getByTeacher: async (teacherId: number) => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'SELECT * FROM opportunities WHERE created_by = $1 ORDER BY created_at DESC',
          [teacherId]
        )
        return result.rows as Opportunity[]
      } catch (error) {
        console.error("Error getting teacher opportunities:", error)
        return []
      } finally {
        client.release()
      }
    },

    update: async (id: number, data: Partial<Opportunity>) => {
      const client = await pool.connect()
      try {
        const updates: string[] = []
        const values: any[] = []
        let paramCount = 1

        if (data.title !== undefined) {
          updates.push(`title = $${paramCount++}`)
          values.push(data.title)
        }
        if (data.featured !== undefined) {
          updates.push(`featured = $${paramCount++}`)
          values.push(data.featured)
        }

        if (updates.length === 0) return null

        values.push(id)
        const query = `UPDATE opportunities SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING *`
        const result = await client.query(query, values)
        return result.rows.length > 0 ? (result.rows[0] as Opportunity) : null
      } catch (error) {
        console.error("Error updating opportunity:", error)
        return null
      } finally {
        client.release()
      }
    },

    delete: async (id: number) => {
      const client = await pool.connect()
      try {
        await client.query('DELETE FROM opportunities WHERE id = $1', [id])
      } catch (error) {
        console.error("Error deleting opportunity:", error)
      } finally {
        client.release()
      }
    },
  },

  stats: {
    getAll: async () => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'SELECT * FROM success_stats ORDER BY created_at ASC'
        )
        return result.rows as SuccessStat[]
      } catch (error) {
        console.error("Error getting stats:", error)
        return []
      } finally {
        client.release()
      }
    },
  },

  messages: {
    getAll: async () => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'SELECT * FROM contact_messages ORDER BY created_at DESC'
        )
        return result.rows as ContactMessage[]
      } catch (error) {
        console.error("Error getting messages:", error)
        return []
      } finally {
        client.release()
      }
    },

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

  applications: {
    create: async (studentId: number, opportunityId: number, details: { name: string, email: string, phone: string, reason: string }) => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'INSERT INTO student_applications (student_id, opportunity_id, status, applicant_name, applicant_email, applicant_phone, application_reason) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
          [studentId, opportunityId, 'pending', details.name, details.email, details.phone, details.reason]
        )
        return result.rows[0] as Application
      } catch (error) {
        console.error("Error creating application:", error)
        throw error
      } finally {
        client.release()
      }
    },

    getByStudentId: async (studentId: number) => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          `SELECT sa.*, o.title, o.institution, o.type, o.deadline, o.amount 
           FROM student_applications sa 
           JOIN opportunities o ON sa.opportunity_id = o.id 
           WHERE sa.student_id = $1 
           ORDER BY sa.applied_at DESC`,
          [studentId]
        )
        return result.rows
      } catch (error) {
        console.error("Error getting applications:", error)
        return []
      } finally {
        client.release()
      }
    },

    getAll: async () => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          `SELECT sa.*, o.title, o.institution, u.name as student_name, u.email as student_email 
           FROM student_applications sa 
           JOIN opportunities o ON sa.opportunity_id = o.id 
           JOIN users u ON sa.student_id = u.id 
           ORDER BY sa.applied_at DESC`
        )
        return result.rows
      } catch (error) {
        console.error("Error getting all applications:", error)
        return []
      } finally {
        client.release()
      }
    },

    updateStatus: async (applicationId: number, status: string) => {
      const client = await pool.connect()
      try {
        const result = await client.query(
          'UPDATE student_applications SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
          [status, applicationId]
        )
        return result.rows[0] as Application
      } catch (error) {
        console.error("Error updating application status:", error)
        throw error
      } finally {
        client.release()
      }
    },
  },
}
