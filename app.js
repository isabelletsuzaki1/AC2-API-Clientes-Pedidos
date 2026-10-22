const express = require('express');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
app.use(express.json());
app.use('/clientes', clienteRoutes);

app.use((req, res) => res.status(404).json({ mensagem: 'Rota não encontrada' }));

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
}

module.exports = app;
