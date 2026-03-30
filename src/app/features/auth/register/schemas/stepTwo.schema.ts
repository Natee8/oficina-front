import * as yup from 'yup';

export const stepTwoSchema = yup.object({
  cep: yup
    .string()
    .required('CEP é obrigatório')
    .matches(/^\d{5}-\d{3}$/, 'CEP inválido'),

  state: yup.string().required('Estado é obrigatório').min(2, 'Estado inválido'),

  city: yup.string().required('Cidade é obrigatória').min(2, 'Cidade inválida'),

  district: yup.string().required('Bairro é obrigatório').min(2, 'Bairro inválido'),

  street: yup.string().required('Rua é obrigatória').min(2, 'Rua inválida'),

  number: yup.string().required('Número é obrigatório'),
});
