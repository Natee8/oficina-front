import * as yup from 'yup';

const MAX_DATE_RANGE_DAYS = 60;

const normalizeDate = (value: string | null | undefined): Date | null => {
  if (!value) return null;

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  date.setHours(0, 0, 0, 0);
  return date;
};

const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export const StepOneOsSchema = yup.object({
  loja: yup.number().required('Selecione a loja'),
  cliente: yup.number().required('Selecione o cliente'),
  veiculo: yup.number().required('Selecione o veículo'),

  dataEntrada: yup
    .string()
    .required('Informe a data de entrada')
    .test('data-entrada-valida', 'Informe uma data de entrada válida', (value) => !!normalizeDate(value))
    .test('data-entrada-passado', 'Data de entrada não pode ser no passado', (value) => {
      const entryDate = normalizeDate(value);
      if (!entryDate) return true;
      return entryDate >= getToday();
    })
    .test('data-entrada-fim-semana', 'Data de entrada não pode ser fim de semana', (value) => {
      const entryDate = normalizeDate(value);
      if (!entryDate) return true;
      return !isWeekend(entryDate);
    }),
  dataSaida: yup
    .string()
    .required('Informe a data de saída')
    .test('data-saida-valida', 'Informe uma data de saída válida', (value) => !!normalizeDate(value))
    .test('data-saida-passado', 'Data de saída não pode ser no passado', (value) => {
      const exitDate = normalizeDate(value);
      if (!exitDate) return true;
      return exitDate >= getToday();
    })
    .test('data-saida-fim-semana', 'Data de saída não pode ser fim de semana', (value) => {
      const exitDate = normalizeDate(value);
      if (!exitDate) return true;
      return !isWeekend(exitDate);
    })
    .test('data-saida-maior', 'Data de saída deve ser maior que a data de entrada', function (value) {
      const { dataEntrada } = this.parent;
      const entryDate = normalizeDate(dataEntrada);
      const exitDate = normalizeDate(value);
      if (!entryDate || !exitDate) return true;
      return exitDate > entryDate;
    })
    .test(
      'data-saida-limite',
      `Data de saída não pode ultrapassar ${MAX_DATE_RANGE_DAYS} dias da data de entrada`,
      function (value) {
        const { dataEntrada } = this.parent;
        const entryDate = normalizeDate(dataEntrada);
        const exitDate = normalizeDate(value);
        if (!entryDate || !exitDate) return true;

        const diffInMs = exitDate.getTime() - entryDate.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays <= MAX_DATE_RANGE_DAYS;
      },
    ),

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

