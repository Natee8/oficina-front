import * as yup from 'yup';

export const stepThreeSchema = yup.object({
  adminName: yup
    .string()
    .required('Nome do Administrador é obrigatório')
    .min(2, 'Nome do Administrador inválido')
    .max(50, 'Nome do Administrador muito longo'),

  adminEmail: yup
    .string()
    .required('E-mail do Administrador é obrigatório')
    .email('E-mail inválido'),

  adminPhoneNumber: yup
    .string()
    .required('Telefone do Administrador é obrigatório')
    .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido'),

  adminPassword: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});
