import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
} from "../errors/index";

const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFoundError) {
    res
      .status(err.statusCode)
      .json({ name: err.name, message: err.message, details: err.details });
  } else if (err instanceof BadRequestError) {
    res
      .status(err.statusCode)
      .json({ name: err.name, message: err.message, details: err.details });
  } else if (err instanceof UnauthorizedError) {
    res
      .status(err.statusCode)
      .json({ name: err.name, message: err.message, details: err.details });
  } else if (err instanceof InternalServerError) {
    res
      .status(err.statusCode)
      .json({ name: err.name, message: err.message, details: err.details });
  } else {
    res.status(500).json({ name: err.name, message: "InternalServerError" });
  }
};

export default errorHandler;
