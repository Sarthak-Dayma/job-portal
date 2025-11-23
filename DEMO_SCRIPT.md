# ShramSaathi MVP Demo Script (2 minutes)

## Setup
1. App running at http://localhost:3000
2. Database seeded with sample data
3. OTP mock service enabled

## Demo Flow

### 1. Worker Registration & Profile (30 seconds)

\`\`\`
1. Click "I'm a Worker"
2. Enter phone: +91 9876543210
3. Request OTP
4. Enter code: 123456 (any 6 digits for mock)
5. See worker dashboard with recommended jobs
\`\`\`

**What to highlight:**
- Mobile-first design
- Low-bandwidth UI
- Large touch targets for accessibility

### 2. Browse Recommended Jobs (20 seconds)

\`\`\`
1. Scroll through job list on worker dashboard
2. Point out:
   - Job title and employer name
   - Match score (95% Match)
   - Distance information (2km away)
   - Pay and date
3. Jobs are ranked by algorithm (skills + experience + availability)
\`\`\`

**What to highlight:**
- Smart matching shows most relevant jobs first
- Quick preview before opening detail

### 3. Apply to Job (30 seconds)

\`\`\`
1. Click on first job "Electrical Wiring Installation"
2. See full details:
   - Pay: ₹5,000
   - Date: 2025-11-07
   - Trade: Electrician
   - Description
3. Write short cover note: "Experienced with commercial projects"
4. Click "Apply for Job"
5. Get confirmation message
\`\`\`

**What to highlight:**
- Clear job details
- Cover note allows brief self-introduction
- One-click application process

### 4. Switch to Employer (20 seconds)

\`\`\`
1. Go back to home
2. Click "Logout" then "I'm an Employer"
3. Phone: +91 9876543220
4. OTP: 123456
5. See employer dashboard with:
   - Posted jobs
   - Number of applicants per job
   - Status of each job
\`\`\`

**What to highlight:**
- Separate dashboards for different user types
- Quick overview of all job postings

### 5. View Applicants & Rate (20 seconds)

\`\`\`
1. Go to "Applicants" tab
2. See list of workers who applied:
   - Name: Ramesh Kumar
   - Rating: ⭐ 4.5/5.0
   - Experience: 5 years
   - Phone: +91 9876543210
3. Click "📞 Call" to initiate phone contact
4. Show how employer can rate worker after job completion
\`\`\`

**What to highlight:**
- Worker ratings build trust
- Direct phone contact (no in-app chat needed for MVP)
- Worker phone visible for immediate connection
- Rating system encourages quality

### 6. Admin Dashboard (Optional - 15 seconds)

\`\`\`
1. Logout and select "Admin Access"
2. Show admin features:
   - User list with verification status
   - All jobs and their application counts
   - Reports dashboard (total users, active jobs, applications)
   - Verify worker profiles
\`\`\`

**What to highlight:**
- Centralized platform management
- Worker verification for trust
- Monitoring and reporting

---

## Key Points to Emphasize

1. **Trust & Accessibility**
   - Large touch targets for mobile
   - Clear typography
   - Direct phone contact (secure but personal)
   - Rating system for accountability

2. **Simplicity**
   - OTP authentication (works without email)
   - No complicated navigation
   - One screen = one task
   - Mobile-first design

3. **Smart Matching**
   - Algorithm considers skills, experience, availability
   - Workers see most relevant jobs
   - Employers see best-matched workers

4. **Low Bandwidth**
   - Minimal data usage
   - Works on slow networks
   - No heavy animations
   - Optimized for 2G/3G

5. **Scalability**
   - Database schema ready for millions of users
   - API architecture supports growth
   - Easy to add new features

---

## Sample Curl Requests (for API testing)

### Request OTP
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/request-otp \
  -H "Content-Type: application/json" \
  -d '{"phone": "+91 9876543210"}'
\`\`\`

### List Jobs with Filters
\`\`\`bash
curl -X GET "http://localhost:3000/api/jobs?trade=electrician&city=Mumbai" \
  -H "Authorization: Bearer <token>"
\`\`\`

### Get Job with Recommended Workers
\`\`\`bash
curl -X GET http://localhost:3000/api/jobs/1 \
  -H "Authorization: Bearer <token>"
\`\`\`

Expected response shows job details + top 5 matched workers sorted by algorithm score.

### Apply to Job
\`\`\`bash
curl -X POST http://localhost:3000/api/jobs/1/apply \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"workerId": 1, "coverNote": "I have experience with commercial wiring"}'
\`\`\`

---

## Demo Notes

- Use mock data already seeded in database
- OTP code accepts any 6 digits (mock service)
- Direct phone calling feature shows "+91 9876543210" (real workers would use actual numbers)
- Database reset available: `npm run reset-db`
- Network throttling can be tested in DevTools for low-bandwidth experience
