import { EmployeeData } from '../model/dtos/employer.data';
import { EmployeeListItem } from '../model/dtos/employerPayload';

function normalizeEmployeeRole(role: string): string {
  const normalizedRole = role?.trim().toLowerCase();

  const roleMap: Record<string, string> = {
    administrador: 'admin',
    admin: 'admin',
    funcionario: 'employee',
    'funcionário': 'employee',
    comum: 'employee',
    employee: 'employee',
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
    unitIds: normalizedRole === 'admin' ? [] : data.loja,
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

  return {
    name: data.nome,
    email: data.email,
    phoneNumber: data.telefone,
    role: normalizedRole,
    isActive: employee.isActive,
    fullAccess: employee.fullAccess,
    unitIds: normalizedRole === 'admin' ? [] : data.loja,
  };
}
