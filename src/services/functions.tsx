export function getErrorMessage(statusCode: number): string {
  switch (statusCode) {
    case 400:
      return 'The server cannot process the request due to a syntax error or invalid data.';
    case 401:
      return 'Unauthorized — The request requires user authentication.';
    case 403:
      return 'Forbidden.';
    case 404:
      return 'Character not found.';
    case 405:
      return 'Method Not Allowed: The request method (e.g., POST, GET) is not supported for the requested resource.';
    case 408:
      return 'The server timed out waiting for the request from the client. ';
    case 500:
      return 'Internal Server Error';
    case 503:
      return 'Service Unavailable';
    case 504:
      return 'Gateway Timeout';
    default:
      return `Unexpected error occurred (code of the error${statusCode}).`;
  }
}
