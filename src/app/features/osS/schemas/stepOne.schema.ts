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
  )
    return null;
  date.setHours(0, 0, 0, 0);
  return date;
};

const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;

const parseCurrency = (value: string | null | undefined): number => {
  if (!value) return 0;

  const normalized = value.toString().trim().replace(/\./g, '').replace(',', '.');
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
};

// Defina a interface do seu form
export interface OsData {
  loja: number | null;
  cliente: number | null;
  veiculo: number | null;
  dataEntrada: string | null;
  dataSaida: string | null;
  pintura: string | null;
  valorPintura: string | null;
  funilaria: string | null;
  valorFunilaria: string | null;
  mecanica: string | null;
  valorMecanica: string | null;
  peca?: string | null;
  quantidade?: number | null;
  valorUnitario?: string | null;
}

export const StepOneOsSchema = yup
  .object<OsData>({
    loja: yup.number().nullable().required('Selecione a loja'),
    cliente: yup.number().nullable().required('Selecione o cliente'),
    veiculo: yup.number().nullable().required('Selecione o veículo'),

    dataEntrada: yup
      .string()
      .required('Informe a data de entrada')
      .test('data-entrada-valida', 'Data inválida', (value) => !!normalizeDate(value))
      .test('data-entrada-passado', 'Data de entrada não pode ser no passado', (value) => {
        const date = normalizeDate(value);
        return !date || date >= getToday();
      })
      .test('data-entrada-fim-semana', 'Data de entrada não pode ser fim de semana', (value) => {
        const date = normalizeDate(value);
        return !date || !isWeekend(date);
      }),

    dataSaida: yup
      .string()
      .required('Informe a data de saída')
      .test('data-saida-valida', 'Data inválida', (value) => !!normalizeDate(value))
      .test('data-saida-passado', 'Data de saída não pode ser no passado', (value) => {
        const date = normalizeDate(value);
        return !date || date >= getToday();
      })
      .test('data-saida-fim-semana', 'Data de saída não pode ser fim de semana', (value) => {
        const date = normalizeDate(value);
        return !date || !isWeekend(date);
      })
      .test('data-saida-maior', 'Data de saída deve ser maior que a entrada', function (value) {
        const parent = this.parent as OsData;
        const entry = normalizeDate(parent.dataEntrada);
        const exit = normalizeDate(value);
        if (!entry || !exit) return true;
        return exit > entry;
      })
      .test(
        'data-saida-limite',
        `Data de saída não pode ultrapassar ${MAX_DATE_RANGE_DAYS} dias da entrada`,
        function (value) {
          const parent = this.parent as OsData;
          const entry = normalizeDate(parent.dataEntrada);
          const exit = normalizeDate(value);
          if (!entry || !exit) return true;
          return (exit.getTime() - entry.getTime()) / (1000 * 60 * 60 * 24) <= MAX_DATE_RANGE_DAYS;
        },
      ),

    pintura: yup.string().nullable(),
    valorPintura: yup
      .string()
      .nullable()
      .test('valor-pintura-par', 'Informe valor junto da pintura', function (value) {
        const parent = this.parent as OsData;
        if (!!parent.pintura && parseCurrency(value) <= 0) return false;
        return true;
      }),

    funilaria: yup.string().nullable(),
    valorFunilaria: yup
      .string()
      .nullable()
      .test('valor-funilaria-par', 'Informe valor junto da funilaria', function (value) {
        const parent = this.parent as OsData;
        if (!!parent.funilaria && parseCurrency(value) <= 0) return false;
        return true;
      }),

    mecanica: yup.string().nullable(),
    valorMecanica: yup
      .string()
      .nullable()
      .test('valor-mecanica-par', 'Informe valor junto da mecânica', function (value) {
        const parent = this.parent as OsData;
        if (!!parent.mecanica && parseCurrency(value) <= 0) return false;
        return true;
      }),

    peca: yup.string().nullable(),
    quantidade: yup.number().nullable(),
    valorUnitario: yup.string().nullable(),
  })
  .test(
    'ao-menos-um',
    'Informe ao menos: funilaria, pintura, mecânica ou peças',
    function (values) {
      const parent = values as OsData;

      const hasPintura =
        !!parent.pintura && parseCurrency(parent.valorPintura) > 0;

      const hasFunilaria =
        !!parent.funilaria && parseCurrency(parent.valorFunilaria) > 0;

      const hasMecanica =
        !!parent.mecanica && parseCurrency(parent.valorMecanica) > 0;

      const hasParts = (this.options.context as { hasParts: boolean } | undefined)?.hasParts;

      if (!hasPintura && !hasFunilaria && !hasMecanica && !hasParts) {
        return this.createError({
          path: 'funilaria',
          message: 'Informe ao menos: funilaria, pintura, mecânica ou peças',
        });
      }

      return true;
    },
  );
