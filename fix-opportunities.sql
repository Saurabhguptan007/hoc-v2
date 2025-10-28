-- Update existing opportunities to be owned by the test teacher
UPDATE opportunities 
SET created_by = (SELECT id FROM users WHERE email = 'teacher@test.com')
WHERE created_by IS NULL;