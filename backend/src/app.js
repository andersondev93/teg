require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' || 'https://teg-alpha.vercel.app/', // ou a URL do seu frontend
  credentials: true
}));
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("TEG API Rodando"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
