// userController.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/User";
import UserServices from "../services/UserServices";

class UserController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Email e senha são obrigatórios." });
      return;
    }
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }
      const validPassword = await user.validatePassword(password);
      if (!validPassword) {
        res.status(401).json({ message: "Senha inválida." });
        return;
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        "seuSegredoAqui",
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login bem-sucedido", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor." });
    }
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { firstName, lastName, email, password, cpf } = req.body;
      await UserServices.register({
        firstName,
        lastName,
        email,
        password,
        cpf,
      });
      res.status(201).json({ message: "User created" });
    } catch (error) {
      next(error);
    }
  }
}
export default new UserController();
