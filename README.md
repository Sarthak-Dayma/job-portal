# ShramSaathi - Blue Collar Job Marketplace MVP

A **LinkedIn-inspired**, mobile-first web application connecting blue-collar workers with nearby employers. Features real-time messaging, notifications, ratings, and intelligent job matching.

## Features

### For Workers
- **Professional Profiles**: Complete profiles with skills, experience, hourly rates, and ratings
- **Resume/CV Upload**: Drag-and-drop resume submission with PDF, DOC, DOCX support
- **Smart Job Matching**: AI-powered algorithm matching workers to jobs based on skills, experience, and location
- **Advanced Job Search**: Filter by category, location, wage range with real-time results
- **Real-time Notifications**: Instant alerts for job matches, applications, and messages
- **In-App Messaging**: Chat directly with employers, file attachments, typing indicators
- **Application Tracking**: Monitor application status and employer responses
- **Ratings & Reviews**: 5-star rating system with written reviews

### For Employers
- **Company Profiles**: Professional employer profiles with verification
- **Job Posting**: Detailed job postings with requirements and payment terms
- **Worker Discovery**: Browse and search verified worker profiles
- **Application Management**: Review applications with worker ratings and experience
- **In-App Messaging**: Direct communication with workers
- **Rating System**: Rate workers after job completion
- **Payment Integration**: Stripe-ready for secure transactions

### For Admins
- **User Verification**: Verify worker documents and employer profiles
- **Document Review**: Comprehensive verification panel for Aadhaar, PAN, etc.
- **User Management**: Search, filter, suspend users with audit trails
- **Platform Analytics**: Real-time statistics and activity monitoring
- **System Notifications**: Broadcast important updates to users

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4 (LinkedIn-inspired design system)
- **UI Components**: shadcn/ui with custom enhancements
- **State Management**: React Hooks, SWR for data fetching
- **Icons**: Lucide React
- **Database**: PostgreSQL (Supabase, Neon, or self-hosted)
- **Authentication**: OTP-based (Twilio/Firebase integration ready)
- **Payments**: Stripe integration ready

## Quick Start

### Installation

\`\`\`bash
# 1. Extract the ZIP file from v0.dev or clone from GitHub
cd shramsaathi-mvp

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
\`\`\`

Visit `http://localhost:3000` in your browser.

**Note**: The app works immediately with mock data - no database setup required for testing!

### Environment Variables (Optional for Production)

Create a `.env.local` file:

\`\`\`env
# Database (production)
DATABASE_URL=postgresql://user:password@localhost:5432/shramsaathi

# OTP Service
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

# JWT Secret
JWT_SECRET=your_jwt_secret

# Stripe Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# File Storage (S3 for resumes/documents)
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
S3_BUCKET=your-s3-bucket
\`\`\`

## Project Structure

\`\`\`
shramsaathi-mvp/
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Main entry point
│   └── globals.css             # Design system & theme
├── components/
│   ├── auth/                   # Login, OTP, user type selection
│   ├── worker/                 # Worker dashboard & profile
│   │   ├── worker-dashboard.tsx
│   │   ├── worker-profile.tsx
│   │   └── resume-upload.tsx   # NEW: Resume upload
│   ├── employer/               # Employer dashboard & jobs
│   │   ├── employer-dashboard.tsx
│   │   ├── job-post-form.tsx
│   │   └── job-applications-list.tsx
│   ├── admin/                  # Admin panel
│   │   ├── admin-dashboard.tsx
│   │   ├── verification-panel.tsx
│   │   └── user-management.tsx
│   ├── jobs/                   # Job components
│   │   ├── job-card.tsx
│   │   ├── job-detail.tsx
│   │   ├── job-search.tsx
│   │   └── job-matching.tsx
│   ├── messaging/              # NEW: Chat system
│   │   ├── chat-window.tsx
│   │   └── messages-list.tsx
│   ├── ratings/                # NEW: Rating system
│   │   └── rating-modal.tsx
│   ├── shared/                 # Shared components
│   │   ├── header.tsx
│   │   ├── tabs.tsx
│   │   └── notifications-dropdown.tsx  # NEW
│   └── ui/                     # shadcn/ui base components
├── lib/
│   ├── types.ts                # TypeScript definitions
│   ├── api-service.ts          # API integration layer
│   ├── matching-service.ts     # Job matching algorithm
│   └── admin-service.ts        # Admin utilities
└── scripts/                    # Database SQL scripts
    ├── 01-schema.sql
    └── 02-seed-data.sql
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/request-otp` - Request OTP for phone number
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token

### Workers
- `GET /api/workers` - List workers (filterable by trade, city)
- `GET /api/workers/{id}` - Get worker profile
- `POST /api/workers` - Create/update worker profile

### Employers
- `POST /api/employers` - Create employer profile

### Jobs
- `POST /api/jobs` - Create job posting
- `GET /api/jobs` - List jobs (filterable)
- `GET /api/jobs/{id}` - Get job details with recommended workers
- `POST /api/jobs/{id}/apply` - Worker applies to job
- `POST /api/jobs/{id}/complete` - Mark job complete and allow rating

### Admin
- `GET /api/admin/users` - List all users
- `GET /api/admin/jobs` - List all jobs
- `PUT /api/admin/users/{id}/verify` - Verify worker profile

### Messaging (NEW)
- `GET /api/messages` - Get user's conversations
- `GET /api/messages/{conversationId}` - Get messages in conversation
- `POST /api/messages` - Send message
- `POST /api/messages/{id}/read` - Mark message as read

### Notifications (NEW)
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications/{id}/read` - Mark notification as read
- `POST /api/notifications/read-all` - Mark all as read

### Ratings (NEW)
- `POST /api/ratings` - Submit rating and review
- `GET /api/ratings/user/{userId}` - Get user's ratings
- `GET /api/ratings/stats/{userId}` - Get rating statistics

### Resume (NEW)
- `POST /api/worker/resume` - Upload resume
- `GET /api/worker/resume/{workerId}` - Download resume
- `DELETE /api/worker/resume/{workerId}` - Delete resume

## Job Matching Algorithm

Enhanced algorithm with weighted scoring:

\`\`\`
final_score = 
  (skill_match × 40%) +
  (experience_level × 25%) +
  (rating × 20%) +
  (verification_status × 10%) +
  (location_proximity × 5%)
\`\`\`

**Breakdown:**
- **Skills Match**: Exact + fuzzy matching of required skills
- **Experience**: Years of experience in the trade
- **Rating**: Average rating from previous jobs (0-5 stars)
- **Verification**: Bonus for verified workers
- **Location**: Distance-based scoring using Haversine formula

Workers are sorted by score and top matches are recommended.

## Design System

ShramSaathi uses a **LinkedIn-inspired** professional design system:

**Color Palette:**
- **Primary**: LinkedIn Blue (#0A66C2) - Trust, professionalism
- **Secondary**: Warm Orange (#ED5A24) - CTAs, energy
- **Accent**: Success Green (#16A34A) - Positive actions
- **Neutrals**: Gray scale for hierarchy

**Typography:**
- Clean sans-serif fonts
- Clear hierarchy with proper line heights
- Responsive sizing for all devices

**Components:**
- Rounded corners (0.5rem radius)
- Subtle shadows for depth
- Smooth animations (200ms transitions)
- Custom scrollbars for premium feel

## Demo Flow

### 1. Worker Registration & Profile (2 min)
1. Select "Worker" → Enter phone → Verify OTP
2. Complete profile: skills, experience, hourly rate
3. Upload resume (optional)
4. Profile is ready!

### 2. Job Discovery (1 min)
1. Browse recommended jobs (AI-matched)
2. Use filters: category, location, wage
3. View match scores and reasons

### 3. Application & Communication (2 min)
1. Apply to job with cover note
2. Receive notification when reviewed
3. Chat with employer in real-time
4. Accept job offer

### 4. Job Completion & Rating (1 min)
1. Mark job as complete
2. Rate employer (1-5 stars + review)
3. Receive rating from employer
4. Rating appears on profile

### 5. Employer Flow (2 min)
1. Select "Employer" → Login
2. Post job with requirements
3. Review applications with worker ratings
4. Message workers directly
5. Accept worker and coordinate

## Key Features Detail

### 1. Real-Time Messaging
- **One-on-one chat** between workers and employers
- **Typing indicators** for better UX
- **File attachments** support (images, documents)
- **Read receipts** and timestamps
- **Message history** persisted

### 2. Notifications System
- **Real-time dropdown** with unread count
- **Notification types**: job matches, applications, messages, system alerts
- **Mark as read** individual or all
- **Timestamp formatting** (5m ago, 2h ago, etc.)
- **Action URLs** for quick navigation

### 3. Ratings & Reviews
- **5-star rating system** with hover preview
- **Written reviews** (optional)
- **Rating statistics** on profiles
- **Post-job completion** only
- **Mutual ratings** (worker ↔ employer)

### 4. Resume Management
- **Drag-and-drop upload** interface
- **File validation** (PDF, DOC, DOCX, max 10MB)
- **Upload progress** indicator
- **Replace/delete** functionality
- **Download** for employers

### 5. Advanced Search & Filters
- **Multi-criteria filtering**: category, location, wage range
- **Real-time search** with debouncing
- **Sort options**: relevance, newest, highest pay
- **Save searches** (coming soon)

## Deployment

### Deploy to Vercel (Recommended)

\`\`\`bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 2. Import in Vercel dashboard
# 3. Add environment variables
# 4. Deploy!
\`\`\`

### Environment Variables for Production

Add these in Vercel dashboard → Settings → Environment Variables:

\`\`\`env
DATABASE_URL=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
JWT_SECRET=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET=
NEXT_PUBLIC_APP_URL=https://yourapp.vercel.app
\`\`\`

## Production Considerations

### Security
- Rate-limit OTP requests (max 5 per hour per phone)
- JWT token refresh mechanism
- HTTPS for all endpoints
- Input validation and sanitization
- XSS and CSRF protection

### Performance
- Image optimization (Next.js Image component)
- Code splitting and lazy loading
- Database indexing on frequently queried fields
- CDN for static assets
- Response caching with SWR

### Storage
- S3/Cloud Storage for worker photos and resumes
- Database backups (daily automated)
- Message retention policy (6 months)
- GDPR-compliant data deletion

### Monitoring
- Request logging and error tracking
- Performance monitoring (Vercel Analytics)
- User activity analytics
- Notification delivery status

## Test Scenarios

### Worker Flow
- [ ] Register as worker with OTP
- [ ] Complete profile with skills and rates
- [ ] Browse and filter jobs by city/trade
- [ ] Apply to job with cover note
- [ ] Receive rating after job completion

### Employer Flow
- [ ] Register as employer
- [ ] Post job with requirements
- [ ] View applicants and their ratings
- [ ] Call worker from applicant list
- [ ] Mark job complete and rate worker

### Admin Flow
- [ ] View all users and filter
- [ ] Verify worker profiles
- [ ] View all jobs and applications
- [ ] Generate reports

### Messaging Flow (NEW)
- [ ] Send message to employer/worker
- [ ] Receive real-time message notifications
- [ ] Upload file attachment in chat
- [ ] View message history
- [ ] Mark conversations as read

### Rating Flow (NEW)
- [ ] Complete job successfully
- [ ] Submit rating with 5 stars and review
- [ ] View ratings on worker profile
- [ ] See average rating calculation
- [ ] Filter workers by minimum rating

### Resume Flow (NEW)
- [ ] Upload resume PDF successfully
- [ ] Replace existing resume
- [ ] Download resume as employer
- [ ] Resume appears in applications
- [ ] Delete resume from profile

## Future Enhancements

- [ ] Video call integration (Zoom/Google Meet)
- [ ] Push notifications (PWA)
- [ ] Multilingual support (Hindi, Tamil, Bengali)
- [ ] Offline mode for workers
- [ ] Advanced analytics dashboard
- [ ] Premium subscriptions for employers
- [ ] Background verification integration
- [ ] Skill assessment tests
- [ ] Job recommendations via email/SMS
- [ ] Mobile app (React Native)

## Support

For issues or questions:
- Open a GitHub issue
- Email: support@shramsaathi.com
- Check documentation in `/docs`

---

**Version**: 1.0.0 (Production-Ready)  
**Last Updated**: December 2024  
**Built with**: Next.js 16, React 19, Tailwind CSS v4

**Built with ❤️ for connecting workers and employers across India**
