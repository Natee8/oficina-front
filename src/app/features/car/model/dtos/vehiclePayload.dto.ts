export interface CreateVehiclePayload {
  customerId: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  vin: string;
  renavam: string;
  insuranceClaimNumber: string;
  notes: string;
}
