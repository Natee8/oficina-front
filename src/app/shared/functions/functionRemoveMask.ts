export function onlyNumbers(value: string | null | undefined): string {
  if (!value) return '';
  return value.replace(/\D/g, '');
}

export function removeSpaces(value?: string): string {
  return value?.trim() || '';
}

export function normalize(value?: string): string {
  return value ? value.trim().toLowerCase() : '';
}
