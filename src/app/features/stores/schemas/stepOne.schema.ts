import * as yup from 'yup';
import { onlyNumbers } from '../../../shared/functions/functionRemoveMask';

function isValidCnpj(value: string | null | undefined): boolean {
  const cnpj = onlyNumbers(value);

  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  let length = 12;
  let numbers = cnpj.substring(0, length);
  const digits = cnpj.substring(length);
  let sum = 0;
  let position = length - 7;

  for (let index = length; index >= 1; index--) {
    sum += Number(numbers.charAt(length - index)) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== Number(digits.charAt(0))) {
    return false;
  }

  length = 13;
  numbers = cnpj.substring(0, length);
  sum = 0;
  position = length - 7;

  for (let index = length; index >= 1; index--) {
    sum += Number(numbers.charAt(length - index)) * position--;
    if (position < 2) {
      position = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === Number(digits.charAt(1));
}

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
