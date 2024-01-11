import jwt from "jsonwebtoken";

const generateAccessToken = (userData: {
  id: string;
  email: string;
}): string => {
  return jwt.sign(userData, process.env.Access_Token_Secret!, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (userData: {
  id: string;
  email: string;
}): string => {
  return jwt.sign(userData, process.env.Refresh_Token_Secret!, {
    expiresIn: "7d",
  });
};

const validateRefreshToken = (
  userId: string,
  refreshToken: string
): boolean => {
  try {
    jwt.verify(refreshToken, process.env.Refresh_Token_Secret!);
    // Verification successful if it reaches this point
    return true;
  } catch (error) {
    // Verification failed
    return false;
  }
};

const generateTokens = (userData: {
  id: string;
  email: string;
}): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);

  return { accessToken, refreshToken };
};

const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.Access_Token_Secret!);
};

export default {
  generateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
  generateTokens,
  verifyToken,
};
