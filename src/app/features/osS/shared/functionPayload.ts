// src/app/modules/os/model/os.payload.ts

import { OsData } from '../model/dtos/os.data';
import { CreateOsPayload } from '../model/dtos/osPayload';

export function buildOsPayload(
  osData: OsData,
  pecasAdicionadas: { nome: string; quantidade: number; valorUnitario: number }[],
): CreateOsPayload {
  const parseCurrency = (value: string | number | null | undefined): number => {
    if (value == null) return 0;
    if (typeof value === 'number') return value;
    return Number(value.toString().trim().replace(/\./g, '').replace(',', '.')) || 0;
  };

  const toIsoUtc = (dateValue: string, hour: number): string => {
    if (!dateValue) return '';
    return `${dateValue}T${String(hour).padStart(2, '0')}:00:00Z`;
  };

  return {
    unitId: osData.loja ?? 1,
    vehicleId: osData.veiculo ?? 10,
    ownerCustomerId: osData.cliente ?? 25,
    entryDate: toIsoUtc(osData.dataEntrada, 10),
    estimatedDeliveryDate: toIsoUtc(osData.dataSaida, 18),
    bodyworkDescription: osData.funilaria,
    bodyworkValue: parseCurrency(osData.valorFunilaria),
    paintDescription: osData.pintura,
    paintValue: parseCurrency(osData.valorPintura),
    parts: pecasAdicionadas.map((p) => ({
      description: p.nome,
      quantity: Number(p.quantidade),
      unitPrice: parseCurrency(p.valorUnitario),
    })),
  };
}
