import { StatusOs } from '../types/status';

export interface Os {
  id: number;
  loja: string;
  valor: number;
  placa: string;
  cpf: string;
  cnpj: string;
  telefone: string;
  status: StatusOs;
}
