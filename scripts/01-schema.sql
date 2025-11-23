-- ShramSaathi Database Schema
-- This script creates the core tables for the job marketplace platform

-- Users table - stores all user types (workers, employers, admins)
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  role ENUM('worker', 'employer', 'admin') NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_phone (phone),
  INDEX idx_role (role),
  INDEX idx_verified (verified)
);

-- Workers table - extends users with worker-specific data
CREATE TABLE IF NOT EXISTS workers (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) UNIQUE NOT NULL,
  bio TEXT,
  avatar_url VARCHAR(255),
  rating DECIMAL(3, 2) DEFAULT 0,
  total_jobs INT DEFAULT 0,
  years_experience INT,
  hourly_rate INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_rating (rating),
  INDEX idx_total_jobs (total_jobs)
);

-- Worker skills table - normalized skills for workers
CREATE TABLE IF NOT EXISTS worker_skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  worker_id VARCHAR(36) NOT NULL,
  skill VARCHAR(100) NOT NULL,
  proficiency_level ENUM('beginner', 'intermediate', 'expert') DEFAULT 'intermediate',
  FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE,
  UNIQUE KEY unique_worker_skill (worker_id, skill),
  INDEX idx_worker (worker_id)
);

-- Employers table - extends users with employer-specific data
CREATE TABLE IF NOT EXISTS employers (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url VARCHAR(255),
  rating DECIMAL(3, 2) DEFAULT 0,
  total_jobs_posted INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_company_name (company_name)
);

-- Jobs table - job postings
CREATE TABLE IF NOT EXISTS jobs (
  id VARCHAR(36) PRIMARY KEY,
  employer_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  wage_amount INT NOT NULL,
  wage_period ENUM('hourly', 'daily', 'weekly', 'fixed') DEFAULT 'daily',
  wage_currency VARCHAR(3) DEFAULT 'INR',
  start_date DATE NOT NULL,
  end_date DATE,
  status ENUM('active', 'filled', 'completed', 'cancelled') DEFAULT 'active',
  applicants_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employer_id) REFERENCES employers(id) ON DELETE CASCADE,
  INDEX idx_employer (employer_id),
  INDEX idx_status (status),
  INDEX idx_category (category),
  INDEX idx_location (location),
  INDEX idx_start_date (start_date),
  FULLTEXT INDEX ft_title_description (title, description)
);

-- Job skills table - required skills for jobs
CREATE TABLE IF NOT EXISTS job_skills (
  id INT PRIMARY KEY AUTO_INCREMENT,
  job_id VARCHAR(36) NOT NULL,
  skill VARCHAR(100) NOT NULL,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  UNIQUE KEY unique_job_skill (job_id, skill),
  INDEX idx_job (job_id)
);

-- Job applications table - worker applications for jobs
CREATE TABLE IF NOT EXISTS job_applications (
  id VARCHAR(36) PRIMARY KEY,
  job_id VARCHAR(36) NOT NULL,
  worker_id VARCHAR(36) NOT NULL,
  status ENUM('applied', 'accepted', 'rejected', 'completed') DEFAULT 'applied',
  cover_letter TEXT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP,
  completed_at TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE,
  UNIQUE KEY unique_application (job_id, worker_id),
  INDEX idx_job (job_id),
  INDEX idx_worker (worker_id),
  INDEX idx_status (status)
);

-- Worker documents table - verification documents
CREATE TABLE IF NOT EXISTS worker_documents (
  id VARCHAR(36) PRIMARY KEY,
  worker_id VARCHAR(36) NOT NULL,
  document_type ENUM('aadhaar', 'pancard', 'bankaccount', 'other') NOT NULL,
  document_url VARCHAR(255) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  verification_notes TEXT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE,
  INDEX idx_worker (worker_id),
  INDEX idx_verified (verified)
);

-- Admin logs table - audit trail for admin actions
CREATE TABLE IF NOT EXISTS admin_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  admin_id VARCHAR(36) NOT NULL,
  action VARCHAR(255) NOT NULL,
  target_user_id VARCHAR(36),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id),
  INDEX idx_admin (admin_id),
  INDEX idx_created_at (created_at)
);
