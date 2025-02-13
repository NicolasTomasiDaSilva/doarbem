class NotFoundError extends Error {
  statusCode: number;
  details: string | null;
  name: string;
  constructor(message: string, details: string | null = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 404;
    this.details = details;
  }
}

export default NotFoundError;
