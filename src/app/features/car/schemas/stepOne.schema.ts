import * as yup from 'yup';

export const stepOneSchema = yup.object({
  cliente: yup.number().nullable().required('Cliente é obrigatório'),

  plate: yup
    .string()
    .required('Placa é obrigatória')
    .matches(/^[A-Z]{3}[0-9][A-Z][0-9]{2}$/, 'Placa inválida. Formato correto: ABC1D23'),

  year: yup
    .number()
    .typeError('Ano inválido')
    .required('Ano é obrigatório')
    .min(1900, 'Ano inválido')
    .max(new Date().getFullYear(), 'Ano inválido'),
});
