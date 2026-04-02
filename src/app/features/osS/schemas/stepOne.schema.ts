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
      if (!value || !dataEntrada) return true;
      return new Date(value) >= new Date(dataEntrada);
    }),

  pintura: yup.string().test('pintura-par', 'Informe a pintura junto ao valor', function (value) {
    const hasValor = !!this.parent.valorPintura && this.parent.valorPintura > 0;
    if (hasValor && !value) return false;
    return true;
  }),
  valorPintura: yup.number().typeError('Valor inválido').test('valor-pintura-par', 'Informe o valor junto à descrição da pintura', function (value) {
    const hasDesc = !!this.parent.pintura;
    if (hasDesc && (!value || value <= 0)) return false;
    return true;
  }),

  funilaria: yup.string().test('funilaria-par', 'Informe a funilaria junto ao valor', function (value) {
    const hasValor = !!this.parent.valorFunilaria && this.parent.valorFunilaria > 0;
    if (hasValor && !value) return false;
    return true;
  }),
  valorFunilaria: yup.number().typeError('Valor inválido').test('valor-funilaria-par', 'Informe o valor junto à descrição da funilaria', function (value) {
    const hasDesc = !!this.parent.funilaria;
    if (hasDesc && (!value || value <= 0)) return false;
    return true;
  }),

  mecanica: yup.string().test('mecanica-par', 'Informe a mecânica junto ao valor', function (value) {
    const hasValor = !!this.parent.valorMecanica && this.parent.valorMecanica > 0;
    if (hasValor && !value) return false;
    return true;
  }),
  valorMecanica: yup.number().typeError('Valor inválido').test('valor-mecanica-par', 'Informe o valor junto à descrição da mecânica', function (value) {
    const hasDesc = !!this.parent.mecanica;
    if (hasDesc && (!value || value <= 0)) return false;
    return true;
  }),
}).test('ao-menos-um', 'Informe ao menos: funilaria completa, pintura completa ou mecânica completa', function (values) {
  const hasPintura = !!values.pintura && !!values.valorPintura && values.valorPintura > 0;
  const hasFunilaria = !!values.funilaria && !!values.valorFunilaria && values.valorFunilaria > 0;
  const hasMecanica = !!values.mecanica && !!values.valorMecanica && values.valorMecanica > 0;
  const hasParts = !!(this.options as any)?.context?.hasParts;
  if (!hasPintura && !hasFunilaria && !hasMecanica && !hasParts) {
    return this.createError({ path: 'funilaria', message: 'Informe ao menos: funilaria completa, pintura completa ou mecânica completa' });
  }
  return true;
});

