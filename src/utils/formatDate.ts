export function formatDate(datetime: string): string {
  const [date, time] = datetime.split(' ');
  return `${time.substring(0, 5)} ${date.replace(/-/g, '.')}`;
}
