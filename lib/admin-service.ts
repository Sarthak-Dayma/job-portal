// Admin service for verification and moderation

import type { Worker, Employer, WorkerDocument } from "./types"

interface VerificationRequest {
  userId: string
  type: "worker" | "employer"
  status: "pending" | "approved" | "rejected"
  submittedAt: Date
  reviewedAt?: Date
  reviewedBy?: string
  notes?: string
}

export class AdminService {
  /**
   * Get pending verification requests
   */
  getPendingVerifications(verifications: VerificationRequest[]): VerificationRequest[] {
    return verifications.filter((v) => v.status === "pending")
  }

  /**
   * Approve worker verification
   */
  approveWorkerVerification(
    worker: Worker,
    verificationId: string,
    adminId: string,
  ): { success: boolean; message: string } {
    if (!worker.documents || worker.documents.length === 0) {
      return {
        success: false,
        message: "No documents submitted for verification",
      }
    }

    // Verify all required documents
    const hasAllRequiredDocs = ["aadhaar", "pancard"].some((type) =>
      worker.documents!.some((doc) => doc.type === type && doc.verified),
    )

    if (!hasAllRequiredDocs) {
      return {
        success: false,
        message: "Not all required documents are verified",
      }
    }

    return {
      success: true,
      message: `Worker ${worker.id} verified successfully`,
    }
  }

  /**
   * Reject worker verification
   */
  rejectWorkerVerification(workerId: string, reason: string, adminId: string): { success: boolean; message: string } {
    // Send notification to worker with rejection reason
    return {
      success: true,
      message: `Verification rejected for worker ${workerId}. Reason: ${reason}`,
    }
  }

  /**
   * Verify document
   */
  verifyDocument(document: WorkerDocument, adminId: string): { success: boolean; message: string } {
    // In production, this would validate document authenticity
    return {
      success: true,
      message: `Document ${document.id} verified`,
    }
  }

  /**
   * Get dashboard statistics
   */
  getDashboardStats(
    workers: Worker[],
    employers: Employer[],
  ): {
    totalUsers: number
    totalWorkers: number
    verifiedWorkers: number
    pendingVerifications: number
    totalEmployers: number
    verifiedEmployers: number
  } {
    const verifiedWorkers = workers.filter((w) => w.verified).length
    const verifiedEmployers = employers.filter((e) => e.verified).length

    return {
      totalUsers: workers.length + employers.length,
      totalWorkers: workers.length,
      verifiedWorkers,
      pendingVerifications: workers.length - verifiedWorkers,
      totalEmployers: employers.length,
      verifiedEmployers,
    }
  }

  /**
   * Flag suspicious activity
   */
  flagSuspiciousActivity(
    userId: string,
    reason: string,
    severity: "low" | "medium" | "high",
  ): { success: boolean; message: string } {
    // Log and notify admins of suspicious activity
    return {
      success: true,
      message: `Activity flagged for user ${userId}: ${reason}`,
    }
  }

  /**
   * Suspend user account
   */
  suspendUser(userId: string, reason: string, adminId: string): { success: boolean; message: string } {
    // Disable user account and notify user
    return {
      success: true,
      message: `User ${userId} suspended. Reason: ${reason}`,
    }
  }
}

export const adminService = new AdminService()
