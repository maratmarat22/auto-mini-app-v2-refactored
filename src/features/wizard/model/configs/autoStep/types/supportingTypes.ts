import type { AutoState } from '../../../store/types/store';

export type AutoSubstepGroup = 'specific' | 'abstract';

const AUTO_SUBSTEP_GROUPS = [
  'specific',
  'abstract',
] as const satisfies AutoSubstepGroup[];

export function isAutoStepGroup(x: unknown): x is AutoSubstepGroup {
  return (
    typeof x === 'string' &&
    (AUTO_SUBSTEP_GROUPS as readonly string[]).includes(x)
  );
}

export type AutoSubstepType = 'select' | 'range';

const AUTO_SUBSTEP_TYPES = [
  'select',
  'range',
] as const satisfies AutoSubstepType[];

export function isAutoSubstepType(x: unknown): x is AutoSubstepType {
  return (
    typeof x === 'string' &&
    (AUTO_SUBSTEP_TYPES as readonly string[]).includes(x)
  );
}

export type AutoProp = keyof AutoState;

const AUTO_PROPS = [
  'brand',
  'model',
  'generation',
  'configuration',
  'modification',
  'bodyType',
  'engineType',
  'engineDisplacement',
  'enginePower',
  'gearType',
  'transmission',
  'years',
] as const satisfies AutoProp[];

export const isAutoProp = (x: unknown): x is AutoProp => {
  return typeof x === 'string' && (AUTO_PROPS as readonly string[]).includes(x);
};

export type SelectableAutoProp = Extract<
  keyof AutoState,
  | 'brand'
  | 'model'
  | 'generation'
  | 'configuration'
  | 'modification'
  | 'bodyType'
  | 'engineType'
  | 'gearType'
  | 'transmission'
>;

const SELECTABLE_AUTO_PROPS = [
  'brand',
  'model',
  'generation',
  'configuration',
  'modification',
  'bodyType',
  'engineType',
  'gearType',
  'transmission',
] as const satisfies SelectableAutoProp[];

export function isSelectableAutoProp(x: unknown): x is SelectableAutoProp {
  return (
    typeof x === 'string' &&
    (SELECTABLE_AUTO_PROPS as readonly string[]).includes(x)
  );
}
