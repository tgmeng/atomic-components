export function changePXRelatively(px: string, n: number) {
  return `${parseFloat(px) + n}px`;
}
