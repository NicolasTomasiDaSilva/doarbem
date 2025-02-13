class BadRequestError extends Error {
  statusCode: number;
  details: string | null;
  name: string;
  constructor(
    message: string = "BadRequestError",
    details: string | null = null
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 400;
    this.details = details;
  }
}

export default BadRequestError;
