import { Request, Response, NextFunction } from "express";
import tokenUtils from "../utils/token.utils";
import { User } from "../model";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      data: null,
      message: "Unauthorized: Token not provided",
      error: "Unauthorized: Token not provided",
      code: 401,
    });
    return;
  }

  try {
    const decoded = await tokenUtils.verifyToken(token);
    const user = await User.findByPk(decoded.id);
    if (user) {
      req.user = user;
    }
    next();
  } catch (error) {
    res.status(403).json({
      data: null,
      message: "Unauthorized Access",
      error: "Unauthorized Access",
      code: 403,
    });
  }
};

export default authenticateToken;
