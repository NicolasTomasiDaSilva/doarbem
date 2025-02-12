import * as dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

// Configurações do banco de dados MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!, // ou o IP do servidor de banco
    dialect: "mysql", // Dialeto MySQL
    logging: console.log,
  }
);

export default sequelize;
