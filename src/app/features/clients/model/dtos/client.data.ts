export interface ClientData {
  loja: number[];
  tipoLegal: number | null;

  nome: string;
  cpfCnpj: string;
  email: string;
  phone: string;

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
    loja: [],
    tipoLegal: null,

    nome: '',
    cpfCnpj: '',
    email: '',
    phone: '',

    addressZip: '',
    addressNumber: '',
    addressStreet: '',
    addressDistrict: '',
    addressCity: '',
    addressState: '',

    notes: '',
  };
}
