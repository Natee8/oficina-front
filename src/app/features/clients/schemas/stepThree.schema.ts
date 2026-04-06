import * as yup from 'yup';

export const stepThreeClientSchema = yup.object({
  loja: yup
    .array()
    .of(yup.number().typeError('Loja inválida'))
    .min(1, 'Selecione ao menos uma loja')
    .required('Selecione ao menos uma loja'),

  tipoLegal: yup
    .number()
    .typeError('Tipo legal é obrigatório')
    .required('Tipo legal é obrigatório'),

  notes: yup.string().nullable(),
});
