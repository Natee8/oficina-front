import * as yup from 'yup';

export const stepThreeEmployersSchema = yup.object().shape({
  cargo: yup.string().required('O cargo é obrigatório'),
  loja: yup.array().of(yup.number()).default([]),
  email: yup.string().required('O email é obrigatório').email('Email inválido'),
  senha: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});
