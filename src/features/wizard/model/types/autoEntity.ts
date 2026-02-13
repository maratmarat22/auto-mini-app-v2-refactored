export interface AutoEntity {
  id: string;
  name: string;
}

export const isAutoEntity = (x: unknown): x is AutoEntity => {
  if (typeof x !== 'object' || x === null) return false;

  const rec = x as Record<string, unknown>;

  return typeof rec.id === 'string' && typeof rec.name === 'string';
};

export const isAutoEntityArray = (x: unknown): x is AutoEntity[] => {
  return Array.isArray(x) && x.every((item) => isAutoEntity(item));
};

export interface RangeEntity<T> {
  from: T;
  to: T;
}
