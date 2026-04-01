//stores
export const reviewStoreConfig = [
  {
    title: 'Informações da Loja',
    fields: [
      { label: 'Nome', key: 'name' },
      { label: 'CNPJ', key: 'cnpj' },
    ],
  },
  {
    title: 'Endereço',
    fields: [
      { label: 'CEP', key: 'addressZip' },
      { label: 'Número', key: 'addressNumber' },
      { label: 'Rua', key: 'addressStreet' },
      { label: 'Bairro', key: 'addressDistrict' },
      { label: 'Cidade', key: 'addressCity' },
      { label: 'Estado', key: 'addressState' },
    ],
  },
];

//os

export const reviewOsConfig = [
  {
    title: 'Informações da OS',
    fields: [
      { label: 'Loja', key: 'loja' },
      { label: 'Cliente', key: 'cliente' },
      { label: 'Veículo', key: 'veiculo' },
      { label: 'Entrada', key: 'dataEntrada' },
      { label: 'Saída', key: 'dataSaida' },
    ],
  },
  {
    title: 'Serviços',
    fields: [
      { label: 'Pintura', key: 'pintura' },
      { label: 'Valor Pintura', key: 'valorPintura', prefix: 'R$ ' },
      { label: 'Funilaria', key: 'funilaria' },
      { label: 'Valor Funilaria', key: 'valorFunilaria', prefix: 'R$ ' },
    ],
  },
  {
    title: 'Peças',
    dynamic: true, // indica que vem do array pecasAdicionadas
    fields: [
      {
        labelKey: 'nome',
        valueKey: 'valor',
        prefix: 'Qtd: ',
        format: (p: any) => `Qtd: ${p.quantidade} | R$ ${p.valor}`,
      },
    ],
  },
];

//funcionarios

export const reviewEmployeeConfig = [
  {
    title: 'Dados Pessoais',
    fields: [
      { label: 'Nome', key: 'nome' },
      { label: 'CPF', key: 'cpf' },
      { label: 'Telefone', key: 'telefone' },
    ],
  },
  {
    title: 'Endereço',
    fields: [
      { label: 'CEP', key: 'addressZip' },
      { label: 'Número', key: 'addressNumber' },
      { label: 'Rua', key: 'addressStreet' },
      { label: 'Bairro', key: 'addressDistrict' },
      { label: 'Cidade', key: 'addressCity' },
      { label: 'Estado', key: 'addressState' },
    ],
  },
  {
    title: 'Trabalho',
    fields: [
      { label: 'Cargo', key: 'cargo' },
      { label: 'Loja', key: 'loja' },
      { label: 'Email', key: 'email' },
    ],
  },
];
