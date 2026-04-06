export interface CreateClientDto {
  unitId: number;
  unitIds: number[];
  legalTypeId: number;
  name: string;
  cpfCnpj: string;
  email: string;
  phone: string;
  addressZip: string;
  addressStreet: string;
  addressNumber: string;
  addressDistrict: string;
  addressCity: string;
  addressState: string;
  notes: string;
}
