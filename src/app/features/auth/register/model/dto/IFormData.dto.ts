export interface StepOneData {
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
  address: string;
  phone: string;
}
