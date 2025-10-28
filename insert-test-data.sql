INSERT INTO success_stats (metric, value, description) VALUES
('Students Helped', '1,250+', 'Total students who received guidance'),
('Scholarships Won', '$2.5M+', 'Total scholarship amount secured'),
('Success Rate', '85%', 'Students who achieved their goals'),
('Partner Institutions', '150+', 'Universities and organizations')
ON CONFLICT DO NOTHING;