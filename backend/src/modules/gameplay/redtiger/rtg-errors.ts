/**
 * Custom error class for RGS (Remote Game Server) proxy errors
 * This error is thrown when there's an issue communicating with a game provider's API
 */
export class RgsProxyError extends Error {
  public statusCode: number
  public providerDetails?: Record<string, unknown>

  constructor(message: string, statusCode = 500, providerDetails?: Record<string, unknown>) {
    super(message)
    this.name = 'RgsProxyError'
    this.statusCode = statusCode
    this.providerDetails = providerDetails

    // Maintain proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RgsProxyError)
    }
  }

  /**
   * Convert the error to a plain object for JSON serialization
   */
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      ...(this.providerDetails && { providerDetails: this.providerDetails }),
    }
  }
}

/**
 * Type guard to check if an error is an RgsProxyError
 */
export function isRgsProxyError(error: unknown): error is RgsProxyError {
  return (
    error instanceof Error &&
    'name' in error &&
    error.name === 'RgsProxyError' &&
    'statusCode' in error
  )
}

/**
 * Type for error responses from game provider APIs
 */
export interface ProviderErrorResponse {
  error: string
  errorCode?: string | number
  message?: string
  details?: Record<string, unknown>
  statusCode?: number
}
