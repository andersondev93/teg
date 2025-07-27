require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Configuração CORS completa
const corsOptions = {
  origin: [
    'https://teg-alpha.vercel.app',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware CORS para todas as rotas
app.use(cors(corsOptions));

// Middleware para pré-requisições OPTIONS
app.options('*', cors(corsOptions));

// Seu middleware de autenticação e rotas
app.use(express.json());
app.use("/auth", require("./routes/auth.routes"));

// Rota de health check
app.get("/", (req, res) => {
  res.json({
    status: "API Online",
    cors: "Configurado corretamente",
    allowedOrigins: corsOptions.origin
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Origens permitidas: ${corsOptions.origin.join(', ')}`);
});