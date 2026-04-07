import * as yup from 'yup';
import { isValidCnpj } from '../../../shared/functions/valitedCNPJ';

export const stepOneSchema = yup.object({
  name: yup.string().required('Nome da loja é obrigatório').max(100, 'Máximo de 100 caracteres'),

  cnpj: yup
    .string()
    .required('CNPJ é obrigatório')
    .test('cnpj-valid', 'CNPJ inválido', (value) => isValidCnpj(value)),

  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido'),

  email: yup.string().required('Email é obrigatório').email('Email inválido'),
});
