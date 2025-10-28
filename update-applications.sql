ALTER TABLE student_applications 
ADD COLUMN IF NOT EXISTS applicant_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS applicant_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS applicant_phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS application_reason TEXT;