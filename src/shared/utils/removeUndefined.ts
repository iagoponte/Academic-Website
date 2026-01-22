type WithoutUndefined<T> = {
  [K in keyof T as T[K] extends undefined ? never : K]:
    Exclude<T[K], undefined>;
};

export function removeUndefined<T extends Record<string, any>>(
  obj: T
): WithoutUndefined<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  ) as WithoutUndefined<T>;
}
