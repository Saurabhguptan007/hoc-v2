ALTER TABLE student_applications 
ADD COLUMN applicant_name VARCHAR(255),
ADD COLUMN applicant_email VARCHAR(255),
ADD COLUMN applicant_phone VARCHAR(50),
ADD COLUMN application_reason TEXT;