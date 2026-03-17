export const TableStoresMock = {
  columns: [
    { key: 'name', label: 'Nome' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'street', label: 'Rua' },
    { key: 'number', label: 'Número' },
    { key: 'city', label: 'Cidade' },
    { key: 'neighborhood', label: 'Bairro' },
    { key: 'actions', label: 'Ações' },
  ],

  stores: [
    {
      name: 'Loja Adamantina',
      cnpj: '12.345.678/0001-90',
      street: 'Rua das Flores',
      number: '120',
      city: 'São Paulo',
      neighborhood: 'Centro',
    },
    {
      name: 'Loja São Caetano do sul',
      cnpj: '98.765.432/0001-10',
      street: 'Av Paulista',
      number: '900',
      city: 'São Paulo',
      neighborhood: 'Bela Vista',
    },
    {
      name: 'Loja Caieiras',
      cnpj: '11.222.333/0001-55',
      street: 'Rua Azul',
      number: '45',
      city: 'Rio',
      neighborhood: 'Copacabana',
    },
  ],
};
