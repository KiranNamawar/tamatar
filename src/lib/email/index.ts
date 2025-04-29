/**
 * Email module
 * This module handles email sending functionalities.
 * It exports functions for sending emails using the Resend service.
 * 
 */

// Exports basic sendEmail function which can be used to send any email
export * from './send';

// Exports specific email functions for sending verification and password reset emails
export * from './auth';