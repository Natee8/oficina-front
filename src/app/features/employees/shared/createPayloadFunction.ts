import { EmployeeData } from '../model/dtos/employer.data';
import { EmployeeListItem } from '../model/dtos/employerPayload';

function normalizeEmployeeRole(role: string): string {
  const normalizedRole = role?.trim().toLowerCase();

  const roleMap: Record<string, string> = {
    administrador: 'Admin',
    admin: 'Admin',
    funcionario: 'Comum',
    'funcionário': 'Comum',
    comum: 'Comum',
    employee: 'Comum',
  };

  return roleMap[normalizedRole] ?? role;
}

export function buildEmployeePayload(data: EmployeeData) {
  const normalizedRole = normalizeEmployeeRole(data.cargo);

  return {
    name: data.nome,
    email: data.email,
    phoneNumber: data.telefone,
    password: data.senha,
    role: normalizedRole,
    unitIds: normalizedRole === 'Admin' ? [] : data.loja,
    cpfCnpj: data.cpf,
    addressZip: data.addressZip,
    addressStreet: data.addressStreet,
    addressNumber: data.addressNumber,
    addressDistrict: data.addressDistrict,
    addressCity: data.addressCity,
    addressState: data.addressState,
  };
}

export function buildEmployeeUpdatePayload(data: EmployeeData, employee: EmployeeListItem) {
  const normalizedRole = normalizeEmployeeRole(data.cargo || employee.role);
  const password = data.senha?.trim();

  return {
    name: data.nome,
    email: data.email,
    phoneNumber: data.telefone,
    cpfCnpj: data.cpf,
    role: normalizedRole,
    isActive: employee.isActive,
    fullAccess: employee.fullAccess,
    unitIds: normalizedRole === 'Admin' ? [] : data.loja,
    addressZip: data.addressZip,
    addressStreet: data.addressStreet,
    addressNumber: data.addressNumber,
    addressDistrict: data.addressDistrict,
    addressCity: data.addressCity,
    addressState: data.addressState,
    ...(password ? { newPassword: password } : {}),
  };
}
