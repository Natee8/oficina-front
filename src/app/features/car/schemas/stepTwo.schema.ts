import * as yup from 'yup';

export const stepTwoSchema = yup.object({
  brand: yup.string().required('Marca é obrigatória'),

  model: yup.string().required('Modelo é obrigatório'),

  color: yup.string().required('Cor é obrigatória'),

  notes: yup.string().nullable().notRequired(),
});
