import sequelize from "./config/database";

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexão bem-sucedida com o MySQL!");
  } catch (error) {
    console.error("Erro ao conectar ao MySQL:", error);
  }
}

testConnection();
