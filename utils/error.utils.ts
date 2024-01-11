import { Response } from "express";

// Helper function to handle unknown error types
const handleUnknownError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(500).json({ message: "Unknown error occurred" });
  }
};

export default handleUnknownError;
