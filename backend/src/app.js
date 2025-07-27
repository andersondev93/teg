require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/auth.routes");

const app = express();

// 🔧 Forçar headers CORS manualmente
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://teg-alpha.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Responde preflight
  }

  next();
});

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("TEG API Rodando"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
