/**
 * Custom API Error Class to handle API errors
 */
export class ApiError extends Error {
  public statusCode: number;
  public details?: any;
  constructor(statusCode: number, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  public toJSON() {
    return {
      error: this.message,
      statusCode: this.statusCode,
      ...(this.details && { details: this.details }),
    };
  }
}
