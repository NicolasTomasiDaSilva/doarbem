import express, { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "./models/User";
import UserController from "./controllers/UserController";

const app = express();
app.use(express.json());

app.post("/login", UserController.login);

app.post("/register", UserController.register);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});
