export abstract class HTTPError extends Error {
  statusCode: number;

  constructor(message: string, options?: { cause: Error }) {
    super(message, options);
    this.name = "HTTPError";
    this.statusCode = 400;
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

export class AccessDeniedError extends HTTPError {
  constructor(message: string, options?: { cause: Error }) {
    super(message, options);
    this.name = "AccessDeniedError";
    this.statusCode = 403;
  }
}

export class AuthError extends HTTPError {
  constructor(message: string, options?: { cause: Error }) {
    super(message, options);
    this.name = "AuthError";
    this.statusCode = 401;
  }
}
