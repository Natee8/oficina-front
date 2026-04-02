export interface CreateOsPayload {
  unitId: number;
  vehicleId: number;
  ownerCustomerId: number;
  entryDate: string;
  estimatedDeliveryDate: string;
  bodyworkDescription?: string | null;
  bodyworkValue?: number | null;
  paintDescription?: string | null;
  paintValue?: number | null;
  mechanicsDescription?: string | null;
  mechanicsValue?: number | null;
  parts?: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
}
