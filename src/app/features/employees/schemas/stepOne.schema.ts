import * as yup from 'yup';

export const stepOneEmployersSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .matches(/^\d{11}$/, 'O CPF deve ter 11 dígitos'),
  telefone: yup
    .string()
    .required('O telefone é obrigatório')
    .matches(/^\d{10,11}$/, 'O telefone deve ter 10 ou 11 dígitos'),
});
