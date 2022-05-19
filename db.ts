import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB!,
  process.env.LOGIN!,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

export interface IUserModel
  extends Model<
    InferAttributes<IUserModel>,
    InferCreationAttributes<IUserModel>
  > {
  id: string;
  name: string;
  password: string;
  email?: string;
  dateLogin?: Date;
  dateReg: Date;
  status: boolean;
}

export const User = sequelize.define<IUserModel>(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    dateLogin: {
      type: DataTypes.DATE,
    },
    dateReg: {
      type: DataTypes.DATE,
    },

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "Employees" }
);

export const connect = async () => {
  try {
    await sequelize.authenticate();
    await User.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
