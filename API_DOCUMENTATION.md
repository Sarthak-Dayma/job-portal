# ShramSaathi API Documentation

Base URL: `http://localhost:3000/api`

## Authentication Endpoints

### Request OTP
\`\`\`
POST /auth/request-otp
Content-Type: application/json

{
  "phone": "+91 9876543210"
}

Response:
{
  "otpToken": "token_1234567890",
  "message": "OTP sent to your phone",
  "expiresIn": 300
}
\`\`\`

### Verify OTP
\`\`\`
POST /auth/verify-otp
Content-Type: application/json

{
  "phone": "+91 9876543210",
  "code": "123456",
  "userType": "worker"
}

Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "userId": 1,
  "userType": "worker",
  "phone": "+91 9876543210"
}
\`\`\`

## Worker Endpoints

### Get Worker Profile
\`\`\`
GET /workers/{id}
Authorization: Bearer {accessToken}

Response:
{
  "id": 1,
  "userId": 1,
  "name": "Ramesh Kumar",
  "trade": "electrician",
  "skills": ["Wiring", "Panel Installation"],
  "experienceYears": 5,
  "hourlyRate": 500,
  "availability": "immediate",
  "city": "Mumbai",
  "rating": 4.5,
  "verified": true
}
\`\`\`

### List Workers
\`\`\`
GET /workers?trade=electrician&city=Mumbai&page=1&limit=20
Authorization: Bearer {accessToken}

Response:
{
  "data": [...],
  "total": 45,
  "page": 1,
  "pageSize": 20
}
\`\`\`

### Create/Update Worker Profile
\`\`\`
POST /workers
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "name": "Ramesh Kumar",
  "trade": "electrician",
  "skills": ["Wiring", "Panel Installation"],
  "experienceYears": 5,
  "hourlyRate": 500,
  "availability": "immediate",
  "city": "Mumbai"
}

Response: { "id": 1, ...worker_data }
\`\`\`

## Job Endpoints

### Create Job
\`\`\`
POST /jobs
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Electrical Wiring",
  "description": "Commercial building wiring",
  "tradeRequired": "electrician",
  "pay": 5000,
  "date": "2025-11-07",
  "city": "Mumbai"
}

Response: { "id": 1, ...job_data }
\`\`\`

### List Jobs
\`\`\`
GET /jobs?trade=electrician&city=Mumbai&page=1&limit=20
Authorization: Bearer {accessToken}

Response:
{
  "data": [
    {
      "id": 1,
      "title": "Electrical Wiring",
      "trade": "electrician",
      "pay": 5000,
      "date": "2025-11-07",
      "city": "Mumbai",
      "applicants": 3
    }
  ],
  "total": 15
}
\`\`\`

### Get Job Detail with Recommended Workers
\`\`\`
GET /jobs/{id}
Authorization: Bearer {accessToken}

Response:
{
  "id": 1,
  "title": "Electrical Wiring",
  "description": "Commercial building wiring",
  "tradeRequired": "electrician",
  "pay": 5000,
  "date": "2025-11-07",
  "city": "Mumbai",
  "recommendedWorkers": [
    {
      "id": 1,
      "name": "Ramesh Kumar",
      "trade": "electrician",
      "rating": 4.5,
      "experience": 5,
      "matchScore": 95,
      "phone": "+91 9876543210"
    }
  ]
}
\`\`\`

### Apply to Job
\`\`\`
POST /jobs/{jobId}/apply
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "workerId": 1,
  "coverNote": "I have 5 years of experience with electrical projects"
}

Response: { "applicationId": 123, "status": "applied" }
\`\`\`

## Admin Endpoints

### Get All Users
\`\`\`
GET /admin/users?page=1&limit=50
Authorization: Bearer {adminToken}

Response:
{
  "data": [
    {
      "id": 1,
      "name": "Ramesh Kumar",
      "type": "worker",
      "phone": "+91 9876543210",
      "verified": true
    }
  ]
}
\`\`\`

### Verify Worker
\`\`\`
PUT /admin/users/{userId}/verify
Authorization: Bearer {adminToken}
Content-Type: application/json

{
  "verified": true
}

Response: { "verified": true }
\`\`\`

## Error Responses

\`\`\`json
{
  "error": "Invalid phone number",
  "code": "INVALID_PHONE",
  "statusCode": 400
}
\`\`\`

Common error codes:
- `INVALID_PHONE`: Phone number format is invalid
- `OTP_EXPIRED`: OTP has expired
- `INVALID_OTP`: OTP code is incorrect
- `USER_NOT_FOUND`: User does not exist
- `UNAUTHORIZED`: Invalid or missing token
- `FORBIDDEN`: User doesn't have permission
- `CONFLICT`: Resource already exists
- `INTERNAL_ERROR`: Server error
