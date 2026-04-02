export interface User {
  id: number;
  userName: string;
  email: string;
  phoneNumber: string;
  name: string;
  role: string;
  isActive: boolean;
  fullAccess: boolean;
  createdAt: string;
}

export type PartialUser = {
  id: number;
  name: string;
  email: string;
};
