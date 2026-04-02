// src/app/modules/os/model/os.payload.ts

import { OsData } from '../model/dtos/os.data';
import { CreateOsPayload } from '../model/dtos/osPayload';

export function buildOsPayload(
  osData: OsData,
  pecasAdicionadas: { nome: string; quantidade: number; valorUnitario: number }[],
): CreateOsPayload {
  const parseCurrency = (value: string | number | null | undefined): number | null => {
    if (value == null || value === '') return null;
    if (typeof value === 'number') return value;
    const parsed = Number(value.toString().trim().replace(/\./g, '').replace(',', '.'));
    return isNaN(parsed) || parsed === 0 ? null : parsed;
  };

  const toIsoUtc = (dateValue: string, hour: number): string => {
    if (!dateValue) return '';
    return `${dateValue}T${String(hour).padStart(2, '0')}:00:00Z`;
  };

  const nullIfEmpty = (s: string): string | null => (s && s.trim() ? s.trim() : null);

  return {
    unitId: osData.loja ?? 1,
    vehicleId: osData.veiculo ?? 10,
    ownerCustomerId: osData.cliente ?? 25,
    entryDate: toIsoUtc(osData.dataEntrada, 10),
    estimatedDeliveryDate: toIsoUtc(osData.dataSaida, 18),
    bodyworkDescription: nullIfEmpty(osData.funilaria),
    bodyworkValue: parseCurrency(osData.valorFunilaria),
    paintDescription: nullIfEmpty(osData.pintura),
    paintValue: parseCurrency(osData.valorPintura),
    mechanicsDescription: nullIfEmpty(osData.mecanica),
    mechanicsValue: parseCurrency(osData.valorMecanica),
    parts: pecasAdicionadas.map((p) => ({
      description: p.nome,
      quantity: Number(p.quantidade),
      unitPrice: parseCurrency(p.valorUnitario) ?? 0,
    })),
  };
}
