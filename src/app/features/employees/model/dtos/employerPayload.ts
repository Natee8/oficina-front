export interface CreateEmployeePayload {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
  unitIds: number[];
  cpfCnpj: string;
  addressZip: string;
  addressStreet: string;
  addressNumber: string;
  addressDistrict: string;
  addressCity: string;
  addressState: string;
}

export interface EmployeeListItem {
  id: number;
  tenantId: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  isActive: boolean;
  fullAccess: boolean;
  createdAt: string;
  unitIds: number[];
  cpfCnpj?: string;
  addressZip?: string;
  addressStreet?: string;
  addressNumber?: string;
  addressDistrict?: string;
  addressCity?: string;
  addressState?: string;
}

export interface UpdateEmployeePayload {
  name: string;
  email: string;
  phoneNumber: string;
  cpfCnpj: string;
  role: string;
  isActive: boolean;
  fullAccess: boolean;
  unitIds: number[];
  addressZip: string;
  addressStreet: string;
  addressNumber: string;
  addressDistrict: string;
  addressCity: string;
  addressState: string;
  newPassword?: string;
}

export interface Unit {
  id: number;
  name: string;
}
