import express, { Request, Response, ErrorRequestHandler } from "express";
import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
routes(app);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});
