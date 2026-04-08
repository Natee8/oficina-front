import { ClientData } from '../model/dtos/client.data';
import { detectClientLegalTypeId } from './legalType';

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

    loja: client.unitIds ?? [],
    tipoLegal: detectClientLegalTypeId(client.cpfCnpj) ?? client.legalTypeId ?? null,
    notes: client.notes ?? '',
  };
}
