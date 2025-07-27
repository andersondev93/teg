require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

// 1. Configuração robusta de CORS
const allowedOrigins = [
  'https://teg-alpha.vercel.app',
  'http://localhost:3000'
];

// Middleware para pré-requisições OPTIONS
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.status(200).send();
  }
  
  return res.status(403).send();
});

// Middleware CORS principal
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Expose-Headers', 'Authorization');
  }
  
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).json({});
  }
  
  next();
});

app.use(express.json());

// Rotas
app.use("/auth", authRoutes);

// Health Check
app.get("/", (req, res) => {
  res.json({
    status: "API Online",
    cors: {
      allowedOrigins: allowedOrigins,
      message: "CORS configurado corretamente"
    }
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo quebrou!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Origens permitidas: ${allowedOrigins.join(', ')}`);
});