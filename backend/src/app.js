require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/auth.routes");

const app = express();

// ✅ Força os headers CORS manualmente
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://teg-alpha.vercel.app");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // 🔁 Trata preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// Rotas
app.use("/auth", authRoutes);

// Teste simples
app.get("/", (req, res) => res.send("TEG API Rodando"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
