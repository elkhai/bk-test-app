import isMobile from 'ismobilejs';

export function formatDate(datetime: string): string {
  const [date, time] = datetime.split(' ');
  if (isMobile().any) {
    const [_, month, day] = date.split('-');
    return `${time.substring(0, 5)} ${day}.${month}`;
  }
  return `${time.substring(0, 5)} ${date.replace(/-/g, '.')}`;
}
