import * as yup from 'yup';

const parseCurrency = (value: string) => {
  if (!value) return 0;
  return Number(
    value
      .replace(/\./g, '')
      .replace(',', '.')
      .replace(/[^\d.-]/g, ''),
  );
};

export const stepOneOsSchema = yup.object().shape({
  loja: yup.number().required('Selecione a loja'),
  cliente: yup.number().required('Selecione o cliente'),
  veiculo: yup.number().required('Selecione o veículo'),

  dataEntrada: yup.string().required('Informe a data de entrada'),
  dataSaida: yup.string().required('Informe a data de saída'),

  pintura: yup.string().default(''),
  valorPintura: yup
    .string()
    .default('')
    .when('pintura', {
      is: (p: string) => !!p && p.trim() !== '',
      then: (schema) =>
        schema
          .required('Informe um valor para pintura')
          .test(
            'valor-pintura',
            'Informe um valor válido para pintura',
            (value) => parseCurrency(value || '') > 0,
          ),
      otherwise: (schema) => schema.default(''),
    }),

  funilaria: yup.string().default(''),
  valorFunilaria: yup
    .string()
    .default('')
    .when('funilaria', {
      is: (f: string) => !!f && f.trim() !== '',
      then: (schema) =>
        schema
          .required('Informe um valor para funilaria')
          .test(
            'valor-funilaria',
            'Informe um valor válido para funilaria',
            (value) => parseCurrency(value || '') > 0,
          ),
      otherwise: (schema) => schema.default(''),
    }),
});
