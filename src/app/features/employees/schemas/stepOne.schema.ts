import * as yup from 'yup';
import { onlyNumbers } from '../../../shared/functions/functionRemoveMask';

function isValidCpf(value: string | null | undefined): boolean {
  const cpf = onlyNumbers(value);

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;

  for (let index = 0; index < 9; index++) {
    sum += Number(cpf.charAt(index)) * (10 - index);
  }

  let result = (sum * 10) % 11;
  if (result === 10) {
    result = 0;
  }

  if (result !== Number(cpf.charAt(9))) {
    return false;
  }

  sum = 0;

  for (let index = 0; index < 10; index++) {
    sum += Number(cpf.charAt(index)) * (11 - index);
  }

  result = (sum * 10) % 11;
  if (result === 10) {
    result = 0;
  }

  return result === Number(cpf.charAt(10));
}

function isValidPhone(value: string | null | undefined): boolean {
  const phone = onlyNumbers(value);

  if (!phone || /^(\d)\1+$/.test(phone)) {
    return false;
  }

  if (phone.length === 11) {
    return /^[1-9]{2}9\d{8}$/.test(phone);
  }

  if (phone.length === 10) {
    return /^[1-9]{2}[2-8]\d{7}$/.test(phone);
  }

  return false;
}

export const stepOneEmployersSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .test('cpf-valid', 'CPF inválido', (value) => isValidCpf(value)),
  telefone: yup
    .string()
    .required('O telefone é obrigatório')
    .test('phone-valid', 'Telefone inválido', (value) => isValidPhone(value)),
});
