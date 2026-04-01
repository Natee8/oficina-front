// src/app/modules/stores/model/store.payload.ts

import { StoreData } from '../model/store.data';
import { CreateStorePayload } from '../model/storePayload';

export function buildStorePayload(storeData: StoreData): CreateStorePayload {
  const parseString = (value: string | null | undefined): string => value?.trim() || '';

  const parseNumberAsString = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return Number.isFinite(value) ? value.toString() : '';
    return value.toString().trim();
  };

  return {
    name: parseString(storeData.name),
    cnpj: parseString(storeData.cnpj),
    phone: parseString(storeData.phone),
    email: parseString(storeData.email),
    addressZip: parseString(storeData.addressZip),
    addressStreet: parseString(storeData.addressStreet),
    addressNumber: parseNumberAsString(storeData.addressNumber),
    addressDistrict: parseString(storeData.addressDistrict),
    addressCity: parseString(storeData.addressCity),
    addressState: parseString(storeData.addressState),
  };
}
