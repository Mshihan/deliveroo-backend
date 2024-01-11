import { Request, Response } from "express";
import authService from "../service/auth.service";

const refreshToken = async (req: Request, res: Response) => {
  const { userId, email, refreshToken } = req.body;
  try {
    const tokens = await authService.refreshTokens(userId, refreshToken, email);
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ message: "Error refreshing tokens" });
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const userId = await authService.registerUser(username, email, password);
    res.status(201).json({ userId });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const tokens = await authService.loginUser(email, password);

    if (!tokens?.accessToken && !tokens?.refreshToken) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json(tokens);
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};

const test = (req: Request, res: Response): void => {
  res.status(200).json({ users: req.user });
};

export default {
  refreshToken,
  register,
  login,
  test,
};
