const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validação básica
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const hashed = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role }
    });

    res.json({ 
      success: true,
      message: "Usuário registrado com sucesso",
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    if (e.code === 'P2002') { // Código de erro do Prisma para violação de campo único
      res.status(400).json({ error: "Email já em uso" });
    } else {
      console.error("Erro no registro:", e);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Credenciais inválidas" });

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, SECRET, {
    expiresIn: "7d"
  });

  res.json({ token });
};

module.exports = { register, login };
