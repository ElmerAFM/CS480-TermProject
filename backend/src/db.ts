import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL!);

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: number | null;
  declare name: string;
  declare description: string;
  declare price: number;
  declare category: string;
  declare image: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
  }
);

await Product.sync({ force: true });

export { Product, sequelize };
