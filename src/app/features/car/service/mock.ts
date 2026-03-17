export const TableVehiclesMock = {
  columns: [
    { key: 'store', label: 'Loja' },
    { key: 'plate', label: 'Placa' },
    { key: 'brand', label: 'Marca' },
    { key: 'year', label: 'Ano' },
    { key: 'color', label: 'Cor' },
    { key: 'renavam', label: 'Renavam' },
    { key: 'document', label: 'CPF/CNPJ' },
    { key: 'actions', label: 'Ações' },
  ],

  vehicles: [
    {
      store: 'Loja Adamantina',
      plate: 'ABC-1234',
      brand: 'Toyota',
      year: '2020',
      color: 'Prata',
      renavam: '12345678901',
      document: '123.456.789-00',
    },
    {
      store: 'Loja São Caetano do Sul',
      plate: 'XYZ-9876',
      brand: 'Honda',
      year: '2018',
      color: 'Preto',
      renavam: '98765432100',
      document: '12.345.678/0001-90',
    },
    {
      store: 'Loja Caieiras',
      plate: 'DEF-5678',
      brand: 'Ford',
      year: '2022',
      color: 'Branco',
      renavam: '45678912345',
      document: '987.654.321-00',
    },
  ],
};
