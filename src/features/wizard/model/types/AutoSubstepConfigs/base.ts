import type { AutoState } from '../store';
import {
  isAutoProp,
  isAutoStepGroup,
  isAutoSubstepType,
  type AutoProp,
  type AutoSubstepGroup,
  type AutoSubstepType,
} from './supportingTypes';

export interface AutoBaseSubstepConfig {
  group: AutoSubstepGroup;
  type: AutoSubstepType;
  prop: AutoProp;

  getButtonText: (auto: AutoState) => string;
  isFilled: (auto: AutoState) => boolean;
  disabled?: (auto: AutoState) => boolean;
}

export const isAutoBaseSubstepConfig = (
  x: unknown,
): x is AutoBaseSubstepConfig => {
  if (typeof x !== 'object' || x === null) return false;

  const rec = x as Record<string, unknown>;

  return (
    isAutoStepGroup(rec.group) &&
    isAutoSubstepType(rec.type) &&
    isAutoProp(rec.prop) &&
    typeof rec.getButtonText === 'function' &&
    typeof rec.isFilled === 'function' &&
    (typeof rec.disabled === 'function' || typeof rec.disabled === 'undefined')
  );
};
