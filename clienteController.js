const clientes = require('../models/clienteModel');

function encontrarCliente(id) {
  return clientes.find(cliente => cliente.id === Number(id));
}

function listarClientes(req, res) {
  return res.json(clientes);
}

function buscarCliente(req, res) {
  const cliente = encontrarCliente(req.params.id);
  if (!cliente) return res.status(404).json({ mensagem: 'Id não existente' });
  return res.json(cliente);
}

function listarPedidos(req, res) {
  const cliente = encontrarCliente(req.params.id);
  if (!cliente) return res.status(404).json({ mensagem: 'Id não existente' });
  return res.json(cliente.pedidos);
}

function atualizarCliente(req, res) {
  const cliente = encontrarCliente(req.params.id);
  if (!cliente) return res.status(404).json({ mensagem: 'Id não existente' });

  const { nome, idade, cidade } = req.body;
  if (nome === undefined && idade === undefined && cidade === undefined) {
    return res.status(400).json({ mensagem: 'Informe nome, idade ou cidade para atualizar' });
  }
  if (nome !== undefined && (typeof nome !== 'string' || !nome.trim())) {
    return res.status(400).json({ mensagem: 'Nome inválido' });
  }
  if (idade !== undefined && (!Number.isInteger(idade) || idade < 0)) {
    return res.status(400).json({ mensagem: 'Idade inválida' });
  }
  if (cidade !== undefined && (typeof cidade !== 'string' || !cidade.trim())) {
    return res.status(400).json({ mensagem: 'Cidade inválida' });
  }

  if (nome !== undefined) cliente.nome = nome.trim();
  if (idade !== undefined) cliente.idade = idade;
  if (cidade !== undefined) cliente.cidade = cidade.trim();
  return res.json({ mensagem: 'Cliente atualizado com sucesso', cliente });
}

function adicionarPedido(req, res) {
  const cliente = encontrarCliente(req.params.id);
  if (!cliente) return res.status(404).json({ mensagem: 'Id não existente' });

  const { codigo, produto, quantidade } = req.body;
  if (!Number.isInteger(codigo) || typeof produto !== 'string' || !produto.trim() || !Number.isInteger(quantidade) || quantidade < 1) {
    return res.status(400).json({ mensagem: 'Informe codigo inteiro, produto e quantidade inteira positiva' });
  }
  if (cliente.pedidos.some(pedido => pedido.codigo === codigo)) {
    return res.status(409).json({ mensagem: 'Código de pedido já cadastrado para este cliente' });
  }

  const pedido = { codigo, produto: produto.trim(), quantidade };
  cliente.pedidos.push(pedido);
  return res.status(201).json({ mensagem: 'Pedido adicionado com sucesso', pedido, cliente });
}

function listarPorCidade(req, res) {
  const cidade = req.params.cidade.trim().toLocaleLowerCase('pt-BR');
  const resultado = clientes.filter(cliente => cliente.cidade.toLocaleLowerCase('pt-BR') === cidade);
  return res.json(resultado);
}

function removerCliente(req, res) {
  const indice = clientes.findIndex(cliente => cliente.id === Number(req.params.id));
  if (indice === -1) return res.status(404).json({ mensagem: 'Id não existente' });
  const [cliente] = clientes.splice(indice, 1);
  return res.json({ mensagem: 'Cliente removido com sucesso', cliente });
}

module.exports = {
  listarClientes,
  buscarCliente,
  listarPedidos,
  atualizarCliente,
  adicionarPedido,
  listarPorCidade,
  removerCliente
};
