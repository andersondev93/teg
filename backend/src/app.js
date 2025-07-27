require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

// Lista de origens permitidas
const allowedOrigins = ['http://localhost:3000', 'https://teg-alpha.vercel.app'];

// Middleware de CORS
app.use(cors({
  origin: function (origin, callback) {
    // Permitir requisições sem origin (como Postman ou curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Responder pré-requisições (OPTIONS) corretamente
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());

// Rotas
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send("TEG API Rodando"));

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
