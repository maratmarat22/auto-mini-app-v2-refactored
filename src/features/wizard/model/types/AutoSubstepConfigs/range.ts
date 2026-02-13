import { isAutoBaseSubstepConfig, type AutoBaseSubstepConfig } from './base';

export interface AutoRangeSubstepConfig extends AutoBaseSubstepConfig {}

export const isAutoRangeSubstepConfig = (
  x: unknown,
): x is AutoRangeSubstepConfig => {
  if (!isAutoBaseSubstepConfig(x)) return false;
  return true;
};
