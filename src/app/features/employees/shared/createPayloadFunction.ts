// src/app/modules/employees/model/employee.payload.ts

import { EmployeeData } from '../model/dtos/employer.data';

export function buildEmployeePayload(data: EmployeeData) {
  return {
    name: data.nome,
    email: data.email,
    phoneNumber: data.telefone,
    password: data.senha,
    role: data.cargo,
    unitIds: data.loja ? [data.loja] : [],
    cpfCnpj: data.cpf,
    addressZip: data.addressZip,
    addressStreet: data.addressStreet,
    addressNumber: data.addressNumber,
    addressDistrict: data.addressDistrict,
    addressCity: data.addressCity,
    addressState: data.addressState,
  };
}
