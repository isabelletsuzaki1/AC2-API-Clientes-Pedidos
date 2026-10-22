const express = require('express');
const router = express.Router();
const controller = require('../controllers/clienteController');

router.get('/', controller.listarClientes);
// A rota específica de cidade deve vir antes da rota com parâmetro :id.
router.get('/cidade/:cidade', controller.listarPorCidade);
router.get('/:id/pedidos', controller.listarPedidos);
router.get('/:id', controller.buscarCliente);
router.put('/:id', controller.atualizarCliente);
router.post('/:id/pedidos', controller.adicionarPedido);
router.delete('/:id', controller.removerCliente);

module.exports = router;
