export function detectClientLegalTypeId(cpfCnpj: string): number | null {
  const normalizedDocument = cpfCnpj.replace(/\D/g, '');

  if (normalizedDocument.length === 11) {
    return 1;
  }

  if (normalizedDocument.length === 14) {
    return 2;
  }

  return null;
}

export function getClientLegalTypeLabel(legalTypeId: number | null): string {
  if (legalTypeId === 1) {
    return 'Cliente Fisico';
  }

  if (legalTypeId === 2) {
    return 'Cliente Empresa';
  }

  return '-';
}