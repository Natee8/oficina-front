import * as yup from 'yup';

export const stepTwoSchema = yup.object({
  addressZip: yup.string().required('CEP é obrigatório'),

  addressStreet: yup.string().required('Rua é obrigatória'),

  addressNumber: yup.string().required('Número é obrigatório'),

  addressDistrict: yup.string().required('Bairro é obrigatório'),

  addressCity: yup.string().required('Cidade é obrigatória'),

  addressState: yup.string().required('Estado é obrigatório'),
});
