// @flow

export function anInt(n: number): number {
  return Math.floor(n * Math.random());
}

export function oneOf(arr: Array<any>): any {
  const i = anInt(arr.length);
  return arr[i];
}
