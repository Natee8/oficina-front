import * as yup from 'yup';

export const stepTwoEmployersSchema = yup.object().shape({
  addressZip: yup
    .string()
    .required('O CEP é obrigatório')
    .matches(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  addressNumber: yup.string().required('O número é obrigatório'),
  addressStreet: yup.string().required('A rua é obrigatória'),
  addressDistrict: yup.string().required('O bairro é obrigatório'),
  addressCity: yup.string().required('A cidade é obrigatória'),
  addressState: yup.string().required('O estado é obrigatório').max(2, 'Use a sigla do estado'),
});
