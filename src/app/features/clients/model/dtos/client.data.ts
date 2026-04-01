export interface ClientData {
  nome: string;
  cpfCnpj: string;
  email: string;
  telefone: string;

  addressZip: string;
  addressNumber: string;
  addressStreet: string;
  addressDistrict: string;
  addressCity: string;
  addressState: string;

  notes: string;
}

export function createClientData(): ClientData {
  return {
    nome: '',
    cpfCnpj: '',
    email: '',
    telefone: '',

    addressZip: '',
    addressNumber: '',
    addressStreet: '',
    addressDistrict: '',
    addressCity: '',
    addressState: '',

    notes: '',
  };
}
