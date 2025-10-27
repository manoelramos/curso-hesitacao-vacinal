const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para desabilitar cache
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

// Servir arquivos estáticos da pasta curso-hesitacao-vacinal
app.use(express.static(path.join(__dirname, 'curso-hesitacao-vacinal'), {
  etag: false,
  lastModified: false,
  maxAge: 0
}));

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'curso-hesitacao-vacinal', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Servindo arquivos da pasta: curso-hesitacao-vacinal`);
  console.log(`🔄 Cache desabilitado\n`);
});

