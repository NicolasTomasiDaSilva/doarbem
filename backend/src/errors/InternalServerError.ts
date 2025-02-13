class InternalServerError extends Error {
  statusCode: number;
  details: string | null;
  name: string;
  constructor(
    message: string = "InternalServerError",
    details: string | null = null
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 500;
    this.details = details;
  }
}

export default InternalServerError;
