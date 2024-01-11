import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({
      data: null,
      message: err.message,
      error: err.name,
      code: err.status,
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({
      data: null,
      message: "Email already exists",
      error: "Email already exists",
      code: 400,
    });
  } else if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      data: null,
      message: err.message,
      error: err.name,
      code: 500,
    });
  } else {
    res.status(500).json({
      data: null,
      message: "Something went wrong",
      error: "Something went wrong",
      code: 500,
    });
  }
};

export default errorHandlerMiddleware;
