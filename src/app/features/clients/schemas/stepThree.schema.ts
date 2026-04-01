import * as yup from 'yup';

export const stepThreeClientSchema = yup.object({
  loja: yup.number().typeError('Loja é obrigatória').required('Loja é obrigatória'),

  tipoLegal: yup
    .number()
    .typeError('Tipo legal é obrigatório')
    .required('Tipo legal é obrigatório'),

  notes: yup.string().nullable(),
});
