import * as yup from 'yup';

export const stepOneSchema = yup.object({
  cliente: yup.number().nullable().required('Cliente é obrigatório'),

  plate: yup.string().required('Placa é obrigatória').min(7, 'Placa inválida'),

  year: yup
    .number()
    .typeError('Ano inválido')
    .required('Ano é obrigatório')
    .min(1900, 'Ano inválido')
    .max(new Date().getFullYear(), 'Ano inválido'),
});
