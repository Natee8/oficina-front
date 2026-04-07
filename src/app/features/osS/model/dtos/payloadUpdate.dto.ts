import { CreateOsPayload } from './osPayload';

export interface UpdateOsPayload extends CreateOsPayload {
  statusId: number;
  deliveryDate: string | null;
}
