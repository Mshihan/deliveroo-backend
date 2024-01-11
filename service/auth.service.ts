import bcrypt from "bcrypt";
import tokenUtils from "../utils/token.utils";
import { User } from "../model";

const refreshTokens = (userId: string, refreshToken: string, email: string) => {
  const isValid = tokenUtils.validateRefreshToken(userId, refreshToken);

  if (!isValid) {
    throw new Error("Invalid refresh token");
  }

  const tokens = tokenUtils.generateTokens({ id: userId, email });
  return tokens;
};

const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<string | null> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return newUser.id;
  } catch (error) {
    console.error("Error in user registration:", error);
    return null;
  }
};

const loginUser = async (
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  try {
    const user = await User.findOne({
      where: { email },
    });

    if (user && (await user.verifyPassword(password))) {
      const tokens = tokenUtils.generateTokens({
        id: user.id,
        email: user.email,
      });
      user!.refreshToken = tokens!.refreshToken;
      user.save();
      return tokens;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error in user login:", error);
    return null;
  }
};

export default {
  refreshTokens,
  registerUser,
  loginUser,
};
