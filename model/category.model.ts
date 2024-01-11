import { DataTypes, Model, Sequelize } from "sequelize";

export interface CategoryAttributes {
  id: string | null;
  name: string;
}

class Category extends Model {}

export const initializeCategory = (sequelize: Sequelize) => {
  if (!sequelize) {
    throw new Error("No Sequelize instance passed");
  }
  Category.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
};

export default Category;
