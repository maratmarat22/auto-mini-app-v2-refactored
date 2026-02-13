export type AutoQueriesKey =
  | 'brandsData'
  | 'brandsLoading'
  | 'modelsData'
  | 'modelsLoading'
  | 'generationsData'
  | 'generationsLoading'
  | 'configurationsData'
  | 'configurationsLoading'
  | 'modificationsData'
  | 'modificationsLoading'
  | 'bodyTypesData'
  | 'bodyTypesLoading'
  | 'engineTypesData'
  | 'engineTypesLoading'
  | 'gearTypesData'
  | 'gearTypesLoading'
  | 'transmissionsData'
  | 'transmissionsLoading';

export type AutoQueriesDataKey = Extract<AutoQueriesKey, `${string}Data`>;

const AUTO_QUERIES_DATA_KEYS = [
  'brandsData',
  'modelsData',
  'generationsData',
  'configurationsData',
  'modificationsData',
  'bodyTypesData',
  'engineTypesData',
  'gearTypesData',
  'transmissionsData',
] as const satisfies AutoQueriesDataKey[];

export function isAutoQueriesDataKey(x: unknown): x is AutoQueriesDataKey {
  return (
    typeof x === 'string' &&
    (AUTO_QUERIES_DATA_KEYS as readonly string[]).includes(x)
  );
}

export type AutoQueriesLoadingKey = Extract<AutoQueriesKey, `${string}Loading`>;

const AUTO_QUERIES_LOADING_KEYS = [
  'brandsLoading',
  'modelsLoading',
  'generationsLoading',
  'configurationsLoading',
  'modificationsLoading',
  'bodyTypesLoading',
  'engineTypesLoading',
  'gearTypesLoading',
  'transmissionsLoading',
] as const satisfies AutoQueriesLoadingKey[];

export function isAutoQueriesLoadingKey(
  x: unknown,
): x is AutoQueriesLoadingKey {
  return (
    typeof x === 'string' &&
    (AUTO_QUERIES_LOADING_KEYS as readonly string[]).includes(x)
  );
}
