import { DataTypes, Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database";
import bcrypt from "bcryptjs";

export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpf: string;
}
export interface UserCreationAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpf: string;
}

class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public cpf!: string;

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]{11}$/,
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

// Ganchos (Hooks) do Sequelize
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Donor.hasMany(Donation, {
//   foreignKey: "donor_id", // Definindo chave estrangeira
//   as: "donations", // Nome da associação
// });

export default User;
