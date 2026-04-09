// src/app/modules/clients/model/client.payload.ts

import { ClientData } from '../model/dtos/client.data';
import { CreateClientDto } from '../model/dtos/createClient.dto';
import { detectClientLegalTypeId } from './legalType';

export function buildClientPayload(data: ClientData, allowedUnitIds: number[]): CreateClientDto {
  const selectedUnitIds = Array.isArray(data.loja)
    ? data.loja.map(Number).filter((unitId) => Number.isInteger(unitId) && unitId > 0)
    : [];
  const filteredUnitIds = selectedUnitIds.filter((id) => allowedUnitIds.includes(id));
  const legalTypeId = detectClientLegalTypeId(data.cpfCnpj);

  if (!legalTypeId) {
    throw new Error('CPF/CNPJ invalido para definir o tipo legal.');
  }

  return {
    unitId: filteredUnitIds[0] ?? 0, // primeira loja permitida selecionada ou 0
    unitIds: filteredUnitIds, // todas as lojas selecionadas e permitidas
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
