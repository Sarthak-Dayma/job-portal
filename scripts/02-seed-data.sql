-- Seed data for ShramSaathi platform development and testing

-- Insert test users
INSERT INTO users (id, phone, role, name, email, verified, verified_at) VALUES
('user_worker_1', '+91 9876543210', 'worker', 'Ramesh Kumar', 'ramesh@example.com', true, NOW()),
('user_worker_2', '+91 9876543211', 'worker', 'Priya Singh', 'priya@example.com', false, NULL),
('user_worker_3', '+91 9876543212', 'worker', 'Arjun Patel', 'arjun@example.com', true, NOW()),
('user_emp_1', '+91 9876543220', 'employer', 'BuildCorp', 'contact@buildcorp.com', true, NOW()),
('user_emp_2', '+91 9876543221', 'employer', 'Home Services', 'info@homeservices.com', true, NOW()),
('user_admin_1', '+91 9876543230', 'admin', 'Admin User', 'admin@shram.com', true, NOW());

-- Insert workers data
INSERT INTO workers (id, user_id, bio, avatar_url, rating, total_jobs, years_experience, hourly_rate) VALUES
('worker_1', 'user_worker_1', 'Experienced electrician with 5+ years in residential and commercial projects', 'https://via.placeholder.com/150', 4.5, 12, 5, 500),
('worker_2', 'user_worker_2', 'Skilled plumber specializing in bathroom and kitchen installations', 'https://via.placeholder.com/150', 4.2, 5, 3, 400),
('worker_3', 'user_worker_3', 'Carpenter with expertise in furniture and interior work', 'https://via.placeholder.com/150', 4.8, 20, 8, 600);

-- Insert worker skills
INSERT INTO worker_skills (worker_id, skill, proficiency_level) VALUES
('worker_1', 'Wiring', 'expert'),
('worker_1', 'Panel Installation', 'expert'),
('worker_1', 'Troubleshooting', 'expert'),
('worker_2', 'Pipe Fitting', 'expert'),
('worker_2', 'Installation', 'intermediate'),
('worker_3', 'Furniture Making', 'expert'),
('worker_3', 'Design', 'intermediate');

-- Insert employers data
INSERT INTO employers (id, user_id, company_name, description, logo_url, rating, total_jobs_posted) VALUES
('emp_1', 'user_emp_1', 'BuildCorp Solutions', 'Leading construction and renovation company', 'https://via.placeholder.com/150', 4.8, 23),
('emp_2', 'user_emp_2', 'Home Services Plus', 'Full-service home maintenance and repair', 'https://via.placeholder.com/150', 4.5, 15);

-- Insert jobs
INSERT INTO jobs (id, employer_id, title, description, category, location, latitude, longitude, wage_amount, wage_period, start_date, status) VALUES
('job_1', 'emp_1', 'Electrical Wiring Installation', 'We need experienced electrician for complete wiring installation in new residential complex', 'electrical', 'Mumbai, Maharashtra', 19.0760, 72.8777, 500, 'daily', '2025-01-15', 'active'),
('job_2', 'emp_2', 'Plumbing Repair', 'Emergency plumbing repair needed for bathroom and kitchen fixtures', 'plumbing', 'Mumbai, Maharashtra', 19.0760, 72.8777, 400, 'hourly', '2025-01-10', 'active'),
('job_3', 'emp_1', 'Interior Carpentry Work', 'Custom furniture installation and interior decoration for office space', 'carpentry', 'Bangalore, Karnataka', 12.9716, 77.5946, 600, 'daily', '2025-01-20', 'active'),
('job_4', 'emp_2', 'Wall Painting', 'Professional wall painting for residential apartment', 'painting', 'Mumbai, Maharashtra', 19.0760, 72.8777, 300, 'daily', '2025-01-16', 'active');

-- Insert job skills
INSERT INTO job_skills (job_id, skill) VALUES
('job_1', 'Wiring'),
('job_1', 'Panel Installation'),
('job_1', 'Troubleshooting'),
('job_2', 'Pipe Fitting'),
('job_2', 'Installation'),
('job_3', 'Furniture Making'),
('job_3', 'Design'),
('job_4', 'Painting'),
('job_4', 'Surface Preparation');

-- Insert job applications
INSERT INTO job_applications (id, job_id, worker_id, status, cover_letter, applied_at) VALUES
('app_1', 'job_1', 'worker_1', 'applied', 'I have extensive experience in electrical wiring and would love to work on this project.', NOW()),
('app_2', 'job_2', 'worker_2', 'accepted', 'I can handle this emergency repair with quick service.', NOW()),
('app_3', 'job_3', 'worker_3', 'applied', 'My carpentry skills match your requirements perfectly.', NOW());

-- Insert worker documents
INSERT INTO worker_documents (id, worker_id, document_type, document_url, verified, verified_at) VALUES
('doc_1', 'worker_1', 'aadhaar', 'https://via.placeholder.com/document', true, NOW()),
('doc_2', 'worker_1', 'pancard', 'https://via.placeholder.com/document', true, NOW()),
('doc_3', 'worker_2', 'aadhaar', 'https://via.placeholder.com/document', false, NULL);
