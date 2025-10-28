HOC CELL - Higher Education Opportunities Platform
===============================================

PREREQUISITES:
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- Git

SETUP INSTRUCTIONS:

1. CLONE THE PROJECT
   git clone <repository-url>
   cd HC

2. INSTALL DEPENDENCIES
   npm install --legacy-peer-deps

3. SETUP POSTGRESQL DATABASE
   - Install PostgreSQL on your system
   - Create a new database:
     createdb hoc
   
   - Run the database schema:
     psql postgresql://username:password@localhost:5432/hoc -f scripts/schema.sql
   
   - Insert sample data:
     psql postgresql://username:password@localhost:5432/hoc -f insert-test-data.sql
     psql postgresql://username:password@localhost:5432/hoc -f insert-opportunities.sql
     psql postgresql://username:password@localhost:5432/hoc -f insert-users.sql
     psql postgresql://username:password@localhost:5432/hoc -f add-columns.sql

4. ENVIRONMENT SETUP
   - Create .env.local file in root directory
   - Add your database connection string:
     DATABASE_URL=postgresql://username:password@localhost:5432/hoc

5. RUN THE APPLICATION
   npm run dev
   
   Open http://localhost:3000 in your browser

TEST ACCOUNTS:
- Teacher: teacher@test.com / password
- Student: student@test.com / password

FEATURES:
- Student dashboard and opportunity search
- Teacher dashboard and opportunity management
- Application system with approval workflow
- Real-time statistics and data management

TROUBLESHOOTING:
- If you get dependency errors, use: npm install --legacy-peer-deps --force
- Make sure PostgreSQL is running before starting the app
- Check .env.local file has correct database credentials
- Verify all SQL files have been executed successfully

TECH STACK:
- Next.js 16
- React 19
- PostgreSQL
- Tailwind CSS
- TypeScript