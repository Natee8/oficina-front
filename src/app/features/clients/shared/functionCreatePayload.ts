// src/app/modules/clients/model/client.payload.ts

import { ClientData } from '../model/dtos/client.data';
import { CreateClientDto } from '../model/dtos/createClient.dto';

export function buildClientPayload(data: ClientData): CreateClientDto {
  return {
    unitId: Number(data.loja),
    legalTypeId: Number(data.tipoLegal),
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
