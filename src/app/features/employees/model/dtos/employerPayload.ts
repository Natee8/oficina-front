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

export interface Unit {
  id: number;
  name: string;
}
