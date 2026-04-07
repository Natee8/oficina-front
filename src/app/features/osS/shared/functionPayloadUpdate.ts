import { OsData } from '../model/dtos/os.data';
import { OsDto } from '../model/dtos/os.dto';
import { UpdateOsPayload } from '../model/dtos/payloadUpdate.dto';

const parseCurrency = (value: string | number | null | undefined): number | null => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  const normalized = value.toString().trim().replace(/\./g, '').replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed !== 0 ? parsed : null;
};

const nullIfEmpty = (s: string | null | undefined): string | null =>
  s && s.trim() ? s.trim() : null;

const toIsoDateTime = (dateValue: string | null | undefined, hour: number): string => {
  if (!dateValue) return '';
  return `${dateValue}T${String(hour).padStart(2, '0')}:00:00`;
};

export function buildUpdateOsPayload(
  osData: OsData,
  original: OsDto,
  pecasAdicionadas: { nome: string; quantidade: number; valorUnitario: number }[],
): UpdateOsPayload {
  return {
    unitId: osData.loja ?? original.unitId,
    vehicleId: osData.veiculo ?? original.vehicleId,
    ownerCustomerId: osData.cliente ?? original.ownerCustomerId,
    statusId: original.statusId,
    entryDate: toIsoDateTime(osData.dataEntrada, 10),
    estimatedDeliveryDate: toIsoDateTime(osData.dataSaida, 18),
    deliveryDate: null,
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
