// userController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

class UserController {
  async login(req: Request, res: Response): Promise<void> {
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

  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password || !cpf) {
      res.status(400).json({ message: "Todos os campos são obrigatórios." });
      return;
    }

    try {
      // Verificar se o email já existe
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        res.status(400).json({ message: "Email já cadastrado." });
        return;
      }

      // Verificar se o CPF já existe
      const cpfExists = await User.findOne({ where: { cpf } });
      if (cpfExists) {
        res.status(400).json({ message: "CPF já cadastrado." });
        return;
      }

      // Criar o novo usuário
      const newUser = await User.create({
        name,
        email,
        password,
        cpf,
      });

      res
        .status(201)
        .json({ message: "Usuário criado com sucesso.", user: newUser });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor." });
      return;
    }
  }
}

export default new UserController();
