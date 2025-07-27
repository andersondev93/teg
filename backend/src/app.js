require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

// 1. Lista de origens permitidas atualizada
const allowedOrigins = [
  'http://localhost:3000', 
  'https://teg-alpha.vercel.app',
  'https://teg-alpha.vercel.app/' // Adicione com e sem barra no final
];

// 2. Middleware de CORS melhorado
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requisições sem origin (como Postman, mobile apps) em desenvolvimento
    if (process.env.NODE_ENV !== 'production' && !origin) {
      return callback(null, true);
    }
    
    // Verificar se a origem está na lista de permitidas
    if (allowedOrigins.some(allowedOrigin => {
      return origin === allowedOrigin || 
             origin?.startsWith(allowedOrigin.replace(/\/$/, ''));
    })) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // Para navegadores legados
};

// 3. Aplicar CORS globalmente
app.use(cors(corsOptions));

// 4. Middleware para pré-requisições OPTIONS
app.options('*', cors(corsOptions)); // Habilita OPTIONS para todas as rotas

// 5. Middleware para capturar erros CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(express.json());

// Rotas
app.use("/auth", authRoutes);

// Rota de health check
app.get("/", (req, res) => res.json({ 
  status: "running",
  environment: process.env.NODE_ENV || 'development'
}));

// 6. Middleware de erro para CORS
app.use((err, req, res, next) => {
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ 
      error: 'Acesso não permitido',
      details: `Origem ${req.headers.origin} não autorizada`
    });
  }
  next(err);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Origens permitidas: ${allowedOrigins.join(', ')}`);
});