export interface StepOneData {
  storeName: string;
  cnpj: string;
  name: string;
}

export interface StepTwoData {
  name: string;
  cep: string;
  state: string;
  city: string;
  district: string;
  street: string;
  number: string;
}

export interface StepThreeData {
  adminName: string;
  adminEmail: string;
  adminPhoneNumber: string;
  adminPassword: string;
}
