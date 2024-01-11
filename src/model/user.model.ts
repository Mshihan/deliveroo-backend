import { Sequelize, DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../database/database";

class User extends Model {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare refreshToken: string;

  async verifyPassword(candidatePassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
      console.error("Error verifying password:", error);
      return false;
    }
  }
}

export const initializeUser = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
};

export default User;
