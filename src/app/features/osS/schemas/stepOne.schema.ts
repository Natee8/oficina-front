import * as yup from 'yup';

export const StepOneOsSchema = yup.object({
  loja: yup.number().required('Selecione a loja'),
  cliente: yup.number().required('Selecione o cliente'),
  veiculo: yup.number().required('Selecione o veículo'),

  dataEntrada: yup.string().required('Informe a data de entrada'),
  dataSaida: yup
    .string()
    .required('Informe a data de saída')
    .test('data-saida', 'Data de saída não pode ser menor que a data de entrada', function (value) {
      const { dataEntrada } = this.parent;
      if (!value || !dataEntrada) return true; // se algum estiver vazio, outro validator pega
      return new Date(value) >= new Date(dataEntrada);
    }),

  pintura: yup.string().required('Informe a pintura'),
  valorPintura: yup
    .number()
    .typeError('Valor inválido')
    .required('Informe o valor da pintura')
    .moreThan(0, 'Valor deve ser maior que 0'),

  funilaria: yup.string().required('Informe a funilaria'),
  valorFunilaria: yup
    .number()
    .typeError('Valor inválido')
    .required('Informe o valor da funilaria')
    .moreThan(0, 'Valor deve ser maior que 0'),
});
