export function dateToNumber(date: string): number {
  return Number(date.replace(/[\s-:]/g, ''));
}
