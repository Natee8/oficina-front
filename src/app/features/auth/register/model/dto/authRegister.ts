export interface RegisterData {
  tenantName: string;
  unit: {
    name: string;
    cnpj: string;
    addressZip: string;
    addressStreet: string;
    addressNumber: string;
    addressDistrict: string;
    addressCity: string;
    addressState: string;
  };
  adminName: string;
  adminEmail: string;
  adminPhoneNumber: string;
  adminPassword: string;
}

export interface RegisterResponse {
  email: string;
  password: string;
}
