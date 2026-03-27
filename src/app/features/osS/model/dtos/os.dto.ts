export interface OsDto {
  id: number;
  tenantId: number;
  unitId: number;
  unitName: string;
  vehicleId: number;
  vehiclePlate: string;
  ownerCustomerId: number;
  ownerCustomerName: string;
  statusId: number;
  statusCode: string;
  statusName: string;
  entryDate: string;
  estimatedDeliveryDate: string;
  deliveryDate: string | null;
  bodyworkDescription: string;
  bodyworkValue: number;
  paintDescription: string;
  paintValue: number;
  partsValue: number;
  totalDiscount: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}
