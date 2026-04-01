export interface NfServicoDto {
  dataLcto: string;
  tpServico: string;
  fornecedor: string;
  obsConsultor: string;
  valor: number;
}

export interface NfPlacaDto {
  placa: string;
  totalPlaca: number;
  quantidadeServicos: number;
  servicos: NfServicoDto[];
}

export interface NfLojaDto {
  loja: string;
  totalLoja: number;
  quantidadePlacas: number;
  placas: NfPlacaDto[];
}

export interface NfImportResponseDto {
  totalLinhasProcessadas: number;
  totalGeral: number;
  lojas: NfLojaDto[];
}
