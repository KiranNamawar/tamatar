/**
 * Tamatar Platform Error Codes
 *
 * This file contains all error codes used by the Tamatar platform.
 * These codes are designed for frontend error handling and user feedback.
 * This file is exported for frontend consumption and matches the backend error codes.
 *
 * Import this file in your frontend application to handle errors consistently:
 *
 * ```typescript
 * import { ErrorCode } from './error-codes';
 *
 * if (error.code === ErrorCode.USERNAME_ALREADY_EXISTS) {
 *   // Handle username conflict
 * }
 * ```
 */
export enum ErrorCode {
	// ============================================
	// General System Errors (1000-1999)
	// ============================================
	/** Unexpected internal server error */
	INTERNAL_ERROR = "INTERNAL_ERROR",
	/** Service is temporarily unavailable */
	SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
	/** Database connection or query error */
	DATABASE_ERROR = "DATABASE_ERROR",
	/** Network connectivity issues */
	NETWORK_ERROR = "NETWORK_ERROR",
	/** Operation timed out */
	TIMEOUT_ERROR = "TIMEOUT_ERROR",
	// ============================================
	// Validation Errors (2000-2999)
	// ============================================
	/** Generic validation error */
	VALIDATION_ERROR = "VALIDATION_ERROR",
	/** Input data is invalid or malformed */
	INVALID_INPUT = "INVALID_INPUT",
	/** Required field is missing from input */
	MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",
	/** Field format is invalid */
	INVALID_FORMAT = "INVALID_FORMAT",
	/** Email address format is invalid */
	INVALID_EMAIL_FORMAT = "INVALID_EMAIL_FORMAT",
	/** Password doesn't meet complexity requirements */
	INVALID_PASSWORD_FORMAT = "INVALID_PASSWORD_FORMAT",
	/** Username format is invalid */
	INVALID_USERNAME_FORMAT = "INVALID_USERNAME_FORMAT",
	/** URL format is invalid */
	INVALID_URL_FORMAT = "INVALID_URL_FORMAT",
	/** UUID format is invalid */
	INVALID_UUID_FORMAT = "INVALID_UUID_FORMAT",
	/** Date format is invalid */
	INVALID_DATE_FORMAT = "INVALID_DATE_FORMAT",
	/** Field value is too short */
	FIELD_TOO_SHORT = "FIELD_TOO_SHORT",
	/** Field value is too long */
	FIELD_TOO_LONG = "FIELD_TOO_LONG",
	/** Enum value is not valid */
	INVALID_ENUM_VALUE = "INVALID_ENUM_VALUE",
	// ============================================
	// Authentication Errors (3000-3999)
	// ============================================
	/** Generic authentication error */
	AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR",
	/** User is not authenticated */
	UNAUTHENTICATED = "UNAUTHENTICATED",
	/** Invalid login credentials provided */
	INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
	/** JWT token is invalid */
	INVALID_TOKEN = "INVALID_TOKEN",
	/** JWT token has expired */
	TOKEN_EXPIRED = "TOKEN_EXPIRED",
	/** JWT token has been revoked */
	TOKEN_REVOKED = "TOKEN_REVOKED",
	/** JWT token is malformed */
	TOKEN_MALFORMED = "TOKEN_MALFORMED",
	/** User session has expired */
	SESSION_EXPIRED = "SESSION_EXPIRED",
	/** Session not found in database */
	SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
	/** Session already terminated */
	SESSION_ALREADY_TERMINATED = "SESSION_ALREADY_TERMINATED",
	/** Login required to access resource */
	LOGIN_REQUIRED = "LOGIN_REQUIRED",
	/** Email address not verified */
	EMAIL_NOT_VERIFIED = "EMAIL_NOT_VERIFIED",
	/** User account is suspended */
	ACCOUNT_SUSPENDED = "ACCOUNT_SUSPENDED",
	/** User account is locked due to security */
	ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
	/** Email verification token is invalid */
	INVALID_VERIFICATION_TOKEN = "INVALID_VERIFICATION_TOKEN",
	/** Email verification token has expired */
	VERIFICATION_TOKEN_EXPIRED = "VERIFICATION_TOKEN_EXPIRED",
	/** Password reset token is invalid */
	PASSWORD_RESET_TOKEN_INVALID = "PASSWORD_RESET_TOKEN_INVALID",
	/** Password reset token has expired */
	PASSWORD_RESET_TOKEN_EXPIRED = "PASSWORD_RESET_TOKEN_EXPIRED",
	/** Password reset token already used */
	PASSWORD_RESET_TOKEN_USED = "PASSWORD_RESET_TOKEN_USED",
	// ============================================
	// Authorization Errors (4000-4999)
	// ============================================
	/** Generic authorization error */
	AUTHORIZATION_ERROR = "AUTHORIZATION_ERROR",
	/** Access forbidden to resource */
	FORBIDDEN = "FORBIDDEN",
	/** User lacks required permissions */
	INSUFFICIENT_PERMISSIONS = "INSUFFICIENT_PERMISSIONS",
	/** Access denied to resource */
	ACCESS_DENIED = "ACCESS_DENIED",
	/** Admin role required for operation */
	ADMIN_ONLY = "ADMIN_ONLY",
	/** Moderator role required for operation */
	MODERATOR_REQUIRED = "MODERATOR_REQUIRED",
	/** Only resource owner can perform action */
	OWNER_ONLY = "OWNER_ONLY",
	// ============================================
	// Resource Not Found Errors (5000-5999)
	// ============================================
	/** Generic resource not found */
	NOT_FOUND = "NOT_FOUND",
	/** User not found by ID or username */
	USER_NOT_FOUND = "USER_NOT_FOUND",
	/** Project not found by ID */
	PROJECT_NOT_FOUND = "PROJECT_NOT_FOUND",
	/** Daily log entry not found */
	DAILY_LOG_NOT_FOUND = "DAILY_LOG_NOT_FOUND",
	/** Learning resource not found */
	RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
	/** Session not found in database */
	SESSION_NOT_FOUND_ERROR = "SESSION_NOT_FOUND_ERROR",
	/** Goal not found by ID */
	GOAL_NOT_FOUND = "GOAL_NOT_FOUND",
	/** Learning path not found */
	LEARNING_PATH_NOT_FOUND = "LEARNING_PATH_NOT_FOUND",
	/** Achievement not found */
	ACHIEVEMENT_NOT_FOUND = "ACHIEVEMENT_NOT_FOUND",
	/** Notification not found */
	NOTIFICATION_NOT_FOUND = "NOTIFICATION_NOT_FOUND",
	// ============================================
	// Conflict/Duplicate Errors (6000-6999)
	// ============================================
	/** Generic resource conflict */
	CONFLICT = "CONFLICT",
	/** Resource already exists with same identifier */
	RESOURCE_ALREADY_EXISTS = "RESOURCE_ALREADY_EXISTS",
	/** Email address already registered */
	EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
	/** Username already taken */
	USERNAME_ALREADY_EXISTS = "USERNAME_ALREADY_EXISTS",
	/** Project name already exists for user */
	PROJECT_NAME_ALREADY_EXISTS = "PROJECT_NAME_ALREADY_EXISTS",
	/** Resource URL already exists in database */
	RESOURCE_URL_ALREADY_EXISTS = "RESOURCE_URL_ALREADY_EXISTS",
	/** User is already being followed */
	ALREADY_FOLLOWING = "ALREADY_FOLLOWING",
	/** Resource already rated by user */
	ALREADY_RATED = "ALREADY_RATED",
	/** Daily log already exists for this date */
	DUPLICATE_DAILY_LOG = "DUPLICATE_DAILY_LOG",
	// ============================================
	// Rate Limiting Errors (7000-7999)
	// ============================================
	/** Generic rate limit exceeded */
	RATE_LIMIT_EXCEEDED = "RATE_LIMIT_EXCEEDED",
	/** Too many requests in time window */
	TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
	/** Too many login attempts */
	TOO_MANY_LOGIN_ATTEMPTS = "TOO_MANY_LOGIN_ATTEMPTS",
	/** Too many signup attempts */
	TOO_MANY_SIGNUP_ATTEMPTS = "TOO_MANY_SIGNUP_ATTEMPTS",
	/** Too many password reset attempts */
	TOO_MANY_PASSWORD_RESET_ATTEMPTS = "TOO_MANY_PASSWORD_RESET_ATTEMPTS",
	/** Too many email verification requests */
	TOO_MANY_EMAIL_VERIFICATIONS = "TOO_MANY_EMAIL_VERIFICATIONS",
	// ============================================
	// User Management Errors (8000-8999)
	// ============================================
	/** Failed to create new user account */
	USER_CREATION_FAILED = "USER_CREATION_FAILED",
	/** Failed to update user information */
	USER_UPDATE_FAILED = "USER_UPDATE_FAILED",
	/** Failed to delete user account */
	USER_DELETION_FAILED = "USER_DELETION_FAILED",
	/** Failed to update user profile */
	PROFILE_UPDATE_FAILED = "PROFILE_UPDATE_FAILED",
	/** Failed to update username */
	USERNAME_UPDATE_FAILED = "USERNAME_UPDATE_FAILED",
	/** Failed to change password */
	PASSWORD_CHANGE_FAILED = "PASSWORD_CHANGE_FAILED",
	/** Current password provided is incorrect */
	CURRENT_PASSWORD_INCORRECT = "CURRENT_PASSWORD_INCORRECT",
	/** New password is same as current password */
	NEW_PASSWORD_SAME_AS_CURRENT = "NEW_PASSWORD_SAME_AS_CURRENT",
	// ============================================
	// Project Management Errors (9000-9999)
	// ============================================
	/** Failed to create new project */
	PROJECT_CREATION_FAILED = "PROJECT_CREATION_FAILED",
	/** Failed to update project information */
	PROJECT_UPDATE_FAILED = "PROJECT_UPDATE_FAILED",
	/** Failed to delete project */
	PROJECT_DELETION_FAILED = "PROJECT_DELETION_FAILED",
	/** Access denied to project */
	PROJECT_ACCESS_DENIED = "PROJECT_ACCESS_DENIED",
	/** Invalid project status provided */
	INVALID_PROJECT_STATUS = "INVALID_PROJECT_STATUS",
	/** Project is already archived */
	PROJECT_ALREADY_ARCHIVED = "PROJECT_ALREADY_ARCHIVED",
	/** Cannot delete project that has associated logs */
	CANNOT_DELETE_PROJECT_WITH_LOGS = "CANNOT_DELETE_PROJECT_WITH_LOGS",
	// ============================================
	// Daily Log Errors (10000-10999)
	// ============================================
	/** Failed to create daily log entry */
	DAILY_LOG_CREATION_FAILED = "DAILY_LOG_CREATION_FAILED",
	/** Failed to update daily log entry */
	DAILY_LOG_UPDATE_FAILED = "DAILY_LOG_UPDATE_FAILED",
	/** Failed to delete daily log entry */
	DAILY_LOG_DELETION_FAILED = "DAILY_LOG_DELETION_FAILED",
	/** Access denied to daily log */
	DAILY_LOG_ACCESS_DENIED = "DAILY_LOG_ACCESS_DENIED",
	/** Mood value must be between 1-10 */
	INVALID_MOOD_VALUE = "INVALID_MOOD_VALUE",
	/** Cannot create log for future date */
	LOG_DATE_IN_FUTURE = "LOG_DATE_IN_FUTURE",
	/** Daily log already exists for this date */
	LOG_ALREADY_EXISTS_FOR_DATE = "LOG_ALREADY_EXISTS_FOR_DATE",
	// ============================================
	// Resource Management Errors (11000-11999)
	// ============================================
	/** Failed to create learning resource */
	RESOURCE_CREATION_FAILED = "RESOURCE_CREATION_FAILED",
	/** Failed to update learning resource */
	RESOURCE_UPDATE_FAILED = "RESOURCE_UPDATE_FAILED",
	/** Failed to delete learning resource */
	RESOURCE_DELETION_FAILED = "RESOURCE_DELETION_FAILED",
	/** Access denied to learning resource */
	RESOURCE_ACCESS_DENIED = "RESOURCE_ACCESS_DENIED",
	/** Invalid resource type provided */
	INVALID_RESOURCE_TYPE = "INVALID_RESOURCE_TYPE",
	/** Invalid difficulty level specified */
	INVALID_DIFFICULTY_LEVEL = "INVALID_DIFFICULTY_LEVEL",
	/** Resource URL is not accessible */
	RESOURCE_URL_UNREACHABLE = "RESOURCE_URL_UNREACHABLE",
	/** Failed to rate resource */
	RESOURCE_RATING_FAILED = "RESOURCE_RATING_FAILED",
	/** Rating value must be between 1-5 */
	INVALID_RATING_VALUE = "INVALID_RATING_VALUE",
	// ============================================
	// Social Features Errors (12000-12999)
	// ============================================
	/** Failed to follow user */
	FOLLOW_OPERATION_FAILED = "FOLLOW_OPERATION_FAILED",
	/** Failed to unfollow user */
	UNFOLLOW_OPERATION_FAILED = "UNFOLLOW_OPERATION_FAILED",
	/** Cannot follow yourself */
	CANNOT_FOLLOW_SELF = "CANNOT_FOLLOW_SELF",
	/** User is already being followed */
	USER_ALREADY_FOLLOWED = "USER_ALREADY_FOLLOWED",
	/** User is not being followed */
	USER_NOT_FOLLOWED = "USER_NOT_FOLLOWED",
	/** Failed to send mentorship request */
	MENTORSHIP_REQUEST_FAILED = "MENTORSHIP_REQUEST_FAILED",
	/** Mentorship request already sent */
	MENTORSHIP_ALREADY_REQUESTED = "MENTORSHIP_ALREADY_REQUESTED",
	/** Cannot request mentorship from yourself */
	CANNOT_MENTOR_SELF = "CANNOT_MENTOR_SELF",
	// ============================================
	// Learning Path Errors (13000-13999)
	// ============================================
	/** Failed to create learning path */
	LEARNING_PATH_CREATION_FAILED = "LEARNING_PATH_CREATION_FAILED",
	/** Failed to update learning path */
	LEARNING_PATH_UPDATE_FAILED = "LEARNING_PATH_UPDATE_FAILED",
	/** Failed to delete learning path */
	LEARNING_PATH_DELETION_FAILED = "LEARNING_PATH_DELETION_FAILED",
	/** Access denied to learning path */
	LEARNING_PATH_ACCESS_DENIED = "LEARNING_PATH_ACCESS_DENIED",
	/** Invalid learning path status */
	INVALID_LEARNING_PATH_STATUS = "INVALID_LEARNING_PATH_STATUS",
	/** Already enrolled in this learning path */
	LEARNING_PATH_ALREADY_ENROLLED = "LEARNING_PATH_ALREADY_ENROLLED",
	/** Prerequisite course not completed */
	PREREQUISITE_NOT_COMPLETED = "PREREQUISITE_NOT_COMPLETED",
	// ============================================
	// Goal Management Errors (14000-14999)
	// ============================================
	/** Failed to create goal */
	GOAL_CREATION_FAILED = "GOAL_CREATION_FAILED",
	/** Failed to update goal */
	GOAL_UPDATE_FAILED = "GOAL_UPDATE_FAILED",
	/** Failed to delete goal */
	GOAL_DELETION_FAILED = "GOAL_DELETION_FAILED",
	/** Access denied to goal */
	GOAL_ACCESS_DENIED = "GOAL_ACCESS_DENIED",
	/** Invalid goal type specified */
	INVALID_GOAL_TYPE = "INVALID_GOAL_TYPE",
	/** Invalid goal status specified */
	INVALID_GOAL_STATUS = "INVALID_GOAL_STATUS",
	/** Goal is already marked as completed */
	GOAL_ALREADY_COMPLETED = "GOAL_ALREADY_COMPLETED",
	/** Goal target date has already passed */
	GOAL_TARGET_DATE_PASSED = "GOAL_TARGET_DATE_PASSED",
	// ============================================
	// File Upload Errors (15000-15999)
	// ============================================
	/** Failed to upload file */
	FILE_UPLOAD_FAILED = "FILE_UPLOAD_FAILED",
	/** File size exceeds maximum limit */
	FILE_TOO_LARGE = "FILE_TOO_LARGE",
	/** File type not supported */
	INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
	/** Failed to process uploaded file */
	FILE_PROCESSING_FAILED = "FILE_PROCESSING_FAILED",
	/** Failed to process image file */
	IMAGE_PROCESSING_FAILED = "IMAGE_PROCESSING_FAILED",
	/** Error storing file in storage system */
	FILE_STORAGE_ERROR = "FILE_STORAGE_ERROR",
	// ============================================
	// GitHub Integration Errors (16000-16999)
	// ============================================
	/** Failed to connect to GitHub */
	GITHUB_CONNECTION_FAILED = "GITHUB_CONNECTION_FAILED",
	/** GitHub authentication failed */
	GITHUB_AUTH_FAILED = "GITHUB_AUTH_FAILED",
	/** GitHub API returned an error */
	GITHUB_API_ERROR = "GITHUB_API_ERROR",
	/** GitHub API rate limit exceeded */
	GITHUB_RATE_LIMIT_EXCEEDED = "GITHUB_RATE_LIMIT_EXCEEDED",
	/** GitHub repository not found */
	GITHUB_REPOSITORY_NOT_FOUND = "GITHUB_REPOSITORY_NOT_FOUND",
	/** Access denied to GitHub resource */
	GITHUB_ACCESS_DENIED = "GITHUB_ACCESS_DENIED",
	/** Failed to sync GitHub data */
	GITHUB_SYNC_FAILED = "GITHUB_SYNC_FAILED",
	/** GitHub access token is invalid */
	INVALID_GITHUB_TOKEN = "INVALID_GITHUB_TOKEN",
	// ============================================
	// Email Service Errors (17000-17999)
	// ============================================
	/** Failed to send email */
	EMAIL_SEND_FAILED = "EMAIL_SEND_FAILED",
	/** Email template processing error */
	EMAIL_TEMPLATE_ERROR = "EMAIL_TEMPLATE_ERROR",
	/** Email service is unavailable */
	EMAIL_SERVICE_UNAVAILABLE = "EMAIL_SERVICE_UNAVAILABLE",
	/** Email template is invalid or malformed */
	INVALID_EMAIL_TEMPLATE = "INVALID_EMAIL_TEMPLATE",
	/** Failed to queue email for sending */
	EMAIL_QUEUE_FAILED = "EMAIL_QUEUE_FAILED",
	// ============================================
	// Analytics Errors (18000-18999)
	// ============================================
	/** Failed to generate analytics data */
	ANALYTICS_GENERATION_FAILED = "ANALYTICS_GENERATION_FAILED",
	/** Insufficient data to generate analytics */
	INSUFFICIENT_DATA_FOR_ANALYTICS = "INSUFFICIENT_DATA_FOR_ANALYTICS",
	/** Access denied to analytics data */
	ANALYTICS_ACCESS_DENIED = "ANALYTICS_ACCESS_DENIED",
	/** Invalid date range for analytics query */
	INVALID_DATE_RANGE = "INVALID_DATE_RANGE",
	// ============================================
	// Notification Errors (19000-19999)
	// ============================================
	/** Failed to create notification */
	NOTIFICATION_CREATION_FAILED = "NOTIFICATION_CREATION_FAILED",
	/** Failed to update notification */
	NOTIFICATION_UPDATE_FAILED = "NOTIFICATION_UPDATE_FAILED",
	/** Failed to delete notification */
	NOTIFICATION_DELETION_FAILED = "NOTIFICATION_DELETION_FAILED",
	/** Access denied to notification */
	NOTIFICATION_ACCESS_DENIED = "NOTIFICATION_ACCESS_DENIED",
	/** Invalid notification type specified */
	INVALID_NOTIFICATION_TYPE = "INVALID_NOTIFICATION_TYPE",
	// ============================================
	// Focus Session Errors (20000-20999)
	// ============================================
	/** Failed to create focus session */
	FOCUS_SESSION_CREATION_FAILED = "FOCUS_SESSION_CREATION_FAILED",
	/** Failed to update focus session */
	FOCUS_SESSION_UPDATE_FAILED = "FOCUS_SESSION_UPDATE_FAILED",
	/** Focus session is already active */
	FOCUS_SESSION_ALREADY_ACTIVE = "FOCUS_SESSION_ALREADY_ACTIVE",
	/** No active focus session found */
	NO_ACTIVE_FOCUS_SESSION = "NO_ACTIVE_FOCUS_SESSION" /** Invalid focus session duration */,
	INVALID_FOCUS_DURATION = "INVALID_FOCUS_DURATION",
}

/**
 * Standard API response interfaces for frontend consumption
 */
export interface SuccessResponse<T = unknown> {
	success: true;
	data: T;
	message?: string;
}

export interface ErrorResponse {
	success: false;
	error: string;
	code?: string;
	details?: Record<string, unknown>;
}

/**
 * Type guard to check if a response is an error
 */
export function isErrorResponse(response: any): response is ErrorResponse {
	return response && response.success === false;
}

/**
 * Type guard to check if a response is successful
 */
export function isSuccessResponse<T>(
	response: any,
): response is SuccessResponse<T> {
	return response && response.success === true;
}