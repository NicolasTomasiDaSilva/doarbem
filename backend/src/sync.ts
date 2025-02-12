import sequelize from "./config/database";
import "./models/User";

async function init() {
  try {
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ force: true }); // Cuidado! 'force: true' apaga as tabelas existentes
    console.log("Banco de dados sincronizado!");
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
  }
}

init();
