import { ClientData } from '../model/dtos/client.data';

export function mapClientToForm(client: any): ClientData {
  return {
    nome: client.name,
    cpfCnpj: client.cpfCnpj,
    email: client.email,
    phone: client.phone,

    addressZip: client.addressZip,
    addressStreet: client.addressStreet,
    addressNumber: client.addressNumber,
    addressDistrict: client.addressDistrict,
    addressCity: client.addressCity,
    addressState: client.addressState,

    loja: client.unitIds?.[0] ?? null,
    tipoLegal: client.legalTypeId ?? null,
    notes: client.notes ?? '',
  };
}
