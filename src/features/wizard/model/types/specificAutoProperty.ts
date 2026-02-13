export type SpecificAutoProperty =
  | 'brand'
  | 'model'
  | 'generation'
  | 'configuration'
  | 'modification';

export const SPECIFIC_AUTO_PROPERTIES_HIERARCHY = [
  'brand',
  'model',
  'generation',
  'configuration',
  'modification',
] as const satisfies SpecificAutoProperty[];

export function isSpecificAutoProperty(
  property: string,
): property is SpecificAutoProperty {
  return (SPECIFIC_AUTO_PROPERTIES_HIERARCHY as readonly string[]).includes(
    property as SpecificAutoProperty,
  );
}
