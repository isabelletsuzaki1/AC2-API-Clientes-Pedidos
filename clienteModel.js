// Os dados permanecem em memória enquanto o servidor estiver ligado.
const clientes = [
  {
    id: 1,
    nome: 'Ana Souza',
    idade: 25,
    cidade: 'Sorocaba',
    pedidos: [{ codigo: 101, produto: 'Teclado', quantidade: 1 }]
  },
  {
    id: 2,
    nome: 'Bruno Lima',
    idade: 30,
    cidade: 'Itu',
    pedidos: [{ codigo: 102, produto: 'Mouse', quantidade: 2 }]
  },
  {
    id: 3,
    nome: 'Carla Mendes',
    idade: 22,
    cidade: 'Sorocaba',
    pedidos: []
  }
];

module.exports = clientes;
