// src/app/features/register/schemas/stepOne.schema.ts
import * as yup from 'yup';

export const stepOneSchema = yup.object({
  name: yup
    .string()
    .required('Nome da empresa é obrigatório')
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
    .max(50, 'Nome da empresa deve ter no máximo 50 caracteres'),

  storeName: yup
    .string()
    .required('Nome da loja é obrigatório')
    .min(2, 'Nome da loja deve ter pelo menos 2 caracteres'),

  cnpj: yup
    .string()
    .required('CNPJ é obrigatório')
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido'),
});
