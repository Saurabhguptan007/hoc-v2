-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create student profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  school VARCHAR(255) DEFAULT '',
  grade VARCHAR(50) DEFAULT '',
  interests TEXT[] DEFAULT '{}',
  scholarship_status VARCHAR(50) DEFAULT 'none' CHECK (scholarship_status IN ('pending', 'accepted', 'rejected', 'none')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create teacher profiles table
CREATE TABLE IF NOT EXISTS teacher_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL UNIQUE,
  school VARCHAR(255) DEFAULT '',
  subject VARCHAR(255) DEFAULT '',
  student_enquiries INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('scholarship', 'admission', 'program')),
  description TEXT NOT NULL,
  deadline DATE NOT NULL,
  amount VARCHAR(255),
  eligibility TEXT,
  application_url VARCHAR(500) NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_by INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create student applications table
CREATE TABLE IF NOT EXISTS student_applications (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL,
  opportunity_id INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (opportunity_id) REFERENCES opportunities(id) ON DELETE CASCADE,
  UNIQUE(student_id, opportunity_id)
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL,
  teacher_id INTEGER NOT NULL,
  message TEXT,
  status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'resolved')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create success stats table
CREATE TABLE IF NOT EXISTS success_stats (
  id SERIAL PRIMARY KEY,
  metric VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_student_profiles_user_id ON student_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_teacher_profiles_user_id ON teacher_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_created_by ON opportunities(created_by);
CREATE INDEX IF NOT EXISTS idx_opportunities_featured ON opportunities(featured);
CREATE INDEX IF NOT EXISTS idx_student_applications_student_id ON student_applications(student_id);
CREATE INDEX IF NOT EXISTS idx_student_applications_opportunity_id ON student_applications(opportunity_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_student_id ON enquiries(student_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_teacher_id ON enquiries(teacher_id);

-- Insert sample data
INSERT INTO users (email, password, name, role) VALUES
('teacher1@hoccell.com', 'password123', 'Dr. Sarah Johnson', 'teacher'),
('teacher2@hoccell.com', 'password123', 'Prof. Michael Chen', 'teacher'),
('student1@hoccell.com', 'password123', 'John Doe', 'student'),
('student2@hoccell.com', 'password123', 'Emma Wilson', 'student')
ON CONFLICT DO NOTHING;

-- Insert teacher profiles
INSERT INTO teacher_profiles (user_id, school, subject, student_enquiries) VALUES
((SELECT id FROM users WHERE email = 'teacher1@hoccell.com'), 'Harvard University', 'STEM Education', 0),
((SELECT id FROM users WHERE email = 'teacher2@hoccell.com'), 'Stanford University', 'Business & Economics', 0)
ON CONFLICT DO NOTHING;

-- Insert student profiles
INSERT INTO student_profiles (user_id, school, grade, interests, scholarship_status) VALUES
((SELECT id FROM users WHERE email = 'student1@hoccell.com'), 'Lincoln High School', '12th Grade', '{"STEM", "Robotics"}', 'none'),
((SELECT id FROM users WHERE email = 'student2@hoccell.com'), 'Central Academy', '11th Grade', '{"Business", "Leadership"}', 'none')
ON CONFLICT DO NOTHING;

-- Insert opportunities
INSERT INTO opportunities (title, institution, type, description, deadline, eligibility, amount, application_url, featured, created_by) VALUES
('STEM Excellence Scholarship 2025', 'Harvard University', 'scholarship', 'Full scholarship for outstanding STEM students pursuing engineering or computer science', '2025-12-31', 'GPA 3.5+, SAT 1400+', '$50,000', 'https://example.com/apply', TRUE, (SELECT id FROM users WHERE email = 'teacher1@hoccell.com')),
('Harvard Summer Program', 'Harvard University', 'program', 'Intensive 6-week summer program for high school students interested in STEM', '2025-06-30', 'Grade 10-12, Strong academics', 'Full Coverage', 'https://example.com/apply', TRUE, (SELECT id FROM users WHERE email = 'teacher1@hoccell.com')),
('Stanford MBA Admission', 'Stanford University', 'admission', 'Apply for Stanford Graduate School of Business MBA Program', '2025-11-15', 'Bachelor degree, GMAT 700+', 'N/A', 'https://example.com/apply', FALSE, (SELECT id FROM users WHERE email = 'teacher2@hoccell.com')),
('Global Leaders Scholarship', 'International Foundation', 'scholarship', 'Scholarship for students demonstrating leadership and community service', '2025-10-31', 'GPA 3.0+, Leadership experience', '$25,000', 'https://example.com/apply', TRUE, (SELECT id FROM users WHERE email = 'teacher2@hoccell.com'))
ON CONFLICT DO NOTHING;

-- Insert success stats
INSERT INTO success_stats (metric, value, description) VALUES
('Students Helped', '1,250+', 'Total students who received guidance'),
('Scholarships Won', '$2.5M+', 'Total scholarship amount secured'),
('Success Rate', '85%', 'Students who achieved their goals'),
('Partner Institutions', '150+', 'Universities and organizations')
ON CONFLICT DO NOTHING;
