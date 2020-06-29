import { math } from 'polished';

export function changePXRelatively(px: string, n: number) {
  return math(`${px} + ${n}px`);
}
