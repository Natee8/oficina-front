export interface StoreData {
  name: string;
  cnpj: string;
  phone: string;
  email: string;
  addressZip: string;
  addressStreet: string;
  addressNumber: string;
  addressDistrict: string;
  addressCity: string;
  addressState: string;
}

export const createStoreData = () => ({
  name: '',
  cnpj: '',
  phone: '',
  email: '',
  addressZip: '',
  addressStreet: '',
  addressNumber: '',
  addressDistrict: '',
  addressCity: '',
  addressState: '',
});
