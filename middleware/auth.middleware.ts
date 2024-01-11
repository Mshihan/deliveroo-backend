import { Request, Response, NextFunction } from "express";
import tokenUtils from "../utils/token.utils";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: Token not provided" });
    return;
  }

  try {
    const decoded = await tokenUtils.verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export default authenticateToken;
