// carouselMath.ts
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerpClamp(a: number, b: number, t: number) {
  return lerp(a, b, clamp(t, 0, 1));
}

export function rotateLeft<T>(arr: readonly T[]) {
  if (arr.length <= 1) return [...arr];
  return [...arr.slice(1), arr[0]];
}

export function rotateRight<T>(arr: readonly T[]) {
  if (arr.length <= 1) return [...arr];
  return [arr[arr.length - 1], ...arr.slice(0, -1)];
}
