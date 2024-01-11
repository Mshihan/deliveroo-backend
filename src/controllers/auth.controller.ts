import cookie, { serialize } from "cookie";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../middleware/error.middleware";
import { authService } from "../service";
import { validateRequest } from "./ajv-schema";
import {
  loginTokenSchema,
  refreshTokenSchema,
  registerTokenSchema,
} from "./ajv-schema/schema";

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = cookie.parse(req.headers.cookie || "")?.jwt;

    validateRequest(req.body, refreshTokenSchema, "User id is required", 400);

    const { userId } = req.body;
    const tokens = await authService.refreshTokens(userId, refreshToken);

    res.status(200).json({
      data: tokens.accessToken,
      message: "Tokens Refreshed",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validateRequest(
      req.body,
      registerTokenSchema,
      "Email and password required",
      400
    );

    const { username, email, password } = req.body;
    const tokens = await authService.registerUser(username, email, password);

    // Set Cookies
    const serialized = serialize("jwt", tokens!.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    res.setHeader("Set-Cookie", serialized);

    res.status(201).json({
      data: tokens!.accessToken,
      message: "Successfully registered to the system",
      error: null,
      code: 201,
    });
    res.status(201).json();
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validateRequest(
      req.body,
      loginTokenSchema,
      "Email and password is required",
      400
    );
    const { email, password } = req.body;
    const tokens = await authService.loginUser(email, password);

    if (!tokens?.accessToken && !tokens?.refreshToken) {
      res.status(401).json({
        data: null,
        message: "Login failed. Invalid Credentials",
        error: "Login failed. Invalid Credentials",
        code: 401,
      });
      return;
    }

    const serialized = serialize("jwt", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });

    res.setHeader("Set-Cookie", serialized);

    res.status(200).json({
      data: tokens.accessToken,
      message: "Successfully logged in to the system",
      error: null,
      code: 200,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  refreshToken,
  register,
  login,
};
