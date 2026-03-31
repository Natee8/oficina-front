import * as yup from 'yup';

export const stepOneSchema = yup.object({
  name: yup.string().required('Nome da loja é obrigatório').max(100, 'Máximo de 100 caracteres'),

  cnpj: yup.string().required('CNPJ é obrigatório').min(14, 'CNPJ inválido'),

  phone: yup.string().required('Telefone é obrigatório'),

  email: yup.string().required('Email é obrigatório').email('Email inválido'),
});
