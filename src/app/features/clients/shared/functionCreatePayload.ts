// src/app/modules/clients/model/client.payload.ts

import { ClientData } from '../model/dtos/client.data';
import { CreateClientDto } from '../model/dtos/createClient.dto';
import { detectClientLegalTypeId } from './legalType';

export function buildClientPayload(data: ClientData): CreateClientDto {
  const unitIds = [...new Set(data.loja.map(Number).filter((unitId) => Number.isInteger(unitId) && unitId > 0))];
  const legalTypeId = detectClientLegalTypeId(data.cpfCnpj);

  if (!legalTypeId) {
    throw new Error('CPF/CNPJ invalido para definir o tipo legal.');
  }

  return {
    unitId: unitIds[0] ?? 0,
    unitIds,
    legalTypeId,
    name: data.nome,
    cpfCnpj: data.cpfCnpj,
    email: data.email,
    phone: data.phone,
    addressZip: data.addressZip,
    addressStreet: data.addressStreet,
    addressNumber: data.addressNumber,
    addressDistrict: data.addressDistrict,
    addressCity: data.addressCity,
    addressState: data.addressState,
    notes: data.notes,
  };
}
