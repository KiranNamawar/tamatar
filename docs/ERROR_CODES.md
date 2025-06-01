# Tamatar Error Codes Reference

This document provides a comprehensive reference for error codes used in the Tamatar platform. These error codes are designed to help frontend developers implement proper error handling and provide meaningful feedback to users.

## Implementation

All error codes are implemented in the TypeScript enum at:
```
src/types/error-codes.ts
```

This file contains the complete `ErrorCode` enum and utility types for handling API responses, and can be imported directly in your frontend code:

```typescript
import { ErrorCode, isErrorResponse } from '@/types/error-codes';

// Handle specific error codes
if (error.code === ErrorCode.USERNAME_ALREADY_EXISTS) {
  // Show username conflict message
}
```

## Error Response Structure

All API errors follow this consistent structure:

```typescript
interface ErrorResponse {
  success: false;
  error: string;           // Human-readable error message
  code?: string;          // Machine-readable error code (from ErrorCode enum)
  details?: Record<string, unknown>; // Additional context
}
```

## Error Code Categories

Error codes are organized in a hierarchical numbering system by domain:

### 1000-1999: General System Errors
These are infrastructure-level errors that typically require system admin attention.

| Code | Description | Typical User Action |
|------|-------------|-------------------|
| `INTERNAL_ERROR` | Unexpected server error | Show generic error, retry later |
| `SERVICE_UNAVAILABLE` | Service temporarily down | Show maintenance message |
| `DATABASE_ERROR` | Database connectivity issues | Retry or show service unavailable |
| `NETWORK_ERROR` | Network connectivity problems | Check connection, retry |
| `TIMEOUT_ERROR` | Operation took too long | Retry with shorter timeout |

### 2000-2999: Validation Errors
Input validation failures - user can fix these by correcting their input.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `VALIDATION_ERROR` | Generic validation failure | Show field-specific errors |
| `INVALID_INPUT` | Malformed input data | Highlight invalid fields |
| `MISSING_REQUIRED_FIELD` | Required field missing | Mark required fields |
| `INVALID_FORMAT` | Format validation failed | Show format requirements |
| `INVALID_EMAIL_FORMAT` | Email format invalid | Show email format example |
| `INVALID_PASSWORD_FORMAT` | Password doesn't meet requirements | Show password requirements |
| `INVALID_USERNAME_FORMAT` | Username format invalid | Show username rules |
| `INVALID_URL_FORMAT` | URL format invalid | Show URL format example |
| `INVALID_DATE_FORMAT` | Date format invalid | Show expected date format |
| `INVALID_UUID_FORMAT` | UUID format invalid | Internal error, contact support |
| `FIELD_TOO_SHORT` | Field below minimum length | Show minimum length requirement |
| `FIELD_TOO_LONG` | Field exceeds maximum length | Show character limit |
| `INVALID_ENUM_VALUE` | Invalid option selected | Show valid options |

### 3000-3999: Authentication Errors
Authentication-related errors requiring user login or token refresh.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `AUTHENTICATION_ERROR` | Generic auth error | Redirect to login |
| `INVALID_CREDENTIALS` | Wrong username/password | Show login error message |
| `TOKEN_EXPIRED` | Access token expired | Refresh token or redirect to login |
| `TOKEN_INVALID` | Malformed/invalid token | Clear token, redirect to login |
| `TOKEN_MISSING` | No token provided | Redirect to login |
| `REFRESH_TOKEN_EXPIRED` | Refresh token expired | Redirect to login |
| `REFRESH_TOKEN_INVALID` | Invalid refresh token | Clear tokens, redirect to login |
| `SESSION_EXPIRED` | User session expired | Show session expired message |
| `SESSION_INVALID` | Invalid session | Clear session, redirect to login |
| `ACCOUNT_NOT_VERIFIED` | Email not verified | Show verification prompt |
| `ACCOUNT_LOCKED` | Account temporarily locked | Show account locked message |
| `ACCOUNT_SUSPENDED` | Account suspended | Show suspension notice |
| `PASSWORD_RESET_REQUIRED` | Must reset password | Redirect to password reset |
| `MFA_REQUIRED` | Multi-factor auth required | Show MFA prompt |
| `MFA_CODE_INVALID` | Invalid MFA code | Show MFA error |
| `LOGIN_ATTEMPT_BLOCKED` | Too many failed attempts | Show cooldown message |
| `DEVICE_NOT_RECOGNIZED` | New device login | Show device verification |
| `CONCURRENT_LOGIN_LIMIT` | Too many active sessions | Show session management |

### 4000-4999: Authorization Errors
Permission-related errors - user lacks necessary permissions.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `AUTHORIZATION_ERROR` | Generic permission error | Show "access denied" message |
| `INSUFFICIENT_PERMISSIONS` | User lacks required role | Show upgrade prompt or contact admin |
| `RESOURCE_ACCESS_DENIED` | Cannot access specific resource | Hide resource or show locked state |
| `ACTION_NOT_ALLOWED` | Action not permitted | Disable action button |
| `ADMIN_REQUIRED` | Admin privileges required | Show admin-only message |
| `OWNER_REQUIRED` | Resource owner access required | Show ownership requirement |
| `TEAM_MEMBER_REQUIRED` | Team membership required | Show team join prompt |

### 5000-5999: Resource Not Found Errors
Requested resources don't exist.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `NOT_FOUND` | Generic resource not found | Show 404 page |
| `USER_NOT_FOUND` | User doesn't exist | Show user not found message |
| `PROJECT_NOT_FOUND` | Project doesn't exist | Redirect to projects list |
| `DAILY_LOG_NOT_FOUND` | Daily log doesn't exist | Redirect to logs list |
| `RESOURCE_NOT_FOUND` | Learning resource not found | Remove from list |
| `SESSION_NOT_FOUND` | Session doesn't exist | Clear session, redirect to login |
| `LEARNING_PATH_NOT_FOUND` | Learning path doesn't exist | Show path not found |
| `GOAL_NOT_FOUND` | Goal doesn't exist | Remove from goals list |
| `GITHUB_REPO_NOT_FOUND` | GitHub repository not found | Show repo connection error |
| `COMMENT_NOT_FOUND` | Comment doesn't exist | Remove from comments |

### 6000-6999: Conflict/Duplicate Errors
Resource conflicts or uniqueness constraint violations.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `CONFLICT` | Generic resource conflict | Show conflict resolution options |
| `USERNAME_ALREADY_EXISTS` | Username taken | Suggest alternative usernames |
| `EMAIL_ALREADY_EXISTS` | Email already registered | Show "already registered" message |
| `PROJECT_NAME_ALREADY_EXISTS` | Project name taken | Suggest alternative names |
| `RESOURCE_URL_ALREADY_EXISTS` | Resource URL duplicate | Show existing resource |
| `GOAL_ALREADY_EXISTS` | Similar goal exists | Show existing goal |
| `LEARNING_PATH_NAME_EXISTS` | Path name taken | Suggest alternative names |
| `TAG_ALREADY_EXISTS` | Tag name taken | Use existing tag |
| `CATEGORY_ALREADY_EXISTS` | Category exists | Use existing category |

### 7000-7999: Rate Limiting Errors
Request frequency limits exceeded.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `RATE_LIMIT_EXCEEDED` | Generic rate limit | Show cooldown timer |
| `LOGIN_RATE_LIMIT_EXCEEDED` | Too many login attempts | Show lockout timer |
| `API_RATE_LIMIT_EXCEEDED` | API request limit hit | Implement exponential backoff |
| `EMAIL_RATE_LIMIT_EXCEEDED` | Email sending limit | Disable email actions temporarily |
| `GITHUB_RATE_LIMIT_EXCEEDED` | GitHub API limit | Show GitHub status |
| `SEARCH_RATE_LIMIT_EXCEEDED` | Search request limit | Debounce search input |

### 8000-8999: User Management Errors
User account and profile management errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `USER_CREATION_FAILED` | User creation error | Show registration error |
| `USER_UPDATE_FAILED` | Profile update error | Show save error |
| `USER_DELETION_FAILED` | Account deletion error | Show deletion error |
| `PROFILE_INCOMPLETE` | Missing profile data | Show profile completion prompt |
| `INVALID_USER_STATUS` | Invalid user state | Contact support |
| `USER_ALREADY_EXISTS` | User already exists | Show existing account message |
| `USER_DEACTIVATED` | Account deactivated | Show reactivation options |
| `USER_PROFILE_LOCKED` | Profile editing locked | Show lock reason |
| `AVATAR_UPLOAD_FAILED` | Avatar upload error | Show upload error |

### 9000-9999: Project Management Errors
Project-related operation errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `PROJECT_CREATION_FAILED` | Project creation error | Show creation error |
| `PROJECT_UPDATE_FAILED` | Project update error | Show save error |
| `PROJECT_DELETION_FAILED` | Project deletion error | Show deletion error |
| `PROJECT_LIMIT_EXCEEDED` | Too many projects | Show upgrade prompt |
| `PROJECT_ACCESS_DENIED` | Cannot access project | Show permission error |
| `INVALID_PROJECT_STATUS` | Invalid status transition | Show valid statuses |
| `PROJECT_ARCHIVE_FAILED` | Archive operation failed | Show archive error |

### 10000-10999: Daily Log Errors
Daily logging operation errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `DAILY_LOG_CREATION_FAILED` | Log creation error | Show save error |
| `DAILY_LOG_UPDATE_FAILED` | Log update error | Show update error |
| `DAILY_LOG_DELETION_FAILED` | Log deletion error | Show deletion error |
| `DAILY_LOG_DATE_CONFLICT` | Date already has log | Show existing log |
| `DAILY_LOG_LIMIT_EXCEEDED` | Too many logs | Show limit message |
| `DAILY_LOG_ACCESS_DENIED` | Cannot access log | Show permission error |
| `INVALID_LOG_DATE` | Invalid date for log | Show date validation |

### 11000-11999: Resource Management Errors
Learning resource management errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `RESOURCE_CREATION_FAILED` | Resource creation error | Show creation error |
| `RESOURCE_UPDATE_FAILED` | Resource update error | Show update error |
| `RESOURCE_DELETION_FAILED` | Resource deletion error | Show deletion error |
| `RESOURCE_URL_INVALID` | Invalid resource URL | Show URL validation |
| `RESOURCE_FETCH_FAILED` | Cannot fetch resource | Show fetch error |
| `RESOURCE_PARSE_FAILED` | Cannot parse resource | Show format error |
| `RESOURCE_ACCESS_DENIED` | Cannot access resource | Show permission error |
| `DUPLICATE_RESOURCE` | Resource already exists | Show existing resource |
| `RESOURCE_CATEGORY_INVALID` | Invalid category | Show valid categories |
| `RESOURCE_RATING_FAILED` | Rating submission failed | Show rating error |

### 12000-12999: Social Features Errors
Social interaction and community errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `FOLLOW_FAILED` | Follow operation failed | Show follow error |
| `UNFOLLOW_FAILED` | Unfollow operation failed | Show unfollow error |
| `ALREADY_FOLLOWING` | Already following user | Update follow state |
| `CANNOT_FOLLOW_SELF` | Cannot follow yourself | Show self-follow error |
| `COMMENT_CREATION_FAILED` | Comment creation error | Show comment error |
| `COMMENT_UPDATE_FAILED` | Comment update error | Show update error |
| `COMMENT_DELETION_FAILED` | Comment deletion error | Show deletion error |
| `INVALID_COMMENT_CONTENT` | Invalid comment content | Show content validation |

### 13000-13999: Learning Path Errors
Learning path and curriculum errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `LEARNING_PATH_CREATION_FAILED` | Path creation error | Show creation error |
| `LEARNING_PATH_UPDATE_FAILED` | Path update error | Show update error |
| `LEARNING_PATH_DELETION_FAILED` | Path deletion error | Show deletion error |
| `LEARNING_PATH_ENROLLMENT_FAILED` | Enrollment error | Show enrollment error |
| `LEARNING_PATH_PROGRESS_FAILED` | Progress update error | Show progress error |
| `LEARNING_PATH_COMPLETION_FAILED` | Completion error | Show completion error |
| `INVALID_LEARNING_PATH_STEP` | Invalid step in path | Show step validation |

### 14000-14999: Goal Management Errors
Goal setting and tracking errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `GOAL_CREATION_FAILED` | Goal creation error | Show creation error |
| `GOAL_UPDATE_FAILED` | Goal update error | Show update error |
| `GOAL_DELETION_FAILED` | Goal deletion error | Show deletion error |
| `GOAL_PROGRESS_FAILED` | Progress update error | Show progress error |
| `GOAL_COMPLETION_FAILED` | Completion error | Show completion error |
| `INVALID_GOAL_TYPE` | Invalid goal type | Show valid types |
| `GOAL_DEADLINE_PASSED` | Goal deadline expired | Show deadline options |
| `GOAL_LIMIT_EXCEEDED` | Too many active goals | Show limit message |

### 15000-15999: File Upload Errors
File upload and media management errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `FILE_UPLOAD_FAILED` | File upload error | Show upload error |
| `FILE_TOO_LARGE` | File exceeds size limit | Show size limit |
| `INVALID_FILE_TYPE` | Unsupported file type | Show supported types |
| `FILE_PROCESSING_FAILED` | File processing error | Show processing error |
| `STORAGE_QUOTA_EXCEEDED` | Storage limit reached | Show quota message |
| `FILE_VIRUS_DETECTED` | File contains malware | Show security warning |

### 16000-16999: GitHub Integration Errors
GitHub API and integration errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `GITHUB_CONNECTION_FAILED` | GitHub connection error | Show connection instructions |
| `GITHUB_TOKEN_INVALID` | Invalid GitHub token | Reconnect GitHub account |
| `GITHUB_RATE_LIMIT_EXCEEDED` | GitHub API rate limit | Show GitHub status |
| `GITHUB_REPO_ACCESS_DENIED` | Cannot access repository | Show permission error |
| `GITHUB_WEBHOOK_FAILED` | Webhook setup failed | Show webhook error |
| `GITHUB_SYNC_FAILED` | Data sync failed | Show sync error |
| `GITHUB_OAUTH_FAILED` | OAuth authorization failed | Retry GitHub connection |
| `GITHUB_API_ERROR` | GitHub API error | Show GitHub status |

### 17000-17999: Email Service Errors
Email delivery and template errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `EMAIL_SEND_FAILED` | Email sending failed | Show email error |
| `EMAIL_TEMPLATE_ERROR` | Template rendering error | Contact support |
| `EMAIL_VALIDATION_FAILED` | Email validation failed | Show validation error |
| `EMAIL_BOUNCE_DETECTED` | Email bounced | Update email address |
| `EMAIL_SPAM_DETECTED` | Email marked as spam | Contact support |

### 18000-18999: Analytics Errors
Analytics and reporting errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `ANALYTICS_PROCESSING_FAILED` | Analytics processing error | Show processing error |
| `ANALYTICS_DATA_INVALID` | Invalid analytics data | Contact support |
| `ANALYTICS_EXPORT_FAILED` | Export operation failed | Show export error |
| `ANALYTICS_PERMISSION_DENIED` | Cannot access analytics | Show permission error |

### 19000-19999: Notification Errors
Notification delivery and management errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `NOTIFICATION_SEND_FAILED` | Notification sending failed | Show notification error |
| `NOTIFICATION_CHANNEL_INVALID` | Invalid notification channel | Update notification settings |
| `NOTIFICATION_PERMISSION_DENIED` | No notification permission | Request notification permission |
| `NOTIFICATION_TEMPLATE_ERROR` | Template rendering error | Contact support |
| `NOTIFICATION_RATE_LIMIT_EXCEEDED` | Too many notifications | Show rate limit message |

### 20000-20999: Focus Session Errors
Focus session and productivity tracking errors.

| Code | Description | Frontend Handling |
|------|-------------|------------------|
| `FOCUS_SESSION_START_FAILED` | Session start error | Show start error |
| `FOCUS_SESSION_END_FAILED` | Session end error | Show end error |
| `FOCUS_SESSION_NOT_ACTIVE` | No active session | Refresh session state |
| `FOCUS_SESSION_ALREADY_ACTIVE` | Session already running | Show active session |
| `FOCUS_SESSION_DATA_INVALID` | Invalid session data | Restart session |

## Frontend Implementation Examples

### Error Handling in React/TypeScript

```typescript
// Error handling hook
function useErrorHandler() {
  const showToast = useToast();
  
  const handleError = (error: ErrorResponse) => {
    switch (error.code) {
      case 'AUTHENTICATION_ERROR':
      case 'TOKEN_EXPIRED':
        // Redirect to login
        router.push('/login');
        break;
        
      case 'VALIDATION_ERROR':
        // Show field-specific errors
        showToast(error.error, 'error');
        break;
        
      case 'RATE_LIMIT_EXCEEDED':
        // Show rate limit message with retry timer
        const resetTime = error.details?.resetTime;
        showToast(`Rate limit exceeded. Try again ${resetTime}`, 'warning');
        break;
        
      default:
        // Generic error handling
        showToast(error.error || 'An unexpected error occurred', 'error');
    }
  };
  
  return { handleError };
}

// API call with error handling
async function createProject(data: ProjectInput) {
  try {
    const response = await api.post('/projects', data);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      handleError(error.response.data);
    }
    throw error;
  }
}
```

### Error Display Components

```typescript
// Error boundary component
function ErrorDisplay({ error }: { error: ErrorResponse }) {
  const getErrorIcon = (code?: string) => {
    if (code?.includes('AUTH')) return <LockIcon />;
    if (code?.includes('VALIDATION')) return <AlertIcon />;
    if (code?.includes('NOT_FOUND')) return <SearchIcon />;
    return <ErrorIcon />;
  };
  
  const getErrorAction = (code?: string) => {
    if (code?.includes('AUTH')) {
      return <Button onClick={() => router.push('/login')}>Login</Button>;
    }
    if (code?.includes('RATE_LIMIT')) {
      return <Button disabled>Retry in {getRetryTime(error.details)}</Button>;
    }
    return <Button onClick={() => window.location.reload()}>Retry</Button>;
  };
  
  return (
    <div className="error-display">
      {getErrorIcon(error.code)}
      <h3>{error.error}</h3>
      {error.details && (
        <pre>{JSON.stringify(error.details, null, 2)}</pre>
      )}
      {getErrorAction(error.code)}
    </div>
  );
}
```

## Best Practices

### 1. Always Check Error Codes
```typescript
// ✅ Good - Check specific error codes
if (error.code === 'USERNAME_ALREADY_EXISTS') {
  suggestAlternativeUsernames(error.details?.suggestions);
}

// ❌ Bad - Only check error message
if (error.error.includes('username')) {
  // Fragile string matching
}
```

### 2. Provide User-Friendly Messages
```typescript
// ✅ Good - User-friendly error messages
const getUserFriendlyMessage = (code: string) => {
  switch (code) {
    case 'USERNAME_ALREADY_EXISTS':
      return 'That username is taken. Try adding numbers or underscores.';
    case 'RATE_LIMIT_EXCEEDED':
      return 'Whoa, slow down! Please wait a moment before trying again.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

// ❌ Bad - Exposing technical errors
showToast(error.error); // "Unique constraint violation on users.username"
```

### 3. Handle Network Errors Gracefully
```typescript
// ✅ Good - Distinguish between different error types
try {
  const result = await apiCall();
} catch (error) {
  if (error.code === 'NETWORK_ERROR') {
    showOfflineMessage();
  } else if (error.code === 'TIMEOUT_ERROR') {
    showRetryOption();
  } else {
    handleError(error);
  }
}
```

### 4. Log Errors for Debugging
```typescript
// ✅ Good - Log errors with context
const logError = (error: ErrorResponse, context: string) => {
  console.error('API Error:', {
    code: error.code,
    message: error.error,
    details: error.details,
    context,
    timestamp: new Date().toISOString(),
    userId: getCurrentUser()?.id,
  });
};
```

This error code system is designed to provide consistent, actionable error handling across the entire Tamatar platform. Always use the specific error codes rather than generic error messages to provide the best user experience.
