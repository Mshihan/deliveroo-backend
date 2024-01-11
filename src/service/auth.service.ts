import bcrypt from "bcrypt";
import tokenUtils from "../utils/token.utils";
import { User } from "../model";
import { CustomError } from "../middleware/error.middleware";

const refreshTokens = async (userId: string, refreshToken: string) => {
  const user = await User.findOne({
    where: {
      id: userId,
      refreshToken: refreshToken,
    },
  });

  if (!user) {
    // Remove the refresh token from other users if exists. [Probably a Fraud attempt]
    const user = await User.findOne({
      where: {
        refreshToken: refreshToken,
      },
    });

    if (user) {
      user.refreshToken = "";
      user?.save();
    }
    throw new CustomError("Invalid refresh token", 401);
  }

  const isValid = tokenUtils.validateRefreshToken(userId, refreshToken);

  if (!isValid) {
    throw new CustomError("Invalid refresh token", 401);
  }

  const tokens = tokenUtils.generateTokens({ id: userId, email: user.email });
  return tokens;
};

const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const tokens = tokenUtils.generateTokens({
    id: newUser.id,
    email,
  });

  return tokens;
};

const loginUser = async (
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new CustomError("User with provided email not found", 401);
  }

  if (!(await user.verifyPassword(password))) {
    throw new CustomError("User with provided email not found", 401);
  }

  const tokens = tokenUtils.generateTokens({
    id: user.id,
    email: user.email,
  });
  user!.refreshToken = tokens!.refreshToken;
  user.save();
  return tokens;
};

export default {
  refreshTokens,
  registerUser,
  loginUser,
};
