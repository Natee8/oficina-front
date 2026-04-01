export interface CarData {
  cliente: number | null;

  plate: string;
  year: number | null;
  vin: string;
  renavam: string;
  insuranceClaimNumber: string;

  brand: string;
  model: string;
  color: string;

  notes: string;
}

export function createCarData(): CarData {
  return {
    cliente: null,

    plate: '',
    year: null,
    vin: '',
    renavam: '',
    insuranceClaimNumber: '',

    brand: '',
    model: '',
    color: '',

    notes: '',
  };
}
