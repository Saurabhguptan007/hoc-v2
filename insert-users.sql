INSERT INTO users (email, password, name, role) VALUES
('teacher@test.com', 'password', 'Test Teacher', 'teacher'),
('student@test.com', 'password', 'Test Student', 'student')
ON CONFLICT (email) DO NOTHING;

INSERT INTO teacher_profiles (user_id, school, subject, student_enquiries) VALUES
((SELECT id FROM users WHERE email = 'teacher@test.com'), 'Test University', 'Computer Science', 0)
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO student_profiles (user_id, school, grade, interests, scholarship_status) VALUES
((SELECT id FROM users WHERE email = 'student@test.com'), 'Test High School', '12th Grade', '{"STEM", "Technology"}', 'none')
ON CONFLICT (user_id) DO NOTHING;