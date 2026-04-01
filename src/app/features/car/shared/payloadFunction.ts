import { CarData } from '../model/dtos/vehicle.data';
import { CreateVehiclePayload } from '../service/car.service';

export function buildVehiclePayload(data: CarData): CreateVehiclePayload {
  if (data.cliente === null) {
    throw new Error('Cliente não pode ser nulo');
  }

  return {
    customerId: data.cliente,
    plate: data.plate,
    year: Number(data.year) || 0,
    vin: data.vin,
    renavam: data.renavam,
    insuranceClaimNumber: data.insuranceClaimNumber,
    brand: data.brand,
    model: data.model,
    color: data.color,
    notes: data.notes,
  };
}
