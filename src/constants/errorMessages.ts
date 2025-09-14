// src/constants/errorMessages.ts
export const ErrorMessages = {
    // General Errors
    INTERNAL_SERVER_ERROR: 'An unexpected server error occurred. Please try again later or contact support if the issue persists.',
    OPERATION_FAILED: 'Operation failed to complete.',

    // Authentication Errors
    USER_ALREADY_EXISTS: 'A user with this email already exists. Please use a different email.',
    USER_NOT_FOUND: 'The account does not exist. Please check the provided email or register new account.',
    INVALID_CREDENTIALS: 'Invalid email or password. Please verify your credentials and try again.',
    MISSING_DETAILS: 'Missing some fields. Please verify your credentials and try again.',
    ROLE_CHANGE_FAILED: 'Faile to change role. Please try again.',
    EVENT_ID_MISSING: 'Event ID is missing. Ensure the request includes a valid "event_id".',
    EVENT_NOT_FOUND: 'The event does not exist. Please try again.',

    PASSWORD_MATCH_ERROR: 'The entered password matches your current password. Please enter a new password.',
    TOKEN_VERIFICATION_FAILED: 'Access token verification failed. Please log in again to generate a new token.',
    REFRESH_TOKEN_STORAGE_ERROR: 'An error occurred while storing the refresh token. Please try again later.',
    REFRESH_TOKEN_REMOVAL_ERROR: 'An error occurred while removing the refresh token. Please try again later.',
    EMAIL_MISSING: 'Email is missing. Please provide a valid phone number.',
    PHONE_NUMBER_MISSING: 'Phone number is missing. Please provide a valid phone number.',
    PASSWORD_MISSING: 'Password is missing. Please provide a valid password.',
    PHONE_NUMBER_NOT_FOUND: 'This phone number does not exist. Please check the phone number and try again.',
    STATUS_CHECK_FAILED: 'Failed to verify the user status. Please try again later or contact support.',
    AUTH_COOKIE_MISSING: 'Authorization cookie is missing. Please log in again to proceed.',
    ACCESS_TOKEN_NOT_FOUND: 'Access token not found on the request. Please ensure you are logged in.',
    SIGNOUT_ERROR: 'An error occurred while signing out. Please try again later.',
    PASSWORD_RESET_FAILED: 'Failed to reset the password. Please try again later or contact support.',
    FORBIDDEN_INSUFFICIENT_PERMISSIONS: 'Forbidden: You do not have sufficient permissions to perform this action.',
    USER_ID_MISSING_IN_TOKEN: 'User ID is missing in the decoded data. Ensure the token payload includes a valid "userId" field.',
} as const;

