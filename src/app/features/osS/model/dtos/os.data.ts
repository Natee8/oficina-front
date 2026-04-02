export interface OsData {
  loja: number | null;
  cliente: number | null;
  veiculo: number | null;
  dataEntrada: string;
  dataSaida: string;
  pintura: string;
  funilaria: string;
  valorPintura: string;
  valorFunilaria: string;
  mecanica: string;
  valorMecanica: string;

  peca: string;
  quantidade: number | null;
  valorUnitario: string;
}

export function createOsData(): OsData {
  return {
    loja: null,
    cliente: null,
    veiculo: null,
    dataEntrada: '',
    dataSaida: '',
    pintura: '',
    funilaria: '',
    valorPintura: '',
    valorFunilaria: '',
    mecanica: '',
    valorMecanica: '',
    peca: '',
    quantidade: null,
    valorUnitario: '',
  };
}
