type CachedFunction<K, T> = (key: K) => T;

export function withCache<TKey, TValue>(
  fn: CachedFunction<TKey, TValue>,
): CachedFunction<TKey, TValue> {
  const cache: { [key: string]: TValue } = {};
  return key => cache[key as any as string]
    || (cache[key as any as string] = fn(key));
}

export default <T>(fn: CachedFunction<string, T>) =>
  withCache<string, T>(fn);

export const withCacheIdx = <T>(fn: CachedFunction<number, T>) =>
  withCache<number, T>(fn);

