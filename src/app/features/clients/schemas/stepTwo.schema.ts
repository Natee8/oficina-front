import * as yup from 'yup';

export const stepTwoClientSchema = yup.object({
  addressZip: yup.string().required('CEP é obrigatório').min(8, 'CEP inválido'),

  addressNumber: yup.string().required('Número é obrigatório'),

  addressStreet: yup.string().required('Rua é obrigatória'),

  addressDistrict: yup.string().required('Bairro é obrigatório'),

  addressCity: yup.string().required('Cidade é obrigatória'),

  addressState: yup.string().required('Estado é obrigatório').max(2, 'Use a sigla do estado'),
});
