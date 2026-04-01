import { CreateOsPart } from './osPart.dto';

export interface CreateOsPayload {
  unitId: number;
  vehicleId: number;
  ownerCustomerId: number;
  entryDate: string;
  estimatedDeliveryDate: string;
  bodyworkDescription: string;
  bodyworkValue: number;
  paintDescription: string;
  paintValue: number;
  parts: CreateOsPart[];
}
