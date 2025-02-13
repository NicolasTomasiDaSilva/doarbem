class UnauthorizedError extends Error {
  statusCode: number;
  details: string | null;
  name: string;
  constructor(
    message: string = "UnauthorizedError",
    details: string | null = null
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 401;
    this.details = details;
  }
}

export default UnauthorizedError;
