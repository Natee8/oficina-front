import * as yup from 'yup';

export const stepOneClientSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório'),

  cpfCnpj: yup
    .string()
    .required('CPF/CNPJ é obrigatório')
    .test('cpf-cnpj', 'CPF/CNPJ inválido', (value) => {
      if (!value) return false;
      const cleaned = value.replace(/\D/g, '');
      return cleaned.length === 11 || cleaned.length === 14;
    }),

  email: yup.string().email('Email inválido').required('Email é obrigatório'),

  phone: yup.string().required('Telefone é obrigatório').min(10, 'Telefone inválido'),
});
