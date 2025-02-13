import express from "express";
import UserController from "../controllers/UserController";

function routes(app: express.Application) {
  app.post("/register", (req, res, next) => {
    UserController.register(req, res, next);
  });

  app.post("/login", (req, res, next) => {
    UserController.login(req, res, next);
  });
}
export default routes;
