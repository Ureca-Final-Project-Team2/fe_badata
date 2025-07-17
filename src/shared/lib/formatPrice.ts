export function formatPrice(value: string): string {
  const numeric = value.replace(/[^\d]/g, '');
  return Number(numeric).toLocaleString();
}

export function toRawPrice(value: string): number {
  return Number(value.replace(/,/g, '').trim());
}
