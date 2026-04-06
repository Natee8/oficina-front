export interface EmployeeData {
  nome: string;
  cpf: string;
  telefone: string;

  addressZip: string;
  addressNumber: string;
  addressStreet: string;
  addressDistrict: string;
  addressCity: string;
  addressState: string;

  cargo: string;
  loja: number[];
  email: string;
  senha: string;
}

export function createEmployeeData(): EmployeeData {
  return {
    nome: '',
    cpf: '',
    telefone: '',

    addressZip: '',
    addressNumber: '',
    addressStreet: '',
    addressDistrict: '',
    addressCity: '',
    addressState: '',

    cargo: '',
    loja: [],
    email: '',
    senha: '',
  };
}
